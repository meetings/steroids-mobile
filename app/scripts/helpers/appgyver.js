// Function to send AG API -messages
function sendAPImessage(method, params, callbacks) {
    AG.API.ws.websocket.send(
        JSON.stringify(
            {
        method: method,
        parameters: params,
        callbacks: callbacks
    }
    )
    );
}


// function to perform a AG native transition
function AGPerformTransition(transition, duration, success, error) {
    if ( duration == undefined ) {
        alert("duration is undefined!");
    };

    if ( transition == undefined ) {
        alert("transition is undefined!");
    };

    sendAPImessage("performTransition", {
        screen: AG_SCREEN_ID,
        layer: AG_LAYER_ID,
        view: AG_VIEW_ID,
        transition: transition,
        curve: "easeInOut",
        duration: duration
    },{
        success: success,
        failure: error
    });
}
