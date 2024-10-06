const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 1582 });

wss.on('connection', (ws) => {
    console.log('New player connected');

    ws.on('message', (message) => {
        console.log('Received:', message.toString());

        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({"Key" : "values"}));
            }
        });
    });

    ws.on('close', () => {
        console.log('Player disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:1582');
