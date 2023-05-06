import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRCodeReader() {
  const [text, setText] = useState("Resultado");
  const [error, setError] = useState("Error");

  return (
    <div>
      <h1>Lector de QR</h1>
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
          containerStyle={{width:"256px"}}
        />

        
      </div>
      <h1>{text}</h1>
    </div>
  );
}
