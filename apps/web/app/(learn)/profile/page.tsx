"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./Findfriends";

//@ts-ignore
const profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchSocial = async () => {
      try {
        const response = await fetch("/api/user/follow");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setFollowers(data.followersCount);
        setFollowing(data.followingCount);
        console.log(data);
      } catch (e) {
        console.error("Error fetching socials:", e);
      }
    };
    fetchSocial();
  }, []);

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await fetch("/api/user");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setUsername(data.username);
        setName(data.name);
        console.log(data);
      } catch (e) {
        console.error("Error fetching socials:", e);
      }
    };
    fetchCredentials();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-4xl text-neutral-300 flex items-center justify-center font-bold mt-7">
          Your Profile
        </h1>
      </div>

      <div className="flex items-center justify-center mt-[100px]">
        <div className="flex  bg-slate-500 w-[800px] flex-row rounded-xl">
          <div className="flex-col p-3">
            <Image
              src={"/avatar.gif"}
              alt=""
              width={250}
              height={250}
              className="p-3"
            ></Image>
            <p className="ml-10 text-2xl font-semibold text-neutral-200">
              {name}
            </p>
            <p className="ml-20 text-neutral-300 text-lg">@{username}</p>
          </div>

          <div className="flex flex-col gap-y-8 mt-[90px]">
            <div className="flex flex-row items-center justify-center ml-[100px] ">
              <div className="flex flex-col">
                <p className="text-2xl font-bold text-neutral-300">Followers</p>
                <button className=" mt-3 text-lg text-neutral-200 font-bold hover:underline">
                  {followers}
                </button>
              </div>

              <div className="flex flex-col">
                <p className="ml-24 text-2xl font-bold text-neutral-300">
                  Following
                </p>
                <button className="ml-20 mt-3 text-lg text-neutral-200 font-bold hover:underline">
                  {following}
                </button>
              </div>
            </div>

            <div className="ml-[190px] ">
              <Button onClick={openModal}>Find Friends ?</Button>
            </div>
            {isModalOpen && <Modal closeModal={closeModal} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
