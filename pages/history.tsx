import { useEffect, useState } from "react";
import { QRLayout } from "../components/layouts/QRLayout";

const history = () => {
  interface Register {
    link: string;
    lat: number;
    lng: number;
  }

  const [registros, setRegistros] = useState<Register[]>([]);

  useEffect(() => {
    const registrosJSON = localStorage.getItem("register");
    if (registrosJSON) {
      const registros: Register[] = JSON.parse(registrosJSON);
      setRegistros(registros);
      console.log(registros);
    }
  }, []);

  return (
    <QRLayout pageDescription="Historial de escaner" title="Historial">
      <div className="mx-10">
        <h1>Mis registros</h1>
        <button
            className={` bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded`}
            onClick={() => {
              localStorage.removeItem('register');
            }}
          >
            Borrar historial
          </button>
        <ul className="list-disc">
          {registros.map((registro, index) => (
            <li key={index} className="">
              <p>Link: {registro.link}</p>
              <p>Latitud: {registro.lat}</p>
              <p>Longitud: {registro.lng}</p>
            </li>
          ))}
        </ul>
      </div>
    </QRLayout>
  );
};

export default history;
