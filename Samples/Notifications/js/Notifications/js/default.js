// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();
})();


(function() {
    var notifications = Windows.UI.Notifications;

    // Wide tile
    var template = notifications.TileTemplateType.tileWide310x150ImageAndText01;
    var tileXml = notifications.TileUpdateManager.getTemplateContent(template);

    var tileTextAttributes = tileXml.getElementsByTagName("text");
    tileTextAttributes[0].appendChild(tileXml.createTextNode("Hello World! My very own tile notification"));

    var tileImageAttributes = tileXml.getElementsByTagName("image");
    tileImageAttributes[0].setAttribute("src", "ms-appx:///images/microsoft-sdk.png");
    tileImageAttributes[0].setAttribute("alt", "red graphic");

    // Medium tile
    var squareTemplate = notifications.TileTemplateType.tileSquare150x150Text04;
    var squareTileXml = notifications.TileUpdateManager.getTemplateContent(squareTemplate);

    var squareTileTextAttributes = squareTileXml.getElementsByTagName("text");
    squareTileTextAttributes[0].appendChild(squareTileXml.createTextNode("Hello World! My very own tile notification"));

    // Add the medium tile to the wide tile's payload.
    var node = tileXml.importNode(squareTileXml.getElementsByTagName("binding").item(0), true);
    tileXml.getElementsByTagName("visual").item(0).appendChild(node);

    // Create notification
    var tileNotification = new notifications.TileNotification(tileXml);

    // Expiration time
    var currentTime = new Date();
    tileNotification.expirationTime = new Date(currentTime.getTime() + 600 * 1000);

    // Send the notification to the app tile.
    notifications.TileUpdateManager.createTileUpdaterForApplication().update(tileNotification);




})();