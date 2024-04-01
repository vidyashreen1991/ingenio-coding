"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { AdvisorType } from "../page";
import Button from "./Button";

export default function ({ name, price, pictureUrl, id, ...initialStatus }: AdvisorType){
    let interval: string | number | NodeJS.Timeout | null | undefined = null;
    const [status, setStatus] = useState<any>(null);
    const updateStatus = async function() {
        const response:any = await fetch(`https://demo2255213.mockable.io/advisor-availability?advisorId=${id}`);
        const status = await response.json();
        setStatus({
            ["call-availability"]: status?.["call-availability"] === "offline",
           ["chat-availability"]: status?.["chat-availability"] === "offline"
        });
    }
    useEffect(function () {
        if(interval) {
            clearInterval(interval);
        }
        interval = setInterval(function () {
            updateStatus()
        }, 30000);
        return () => {
            if(interval) {
                clearInterval(interval);
            }
        }
    }, [id]);
    useEffect(function () {
        initialStatus && status === null && setStatus({
            ["call-availability"]: initialStatus?.["call-availability"] === "offline",
           ["chat-availability"]: initialStatus?.["chat-availability"] === "offline"
        });
    }, [initialStatus]);

    const handleCall = function() {

    }
    const handleChat = function() {

    }
    return <div className="flex w-full p-4">
        <div className="flex flex-auto">
            <Image src={pictureUrl} alt={""} width="175" height="175" className="rounded-full"></Image>
            <div className="text-teal-400">{name}</div>
        </div>
        <div className="flex flex-col justify-center align-middle">
            <div className="m-1">{price}</div>
            <Button disabled={status?.["call-availability"]} onClick={handleCall}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                CALL NOW
            </Button>
            <Button disabled={status?.["chat-availability"]} onClick={handleChat}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mx-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                CHAT NOW
            </Button>
        </div>
        </div>
};