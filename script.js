/* =========================
   ZENTRA JAVASCRIPT
========================= */


/* 1. MOBILE NAVBAR */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

if (menuBtn && navMenu) {
    menuBtn.addEventListener("click", function () {
        navMenu.classList.toggle("open");

        const isOpen = navMenu.classList.contains("open");

        menuBtn.setAttribute("aria-expanded", isOpen);
        menuBtn.textContent = isOpen ? "✕" : "☰";

        menuBtn.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
);
    });

    // Close menu after clicking a navigation link
    navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navMenu.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        });
    });

    // Close menu when clicking outside it
    document.addEventListener("click", function (event) {
        if (
            !navMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {
            navMenu.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.textContent = "☰";
        }
    });
}



/* 2. SHOW AND HIDE BALANCE */

const toggleBalance = document.getElementById("toggleBalance");
const balanceAmount = document.getElementById("balance");

if (toggleBalance && balanceAmount) {
    const originalBalance = balanceAmount.textContent.trim();
    let balanceVisible = true;

    toggleBalance.addEventListener("click", function () {
        balanceVisible = !balanceVisible;

        if (balanceVisible) {
            balanceAmount.textContent = originalBalance;
            toggleBalance.textContent = "◉";
            toggleBalance.setAttribute("aria-label", "Hide balance");
        } else {
            balanceAmount.textContent = "₦ ••••••";
            toggleBalance.textContent = "◎";
            toggleBalance.setAttribute("aria-label", "Show balance");
        }
    });
}


/* 3. TOAST NOTIFICATIONS */

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
    if (!toast) {
        alert(message);
        return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}


/* 4. ADD MONEY BUTTON */

const addMoney = document.getElementById("addMoney");

if (addMoney) {
    addMoney.addEventListener("click", function () {
        showToast(
            "Demo mode: Add Money is not connected to a real payment service."
        );
    });
}


/* 5. DEMO BUTTON FEEDBACK */

document.querySelectorAll("[data-demo]").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        const message =
            button.getAttribute("data-message") ||
            "This feature is a demo and is not connected to a real service.";

        showToast(message);
    });
});


/* 6. PREVENT EMPTY FORMS */

document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        showToast(
            "Demo only: Your information has not been sent or saved."
        );
    });
});


/* 7. SIMPLE PAGE ENTRANCE ANIMATION */

document.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("page-loaded");
});


/* 8. UPDATE FOOTER YEAR */

document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = new Date().getFullYear();
});



javascript
/* =========================
   AIRTIME AMOUNT SELECTOR
========================= */

const airtimeAmount = document.getElementById("airtimeAmount");
const airtimeSummary = document.getElementById("airtimeSummary");
const amountButtons = document.querySelectorAll(".amount-option");

function updateAirtimeAmount(value) {
    const amount = Number(value) || 0;

    if (airtimeSummary) {
        airtimeSummary.textContent = amount.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2
        });
    }
}

if (airtimeAmount) {
    airtimeAmount.addEventListener("input", function () {
        updateAirtimeAmount(airtimeAmount.value);

        amountButtons.forEach(function (button) {
            button.classList.toggle(
                "selected",
                Number(button.dataset.amount) === Number(airtimeAmount.value)
            );
        });
    });
}

amountButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const amount = button.dataset.amount;

        if (airtimeAmount) {
            airtimeAmount.value = amount;
            airtimeAmount.dispatchEvent(new Event("input", {
                bubbles: true
            }));
        }

        amountButtons.forEach(function (item) {
            item.classList.toggle("selected", item === button);
        });
    });
});

/* =========================
   BILLS PAGE INTERACTIONS
========================= */

const billButtons = document.querySelectorAll(".bill-service");
const billType = document.getElementById("billType");
const billProvider = document.getElementById("billProvider");
const billTitle = document.getElementById("billFormTitle");
const billDescription = document.getElementById("billFormDescription");
const selectedBillName = document.getElementById("selectedBillName");
const selectedBillIcon = document.getElementById("selectedBillIcon");
const billPaymentSection = document.getElementById("billPayment");

