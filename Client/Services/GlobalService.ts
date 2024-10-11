export default class globalService{
    private static instance: globalService;
    public static getInstance(): globalService{
        if(!globalService.instance){
            globalService.instance = new globalService();
        }
        return globalService.instance;
    }

    
}