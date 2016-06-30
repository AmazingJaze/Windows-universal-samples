//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

    var XmlDocument = Windows.Data.Xml.Dom.XmlDocument;
    var TileNotification = Windows.UI.Notifications.TileNotification;
    var TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;
    var Tiles = NotificationsExtensions.Tiles;

    // UI elements on the page
    var sendCommand;
    var clearCommand;
    var restartCommand;

    var page = WinJS.UI.Pages.define("/html/scenario3-primarytilenotifications.html", {
        ready: function (element, options) {

            sendCommand = element.querySelector("#sendcommand");
            sendCommand.addEventListener("click", sendNotification);
            sendCommand.disabled = false;

            clearCommand = element.querySelector("#clearcommand");
            clearCommand.addEventListener("click", clearNotification);

            restartCommand = element.querySelector("#restartcommand");
            restartCommand.addEventListener("click", restartScenario);

        }
    });

    //function sendNotification() {
    //    var xml = "" +
    //        "<tile version='3'>" +
    //            "<visual branding='nameAndLogo'>" +
    //                "<binding template='TileMedium'>" +
    //                    "<text hint-wrap='true'>New tile notification</text>" +
    //                    "<text hint-wrap='true' hint-style='captionSubtle'/>" +
    //                "</binding>" +
    //                "<binding template='TileWide'>" +
    //                    "<text hint-wrap='true'>New tile notification</text>" +
    //                    "<text hint-wrap='true' hint-style='captionSubtle'/>" +
    //                "</binding>" +
    //                "<binding template='TileLarge'>" +
    //                    "<text hint-wrap='true'>New tile notification</text>" +
    //                    "<text hint-wrap='true' hint-style='captionSubtle'/>" +
    //                "</binding>" +
    //            "</visual>" +
    //            "</tile>";

    //    var doc = new XmlDocument();
    //    doc.loadXml(xml);

    //    var nowTimeString = new Date().getTime().toString();
    //    var nodes = doc.selectNodes("//text");

    //    // Assign date/time values through XmlDocument to avoid any xml escaping issues
    //    nodes.forEach(function (textEl) {
    //        if (textEl.innerText.length == 0) {
    //            textEl.innerText = nowTimeString;
    //        }
    //    });

    //    var notification = new TileNotification(doc);
    //    TileUpdateManager.createTileUpdaterForApplication().update(notification);
    //}

    function sendNotification() {

        var nowTimeString = new Date().getTime().toString();

        var textConfigs = [
            { text: "New tile notification", wrap: true },
            { text: nowTimeString, wrap: true, style: Tiles.TileTextStyle.captionSubtle }
        ];

        // Build and append content from textConfigs, line by line.
        var adaptiveContent = new Tiles.TileBindingContentAdaptive();
        textConfigs.forEach(lineConfig => {
            var lineOfTileText = new Tiles.TileText();
            for (var key in lineConfig) {
                lineOfTileText[key] = lineConfig[key];
            }
            adaptiveContent.children.push(lineOfTileText);
        });

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
        TileUpdateManager.createTileUpdaterForApplication().update(notification);
    }

    function clearNotification() {
        TileUpdateManager.createTileUpdaterForApplication().clear();
    }

    function restartScenario() {
        sendCommand.disabled = false;
        clearCommand.disabled = true;
    }

})();