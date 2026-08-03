// Auto-fading image slideshow with clickable dots. Advances through a
// randomised order each cycle, rather than a fixed 1-2-3-4 sequence.
// Shared by index.html and es/index.html (same markup, same IDs).
(function () {
	var interval = 5000;

	function shuffled(length) {
		var order = [];
		for (var i = 0; i < length; i++) order.push(i);
		for (var j = order.length - 1; j > 0; j--) {
			var k = Math.floor(Math.random() * (j + 1));
			var tmp = order[j];
			order[j] = order[k];
			order[k] = tmp;
		}
		return order;
	}

	document.querySelectorAll(".fade-slideshow").forEach(function (slideshow) {
		var slides = Array.prototype.slice.call(
			slideshow.querySelectorAll(".fade-slide")
		);
		var dots = Array.prototype.slice.call(
			slideshow.querySelectorAll(".fade-slideshow-dot")
		);
		if (slides.length < 2) return;

		var order = shuffled(slides.length);
		var pos = 0;
		var current = order[0];
		var timer = null;

		function show(index) {
			slides[current].classList.remove("is-active");
			dots[current] && dots[current].classList.remove("is-active");
			current = index;
			slides[current].classList.add("is-active");
			dots[current] && dots[current].classList.add("is-active");
		}

		function next() {
			pos += 1;
			if (pos >= order.length) {
				pos = 0;
				order = shuffled(slides.length);
				if (order[0] === current) order.push(order.shift());
			}
			show(order[pos]);
		}

		function restart() {
			clearInterval(timer);
			timer = setInterval(next, interval);
		}

		dots.forEach(function (dot, index) {
			dot.addEventListener("click", function () {
				if (index === current) return;
				show(index);
				restart();
			});
		});

		slides.forEach(function (slide, index) {
			slide.classList.toggle("is-active", index === current);
		});
		dots.forEach(function (dot, index) {
			dot.classList.toggle("is-active", index === current);
		});

		restart();
	});
})();
