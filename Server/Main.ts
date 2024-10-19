import Session from "./Core/Session";

Session.gI().init().then(() => {
    console.log('Load Ammo')
    Session.gI().setUpServer();
    Session.gI().loop();
});