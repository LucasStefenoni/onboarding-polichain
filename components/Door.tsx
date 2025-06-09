'use client';

import Link from "next/link";

type ButtonProps = {
        sala : string;
    }

export default function Door({sala}: ButtonProps) {
  return (
    <div>   
        <Link href={sala} className="w-64 h-96 bg-amber-800 hover:bg-black hover:text-blue-800 text-white font-bold text-8xl py-2 px-4 flex items-center border-8 border-blue-800 rounded-t-xl justify-center ">
            ?
        </Link>
    </div>

  );
}