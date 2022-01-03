const WebSocket = require("ws")
const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1883/")

const wss = new WebSocket.Server({ port: 8082 })

let count = 0
setInterval(() => {
    count = 0
}, 1000);

wss.on("connection", ws => {
    if (count < 10) {
        ws.on("message", mes => {
            try {
                let clientMessage = mes.toString()
                clientMessage = JSON.parse(clientMessage)
                let link = '/dentistimo/' + clientMessage.id
                client.publish(link, JSON.stringify(clientMessage), { qos: 1 })
                client.subscribe(link, { qos: 1 }, e => {
                    client.on('message', (topic, message) => {
                        try {
                            if (JSON.parse(message).id === clientMessage.id && JSON.parse(message)["response"] === "response") {
                                ws.send(message.toString())
                                client.unsubscribe(topic)
                            }
                        } catch (e) {
                            ws.send(JSON.stringify({ "Error": "Received bad data from the server." }))
                            client.unsubscribe(topic)
                        }
                    })
                })
            } catch (e) {
                ws.send(JSON.stringify({ "Error": "400 Bad Request. Requests must be sent as stringified Json." }))
            }
        })
        count++
    } else {
        ws.send(JSON.stringify({ "Error": "429 Too Many Requests. Please try again later." }))
    }
})
