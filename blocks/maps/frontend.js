"use strict";

import 'apple-mapkit-js';
import 'apple-mapkit-js/contains';

document.addEventListener('readystatechange', function(event) {
    if (event.target.readyState === "interactive") {
        mapkit.init({
            authorizationCallback: function(done) {
                fetch("https://arvernus.info/wp-json/AppleMapKit/v1/GetJWT/", {
                    method: "GET",
                    headers: {
                        Accept: 'text/plain',
                    },
                },)
                .then(function(response) {
                    if (response.status >= 200 && response.status < 400 ) {
                        return response.text();
                    }
                    else {
                        throw `Response resulted in error ${response.status}`;
                    }
                })
                .then(function(result) {
                    done(result)
                });
            }
        });
    }
    if (event.target.readyState === "complete") {

        var mapNode = document.querySelector('#map');

        var map = new mapkit.Map(mapNode);
        map.mapType = mapkit.Map.MapTypes.Hybrid;
        map.showsMapTypeControl = false;
        map.showsCompass = 'hidden';
        map.showsZoomControl = false;
    }
}, false );