// Mobile nav toggle.
// The nav is collapsed by default via CSS at ≤760px.
// This script only handles the open/close toggle; the collapsed state
// does not depend on JS running. A <noscript> style block in each page's
// <head> restores the expanded nav when JS is unavailable.
(function () {
	var btn = document.querySelector(".nav-toggle");
	var nav = document.querySelector(".main-nav");
	if (!btn || !nav) return;

	// Enable the open/close transition only after the first frame so the
	// collapsed state on page load is instant, not animated.
	requestAnimationFrame(function () {
		nav.classList.add("nav-animate");
	});

	function close() {
		btn.setAttribute("aria-expanded", "false");
		nav.classList.remove("is-open");
	}

	btn.addEventListener("click", function () {
		var isOpen = nav.classList.contains("is-open");
		if (isOpen) {
			close();
		} else {
			btn.setAttribute("aria-expanded", "true");
			nav.classList.add("is-open");
		}
	});

	nav.querySelectorAll("a").forEach(function (link) {
		link.addEventListener("click", close);
	});
})();
