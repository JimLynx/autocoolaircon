// Language toggle — visual state only.
// The actual EN/ES navigation is a real <a href> in the markup, so the
// switch keeps working even if this script fails to load.
//
// CSS html[lang] selectors already set the correct visual state on first paint
// (handle position, pill colour, active label colour). This script:
//   1. Adds data-lang / is-active / is-es as JS hooks for specificity parity.
//   2. Enables transitions after the first rAF so they only fire on interaction,
//      never on initial load.
(function () {
	var toggle = document.querySelector(".lang-toggle");
	if (!toggle) return;

	var switchEl = toggle.querySelector(".lang-toggle-switch");
	var labels = toggle.querySelectorAll(".lang-toggle-label");
	var currentLang = document.documentElement.lang === "es" ? "es" : "en";

	// CSS html[lang] already sets the same computed values, so no visual
	// change occurs here — transitions don't fire.
	toggle.setAttribute("data-lang", currentLang);
	if (switchEl) switchEl.classList.toggle("is-es", currentLang === "es");
	labels.forEach(function (label) {
		label.classList.toggle("is-active", label.dataset.lang === currentLang);
	});

	// Gate all transitions behind this class. First rAF ensures the initial
	// painted state is committed before transitions become active.
	requestAnimationFrame(function () {
		toggle.classList.add("lang-toggle-ready");
	});
})();
