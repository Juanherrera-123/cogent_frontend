interface Props {
  onRestart: () => void;
}

export default function FinalScreen({ onRestart }: Props) {
  return (
    <div className="p-8 bg-white rounded-xl shadow-md text-[var(--text-main)] font-bold text-2xl flex flex-col items-center gap-4">
      <div>
        ¡Encuesta completada!
        <br />
        Gracias por tu participación.
      </div>
      <button
        className="bg-primary-main text-white px-6 py-2 rounded-lg shadow hover:bg-primary-light text-base"
        onClick={onRestart}
      >
        Volver al inicio
      </button>
    </div>
  );
}
