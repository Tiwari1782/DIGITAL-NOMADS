// Handle icon button clicks
document.addEventListener("DOMContentLoaded", function () {
  const iconButtons = document.querySelectorAll(".icon-btn");

  iconButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonType = button.getAttribute("aria-label");
      console.log(`${buttonType} clicked`);

      // Add your specific functionality here
      switch (buttonType) {
        case "Profile":
          // Handle profile click
          alert("profile logic here");
          break;
        case "Messages":
          // Handle messages click
          alert("messages logic here");
          break;
        case "Notifications":
          // Handle notifications click
          alert(
            "notifications logic here"
          );
          break;
      }
    });
  });
});
