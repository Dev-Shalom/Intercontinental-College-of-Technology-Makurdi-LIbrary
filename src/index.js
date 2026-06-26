// Note: script.js is imported via main.js — do NOT import it again here

document.addEventListener("DOMContentLoaded", function () {

  window.initMainPage = function () {

    const grid = document.getElementById("grid");
    const searchInput = document.getElementById("searchInput");
    const clearBtn = document.getElementById("clearSearch");
    const chipsContainer = document.getElementById("chips");
    const empty = document.getElementById("emptyState");

    if (!grid || !searchInput || !clearBtn || !chipsContainer || !empty) {
      console.error("One or more required HTML elements are missing.");
      console.log({
        grid,
        searchInput,
        clearBtn,
        chipsContainer,
        empty
      });
      return;
    }

    const cards = Array.from(grid.querySelectorAll("details"));
    const chips = Array.from(chipsContainer.querySelectorAll("button"));

    // Set item count badges
    cards.forEach(card => {
      const c = card.querySelectorAll("ul li").length;
      const badge = card.querySelector("[data-count]");
      if (badge) badge.textContent = c;
    });

    function activeCategory() {
      const chip = chips.find(c => c.classList.contains("active"));
      return chip ? chip.dataset.cat : "all";
    }

    function filter() {
      const q = searchInput.value.trim().toLowerCase();
      const cat = activeCategory();

      let anyVisible = false;

      cards.forEach(card => {
        const matchCat = (cat === "all") || (card.dataset.cat === cat);

        const items = Array.from(card.querySelectorAll("ul li"));

        let anyItemVisible = false;

        items.forEach(li => {
          const txt = li.textContent.toLowerCase();
          const matchText = !q || txt.includes(q);

          li.style.display = matchText ? "" : "none";

          if (matchText) anyItemVisible = true;
        });

        const showCard = matchCat && anyItemVisible;

        card.style.display = showCard ? "" : "none";

        if (showCard) anyVisible = true;
      });

      empty.classList.toggle("hidden", anyVisible);
    }

    searchInput.addEventListener("input", filter);

    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      filter();
      searchInput.focus();
    });

    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        filter();
      });
    });

    filter();
  };

});