//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

    //private async void ButtonUnpinEverything_Click(object sender, RoutedEventArgs e)
    //{
    //            ButtonUnpinEverything.IsEnabled = false;

    //// Loop through every secondary tile
    //foreach (SecondaryTile tile in await SecondaryTile.FindAllAsync())
    //{
    //// Unpin each secondary tile
    //                await tile.RequestDeleteAsync();
    //}

    //ButtonUnpinEverything.IsEnabled = true;
    //}

    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;

    // UI elements on the page
    var unpinCommand;

    // UI controls on the page
    var secondaryTilesListView;

    var page = WinJS.UI.Pages.define("/html/scenario2-unpineverything.html", {
        ready: function (element, options) {

            unpinCommand = element.querySelector("#unpincommand");
            unpinCommand.addEventListener("click", unpinTiles);

            secondaryTilesListView = element.querySelector("#scenariocontrol").winControl;

            unpinCommand.disabled = true;
            setListViewData(secondaryTilesListView).then(function () {
                unpinCommand.disabled = false;
            });
        }
    });

    function setListViewData(listView) {
        return new WinJS.Promise(c => {

            SecondaryTile.findAllAsync().then(
               function complete(tiles) {
                   var data = tiles.map((tile) => {

                       var bgColor = tile.visualElements.backgroundColor;
                       var bgColorString = "{a: " + bgColor.a + ", b: " + bgColor.b + ", g: " + bgColor.g + ", r: " + bgColor.r + "}";

                       return {
                           displayName: tile.displayName,
                           tileId: tile.tileId,
                           arguments: tile.arguments,
                           visualElements: {
                               backgroundColor: bgColorString,
                               foregroundText: tile.visualElements.foregroundText,
                               showNameOnSquare150x150Logo: tile.visualElements.showNameOnSquare150x150Logo,
                               showNameOnSquare310x310Logo: tile.visualElements.showNameOnSquare310x310Logo,
                               showNameOnWide310x150Logo: tile.visualElements.showNameOnWide310x150Logo,
                               square30x30Logo: tile.visualElements.square30x30Logo.displayUri,
                               square44x44Logo: tile.visualElements.square44x44Logo.displayUri,
                               square70x70Logo: tile.visualElements.square70x70Logo.displayUri,
                               square71x71Logo: tile.visualElements.square71x71Logo.displayUri,
                               square150x150Logo: tile.visualElements.square150x150Logo.displayUri,
                               square310x310Logo: tile.visualElements.square310x310Logo.displayUri,
                               wide310x150Logo: tile.visualElements.wide310x150Logo.displayUri,
                           },
                       };
                   });

                   listView.itemDataSource = new WinJS.Binding.List(data).dataSource;
                   c();
               }),
               function error(e) {
                   debugger;
               }

        })
    }

    function unpinTiles() {
        unpinCommand.disabled = true;

        try {

            SecondaryTile.findAllAsync().then(
                function complete(tiles) {

                    var unpinPromises = [];

                    tiles.forEach((tile) => {
                        unpinPromises.push(tile.requestDeleteAsync());
                    });

                    WinJS.Promise.join(unpinPromises).then(
                        function complete() {
                            setListViewData(secondaryTilesListView).then(function () {
                                unpinCommand.disabled = false;
                            });
                        }),
                        function error(e) {
                            throw e;
                        }
                }),
                function error(e) {
                    throw e;
                }

        } catch (e) {
            throw e;
        }

    }

})();