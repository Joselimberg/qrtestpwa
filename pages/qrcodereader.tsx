import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QRCodeReader() {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>Lector de QR</h1>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setText((result as any).text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        constraints={{ facingMode: "environment" }}
        scanDelay={700}
        containerStyle={{ with: "100%" }}
      />

      <h1>{text}</h1>
    </div>
  );
}