const billOptions = {
    Electricity: {
        icon: "⚡",
        providers: [
            "Demo Electricity Provider A",
            "Demo Electricity Provider B",
            "Demo Electricity Provider C"
        ]
    },

    Television: {
        icon: "📺",
        providers: [
            "Demo TV Provider A",
            "Demo TV Provider B",
            "Demo TV Provider C"
        ]
    },

    Internet: {
        icon: "🌐",
        providers: [
            "Demo Internet Provider A",
            "Demo Internet Provider B",
            "Demo Internet Provider C"
        ]
    },

    Education: {
        icon: "🎓",
        providers: [
            "Demo Education Provider A",
            "Demo Education Provider B",
            "Demo Education Provider C"
        ]
    }
};

billButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const type = button.dataset.bill;
        const details = billOptions[type];

        if (!details || !billProvider) return;

        billButtons.forEach(function (item) {
            item.classList.toggle("selected", item === button);
        });

        if (billType) {
            billType.value = type;
        }

        if (billTitle) {
            billTitle.textContent = type + " payment";
        }

        if (billDescription) {
            billDescription.textContent =
                "Enter your " + type.toLowerCase() +
                " payment details below.";
        }

        if (selectedBillName) {
            selectedBillName.textContent = type;
        }

        if (selectedBillIcon) {
            selectedBillIcon.textContent = details.icon;
        }

        billProvider.innerHTML =
            '<option value="">Select a demo provider</option>';

        details.providers.forEach(function (provider) {
            const option = document.createElement("option");
            option.value = provider;
            option.textContent = provider;
            billProvider.appendChild(option);
        });

        if (billPaymentSection) {
            billPaymentSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* =========================
   TRANSACTION SEARCH & FILTER
========================= */

const transactionSearch =
    document.getElementById("transactionSearch");

const transactionFilter =
    document.getElementById("transactionFilter");

const historyRows =
    document.querySelectorAll(".history-row");

const transactionCount =
    document.getElementById("transactionCount");

const historyEmpty =
    document.getElementById("historyEmpty");

function filterTransactions() {
    if (!transactionSearch || !transactionFilter) return;

    const searchTerm = transactionSearch.value
        .trim()
        .toLowerCase();

    const selectedType = transactionFilter.value;
    let visibleCount = 0;

    historyRows.forEach(function (row) {
        const searchableText = (
            row.innerText + " " +
            (row.dataset.search || "")
        ).toLowerCase();

        const matchesSearch =
            searchableText.includes(searchTerm);

        const matchesType =
            selectedType === "all" ||
            row.dataset.type === selectedType;

        const shouldShow = matchesSearch && matchesType;

        row.style.display = shouldShow ? "flex" : "none";

        if (shouldShow) {
            visibleCount++;
        }
    });

    if (transactionCount) {
        transactionCount.textContent =
            visibleCount + (visibleCount === 1
                ? " record"
                : " records");
    }

    if (historyEmpty) {
        historyEmpty.hidden = visibleCount !== 0;
    }
}

if (transactionSearch) {
    transactionSearch.addEventListener(
        "input",
        filterTransactions
    );
}

if (transactionFilter) {
    transactionFilter.addEventListener(
        "change",
        filterTransactions
    );
}


// ===== ZENTRA PROFILE PAGE =====

const profileEditBtn = document.getElementById("editProfileBtn");
const profileSaveBtn = document.getElementById("savePreferencesBtn");
const profileLogoutBtn = document.getElementById("demoLogoutBtn");

if (profileEditBtn) {
    profileEditBtn.addEventListener("click", () => {
        showToast("Profile editing is a demo feature.");
    });
}

if (profileSaveBtn) {
    profileSaveBtn.addEventListener("click", () => {
        const preferences = {
            emailNotifications:
                document.getElementById("emailNotifications").checked,
            transactionAlerts:
                document.getElementById("transactionAlerts").checked,
            promotionalUpdates:
                document.getElementById("promotionalUpdates").checked
        };

        // Demo only: this does not save preferences permanently.
        console.log("Selected demo preferences:", preferences);
        showToast("Preferences updated for this demo.");
    });
}

if (profileLogoutBtn) {
    profileLogoutBtn.addEventListener("click", () => {
        showToast("Demo sign-out clicked. No account was signed out.");
    });
}