document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('map').setView([27.685008, 85.30328], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  L.marker([27.68, 85.30328])
    .addTo(map)
    .bindPopup('A sample marker!')
    .openPopup();

  window.ReactNativeWebView.postMessage('Map Loaded');
});
