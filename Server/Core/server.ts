import WebSocket, { WebSocketServer } from 'ws';

import { getFormattedTime } from '../Utils/time';

export default class GameServer {
    private wss: WebSocketServer;

    constructor(port: number) {
        this.wss = new WebSocketServer({ port });
        this.setupListeners();
        console.log(`WebSocket server is running on ws://localhost:${port} | time: ${getFormattedTime()}`);
    }

    private setupListeners() {
        this.wss.on('connection', (ws: WebSocket) => this.handleConnection(ws));
    }

    private handleConnection(ws: WebSocket) {
        console.log(`New player connected: ${getFormattedTime()}`);

        ws.on('message', (message: WebSocket.Data) => this.handleMessage(ws, message));
        ws.on('close', () => this.handleDisconnect());
    }

    private handleMessage(ws: WebSocket, message: WebSocket.Data) {
        console.log('Received:', message.toString());

        this.wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ "Key": "values" }));
            }
        });
    }

    private handleDisconnect() {
        console.log(`Player disconnected: ${getFormattedTime()}`);
    }
}
