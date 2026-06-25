// Sticky header — toggles `.scrolled` once the page has scrolled past
// a small threshold, adding a subtle shadow and glass-blur effect.
// Header stays solid white with dark nav text throughout; this only
// adds depth once scrolling begins, it doesn't change colors.
(function () {
	var header = document.querySelector("header.site-header");
	if (!header) return;

	var SCROLL_THRESHOLD = 80; // px — small enough to feel responsive, not jumpy

	function updateHeaderState() {
		if (window.scrollY > SCROLL_THRESHOLD) {
			header.classList.add("scrolled");
		} else {
			header.classList.remove("scrolled");
		}
	}

	// Set initial state immediately (handles page loads that aren't at the top,
	// e.g. anchor links or back-navigation).
	updateHeaderState();

	var ticking = false;
	window.addEventListener("scroll", function () {
		if (!ticking) {
			window.requestAnimationFrame(function () {
				updateHeaderState();
				ticking = false;
			});
			ticking = true;
		}
	});
})();
