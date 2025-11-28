// Onboarding State Management (fixed syntax + safer logic)
      class OnboardingManager {
        constructor() {
          this.currentStep = 1;
          this.totalSteps =
            document.querySelectorAll(".step-content").length || 4;
          this.userData = {};
          this.init();
        }

        init() {
          this.updateProgress();
          this.bindEvents();
          this.validateForm();
        }

        bindEvents() {
          // Validate on input/change
          const inputs = document.querySelectorAll("input, select, textarea");
          inputs.forEach((input) => {
            input.addEventListener("input", () => this.validateForm());
            input.addEventListener("change", () => this.validateForm());
          });

          // Keyboard navigation (Enter)
          document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              // Prevent Enter inside textarea from progressing
              if (
                document.activeElement &&
                document.activeElement.tagName.toLowerCase() === "textarea"
              )
                return;

              if (this.isCurrentStepValid()) {
                if (this.currentStep < this.totalSteps) {
                  this.nextStep();
                } else if (this.currentStep === 3) {
                  this.completeOnboarding();
                }
              } else {
                this.showValidationErrors();
              }
            }
          });
        }

        updateProgress() {
          const progressFill = document.getElementById("progressFill");
          const progress =
            ((this.currentStep - 1) / (this.totalSteps - 1)) * 100;
          if (progressFill) progressFill.style.width = progress + "%";

          // Update step indicators
          document.querySelectorAll(".step").forEach((step, index) => {
            const stepNum = index + 1;
            step.classList.remove("active", "completed");

            if (stepNum < this.currentStep) {
              step.classList.add("completed");
            } else if (stepNum === this.currentStep) {
              step.classList.add("active");
            }
          });

          // Show current step content
          document
            .querySelectorAll(".step-content")
            .forEach((content, index) => {
              content.classList.remove("active");
              if (index + 1 === this.currentStep) {
                content.classList.add("active");
              }
            });

          // After switching steps, re-validate to set button state
          this.validateForm();
        }

        nextStep() {
          if (!this.isCurrentStepValid()) {
            this.showValidationErrors();
            return;
          }

          this.saveCurrentStepData();

          if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateProgress();
            this.scrollToTop();
          }
        }

        prevStep() {
          if (this.currentStep > 1) {
            this.currentStep--;
            this.updateProgress();
            this.scrollToTop();
          }
        }

        completeOnboarding() {
          if (!this.isCurrentStepValid()) {
            this.showValidationErrors();
            return;
          }

          this.saveCurrentStepData();

          // Find the primary continue/complete button in the current step (if any)
          const currentStepContent = document.querySelector(
            `.step-content[data-step="${this.currentStep}"]`
          );
          const btn = currentStepContent
            ? currentStepContent.querySelector(".btn:not(.btn-secondary)")
            : null;
          const originalText = btn ? btn.textContent : "";

          if (btn) {
            btn.innerHTML = '<span class="loading"></span> Processing...';
            btn.disabled = true;
          }

          // Simulate API call
          setTimeout(() => {
            this.currentStep = this.totalSteps;
            this.updateProgress();
            this.scrollToTop();

            if (btn) {
              btn.textContent = originalText;
              btn.disabled = false;
            }

            // In a real app, send this.userData to your server here
            console.log("User data collected:", this.userData);
          }, 2000);
        }

        isCurrentStepValid() {
          const currentStepContent = document.querySelector(
            `.step-content[data-step="${this.currentStep}"]`
          );
          if (!currentStepContent) return true;

          const requiredInputs = currentStepContent.querySelectorAll(
            "input[required], select[required]"
          );
          return Array.from(requiredInputs).every((input) => {
            return input.value.trim() !== "";
          });
        }

        showValidationErrors() {
          const currentStepContent = document.querySelector(
            `.step-content[data-step="${this.currentStep}"]`
          );
          if (!currentStepContent) return;

          const requiredInputs = currentStepContent.querySelectorAll(
            "input[required], select[required]"
          );

          requiredInputs.forEach((input) => {
            if (input.value.trim() === "") {
              input.style.borderColor = "#ff4444";
              setTimeout(() => {
                input.style.borderColor = "#e0e0e0";
              }, 2000);
            }
          });

          this.showNotification("Please fill in all required fields", "error");
        }

        saveCurrentStepData() {
          const currentStepContent = document.querySelector(
            `.step-content[data-step="${this.currentStep}"]`
          );
          if (!currentStepContent) return;

          const inputs = currentStepContent.querySelectorAll(
            "input, select, textarea"
          );

          inputs.forEach((input) => {
            if (input.type === "checkbox") {
              if (!this.userData.interests) this.userData.interests = [];
              if (
                input.checked &&
                !this.userData.interests.includes(input.value)
              ) {
                this.userData.interests.push(input.value);
              }
            } else if (input.type === "radio") {
              if (input.checked) {
                this.userData[input.name] = input.value;
              }
            } else {
              if (input.id) this.userData[input.id] = input.value;
            }
          });
        }

        validateForm() {
          const currentStepContent = document.querySelector(
            `.step-content[data-step="${this.currentStep}"]`
          );
          if (!currentStepContent) return;

          const continueBtn = currentStepContent.querySelector(
            ".btn:not(.btn-secondary)"
          );
          if (!continueBtn) return;

          if (this.isCurrentStepValid()) {
            continueBtn.style.opacity = "1";
            continueBtn.style.pointerEvents = "auto";
          } else {
            continueBtn.style.opacity = "0.7";
            continueBtn.style.pointerEvents = "none"; // disable clicking when invalid
          }
        }

        showNotification(message, type = "info") {
          const notification = document.createElement("div");
          notification.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          background: ${type === "error" ? "#ff4444" : "#000000"};
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          z-index: 10000;
          animation: slideIn 0.3s ease;
        `;
          notification.textContent = message;
          document.body.appendChild(notification);
          setTimeout(() => notification.remove(), 3000);
        }

        scrollToTop() {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }

      // Initialize onboarding manager
      const onboardingManager = new OnboardingManager();

      // Global functions for buttons
      function nextStep() {
        onboardingManager.nextStep();
      }
      function prevStep() {
        onboardingManager.prevStep();
      }
      function completeOnboarding() {
        onboardingManager.completeOnboarding();
      }

      // Initialize smooth scrolling for navigation
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      });

      // Mobile menu toggle (if needed)
      function toggleMobileMenu() {
        const navLinks = document.querySelector(".nav-links");
        navLinks.classList.toggle("mobile-open");
      }

      // Form enhancements
      document.addEventListener("DOMContentLoaded", function () {
        const firstInput = document.querySelector(".step-content.active input");
        if (firstInput) firstInput.focus();
      });