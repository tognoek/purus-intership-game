import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 1582 });

wss.on('connection', (ws: WebSocket) => {
    console.log('New player connected');

    ws.on('message', (message: WebSocket.Data) => {
        console.log('Received:', message.toString());

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ "Key": "values" }));
            }
        });
    });

    ws.on('close', () => {
        console.log('Player disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:1582');
