class Model {
    constructor() {
        this.startLike = true;
        this.likeInterval = null;
    }

    toggleAutoLiker() {
        this.startLike = !this.startLike;
        if (this.startLike) {
            this.startLikeInterval();
        } else {
            this.stopLikeInterval();
        }
    }

    startLikeInterval() {
        this.likeInterval = setInterval(() => {
            const buttons = document.getElementsByTagName('button');
            for (let kk = 0; kk < buttons.length; kk++) {
                if (this.startLike && buttons[kk].innerHTML.includes("Like") && !buttons[kk].innerHTML.includes("Super Like")) {
                    buttons[kk].click();
                    break;
                }
            }
        }, 10000);
    }

    stopLikeInterval() {
        clearInterval(this.likeInterval);
    }
}
