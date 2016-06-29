//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

    var XmlDocument = Windows.Data.Xml.Dom.XmlDocument;
    var TileNotification = Windows.UI.Notifications.TileNotification;
    var TileUpdateManager = Windows.UI.Notifications.TileUpdateManager;


    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;
    var TileSize = Windows.UI.StartScreen.TileSize;
    var Uri = Windows.Foundation.Uri;
    var MessageDialog = Windows.UI.Popups.MessageDialog;
    var _tileId;

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

    function sendNotification() {
        var xml = "" +
            "<tile version='3'>" +
                "<visual branding='nameAndLogo'>" +
                    "<binding template='TileMedium'>" +
                        "<text hint-wrap='true'>New tile notification</text>" +
                        "<text hint-wrap='true' hint-style='captionSubtle'/>" +
                    "</binding>" +
                    "<binding template='TileWide'>" +
                        "<text hint-wrap='true'>New tile notification</text>" +
                        "<text hint-wrap='true' hint-style='captionSubtle'/>" +
                    "</binding>" +
                    "<binding template='TileLarge'>" +
                        "<text hint-wrap='true'>New tile notification</text>" +
                        "<text hint-wrap='true' hint-style='captionSubtle'/>" +
                    "</binding>" +
                "</visual>" +
                "</tile>";

        var doc = new XmlDocument();
        doc.loadXml(xml);

        var nowTimeString = new Date().getTime().toString();
        var nodes = doc.selectNodes("//text");

        // Assign date/time values through XmlDocument to avoid any xml escaping issues
        nodes.forEach(function (textEl) {
            if (textEl.innerText.length == 0) {
                textEl.innerText = nowTimeString;
            }

            var notification = new TileNotification(doc);
            TileUpdateManager.createTileUpdaterForApplication().update(notification);
        });
    }

    function clearNotification() {
        TileUpdateManager.createTileUpdaterForApplication().clear();
    }

    function restartScenario() {
        sendCommand.disabled = false;
        clearCommand.disabled = true;
    }

})();