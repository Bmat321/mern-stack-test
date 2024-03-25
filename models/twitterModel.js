
class Model {
    constructor() {
        this.ComPort = null;
        this.SharedData = null;
        this.lastMsg = null;
        this.StartStory = false;
    }

    createComPort() {
        this.ComPort = chrome.runtime.connect({ name: "twitter" });
        this.ComPort.onMessage.addListener(this.onMessageReceive.bind(this));
        
        window.addEventListener("message", (event) => {
            if (event.source !== window) return;
            if (event.data.Tag && event.data.Tag === "SharedData") {
                this.SharedData = event.data.SharedData;
            }
        }, false);
    }

    onMessageReceive(msg) {
        this.lastMsg = msg;
        if (msg.Tag === "UpdateTwitter") {
            console.log(msg.story);
        } else if (msg.Tag === "LikeFollow") {
            this.controller.scrollLike(3);
        }
    }

    sendMessage(tag, msgTag, msg) {
        const sendObj = { "Tag": tag };
        sendObj[msgTag] = msg;
        console.log(sendObj);
        console.log(this.ComPort);
        this.ComPort.postMessage(sendObj);
    }
}





class Controller extends Model {
    constructor() {
        super();
        this.model = new Model();
        this.view = new View(); 
    }

    init() {
        this.model.createComPort();
        console.log("SETUp!");
    }

   
    scrollLike(num) {
        window.scrollBy(0, 600);

        if (num > 0) {
            const timer = this.getRandomInt(50000, 120000);
            setTimeout(() => {
                this.scrollLike(num - 1);
            }, timer);
        }

        const links = document.getElementsByTagName('div');
        for (let kk = 0; kk < links.length; kk++) {
            if (links[kk] && links[kk].getAttribute("aria-label") && 
                links[kk].getAttribute("aria-label").includes("Like") && 
                links[kk].getAttribute("data-testid") && 
                links[kk].getAttribute("data-testid") == "like") {
                
                const url = window.location.href;
                const username = links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild
                                    .getAttribute("href").split("/").join("");
                const img = links[kk].parentNode.parentNode.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.firstElementChild
                                    .children[0].children[1].children[0].children[1].getAttribute("src");
                const msg_data = { url, username, img };

                if (this.lastMsg.story.StartTwitterLike) {
                    links[kk].click();
                    this.sendMessage("DoneTwitterLike", "User", msg_data);
                }

                setTimeout(() => {
                    links[kk].parentNode.parentNode.children[1].children[0].click();
                    setTimeout(() => {
                        const links2 = document.getElementsByTagName('div');
                        for (let i = 0; i < links2.length; i++) {
                            if (links2[i].getAttribute("testid") && 
                                links2[i].getAttribute("testid").includes("tweetButton") && 
                                this.lastMsg.story.StartTwitterFollow) {
                                links2[i].firstElementChild.firstElementChild.firstElementChild.click();
                                this.sendMessage("DoneTwitterRetweet", "User", msg_data);
                            }
                        }
                        const links3 = document.getElementsByTagName('span');
                        for (let i = 0; i < links3.length; i++) {
                            if (links3[i].innerText.includes("Retweet") && 
                                this.lastMsg.story.StartTwitterFollow) {
                                links3[i].click();
                                this.sendMessage("DoneTwitterRetweet", "User", msg_data);
                            }
                        }
                    }, 5000);
                }, 1000);
                break;
            }
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Instantiate controller and initialize
const controller = new Controller();
controller.init();
