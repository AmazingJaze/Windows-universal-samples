//// Copyright (c) Microsoft Corporation. All rights reserved

(function () {
    "use strict";

    var SecondaryTile = Windows.UI.StartScreen.SecondaryTile;
    var Uri = Windows.Foundation.Uri;

    // HTML elements on the page
    var pinCommand;
    var displayNameInput;
    var checkBoxSquare71x71Logo;
    var checkBoxSquare150x150Logo;
    var checkBoxSquare310x150Logo;
    var checkBoxSquare310x310Logo;


    var page = WinJS.UI.Pages.define("/html/scenario1-pinningsecondarytiles.html", {
        ready: function (element, options) {
            pinCommand = element.querySelector("#pincommand");
            pinCommand.addEventListener("click", pinTiles);

            displayNameInput = element.querySelector("#displayname");
            checkBoxSquare71x71Logo = element.querySelector("#checkboxsquare71x71logo");
            checkBoxSquare150x150Logo = element.querySelector("#checkboxsquare150x150logo");
            checkBoxSquare310x150Logo = element.querySelector("#checkboxsquare310x150logo");
            checkBoxSquare310x310Logo = element.querySelector("#checkboxsquare310x310logo");
        }
    });

    function pinTiles() {
        // Windows.UI.StartScreen.SecondaryTile exists!!
        pinCommand.disabled = true;

        var tile = SecondaryTile(new Date().getTime());
        tile.arguments = "args";
        tile.displayName = displayNameInput.value;

        if (checkBoxSquare150x150Logo.checked)
            tile.visualElements.square150x150Logo = new Uri("ms-appx:///Assets/DefaultSecondaryTileAssests/Medium.png");

        //if (CheckBoxSquare71x71Logo.IsChecked.Value)
        //    tile.VisualElements.Square71x71Logo = new Uri("ms-appx:///Assets/DefaultSecondaryTileAssests/Small.png");

        //if (CheckBoxWide310x150Logo.IsChecked.Value)
        //    tile.VisualElements.Wide310x150Logo = new Uri("ms-appx:///Assets/DefaultSecondaryTileAssests/Wide.png");

        //if (CheckBoxSquare310x310Logo.IsChecked.Value)
        //    tile.VisualElements.Square310x310Logo = new Uri("ms-appx:///Assets/DefaultSecondaryTileAssests/Large.png");

        //tile.VisualElements.ShowNameOnSquare150x150Logo = CheckBoxShowNameOnSquare150x150Logo.IsChecked.Value;
        //tile.VisualElements.ShowNameOnSquare310x310Logo = CheckBoxShowNameOnSquare310x310Logo.IsChecked.Value;
        //tile.VisualElements.ShowNameOnWide310x150Logo = CheckBoxShowNameOnWide310x150Logo.IsChecked.Value;
                
        //await tile.RequestCreateAsync();

        pinCommand.disabled = false;
        debugger;
    }

    //function reportCalendarData(calendar, calendarLabel) {
    //    var results = calendarLabel + ": " + calendar.getCalendarSystem() + "\n";
    //    results += "Name of Month: " + calendar.monthAsSoloString() + "\n";
    //    results += "Day of Month: " + calendar.dayAsPaddedString(2) + "\n";
    //    results += "Day of Week: " + calendar.dayOfWeekAsSoloString() + "\n";
    //    results += "Year: " + calendar.yearAsString() + "\n";
    //    results += "\n";
    //    return results;
    //}

    //function showResults() {
    //    // This scenario uses the Windows.Globalization.Calendar class to display the parts of a date.

    //    // Create Calendar objects using different constructors.
    //    var calendar = new Calendar();
    //    var japaneseCalendar = new Calendar(["ja-JP"], CalendarIdentifiers.japanese, ClockIdentifiers.twelveHour);
    //    var hebrewCalendar = new Calendar(["he-IL"], CalendarIdentifiers.hebrew, ClockIdentifiers.twentyFourHour);

    //    // Display the results
    //    outputText.innerText =
    //        reportCalendarData(calendar, "User's default calendar system") +
    //        reportCalendarData(japaneseCalendar, "Calendar system") +
    //        reportCalendarData(hebrewCalendar, "Calendar system");
    //}
})();