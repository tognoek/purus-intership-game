import Session from "./Session";

export default class ReadMessenge{
    constructor(){

    }

    public setIdUser(data: object){
        let dataFormat = data as {[key: string] : string};
        let idUser = dataFormat['id'];
        Session.getInstance().setIdUser(idUser);
    }
}