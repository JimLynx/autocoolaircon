// Email "open with" modal — Gmail / Outlook / Apple Mail / copy address
// Shared by contact.html and es/contact.html (same IDs, same address).
(function () {
	var emailTrigger = document.getElementById("email-trigger");
	var emailModal = document.getElementById("email-modal");
	if (!emailTrigger || !emailModal) return;

	var emailBackdrop = emailModal.querySelector(".email-modal-backdrop");
	var copyBtn = document.getElementById("email-copy");
	var copyLabel = copyBtn.querySelector("span");
	var copyDefaultLabel = copyLabel.textContent;
	var emailAddress = "info@autocoolaircon.com";

	emailTrigger.addEventListener("click", function () {
		emailModal.classList.add("open");
		emailModal.setAttribute("aria-hidden", "false");
	});

	function closeEmailModal() {
		emailModal.classList.remove("open");
		emailModal.setAttribute("aria-hidden", "true");
		setTimeout(function () {
			copyLabel.textContent = copyDefaultLabel;
		}, 400);
	}

	emailBackdrop.addEventListener("click", closeEmailModal);

	emailModal
		.querySelectorAll(".email-modal-option:not(.email-modal-copy)")
		.forEach(function (el) {
			el.addEventListener("click", closeEmailModal);
		});

	copyBtn.addEventListener("click", function () {
		navigator.clipboard.writeText(emailAddress).then(function () {
			copyLabel.textContent =
				copyBtn.getAttribute("data-copied-label") || "Copied!";
			setTimeout(closeEmailModal, 1000);
		});
	});

	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape") closeEmailModal();
	});
})();
