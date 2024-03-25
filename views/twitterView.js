class View {
    constructor() {
        this.UserTag = "._7UhW9";
    }

    scrollTop(starter) {
        if (starter > 0) {
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                this.scrollTop(starter - 1);
            }, 300);
        }
    }
}
