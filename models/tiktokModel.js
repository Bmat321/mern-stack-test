// Model
class TikTokModel {
    constructor() {
        this.ComPort = null;
        this.SharedData = null;
    }

    sendMessage(tag, msgTag, msg) {
        const sendObj = {
            "Tag": tag
        };
        sendObj[msgTag] = msg;
        this.ComPort.postMessage(sendObj);
    }

    setComPort(port) {
        this.ComPort = port;
    }

    setSharedData(data) {
        this.SharedData = data;
    }
}

