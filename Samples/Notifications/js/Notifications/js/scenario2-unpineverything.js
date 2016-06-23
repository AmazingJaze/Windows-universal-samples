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

    var page = WinJS.UI.Pages.define("/html/scenario2-unpineverything.html", {
        ready: function (element, options) {
            unpinCommand = element.querySelector("#unpincommand");
            unpinCommand.addEventListener("click", unpinTiles);
        }
    });


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
                            unpinCommand.disabled = false;
                        }),
                        function error(e) {
                            debugger;
                        }
                }),
                function error(e) {
                    debugger;
                }

        } catch (e) {
            debugger;
        }

    }

})();