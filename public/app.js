document.getElementById("statusForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const password = document.getElementById("password").value;
  changeStatus(password);
});

function updateStatusDisplay(status) {
  const statusElement = document.getElementById("currentState");
  statusElement.textContent = status;

  if (status === "inactive") {
    document.body.className = "inactive";
    document.body.style.backgroundColor = "#FFA500"; // Warm Orange
  } else if (status === "active") {
    document.body.className = "active";
    document.body.style.backgroundColor = "#90EE90"; // Light Green
  }
}

function fetchStatus() {
  fetch("https://wisebit.pythonanywhere.com/get-state")
    .then((response) => response.json())
    .then((data) => {
      updateStatusDisplay(data.status);
    })
    .catch((error) => console.error("Error fetching status:", error));
}

function changeStatus(password) {
  fetch("https://wisebit.pythonanywhere.com/change-state", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(":" + password),
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error("Password may be incorrect or server error occurred.");
      return response.json();
    })
    .then((data) => {
      updateStatusDisplay(data.new_state);
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Initial fetch of the status
fetchStatus();
