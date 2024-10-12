import WebSocket, { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

import { getFormattedTime } from '../Utils/Time';
import IHandlerMessenger from '../Services/IHandlerMessenger';
import HandlerMessenger from '../Services/HandlerMessenger';
import Messenger from '../Services/Messenger';

dotenv.config();

export default class Server {
    private wss: WebSocketServer;
    private port: number = process.env.PORT ? parseInt(process.env.PORT) : 1582;
    private clients: Map<WebSocket, string>;
    private handlerMessenger: IHandlerMessenger;

    constructor() {
        this.wss = new WebSocketServer({ port: this.port });
        this.clients = new Map();
        this.handlerMessenger = new HandlerMessenger(this.clients);
        console.log(
            `WebSocket server is running on ws://localhost:${
                this.port
            } | time: ${getFormattedTime()}`
        );
        this.setupListeners();
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
            console.log(
                `Closed connection to client: ${clientId} | time: ${getFormattedTime()}`
            );
        });
        this.removeListeners();
        this.clients.clear();
    }

    public reset() {
        console.log(
            `Resetting WebSocket server... | time: ${getFormattedTime()}`
        );

        this.close();

        this.wss = new WebSocketServer({ port: this.port });
        this.clients = new Map();
        this.handlerMessenger = new HandlerMessenger(this.clients);

        console.log(
            `WebSocket server restarted on ws://localhost:${
                this.port
            } | time: ${getFormattedTime()}`
        );
        this.setupListeners();
    }

    private removeListeners(){
        this.wss.on('connection', () => {});
    }

    private setupListeners() {
        this.wss.on('connection', (ws: WebSocket) => {
            this.clients.set(ws, uuidv4());
            this.handleConnection(ws);
        });
    }

    private handleConnection(ws: WebSocket) {
        console.log(
            `New player connected: ${getFormattedTime()}, id: ${this.clients.get(
                ws
            )}`
        );
        this.handlerMessenger.onConnect(this.clients.get(ws) ?? null);
        ws.on('message', (message: WebSocket.Data) =>
            this.handleMessage(ws, message)
        );
        ws.on('close', () => this.handleDisconnect(ws));
    }

    private handleMessage(ws: WebSocket, message: WebSocket.Data) {
        // console.log('Received:', Messenger.fromString(message.toString()));
        this.handlerMessenger.onMessage(
            ws,
            Messenger.fromString(message.toString())
        );
    }

    private handleDisconnect(ws: WebSocket) {
        const clientId = this.clients.get(ws);
        if (clientId) {
            this.clients.delete(ws);
            console.log(
                `Player with id: ${clientId}  disconnected: ${getFormattedTime()}`
            );
        }
    }

    public sendMsgAll(messenge: string){
        this.clients.forEach((idClient, wsClient) => {
            if (wsClient.readyState === WebSocket.OPEN) {
                wsClient.send(new Messenger(-28, {msg: messenge}).toString());
            }
        });
    }
}
