import Messenge from "./Messenger";

export default interface IMessageHandler{
    onConnectOK(): void;
    onConnectionFail(): void;
    onDisconnected(): void;
    onMessage(msg: Messenge): void;
}