/* ===============================
   APPLICATION DATA
================================ */

let credits = 2;

let selectedSkill = "";
let selectedPerson = "";


/* ===============================
   PAGE NAVIGATION
================================ */

function showPage(pageName) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* ===============================
   UPDATE CREDIT BALANCE
================================ */

function updateCredits() {

    document.getElementById("navCredits").innerText =
        credits.toFixed(1);

    document.getElementById("heroCredits").innerText =
        credits.toFixed(1);

    document.getElementById("walletCredits").innerText =
        credits.toFixed(1);

    document.getElementById("statCredits").innerText =
        credits.toFixed(1);
}


/* ===============================
   OPEN SWAP MODAL
================================ */

function openSwap(skill, person) {

    selectedSkill = skill;
    selectedPerson = person;

    document.getElementById("swapDescription").innerText =
        `You are requesting "${skill}" from ${person}.`;

    document.getElementById("swapModal").classList.add("show");
}


/* ===============================
   CLOSE MODAL
================================ */

function closeModal() {

    document.getElementById("swapModal")
        .classList.remove("show");
}


/* ===============================
   SEND SWAP REQUEST
================================ */

function sendSwapRequest() {

    const date =
        document.getElementById("swapDate").value;

    const time =
        document.getElementById("swapTime").value;

    if (!date || !time) {

        alert("Please select a date and time.");

        return;
    }

    closeModal();

    showToast(
        `Swap request sent to ${selectedPerson}! 🤝`
    );

    document.getElementById("swapDate").value = "";
    document.getElementById("swapTime").value = "";
    document.getElementById("swapMessage").value = "";
}


/* ===============================
   TOAST MESSAGE
================================ */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.innerText = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}


/* ===============================
   SEARCH OFFERS
================================ */

function searchOffers() {

    const search =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    const category =
        document.getElementById("categoryFilter")
            .value;

    const cards =
        document.querySelectorAll(".searchable");

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        const cardCategory =
            card.dataset.category;

        const matchesSearch =
            text.includes(search);

        const matchesCategory =
            category === "all" ||
            cardCategory === category;

        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });
}


/* ===============================
   CREATE OFFER
================================ */

function createOffer(event) {

    event.preventDefault();

    const title =
        document.getElementById("offerTitle").value;

    const category =
        document.getElementById("offerCategory").value;

    const description =
        document.getElementById("offerDescription").value;

    const duration =
        document.getElementById("offerDuration").value;

    const location =
        document.getElementById("offerLocation").value;


    /*
       In the MERN version this information
       will be sent to:

       POST /api/offers

       For now we only simulate it.
    */


    showToast("Your offer has been published! 🎉");

    document.querySelector("form").reset();

    setTimeout(() => {

        showPage("explore");

    }, 1000);
}


/* ===============================
   CONFIRM SWAP
================================ */

function confirmSwap(button) {

    const confirmation =
        confirm(
            "Did the TimeSwap session really happen?"
        );

    if (!confirmation) {

        return;

    }

    button.innerText = "Confirmed";

    button.disabled = true;

    button.style.background = "#2aa865";

    button.parentElement
        .parentElement
        .querySelector(".history-status")
        .innerText = "COMPLETED";

    button.parentElement
        .parentElement
        .querySelector(".history-status")
        .classList.remove("pending");

    button.parentElement
        .parentElement
        .querySelector(".history-status")
        .classList.add("completed");


    /*
       In the real MERN application:

       POST /api/swaps/:id/confirm

       Backend checks:

       1. User A confirmed
       2. User B confirmed
       3. Swap wasn't disputed
       4. Hours are valid
       5. Ledger transaction is created

       Only then are credits transferred.
    */


    credits += 1;

    updateCredits();

    showToast(
        "Swap confirmed! +1 time credit earned ⏱"
    );
}


/* ===============================
   MODAL OUTSIDE CLICK
================================ */

document
    .getElementById("swapModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeModal();

        }

    });


/* ===============================
   INITIALIZE
================================ */

updateCredits();