'use client';

type ButtonProps = {
        texto: string;
        aoClicar?: () => void;
    }

export default function Button({texto, aoClicar}: ButtonProps) {
  return (
    <div>   
        <button onClick={aoClicar} className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
            {texto}
        </button>
    </div>

  );
}
