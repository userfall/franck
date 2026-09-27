import { ADMIN_USERS } from "./auth-config.js";

const SESSION_KEY = "franckefootball_admin_session_v1";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const loginForm = document.getElementById("authForm");
const authMessage = document.getElementById("authMessage");
const adminLogoutButton = document.getElementById("adminLogoutButton");
const adminUserEmail = document.getElementById("adminUserEmail");

function setAuthMessage(message, type = "info") {
  if (!authMessage) return;
  authMessage.textContent = message;
  authMessage.className = `auth-message is-${type}`;
}

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    if (!session?.email || Date.now() - Number(session.createdAt) > SESSION_TTL_MS) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

function saveSession(email) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ email, createdAt: Date.now() }));
    return true;
  } catch {
    return false;
  }
}

function clearSession() {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {}
}

function findUser(email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  return ADMIN_USERS.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password
  );
}

function protectAdminPage() {
  if (document.body.dataset.page !== "admin") return;

  const session = readSession();
  if (!session) {
    window.location.replace("login.html");
    return;
  }

  if (adminUserEmail) adminUserEmail.textContent = session.email;

  adminLogoutButton?.addEventListener("click", async () => {
    clearSession();
    window.location.replace("index.html");
  });
}

function setupLoginPage() {
  if (!loginForm) return;

  if (readSession()) {
    window.location.replace("admin.html");
    return;
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");
    const submitButton = loginForm.querySelector('button[type="submit"]');

    if (!email || !password) {
      setAuthMessage("Renseigne ton e-mail et ton mot de passe.", "error");
      return;
    }

    if (!findUser(email, password)) {
      setAuthMessage("E-mail ou mot de passe incorrect.", "error");
      return;
    }

    if (!saveSession(email.toLowerCase())) {
      setAuthMessage("Impossible de créer la session dans ce navigateur.", "error");
      return;
    }

    submitButton.disabled = true;
    setAuthMessage("Connexion réussie. Ouverture du tableau de bord…", "info");
    window.location.replace("admin.html");
  });
}

setupLoginPage();
protectAdminPage();
