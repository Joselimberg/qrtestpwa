import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { QRLayout } from "../components/layouts/QRLayout";

export default function QRCodeReader() {
  const [text, setText] = useState("Escaneando...");

  return (
    <QRLayout pageDescription="Lector QR" title="Lector QR">
      <div>
      <h1 className="text-5xl text-center">Lector de QR</h1>
      <div className="flex justify-center">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              setText((result as any).text);
            }

            if (!!error) {
              console.log(error);
              // setError(error as any);
            }
          }}
          constraints={{ facingMode: "environment" }}
          scanDelay={500}
          className="border"
          containerStyle={{width:"256px", heigth:"256px"}}
          videoStyle={{width:"256px", heigth:"256px"}}
          videoContainerStyle={{width:"256px", heigth:"256px"}}
          ViewFinder={() => {
            return (<div className="">soy el overlay</div>)
          }}
          videoId="qrvideo"

        />

        
      </div>
      <div className="flex justify-center"><h1 className="text-2xl">{text}</h1></div>
      
    </div>
    </QRLayout>
    
  );
}
