"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import Image from "next/image";
import TimerComponent from "./timer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { increment, incrementCount2 } from "@/counterSlice";

const SpeechToText = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const count2 = useSelector((state: RootState) => state.counter.count2);
  const dispatch = useDispatch();
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [serverResponse, setServerResponse] = useState("");
  const [whisperResponse, setWhisperResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleListen = async () => {
    if (isListening) {
      //@ts-ignore
      mediaRecorder.stop(); // This will trigger the 'onstop' event
      setIsListening(false);
    } else {
      // Request the browser to access the microphone
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // Create a new MediaRecorder instance
        const recorder = new MediaRecorder(stream);
        //@ts-ignore

        setMediaRecorder(recorder);

        // Collect the audio data chunks
        const audioChunks: BlobPart[] | undefined = [];
        recorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        // When recording stops, send the audio to the server
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const formData = new FormData();
          const formData2 = new FormData();
          formData.append("audio", audioBlob, "recording.wav");
          formData2.append("file", audioBlob, "recording1.wav");

          // Send the audio file to the server model
          try {
            //@ts-ignore
            const response = await fetch(process.env.NEXT_PUBLIC_URL_MODEL, {
              method: "POST",
              body: formData,
            });
            const responseData = await response.json();

            setServerResponse(responseData.predicted_class);
            if (
              responseData.predicted_class[0] === "blocking" ||
              responseData.predicted_class[0] === "prolongation" ||
              responseData.predicted_class[0] === "repetition"
            ) {
              dispatch(increment());
            } else {
              dispatch(incrementCount2());
            }
            setPrompt(whisperResponse);
            console.log(count);
          } catch (error) {
            console.error("Error sending audio to the server", error);
            setServerResponse("Error sending audio to the server");
          }
          console.log("this is rpompt", prompt);
          console.log(
            JSON.stringify({
              prompt: `${whisperResponse}`,
            })
          );
          stream.getTracks().forEach((track) => track.stop());

          //@ts-ignore
          const response = await fetch(process.env.NEXT_PUBLIC_URL_WHISPER, {
            method: "POST",
            body: formData,
          });
          const responseData1 = await response.json();
          setWhisperResponse(responseData1.transcription);

          try {
            //@ts-ignore
            const response = await fetch(process.env.NEXT_PUBLIC_URL_GRAPH, {
              method: "POST",
              body: formData2,
            });
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImageUrl(imageUrl);
          } catch (error) {
            console.error("Failed to fetch image:", error);
          }
        };

        // Start recording
        recorder.start();

        // Stop recording after 10 seconds
        setTimeout(() => {
          recorder.stop();
          setIsListening(false); // This will trigger the 'onstop' event
        }, 10000);

        setIsListening(true);
      } catch (err) {
        console.error("An error occurred: " + err);
        setServerResponse("Error accessing the microphone");
      }
    }
  };

  const handleClick = () => {
    setImageUrl("");
    setServerResponse("");
    setWhisperResponse("");
    setIsListening(false);
  };

  return (
    <div className="flex-1 flex flex-row items-center my-[15vh] gap-5 ml-[200px] mt-[30px]">
      {/* cartoon image */}
      <div className="">
        <Image src="/main-page.gif" height={150} width={150} alt="Mascot" />
      </div>
      <div className="flex flex-col items-center gap-y-8 py-5  rounded-3xl shadow-lg  shadow-slate-200 dark:bg-slate-800 dark:shadow-gray-600">
        <h1 className="text-4xl lg:text-3xl my-1 font-bold text-neutral-600 max-w-[480px] text-center dark:text-gray-200">
          Click on Start to Record Your Audio
        </h1>

        {!serverResponse ? (
          <Button variant="secondary" onClick={handleListen}>
            {isListening ? "Stop" : "Start"}
          </Button>
        ) : (
          ""
        )}

        {isListening ? (
          <div>
            <Image
              src="/Animation - 1711012148146.gif"
              height={60}
              width={60}
              alt="Mascot"
              className="ml-[40px]"
            />
            <TimerComponent></TimerComponent>
          </div>
        ) : null}

        <div className="text-xl font-bold text-neutral-400">
          Stutter Counter: {count}
        </div>
        {serverResponse && (
          <div>
            <p className="text-xl lg:text-3xl   font-bold text-neutral-600 max-w-[480px] text-center dark:text-white">
              Diagnosed:
            </p>
            <p className="text-xl lg:text-xl   text-neutral-600 max-w-[480px] text-center dark:text-white">
              <p className=" capitalize">{serverResponse}</p>
            </p>
          </div>
        )}

        {serverResponse &&
          (whisperResponse ? (
            <div>
              <p className="text-xl lg:text-3xl  font-bold text-neutral-600 max-w-[480px] text-center dark:text-white">
                You said:{" "}
              </p>
              <p className="text-xl lg:text-2xl   text-neutral-600 max-w-[480px] text-center drk:text-white">
                <p className="capitalize">{whisperResponse}</p>
              </p>
            </div>
          ) : (
            <div>
              <Image
                className="ml-14"
                src="/loading-2.gif"
                height={60}
                width={60}
                alt="Loading animation"
              />
              <p className="text-sm text-gray-700 ml-4 dark:text-white">
                Analyzing Your Speech...
              </p>
            </div>
          ))}

        {serverResponse && (
          <div className="felx flex-row">
            <Button
              className="m-5"
              variant="danger"
              onClick={() => {
                setImageUrl("");
                setServerResponse("");
                setWhisperResponse("");
                setIsListening(false);
              }}
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeechToText;
