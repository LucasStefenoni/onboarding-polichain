'use client';

import Button from "@/components/Button";
import Door from "@/components/Door";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Jogador } from "./generated/prisma";
import { useRouter } from 'next/navigation';

let pags: string[] = ["pagFogo/", "pagOuro/", "pagUrso/"];
//
type jogador = {id: number; name: string; createdAt: string; pontos: number}

export default function Home() {  
  const [Jogadores, setJogadores] = useState<Jogador[]>([])
  const [nome, setNome] = useState('')
  const [editingId, setEditingId] = useState<number | null> (null)
  const [selectedJogadorId, setSelectedJogadorId] = useState<number | null>(null);
  const router = useRouter();
const load = () =>
  fetch('/api/jogadores') 
    .then(res => res.json()) 
    .then(data => setJogadores(data))
    .catch(console.error)

  useEffect( ()=> {
    load()
  }, [])

const handleDoorClick = async (sala: string) => {
  if (!selectedJogadorId) {
    alert('Por favor, selecione um jogador da lista primeiro!');
    return;
  }
  let endpoint = '';
  let acao = '';
  if (sala === 'pagOuro/') {
    endpoint = `/api/jogadores/${selectedJogadorId}/add-point`;
    acao = 'ganhou 1 ponto';
  } else{
     router.push(sala);
    return;
  }
  console.log('--- INICIANDO FETCH PARA O ENDPOINT:', endpoint);
  try {
    const response = await fetch(endpoint, { method: 'POST' });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Falha ao atualizar a pontuação.');
    }
    const updatedJogador = await response.json();
    setJogadores(jogadoresAtuais => 
      jogadoresAtuais.map(j => 
        j.id === updatedJogador.id ? updatedJogador : j
      )
    );
    router.push(sala);
  } catch (error) {
    console.error(error);
    alert(`Não foi possível completar a jogada: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  } finally {
    setSelectedJogadorId(null);
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!nome.trim()) return;

  const url = editingId ? `/api/jogadores/${editingId}` : '/api/jogadores';
  const method = editingId ? 'PUT' : 'POST';

  await fetch(url, {
    method,
    body: JSON.stringify({ nome }),
    headers: { 'Content-Type': 'application/json' },
  });

  setNome('');
  setEditingId(null);
  load();
  
};

const handleDelete = async (id: number) => {
  if (confirm('Confirmar exclusão?')) {
    await fetch(`/api/jogadores/${id}`, { method: 'DELETE' });
    load();
  }
}


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
          <Door  sala={ (pags[0]) }   onClick={handleDoorClick}></Door>
        </div>
        <div>
          <Door  sala={ (pags[1]) }   onClick={handleDoorClick}></Door>
        </div>
        <div>
          <Door sala={ (pags[2]) }  onClick={handleDoorClick}></Door>
        </div>
      </div>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h1>Jogadores</h1>
            <input name="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>
              <button type="submit">
                {editingId ? 'Atualizar' : 'Adicionar'} 
              </button>
          </form>
        </div>
        <div>
          {Jogadores.map((jogador) => (
            <div
              key={jogador.id}
               onClick={() => setSelectedJogadorId(jogador.id)}
               className={`flex items-center p-2 border-b border-gray-200 dark:border-gray-700 rounded-md cursor-pointer transition-colors ${
                selectedJogadorId === jogador.id 
                  ? 'bg-blue-200 dark:bg-blue-800' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <p>{jogador.nome} </p>
              <span> </span>
              <p>{jogador.pontos}</p>

              <div className="w-2/5 flex justify-end gap-2">
                <button onClick={() => handleDelete(jogador.id)}>
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>

   </div>
  );
}
