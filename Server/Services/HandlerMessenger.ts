// handle messenger from the client to the server
import { WebSocket } from 'ws';

import Messenger from './Messenger';
import Player from '../Entities/Player';
import Session from '../Core/Session';
import ReadMessenger from './ReadMessenger';

import { getFormattedTime } from '../Utils/Time';

export default class HandlerMessenger {
    private clients: Map<WebSocket, string>;
    private readMessenger: ReadMessenger;
    constructor(clients: Map<WebSocket, string>) {
        this.clients = clients;
        this.readMessenger = new ReadMessenger();
    }

    onConnect(id: string | null): void {
        if (id) {
            Session.getInstance().addPlayer(new Player(id, null));
        }
    }
    onConnectFail(): void {
        console.log('ConnectFail');
    }

    onMessage(client: WebSocket, msg: Messenger | null): void {
        if (msg == null) {
            console.log('messenger is null');
            return;
        }
        let idPlayer: string | undefined;
        idPlayer = this.getIdPlayerByWs(client);
        msg.setUser(idPlayer);
        console.log(`${getFormattedTime()}: ${idPlayer} send Messenger`);
        console.log(msg);
        let data: any;
        this.clients.forEach((idClient, wsClient) => {
            if (wsClient !== client && wsClient.readyState === WebSocket.OPEN) {
                // console.log(Session.getInstance().getPlayers())
                // wsClient.send(new Messenger(3, { Key: Object.fromEntries(Session.getInstance().getPlayers())}).toString());
            } else {
                if (wsClient.readyState === WebSocket.OPEN) {
                    // wsClient.send(new Messenger(1, { a: 111 }).toString());
                }
            }
        });
        if (!idPlayer) {
            return;
        }
        switch (msg.getId()) {
            case 1: // Join Room
                this.readMessenger.joinRoom(msg);
                this.sendDataToPlayer(client, new Messenger(2, { name: 'Mage' }));
                break;
            case 2: // Add Models
                break;
            case 11: // Jump
                data = msg.getData() as { force: { x: number; y: number; z: number }};
                this.readMessenger.applyForce(idPlayer, data.force);
                break;
            case 12: // Movent
                data = msg.getData() as { velocity: { x: number; y: number; z: number } , angle: number };
                this.readMessenger.applyVelocity(idPlayer, data.velocity, data.angle);
                break;
            case 13: // Attack
                this.readMessenger.playerAttack(idPlayer);
                break;
            default:
                break;
        }
    }

    onDisconnect(ws: WebSocket): void {
        const clientId = this.clients.get(ws);
        if (clientId) {
            Session.getInstance().removePlayer(clientId);
            this.clients.delete(ws);
            console.log(`Player with id: ${clientId}  disconnected: ${getFormattedTime()}`);
        }
    }

    onSendIdUser(ws: WebSocket) {
        ws.send(new Messenger(0, { id: this.clients.get(ws) }).toString());
    }

    public getIdPlayerByWs(ws: WebSocket) {
        return this.clients.get(ws);
    }

    public sendData() {
        let data = Session.getInstance().getPosition();
        this.clients.forEach((key, ws) => {
            let idPlayer: string | undefined;
            idPlayer = this.getIdPlayerByWs(ws);
            if (idPlayer && idPlayer == key) {
                let idRoom = Session.getInstance().getidRoomByIdPlayer(idPlayer);
                if (idRoom) {
                    ws.send(new Messenger(300, data[idRoom]).toString());
                }
            }
        });
    }

    private sendDataToPlayer(client: WebSocket, msg: Messenger) {
        this.clients.forEach((idClient, wsClient) => {
            if (wsClient !== client && wsClient.readyState === WebSocket.OPEN) {
                wsClient.send(msg.toString());
            }
        });
    }
}
