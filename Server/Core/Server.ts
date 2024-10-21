import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { getFormattedTime } from '../Utils/Time';
import HandlerMessenger from '../Services/HandlerMessenger';
import Messenger from '../Services/Messenger';
dotenv.config();

export default class Server {
    private wss: WebSocketServer;
    private port: number;
    private clients: Map<WebSocket, string>;
    private handlerMessenger: HandlerMessenger;

    constructor() {
        this.port = process.env.PORT ? parseInt(process.env.PORT) : 1582;
        this.wss = new WebSocketServer({ port: this.port });
        this.clients = new Map();
        this.handlerMessenger = new HandlerMessenger(this.clients);
        console.log(
            `WebSocket server is running on ws://localhost:${
                this.port
            } | time: ${getFormattedTime()}`
        );
    }
    public close() {
        this.wss.close(() => {
            console.log(
                `WebSocket server closed on ws://localhost:${
                    this.port
                } | time: ${getFormattedTime()}`
            );
        });

        this.clients.forEach((clientId, ws) => {
            ws.close();
            console.log(`Closed connection to client: ${clientId} | time: ${getFormattedTime()}`);
        });
        this.removeListeners();
        this.clients.clear();
    }

    public reset() {
        console.log(`Resetting WebSocket server... | time: ${getFormattedTime()}`);

        this.close();

        this.wss = new WebSocketServer({ port: this.port });
        this.clients = new Map();
        this.handlerMessenger = new HandlerMessenger(this.clients);

        console.log(
            `WebSocket server restarted on ws://localhost:${
                this.port
            } | time: ${getFormattedTime()}`
        );
    }

    private removeListeners() {
        this.wss.on('connection', () => {});
    }

    public setupListeners() {
        this.wss.on('connection', (ws: WebSocket) => {
            this.clients.set(ws, uuidv4());
            this.handleConnection(ws);
        });
    }

    private handleConnection(ws: WebSocket) {
        const clientId = this.clients.get(ws);
        if (!clientId) {
            return;
        }
        console.log(`New player connected: ${getFormattedTime()}, id: ${clientId}`);
        this.handlerMessenger.onSendIdUser(ws);
        this.handlerMessenger.onConnect();
        ws.on('message', (message: WebSocket.Data) => this.handleMessage(ws, message));
        ws.on('close', () => this.handleDisconnect(ws));
    }

    private handleMessage(ws: WebSocket, message: WebSocket.Data) {
        this.handlerMessenger.onMessage(ws, Messenger.fromString(message.toString()));
    }

    private handleDisconnect(ws: WebSocket) {
        this.handlerMessenger.onDisconnect(ws);
    }

    public senData(){
        this.handlerMessenger.sendData();
        this.handlerMessenger.sendDataProjectile();
    }
}
