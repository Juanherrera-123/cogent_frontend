import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { CredencialEmpresa } from "../types";
import { demoCredencialesConst } from "../data/demoCredenciales";
import { toast } from "../utils/toast";

export default function useCredenciales() {
  const demoCredenciales: (CredencialEmpresa & { rol: string })[] = JSON.parse(
    import.meta.env.VITE_DEMO_CREDENTIALS ||
      JSON.stringify(demoCredencialesConst)
  );

  const [credenciales, setCredenciales] = useState<
    (CredencialEmpresa & { rol: string; id?: string })[]
  >(demoCredenciales);
  const [empresasIniciales, setEmpresasIniciales] = useState<string[]>(() =>
    demoCredenciales
      .filter((c) => c.rol === "dueno" && c.empresa)
      .map((c) => c.empresa!)
  );

  useEffect(() => {
    const cargarCreds = async () => {
      const snap = await getDocs(collection(db, "credencialesCogent"));
      const extras = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as CredencialEmpresa & { rol: string }),
      }));
      setCredenciales((prev) => {
        const merged = [...prev];
        extras.forEach((c) => {
          if (!merged.some((m) => m.usuario === c.usuario)) {
            merged.push(c);
          }
        });
        return merged;
      });
    };
    cargarCreds();
  }, []);

  useEffect(() => {
    const empresas = Array.from(
      new Set(
        credenciales
          .filter((c) => c.rol === "dueno" && c.empresa)
          .map((c) => c.empresa as string)
      )
    );
    setEmpresasIniciales(empresas);
  }, [credenciales]);

  const agregarEmpresa = async (
    nombre: string,
    usuario: string,
    password: string
  ): Promise<boolean> => {
    try {
      const docRef = await addDoc(collection(db, "credencialesCogent"), {
        usuario,
        password,
        rol: "dueno",
        empresa: nombre,
      });
      setCredenciales((prev) => [
        ...prev,
        { id: docRef.id, usuario, password, rol: "dueno", empresa: nombre },
      ]);
      return true;
    } catch (err) {
      console.error("Error al agregar empresa", err);
      toast("No se pudo agregar la empresa");
      return false;
    }
  };

  const eliminarEmpresa = async (usuario: string): Promise<boolean> => {
    const cred = credenciales.find((c) => c.usuario === usuario);
    if (!cred?.id) return false;
    try {
      await deleteDoc(doc(db, "credencialesCogent", cred.id));
      setCredenciales((prev) => prev.filter((c) => c.usuario !== usuario));
      return true;
    } catch (err) {
      console.error("Error al eliminar empresa", err);
      toast("No se pudo eliminar la empresa");
      return false;
    }
  };

  const editarEmpresa = async (
    originalUsuario: string,
    nombre: string,
    usuario: string,
    password: string
  ): Promise<boolean> => {
    const cred = credenciales.find((c) => c.usuario === originalUsuario);
    if (!cred?.id) return false;
    try {
      await updateDoc(doc(db, "credencialesCogent", cred.id), {
        usuario,
        password,
        empresa: nombre,
      });
      setCredenciales((prev) =>
        prev.map((c) =>
          c.usuario === originalUsuario
            ? { ...c, usuario, password, empresa: nombre }
            : c
        )
      );
      return true;
    } catch (err) {
      console.error("Error al editar empresa", err);
      toast("No se pudo editar la empresa");
      return false;
    }
  };

  return {
    credenciales,
    empresasIniciales,
    agregarEmpresa,
    eliminarEmpresa,
    editarEmpresa,
  };
}
