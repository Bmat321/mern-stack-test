
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.model.controller = this; 
    }

    init() {
        this.model.createComPort();
        console.log("SETUp!");
        if (window.location.href.includes("tag")) {
            this.view.scrollToBottom();
        }
    }

    scrollLike(num) {
        const t1 = parseInt(Math.floor(Math.random() * 30000) + 1000);
        setTimeout(() => {
            this.view.scrollToBottom();
            const videos = document.getElementsByTagName('div');
            let total = 0;
            for (let kk = 0; kk < videos.length; kk++) {
                if (videos[kk] && videos[kk].getAttribute("aria-label") && videos[kk].getAttribute("aria-label").includes("Add Friend")) {
                    total++;
                }
            }
            let counter = 0;
            const vid = parseInt(Math.floor(Math.random() * total) + 1);
            for (let kk = 0; kk < videos.length; kk++) {
                if (videos[kk] && videos[kk].getAttribute("aria-label") && videos[kk].getAttribute("aria-label").includes("Add Friend")) {
                    counter++;
                    if (vid === counter) {
                        videos[kk].click();
                        const msg_data = {
                            url: "https://facebook.com/" + videos[kk].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].getAttribute("href"),
                            username: videos[kk].parentNode.parentNode.parentNode.parentNode.parentNode.children[0].innerText,
                            img: videos[kk].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].getAttribute("xlink:href")
                        };
                        this.model.sendMessage("DonefacebookFollow", "User", msg_data);
                        this.view.scrollToBottom();
                        break;
                    }
                }
            }
            if (num > 0) {
                this.scrollLike(num - 1);
            }
        }, t1);
    }
}


const model = new Model();
const view = new View();
const controller = new Controller(model, view);

controller.init();
