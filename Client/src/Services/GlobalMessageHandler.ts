import IMessageHandler from './IMessageHandler';
import Messange from './Messange';
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
                        this.readMessenger.updateDataPlayer(realData);
                        // console.log(realData)
                        break;
                    case 301:
                        this.readMessenger.updatePointArrow(realData);
                        break;
                    case 302:
                        this.readMessenger.readDataUSer(realData);
                        // console.log(realData);
                        break;
                    case 303:
                        this.readMessenger.readDataCreateColum(realData);
                        break;
                    case 304:
                        this.readMessenger.readDataRoom(realData);
                        break;
                    case 305:
                        this.readMessenger.readDataTime(realData);
                        // console.log(realData);
                        break;
                    case 306:
                        this.readMessenger.readDataRank(realData);
                        // console.log(realData);
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
