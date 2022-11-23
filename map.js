	$(window).load(function() {
		$(".se-pre-con").fadeOut("slow");;
	});

// function thisFunction() {
//     var popup = document.getElementById("myPopup");
//     popup.classList.toggle("show");
//   }
  
//   function myFunction() {
//     var input = document.getElementById("start");
//     var str = input.value.replaceAll('-', '');

//     var e = document.getElementById("time");
//     var strUser = parseInt(e.value);
//     var strUser = e.value;

// fetch("v2_Edited_KNMI_data.json") 
//     .then(function(resp) {
      
//         return resp.json();
//     })
//     .then(function(data) {

//         function isStation(test) {
//             string = test.HH.toString()            

//             return  test.station === meetstation
//             && test.YYYYMMDD === str  && string === strUser
//         }

//         document.getElementById("algemeen").innerHTML = 
//         data.find(isStation).station + "<br />"
        
//         document.getElementById("ijs").innerHTML = 
//         data.find(isStation).Y + "<br />"

//         document.getElementById("sneeuw").innerHTML = 
//         data.find(isStation).S + "<br />"

//         document.getElementById("temp").innerHTML = 
//         (data.find(isStation).T / 10) +"<br />" 

//         document.getElementById("vocht").innerHTML = 
//         data.find(isStation).U + "<br />"

//         document.getElementById("bewolking").innerHTML = 
//         data.find(isStation).N + "<br />"

//         document.getElementById("bewolking").innerHTML = 
//         data.find(isStation).N + "<br />"

//         // console.log(data.find(isStation));

//         typing = data.find(isStation).id;

//   // -----------------------------------------------------

//       function isStation2(test) {

//           return  test.id === typing-1
//       }
//       min1 = data.find(isStation2).R
//       console.log(min1)

//   // -----------------------------------------------------

//       function isStation3(test) {

//         return  test.id === typing-2
//     }
//     min2 = data.find(isStation3).R
//     console.log(min2)

//   // -----------------------------------------------------

//     function isStation4(test) {

//       return  test.id === typing-3
//   }
//   min3 = data.find(isStation4).R
//   console.log(min3)

//   // -----------------------------------------------------

//   function isStation5(test) {

//     return  test.id === typing-4
// }
// min4 = data.find(isStation5).R
// console.log(min4)

//   // -----------------------------------------------------
  
//   function isStation6(test) {

//     return  test.id === typing-5
// }
// min5 = data.find(isStation6).R
// console.log(min5)

//   // -----------------------------------------------------
  
//   function isStation7(test) {

//     return  test.id === typing-6
// }
// min6 = data.find(isStation7).R
// console.log(min6)

//   // -----------------------------------------------------
  
//   function isStation8(test) {

//     return  test.id === typing-7
// }
// min7 = data.find(isStation8).R
// console.log(min7)

//   // -----------------------------------------------------
  
//   function isStation9(test) {

//     return  test.id === typing-8
// }
// min8 = data.find(isStation9).R
// console.log(min8)

//   // -----------------------------------------------------
  
//   function isStation10(test) {

//     return  test.id === typing-9
// }
// min9 = (data.find(isStation10).R)
// console.log(min9)

//   // -----------------------------------------------------
  
//   function isStation11(test) {

//     return  test.id === typing-10
// }
// min10 = data.find(isStation11).R
// console.log(min10)

//   // -----------------------------------------------------
  
//   function isStation12(test) {

//     return  test.id === typing-11
// }
// min11 = data.find(isStation12).R
// console.log(min11)

//  // -----------------------------------------------------
  
//   function isStation13(test) {

//     return  test.id === typing-12
// }
// min12 = data.find(isStation13).R
// console.log(min12)

// precip_data = "[" + min12 + "," + min11 + "," + min10 + "," + min9 + "," + min8 + "," + min7 + "," + min6 + "," + min5 + "," + min4 + "," + min3 + "," + min2 + "," + min1 + "," + min12 + "," 
// + typing + "]"
    
// })};

