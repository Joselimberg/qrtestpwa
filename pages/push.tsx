import { NextPage } from "next";
import Head from "next/head";
import { QRLayout } from "../components/layouts/QRLayout";
import { useEffect, useState } from "react";
import webpush from "web-push";

const publicKey =
  "BFSLtdWKhwIhSdPw51c1lQ2xrVa9vm3gHpK-h4uPHhTISNVsfbLrg5fPs5oM6zW5WxnIyOX1VWR9hMXEhksXcVA";

const Push: NextPage = () => {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  const subscribeToPush = async () => {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready;
    const subscription = await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
    setSubscription(subscription);
  };

  const unsubscribeFromPush = async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
    }
  };

  const sendPushNotification = async () => {
    const response = await fetch("/api/send-push-notification", {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <QRLayout
      pageDescription="Pruebas con notificaciones"
      title="Notificaciones"
    >
      <div className="flex justify-center mb-2">
        <h2 className="text-lg">Notificaciones Push</h2>
      </div>

      <div className="flex justify-around px-5">
      {subscription ? (
        <>
          {/* <p>Subscription: {JSON.stringify(subscription)}</p> */}
          <button
            className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={unsubscribeFromPush}
          >
            Desuscribirse a notificaciones push
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={sendPushNotification}
          >
            Enviar notificaión push
          </button>
        </>
      ) : (
        <button
          className=" bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={subscribeToPush}
        >
          Suscribirse a notificaciones push
        </button>
      )}
      </div>
    </QRLayout>
  );
};

export default Push;

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
