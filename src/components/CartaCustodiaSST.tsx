export type EmpresaSeleccionada = {
  id?: string;
  nombre?: string;
  ciudad?: string;
  totalEncuestados?: number;
};

declare global {
  interface Window {
    __cogent?: {
      empresaSeleccionada?: EmpresaSeleccionada;
    };
  }
}

type CartaCustodiaProps = {
  organization?: string;
  city?: string;
  workers?: number;
  resolveEmpresa?: () => EmpresaSeleccionada;
  signatureSrc?: string;
  signerName?: string;
  signerTitle?: string;
  signerLicense?: string;
  subject?: string;
  exportMode?: boolean;
};

export default function CartaCustodiaSST({
  organization = "Empresa",
  city = "Bogotá D.C.",
  workers = 0,
  resolveEmpresa,
  signatureSrc = "/signature.png",
  signerName = "Lilian Navas Fonseca",
  signerTitle = "Psicóloga Especialista en SST",
  signerLicense = "LICENCIA 823",
  subject = "Custodia de Historia Clínica por Resultados de la Batería de Riesgo Psicosocial.",
  exportMode = false,
}: CartaCustodiaProps) {
  const empresa =
    resolveEmpresa?.() ?? window.__cogent?.empresaSeleccionada ?? undefined;

  const nombreOrg = empresa?.nombre ?? organization;
  const ciudad = empresa?.ciudad ?? city;
  const nTrab = empresa?.totalEncuestados ?? workers;

  const formattedWorkers = new Intl.NumberFormat("es-CO").format(nTrab);
  const workerLabel = nTrab === 1 ? "trabajador" : "trabajadores";

  return (
    <article
      className="bg-white border border-slate-200 rounded-2xl shadow-sm max-w-3xl mx-auto p-6 md:p-10 print:bg-white print:shadow-none print:border-0 print:p-0 print:m-0 print:w-[210mm] text-slate-800 leading-relaxed"
      style={exportMode ? { breakInside: "avoid", pageBreakInside: "avoid" } : undefined}
    >
      <header className="mb-6">
        <p className="font-semibold">{nombreOrg}</p>
        <p className="text-slate-600">{ciudad}</p>
      </header>
      <section>
        <p className="mb-4 font-semibold text-justify">Asunto: {subject}</p>
        <p className="mb-4 text-justify">Estimados Señores,</p>
        <p className="mb-4 text-justify">
          Por medio de la presente, me permito informar que en cumplimiento de la
          Resolución 2764 de 2022, emitida por el Ministerio de Salud y Protección
          Social, se han llevado a cabo las evaluaciones correspondientes a la
          batería de riesgo psicosocial en nuestra empresa.
        </p>
        <p className="mb-4 text-justify">
          Con base en los resultados obtenidos y siguiendo los lineamientos de
          dicha resolución, se procede a la custodia de las historias clínicas
          relacionadas con estas evaluaciones. La información obtenida de estas
          evaluaciones es de carácter confidencial y será tratada conforme a las
          normativas vigentes en protección de datos personales y de salud
          ocupacional.
        </p>
        <p className="mb-4 text-justify">
          Para {formattedWorkers} {workerLabel}.
        </p>
        <p className="mb-4 text-justify">
          La custodia de esta información se realizará de acuerdo con los
          principios de confidencialidad, integridad y disponibilidad,
          garantizando que solo el personal autorizado tendrá acceso a la misma.
          La documentación se almacenará en archivo físico bajo llave por un
          período de un año.
        </p>
        <p className="mb-4 text-justify">
          Quedamos atentos a cualquier requerimiento adicional que considere
          necesario y agradecemos la atención prestada.
        </p>
        <p className="mb-4 text-justify">Atentamente,</p>
      </section>
      <footer>
        <img
          src={signatureSrc}
          alt={`Firma de ${signerName}`}
          className="mt-8 h-16 md:h-20 w-auto"
        />
        <address className="not-italic mt-2">
          <p className="font-semibold">{signerName}</p>
          <p>{signerTitle}</p>
          <p>{signerLicense}</p>
        </address>
      </footer>
    </article>
  );
}

