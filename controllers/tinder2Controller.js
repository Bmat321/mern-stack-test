
// Base Controller class
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.controller = this; 
    }

    init(name) {
        this.model.createComPort(name);
     
    }


}



class TinderController extends Controller {
    constructor(model, view) {
        super(model, view);
    }
}


const tinderModel = new TinderModel();
const tinderView = new TinderView();
const tinderController = new TinderController(tinderModel, tinderView);

// Initialize the application
tinderController.init("tinder"); 
