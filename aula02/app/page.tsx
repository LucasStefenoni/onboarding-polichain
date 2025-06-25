'use client';

import { useEffect, useState } from "react";
import { Jogador } from "./generated/prisma";
import { useRouter } from 'next/navigation';
import Door from "../components/Door";

let pags: string[] = ["pagFogo/", "pagOuro/", "pagUrso/"];
type jogador = {id: number; name: string; createdAt: string; pontos: number}

export default function Home() {  
  const [jogadores, setJogadores] = useState<Jogador[]>([])
  const [nome, setNome] = useState('')
  const [editingId, setEditingId] = useState<number | null> (null)
  const [selectedJogadorId, setSelectedJogadorId] = useState<number | null>(null);
  const router = useRouter();
const load = () => {
  fetch('/api/jogadores')
    .then(res => {
      if (!res.ok) {
        throw new Error(`Falha ao buscar dados da API: Status ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setJogadores(data);
      } else {
        console.error("Os dados recebidos da API não são um array:", data);
        setJogadores([]);
      }
    })
    .catch(error => {
      console.error("Erro na função loadJogadores:", error);
      setJogadores([]);
    });
};
useEffect(() => {
  load();
}, []);

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
        <div className="container mx-auto max-w-lg p-4">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">Jogadores</h1>
            <input name="Nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome do jogador"
            className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"/>
              <button type="submit"  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200">
                {editingId ? 'Atualizar' : 'Adicionar'} 
              </button>
          </form>
        </div>
        <div>
          {jogadores.map((jogador) => (
            <div
              key={jogador.id}
               onClick={() => setSelectedJogadorId(jogador.id)}
               className={`flex items-center p-2 border-b border-gray-200 dark:border-gray-700 rounded-md cursor-pointer transition-colors text-white ${
                selectedJogadorId === jogador.id 
                  ? 'bg-blue-200 dark:bg-blue-800' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <p>{jogador.nome} - </p>
              <p> - Pontos: <span className="p1"></span> {jogador.pontos}</p>

              <div className="w-2/5 flex justify-end gap-2 text-white">
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
