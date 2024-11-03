import Player from '../Entities/Player';
import { generateUniqueRandomArray, randonUnique } from '../Utils/Math';

export default class Room {
    private id: string;
    private players: Set<Player>;
    private maxPlayer: number;
    private isChar: boolean[];
    private timeBegin: number;
    private timePlay: number;
    private timeEnd: number;
    private status: string;
    private idTimeClear: NodeJS.Timeout | null;

    constructor(id: string, max: number) {
        this.maxPlayer = max;
        this.id = id;
        this.players = new Set();
        this.isChar = [false, false, false, false, false];
        this.timePlay = 15; // 5,
        this.timeBegin = 5000; // 5s
        this.timeEnd = 15; // 10s
        this.status = 'create';
        this.idTimeClear = null;
    }

    public update(){
        const oldStatus = this.status;
        if (this.status == 'create'){
            if (this.players.size < this.maxPlayer){
                this.setStatus('lobby');
            }
        }
        if (this.status == 'lobby'){
            if (this.players.size == this.maxPlayer){
                this.setStatus('begin');
            }
        }
        if (oldStatus == 'lobby' && this.status == 'begin'){
            if (this.idTimeClear){
                clearInterval(this.idTimeClear);
            }
            this.idTimeClear = setInterval(() => {
                this.timeBegin -= 1;
            }, 1);
        }
        if (this.status == 'begin' && this.timeBegin < 0){
            if (this.idTimeClear){
                clearInterval(this.idTimeClear);
            }
            this.setStatus('play')
            this.idTimeClear = setInterval(() => {
                this.timePlay -= 1;
            }, 1000);
        }
        if (this.status == 'play' && this.timePlay < 0){
            if (this.idTimeClear){
                clearInterval(this.idTimeClear);
            }
            this.setStatus('end')
            this.idTimeClear = setInterval(() => {
                this.timeEnd -= 1;
            }, 1000);
        }
        if (this.status == 'end' && this.timeEnd < 0){
            if (this.idTimeClear){
                clearInterval(this.idTimeClear);
            }
            this.setStatus('lock')
        }
    }

    private setStatus(status: string){
        this.status = status;
    }

    public getStatus(){
        // console.log(this.timeBegin, this.timePlay, this.timeEnd);
        return this.status;
    }

    public addPlayer(idPlayer: string): boolean {
        if (this.isPlayer(idPlayer)) {
            return false;
        }
        const size = this.countPlayer();
        if (size >= this.maxPlayer) {
            return false;
        }
        const player = new Player(idPlayer, null);
        let indexChar = randonUnique(this.isChar, this.maxPlayer);
        this.isChar[indexChar] = true;
        player.setChar(indexChar);
        this.players.add(player);
        return true;
    }

    public getDataChar(): Record<string, number> {
        let result: Record<string, number> = {};
        for (const player of this.players) {
            result[player.getId()] = player.getChar();
        }
        return result;
    }
    public getPlayers(): Set<Player> {
        return this.players;
    }

    public countPlayer(): number {
        return this.players.size;
    }

    public updateAttack(playerA: string, playerB: string) {
        const attack = this.getPlayer(playerB);
        const victim = this.getPlayer(playerA);
        if (attack && victim) {
            console.log(attack.getId(), victim.getId());
            const dame = attack.getDame();
            victim.updateHp(-dame);
            if (victim.isDie()) {
                attack.updatePoint(5);
            }
        }
    }

    public revivePlayer(idPlayer: string){
        const player = this.getPlayer(idPlayer);
        if (!player){
            return;
        }
        player.revive();
    }

    public getPlayer(idPlayer: string) {
        for (const player of this.players) {
            if (player.getId() == idPlayer) {
                return player;
            }
        }
        return undefined;
    }

    public isPlayer(idPlayer: string): boolean {
        for (const player of this.players) {
            if (player.getId() == idPlayer) {
                return true;
            }
        }
        return false;
    }

    public removePlayer(id: string): boolean {
        for (const player of this.players) {
            if (player.getId() === id) {
                this.isChar[player.getChar()] = false;
                this.players.delete(player);
                return true;
            }
        }
        return false;
    }

    public getPlayerDie(): string[]{
        let reslut: string[] = [];
        this.players.forEach(player => {
            if (player.isDie()){
                reslut.push(player.getId());
            }
        })
        return reslut;
    }

    public getAllDataPlayers() {
        let result: Record<
            string,
            {
                id: string;
                name: string;
                char: number;
                hpMax: number;
                hp: number;
                point: number;
                dame: number;
            }
        > = {};
        this.players.forEach((player) => {
            result[player.getId()] = player.toString();
        });
        return result;
    }
    public getAllDataScore() {
        let result: Record<
            string,
            {
                id: string;
                name: string;
                char: number;
                point: number;
            }
        > = {};
        this.players.forEach((player) => {
            result[player.getId()] = player.score();
        });
        return result;
    }
    public getNamePLayers(){
        let reslut: string[] = [];
        this.players.forEach(player => {
            reslut.push(player.getName());
        })
        return reslut;
    }

    public getDataTime(){
        if (this.getStatus() == 'create' || this.getStatus() == 'lobby'){
            return {'id': '-1', 'time': -1};
        }
        if (this.getStatus() == 'begin'){
            return {'id': '0', 'time': this.timeBegin}
        }
        if (this.getStatus() == 'play'){
            return {'id': '1', 'time': this.timePlay}
        }
        if (this.getStatus() == 'end'){
            return {'id': '2', 'time': this.timeEnd}
        }
        if (this.getStatus() == 'lock'){
            return {'id': '3', 'time': -1}
        }
        return {'id': '4', 'time': -1}
    }

    public getId(): string {
        return this.id;
    }
}
