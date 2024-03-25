class View  {
    constructor() {
        this.startLike();
        this.activateButton();
    }

    startLike() {
        var unansweredBtn = $("#content");
        unansweredBtn.parent().after(
            '<li><h2><a href="#" style="position:fixed; z-index:10000; top:10%; left:30%;" id="gmOurFirstButton">Stop Auto-Liker</a></h2></li>'
        );
    }

    activateButton() {
        $("#gmOurFirstButton").click(function() {
            console.log("Something.");
            if (startLike) {
                startLike = false;
                $("#gmOurFirstButton").text("Start Auto-Liker");
            } else {
                $("#gmOurFirstButton").text("Stop Auto-Liker");
                startLike = true;
            }
        });
    }
}


class View {
    constructor() {
        this.unansweredBtn = $("#content");
    }

    startLike() {
        this.unansweredBtn.parent().after(
            '<li><h2><a href="#" style="position:fixed; z-index:10000; top:10%; left:30%;" id="gmOurFirstButton">Stop Auto-Liker</a></h2></li>'
        );
    }

    activateToggleButton(callback) {
        $("#gmOurFirstButton").click(callback);
    }

    updateButtonText(isStarted) {
        const buttonText = isStarted ? "Stop Auto-Liker" : "Start Auto-Liker";
        $("#gmOurFirstButton").text(buttonText);
    }
}