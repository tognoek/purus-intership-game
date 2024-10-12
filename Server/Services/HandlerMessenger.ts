// handle messenger from the client to the server
import { WebSocket } from "ws";

import IHandlerMessenger from "./IHandlerMessenger";
import Messenger from "./Messenger";
import Player from "../Entities/Player";
import Session from "../Core/Session";
import ReadMessenger from "./ReadMessenger";

import { getFormattedTime } from "../Utils/Time";

export default class HandlerMessenger implements IHandlerMessenger{
    private clients: Map<WebSocket,string>;
    private readMessenger: ReadMessenger;
    constructor(clients: Map<WebSocket,string>){
        this.clients = clients;
        this.readMessenger = new ReadMessenger();
    }

    onConnect(id: string | null): void {
        if (id){
            Session.getInstance().addPlayer(new Player(id, null));
        }
    }
    onConnectFail(): void {
        console.log("ConnectFail");
    }

    // 1 - Join room
    onMessage(client: WebSocket, msg: Messenger | null): void {
        if (msg == null) {
            console.log("messenger is null");
            return;
        }
        msg.setUser(this.getIdPlayerByWs(client));
        console.log(`${getFormattedTime()}: ${this.getIdPlayerByWs(client)} send Messenger`);
        console.log(msg);
        this.clients.forEach((idClient, wsClient) => {
            if (wsClient !== client && wsClient.readyState === WebSocket.OPEN) {
                // console.log(Session.getInstance().getPlayers())
                // wsClient.send(new Messenger(3, { Key: Object.fromEntries(Session.getInstance().getPlayers())}).toString());
            }else{
                if (wsClient.readyState === WebSocket.OPEN){
                    wsClient.send(new Messenger(1, {a: 111}).toString());
                }
            }
        });
        switch (msg.getId()) {
            case 1: // Join Room
                this.readMessenger.joinRoom(msg);
                break;
            case 2: // Add Models
                break;
            case 11: // W
                break;
            case 12: // S
                break;
            case 13: // A
                break;
            case 14: // D
                break;
            default:
                break;
        }
    }
    onDisconnect(): void {
        console.log("Disconnect");
    }

    public getIdPlayerByWs(ws: WebSocket){
        return this.clients.get(ws);
    }

}