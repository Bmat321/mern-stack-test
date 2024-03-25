
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    init() {
        this.view.startLike();
        this.view.activateToggleButton(this.toggleAutoLiker.bind(this));
        this.model.startLikeInterval();
    }

    toggleAutoLiker() {
        this.model.toggleAutoLiker();
        this.view.updateButtonText(this.model.startLike);
    }
}


const model = new Model();
const view = new View();
const controller = new Controller(model, view);


controller.init();