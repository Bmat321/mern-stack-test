// Controller
class TikTokController {
    constructor(model) {
        this.model = model;
    }

    initialize() {
        this.createComPort();
        console.log("SETUP!");
        if (window.location.href.includes("tag")) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }

    createComPort() {
        this.model.setComPort(chrome.runtime.connect({
            name: "tiktok"
        }));
        this.model.ComPort.onMessage.addListener(this.onMessageReceive.bind(this));
        window.addEventListener("message", this.onWindowMessage.bind(this), false);
    }

    sendMessage(tag, msgTag, msg) {
        this.model.sendMessage(tag, msgTag, msg);
    }

    onMessageReceive(msg) {
        if (msg.Tag === "UpdateTikTok") {
            this.updateTikTok();
        } else if (msg.Tag === "LikeFollow") {
            this.handleLikeFollow(msg);
        }
    }

    onWindowMessage(event) {
        if (event.source != window) return;
        if (event.data.Tag && event.data.Tag === "SharedData") {
            this.model.setSharedData(event.data.SharedData);
        }
    }

    updateTikTok() {
        const videos = document.getElementsByTagName('a');
        for (let kk = 0; kk < videos.length; kk++) {
            if (videos[kk].getAttribute("class").includes("result-item")) {
                this.sendMessage("TikTokTarget", "target", videos[kk].getAttribute("href"));
            }
        }
    }

    handleLikeFollow(msg) {
        console.log(msg.story);
        this.sendMessage("DoneTikTok", "target", window.location.href);
        const vid = Math.floor(Math.random() * 6) + 1;
        console.log(vid);
        let counter = 0;
        const videos = document.getElementsByTagName('a');
        for (let kk = 0; kk < videos.length; kk++) {
            console.log(counter);
            if (videos[kk].getAttribute("class") && videos[kk].getAttribute("class").includes("video-feed-item")) {
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
        console.log(window.location.href.split("/"));
        const url = window.location.href;
        let img = "https://instoo.com/logo.png";
        const avatarLinks = document.querySelectorAll('a.user-avatar');
        if (avatarLinks.length > 0) {
            img = avatarLinks[0].querySelector('img').src;
        }
        const msg_data = {
            url: url,
            username: username,
            img: img,
            website: "none",
            twitter: "none",
            sales: 0,
            email: "none",
            connected: "none"
        };
        this.sendMessage("DoneTikTokData", "User", msg_data);

        // Handle follow and like actions based on msg.story
    }
}

// Create model and controller instances
const model = new TikTokModel();
const controller = new TikTokController(model);

// Initialize controller
controller.initialize();
