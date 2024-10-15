import { MessageEvent } from 'ws';
import IMessageHandler from './IMessageHandler';
import Messange from './Messange';
import Session from './Session';
import ReadMessenge from './ReadMessege';

// handle messages from the server

export default class GlobalMessengeHandeler implements IMessageHandler {
    private static instance: GlobalMessengeHandeler;
    private socket: WebSocket | null;
    private readMessenger: ReadMessenge;

    constructor() {
        this.readMessenger = new ReadMessenge();
        this.socket = null;
    }

    public static getInstance(): GlobalMessengeHandeler {
        if (!GlobalMessengeHandeler.instance) {
            GlobalMessengeHandeler.instance = new GlobalMessengeHandeler();
        }
        return GlobalMessengeHandeler.instance;
    }
    onConnectOK(): void {
        console.log('Connected to server successfully');
    }
    onConnectionFail(): void {
        // throw new Error("Method not implemented.");
    }
    onDisconnected(): void {
        console.log('Close connection to server');
    }
    onMessage(data: any): void {
        if (this.socket) {
            let msg = Messange.fromString(data);
            let realData = msg?.getData();
            if (realData) {
                switch (msg?.getId()) {
                    case 0:
                        this.readMessenger.setIdUser(realData);
                        break;
                    case 300: 
                        this.readMessenger.updateDataMap(realData);
                        break;
                    default:
                        break;
                }
            }
        } else {
            console.log('Connection erro');
        }
    }

    public setSocket(socket: WebSocket) {
        this.socket = socket;
    }
}
