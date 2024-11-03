import * as pc from "playcanvas";

export default class LoadData{
    private static instance: LoadData;
    public assets: Record<string, any> = {};
    private app: pc.Application;
    private assetListLoader: pc.AssetListLoader;

    private constructor(app: pc.Application){
        this.app = app;
        const rootPath = '../../Assets';
        this.assets = {
            Mage: new pc.Asset('mage', 'model', {
                url: `${rootPath}/Models/mage.glb`,
            }),
            Bar: new pc.Asset('bar', 'model', {
                url: `${rootPath}/Models/bar.glb`,
            }),
            Knight: new pc.Asset('knight', 'model', {
                url: `${rootPath}/Models/knight.glb`,
            }),
            Rogue: new pc.Asset('rogue', 'model', {
                url: `${rootPath}/Models/rogue.glb`,
            }),
            Arrow: new pc.Asset('arrow', 'model', {
                url: `${rootPath}/Models/arrow.glb`,
            }),
            Colum: new pc.Asset('colum', 'model', {
                url: `${rootPath}/Models/colum.glb`,
            }),

            Idle: new pc.Asset('idle', 'animation', {
                url: `${rootPath}/Animations/idle_nd.glb`,
            }),
            Walk: new pc.Asset('walk', 'animation', {
                url: `${rootPath}/Animations/run.glb`,
            }),
            Attack: new pc.Asset('attack', 'animation', {
                url: `${rootPath}/Animations/attack.glb`,
            }),
            Shoot: new pc.Asset('attack', 'animation', {
                url: `${rootPath}/Animations/shoot.glb`,
            }),
            Jump: new pc.Asset('jump', 'animation', {
                url: `${rootPath}/Animations/jump.glb`,
            }),
            FontGamja: new pc.Asset('gamja', 'font', {
                url: `${rootPath}/Fonts/courier.json`,
            }),
            enter_0: new pc.Asset('enter_0', 'texture', {
                url: `${rootPath}/Keys/keyboard_99.png`,
            }),
            enter_1: new pc.Asset('enter_1', 'texture', {
                url: `${rootPath}/Keys/keyboard_200.png`,
            }),
            back_space_0: new pc.Asset('back_space_0', 'texture', {
                url: `${rootPath}/Keys/keyboard_207.png`,
            }),
            back_space_1: new pc.Asset('back_space_1', 'texture', {
                url: `${rootPath}/Keys/keyboard_214.png`,
            }),
            gray_background_box: new pc.Asset('gray_background_box', 'texture', {
                url: `${rootPath}/Texture/background.png`,
            }),
            background_cute: new pc.Asset('background_cute', 'texture', {
                url: `${rootPath}/Texture/background_cute_2nd.jpg`,
            }),
            background_button: new pc.Asset('background_button', 'texture', {
                url: `${rootPath}/Texture/background_button.png`,
            }),
            background_brow: new pc.Asset('background_brow', 'texture', {
                url: `${rootPath}/Texture/background_brow.jpg`,
            }),
            ground: new pc.Asset('ground', 'texture', {
                url: `${rootPath}/Texture/ground.jpg`,
            }),
            background_text: new pc.Asset('background_text', 'texture', {
                url: `${rootPath}/Texture/background_wood.png`,
            }),
            box_health: new pc.Asset('box_health', 'texture',{
                url: `${rootPath}/Icon/box_health.png`,
            }),
            health: new pc.Asset('health', 'texture',{
                url: `${rootPath}/Icon/health.png`,
            }),
            load: new pc.Asset('load', 'texture',{
                url: `${rootPath}/Texture/load.png`,
            }),
            new_room: new pc.Asset('new_room', 'texture',{
                url: `${rootPath}/tognoek/new_room.png`,
            }),
            join_room: new pc.Asset('join_room', 'texture',{
                url: `${rootPath}/tognoek/join_room.png`,
            }),
            bg_tognoek: new pc.Asset('bg_tognoek', 'texture',{
                url: `${rootPath}/tognoek/tognoek.png`,
            }),
            bg: new pc.Asset('bg', 'texture',{
                url: `${rootPath}/tognoek/background.png`,
            }),
            name_game: new pc.Asset('name_game', 'texture',{
                url: `${rootPath}/tognoek/name_game.png`,
            }),
            bg_box: new pc.Asset('background_box', 'texture',{
                url: `${rootPath}/tognoek/background_box.png`,
            }),
            input: new pc.Asset('input', 'texture',{
                url: `${rootPath}/tognoek/input.png`,
            }),
            enter: new pc.Asset('enter', 'texture',{
                url: `${rootPath}/tognoek/enter.png`,
            }),
            remove: new pc.Asset('remove', 'texture',{
                url: `${rootPath}/tognoek/remove.png`,
            }),
            back: new pc.Asset('back', 'texture',{
                url: `${rootPath}/tognoek/back.png`,
            }),
            load_bar: new pc.Asset('load_bar', 'texture',{
                url: `${rootPath}/tognoek/load_bar.png`,
            }),
            load_text: new pc.Asset('load_text', 'texture',{
                url: `${rootPath}/tognoek/loading_text.png`,
            }),
            cup: new pc.Asset('cup', 'texture',{
                url: `${rootPath}/tognoek/cup.png`,
            }),
            home: new pc.Asset('home', 'texture',{
                url: `${rootPath}/tognoek/home.png`,
            }),
            score: new pc.Asset('score', 'texture',{
                url: `${rootPath}/tognoek/score.png`,
            }),
            public: new pc.Asset('public', 'texture',{
                url: `${rootPath}/tognoek/public.png`,
            }),
            private: new pc.Asset('private', 'texture',{
                url: `${rootPath}/tognoek/private.png`,
            }),
        };
        for (let i = 0; i < 10; i++) {
            let id = `keyboard_${i}`;
            this.assets[id] = new pc.Asset(id, 'texture', {
                url: `${rootPath}/Numbers/${id}.png`,
            });
            this.assets[`${i}`] = new pc.Asset(`${i}`, 'texture', {
                url: `${rootPath}/tognoek/${i}.png`,
            });
            id = `keyboard_${i + 101}`;
            this.assets[id] = new pc.Asset(id, 'texture', {
                url: `${rootPath}/Numbers/${id}.png`,
            });
        }

        this.assetListLoader = new pc.AssetListLoader(Object.values(this.assets), this.app.assets);
    }

    public static gI(app: pc.Application | null = null){
        if (!app){
            return LoadData.instance;
        }
        if (!LoadData.instance){
            LoadData.instance = new LoadData(app);
        }
        return LoadData.instance;
    }

    public Loader(callback: Function){
        this.assetListLoader.load(() => {
            callback();
        })
    }


}