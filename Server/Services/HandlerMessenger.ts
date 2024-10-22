// handle messenger from the client to the server
import { WebSocket } from 'ws';

import Messenger from './Messenger';
import ReadMessenger from './ReadMessenger';

import { getFormattedTime } from '../Utils/Time';
import Manager from '../Core/Manager';
import { handlerStatus } from '../Controllers/PlayerController';

export default class HandlerMessenger {
    private clients: Map<WebSocket, string>;
    private readMessenger: ReadMessenger;
    constructor(clients: Map<WebSocket, string>) {
        this.clients = clients;
        this.readMessenger = new ReadMessenger();
    }

    onConnect(): void {}
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
        if (!idPlayer) {
            return;
        }
        switch (msg.getId()) {
            case 0: // New room
                this.readMessenger.newRoom(msg);
                break;
            case 1: // Join Room
                this.readMessenger.joinRoom(msg);
                this.sendDataToPlayer(client, new Messenger(2, { name: 'Mage' }));
                break;
            case 2: // Add Models
                break;
            case 11: // Jump
                data = msg.getData() as { force: { x: number; y: number; z: number } };
                this.readMessenger.applyForce(idPlayer, data.force);
                break;
            case 12: // Movent
                data = msg.getData() as {
                    velocity: { x: number; y: number; z: number };
                    angle: number;
                };
                this.readMessenger.applyVelocity(idPlayer, data.velocity, data.angle);
                break;
            case 13: // Attack
                data = msg.getData() as {
                    angle: number;
                };
                this.readMessenger.playerAttack(idPlayer, data.angle);
                break;
            default:
                break;
        }
    }

    onDisconnect(ws: WebSocket): void {
        const clientId = this.clients.get(ws);
        if (clientId) {
            Manager.gI().removePlayer(clientId);
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
        let datas = Manager.gI().getDataPositionAll();
        let chars = Manager.gI().getDataCharAll();
        let collisions = Manager.gI().getDataCollisionAll();
        let forces = Manager.gI().getDataForceAll();
        let attacks = Manager.gI().getDataAttackAll();
        this.clients.forEach((key, ws) => {
            let idPlayer: string | undefined;
            idPlayer = this.getIdPlayerByWs(ws);
            if (idPlayer && idPlayer == key) {
                let idRoom = Manager.gI().getIdRoomByIdPlayer(idPlayer);
                if (idRoom) {
                    let dataSend = datas[idRoom];
                    for (const key in dataSend) {
                        dataSend[key].char = chars[idRoom][key];
                        dataSend[key].status = handlerStatus(
                            collisions[idRoom][key],
                            forces[idRoom][key]
                        );
                        const isAttack = attacks.get(key);
                        if (isAttack) {
                            dataSend[key].status = 'attack';
                        }
                    }
                    ws.send(new Messenger(300, dataSend).toString());
                }
            }
        });
    }

    public sendDataProjectile(){

        let datas = Manager.gI().getDataProjectileAll();
        this.clients.forEach((key, ws) => {
            let idPlayer: string | undefined;
            idPlayer = this.getIdPlayerByWs(ws);
            if (idPlayer && idPlayer == key) {
                let idRoom = Manager.gI().getIdRoomByIdPlayer(idPlayer);
                if (idRoom) {
                    ws.send(new Messenger(301, datas[idRoom]).toString());
                }
            }
        });
    }

    public sendDataUser(){
        let datas = Manager.gI().getDataPlayerAll();
        this.clients.forEach((key, ws) => {
            let idPlayer: string | undefined;
            idPlayer = this.getIdPlayerByWs(ws);
            if (idPlayer && idPlayer == key) {
                let idRoom = Manager.gI().getIdRoomByIdPlayer(idPlayer);
                if (idRoom) {
                    ws.send(new Messenger(302, datas[key]).toString());
                }
            }
        })
    }

    private sendDataToPlayer(client: WebSocket, msg: Messenger) {
        this.clients.forEach((idClient, wsClient) => {
            if (wsClient !== client && wsClient.readyState === WebSocket.OPEN) {
                wsClient.send(msg.toString());
            }
        });
    }
}
