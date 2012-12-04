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


function AGOpenModal(url) {
  sendAPImessage("openModal", {
      url: "http://localhost:13101"+url,
      screen: AG_SCREEN_ID,
      layer: AG_LAYER_ID,
      view: AG_VIEW_ID
    },{
      success: "closemodalsuccess",
      failure: "closemodalfailure"
    }
  );
}



function AGCloseModal() {
  sendAPImessage("closeModal", {
      screen: AG_SCREEN_ID,
      layer: AG_LAYER_ID,
      view: AG_VIEW_ID
    },{
      success: "closemodalsuccess",
      failure: "closemodalfailure"
    }
  );
}


function AGPopLayer() {
  sendAPImessage("popLayer", {
    screen: AG_SCREEN_ID,
    layer: AG_LAYER_ID,
    view: AG_VIEW_ID
    },{
      failure: "popLayerFailure"
    }
  );

}



function AGOpenLayerWithoutTopBar(url) {
  sendAPImessage("openLayer", {
      url: "http://localhost:13101"+url,
      hidesNavigationBar: true,
      screen: AG_SCREEN_ID,
      layer: AG_LAYER_ID,
      view: AG_VIEW_ID
    },{
    }
  );
}



function AGPreloadLayer(url, layerId) {
  sendAPImessage("preloadLayer", {
      screen: AG_SCREEN_ID,
      layer: AG_LAYER_ID,
      view: AG_VIEW_ID,
      id: layerId,
      url: url
    },{
      success: "preloadlayersuccess",
      failure: "preloadlayerfailure"
    }
  );
}

function AGOpenPreloadedLayer(layerId) {
  sendAPImessage("openLayer", {
      screen: AG_SCREEN_ID,
      layer: AG_LAYER_ID,
      view: AG_VIEW_ID,
      id: layerId,
      eval_js: "preloadeval.innerHTML = 'Evaluated successfully from previous view, this was evaluated on open';"
    },{
      success: "openpreloadedsuccess",
      failure: "openpreloadedfailure"
    }
  );
}



