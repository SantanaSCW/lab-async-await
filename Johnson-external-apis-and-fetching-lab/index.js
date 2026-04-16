// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!

document.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("state-input");
  const button = document.getElementById("fetch-alerts");
  const display = document.getElementById("alerts-display");
  const errorDiv = document.getElementById("error-message");

  button.addEventListener("click", () => {
    const state = input.value.trim().toUpperCase();

    // This is clear previous content
    display.innerHTML = "";
    errorDiv.textContent = "";
    errorDiv.classList.add("hidden");

    // checking empty input
    if (state === "") {
      showError("Please enter a state abbreviation.");
      return;
    }

    fetchAlerts(state);
  });

  // fetching alerts
  async function fetchAlerts(state) {
    try {
      const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

      if (!response.ok) {
        throw new Error("Invalid state code or network error.");
      }

      const data = await response.json();

      showAlerts(data, state);

      // clearing input after success
      input.value = "";

    } catch (error) {
      showError(error.message);
    }
  }

  // display alerts
  function showAlerts(data, state) {
    const alerts = data.features;

    // create summary
    const summary = document.createElement("h2");
    summary.textContent = `Current watches, warnings, and advisories for ${state}: ${alerts.length}`;
    display.appendChild(summary);

    // create list
    const ul = document.createElement("ul");

    alerts.forEach(alert => {
      const li = document.createElement("li");
      li.textContent = alert.properties.headline;
      ul.appendChild(li);
    });

    display.appendChild(ul);
  }

  // error display
  function showError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove("hidden");
  }

});