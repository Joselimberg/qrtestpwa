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
    const registrosJSON = localStorage.getItem("registros");
    if (registrosJSON) {
      const registros: Register[] = JSON.parse(registrosJSON);
      setRegistros(registros);
    }
  }, []);

  return (
    <QRLayout pageDescription="Historial de escaner" title="Historial">
      <div>
        <h1>Mis registros</h1>
        <ul>
          {registros.map((registro, index) => (
            <li key={index}>
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