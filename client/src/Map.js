import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';
import Search from './components/Search'

mapboxgl.accessToken =
  'pk.eyJ1IjoienVoYWtrIiwiYSI6ImNrbDZ6eXg4dTAxNDgyb3J2cHl4djJ6cmIifQ.uz8YZ9vZYFelfNoVFKKAPw';

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    map.on('load', function () {
        // Add an image to use as a custom marker
        map.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        function (error, image) {
        if (error) throw error;
        map.addImage('custom-marker', image);
        // Add a GeoJSON source with 2 points
        map.addSource('points', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
        {
        // feature for Mapbox DC
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [
        -77.03238901390978,
        38.913188059745586
        ]
        },
        'properties': {
        'title': 'Mapbox DC'
        }
        },
        {
        // feature for Mapbox SF
        'type': 'Feature',
        'geometry': {
        'type': 'Point',
        'coordinates': [lat,lng]
        },
        'properties': {
        'title': 'Mapbox SF'
        }
        }
        ]
        }
        });
         
        // Add a symbol layer
        map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
        'icon-image': 'custom-marker',
        // get the title name from the source's "title" property
        'text-field': ['get', 'title'],
        'text-font': [
        'Open Sans Semibold',
        'Arial Unicode MS Bold'
        ],
        'text-offset': [0, 1.25],
        'text-anchor': 'top'
        }
        });
        }
        );
        });
    // Clean up on unmount
    return () => map.remove();
  }, []); 

    



  return (
    <div>
      <div className='sidebarStyle'>
        <div>
        <Search/>
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;