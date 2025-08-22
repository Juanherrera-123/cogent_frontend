import { useEffect, useMemo, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { ResultRow } from "@/types";
import { calcularFormaA } from "@/utils/calcularFormaA";

export function useDashboardData(empresaFiltro?: string) {
  const [datos, setDatos] = useState<(ResultRow & { id: string })[]>([]);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(
    empresaFiltro || "todas"
  );
  const [empresaEliminar, setEmpresaEliminar] = useState("todas");

  useEffect(() => {
    const cargar = async () => {
      const snap = await getDocs(collection(db, "resultadosCogent"));
      const arr = snap.docs.map((d) => {
        const data = { id: d.id, ...(d.data() as ResultRow) };
        if (
          data.tipo === "A" &&
          data.respuestas?.bloques &&
          !data.resultadoFormaA?.dimensiones?.["Retroalimentación del desempeño"]
        ) {
          data.resultadoFormaA = calcularFormaA(data.respuestas.bloques);
        }
        return data;
      });
      setDatos(arr);
    };
    cargar();
  }, []);

  const empresasResultados = useMemo(
    () => Array.from(new Set(datos.map((d) => d.ficha?.empresa || "Sin empresa"))),
    [datos]
  );

  const datosMostrados = useMemo(
    () =>
      datos.filter(
        (d) =>
          empresaSeleccionada === "todas" ||
          d.ficha?.empresa === empresaSeleccionada
      ),
    [datos, empresaSeleccionada]
  );

  const datosEliminar = useMemo(
    () =>
      datos.filter(
        (d) => empresaEliminar === "todas" || d.ficha?.empresa === empresaEliminar
      ),
    [datos, empresaEliminar]
  );

  const datosA = useMemo(
    () =>
      datosMostrados.filter(
        (d) =>
          d.tipo === "A" && d.resultadoFormaA && d.resultadoFormaA.valido !== false
      ),
    [datosMostrados]
  );

  const datosB = useMemo(
    () =>
      datosMostrados.filter(
        (d) =>
          d.tipo === "B" && d.resultadoFormaB && d.resultadoFormaB.valido !== false
      ),
    [datosMostrados]
  );

  const datosExtra = useMemo(
    () =>
      datosMostrados.filter(
        (d) =>
          d.resultadoExtralaboral && d.resultadoExtralaboral.valido !== false
      ),
    [datosMostrados]
  );

  const datosEstres = useMemo(
    () =>
      datosMostrados.filter(
        (d) => d.resultadoEstres && d.resultadoEstres.valido !== false
      ),
    [datosMostrados]
  );

  return {
    datos,
    setDatos,
    empresaSeleccionada,
    setEmpresaSeleccionada,
    empresaEliminar,
    setEmpresaEliminar,
    empresasResultados,
    datosMostrados,
    datosEliminar,
    datosA,
    datosB,
    datosExtra,
    datosEstres,
  };
}

export default useDashboardData;
