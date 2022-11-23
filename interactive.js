$(window).load(function() {
    $(".se-pre-con").fadeOut("slow");;
});

$(document).ready(function() {

    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyZ29vb3RqZSIsImEiOiJjbDAxMWV3NGQwcHZiM2p0MTVoZW0xMHc1In0.1LNSRlEmEx2Wvsxkh6WCaw';
    const map = new mapboxgl.Map({
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/light-v11',
        center: [5.3036748, 51.6978162],
        zoom: 15.5,
        pitch: 45,
        bearing: -17.6,
        container: 'map',
        antialias: true
    });

    map.on('load', () => {
        // Insert the layer beneath any symbol layer.
        const layers = map.getStyle().layers;
        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;

        // The 'building' layer in the Mapbox Streets
        // vector tileset contains building height data
        // from OpenStreetMap.
        map.addLayer(
            {
                'id': 'add-3d-buildings',
                'source': 'composite',
                'source-layer': 'building',
                'filter': ['==', 'extrude', 'true'],
                'type': 'fill-extrusion',
                'minzoom': 15,
                'paint': {
                    'fill-extrusion-color': '#aaa',

                    // Use an 'interpolate' expression to
                    // add a smooth transition effect to
                    // the buildings as the user zooms in.
                    'fill-extrusion-height': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'height']
                    ],
                    'fill-extrusion-base': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        15,
                        0,
                        15.05,
                        ['get', 'min_height']
                    ],
                    'fill-extrusion-opacity': 0.6
                }
            },
            labelLayerId
        );
    })});




mapboxgl.accessToken = 'pk.eyJ1IjoibWFyZ29vb3RqZSIsImEiOiJjbDAxMWV3NGQwcHZiM2p0MTVoZW0xMHc1In0.1LNSRlEmEx2Wvsxkh6WCaw';
