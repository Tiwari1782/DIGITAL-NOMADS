// Mobile menu toggle
      const hamburger = document.getElementById("hamburger");
      const navLinks = document.getElementById("navLinks");

      hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");
      });

      // Scroll indicator
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const maxHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / maxHeight) * 100;
        document.getElementById("scrollIndicator").style.width =
          scrollPercent + "%";
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          navLinks.classList.remove("active");
        });
      });

      // Scroll to top function
      function scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Fade in animation on scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
          }
        });
      }, observerOptions);

      document
        .querySelectorAll(
          ".content-section, .testimonials-section, .stats-section"
        )
        .forEach((section) => {
          observer.observe(section);
        });

      // Header hide/show on scroll
      let lastScrollTop = 0;
      window.addEventListener("scroll", () => {
        let scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector(".header");

        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop;
      });

      // Add loading animation
      window.addEventListener("load", () => {
        document.body.classList.add("loaded");

        // Animate stats counting when stats section is in view
        const statsSection = document.querySelector(".stats-section");
        let hasAnimated = false;

        const statsObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;

                // Add pop-up animation to stat items
                document
                  .querySelectorAll(".stat-item")
                  .forEach((item, index) => {
                    setTimeout(() => {
                      item.classList.add("pop-up");
                    }, index * 150);
                  });

                // Animate stats counting
                setTimeout(() => {
                  animateValue("stat1", 0, 1500, 2000, "+");
                  animateValue("stat2", 0, 94, 2000, "");
                  animateValue("stat3", 0, 166, 2000, "");
                  animateValue("stat4", 0, 91, 2000, "%");
                }, 300);

                statsObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.3 }
        );

        statsObserver.observe(statsSection);
      });

      // Animate value function
      function animateValue(id, start, end, duration, suffix = "") {
        const element = document.getElementById(id);
        if (!element) return;

        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const value = Math.floor(progress * (end - start) + start);

          if (suffix === "%") {
            element.innerHTML = value + suffix;
          } else if (suffix === "+") {
            if (progress === 1) {
              element.innerHTML = value.toLocaleString() + "+";
            } else {
              element.innerHTML = value.toLocaleString();
            }
          } else {
            element.innerHTML = value.toLocaleString();
          }

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      }
      // Dropdown functionality
      document.addEventListener("DOMContentLoaded", function () {
        const dropdown = document.querySelector(".dropdown");
        const dropdownToggle = document.querySelector(".dropdown-toggle");
        const dropdownContent = document.getElementById("guidesDropdown");

        if (dropdownToggle && dropdownContent) {
          // Toggle dropdown on click
          dropdownToggle.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();

            dropdown.classList.toggle("active");
            dropdownContent.classList.toggle("show");
          });

          // Close dropdown when clicking outside
          document.addEventListener("click", function (e) {
            if (!dropdown.contains(e.target)) {
              dropdown.classList.remove("active");
              dropdownContent.classList.remove("show");
            }
          });

          // Close dropdown when clicking on a dropdown item
          dropdownContent.addEventListener("click", function (e) {
            if (e.target.tagName === "A") {
              dropdown.classList.remove("active");
              dropdownContent.classList.remove("show");
              navLinks.classList.remove("active"); // Close mobile menu too
            }
          });

          // Handle mobile menu interactions
          hamburger.addEventListener("click", () => {
            // Close dropdown when hamburger is clicked
            dropdown.classList.remove("active");
            dropdownContent.classList.remove("show");
          });
        }
      });