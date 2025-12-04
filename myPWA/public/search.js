document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".card");

  if (!searchInput) {
    console.error("Search input not found!");
    return;
  }

  searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.toLowerCase();

    cards.forEach((card) => {
      const title = card.textContent.toLowerCase();

      if (title.includes(value)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});
