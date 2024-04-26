"use client"
import  Image  from "next/image";
import  Timer  from "./timer";
const mediation = () =>{
    return(
        <div className="h-full bg-black w-full">
        
            <h1 className="flex justify-center items-center text-3xl mt-5 font-bold text-neutral-300">Mediation</h1>
       
        <div>
            <Image src="/meditation-2.gif" width={500} height={500} alt="meditation" />
        </div>
        <Timer></Timer>
        </div>
    )
}
export default mediation;