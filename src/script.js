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

    // Hide page scrolling while login screen is visible
    document.body.style.overflow = "hidden";

    // Check required elements
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
            logoutBtn
        });
        return;
    }

    // If user already logged in
    if (sessionStorage.getItem("isLoggedIn") === "true") {
        showMainPage();
    } else {
        showLoginPage();
    }

    // Login
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

    // Logout
    logoutBtn.addEventListener("click", function () {
        sessionStorage.removeItem("isLoggedIn");
        showLoginPage();
    });

    // ----------------------------
    // Show Main Page
    // ----------------------------
    function showMainPage() {

        loginPage.classList.add("hidden");
        mainPage.classList.remove("hidden");

        // Allow scrolling after login
        document.body.style.overflow = "auto";

        if (typeof window.initMainPage === "function") {
            window.initMainPage();
        }
    }

    // ----------------------------
    // Show Login Page
    // ----------------------------
    function showLoginPage() {

        mainPage.classList.add("hidden");
        loginPage.classList.remove("hidden");

        // Prevent scrolling while on login page
        document.body.style.overflow = "hidden";

        usernameInput.value = "";
        passwordInput.value = "";

        errorMessage.classList.add("hidden");

        usernameInput.focus();
    }

});
