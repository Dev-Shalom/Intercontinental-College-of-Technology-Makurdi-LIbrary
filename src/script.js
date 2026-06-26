const STATIC_USERNAME = import.meta.env.VITE_USERNAME;
const STATIC_PASSWORD = import.meta.env.VITE_PASSWORD;

document.addEventListener("DOMContentLoaded", function () {

  const loginPage = document.getElementById("login-page");
  const mainPage = document.getElementById("main-page");
  const loginForm = document.getElementById("login-form");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");
  const logoutBtn = document.getElementById("logout-btn");

  // Check that everything exists
  if (
    !loginPage ||
    !mainPage ||
    !loginForm ||
    !usernameInput ||
    !passwordInput ||
    !errorMessage ||
    !logoutBtn
  ) {
    console.error("Missing HTML elements:", {
      loginPage,
      mainPage,
      loginForm,
      usernameInput,
      passwordInput,
      errorMessage,
      logoutBtn,
    });
    return;
  }

  if (sessionStorage.getItem("isLoggedIn") === "true") {
    showMainPage();
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (
      username === STATIC_USERNAME &&
      password === STATIC_PASSWORD
    ) {
      sessionStorage.setItem("isLoggedIn", "true");

      errorMessage.classList.add("hidden");

      showMainPage();

    } else {
      errorMessage.classList.remove("hidden");

      usernameInput.value = "";
      passwordInput.value = "";

      usernameInput.focus();
    }
  });

  logoutBtn.addEventListener("click", function () {
    sessionStorage.removeItem("isLoggedIn");
    showLoginPage();
  });

  function showMainPage() {

    loginPage.classList.add("hidden");
    mainPage.classList.remove("hidden");

    setTimeout(() => {
      if (typeof window.initMainPage === "function") {
        window.initMainPage();
      } else {
        console.error("window.initMainPage() not found.");
      }
    }, 0);

  }

  function showLoginPage() {

    mainPage.classList.add("hidden");
    loginPage.classList.remove("hidden");

    usernameInput.value = "";
    passwordInput.value = "";

    errorMessage.classList.add("hidden");

    usernameInput.focus();

  }

});