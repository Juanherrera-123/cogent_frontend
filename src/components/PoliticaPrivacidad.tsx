import React from "react";

type Props = { onBack: () => void };

export default function PoliticaPrivacidad({ onBack }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F4F8FA] to-[#FFFFFF] relative overflow-y-auto px-4 py-8">
      <svg
        className="absolute left-0 top-0 opacity-10 w-[320px] h-[320px] -z-10"
        viewBox="0 0 320 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="160" cy="160" r="140" fill="url(#grad1)" />
        <defs>
          <linearGradient id="grad1" x1="60" y1="30" x2="260" y2="260" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2EC4FF" />
            <stop offset="1" stopColor="#005DFF" />
          </linearGradient>
        </defs>
      </svg>

      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 max-w-3xl mx-auto animate-fadeIn text-[#313B4A] font-montserrat space-y-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#132045] text-center mb-2">
          Política de Privacidad
        </h1>
        <p className="text-center font-semibold">COGENT &amp; PSYKHE CONSULTORES SST SAS</p>
        <p className="text-center">Fecha de entrada en vigor: 19 de junio de 2025</p>

        <h2 className="font-bold">1. Responsable del tratamiento de datos personales</h2>
        <p>
          PSYKHE CONSULTORES SST SAS con NIT 901262237-0: es responsable del tratamiento de los datos personales recolectados a través del software COGENT. Para cualquier consulta, petición o reclamo en relación con la protección de datos, puede contactarnos en:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Correo electrónico: info@psykheconsultores.com</li>
          <li>Teléfono: 3204006809</li>
        </ul>

        <h2 className="font-bold pt-2">2. Finalidad de la recolección y tratamiento de datos</h2>
        <p>Los datos personales recolectados a través del software COGENT se utilizarán exclusivamente para los siguientes fines:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Realizar la evaluación y gestión de riesgos psicosociales conforme a la Resolución 2764 de 2022 y demás normativas aplicables.</li>
          <li>Generar informes individuales y/o consolidados para orientar acciones de mejoramiento en el ámbito ocupacional.</li>
          <li>Cumplir obligaciones legales y contractuales en materia de seguridad y salud en el trabajo.</li>
          <li>Mantener la confidencialidad y seguridad de la información recolectada.</li>
        </ul>

        <h2 className="font-bold pt-2">3. Datos recolectados</h2>
        <p>A través de COGENT y los servicios de PSYKHE CONSULTORES, podemos recolectar los siguientes tipos de datos personales y laborales:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Nombre, identificación y datos de contacto.</li>
          <li>Datos sociodemográficos y laborales requeridos para la batería de evaluación psicosocial.</li>
          <li>Respuestas a cuestionarios, evaluaciones y formularios digitales.</li>
          <li>Datos relacionados con la empresa y el cargo.</li>
        </ul>

        <h2 className="font-bold pt-2">4. Confidencialidad y seguridad de la información</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Los datos recolectados serán tratados de forma confidencial y únicamente por personal autorizado de PSYKHE CONSULTORES SST SAS.</li>
          <li>Los resultados individuales no serán divulgados a terceros sin consentimiento expreso del titular, salvo requerimiento legal.</li>
          <li>La información se almacena en sistemas seguros, con medidas técnicas y administrativas para proteger contra acceso, alteración, pérdida o uso no autorizado.</li>
        </ul>

        <h2 className="font-bold pt-2">5. Derechos de los titulares</h2>
        <p>Como titular de sus datos personales, usted tiene derecho a:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Conocer, actualizar y rectificar sus datos personales.</li>
          <li>Solicitar prueba de la autorización otorgada para el tratamiento de sus datos.</li>
          <li>Ser informado sobre el uso que se ha dado a sus datos.</li>
          <li>Revocar la autorización o solicitar la supresión de los datos cuando no exista un deber legal o contractual que lo impida.</li>
        </ul>
        <p>Para ejercer estos derechos, puede contactarnos a través de los canales indicados en el punto 1.</p>

        <h2 className="font-bold pt-2">6. Transferencia y transmisión de datos</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Los datos personales no serán transferidos ni transmitidos a terceros fuera de las finalidades aquí señaladas, salvo obligación legal, contractual o con autorización expresa del titular.</li>
          <li>En los casos en que deba compartirse información con aliados o subcontratistas, se exigirán los mismos estándares de confidencialidad y seguridad.</li>
        </ul>

        <h2 className="font-bold pt-2">7. Almacenamiento y conservación</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Los datos serán almacenados por el tiempo necesario para cumplir las finalidades descritas y de acuerdo con los términos establecidos por la ley.</li>
          <li>La información recolectada podrá formar parte de la historia clínica ocupacional, cuando así lo requiera la normatividad vigente.</li>
        </ul>

        <h2 className="font-bold pt-2">8. Modificaciones a la política</h2>
        <p>PSYKHE CONSULTORES SST SAS y COGENT se reservan el derecho de modificar la presente política en cualquier momento. Las actualizaciones serán publicadas en el sitio web y/o en la plataforma digital.</p>

        <h2 className="font-bold pt-2">9. Aceptación de la política</h2>
        <p>El uso de la plataforma COGENT implica la aceptación expresa de esta Política de Privacidad.</p>

        <p className="pt-2">Para mayor información o consultas, contáctenos:<br />psykheconsultores@gmail.com | 3204006809</p>

        <div className="pt-6 text-center">
          <button
            onClick={onBack}
            className="py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#2EC4FF] to-[#005DFF] shadow-md transition-transform hover:scale-105"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
