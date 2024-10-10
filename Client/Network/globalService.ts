export default class globalService{
    private static instance: globalService;
    public getInstance(): globalService{
        if(!globalService.instance){
            globalService.instance = new globalService();
        }
        return globalService.instance;
    }

    
}