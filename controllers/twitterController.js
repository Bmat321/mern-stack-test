
class BaseController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}


class TwitterController extends BaseController {
    constructor(model, view) {
        super(model, view);
    }

    initialize() {
        this.model.createComPort();
        this.view.setup();
    }
}

const twitterModel = new TwitterModel();
const twitterView = new TwitterView();
const twitterController = new TwitterController(twitterModel, twitterView);

// Initialize Twitter components
twitterController.initialize();
