document.addEventListener("DOMContentLoaded", function () {
  // Handle signup link animation
  document.querySelector(".signup-link")?.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.add("page-exit");
    setTimeout(() => {
      window.location.href = "/signup";
    }, 500);
  });

  // Handle login link animation
  document.querySelector(".loginlink")?.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.add("page-exit");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  });

  // Handle form login
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      console.log("Sending login data:", { username, password });

      try {
        const response = await fetch("http://localhost:3000/login/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          credentials: "include", // 🔐 required for cookies
          body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log("Response:", data);

        if (data.success) {
          alert(`✅ Welcome, ${data.userType}! Redirecting...`);
          window.location.href = data.redirect;
        } else {
          alert(data.error || "⚠️ Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("⚠️ Something went wrong. Please try again.");
      }
    });
  } else {
    console.error("⚠️ Login form not found!");
  }
});
