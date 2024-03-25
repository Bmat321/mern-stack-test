// Base Model class
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
        console.log(sendObj);
        console.log(this.ComPort);
        this.ComPort.postMessage(sendObj);
    }

    onMessageReceive(msg) {
        if (msg.Tag === "LikeFollow" && msg.story.StartTinderLike && msg.story.LikedMediaTinderSize < msg.story.MaxTinderLikes) {
            this.handleTinderLike();
        }
    }

    handleTinderLike() {
        setTimeout(() => {
            let username;
            let img;
            const spans = document.getElementsByTagName('span');
            for (let kk = 0; kk < spans.length; kk++) {
                if (spans[kk].getAttribute("itemprop") === "name") {
                    username = spans[kk].innerText;
                }
            }

            const divs = document.getElementsByTagName('div');
            for (let kk = 0; kk < divs.length; kk++) {
                if (divs[kk].getAttribute("aria-label") === username && divs[kk].getAttribute("style")) {
                    img = divs[kk].getAttribute("style").split('"')[1];
                }
            }

            console.log(img);
            console.log(username);
            const msg_data = { url: "tinder.com", username: username, img: img };
            const buttons = document.getElementsByTagName('button');
            for (let kk = 0; kk < buttons.length; kk++) {
                if (buttons[kk].innerHTML.includes("Like") && !buttons[kk].innerHTML.includes("Super Like")) {
                    buttons[kk].click();
                    break;
                }
            }

            this.sendMessage("DoneTinderLike", "User", msg_data);

            setTimeout(() => {
                const noThanksBtns = document.getElementsByTagName('button');
                for (let kk = 0; kk < noThanksBtns.length; kk++) {
                    if (noThanksBtns[kk].innerText.includes("NO THANKS")) {
                        noThanksBtns[kk].click();
                        break;
                    }
                }
            }, 5000);

        }, 4000);
    }
    onWindowMessage(event) {
        if (event.source !== window) return;
        if (event.data.Tag && event.data.Tag === "SharedData") {
            this.SharedData = event.data.SharedData;
        }
    }
}

class TinderModel extends Model {
    constructor() {
        super();
    }

}