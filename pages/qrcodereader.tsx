import { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import { QRLayout } from "../components/layouts/QRLayout";
import { useRouter } from "next/router";

export default function QRCodeReader() {
  interface Coords {
    lat: number;
    lng: number;
  }

  interface Register {
    link: string;
    lat: number;
    lng: number;
  }
  
  const router = useRouter();
  const [text, setText] = useState("Escaneando...");
  const [showButtonR, setShowButtonR] = useState(false);
  

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

  return (
    <QRLayout pageDescription="Lector QR" title="Lector QR">
      <div>
        <h1 className="text-5xl text-center">Lector de QR</h1>
        <div className="flex justify-center">
          <QrReader
            onResult={(result, error) => {
              if (!!result) {
                setText((result as any).text);
                setShowButtonR(true);
                
                if(localStorage.getItem('register') === null){
                  const register: Register[] = []
                  const reg: Register = {link:text, lat:coords?.lat!, lng:coords?.lng!}
                  register.push(reg);
                  localStorage.setItem('register', JSON.stringify(register));
                } else {
                  const register: Register[] = JSON.parse(localStorage.getItem('register')!)
                  const reg: Register = {link:text, lat:coords?.lat!, lng:coords?.lng!}
                  register.push(reg);
                  localStorage.setItem('register', JSON.stringify(register));
                }
              }

              if (!!error) {
                console.log(error);
                // setError(error as any);
              }
            }}
            constraints={{ facingMode: "environment" }}
            scanDelay={500}
            className="border"
            containerStyle={{ width: "256px", heigth: "256px" }}
            videoStyle={{ width: "256px", heigth: "256px" }}
            videoContainerStyle={{ width: "256px", heigth: "256px" }}
            ViewFinder={() => {
              return <div className="">soy el overlay</div>;
            }}
            videoId="qrvideo"
          />
        </div>
        <h1 className="text-xl text-center">{text}</h1>
        <div className="flex justify-center">
          <button 
          className={` bg-sky-700 hover:bg-blue-900 text-white font-bold py-2 px-4 mb-3 rounded ${showButtonR ? 'block' : 'hidden'}`}
            onClick={() => {
              router.push(text);
            }}
          >Ir al enlace</button>
        </div>
        <div className="flex justify-center">
          <button 
          className={` bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded`}
            onClick={() => {
              router.push("./history");
            }}
          >Ir al historial</button>
        </div>
        
      </div>
    </QRLayout>
  );
}
