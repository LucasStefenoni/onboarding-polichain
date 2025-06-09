'use client';

import Button from "@/components/Button";
import Door from "@/components/Door";
import Img from "@/components/Img";
import Image from "next/image";
import Link from "next/link";

export default function Ouro() {
  return (
        <div className="bg-gray-800 h-200">
          <div className="grid grid-cols-1 gap-10 justify-items-center">
            <div>
                <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">OURO! VOCÊ VENCEU</h1>
            </div>
            <div>
                <Img image={"Ouro.svg"}></Img>
            </div>
    
            <div>
                <Button texto={"Jogar Novamente"}></Button>
            </div>
          </div>
        </div>
  );
}
