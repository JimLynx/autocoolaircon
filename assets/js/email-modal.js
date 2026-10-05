// Email "open with" modal — Gmail / Outlook / Default mail app / copy address
// Shared by contact.html and es/contact.html (same IDs, same address).
(function () {
	var emailTrigger = document.getElementById("email-trigger");
	var emailModal = document.getElementById("email-modal");
	if (!emailTrigger || !emailModal) return;

	var emailBackdrop = emailModal.querySelector(".email-modal-backdrop");
	var emailPanel = emailModal.querySelector(".email-modal-panel");
	var copyBtn = document.getElementById("email-copy");
	var copyLabel = copyBtn.querySelector("span");
	var copyDefaultLabel = copyLabel.textContent;
	var emailAddress = "nico@autocoolaircon.es";

	// Set here rather than in the markup: without JS the trigger is a plain mailto link.
	emailTrigger.setAttribute("aria-haspopup", "dialog");
	emailTrigger.setAttribute("aria-controls", "email-modal");
	emailTrigger.setAttribute("aria-expanded", "false");

	function isOpen() {
		return emailModal.classList.contains("open");
	}

	function getFocusable() {
		return emailPanel.querySelectorAll("a[href], button:not([disabled])");
	}

	emailTrigger.addEventListener("click", function (e) {
		e.preventDefault();
		emailModal.classList.add("open");
		emailModal.setAttribute("aria-hidden", "false");
		emailTrigger.setAttribute("aria-expanded", "true");
		getFocusable()[0].focus();
	});

	function closeEmailModal() {
		if (!isOpen()) return;
		emailModal.classList.remove("open");
		emailModal.setAttribute("aria-hidden", "true");
		emailTrigger.setAttribute("aria-expanded", "false");
		emailTrigger.focus();
		setTimeout(function () {
			copyLabel.textContent = copyDefaultLabel;
			copyLabel.style.userSelect = "";
			copyLabel.style.webkitUserSelect = "";
		}, 400);
	}

	emailBackdrop.addEventListener("click", closeEmailModal);

	emailModal
		.querySelectorAll(".email-modal-option:not(.email-modal-copy)")
		.forEach(function (el) {
			el.addEventListener("click", closeEmailModal);
		});

	function showCopied() {
		copyLabel.textContent =
			copyBtn.getAttribute("data-copied-label") || "Copied!";
		setTimeout(closeEmailModal, 1000);
	}

	// Fallback for when the async clipboard API is missing or rejects.
	function legacyCopy() {
		var textarea = document.createElement("textarea");
		textarea.value = emailAddress;
		textarea.setAttribute("readonly", "");
		textarea.setAttribute("aria-hidden", "true");
		textarea.style.position = "fixed";
		textarea.style.top = "0";
		textarea.style.left = "0";
		textarea.style.opacity = "0";
		textarea.style.fontSize = "16px";
		emailPanel.appendChild(textarea);
		textarea.select();
		textarea.setSelectionRange(0, emailAddress.length);
		var copied = false;
		try {
			copied = document.execCommand("copy");
		} catch (err) {
			copied = false;
		}
		emailPanel.removeChild(textarea);
		copyBtn.focus();
		return copied;
	}

	// Last resort: show the address in place of the label, selected, to copy by hand.
	function selectForManualCopy() {
		copyLabel.textContent = emailAddress;
		copyLabel.style.userSelect = "text";
		copyLabel.style.webkitUserSelect = "text";
		var range = document.createRange();
		range.selectNodeContents(copyLabel);
		var selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
	}

	function copyFallback() {
		if (legacyCopy()) {
			showCopied();
		} else {
			selectForManualCopy();
		}
	}

	copyBtn.addEventListener("click", function () {
		if (!navigator.clipboard || !navigator.clipboard.writeText) {
			copyFallback();
			return;
		}
		navigator.clipboard
			.writeText(emailAddress)
			.then(showCopied)
			.catch(copyFallback);
	});

	document.addEventListener("keydown", function (e) {
		if (!isOpen()) return;
		if (e.key === "Escape") {
			closeEmailModal();
			return;
		}
		if (e.key !== "Tab") return;
		var focusable = getFocusable();
		var first = focusable[0];
		var last = focusable[focusable.length - 1];
		var active = document.activeElement;
		if (!emailPanel.contains(active)) {
			e.preventDefault();
			first.focus();
		} else if (e.shiftKey && active === first) {
			e.preventDefault();
			last.focus();
		} else if (!e.shiftKey && active === last) {
			e.preventDefault();
			first.focus();
		}
	});
})();
