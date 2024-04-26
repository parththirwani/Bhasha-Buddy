"use client";
import React, { useState, useEffect } from "react";
import CurrentDateTime from "./currentDate";
import { Button } from "@/components/ui/button";
import CustomAlert from "./alert";
import { Entries } from "./allEntries";

interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const MyDiary = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [blogs, setBlogs] = useState<DiaryEntry[]>([]);

  const handleCreateEntry = async () => {
    const response = await fetch("/api/diaryEntry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    if (response.status === 200) {
      setTitle("");
      setContent("");
      alert("Dairy Saved Successfully");
    }
  };


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/diaryEntry");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        console.log(data.diaryEntries);
        setBlogs(data.diaryEntries); // Assuming data is an array of blog entries
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [content, title]);

  return (
    <div className=" w-full  p-10 pt-5 h-screen mb-10">
      <CustomAlert />
      <div className="text-3xl font-bold text-center mb-10">Your Diary</div>
      <div className=" rounded-xl p-10 shadow-lg">
        <CurrentDateTime></CurrentDateTime>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          className="bg-gray-50  border-gray-300 rounded-xl text-gray-900 text-sm  block w-full p-2.5  dark:border-gray-600 dark:placeholder-white  dark:bg-slate-800 dark:text-white"
          placeholder="Your title"
          required
        />
        <br />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Express your thoughts here"
          className="bg-gray-50 h-80 border-gray-300 rounded-xl text-gray-900 text-sm block w-full p-2.5 dark:border-gray-600 dark:placeholder-white dark:bg-slate-800 dark:text-white resize-none"
          required
        />
        <br />
        <Button onClick={handleCreateEntry} type="button" variant={"primary"}>
          Create
        </Button>
      </div>
      <br />
      <div className="my-10">
        <h1 className="text-3xl font-bold text-center">Your Entries</h1>
        <br />
        <div className="mb-5">
          {blogs.map((blog) => (
            <div className="mb-5">
              <Entries id={blog.id} title={blog.title} content={blog.content} date={blog.createdAt}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyDiary;
