// initialisiere die map, spawn in wülfrath (damit karte beim laden gecentered ist und gut aussieht )
const map = L.map('map').setView([51.28404288986918, 7.0318788830599175], 10);

// lädt die kacheln (auf der map) + zoom
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, //erklärt sich von selbst
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// der rote kreis um das ajc-bk
const circle = L.circle([51.29708681797487, 6.845362959431667], { // koords
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 70 // radius in m
}).addTo(map);
circle.bindPopup("Adam Josef Cüppers Berufkolleg").openPopup();


// laden und darstellen von museen usw (blaue marker)
fetch('./assets/museen.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(location => {
        const marker = L.marker(location.coords).addTo(map);
        marker.bindPopup(`
            <b>${location.title}</b><br>
            ${location.description}<br>
            <a href="${location.googleMapsLink}" target="_blank">Google Maps</a>`);
        });
    })
    .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));

// also ich habe den blauen marker runtergeladen, die farbe geändert und als asset hier für die map geladen
const yellowIcon = L.icon({
    iconUrl: '/assets/marker-icon-3x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    shadowSize: [41, 41]
});

// laden und darstellen von stolpersteinen (gelbe marker)
fetch('./assets/stolpersteine.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(location => {
        const marker = L.marker(location.coords, {icon: yellowIcon}).addTo(map);
        marker.bindPopup(`
            <b>${location.name}</b>
            <br>${location.description}<br>
            <a href="${location.googleMapsLink}" target="_blank">Google Maps</a>
            <a href="${location.wikipediaLink}" target="_blank">Wikipedia</a>`);
        });
    })
    .catch(error => console.error('Fehler beim Laden der JSON-Daten:', error));



/*
diese map leider erst zu spät gesehen sonst hätte ich mich inspirieren können und hätte mir viel zeit erspart :( 
https://wikimap.toolforge.org/?wp=false&cluster=false&zoom=16&lat=051.297792&lon=0006.851321 
*/