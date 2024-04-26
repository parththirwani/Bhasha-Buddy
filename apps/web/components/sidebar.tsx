"use client"
import Link from "next/link";
import Image from "next/image";
import { Loader, ChevronLeft, ChevronRight, ArrowBigLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import React, { useState } from 'react';
import { SidebarItem } from "./sidebar-items";
import { useSidebar } from "@/app/(learn)/layout";
import { ModeToggle } from "./theme-toggle";
import { signIn, signOut } from "next-auth/react"
import { Button } from "./ui/button";
import LogoutLogin from "./ui/userLoginOut";


type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const { toggleSidebar } = useSidebar();

  return (
    <div className={cn(
      "flex h-full flex-col transition-width duration-300",
      isOpen ? "w-[256px]" : "w-[90px]", // Adjust width based on isOpen state
      "lg:fixed left-0 top-0 px-2 border-r-2",
      className,
    )}>
      <div className="pt-8 pl-3 pb-7 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-x-3">
            {isOpen && (<Image src="/mascot-2.png" height={40} width={40} alt="Mascot" />)}
           
            {isOpen && (
              <h1 className="text-lg font-extrabold text-purple-400 tracking-wide ">
                BhashaBuddy
              </h1>
            )}
          </div>
        </Link>
        <button onClick={()=>{
          toggleSidebar()
          setIsOpen(!isOpen)
        }} className="p-2 hover:bg-neutral-200 rounded-xl">
          {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} className="mr-5"/>}
        </button>
      </div>
      <div className="flex flex-col gap-y-2 flex-1">
        {/* SidebarItem components */}
        <SidebarItem 
          label="Learn" 
          href="/learn"
          iconSrc="/learn.svg"
          isOpen={isOpen}
        />
        <SidebarItem 
          label="Leaderboard" 
          href="/leaderboard"
          iconSrc="/leaderboard.png"
          isOpen={isOpen}
        />
        
       <SidebarItem 
          label="My Diary" 
          href="/MyDiary"
          iconSrc="/Diary-sidebar.gif"
          isOpen={isOpen}
        />
        
        <SidebarItem 
          label="My Videos" 
          href="/videos"
          iconSrc="/learn-videos.png"
          isOpen={isOpen}
        />

        <SidebarItem 
          label="Community" 
          href="/community"
          iconSrc="/community.gif"
          isOpen={isOpen}
        />
        <SidebarItem 
          label="Meditate" 
          href="/meditation"
          iconSrc="/lotus.png"
          isOpen={isOpen}
        />
      </div>
      <div className="p-4 flex flex-row gap-x-28">
        <ModeToggle ></ModeToggle>
        <div>
        <LogoutLogin></LogoutLogin>
        </div>
      </div>
    </div>
  );
};
