import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image";

const aboutUs = () =>{
    return (
        <>
        <div className="text-3xl text-center font-bold mb-10 text-neutral-500 p-3">
            About US
        </div>
        <div className="flex flex-col items-center justify-center">
        <Image src={"/about-us.jpg"} alt="about-us" height={400} width={400} className="rounded-xl "></Image>
        <br />
        <div className="rounded-xl shadow-xl w-1/2 p-5 text-center text-xl">
        Ctrl Shift N is a team driven by the mission to empower individuals with speech difficulties. Our initiative, BhashaBuddy, is a revolutionary speech intervention app designed to support people who stutter. Through a blend of targeted exercises and curated YouTube videos, BhashaBuddy aims to enhance fluency and boost confidence in speech. We believe that everyone deserves to express themselves freely, and BhashaBuddy is our commitment to making that a reality.
        </div>
        </div>
        </>
    )
}
export default aboutUs