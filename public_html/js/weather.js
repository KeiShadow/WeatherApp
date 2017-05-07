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
function getWeatherToday(url) {
    $.ajax({
        dataType: "json",
        url: url,
        success: function (data) {
            $('#Actual').empty();
            $('#Actual').append(data["name"] + " " + data["main"].temp + "°C <br>");
            $('#Actual').append("Popis: "+data["weather"][0].description);

            localStorage.setItem("Current",data["name"]);
        }
    });
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
