// Get elements
const searchBar = document.getElementById("search-bar");
const levelFilter = document.getElementById("level-filter");
const articles = document.querySelectorAll(".article");

// Function to filter articles based on search term and level
function filterArticles() {
  const searchTerm = searchBar.value.toLowerCase(); // Convert to lowercase for case-insensitive matching
  const selectedLevel = levelFilter.value;

  articles.forEach((article) => {
    const articleTitle = article.querySelector("h2").textContent.toLowerCase(); // Get title text and convert it to lowercase
    const articleLevel = article.dataset.level; // Get the level of the article from the data attribute
    const articleContent = article.querySelector("p").textContent.toLowerCase();

    // Check if article matches search term and selected level
    const matchesSearch =
      articleTitle.includes(searchTerm) || articleContent.includes(searchTerm); // Search term match
    const matchesLevel =
      selectedLevel === "all" || articleLevel === selectedLevel; // Level match

    // Show or hide article based on conditions
    if (matchesSearch && matchesLevel) {
      article.style.display = "block"; // Show article
    } else {
      article.style.display = "none"; // Hide article
    }
  });
}

// Event listeners
searchBar.addEventListener("input", filterArticles); // Trigger filter when typing in the search bar
levelFilter.addEventListener("change", filterArticles); // Trigger filter when selecting a different level

// Initialize the filter when the page loads (in case there's pre-existing data)
document.addEventListener("DOMContentLoaded", filterArticles);
