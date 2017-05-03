/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var data;

$.ajax({
  dataType: "json",
  url: "http://api.openweathermap.org/data/2.5/weather?q=Ostrava&units=metric&appid=abcb921ca7be6867b0b964ece67ac025",
  success:function(data) {
     var key, value;
     var obj = new Object();
     //obj = JSON.parse(data);
     $('#Actual').append(data["name"]+" " + data["main"].temp+"°C");
     
//      for(x in data){
//          
//          $('#Actual').append(data[x]+" ");
//      }
         
    
 }
});




