// Initialize the map object
        var map = new L.Map('map', {
            // Some basic options to keep the map still and prevent 
            // the user from zooming and such.
            scrollWheelZoom: false,
            touchZoom: false,
            doubleClickZoom: false,
            zoomControl: false,
            dragging: false,
        });

        // Prep the background tile layer graciously provided by stamen.com
        var stamenUrl = 'https://api.mapbox.com/styles/v1/ashad9alif/cl5u2dfba001715o5ijak0qqx/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYXNoYWQ5YWxpZiIsImEiOiJjbDV1MmJieXYwOWRyM2ttaXFvbGVzamQzIn0.9sxrMUoQuuOYrkhJc73mJw';
        var stamenAttribution = '';
        var stamenLayer = new L.TileLayer(stamenUrl, {maxZoom: 18, attribution: stamenAttribution});
        // Set the center on our city of angels
        var center = new L.LatLng(-22.9618391285272, -43.21383404586581);
        map.setView(center, 13);

        // Load the background tiles
        map.addLayer(stamenLayer);



        // Create an empty layer where we will load the polygons
        var featureLayer = new L.GeoJSON();
        // Set a default style for out the polygons will appear
        var defaultStyle = {
            color: "#F2F7FA",
            weight: 4,
            opacity: 1,
            fillOpacity: 1,
            fillColor: "#3e3f41"
        };


        var highlightStyle = {
            color: '#2262CC', 
            weight: 4,
            opacity: 1,
            fillOpacity: 1,
            fillColor: '#2262CC'
        };


        // Define what happens to each polygon just before it is loaded on to
        // the map. This is Leaflet's special way of goofing around with your
        // data, setting styles and regulating user interactions.
        var onEachFeature = function(feature, layer) {
            // All we're doing for now is loading the default style. 
            // But stay tuned.
            layer.setStyle(defaultStyle,{className:"def-style"});

            

            
            // layer.bindPopup(feature.properties.NAME);
            layer.bindTooltip(feature.properties.NAME,{ permanent: true,
                 className: "my-label",
                  offset: [0, 0] })
        };
        // Add the GeoJSON to the layer. `boundaries` is defined in the external
        // GeoJSON file that I've loaded in the <head> of this HTML document.
        var featureLayer = L.geoJson(RioData, {
            // And link up the function to run when loading each feature
            onEachFeature: onEachFeature
        });

        // Finally, add the layer to the map.
        map.addLayer(featureLayer);

        // layer.bindLabel('MultiPolygon dynamic label')
        // .addTo(map);




    