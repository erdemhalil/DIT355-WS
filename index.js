const WebSocket = require("ws")
const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost:1883/")

const wss = new WebSocket.Server({ port: 8082 })

wss.on("connection", ws => {
    ws.on("message", mes => {
        try {
            let clientMessage = mes.toString()
            clientMessage = JSON.parse(clientMessage)
            let link = '/dentistimo/' + clientMessage.id
            client.publish(link, JSON.stringify(clientMessage))
            client.subscribe(link, e => {
                client.on('message', (topic, message) => {
                    try{
                        if(JSON.parse(message).id === clientMessage.id){
                            ws.send(message.toString())
                        }
                        client.unsubscribe(topic)
                    } catch (e) {
                        ws.send(JSON.stringify({"Error": "Received bad data from the server."}))
                        client.unsubscribe(topic)
                    }
                })
            })
        } catch (e) {
            ws.send(JSON.stringify({"Error": "400 Bad Request. Requests must be sent as stringified Json."}))
        }
    })
})
