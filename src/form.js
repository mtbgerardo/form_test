document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("contactForm");
	const submitBtn = document.getElementById("submitBtn");
	const phoneInput = document.getElementById("phone");
	const emailInput = document.getElementById("email");
	const nameInput = document.getElementById("name");
    const cityInput = document.getElementById("city");
    const stateInput = document.getElementById("state");

	// Phone mask implementation
	phoneInput.addEventListener("input", (e) => {
		var x = e.target.value
			.replace(/\D/g, "")
			.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
		e.target.value = !x[2]
			? x[1]
			: "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
	});

    // Form validation listener
    form.addEventListener("input", (e) => {
        if (!e.target.validity.valid) {
            e.target.classList.add("error");
        } else {
            e.target.classList.remove("error");
            e.target.setCustomValidity("");
        }
    });

	// Form fields required validation
	const validateForm = () => {
		let isValid = true;
		// Name validation
		if (nameInput.value.length < 2) {
			nameInput.classList.add("error");
			isValid = false;
		} else {
			nameInput.classList.remove("error");
		}

		// Phone validation
		if (!phoneInput.value.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
			phoneInput.classList.add("error");
			isValid = false;
		} else {
			phoneInput.classList.remove("error");
		}

		// Email validation
		if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
			emailInput.classList.add("error");
			isValid = false;
		} else {
			emailInput.classList.remove("error");
		}

		return isValid;
	};

	// Form submission
	form.addEventListener("submit", async (e) => {
		e.preventDefault();

        if (!validateForm()) return;

		submitBtn.textContent = "Submitting...";
		submitBtn.disabled = true;

		try {
			// Simulate form submission (endpoint won't work as specified)
		    let xml = new XMLHttpRequest();
            xml.open("POST", "https://formsws-hilstaging-com-0adj9wt8gzyq.runscope.net/solar");
            xml.setRequestHeader("Content-Type", "application/json");
            xml.send(JSON.stringify({
                name: nameInput.value,
                phone: phoneInput.value,
                email: emailInput.value,
                city: cityInput.value,
                state: stateInput.value   
            }));
            xml.onload = () => {
                if ( xml.status === 200) {
                    submitBtn.textContent = "Submitted";
                } else {
                    submitBtn.textContent = "Submit";
                    submitBtn.disabled = false;
                }
            };

            // Simulate successful response
            if ( xml.status === 0) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
			    submitBtn.textContent = "Submitted";
            } 

		} catch (error) {
			console.error("Form submission error:", error);
			submitBtn.textContent = "Submit";
			submitBtn.disabled = false;
		}
	});
});
