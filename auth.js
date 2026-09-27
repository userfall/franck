import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { firebaseAuth } from "./firebase-config.js";

const loginForm = document.getElementById("authForm");
const authMessage = document.getElementById("authMessage");
const adminLogoutButton = document.getElementById("adminLogoutButton");
const adminUserEmail = document.getElementById("adminUserEmail");
const isAdminPage = document.body.dataset.page === "admin";
const isLoginPage = document.body.dataset.page === "login";

function setAuthMessage(message, type = "info") {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.className = `auth-message is-${type}`;
}

onAuthStateChanged(firebaseAuth, (user) => {
  if (isAdminPage && !user) {
    window.location.replace("login.html");
    return;
  }

  if (isLoginPage && user) {
    window.location.replace("admin.html");
    return;
  }

  if (adminUserEmail && user) {
    adminUserEmail.textContent = user.email || "Administrateur";
  }
});

adminLogoutButton?.addEventListener("click", async () => {
  try {
    await signOut(firebaseAuth);
    window.location.replace("index.html");
  } catch {
    setAuthMessage("Impossible de fermer la session.", "error");
  }
});

loginForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const submitButton = loginForm.querySelector('button[type="submit"]');

  if (!email || !password) {
    setAuthMessage("Renseigne ton e-mail et ton mot de passe.", "error");
    return;
  }

  submitButton.disabled = true;
  setAuthMessage("Connexion en cours…", "info");

  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
    setAuthMessage("Connexion réussie. Ouverture du tableau de bord…", "success");
  } catch (error) {
    const message = ["auth/invalid-credential", "auth/invalid-login-credentials"].includes(error?.code)
      ? "E-mail ou mot de passe incorrect."
      : "Connexion impossible. Vérifie la configuration Firebase et réessaie.";
    setAuthMessage(message, "error");
    submitButton.disabled = false;
  }
});
