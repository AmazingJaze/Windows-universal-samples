//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;
    var TileSize = Windows.UI.StartScreen.TileSize;
    var Uri = Windows.Foundation.Uri;
    
    var TileNotification = Windows.UI.Notifications.TileNotification;
    var TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;
    var Tiles = NotificationsExtensions.Tiles;

    var Calendar = Windows.Globalization.Calendar;
    var DateTimeFormatter = Windows.Globalization.DateTimeFormatting.DateTimeFormatter;

    var _tileId;

    // UI elements on the page
    var pinCommand;
    var sendCommand;

    var page = WinJS.UI.Pages.define("/html/scenario5-expiringtilenotifications.html", {
        ready: function (element, options) {

            pinCommand = element.querySelector("#pincommand");
            pinCommand.addEventListener("click", pinTile);

            sendCommand = element.querySelector("#sendcommand");
            sendCommand.addEventListener("click", sendNotification);
        }
    });

    function pinTile() {

        pinCommand.disabled = true;

        // Generate a unique tile ID for the purposes of the sample
        _tileId = new Date().getTime().toString();

        // Initialize and pin a new secondary tile.
        var tile = new SecondaryTile(_tileId, "Expiring Notification", "args", new Uri("ms-appx:///images/DefaultSecondaryTileAssests/Medium.png"), TileSize.default);
        tile.visualElements.square71x71Logo = new Uri("ms-appx:///images/cancel.png");
        tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/cancel.png");
        tile.visualElements.square310x310Logo = new Uri("ms-appx:///images/cancel.png");
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnSquare310x310Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        tile.requestCreateAsync().then(function complete() {
            // unlock the rest of the scenario
            pinCommand.disabled = false;
        });
    }

    function sendNotification() {

        var nowTimeString = new Date().toLocaleString();

        // Decide expiration time
        var cal = new Calendar();
        cal.setToNow();
        cal.addSeconds(20);

        // Get expiration time and date.
        var longTime = DateTimeFormatter("longtime");
        var expirationTime = cal.getDateTime();
        var expirationTimeString = longTime.format(expirationTime);

        // Build TileText
        var lineOfText = new Tiles.TileText();
        lineOfText.text = "This notification will expire at " + expirationTimeString;
        lineOfText.wrap = true;
        var adaptiveContent = new Tiles.TileBindingContentAdaptive();
        adaptiveContent.children.push(lineOfText);

        // Specify templates and send Notification.
        var tileContent = new Tiles.TileContent();
        tileContent.visual = new Tiles.TileVisual();
        tileContent.visual.branding = Tiles.TileBranding.nameAndLogo;
        tileContent.visual.tileMedium = new Tiles.TileBinding();
        tileContent.visual.tileMedium.content = adaptiveContent;
        tileContent.visual.tileWide = new Tiles.TileBinding();
        tileContent.visual.tileWide.content = adaptiveContent;
        tileContent.visual.tileLarge = new Tiles.TileBinding();
        tileContent.visual.tileLarge.content = adaptiveContent;

        var doc = tileContent.getXml();
        var notification = new TileNotification(doc);
        notification.expirationTime = expirationTime;
        TileUpdateManager.createTileUpdaterForSecondaryTile(_tileId).update(notification);
    }

})();