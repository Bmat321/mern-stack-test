// Base View class
class View {
    constructor() {}

    scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    // Add other common view functionalities here
}

// Subclass inheritance for View
class TinderView extends View {
    constructor() {
        super();
    }
 
}