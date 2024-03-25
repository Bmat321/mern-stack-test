// Model class
class Model {
    constructor() {
        this.ComPort = null;
        this.SharedData = null;
    }

    createComPort(name) {
        this.ComPort = chrome.runtime.connect({ name });
        this.ComPort.onMessage.addListener(this.onMessageReceive.bind(this));
        window.addEventListener("message", this.onWindowMessage.bind(this), false);
    }

    sendMessage(tag, msgTag, msg) {
        const sendObj = { "Tag": tag };
        sendObj[msgTag] = msg;
        this.ComPort.postMessage(sendObj);
    }

    onMessageReceive(msg) {
        // Handle message based on Tag
    }

    onWindowMessage(event) {
        if (event.source !== window) return;
        if (event.data.Tag && event.data.Tag === "SharedData") {
            this.SharedData = event.data.SharedData;
        }
    }
}

// PinterestModel subclass
class PinterestModel extends Model {
    constructor() {
        super();
    }

    onMessageReceive(msg) {
        if (msg.Tag === "UpdatePinterest") {
            this.updatePinterest();
        } else if (msg.Tag === "LikeFollow") {
            this.handleLikeFollow(msg);
        }
    }

    updatePinterest() {
        const videos = document.getElementsByTagName('a');
        for (let kk = 0; kk < videos.length; kk++) {
            if (videos[kk].getAttribute("class").includes("result-item")) {
                const href = videos[kk].getAttribute("href");
                this.sendMessage("PinterestTarget", "target", href);
            }
        }
    }

    handleLikeFollow(msg) {
        const vid = parseInt(Math.floor(Math.random() * 20) + 1);
        let counter = 0;

        const videos = document.getElementsByTagName('a');
        for (let kk = 0; kk < videos.length; kk++) {
            if (videos[kk].getAttribute("href") && videos[kk].getAttribute("href").includes("/pin/")) {
                counter++;
                if (counter === vid) {
                    videos[kk].click();
                    setTimeout(() => {
                        this.collectData();
                    }, 5000);
                    break;
                }
            }
        }
    }

    collectData() {
        const username = window.location.href.split("/")[3];
        const url = window.location.href;
        let img = "https://instoo.com/logo.png";
        const images = document.getElementsByTagName('img');
        let counter = 0;
        for (let kk = 0; kk < images.length; kk++) {
            if (images[kk].getAttribute("src") && images[kk].getAttribute("src").includes("pinimg")) {
                counter++;
                if (counter === 2) {
                    img = images[kk].src;
                    break;
                }
            }
        }
        let msg_data = {
            url: url,
            username: username,
            img: img,
            website: "none",
            twitter: "none",
            sales: 0,
            email: "none",
            connected: "none"
        };
        console.log(msg_data);
        this.sendMessage("DonePinterestData", "User", msg_data);

        // Handle follow and like actions based on msg.story
    }

}

