import { useState, useRef, useEffect } from "react";

import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { QRLayout } from "../components/layouts/QRLayout";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface Coords {
  lat: number;
  lng: number;
}

export default function GeneratorPage() {
  const router = useRouter();
  const { data } = useSession();
  console.log(data);

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const qrRef = useRef(null);

  const downloadQR = () => {
    html2canvas(qrRef.current!).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob!, "qr-code.png");
      });
    });
  };

  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  const askForPermission = async () => {
    const result = await Notification.requestPermission();
    return result;
  };

  const [mensaje, setMensaje] = useState("");

  const createNotification = (title: string, options?: NotificationOptions) => {
    alert("notificando");
    setMensaje("Generando notificación ");
    if (Notification.permission === 'granted') {
      // Crear y mostrar la notificación push
      const notification = new Notification(title, options);
    } else {
      // Pedir permiso para enviar notificaciones push
      askForPermission();
    }
  };

  return (
    <QRLayout pageDescription="Generador de QR" title="Generador QR">
      <div className="flex justify-center mx-28 mb-2">
        <h2 className="text-lg">
          Bienvenido{" "}
          <span className="text-yellow-300">{(data as any)?.user.name}</span>{" "}
          ----{" "} {mensaje}
          <span className="text-yellow-300">{(data as any)?.user.email}</span>
        </h2>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-white" ref={qrRef}>
          {/* <Image src={'/mxnlabs.png'} width={100} height={100}/> */}
          <h1 className="text-2xl pb-3 text-black">Mxnlabs</h1>
          <div className="rounded shadow-lg">
            <QRCode
              size={256}
              bgColor="#FFFFFF"
              fgColor="#1b4f72"
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={value}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-5">
        <div className=" mx-2 w-4/6 text-center">
          {coords ? (
            <p>
              Tus coordenadas son: {coords.lat}, {coords.lng}
            </p>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
        <label className="text-3xl pb-3">Ingresa un texto</label>
        <input
          className="text-2xl text-black w-60 md:w-2/4 shadow-lg"
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-around w-3/4 mt-2 px-3">
          <button
            className=" bg-sky-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
            onClick={downloadQR}
          >
            Descargar QR
          </button>

          <button
            className=" bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => createNotification('¡Hola mundo!',{silent: false, body:"Soy el cuerpo de la notificacion"})}
          >
            Notifiaciones
          </button>

          <button
            className=" bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              signOut();
              router.push("./");
            }}
          >
            Salir
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center h-50 mt-1">
        <label className="text-2xl pb-3 mt-2">Deja un mensaje</label>
        <textarea
          className="text-black w-60 md:w-1/3 shadow-lg h-20"
          value={message}
          maxLength={80}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          className="mt-2 bg-sky-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
          onClick={() => {}}
        >
          Enviar
        </button>
      </div>
    </QRLayout>
  );
}
