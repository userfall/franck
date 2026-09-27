import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyASG1nGRhp60l_TSg3H5lmb3GiywBKV_y8",
  authDomain: "franckefootball-admin.firebaseapp.com",
  databaseURL: "https://franckefootball-admin-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "franckefootball-admin",
  storageBucket: "franckefootball-admin.firebasestorage.app",
  messagingSenderId: "833031917918",
  appId: "1:833031917918:web:25926fff43bc1f976e3fcf",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDatabase = getDatabase(firebaseApp);
export const firebaseAuthReady = new Promise((resolve) => {
  const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
    unsubscribe();
    resolve(user);
  });
});
