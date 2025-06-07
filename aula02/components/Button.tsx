'use client';

import Link from "next/link";

type ButtonProps = {
        texto: string;
    }

export default function Button({texto}: ButtonProps) {
  return (
    <div>   
        <Link href="/Home" className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            {texto}
        </Link>
    </div>

  );
}
