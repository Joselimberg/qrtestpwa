import { NextApiRequest, NextApiResponse } from 'next'
import webPush, { SendResult } from 'web-push'

webPush.setVapidDetails(
    'mailto:joselimberg291197@gmail.com',
    'BFSLtdWKhwIhSdPw51c1lQ2xrVa9vm3gHpK-h4uPHhTISNVsfbLrg5fPs5oM6zW5WxnIyOX1VWR9hMXEhksXcVA',
    '6aI2qj5mN3W8OgtOCwCyMjI9MbGRmOr1WvOAwcn4PAw'
)

interface Subscription {
    endpoint: string
    keys: {
        auth: string
        p256dh: string
    }
}

export default async function sendPushNotification(
    req: NextApiRequest,
    res: NextApiResponse<{ message?: string; error?: string }>
) {
    if (req.method === 'POST') {
        const subscription: Subscription = req.body
        try {
            const payload = JSON.stringify({
                title: 'Nueva notificación',
                body: 'Ejemplo de notificación Push',
                url: 'https://ejemplo.com',
            })

            const result: SendResult = await webPush.sendNotification(
                subscription,
                payload
            )

            if (result.statusCode === 201) {
                res.status(200).json({ message: 'Notificación enviada' })
            } else {
                res
                    .status(500)
                    .json({ error: 'Error al enviar la notificación Push' })
            }
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Error al enviar la notificación Push' })
        }
    } else {
        res.status(405).json({ error: 'Método no permitido' })
    }
}