self.addEventListener('push', (event) => {
  console.log('Push received', event)

  // Obtener la información de la notificación
  const data = event.data.json()

  // Enviar la información de la notificación al servidor
  fetch('/api/send-push-notification', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  // Mostrar la notificación al usuario
  const options = {
    body: data.body,
    icon: '/icon.png',
  }
  event.waitUntil(self.registration.showNotification(data.title, options))
})

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked', event)
  event.notification.close()
})