// Language toggle — visual state only.
// The actual EN/ES navigation is a real <a href> in the markup, so the
// switch keeps working even if this script fails to load. This script
// just makes the pill render in the correct position/color on load.
(function () {
	var toggle = document.querySelector(".lang-toggle");
	if (!toggle) return;

	var switchEl = toggle.querySelector(".lang-toggle-switch");
	var labels = toggle.querySelectorAll(".lang-toggle-label");
	var currentLang = document.documentElement.lang === "es" ? "es" : "en";

	toggle.setAttribute("data-lang", currentLang);
	switchEl.classList.toggle("is-es", currentLang === "es");
	labels.forEach(function (label) {
		label.classList.toggle("is-active", label.dataset.lang === currentLang);
	});
})();
