class Model {
    constructor() {
        this.ComPort = null;
        this.SharedData = null;
    }

    createComPort() {
        this.ComPort = chrome.runtime.connect({ name: "facebook" });
        this.ComPort.onMessage.addListener(this.onMessageReceive.bind(this));
        window.addEventListener("message", this.onWindowMessage.bind(this), false);
    }

    sendMessage(tag, msgTag, msg) {
        const sendObj = { "Tag": tag };
        sendObj[msgTag] = msg;
        console.log(sendObj);
        console.log(this.ComPort);
        this.ComPort.postMessage(sendObj);
    }

    onMessageReceive(msg) {
        console.log(msg);
        if (msg.Tag === "Updatefacebook") {
            console.log(msg.story);
        } else if (msg.Tag === "LikeFollow") {
            if (msg.story.StartfacebookFollow && msg.story.FollowedPoolfacebookSize < msg.story.MaxfacebookFollows) {
                this.controller.scrollLike(5);
            }
        }
    }

    onWindowMessage(event) {
        if (event.source !== window) return;
        if (event.data.Tag && event.data.Tag === "SharedData") {
            this.SharedData = event.data.SharedData;
        }
    }
}