$(document).ready(function() {
  
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
    });

    var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    });    

    // Map options
    let mapOptions = {
        zoomControl: true,
        center: [52.2129919 , 5.2793703],
        zoom: 8,
        layers: [ Esri_WorldGrayCanvas, OpenStreetMap_HOT],
        zoomAnimation: false,
        minZoom : 7
    }
        
    // Map global
    var mymap = L.map('kaart', mapOptions);

    mymap.on('popupopen', myFunction)

    // Layer switcher 
    var baseMaps = {
        // "Snelwegen" : Esri_WorldStreetMap,
        "Standaard" : OpenStreetMap_HOT,
        "Licht" : Esri_WorldGrayCanvas
    };

    // Overlaymaps
    var overlayMaps = {
    };

    // Add scale
    L.control.scale({
        metric: true,
        imperial: false 
    }).addTo(mymap);

    const oXHR = new XMLHttpRequest();          

    var weatherData;
    oXHR.onreadystatechange = function () {
        if (oXHR.readyState == 4) {		
            weatherData = JSON.parse(this.responseText);        
            //createChart(this.responseText);    
        }
    };

    // Markers uit geoJSON
    function points(feature, layer) {

        // console.log(feature.properties);

        var popupContent = 

        "<h1 id='title'>"+"Station "+ feature.properties.STATION+ "  " + feature.properties.NAME+ "</h1>" 
        // + '<div id="demo" style="width: 450px; height: 400px; margin: 0 auto"> </div>'
        ;

        // if (feature.properties && feature.properties.popupContent) {
        //     popupContent += feature.properties.popupContent;
        // }       
       
        layer.bindPopup(popupContent, {
            className: feature.properties,
            maxWidth: 500
        });
    }
 
    

    var geojsonMarkerOptions = {
        radius: 3,
        fillColor: "#ff9300",
        color: 'black',
        weight: .5,
        fillOpacity: 1
    };

    // Polygonen uit geoJSON
    var exteriorStyle = {
        fillOpacity: 0,
        color: "black",
        weight: 0
    }

    var polygonen = L.geoJson(KNMI_meetstations_polygon, {
        style: exteriorStyle,
        // onEachFeature: polygon
    }, ).addTo(mymap);

    var pointsData = L.geoJson(KNMI_meetstations, {
        onEachFeature: points,
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
        }
    }).addTo(mymap);

    var polyLine = null;
    var matchingPointLayer = null;

    polygonen.on("click", function (event) {

        meetstation = event.layer.feature.properties.STATION;

        console.log(meetstation);

        pointsData.eachLayer(function(layer){
            var pointStation = layer.feature.properties.STATION;

            if (meetstation == pointStation) {
                matchingPointLayer = layer;
            }
            if (matchingPointLayer !== null) {
                matchingPointLayer.setStyle({fillColor: "#ff9300", radius: 3});
            }
        });
        
        matchingPointLayer.setStyle({fillColor: "darkgrey", radius: 6, color: "black"});
    
        // Pak the geo van het event (event.layer.feature.geometry)
        var geoEvent = event.latlng;

        // Pak the geo van het matching point.
        var geoMatching = matchingPointLayer.feature.geometry.coordinates;
        geoMatching = L.latLng(geoMatching[1],geoMatching[0]);
        // mymap.panTo(geoMatching);   // zet het meetstation in het midden
                
        // Voeg een lijn toe aan de map, tussen die twee.
        if (polyLine !== null) {
            mymap.removeLayer(polyLine);
        }

        polyLine =  new L.polyline([geoEvent,geoMatching], {
            color: 'darkgrey',
            weight: 1,
            opacity: 1
        })

        polyLine.addTo(mymap);

        mymap.panInsideBounds(polyLine.getBounds());  // zet de lijn min of meer in het midden
        matchingPointLayer.openPopup();
    });

    // Add layers to map
    L.control.layers(baseMaps,overlayMaps).addTo(mymap);
    L.Control.geocoder().addTo(mymap);
    });
    
    
    
    