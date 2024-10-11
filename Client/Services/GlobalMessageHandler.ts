import IMessageHandler from "./IMessageHandler";
import Messenge from "./Messenger";

// handle messages from the server

export default class GlobalMessengeHandeler implements IMessageHandler{
    private static instance: GlobalMessengeHandeler;
    public static getInstance(): GlobalMessengeHandeler{
        if(!GlobalMessengeHandeler.instance){
            GlobalMessengeHandeler.instance = new GlobalMessengeHandeler();
        }
        return GlobalMessengeHandeler.instance;
    }
    onConnectOK(): void {
        throw new Error("Method not implemented.");
    }
    onConnectionFail(): void {
        throw new Error("Method not implemented.");
    }
    onDisconnected(): void {
        throw new Error("Method not implemented.");
    }
    onMessage(msg: Messenge): void {
        throw new Error("Method not implemented.");
    }
}