'use client';

import Link from "next/link";

type ButtonProps = {
        sala : string;
        onClick: (sala: string) => void;
    }

export default function Door({ sala, onClick }: ButtonProps) {
  return (
    <div>   
        <button onClick={() => onClick(sala)} className="w-64 h-96 bg-amber-800 hover:bg-black hover:text-blue-800 text-white font-bold text-8xl py-2 px-4 flex items-center border-8 border-blue-800 rounded-t-xl justify-center ">
            ?
        </button>
    </div>

  );
}