//api key= f1fbc7be325d86bf58acf0dd20304a0d

$(document).ready(function(){

    $('#weather').on('click', function(){
        var zipCode = $('#zipcode').val();
        var key = 'f1fbc7be325d86bf58acf0dd20304a0d';
        
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather',
            type: 'GET',
            data: {zip: zipCode, appid: key, units: 'imperial'},
            success: function(data){
                var weatherForecast = "";
                $.each(data.weather, function(index, val){
                    var tz = data.timezone;
                    weatherForecast += '<p><b>' + data.name + "</b></p>" + "<p><b>" + parseInt(data.main.temp) + '&deg;F '+ "</b></p>" + val.main + ", " + val.description 
                });

                $(".showForecast").html(weatherForecast);
                var current = moment().unix();
                //time zones for easter, central, moutain, pacific, hawaiian, alaskan
                var tzone;
                //utc offset-timezone
                var diff = data.timezone;
                var offset = (diff - (-14400));
                var currOff = current + offset;
                //formatting the time to be easier to read
                var localzone = moment.unix(currOff).format('h:mm A');

                //cycling through if statements where the value falls under a time zone
                if(diff == -14400){
                    tzone = "EST";
                }else if(diff == -18000){
                    tzone = "CST";
                }else if(diff == -21600){
                    tzone = "MST";
                }else if(diff == -25200){
                    tzone = "PST";
                }else if(diff == -28800){
                    tzone = "AST";
                }else if(diff == -36000){
                    tzone = "HST";
                }

                $(".location").html(localzone + ' ' + ' ' + tzone);
            },//end of success function

            error: function(xhr, status, error){
                    $(".showForecast").html("Invalid zipcode, enter a new one!");
                }
            
        })
    })
})


