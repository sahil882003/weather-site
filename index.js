var loc
var lat, long;
var flag = false;
function update() {
  var url;
  const Http = new XMLHttpRequest();
  if(!flag)
  url = "https://api.openweathermap.org/data/2.5/weather?q=" + loc + "&appid=ef99d62945a6578c7b797dfecedac1c5";
  else
  {
  url ="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=ef99d62945a6578c7b797dfecedac1c5";
  flag=false;
  }
  Http.open("GET", url);
  Http.send();

  Http.onreadystatechange = (e) => {
    var data = JSON.parse(Http.responseText);
    var temperature = data.main.temp-273.15;
    var icon = data.weather[0].icon;
    var iconsrc = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
     
    

    document.getElementById("cloudy").innerHTML=data.clouds.all+"%";
    document.getElementById("humidity").innerHTML=data.main.humidity+"%";
    document.getElementById("wind").innerHTML=data.wind.speed+"Km/h";
    document.getElementById("location-res").innerHTML=data.name;
    document.getElementById("time-and-date").innerHTML=dateTime;
    document.getElementById("icon").innerHTML="<img class='image' src="+iconsrc+">";
    document.getElementById("temperature").innerHTML=temperature.toFixed(2)+"<sup>o</sup>C"
    document.getElementById("description").innerHTML=data.weather[0].main;
    updateBackground(data.weather[0].main);
  }
}

function updateBackground(name)
{
  var main=["Mist","Smoke","Haze","Dust","Fog","Sand","Ash","Squall"]
  if(main.indexOf(name)>-1)
  {
    console.log(1,name);
  document.body.style.backgroundImage="url('./photos/unclear.jpeg')";
  }
  else
  {
    console.log(2,name)
    document.body.style.backgroundImage="url('./photos/"+name+".jpeg')"
  }
}

document.getElementById('loc-search').addEventListener("click", function (event) {
  loc = document.getElementById('location').value;
  update();
});

document.getElementById('current-loc').addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude
    long = position.coords.latitude;
    flag=true;
    update();
  }
  , (error) => {
    console.log(error);
  });
})

