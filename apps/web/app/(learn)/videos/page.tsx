"use client";
import YouTubeVideoCard from "./videoRender";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import "./page.css"

const Videos = () => {
    const { scrollYProgress } = useScroll();
const scaleX = useSpring(scrollYProgress, {
  stiffness: 100,
  damping: 30,
  restDelta: 0.01,
});
    return <div className="w-full ml-10">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <div className="w-full">
        <p className="text-center text-4xl font-bold text-purple-600 mt-10">
              Learning Videos
            </p>
            <p className=" text-2xl font-bold text-purple-400 mt-10">
              Vocal Straw Exercise
            </p>
            <div className="flex flex-row gap-5">
              <YouTubeVideoCard
                videoId={"eC_BFfTzhYE"}
                title={"Semi-Occluded Vocal Tract"}
                description={""}
              ></YouTubeVideoCard>
            </div>

            <p className=" text-2xl font-bold text-purple-400 mt-20">
              Tongue And Lips Exercise
            </p>
            <div className="flex flex-col">
            <div className="flex flex-row gap-5">
              <YouTubeVideoCard
                videoId={"P9olC684jnA"}
                title={"Lip Protrusion Exercise"}
                description={""}
              ></YouTubeVideoCard>
              <YouTubeVideoCard
                videoId={"GVEF6istp0Q"}
                title={"Lip Retraction Exercise"}
                description={""}
              ></YouTubeVideoCard>
              <YouTubeVideoCard
                videoId={"8NfmUKGGvAg"}
                title={"Tongue Exercises to Improve Speech and Swallowing"}
                description={""}
              ></YouTubeVideoCard>
            </div>
            </div>

            <p className=" text-2xl font-bold text-purple-400 mt-20">
              Jaw Exercise
            </p>
            <div className="flex flex-col">
              <div className="flex flex-row gap-5 ">
                <YouTubeVideoCard
                  videoId={"VcLTrO0SLc8"}
                  title={"Open Wide and Close Tight"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"nDFp6mqcSCA"}
                  title={"Jaw Drop"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"wlcCfnHMX4o"}
                  title={"Move Jaw from Side to Side"}
                  description={""}
                ></YouTubeVideoCard>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-5 ">
                <YouTubeVideoCard
                  videoId={"kAooJDpSVgc"}
                  title={"Move Jaw Forward and Backward"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"JGVUTGM77PM"}
                  title={"Wee Woo Whoa"}
                  description={""}
                ></YouTubeVideoCard>
              </div>
            </div>

            <p className=" text-2xl font-bold text-purple-400 mt-20">
              Fluency Practice
            </p>
            <div className="flex flex-col">
              <div className="flex flex-row gap-5 ">
                <YouTubeVideoCard
                  videoId={"_Qt_o_9b9KM"}
                  title={"Prolonged Speech For Stuttering"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"Zr3uIjvsp-M"}
                  title={"Cancellation for Stuttering"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"SSp0boMgghk"}
                  title={"Preparatory Set for Stuttering "}
                  description={""}
                ></YouTubeVideoCard>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-5 ">
                <YouTubeVideoCard
                  videoId={"ISzf7M9FnR4"}
                  title={"How to USe a Pacing Board"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"s7q4hHDExbQ"}
                  title={"Can a Metrononome Help With Speech?"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"l__Gri72UUc"}
                  title={"Pull-Out Stuttering Technique"}
                  description={""}
                ></YouTubeVideoCard>
              </div>
            </div>

            <p className=" text-2xl font-bold text-purple-400 mt-20">
              Breathing Exercise
            </p>
            <div className="flex flex-col mb-10">
              <div className="flex flex-row gap-5 ">
                <YouTubeVideoCard
                  videoId={"Mg2ar-7_HfA"}
                  title={"Diaphragmatic Breathing"}
                  description={""}
                ></YouTubeVideoCard>
                <YouTubeVideoCard
                  videoId={"zz0oE7yfBw8"}
                  title={"Breathing Exercises for Adults"}
                  description={""}
                ></YouTubeVideoCard>
              </div>
            </div>
            </div>
    </div>;
};
export default Videos;