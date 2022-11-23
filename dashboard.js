$(window).load(function() {
    $(".se-pre-con").fadeOut("slow");;
});

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

    L.control.layers(baseMaps,overlayMaps).addTo(mymap);

});
