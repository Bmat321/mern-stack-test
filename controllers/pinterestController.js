// Controller class
class Controller {
    constructor() {
        this.model = new PinterestModel();
        this.createComPort();
    }

    createComPort() {
        this.model.createComPort("pinterest");
    }
}


const controller = new Controller();
