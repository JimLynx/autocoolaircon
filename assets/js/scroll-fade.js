(function () {
	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
		document.querySelectorAll(".fade-in").forEach(function (el) {
			el.classList.add("fade-in-visible");
		});
		return;
	}

	var observer = new IntersectionObserver(
		function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("fade-in-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.15 }
	);

	document.querySelectorAll(".fade-in").forEach(function (el) {
		observer.observe(el);
	});
})();
