/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = 'http://api.openweathermap.org/data/2.5/weather?q=Ostrava&units=metric&lang=cz&appid=abcb921ca7be6867b0b964ece67ac025';

$(document).on("pagecreate", "#page1", function (event) {
   
    getWeatherToday(url);
    searchName();
});

function Empty(){
    $('.weather-place').empty();
    $('.weather-temperature').empty();
    $('.weather-min-temperature').empty();
    $('.weather-max-temperature').empty();
    $('.weather-description').empty();
    $('.weather-humidity').empty();
    $('.weather-wind-speed').empty();
    $('.weather-sunrise').empty();
    $('.weather-sunset').empty();  
    
}

function getWeatherToday(url) {
    $.ajax({
        dataType: "json",
        url: url,
        success: function (data) {
            var index = localStorage.length;
            
            var SunriseSec = data["sys"].sunrise;
            var SunriseDate = new Date(SunriseSec * 1000);
            var SunriseTimestr = SunriseDate.toLocaleTimeString();
            
            var SunsetSec = data["sys"].sunset;
            var SunsetDate = new Date(SunsetSec * 1000);
            var SunsetTimestr = SunsetDate.toLocaleTimeString();
            
           // Empty();
            $('.place').append(data["name"]);
            $('.temperature').append(data["main"].temp);
            $('.weather-max-temperature').append(data["main"].temp_max+"°C");
            $('.desc').append(data["weather"][0].description);
            $('.weather-humidity').append(data["main"].humidity+"%");
            $('.weather-wind-speed').append(data["wind"].speed+" m/s");
            $('.weather-sunrise').append(SunriseTimestr);
            $('.weather-sunset').append(SunsetTimestr);     

            localStorage["Mesto"+index]="Město: "+data["name"] + ", Teplota " + data["main"].temp + "°C";
                
            index++;
        }
    });
    var today= new Date();
    $('.today').append(today.toDateString());
}  
function searchName() {
   var pom = "";
   
    $.getJSON('city/cities.json', function (data) {
         $('#MySelect').empty();
        $.each(data['data'], function (i, field) {
            pom += '<a href="" id="' + i + '" class="a ui-btn ui-corner-all ui-shadow ui-shadow ui-screen-hidden">' + field.name + ", " + field.cc + '</a>';
        });   
        $('#MySelect').html(pom);
         $('.a').click(function () {
            var id;
            id = $(this).attr('id');
           getWeatherToday("http://api.openweathermap.org/data/2.5/weather?q=" + data['data'][id]['name'] + "&units=metric&lang=cz&appid=abcb921ca7be6867b0b964ece67ac025");
        });
    });     
}
