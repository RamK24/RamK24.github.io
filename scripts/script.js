// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Scroll animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("visible", entry.isIntersecting);
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".section").forEach((section) => {
  section.classList.add("hidden");
  observer.observe(section);
});

// Add animation styles
const style = document.createElement("style");
style.textContent = `
  .hidden { opacity: 0; transform: translateY(20px); transition: all 0.6s ease; }
  .visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);

// Certifications Filter
document.querySelectorAll(".filter-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    // Get filter value
    const filter = button.dataset.filter;

    // Filter certifications
    document.querySelectorAll(".certification-tile").forEach((tile) => {
      if (tile.dataset.category === filter || filter === "all") {
        tile.style.display = "block"; // Show matching tiles
      } else {
        tile.style.display = "none"; // Hide non-matching tiles
      }
    });
  });
});

// Apply default filter on page load
function applyDefaultFilter() {
  const defaultFilter = "data-science"; // Set the default filter category
  document.querySelectorAll(".filter-btn").forEach((button) => {
    if (button.dataset.filter === defaultFilter) {
      button.classList.add("active"); // Activate the default button
    }
  });

  // Filter certifications based on the default filter
  document.querySelectorAll(".certification-tile").forEach((tile) => {
    if (tile.dataset.category === defaultFilter) {
      tile.style.display = "block"; // Show matching tiles
    } else {
      tile.style.display = "none"; // Hide non-matching tiles
    }
  });
}

// Call the function to apply the default filter when the page loads
applyDefaultFilter();
