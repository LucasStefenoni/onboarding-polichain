'use client';

import Button from "@/components/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const variavel: number = 6;
  return (
   <div>
    <p>TESTE</p>
    {variavel == 5?
      <div>Valor: 5</div> : <div>Valor: 3</div>
    }
    <Link href={"page.tsx"}> </Link> 
    <Button texto={"PAGINA 1"} aoClicar={() => alert("pagina 1")}></Button>
   </div>
  );
}
