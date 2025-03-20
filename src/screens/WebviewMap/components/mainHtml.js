// mapScript.js
export const createMapScript = (
  defaultLat = 27.685008,
  defaultLng = 85.30328,
  zoom = 1,
  pathCoords = [
    [27.685008, 85.30328],
    [27.68, 85.31],
    [27.67, 85.305],
  ],
  minZoom = 5,
) => `
  var map = L.map('map', {
    minZoom: ${minZoom}
  }).setView([${defaultLat}, ${defaultLng}], ${zoom});

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Add a polyline (path)
  var path = L.polyline(${JSON.stringify(pathCoords)}, {
    color: 'red',
    weight: 3,
    opacity: 0.7,
    smoothFactor: 1
  }).addTo(map);

  // Function to update map with current location
  function updateLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    // Center map on current location
    map.setView([lat, lng], ${zoom});

    // Add or update marker at current location
    if (window.currentMarker) {
      window.currentMarker.setLatLng([lat, lng]);
    } else {
      window.currentMarker = L.marker([lat, lng]).addTo(map)
        .bindPopup('You are here!')
        .openPopup();
    }

    window.ReactNativeWebView.postMessage('Location Updated: ' + lat + ', ' + lng);
  }

  // Handle geolocation error
  function handleError(error) {
    window.ReactNativeWebView.postMessage('Geolocation Error: ' + error.message);
    // Add a marker at default location as fallback
    L.marker([${defaultLat - 0.005}, ${defaultLng}]).addTo(map)
      .bindPopup('Default location (Geolocation failed)')
      .openPopup();
    map.fitBounds(path.getBounds());
  }

  // Request current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(updateLocation, handleError);
  } else {
    window.ReactNativeWebView.postMessage('Geolocation not supported');
    // Add a marker at default location as fallback
    L.marker([${defaultLat - 0.005}, ${defaultLng}]).addTo(map)
      .bindPopup('Geolocation not supported')
      .openPopup();
    map.fitBounds(path.getBounds());
  }

  window.ReactNativeWebView.postMessage('Map Loaded');
`;

export const mapHTML = script => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        #map { height: 90vh; width: 90vw; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        ${script}
      </script>
    </body>
  </html>
`;
