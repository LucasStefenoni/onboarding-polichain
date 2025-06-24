'use client';

import Button from "@/components/Button";
import Door from "@/components/Door";
import Image from "next/image";
import Link from "next/link";

let pags: string[] = ["pagFogo/", "pagOuro/", "pagUrso/"];

export default function Home() {  
  {pags = pags.sort(() => Math.random() - 0.5)};
  return (
   <div>
    <div className="grid grid-flow-col grid-rows-1 gap-20">
        <div className="row-span-3 text-center"> 
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">TESTE SUA SORTE</h1>
        </div>
    </div>
    <div className="grid grid-flow-col grid-rows-3 gap-60">
      <div className="grid grid-cols-3 gap-4 justify-items-center">
        <div>
          <Door sala={ (pags[0]) }></Door>
        </div>
        <div>
          <Door sala={ (pags[1]) }></Door>
        </div>
        <div>
          <Door sala={ (pags[2]) }></Door>
        </div>
      </div>
    </div>
   </div>
  );
}
