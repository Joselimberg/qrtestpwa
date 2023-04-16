import { useState, useRef, useEffect } from "react";

import { QRLayout } from "../components/layouts/QRLayout";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <QRLayout pageDescription="Generador de QR" title="Bienvenido">
      <div className="flex justify-center">
        <button
          className="mt-52 bg-sky-700 hover:bg-blue-900 text-white font-bold py-2 px-4 border rounded text-4xl"
          onClick={() => {
            router.push("/auth/login");
          }}
        >
          Ingresar
        </button>
      </div>
    </QRLayout>
  );
}
