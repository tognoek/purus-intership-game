import dotenv from 'dotenv';

import GlobalMessengeHandeler from '../Services/GlobalMessageHandler';
import Messange from '../Services/Messange';

export default class NetWork {
    private socket: WebSocket | null;

    constructor() {
        this.socket = null;
    }

    public connect(host: string, port: number): boolean {
        this.socket = new WebSocket(`ws://${host}:${port}`);
        if (this.socket) {
            GlobalMessengeHandeler.getInstance().setSocket(this.socket);
            return true;
        } else {
            console.error('Socket not connected');
            return false;
        }
    }

    public disconnect() {
        this.socket?.close();
        this.socket = null;
    }

    public onOpen() {
        if (this.socket) {
            this.socket.onopen = () => {
                GlobalMessengeHandeler.getInstance().onConnectOK();
            };
        } else {
            console.error('Socket not connected');
        }
    }

    public onClose() {
        if (this.socket) {
            this.socket.onclose = () => {
                GlobalMessengeHandeler.getInstance().onDisconnected();
            };
        } else {
            console.error('Socket not connected');
        }
    }

    public onMessenger() {
        if (this.socket) {
            console.log(123)
            this.socket.onmessage = (data: MessageEvent) => {
                GlobalMessengeHandeler.getInstance().onMessage(data.data);
            };
        } else {
            console.error('Socket not connected');
        }
    }

    public handlerSend(message: Messange) {
        if (!this.socket) {
            console.error('Socket not connected');
        }
        this.socket?.send(message.toString());
    }
}
