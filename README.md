# Web Socket Server

Because modern browsers can’t directly interface with MQTT there needed to be a bridge between the client and MQTT. The client connects to the server and send a message that is then forwarded to MQTT awaiting a response.  

## Setup Instructions

### Prerequisites 
To run this server you will need Node and MQTT installed on your computer.

You can install them by clicking on the according option below (you'll be redirected to a third-party web page):
- [Node](https://nodejs.org/en/download/)
- [MQTT](https://mosquitto.org/download/)

### Running

1. Launch a terminal, navigate to the WebSocket Server folder by using the following command from the root directory. 

    `cd .\ws-server\`

2. Install the required requirements using the command: 

    `npm install`

3. You can now start the WebSocket Server by running the command: 

    `node index.js`
