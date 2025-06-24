'use client';

import Link from "next/link";

type ButtonProps = {
        image : string;
    }

export default function Img({image}: ButtonProps) {
  return (
    <div className="justify-items-center">   
            <img src={image} alt="Fogo" className="w-94 h-94 object-cover rounded-full"/>
    </div>

  );
}