//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

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
            sendCommand.addEventListener("click", pinTile);
            sendCommand.disabled = false;

            clearCommand = element.querySelector("#clearcommand");
            clearCommand.addEventListener("click", updateTile);
            clearCommand.disabled = true;

            restartCommand = element.querySelector("#restartcommand");
            restartCommand.addEventListener("click", restartScenario);

        }
    });

    function pinTile() {

        sendCommand.disabled = true;

        // Generate a unique tile ID for the purposes of the sample
        _tileId = new Date().getTime().toString();

        // Initialize and pin a new secondary tile that we will later update
        var tile = new SecondaryTile(_tileId, "Original", "args", new Uri("ms-appx:///images/cancel.png"), TileSize.default);
        tile.visualElements.square71x71Logo = new Uri("ms-appx:///images/cancel.png");
        tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/cancel.png");
        tile.visualElements.square310x310Logo = new Uri("ms-appx:///images/cancel.png");
        tile.visualElements.showNameOnSquare150x150Logo = true;
        tile.visualElements.showNameOnSquare310x310Logo = true;
        tile.visualElements.showNameOnWide310x150Logo = true;

        tile.requestCreateAsync().then(function complete() {
            // unlock the rest of the scenario
            clearCommand.disabled = false;
        });
    }

    function updateTile() {
        clearCommand.disabled = true;

        // Grab the existing tile
        SecondaryTile.findAllAsync().then(function complete(tiles) {

            var tile = tiles.filter(function (tile) {
                return tile.tileId === _tileId;
            })[0];

            if (!tile) {
                new MessageDialog("The secondary tile that was previously pinned could not be found. Has it been removed from Start?", "Error").showAsync();
            } else {

                // Change its name and logo
                tile.displayName = "Updated";
                tile.visualElements.square150x150Logo = new Uri("ms-appx:///images/check.png");
                tile.visualElements.square71x71Logo = new Uri("ms-appx:///images/check.png");
                tile.visualElements.square310x310Logo = new Uri("ms-appx:///images/check.png");
                tile.visualElements.wide310x150Logo = new Uri("ms-appx:///images/check.png");

                // And request its properties to be updated
                tile.updateAsync();
            }

        });
    }

    function restartScenario() {
        sendCommand.disabled = false;
        clearCommand.disabled = true;
    }

})();