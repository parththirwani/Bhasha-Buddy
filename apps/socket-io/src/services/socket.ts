import {Server,Socket} from "socket.io"
import Redis from "ioredis"
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient()

//@ts-ignore
const pub = new Redis({
    host:process.env.REDIS_URL,
    port:process.env.REDIS_PORT,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
});

//@ts-ignore
const sub = new Redis({
    host:process.env.REDIS_URL,
    port:process.env.REDIS_PORT,
    username:process.env.REDIS_USERNAME,
    password:process.env.REDIS_PASSWORD
   
})
   
class SocketService {
    private _io:Server;
    constructor(){
        console.log("Init Socket Service..")
        this._io = new Server({
            cors:{
                allowedHeaders: "*",
                origin:"*"
            }
        });
        sub.subscribe("MESSAGES")
    }
  
    public initListeners(){
        const io = this.io
        console.log("initialised Socket Listeners...")
        io.on("connect",(socket: Socket)=>{
            console.log(`New sokcet Connected`,socket.id)

            socket.on("joinRoom", async (room: string) => {
                socket.join(room);
                console.log(`Socket ${socket.id} joined room ${room}`);
                const messages = await prisma.message.findMany({
                    where: {
                        //@ts-ignore
                        room: {
                            name: room 
                        }
                    }
                });
                const formattedMessages = messages.map((message) => ({
                    message: message.content,
                    avatar: message.avatar,
                    room: message.roomId 
                }));

                console.log("inside joined room meassges:",messages)
                socket.emit("room-messages", formattedMessages);
            });

            socket.on("event:message",async ({message,avatar,room}:{room?:string,message:string,avatar: string})=>{
                if (room) {
                    let existingRoom = await prisma.room.findUnique({
                        where: {
                            name: room
                        }
                    });
                    if (!existingRoom) {
                        existingRoom = await prisma.room.create({
                            data: {
                                name: room
                            }
                        });
                    }
                    const createdMessage = await prisma.message.create({
                        data: {
                            content: message,
                            avatar,
                            room: {
                                connect: {
                                    name: room
                                }
                            }
                        }
                    });
                    console.log(`New message in room ${room}: ${message}`);
                    io.to(room).emit("room-message", { message, avatar,room });
                    console.log(`send to room-message`);
                } 
                
                else{
                    console.log(`new message global`,message)
                    await pub.publish("MESSAGES",JSON.stringify({message,avatar}))
                    // io.emit("message", { message, avatar });
                }
            })
        })
        // add the room message to the room  
        sub.on("message", async (channel: string, message: string) => {
            if (channel === "MESSAGES") {
                const data = JSON.parse(message);
                
                const {room, message: msg, avatar } = data;
                if (room) {
                    console.log("inside if",room)
                    io.to(room).emit("room-message", { message: msg, avatar });
                    
                }else{
                    console.log("inside else",room)
                    io.emit("message", { message: msg, avatar });
                }
            }
        });
    }
    get io(){
        return this._io
    }
}
export default SocketService;