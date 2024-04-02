"use client"
import { Key, useEffect, useState } from "react";
import Advisor from "./components/Advisor";
export type AdvisorType = {
  name: String;
  price: String;
  pictureUrl: String;
  id: Key;
  "call-availability": String;
  "chat-availability": String;
}
export default function Home() {
  const [advisors, setAdvisors] = useState<AdvisorType[]|null>(null);
  const [error, setErrors] = useState<String|null>(null);
  const getAdvisors = async () => {
   try {
    const response:any = await fetch("https://demo2255213.mockable.io/listings");
    const advisors = await response.json();
    setAdvisors(advisors.data);
   } catch(e){
    setErrors("Error in Loading");
   }
  }
  useEffect(() => {
    getAdvisors();
  }, [])

  if(error) {
    return <div>{error}</div>
  }
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24 sm:p-0 bg-white">
        <div className="grid grid-cols-1 divide-y w-full">
        {advisors? advisors?.map((advisor: AdvisorType) => {
          return <Advisor key={advisor.id} {...advisor}></Advisor>
        }): <div>Loading...</div>}
        </div>
    </main>
  );
}



