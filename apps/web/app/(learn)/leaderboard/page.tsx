"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import LeaderboardItem from "./LeaderboardItem";
interface User {
  username: string;
  id: number;
  email: string;
  xp: number;
}

const LearderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchLeaderboardData() {
      try {
        const response = await fetch("/api/leaderboard");
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        const data = await response.json();
        console.log(data);
        setLeaderboardData(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    }

    fetchLeaderboardData();
  }, []);

  const sortedLeaderboardData = [...leaderboardData].sort(
    (a, b) => b.xp - a.xp
  );
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <div className="w-full flex flex-col items-center">
        <Image
          src="/leaderboard.svg"
          alt="Leaderboard"
          height={90}
          width={90}
        />
        <h1 className="text-center font-bold text-neutral-800 text-2xl my-6 dark:text-zinc-300">
          LeaderBoard
        </h1>
        <p className="text-muted-foreground text-center text-lg mb-6 dark:text-zinc-300">
          See Where You Stand Among Others
        </p>
        <Separator className="mb-4 h-0.5 rounded-full"></Separator>

        {loading ? (
          <>
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div
                key={index}
                className="flex items-center w-full p-2 px-4 rounded-xl animate-pulse"
              >
                <div className="font-bold text-lime-700 mr-4 dark:text-lime-200">
                  {}
                </div>
                <div className="border bg-green-500 h-12 w-12 ml-3 mr-6 rounded-full"></div>
                <div className="font-bold text-neutral-800 flex-1 dark:text-zinc-300">
                  {"Loading..."}
                </div>
                <div className="text-muted-foreground dark:text-zinc-300">
                  {"Loading..."}
                </div>
              </div>
            ))}
          </>
        ) : (
          sortedLeaderboardData.map((user, index) => (
            <LeaderboardItem
              key={user.id}
              rank={index + 1}
              name={user.username}
              xp={user.xp}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LearderboardPage;
