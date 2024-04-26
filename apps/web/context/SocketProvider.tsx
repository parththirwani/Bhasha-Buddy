"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";


interface SocketProviderProps {
  children?: React.ReactNode;
}

interface Message {
  message: string;
  avatar: string;
  room?: string;
}

interface ISocketContext {
  sendMessage: (msg: string, room?: string) => void;
  messages: Message[];
  roomMessages: Message[];
  joinRoom: (room: string) => void;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) throw new Error(`state is undefined`);
  return state;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const defaultAvatar = "/gamer.png";
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomMessages, setRoomMessages] = useState<Message[]>([]);
  //@ts-ignore
  const sendMessage = useCallback(
    (msg: string, room?: string) => {
      if (socket && msg.trim().length > 0) {
        const avatar = defaultAvatar;

        if (room) {
          socket.emit("event:message", { room, message: msg, avatar: avatar });
        } else {
          socket.emit("event:message", { message: msg, avatar: avatar });
        }
      }
    },
    [socket, defaultAvatar]
  );

  const joinRoom = useCallback(
    (room: string) => {
      if (socket) {
        socket.emit("joinRoom", room);
      }
    },
    [socket]
  );





  const onRoomJoinMsg = useCallback((data: Message) => {
    console.log(data);
    if (data) {
      //@ts-ignore
      data.forEach((msg) => {
        
            console.log("inside onRoomJoinMsg for room ");
            setRoomMessages((prev) => [...prev, msg]);
        
    });
      // console.log(roomMessages);
    } else {
      return
    }
  }, []);


  const onMessageRec = useCallback((data: Message) => {
    console.log(data);
    if (data.room) {
      console.log("inside onMessageRec for room ");
      setRoomMessages((prev) => [...prev, data]);
      console.log(roomMessages);
    } else {
      console.log("inside onMessageRec for global ");
      setMessages((prev) => [...prev, data]);
    }
  }, []);

  useEffect(() => {
    //@ts-ignore
    const _socket = io(process.env.NEXT_PUBLIC_URL_SOCKET);
    _socket.on("room-messages", onRoomJoinMsg);
    _socket.on("room-message", onMessageRec);
    _socket.on("message", onMessageRec);
    setSocket(_socket);

    return () => {
      _socket.disconnect();
      _socket.off("room-message", onMessageRec);
      _socket.off("message", onMessageRec);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ sendMessage, messages, roomMessages, joinRoom }}
    >
      {children}
    </SocketContext.Provider>
  );
};
