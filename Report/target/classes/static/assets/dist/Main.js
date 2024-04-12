

$("#SearchBtn").on("click", function() { //when the search button is clicked
    try {
        var strLong = $("#Longitude").val(); //grab lat and long
        var strLat = $("#Latitude").val();

        if (!strLat || !strLong) { //check if lat and long are populated
            alert("Latitude and Longitude are required.");
            return;
        }

        if (isNaN(strLat) || isNaN(strLong)) { //check if lat and long ar numbers
            alert("Latitude and Longitude must be numbers.");
            return;
        }
        
        GetCoordinates(strLat, strLong);
    }
    catch (error) {
        alert("An unexpected error occured when attempting to retrieve weather report.\nPlease try again later.")
    }
});

function GetCoordinates (strLat, strLong) {
    $.ajax({
        url: "/GetCoordinates", //attempting to call controller method
        type: "POST",
        data: {
            strLat: strLat,
            strLong: strLong
        },
        success: function(data) {
            var strOffice = data.properties.gridId;
            var strCoorX = data.properties.gridX;
            var strCoorY = data.properties.gridY;

            GetWeather(strOffice, strCoorX, strCoorY);
        }
    });
}

function GetWeather (strOffice, strCoorX, strCoorY) {
    $.ajax({
        url: "/GetWeather", //attempting to call controller method
        type: "POST",
        data: {
            strOffice: strOffice,
            strCoorX: strCoorX,
            strCoorY: strCoorY
        },
        success: function(data) {
            var strContent = "";
            var arrPeriods = data.properties.periods; 
            arrPeriods.forEach(period => { //for each wether period from the call, build a table cell
                strContent += '<tr><td>' + period.name + '</td>';
                strContent += '<td>' + period.temperature + period.temperatureUnit + '</td>';
                strContent += '<td>' + period.windDirection + '</td>';
                strContent += '<td>' + period.windSpeed + '</td>';
                strContent += '<td>' + period.shortForecast + '</td>';
                strContent += '<td>' + period.detailedForecast + '</td></tr>';
            });

            $("#ResultsTableBody").html(strContent);
            $("#ResultsTable").attr("hidden", false);
        }
    });
}