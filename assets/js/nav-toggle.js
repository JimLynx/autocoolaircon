// Mobile nav toggle.
// The nav is collapsed by default via CSS at ≤760px.
// This script only handles the open/close toggle; the collapsed state
// does not depend on JS running. A <noscript> style block in each page's
// <head> restores the expanded nav when JS is unavailable.
(function () {
	var btn = document.querySelector(".nav-toggle");
	var nav = document.querySelector(".main-nav");
	if (!btn || !nav) return;

	var dropdown = document.querySelector(".nav-item-dropdown");
	var dropdownToggle = document.querySelector(".nav-dropdown-toggle");

	function closeDropdown() {
		if (!dropdown || !dropdownToggle) return;
		dropdown.classList.remove("is-open");
		dropdownToggle.setAttribute("aria-expanded", "false");
	}

	// Matches the CSS breakpoint (max-width: 760px) — above it, the
	// dropdown opens on hover only; the click/tap toggle is mobile-only.
	function isMobileViewport() {
		return window.matchMedia("(max-width: 760px)").matches;
	}

	// Enable the open/close transition only after the first frame so the
	// collapsed state on page load is instant, not animated.
	requestAnimationFrame(function () {
		nav.classList.add("nav-animate");
	});

	function close() {
		btn.setAttribute("aria-expanded", "false");
		nav.classList.remove("is-open");
		closeDropdown();
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
		link.addEventListener("click", function () {
			// Deferred: closing synchronously here would hide this very
			// link's own ancestor (.nav-dropdown-menu, via .is-open) mid-click
			// for links nested in the Resources dropdown, which cancels the
			// browser's default navigation instead of just letting it happen.
			setTimeout(close, 0);
		});
	});

	// "Resources" dropdown — desktop opens purely on CSS :hover, no click
	// state at all there (matches window.matchMedia, not just CSS layout).
	// Click/tap only drives the toggle at mobile widths, where there's no
	// hover to fall back on.
	if (dropdown && dropdownToggle) {
		dropdownToggle.addEventListener("click", function (e) {
			if (!isMobileViewport()) return;
			e.stopPropagation();
			var isOpen = dropdown.classList.contains("is-open");
			dropdown.classList.toggle("is-open", !isOpen);
			dropdownToggle.setAttribute("aria-expanded", String(!isOpen));
		});

		document.addEventListener("click", function (e) {
			if (!dropdown.contains(e.target)) {
				closeDropdown();
			}
		});
	}
})();
