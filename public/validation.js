// public/js/validation.js

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("register-form");
  const loginForm = document.getElementById("login-form");
  if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.querySelector("input[name='name']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const password = document.getElementById("pass1").value;
    const confirmPassword = document.getElementById("pass2").value;

    const errorDiv = document.getElementById("error");
    errorDiv.textContent = "";

    if (!name || !email || !password || !confirmPassword) {
      errorDiv.textContent = "All fields are required.";
      errorDiv.style.color = "red";
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.textContent = "Passwords do not match.";
      errorDiv.style.color = "red";
      return;
    }

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.message) {
          // ✅ Successful registration — redirect to index.html
          window.location.href = "home.html";
        } else {
          // Shouldn't happen, but fallback
          errorDiv.textContent = "Unexpected response.";
          errorDiv.style.color = "red";
        }
      } else {
        // ❌ Error from server — show error in the div
        errorDiv.textContent = data.error || "Registration failed.";
        errorDiv.style.color = "red";
      }

    } catch (err) {
      console.error("Fetch error:", err);
      errorDiv.textContent = "Network error. Try again later.";
      errorDiv.style.color = "red";
    }
  });
}







  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const email = document.querySelector("input[name='email']").value.trim();
      const password = document.querySelector("input[name='password']").value;
      const errorDiv = document.getElementById("error");
      errorDiv.style.color="red";

      if (!email || !password) {
        errorDiv.textContent = "Email and password are required.";
        return;
      }

      try {
        const res = await fetch("/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          errorDiv.textContent = data.error || "Login failed.";
        } else {
          window.location.href = "home.html";
        }
      } catch (err) {
        errorDiv.textContent = "An error occurred. Try again.";
      }

    });
  }
});
