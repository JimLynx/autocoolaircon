// Torrevieja town centre, approx coords
var torrevieja = [37.9787, -0.6822];

var map = L.map("coverage-map", {
	scrollWheelZoom: true,
}).setView(torrevieja, 9);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
	maxZoom: 30,
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Approx 30-minute-drive radius from Torrevieja. This is a rough circle,
// not a true drive-time isochrone — replace with a confirmed shape once
// Nico's full coverage area / town list is finalised.
L.circle(torrevieja, {
	radius: 40000, // metres
	color: "#d63b2f",
	weight: 2,
	fillColor: "#4fb3c4",
	fillOpacity: 0.25,
}).addTo(map);

L.marker(torrevieja).addTo(map).bindPopup("Autocool Aircon — based here");

// Leaflet measures its container's size at init time. If page layout
// (grid/flex) hasn't fully settled yet, it can measure the wrong size,
// which throws off both rendering AND the calculated centre point.
// invalidateSize() alone only fixes the size — it does NOT recentre the
// map, so we explicitly re-set the view on Torrevieja straight after.
setTimeout(function () {
	map.invalidateSize();
	map.setView(torrevieja, 9);
}, 200);

window.addEventListener("resize", function () {
	map.invalidateSize();
});
