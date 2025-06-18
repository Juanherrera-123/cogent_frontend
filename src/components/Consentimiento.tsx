import React from "react";

export default function Consentimiento({ onAceptar }: { onAceptar: () => void }) {
  return (
    <div className="max-w-xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <h1 className="text-3xl font-display text-primary-main mb-4">Consentimiento Informado</h1>
      <div className="text-base font-sans text-gray-800 mb-6 text-justify">
        <p>
          Usted ha sido invitado a participar en la <b>Batería de Riesgo Psicosocial COGENT</b>.
          Su participación es voluntaria y sus respuestas serán tratadas de manera confidencial, según la normativa legal vigente.
        </p>
        <ul className="list-disc ml-6 mt-4 mb-4">
          <li>Los datos recolectados serán utilizados exclusivamente con fines diagnósticos y de intervención en seguridad y salud laboral.</li>
          <li>En ningún caso se compartirán resultados individuales con su empleador; solo se entregarán informes grupales.</li>
          <li>Puede retirarse en cualquier momento sin que esto afecte su relación laboral.</li>
        </ul>
        <p>
          Al presionar "Acepto", usted declara haber sido informado y autoriza el tratamiento de sus datos personales conforme a la ley 1581 de 2012 y la política de privacidad de PSYKHE CONSULTORES.
        </p>
      </div>
      <button

        className="btn-primary mt-4 text-lg"

        onClick={onAceptar}
      >
        Acepto y deseo continuar
      </button>
    </div>
  );
}
