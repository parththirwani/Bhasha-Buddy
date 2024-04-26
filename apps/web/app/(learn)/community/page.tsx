"use client";
import { Button } from "@/components/ui/button";
import { useSocket } from "@/context/SocketProvider";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { sha1 } from "sha.js";

const Community = () => {
  const { sendMessage, messages, roomMessages, joinRoom } = useSocket();
  const [messagegloabal, setMessagGlobal] = useState("");
  const [messageroom, setMessagRoom] = useState("");
  const [room, setRoom] = useState("");
  const [following, setFollowing] = useState([]);

  const {data:session }=  useSession();
  //@ts-ignore
  console.log(session);
  //@ts-ignore
  const currentUser  = session?.user.username;
  const handleSendMessageGlobal = () => {
    if (messagegloabal.trim()) {
      sendMessage(messagegloabal.trim());
      setMessagGlobal("");
    }
  };

  const handleSendMessageRoom = () => {
    if (messageroom.trim()) {
      console.log(messageroom.trim(), room);
      sendMessage(messageroom.trim(), room);
      setMessagRoom("");
    }
  };

  const handleFormSubmitRoom = (e: any) => {
    e.preventDefault();
    handleSendMessageRoom();
  };

  

  const handleFormSubmitGlobal = (e: any) => {
    e.preventDefault();
    handleSendMessageGlobal();
  };

  //   console.log(roomMessages, room);
  const handleJoinRoom = () => {
    const roomName = prompt("Enter room name:");
    if (roomName) {
      joinRoom(roomName);
      setRoom(roomName);
    }
  };

  useEffect(() => {
    // Function to fetch following users
    const fetchFollowing = async () => {
      try {
        const response = await fetch("/api/user/following");
        if (!response.ok) {
          throw new Error("Failed to fetch following");
        }
        const data = await response.json();
        console.log(data);
        console.log(data.following);
        setFollowing(data.following);
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    };
    // Call the fetchFollowing function when the component mounts
    fetchFollowing();
  }, []);

  //@ts-ignore
  const generateRoomName = (usernames) => {
    // Sort the usernames alphabetically
    const sortedUsernames = [...usernames, currentUser].sort();
    // Concatenate the sorted usernames to form the room ID
    const concatenatedUsernames = sortedUsernames.join("_");
    // Generate a hash from the concatenated usernames
    let hash = 0;
    for (let i = 0; i < concatenatedUsernames.length; i++) {
      const char = concatenatedUsernames.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    // Convert the hash to a hexadecimal string
    const roomID = (hash >>> 0).toString(16);
    return roomID;
  };

  //@ts-ignore
  const AutoJoinRoom =(usernames)=>{
    const roomName = generateRoomName(usernames);
    // const roomName = "dad";
    if (roomName) {
      joinRoom(roomName);
      setRoom(roomName);
    }
  }

  return (
    <div>
         <h1 className="text-center text-3xl font-semibold text-neutral-600 mb-5 dark:text-zinc-300">
            Community
          </h1>

        <div className="flex flex-row items-center">
        <div className="flex items-center justify-center">
          <div className="border-2 flex flex-col justify-center items-center rounded-xl w-[300px] bg-slate-800">
            <h1 className="text-xl text-neutral-300 font-bold">Following List</h1>
            <ul className="w-full text-center">
              {following.map((username, index) => (
                <div className="bg-black border-2 p-3 border-neutral-500 rounded-2xl flex flex-row items-center justify-center">
                  
                <li className="text-lg font-semibold text-neutral-300 mt-4" key={index}>{username}</li>
                <Button onClick={()=>AutoJoinRoom(username)}>Chat</Button>
                <br />
                </div>
              ))}
            </ul>
          </div>
          </div>

              {/* globalchat */}
        <div className="flex flex-col h-96 overflow-y-auto border border-gray-300 p-4">
        <h1 className="text-center text-3xl font-semibold text-neutral-600 mb-5 dark:text-zinc-300">
            Global Chat
          </h1>
          <ul className="overflow-auto p-2 space-y-2">
            {messages.map(({ message, avatar }, index) => (
              <div key={index} className="flex">
                <li className="bg-white p-2 rounded-lg shadow flex items-center dark:bg-slate-500">
                  <Image
                    src={avatar || "path/to/default/avatar.jpg"}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="ml-2 mr-5">{message}</p>
                </li>
              </div>
            ))}
          </ul>

          <form onSubmit={handleFormSubmitGlobal}>
            <div className="flex items-center">
              <input
                type="text"
                value={messagegloabal}
                onChange={(e) => setMessagGlobal(e.target.value)}
                className="w-full md:w-1/3 p-3 bg-neutral-100 rounded-xl shadow-sm outline-none focus:border-purple-500 dark:bg-slate-800 transition-all"
                placeholder="Say Something..."
              />
              <Button
                variant="secondary"
                type="submit"
                className="ml-4 px-6 py-2"
              >
                Send
              </Button>
            </div>
          </form>
        </div>

        {/* room chat */}
        
        <div className="ml-20">

        {room && (
          <div className="flex flex-col h-96 overflow-y-auto border border-gray-300 p-4">
            <h1 className="text-center text-3xl font-semibold text-neutral-600 mb-5 dark:text-zinc-300">
            Room Chat
          </h1>
              <ul className="overflow-auto p-2 space-y-2">
                {roomMessages.map(({ message, avatar }, index) => (
                  <div key={index} className="flex">
                    <li className="bg-white p-2 rounded-lg shadow flex items-center dark:bg-slate-500">
                      <Image
                        src={avatar || "path/to/default/avatar.jpg"}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <p className="ml-2 mr-5">{message}</p>
                    </li>
                  </div>
                ))}
              </ul>
              <form onSubmit={handleFormSubmitRoom}>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={messageroom}
                    onChange={(e) => setMessagRoom(e.target.value)}
                    className="w-full md:w-1/3 p-3 bg-neutral-100 rounded-xl shadow-sm outline-none focus:border-purple-500 dark:bg-slate-800 transition-all"
                    placeholder="Say Something..."
                  />
                  <Button
                    variant="secondary"
                    type="submit"
                    className="ml-4 px-6 py-2"
                  >
                    Send
                  </Button>
                </div>
              </form>
          </div>
        )}
        </div>
       
        </div>
      <div className=" items-center justify-center">
        <Button
          variant="primary"
          onClick={handleJoinRoom}
          className="px-6 py-2"
        >
          Join Room
        </Button>
      </div>
    </div>
  );
};

export default Community;

