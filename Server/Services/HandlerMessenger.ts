// handle messenger from the client to the server
import { WebSocket } from "ws";

import IHandlerMessenger from "./IHandlerMessenger";
import Messenger from "./Messenger";
import Player from "../Entities/Player";
import Session from "../Core/Session";

export default class HandlerMessenger implements IHandlerMessenger{
    private clients: Map<WebSocket,string>;
    constructor(clients: Map<WebSocket,string>){
        this.clients = clients;
    }

    onConnect(id: string | null): void {
        if (id){
            Session.getInstance().addPlayer(new Player(id, null));
        }
    }
    onConnectFail(): void {
        
    }
    // 1 join room
    onMessage(client: WebSocket, msg: Messenger | null): void {
        if (msg == null) {
            console.log("messenger is null");
            return;
        }
        this.clients.forEach((idClient, wsClient) => {
            if (wsClient !== client && wsClient.readyState === WebSocket.OPEN) {
                // console.log(Session.getInstance().getPlayers())
                wsClient.send(JSON.stringify({ Key: Object.fromEntries(Session.getInstance().getPlayers())}));
            }
        });
        switch (msg.getId()) {
            case 1:

                break;
        
            default:
                break;
        }
    }
    onDisconnect(): void {
        
    }

}