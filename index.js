const WebSocket = require("ws")
const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1883/")

const wss = new WebSocket.Server({ port: 8082 })

wss.on("connection", ws => {
    console.log("connected")
    ws.on("message", m => {
        let message1 = m.toString()
        message1 = JSON.parse(message1)
        let link = '/dentistimo/' + message1.id
        client.publish(link, JSON.stringify(message1))
        client.subscribe(link, e => {
            client.on('message', (topic, message) => {
                console.log(message)
                console.log(topic)
                if(JSON.parse(message).id === message1.id){
                    ws.send(message.toString())
                }
                client.unsubscribe(topic)
            })
        })
    })
})

