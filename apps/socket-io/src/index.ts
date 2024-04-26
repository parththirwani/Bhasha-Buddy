import http from "http"
import SocketService from "./services/socket";

async function init(){
    const socketService = new SocketService()
    const httpServer = http.createServer();
    const PORT = process.env.PORT ? process.env.PORT:8000
    const HOST = '0.0.0.0';
    socketService.io.attach(httpServer)
    //@ts-ignore
    httpServer.listen(PORT,HOST,()=>{
        console.log(`HTTP Server started at PORT:${PORT}`)
    })
    socketService.initListeners();
}
init();