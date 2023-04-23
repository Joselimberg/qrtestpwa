import { useState } from "react";

const PushNotificationsButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const subscribeToPushNotifications = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn(
        "Las notificaciones push no son compatibles con este navegador"
      );
      return;
    }

    try {
      const serviceWorkerRegistration = await navigator.serviceWorker.register(
        "/worker/index.js"
      );
      let subscription =
        await serviceWorkerRegistration.pushManager.getSubscription();

      if (subscription === null) {
        subscription = await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey:
            "BG6K_an7ODaFAmwnLws3B3Ifdut7n_4qPEaStWH3NYIZxZhB5bx-9yKZdbPcfrNdKCderFqM63Se2YNKSgZZJqU",
        });
        console.log("Se ha suscrito a las notificaciones push con éxito");
      } else {
        console.log("Ya se ha suscrito a las notificaciones push");
      }

      setIsSubscribed(true);
    } catch (err) {
      console.error("Error al suscribirse a las notificaciones push:", err);
    }
  };

  return (
    <button
      className=" bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
      onClick={subscribeToPushNotifications}
      disabled={isSubscribed}
    >
      {isSubscribed
        ? "Suscrito a las notificaciones push"
        : "Habilitar notificaciones push"}
    </button>
  );
};

export default PushNotificationsButton;
