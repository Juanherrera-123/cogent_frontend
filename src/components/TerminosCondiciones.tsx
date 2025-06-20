import React from "react";

type Props = { onBack: () => void };

export default function TerminosCondiciones({ onBack }: Props) {
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
          Términos y Condiciones
        </h1>
        <p className="text-center font-semibold">COGENT &amp; PSYKHE CONSULTORES SST SAS</p>
        <p className="text-center">Fecha de entrada en vigor: 19 de junio de 2025</p>

        <h2 className="font-bold">1. Aceptación de los términos</h2>
        <p>
          El acceso y uso del software COGENT, así como de los servicios ofrecidos por PSYKHE CONSULTORES SST SAS, están sujetos a los presentes Términos y Condiciones. Al ingresar, registrarse o utilizar la plataforma, el usuario declara haber leído, entendido y aceptado estos términos en su totalidad.
        </p>

        <h2 className="font-bold">2. Objeto</h2>
        <p>
          El software COGENT es una plataforma digital especializada en la recolección, procesamiento y análisis de datos para la evaluación de riesgos psicosociales en el entorno laboral, desarrollada y operada por PSYKHE CONSULTORES SST SAS. El propósito principal es apoyar a las empresas en el cumplimiento de la normatividad colombiana en seguridad y salud en el trabajo, brindando herramientas confiables y seguras para la toma de decisiones.
        </p>

        <h2 className="font-bold">3. Condiciones de uso</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>El usuario se compromete a hacer uso adecuado y responsable del software, respetando las leyes vigentes, la ética profesional y la privacidad de los participantes.</li>
          <li>Queda prohibido realizar cualquier tipo de manipulación, alteración, reproducción no autorizada, extracción masiva de datos o uso distinto al establecido en estos términos.</li>
          <li>El acceso a ciertas funcionalidades puede requerir autenticación y autorización previa por parte de la empresa contratante.</li>
        </ul>

        <h2 className="font-bold">4. Propiedad intelectual</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Todo el contenido, software, diseño, código fuente, bases de datos, manuales y materiales relacionados con COGENT son propiedad exclusiva de PSYKHE CONSULTORES SST SAS o de sus aliados autorizados, y están protegidos por la legislación colombiana sobre derechos de autor y propiedad intelectual.</li>
          <li>Queda prohibida la copia, reproducción, distribución, transmisión, modificación o uso no autorizado de cualquier elemento de la plataforma, salvo autorización expresa y por escrito.</li>
        </ul>

        <h2 className="font-bold">5. Responsabilidad</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>PSYKHE CONSULTORES SST SAS garantiza la confidencialidad y seguridad en el manejo de los datos, pero no se hace responsable por el uso indebido que los usuarios puedan hacer de la información extraída de la plataforma.</li>
          <li>La información, análisis y reportes generados por COGENT son de carácter consultivo y orientador. Las decisiones adoptadas con base en dichos reportes son responsabilidad exclusiva de la empresa contratante y sus usuarios.</li>
          <li>La plataforma puede no estar disponible temporalmente debido a mantenimientos o actualizaciones técnicas. Se procurará informar previamente en la medida de lo posible.</li>
        </ul>

        <h2 className="font-bold">6. Protección de datos personales</h2>
        <p>
          El uso del software implica el consentimiento para el tratamiento de datos personales conforme a la Política de Privacidad de Datos publicada en la plataforma. El usuario reconoce y acepta que toda la información recolectada será utilizada únicamente para los fines definidos y bajo los estándares de confidencialidad y seguridad mencionados.
        </p>

        <h2 className="font-bold">7. Modificaciones de los términos</h2>
        <p>
          PSYKHE CONSULTORES SST SAS se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios serán informados y publicados en la plataforma. El uso continuado de COGENT implica la aceptación de los nuevos términos.
        </p>

        <h2 className="font-bold">8. Vigencia y terminación</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Estos términos y condiciones estarán vigentes a partir de la fecha de publicación y hasta que sean modificados o reemplazados por una nueva versión.</li>
          <li>PSYKHE CONSULTORES SST SAS podrá suspender o cancelar el acceso a la plataforma en caso de incumplimiento de estos términos, uso indebido o actividades contrarias a la ley.</li>
        </ul>

        <h2 className="font-bold">9. Jurisdicción y ley aplicable</h2>
        <p>
          Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de la interpretación o aplicación de estos términos será resuelta ante los tribunales competentes de la ciudad de Bogota.
        </p>

        <p className="pt-2">Para consultas, soporte o reclamos, puede comunicarse a:<br />info@psykheconsultores.com | 320 400 6809</p>

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
