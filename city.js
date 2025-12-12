(function () {
  const grid = document.getElementById("grid");
  const cards = Array.from(grid.querySelectorAll(".card"));
  const search = document.getElementById("search");
  const regionFilters = document.querySelectorAll(".region-filter");
  const reset = document.getElementById("reset");
  const iconButtons = document.querySelectorAll(".icon-btn");

  let activeRegion = "all";

  function applyFilters() {
    const searchQuery = (search.value || "").trim().toLowerCase();

    cards.forEach((card) => {
      const city = card.dataset.city?.toLowerCase() || "";
      const country = card.dataset.country?.toLowerCase() || "";
      const region = card.dataset.region || "";

      const matchesSearch =
        !searchQuery ||
        city.includes(searchQuery) ||
        country.includes(searchQuery);

      const matchesRegion =
        activeRegion === "all" || region === activeRegion;

      const shouldShow = matchesSearch && matchesRegion;
      card.style.display = shouldShow ? "" : "none";
    });
  }

  search.addEventListener("input", applyFilters);

  regionFilters.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      regionFilters.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeRegion = button.dataset.region;
      applyFilters();
    });
  });

  reset.addEventListener("click", () => {
    search.value = "";
    regionFilters.forEach((btn) => btn.classList.remove("active"));
    document.querySelector('[data-region="all"]').classList.add("active");
    activeRegion = "all";
    applyFilters();
  });

  // Icon button handlers (keep these if you want)
  iconButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonType = button.getAttribute("aria-label");
      console.log(`${buttonType} clicked`);

      switch (buttonType) {
        case "Profile":
          
          break;
        case "Messages":
          alert("Messages clicked - implement your messages logic here");
          break;
        case "Notifications":
          alert("Notifications clicked - implement your notifications logic here");
          break;
      }
    });
  });
})();