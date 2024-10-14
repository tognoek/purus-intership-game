import { MessageEvent } from "ws";

export default interface IMessageHandler{
    onConnectOK(): void;
    onConnectionFail(): void;
    onDisconnected(): void;
    onMessage(msg: any): void;
}