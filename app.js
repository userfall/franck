const WHATSAPP_NUMBER = "22879420932";
const STORAGE_KEY = "franckefootball_store_v1";
const ORDER_KEY = "franckefootball_orders_v1";
const REVIEW_KEY = "franckefootball_reviews_v1";
const ANNOUNCEMENT_KEY = "franckefootball_announcements_v1";
const LANG_KEY = "franckefootball_lang_v1";

function createId(prefix) {
  if (globalThis.crypto?.randomUUID) {
    return `${prefix}-${globalThis.crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function writeStorageJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function writeStorageValue(key, value) {
  try {
    localStorage.setItem(key, String(value));
    return true;
  } catch {
    return false;
  }
}

function readStorageValue(key, fallback = "") {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeWhatsAppNumber(value) {
  return String(value || "")
    .replace(/\D+/g, "")
    .replace(/^228/, "228")
    .slice(0, 12);
}

function readStorageJson(key, fallback) {
  try {
    const rawValue = localStorage.getItem(key);
    if (!rawValue) return fallback;
    const parsed = JSON.parse(rawValue);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function normalizeLanguage(value) {
  return value === "en" ? "en" : "fr";
}

const defaultState = {
  products: [
    {
      id: "prod-elite-01",
      type: "account",
      badge: "Hot deal",
      price: "25 000 FCFA",
      name: "Compte eFootball Elite",
      descriptionFr:
        "Compte premium avec progression avancée, idéal pour une reprise rapide et une expérience de jeu solide.",
      descriptionEn:
        "Premium account with advanced progress, ideal for a fast start and a strong gameplay experience.",
      details: [
        { labelFr: "Plateforme", labelEn: "Platform", value: "PS / Xbox / Mobile" },
        { labelFr: "Niveau", labelEn: "Level", value: "Elite" },
        { labelFr: "Disponibilité", labelEn: "Availability", value: "Immédiate" },
      ],
      images: ["hero.jpg", "fond_graphique1.jpg", "fond_graphique2.jpeg"],
    },
    {
      id: "prod-coins-01",
      type: "coins",
      badge: "Best value",
      price: "10 000 FCFA",
      name: "Pièces eFootball",
      descriptionFr:
        "Pack de pièces eFootball pour accélérer vos achats et améliorer rapidement votre équipe.",
      descriptionEn:
        "eFootball coins pack to speed up your purchases and improve your squad quickly.",
      details: [
        { labelFr: "Format", labelEn: "Format", value: "Pack numérique" },
        { labelFr: "Livraison", labelEn: "Delivery", value: "Rapide" },
        { labelFr: "Support", labelEn: "Support", value: "WhatsApp" },
      ],
      images: ["paks.webp", "fond_graphique1.jpg", "fond_graphique2.jpeg"],
    },
  ],
};

const defaultReviews = [
  {
    id: "review-1",
    name: "Mickael",
    rating: 5,
    message: "Interface propre, rapide et très rassurante avant achat.",
    createdAt: "2026-08-01T10:00:00.000Z",
  },
  {
    id: "review-2",
    name: "Amina",
    rating: 5,
    message: "Le bouton WhatsApp va droit au but, c'est exactement ce qu'il faut.",
    createdAt: "2026-08-02T14:30:00.000Z",
  },
  {
    id: "review-3",
    name: "Junior",
    rating: 4,
    message: "Le design est premium et les produits ressortent bien sur mobile.",
    createdAt: "2026-08-03T09:15:00.000Z",
  },
];

const defaultAnnouncements = [
  {
    id: "announcement-1",
    title: "Promo comptes premium",
    text: "Jusqu'à -20% sur les comptes premium pour une reprise rapide et une meilleure progression.",
    image: "hero.jpg",
    status: "active",
    priority: "high",
    createdAt: new Date().toISOString(),
  },
  {
    id: "announcement-2",
    title: "Pack pièces offert",
    text: "Offre spéciale sur les packs de pièces pour booster votre équipe avant la prochaine saison.",
    image: "paks.webp",
    status: "pending",
    priority: "medium",
    createdAt: new Date().toISOString(),
  },
  {
    id: "announcement-3",
    title: "Livraison express",
    text: "Service rapide sur les commandes de comptes et accessoires avec support direct sur WhatsApp.",
    image: "fond_graphique1.jpg",
    status: "rejected",
    priority: "low",
    createdAt: new Date().toISOString(),
  },
];

const translations = {
  fr: {
    nav_products: "Produits",
    nav_admin: "Admin",
    nav_reviews: "Avis",
    nav_contact: "Contact",
    hero_eyebrow: "Boutique eFootball orientée conversion",
    hero_title: "Rapide, claire et crédible pour vendre plus de comptes et de pièces eFootball.",
    hero_text:
      "Une expérience bilingue français/anglais, mobile-first, avec avis visibles, achat simplifié et confiance immédiate.",
    hero_shop: "Voir les produits",
    hero_whatsapp: "Contacter sur WhatsApp",
    proof_1: "Temps de chargement rapide",
    proof_2: "Avis clients visibles",
    proof_3: "Paiement en une page",
    proof_4: "Sans création de compte",
    stat_speed: "Chargement visé",
    stat_rating: "Preuve sociale",
    stat_checkout: "Parcours simplifié",
    hero_chip: "Nouvelle plateforme",
    hero_panel_title: "Franckefootball.com",
    hero_panel_text:
      "Une vitrine pensée pour convertir rapidement, rassurer les visiteurs et garder l'achat très simple.",
    hero_mini_1: "Produit clair",
    hero_mini_2: "WhatsApp direct",
    products_kicker: "Catalogue",
    products_title: "Produits en vedette",
    products_text:
      "Chaque fiche peut afficher plusieurs photos, la description complète, le prix, les infos importantes et le bouton Acheter.",
    showcase_kicker: "Preuves",
    showcase_title: "Les preuves qui rassurent avant l'achat",
    showcase_text:
      "On met en avant la vitesse, les avis, la sécurité et la simplicité du paiement pour inspirer confiance immédiatement.",
    showcase_1_title: "Page d'accueil forte",
    showcase_1_text: "Un message immédiat et un produit phare pour capter l'attention.",
    showcase_2_title: "Avis visibles",
    showcase_2_text: "Les témoignages servent de preuve sociale tout au long du parcours.",
    showcase_3_title: "Sécurité et garanties",
    showcase_3_text: "Des repères simples pour inspirer confiance avant la prise de contact.",
    design_kicker: "Parcours",
    design_title: "Peu de catégories, un achat simple",
    design_1: "Une page d'accueil forte avec un produit phare bien mis en avant.",
    design_2: "Des fiches claires avec photos, infos importantes et avis visibles.",
    design_3: "Un checkout rapide, sans compte obligatoire et sans détour inutile.",
    trust_kicker: "Confiance",
    trust_title: "Les repères qui augmentent la conversion",
    trust_1: "Badges de confiance, sécurité et garanties visibles.",
    trust_2: "Preuves sociales partout: notes, photos clients et ventes.",
    trust_3: "Parcours d'achat en une seule page, rapide sur mobile.",
    reviews_kicker: "Avis clients",
    reviews_title: "Commentaires et témoignages",
    reviews_text: "Une zone d'avis propre et simple pour rassurer les visiteurs avant l'achat.",
    reviews_form_kicker: "Laisser un avis",
    reviews_form_title: "Votre retour aide les prochains clients",
    review_name: "Nom",
    review_rating: "Note",
    review_text_label: "Commentaire",
    review_submit: "Publier",
    review_saved: "Merci, votre avis a été publié.",
    review_storage_error: "Avis affiché temporairement: le stockage local est indisponible.",
    contact_kicker: "Contact",
    contact_title: "Toujours joignable sur WhatsApp",
    contact_text:
      "Le bouton ouvre directement une conversation vers le numéro indiqué pour accélérer la vente.",
    order_kicker: "Commande",
    type_account: "Compte",
    type_coins: "Pièces",
    buy: "Acheter",
    whatsapp: "Contacter le vendeur sur WhatsApp",
    order_title: "Demande d'achat",
    order_text: "Remplis le formulaire pour envoyer une demande liée à ce produit, sans création de compte.",
    order_name: "Votre nom",
    order_email: "E-mail",
    order_whatsapp: "Numéro WhatsApp",
    order_note: "Message",
    order_note_placeholder: "Précisez votre besoin ou votre plateforme.",
    order_submit: "Envoyer la demande",
    cancel: "Annuler",
    admin_view_site: "Voir sur le site",
    admin_kicker: "Admin",
    admin_title: "Gestion des produits et commandes",
    admin_intro: "Espace séparé pour ajouter des produits, modifier les prix, gérer les images et suivre les commandes.",
    admin_products: "Produits",
    admin_orders: "Commandes",
    admin_status: "État",
    form_add_title: "Ajouter un produit",
    product_photos: "Photos du produit",
    details_preview: "Aperçu des détails",
    announcements_title: "Annonces",
    announcement_add_title: "Publier une annonce",
    announcement_title_label: "Titre",
    announcement_text_label: "Texte",
    announcement_image_label: "Image de couverture",
    choose_image: "Choisir une image",
    no_image: "Aucune image sélectionnée",
    announcement_status_label: "Statut",
    announcement_priority_label: "Priorité",
    announcement_publish: "Publier l’annonce",
    orders_all: "Toutes",
    orders_pending: "En attente",
    orders_approved: "Validées",
    admin_tip_title: "Conseil",
    admin_tip_1: "Les photos sont choisies depuis ton appareil, sans URL à copier.",
    admin_tip_2: "Les données restent locales tant que tu n’ajoutes pas un backend serveur.",
    admin_tip_3: "Tu peux publier, modifier et supprimer librement les produits et annonces.",
    form_name: "Nom du produit",
    form_type: "Type",
    form_price: "Prix",
    form_badge: "Badge",
    form_description: "Description FR",
    form_details: "Infos importantes",
    form_save: "Enregistrer",
    form_reset: "Réinitialiser",
    products_admin_title: "Produits enregistrés",
    orders_title: "Commandes",
    status_active: "Actif",
    status_empty: "Vide",
    logout: "Déconnexion",
    new_product: "Nouveau produit",
    choose_photos: "Choisir les photos",
    upload_limit: "Jusqu’à 4 images, optimisées automatiquement",
    upload_ready_one: "photo prête à publier",
    upload_ready_many: "photos prêtes à publier",
    announcement_active: "Active",
    announcement_pending: "En attente",
    announcement_rejected: "Refusée",
    priority_high: "Haute",
    priority_medium: "Moyenne",
    priority_low: "Faible",
    empty_products: "Aucun produit pour le moment.",
    empty_orders: "Aucune commande pour le moment.",
    edit: "Modifier",
    remove: "Supprimer",
  },
  en: {
    nav_products: "Products",
    nav_admin: "Admin",
    nav_reviews: "Reviews",
    nav_contact: "Contact",
    hero_eyebrow: "Conversion-focused eFootball store",
    hero_title: "Fast, clear, and credible to sell more eFootball accounts and coins.",
    hero_text:
      "A bilingual French/English experience, mobile-first, with visible reviews, simplified buying, and immediate trust.",
    hero_shop: "View products",
    hero_whatsapp: "Contact on WhatsApp",
    proof_1: "Fast loading time",
    proof_2: "Visible customer reviews",
    proof_3: "One-page payment",
    proof_4: "No account creation",
    stat_speed: "Target speed",
    stat_rating: "Social proof",
    stat_checkout: "Simple checkout",
    hero_chip: "New platform",
    hero_panel_title: "Franckefootball.com",
    hero_panel_text:
      "A storefront designed to convert quickly, reassure visitors, and keep buying very simple.",
    hero_mini_1: "Clear product",
    hero_mini_2: "Direct WhatsApp",
    products_kicker: "Catalog",
    products_title: "Featured products",
    products_text:
      "Each card can show multiple photos, the full description, the price, key details, and the Buy button.",
    showcase_kicker: "Proof",
    showcase_title: "The trust signals buyers need",
    showcase_text:
      "We highlight speed, reviews, security, and a simple payment flow to build trust instantly.",
    showcase_1_title: "Strong homepage",
    showcase_1_text: "A clear message and a hero product to grab attention.",
    showcase_2_title: "Visible reviews",
    showcase_2_text: "Testimonials work as social proof throughout the journey.",
    showcase_3_title: "Security and guarantees",
    showcase_3_text: "Simple cues that build trust before contact.",
    design_kicker: "Journey",
    design_title: "Few categories, simple buying",
    design_1: "A strong homepage with one featured product in focus.",
    design_2: "Clear cards with photos, key information, and visible reviews.",
    design_3: "A fast checkout without mandatory account creation or dead ends.",
    trust_kicker: "Trust",
    trust_title: "Signals that increase conversion",
    trust_1: "Trust badges, security, and guarantees are visible.",
    trust_2: "Social proof everywhere: ratings, customer photos, and sales.",
    trust_3: "A one-page purchase flow optimized for mobile.",
    reviews_kicker: "Customer reviews",
    reviews_title: "Comments and testimonials",
    reviews_text: "A clean and simple review area to reassure visitors before purchase.",
    reviews_form_kicker: "Leave a review",
    reviews_form_title: "Your feedback helps future buyers",
    review_name: "Name",
    review_rating: "Rating",
    review_text_label: "Comment",
    review_submit: "Publish",
    review_saved: "Thanks, your review has been published.",
    review_storage_error: "Review shown temporarily: local storage is unavailable.",
    contact_kicker: "Contact",
    contact_title: "Always reachable on WhatsApp",
    contact_text:
      "The button opens a direct conversation to the given number to speed up the sale.",
    order_kicker: "Purchase",
    type_account: "Account",
    type_coins: "Coins",
    buy: "Buy",
    whatsapp: "Contact the seller on WhatsApp",
    order_title: "Purchase request",
    order_text: "Fill in the form to send a request linked to this product, with no account creation required.",
    order_name: "Your name",
    order_email: "Email",
    order_whatsapp: "WhatsApp number",
    order_note: "Message",
    order_note_placeholder: "Tell us what you need or which platform you use.",
    order_submit: "Send request",
    cancel: "Cancel",
    admin_view_site: "View site",
    admin_kicker: "Admin",
    admin_title: "Product and order management",
    admin_intro: "A separate space to add products, edit prices, manage images, and track orders.",
    admin_products: "Products",
    admin_orders: "Orders",
    admin_status: "Status",
    form_add_title: "Add a product",
    product_photos: "Product photos",
    details_preview: "Details preview",
    announcements_title: "Announcements",
    announcement_add_title: "Publish an announcement",
    announcement_title_label: "Title",
    announcement_text_label: "Text",
    announcement_image_label: "Cover image",
    choose_image: "Choose an image",
    no_image: "No image selected",
    announcement_status_label: "Status",
    announcement_priority_label: "Priority",
    announcement_publish: "Publish announcement",
    orders_all: "All",
    orders_pending: "Pending",
    orders_approved: "Approved",
    admin_tip_title: "Tip",
    admin_tip_1: "Choose photos from your device without copying an URL.",
    admin_tip_2: "Data stays local until you connect a server backend.",
    admin_tip_3: "Publish, edit, and remove products and announcements freely.",
    form_name: "Product name",
    form_type: "Type",
    form_price: "Price",
    form_badge: "Badge",
    form_description: "French description",
    form_details: "Key details",
    form_save: "Save",
    form_reset: "Reset",
    products_admin_title: "Saved products",
    orders_title: "Orders",
    status_active: "Active",
    status_empty: "Empty",
    logout: "Log out",
    new_product: "New product",
    choose_photos: "Choose photos",
    upload_limit: "Up to 4 images, optimized automatically",
    upload_ready_one: "photo ready to publish",
    upload_ready_many: "photos ready to publish",
    announcement_active: "Active",
    announcement_pending: "Pending",
    announcement_rejected: "Rejected",
    priority_high: "High",
    priority_medium: "Medium",
    priority_low: "Low",
    empty_products: "No products yet.",
    empty_orders: "No orders yet.",
    edit: "Edit",
    remove: "Delete",
  },
};

function normalizeDetails(details) {
  if (!Array.isArray(details)) return [];
  return details
    .filter((detail) => detail && typeof detail === "object")
    .map((detail, index) => ({
      labelFr: String(detail.labelFr || detail.labelEn || `Info ${index + 1}`),
      labelEn: String(detail.labelEn || detail.labelFr || `Info ${index + 1}`),
      value: String(detail.value || "").trim(),
    }))
    .filter((detail) => detail.value);
}

function normalizeProduct(product, index) {
  const type = product?.type === "coins" ? "coins" : "account";
  const images = Array.isArray(product?.images)
    ? [...new Set(product.images.map((image) => String(image || "").trim()).filter(Boolean))].slice(0, 4)
    : [];

  return {
    id: String(product?.id || `prod-imported-${index + 1}`),
    type,
    badge: String(product?.badge || "").trim(),
    price: String(product?.price || "").trim(),
    name: String(product?.name || `Produit ${index + 1}`).trim(),
    descriptionFr: String(product?.descriptionFr || "").trim(),
    descriptionEn: String(product?.descriptionEn || product?.descriptionFr || "").trim(),
    details: normalizeDetails(product?.details),
    images,
  };
}

function normalizeState(state) {
  const products = Array.isArray(state?.products) ? state.products.map(normalizeProduct) : [];
  return { products };
}

const appState = loadState();
let currentLanguage = normalizeLanguage(readStorageValue(LANG_KEY, "fr"));
let editingProductId = null;

const productGrid = document.getElementById("productGrid");
const adminProductsList = document.getElementById("adminProductsList");
const reviewList = document.getElementById("reviewList");
const reviewForm = document.getElementById("reviewForm");
const productTemplate = document.getElementById("productTemplate");
const langToggle = document.getElementById("langToggle");
const adminLogoutButton = document.getElementById("adminLogoutButton");
const productForm = document.getElementById("productForm");
const productFormTitle = document.getElementById("productFormTitle");
const adminFormMessage = document.getElementById("adminFormMessage");
const newProductButton = document.getElementById("newProductButton");
const cancelEditProductButton = document.getElementById("cancelEditProduct");
const adminProductCount = document.getElementById("adminProductCount");
const adminOrderCount = document.getElementById("adminOrderCount");
const adminStatusText = document.getElementById("adminStatusText");
const imagePreviewList = document.getElementById("imagePreviewList");
const detailPreviewList = document.getElementById("detailPreviewList");
const productImageInput = document.getElementById("productImageInput");
const productImageButton = document.getElementById("productImageButton");
const productImageCount = document.getElementById("productImageCount");
const announcementImageInput = document.getElementById("announcementImageInput");
const announcementImageButton = document.getElementById("announcementImageButton");
const announcementImageName = document.getElementById("announcementImageName");
const ordersList = document.getElementById("ordersList");
const announcementList = document.getElementById("announcementList");
const announcementPublicList = document.getElementById("announcementPublicList");
const announcementMessage = document.getElementById("announcementMessage");
const publishAnnouncementButton = document.getElementById("publishAnnouncementButton");
const announcementPreview = document.getElementById("announcementPreview");
const resetStoreButton = document.getElementById("resetStore");
const orderFilterBar = document.getElementById("orderFilterBar");
const purchaseDialog = document.getElementById("purchaseDialog");
const purchaseForm = document.getElementById("purchaseForm");
const purchaseProductId = document.getElementById("purchaseProductId");
const purchaseProductName = document.getElementById("purchaseProductName");
const purchaseFormMessage = document.getElementById("purchaseFormMessage");
const reviewFormMessage = document.getElementById("reviewFormMessage");
let activeOrderFilter = "all";
let selectedPurchaseProduct = null;

const waMessage = (text) => {
  const normalizedNumber = normalizeWhatsAppNumber(WHATSAPP_NUMBER);
  return `https://wa.me/${normalizedNumber}?text=${encodeURIComponent(text)}`;
};

function resolveAssetUrl(source) {
  try {
    return new URL(String(source || ""), window.location.href).href;
  } catch {
    return String(source || "");
  }
}

function getShareableAssetUrl(source) {
  const value = String(source || "");
  if (!value || value.startsWith("data:")) return "";
  return resolveAssetUrl(value);
}

function buildProductWhatsappUrl(product) {
  if (!product) return waMessage("Bonjour, je voudrais plus d'informations.");

  const productImage = Array.isArray(product.images) && product.images.length ? product.images[0] : "hero.jpg";
  const productImageUrl = getShareableAssetUrl(productImage);
  const priceText = product.price || "";
  const detailText = Array.isArray(product.details) && product.details.length
    ? product.details
        .slice(0, 3)
        .map((detail) => `${detail.labelFr}: ${detail.value}`)
        .join(" | ")
    : "";
  const message = currentLanguage === "en"
    ? `Hello, I want to buy "${product.name}"${priceText ? ` for ${priceText}` : ""}.${productImageUrl ? `\nPhoto: ${productImageUrl}` : ""}${detailText ? `\nDetails: ${detailText}` : ""}`
    : `Bonjour, je veux acheter "${product.name}"${priceText ? ` pour ${priceText}` : ""}.${productImageUrl ? `\nPhoto: ${productImageUrl}` : ""}${detailText ? `\nDétails: ${detailText}` : ""}`;

  return waMessage(message);
}

function loadState() {
  const parsed = readStorageJson(STORAGE_KEY, null);
  return parsed && Array.isArray(parsed.products)
    ? normalizeState(parsed)
    : normalizeState(structuredClone(defaultState));
}

function loadOrders() {
  const orders = readStorageJson(ORDER_KEY, []);
  return Array.isArray(orders) ? orders.filter((order) => order && typeof order === "object") : [];
}

function saveOrders(orders) {
  return writeStorageJson(ORDER_KEY, orders);
}

function loadReviews() {
  return loadReviewsFromStorage();
}

function loadAnnouncements() {
  const parsed = readStorageJson(ANNOUNCEMENT_KEY, null);
  return Array.isArray(parsed) && parsed.length ? parsed : structuredClone(defaultAnnouncements);
}

function saveAnnouncements(announcements) {
  return writeStorageJson(ANNOUNCEMENT_KEY, announcements);
}

function loadReviewsFromStorage() {
  const stored = readStorageJson(REVIEW_KEY, null);
  return Array.isArray(stored) && stored.length ? stored : structuredClone(defaultReviews);
}

function saveReviews(reviews) {
  return writeStorageJson(REVIEW_KEY, reviews);
}

function setAdminFormMessage(message, isSuccess = true) {
  if (!adminFormMessage) return;
  adminFormMessage.textContent = message;
  if (!message) {
    adminFormMessage.classList.remove("is-error", "is-success");
    return;
  }
  adminFormMessage.classList.toggle("is-success", isSuccess);
  adminFormMessage.classList.toggle("is-error", !isSuccess);
}

function updateAdminStats() {
  const productTotal = appState.products.length;
  const orderTotal = loadOrders().length;

  if (adminProductCount) {
    adminProductCount.textContent = String(productTotal);
  }

  if (adminOrderCount) {
    adminOrderCount.textContent = String(orderTotal);
  }

  if (adminStatusText) {
    adminStatusText.textContent = productTotal ? translate("status_active") : translate("status_empty");
  }
}

function parseDetailEntries(rawText) {
  return String(rawText || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const value = line.trim();
      const separatorIndex = value.indexOf(":");
      const labelPart = separatorIndex > 0 ? value.slice(0, separatorIndex) : "";
      const bodyPart = separatorIndex > 0 ? value.slice(separatorIndex + 1) : value;
      return {
        labelFr: labelPart.trim() || `Info ${index + 1}`,
        labelEn: labelPart.trim() || `Info ${index + 1}`,
        value: bodyPart.trim(),
      };
    })
    .filter((detail) => detail.value);
}

function getProductImageSources() {
  return String(productForm?.querySelector('textarea[name="images"]')?.value || "")
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function updateProductImageCount() {
  if (!productImageCount) return;
  const count = getProductImageSources().length;
  if (!count) {
    productImageCount.textContent = translate("upload_limit");
    return;
  }
  productImageCount.textContent = currentLanguage === "en"
    ? `${count} ${count === 1 ? translate("upload_ready_one") : translate("upload_ready_many")}`
    : `${count} photo${count > 1 ? "s" : ""} prête${count > 1 ? "s" : ""} à publier`;
}

function optimizeImageFile(file) {
  const maxDimension = 1280;
  const outputType = "image/webp";

  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("Impossible de préparer cette image."));
        return;
      }
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const optimized = canvas.toDataURL(outputType, 0.78);
      resolve(optimized.startsWith("data:image/webp") ? optimized : canvas.toDataURL("image/jpeg", 0.78));
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Le fichier sélectionné n’est pas une image lisible."));
    };

    image.src = objectUrl;
  });
}

async function addProductImages(files) {
  if (!productForm) return;

  const imagesField = productForm.querySelector('textarea[name="images"]');
  const currentImages = getProductImageSources();
  const availableSlots = Math.max(0, 4 - currentImages.length);

  if (!availableSlots) {
    setAdminFormMessage("Un produit peut contenir jusqu’à 4 photos.", false);
    return;
  }

  try {
    const selectedFiles = Array.from(files).slice(0, availableSlots);
    const optimizedImages = await Promise.all(selectedFiles.map(optimizeImageFile));
    imagesField.value = [...currentImages, ...optimizedImages].join("\n");
    setAdminFormMessage(`${optimizedImages.length} photo${optimizedImages.length > 1 ? "s" : ""} ajoutée${optimizedImages.length > 1 ? "s" : ""}.`, true);
    renderFormPreviews();
  } catch (error) {
    setAdminFormMessage(error.message || "Impossible de préparer cette image.", false);
  }
}

async function setAnnouncementImage(file) {
  const imageField = document.querySelector('input[name="announcementImage"]');
  if (!file || !imageField) return;

  try {
    imageField.value = await optimizeImageFile(file);
    if (announcementImageName) announcementImageName.textContent = file.name;
    renderAnnouncementPreview();
  } catch (error) {
    if (announcementMessage) {
      announcementMessage.textContent = error.message || "Impossible de préparer cette image.";
      announcementMessage.classList.add("is-error");
    }
  }
}

function renderFormPreviews() {
  if (!productForm) return;

  const rawImages = productForm.querySelector('textarea[name="images"]')?.value || "";
  const rawDetails = productForm.querySelector('textarea[name="details"]')?.value || "";

  const imageItems = rawImages
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 4);

  if (imagePreviewList) {
    imagePreviewList.innerHTML = imageItems.length
      ? imageItems
          .map(
            (source, index) => `
              <div class="admin-preview-item">
                <img src="${escapeAttr(source)}" alt="Aperçu image produit" loading="lazy" />
                <button type="button" class="admin-preview-remove" data-image-index="${index}" aria-label="Retirer cette photo">×</button>
              </div>
            `
          )
          .join("")
      : '<span class="admin-preview-detail">Aucune image</span>';

    imagePreviewList.querySelectorAll("button[data-image-index]").forEach((button) => {
      button.addEventListener("click", () => {
        const imageIndex = Number(button.dataset.imageIndex);
        const imagesField = productForm.querySelector('textarea[name="images"]');
        const nextImages = getProductImageSources().filter((_, index) => index !== imageIndex);
        imagesField.value = nextImages.join("\n");
        renderFormPreviews();
      });
    });
  }

  if (detailPreviewList) {
    const details = parseDetailEntries(rawDetails);
    detailPreviewList.innerHTML = details.length
      ? details
          .slice(0, 6)
          .map(
            (detail) => `
              <span class="admin-preview-detail">${escapeHtml(detail.labelFr)}: ${escapeHtml(detail.value)}</span>
            `
          )
          .join("")
      : '<span class="admin-preview-detail">Aucun détail</span>';
  }

  updateProductImageCount();
}

function resetProductForm(mode = "create") {
  if (!productForm) return;

  editingProductId = null;
  productForm.reset();

  if (productFormTitle) {
    productFormTitle.textContent = mode === "edit"
      ? (currentLanguage === "en" ? "Edit a product" : "Modifier un produit")
      : translate("form_add_title");
  }

  if (cancelEditProductButton) {
    cancelEditProductButton.hidden = mode === "create";
  }

  setAdminFormMessage("");
  renderFormPreviews();
}

function getAnnouncementStatusMeta(status) {
  const normalized = String(status || "active").toLowerCase();

  if (normalized === "pending") {
    return { label: currentLanguage === "en" ? "Pending" : "En attente", className: "status-pending-badge" };
  }

  if (normalized === "rejected") {
    return { label: currentLanguage === "en" ? "Rejected" : "Refusée", className: "status-rejected-badge" };
  }

  return { label: currentLanguage === "en" ? "Active" : "Active", className: "status-active-badge" };
}

function renderAnnouncementPreview() {
  if (!announcementPreview) return;

  const title = document.querySelector('input[name="announcementTitle"]')?.value?.trim() || "Titre de l’annonce";
  const text = document.querySelector('textarea[name="announcementText"]')?.value?.trim() || "Texte de l’annonce à afficher sur le site public.";
  const image = document.querySelector('input[name="announcementImage"]')?.value?.trim() || "hero.jpg";
  const status = document.querySelector('select[name="announcementStatus"]')?.value || "active";
  const statusMeta = getAnnouncementStatusMeta(status);

  announcementPreview.innerHTML = `
    <div class="announcement-preview-shell">
      <div class="announcement-preview-media">
        <img src="${escapeAttr(image)}" alt="${escapeAttr(title)}" loading="lazy" />
      </div>
      <div class="announcement-preview-copy">
        <span class="announcement-status-chip ${statusMeta.className}">${escapeHtml(statusMeta.label)}</span>
        <h4>${escapeHtml(title)}</h4>
        <p>${escapeHtml(text)}</p>
      </div>
    </div>
  `;
}

function renderAnnouncementsAdmin() {
  if (!announcementList) return;

  const announcements = loadAnnouncements();
  if (!announcements.length) {
    announcementList.innerHTML = '<div class="announcement-admin-item"><small>Aucune annonce.</small></div>';
    return;
  }

  announcementList.innerHTML = announcements
    .map((announcement) => {
      const statusMeta = getAnnouncementStatusMeta(announcement.status);
      return `
        <div class="announcement-admin-item">
          <div class="announcement-admin-head">
            <strong>${escapeHtml(announcement.title)}</strong>
            <span class="announcement-status-chip ${statusMeta.className}">${escapeHtml(statusMeta.label)}</span>
          </div>
          <small>${escapeHtml(announcement.text)}</small>
          <div class="announcement-admin-actions">
            <button type="button" data-announcement-action="active" data-announcement-id="${announcement.id}">${currentLanguage === "en" ? "Active" : "Active"}</button>
            <button type="button" data-announcement-action="pending" data-announcement-id="${announcement.id}">${currentLanguage === "en" ? "Pending" : "En attente"}</button>
            <button type="button" data-announcement-action="rejected" data-announcement-id="${announcement.id}">${currentLanguage === "en" ? "Rejected" : "Refusée"}</button>
          </div>
        </div>
      `;
    })
    .join("");

  announcementList.querySelectorAll("button[data-announcement-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-announcement-id");
      const action = button.getAttribute("data-announcement-action");
      const announcements = loadAnnouncements();
      const next = announcements.map((entry) => (entry.id === id ? { ...entry, status: action } : entry));
      saveAnnouncements(next);
      renderAnnouncementsAdmin();
      renderAnnouncementsPublic();
    });
  });
}

function renderAnnouncementsPublic() {
  if (!announcementPublicList) return;

  const announcements = loadAnnouncements().filter((announcement) => announcement.status === "active");

  if (!announcements.length) {
    announcementPublicList.innerHTML = '<div class="announcement-admin-item"><small>Aucune annonce active.</small></div>';
    return;
  }

  announcementPublicList.innerHTML = announcements
    .slice(0, 3)
    .map((announcement) => {
      const statusMeta = getAnnouncementStatusMeta(announcement.status);
      return `
        <article class="announcement-public-item">
          <img src="${escapeAttr(announcement.image || "hero.jpg")}" alt="${escapeAttr(announcement.title)}" loading="lazy" />
          <div class="announcement-public-copy">
            <span class="announcement-badge ${statusMeta.className}">${escapeHtml(statusMeta.label)}</span>
            <h3>${escapeHtml(announcement.title)}</h3>
            <p>${escapeHtml(announcement.text)}</p>
          </div>
        </article>
      `;
    })
    .join("");
}

function saveState() {
  return writeStorageJson(STORAGE_KEY, normalizeState(appState));
}

function applyLanguage(language) {
  currentLanguage = normalizeLanguage(language);
  writeStorageValue(LANG_KEY, currentLanguage);
  document.documentElement.lang = currentLanguage;
  if (langToggle) langToggle.checked = currentLanguage === "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = translations[currentLanguage][key] || element.textContent;
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[currentLanguage][key]) element.placeholder = translations[currentLanguage][key];
  });

  renderProducts();
  renderReviews();
  renderAdminProducts();
  renderOrders();
  renderAnnouncementsAdmin();
  renderAnnouncementsPublic();
  syncStaticLinks();
}

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function syncStaticLinks() {
  const whatsappText =
    currentLanguage === "en"
      ? "Hello, I would like more information about your eFootball products."
      : "Bonjour, je souhaite avoir plus d'informations sur vos produits eFootball.";
  const url = waMessage(whatsappText);

  ["whatsappHeader", "heroWhatsapp", "contactWhatsapp"].forEach((id) => {
    const link = document.getElementById(id);
    if (link) link.href = url;
  });
}

function renderProducts() {
  if (!productGrid || !productTemplate) return;

  productGrid.innerHTML = "";

  appState.products.forEach((product) => {
    const node = productTemplate.content.cloneNode(true);
    const gallery = node.querySelector(".product-gallery");
    const title = node.querySelector(".product-title");
    const price = node.querySelector(".product-price");
    const description = node.querySelector(".product-description");
    const details = node.querySelector(".product-details");
    const type = node.querySelector(".product-type");
    const badge = node.querySelector(".product-badge");
    const whatsappBtn = node.querySelector(".product-whatsapp");
    const buyBtn = node.querySelector(".product-buy");

    const uniqueImages = [...new Set((Array.isArray(product.images) ? product.images : []).filter(Boolean))].slice(0, 4);
    const detailsList = normalizeDetails(product.details);

    gallery.innerHTML = uniqueImages.length
      ? uniqueImages
          .map((source, index) => {
            const fileName = String(source).split(/[\\/]/).pop() || `Shot ${index + 1}`;
            return `
              <figure class="shot">
                <img src="${escapeAttr(source)}" alt="${escapeAttr(`${product.name} ${index + 1}`)}" loading="lazy" />
                <figcaption>${escapeHtml(fileName.replace(/\.[^.]+$/, ""))}</figcaption>
              </figure>`;
          })
          .join("")
      : `
        <figure class="shot">
          <img src="${escapeAttr(product.type === "coins" ? "paks.webp" : "hero.jpg")}" alt="${escapeAttr(product.name)}" loading="lazy" />
          <figcaption>${escapeHtml(product.name)}</figcaption>
        </figure>`;

    title.textContent = product.name;
    price.textContent = product.price;
    price.dataset.label = currentLanguage === "en" ? "From" : "À partir de";
    description.textContent = currentLanguage === "en" ? product.descriptionEn : product.descriptionFr;
    type.textContent = product.type === "coins" ? translate("type_coins") : translate("type_account");
    badge.textContent = product.badge || "";
    whatsappBtn.textContent = translate("whatsapp");
    const shareableImageUrl = getShareableAssetUrl(uniqueImages[0] || (product.type === "coins" ? "paks.webp" : "hero.jpg"));
    whatsappBtn.href = waMessage(
      currentLanguage === "en"
        ? `Hello, I am interested in "${product.name}".${shareableImageUrl ? ` Photo: ${shareableImageUrl}` : ""}`
        : `Bonjour, je suis intéressé par "${product.name}".${shareableImageUrl ? ` Photo: ${shareableImageUrl}` : ""}`
    );
    whatsappBtn.target = "_blank";
    whatsappBtn.rel = "noopener noreferrer";
    buyBtn.textContent = currentLanguage === "en" ? "Request this product" : "Demander ce produit";
    buyBtn.dataset.productId = product.id;

    details.innerHTML = detailsList
      .map(
        (detail) => `
          <div class="detail-line">
            <span>${escapeHtml(currentLanguage === "en" ? detail.labelEn : detail.labelFr)}</span>
            <span>${escapeHtml(detail.value)}</span>
          </div>`
      )
      .join("");

    if (!product.badge) {
      badge.style.display = "none";
    }

    node.querySelector(".product-whatsapp").setAttribute(
      "aria-label",
      `${translate("whatsapp")} ${product.name}`
    );

    productGrid.appendChild(node);
  });

  productGrid.querySelectorAll(".product-buy[data-product-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = appState.products.find((entry) => entry.id === button.dataset.productId);
      if (product) openPurchaseDialog(product);
    });
  });

  if (!appState.products.length) {
    productGrid.innerHTML = `<div class="panel"><p>${translate("empty_products")}</p></div>`;
  }
}

function renderReviews() {
  if (!reviewList) return;

  const reviews = loadReviews();
  reviewList.innerHTML = reviews
    .slice(0, 6)
    .map(
      (review) => `
        <article class="review-card panel glass">
          <div class="review-top">
            <strong>${escapeHtml(review.name)}</strong>
            <span class="review-stars" aria-label="${Math.max(1, Math.min(5, Number(review.rating) || 1))} stars">${"★".repeat(Math.max(1, Math.min(5, Number(review.rating) || 1)))}</span>
          </div>
          <p>${escapeHtml(review.message)}</p>
          <small>${escapeHtml(new Date(review.createdAt).toLocaleDateString(currentLanguage === "en" ? "en-US" : "fr-FR"))}</small>
        </article>
      `
    )
    .join("");
}

function setPurchaseMessage(message = "", isError = false) {
  if (!purchaseFormMessage) return;
  purchaseFormMessage.textContent = message;
  purchaseFormMessage.classList.toggle("is-error", isError);
  purchaseFormMessage.classList.toggle("is-success", Boolean(message) && !isError);
}

function setReviewMessage(message = "", isError = false) {
  if (!reviewFormMessage) return;
  reviewFormMessage.textContent = message;
  reviewFormMessage.classList.toggle("is-error", isError);
  reviewFormMessage.classList.toggle("is-success", Boolean(message) && !isError);
}

function openPurchaseDialog(product) {
  if (!purchaseDialog || !purchaseForm) return;
  selectedPurchaseProduct = product;
  purchaseForm.reset();
  setPurchaseMessage("");
  if (purchaseProductId) purchaseProductId.value = product.id;
  if (purchaseProductName) purchaseProductName.textContent = `${product.name}${product.price ? ` · ${product.price}` : ""}`;

  if (typeof purchaseDialog.showModal === "function") {
    purchaseDialog.showModal();
  } else {
    purchaseDialog.setAttribute("open", "");
    purchaseDialog.classList.add("is-open");
  }
  purchaseForm.querySelector('input[name="customerName"]')?.focus();
}

function closePurchaseDialog() {
  if (!purchaseDialog) return;
  if (typeof purchaseDialog.close === "function") purchaseDialog.close();
  purchaseDialog.classList.remove("is-open");
  selectedPurchaseProduct = null;
}

function renderAdminProducts() {
  if (!adminProductsList) return;

  if (!appState.products.length) {
    adminProductsList.innerHTML = `<div class="stack-item"><small>${translate("empty_products")}</small></div>`;
    return;
  }

  adminProductsList.innerHTML = appState.products
    .map(
      (product) => `
        <div class="stack-item">
          <strong><span>${escapeHtml(product.name)}</span><span>${escapeHtml(product.price)}</span></strong>
          <small>${escapeHtml(product.type === "coins" ? translate("type_coins") : translate("type_account"))}</small>
          <div class="admin-product-visuals">
            ${[...new Set((product.images || []).filter(Boolean))]
              .slice(0, 2)
              .map(
                (src) => `
                  <img src="${escapeAttr(src)}" alt="${escapeAttr(product.name)}" loading="lazy" />
                `
              )
              .join("") || '<span class="admin-preview-detail">Aucune image</span>'}
          </div>
          <small>${escapeHtml(normalizeDetails(product.details).slice(0, 2).map((detail) => `${detail.labelFr}: ${detail.value}`).join(" • "))}</small>
          <div class="stack-controls">
            <button type="button" data-product-action="edit" data-product-id="${product.id}">${translate("edit")}</button>
            <button type="button" data-product-action="remove" data-product-id="${product.id}">${translate("remove")}</button>
          </div>
        </div>
      `
    )
    .join("");

  updateAdminStats();

  adminProductsList.querySelectorAll("button[data-product-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button.getAttribute("data-product-id");
      const action = button.getAttribute("data-product-action");

      if (action === "remove") {
        if (!window.confirm(currentLanguage === "en" ? "Delete this product?" : "Supprimer ce produit ?")) return;
        appState.products = appState.products.filter((product) => product.id !== productId);
        await saveState();
        renderProducts();
        renderAdminProducts();
        return;
      }

      const product = appState.products.find((entry) => entry.id === productId);
      if (!product) return;

      editingProductId = product.id;
      productForm.name.value = product.name;
      productForm.type.value = product.type;
      productForm.price.value = product.price;
      productForm.badge.value = product.badge;
      productForm.descriptionFr.value = product.descriptionFr;
      productForm.descriptionEn.value = product.descriptionEn;
      productForm.images.value = product.images.join("\n");
      productForm.details.value = product.details.map((detail) => `${detail.labelFr}: ${detail.value}`).join("\n");
      if (productFormTitle) {
        productFormTitle.textContent = "Modifier un produit";
      }
      if (cancelEditProductButton) {
        cancelEditProductButton.hidden = false;
      }
      renderFormPreviews();
      setAdminFormMessage("Produit prêt à être modifié.", true);
      window.location.hash = "#dashboard";
      productForm.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function getOrderStatusMeta(status) {
  const normalized = String(status || "").toLowerCase();

  if (normalized.includes("valid") || normalized.includes("approved") || normalized.includes("done")) {
    return {
      label: currentLanguage === "en" ? "Approved" : "Validée",
      className: "status-approved",
    };
  }

  return {
    label: currentLanguage === "en" ? "Pending" : "En attente",
    className: "status-pending",
  };
}

function getFilteredOrders(orders) {
  if (activeOrderFilter === "pending") {
    return orders.filter((order) => !getOrderStatusMeta(order.status).className.includes("approved"));
  }

  if (activeOrderFilter === "approved") {
    return orders.filter((order) => getOrderStatusMeta(order.status).className.includes("approved"));
  }

  return orders;
}

function renderOrders() {
  if (!ordersList) return;

  const orders = getFilteredOrders(loadOrders());
  updateAdminStats();

  if (orderFilterBar) {
    orderFilterBar.querySelectorAll("[data-order-filter]").forEach((button) => {
      const matches = button.getAttribute("data-order-filter") === activeOrderFilter;
      button.classList.toggle("is-active", matches);
    });
  }

  if (!orders.length) {
    ordersList.innerHTML = `<div class="stack-item"><small>${translate("empty_orders")}</small></div>`;
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (order, index) => {
        const statusMeta = getOrderStatusMeta(order.status);
        return `
          <div class="stack-item">
            <strong>
              <span>#${index + 1} ${escapeHtml(order.productName)}</span>
              <span class="status-badge ${statusMeta.className}">${escapeHtml(statusMeta.label)}</span>
            </strong>
            <small>${escapeHtml(order.customerName)} · ${escapeHtml(order.customerEmail || order.customerPhone)}</small>
            <small>${escapeHtml(order.message)}</small>
            <div class="stack-controls">
              <button type="button" data-order-action="approve" data-order-id="${order.id}">${currentLanguage === "en" ? "Approve" : "Valider"}</button>
              <button type="button" data-order-action="pending" data-order-id="${order.id}">${currentLanguage === "en" ? "Pending" : "En attente"}</button>
              <button type="button" data-order-action="remove" data-order-id="${order.id}">${translate("remove")}</button>
            </div>
          </div>
        `;
      }
    )
    .join("");

  ordersList.querySelectorAll("button[data-order-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const orders = loadOrders();
      const orderId = button.getAttribute("data-order-id");
      const action = button.getAttribute("data-order-action");
      const updated = orders.filter(Boolean).map((order) => {
        if (order.id !== orderId) return order;
        if (action === "remove") return null;
        return { ...order, status: action === "approve" ? (currentLanguage === "en" ? "Approved" : "Validée") : (currentLanguage === "en" ? "Pending" : "En attente") };
      }).filter(Boolean);

      saveOrders(updated);
      renderOrders();
    });
  });
}

if (orderFilterBar) {
  orderFilterBar.querySelectorAll("[data-order-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      activeOrderFilter = button.getAttribute("data-order-filter") || "all";
      renderOrders();
    });
  });
}

if (productForm) {
  productForm.addEventListener("input", renderFormPreviews);
  productForm.addEventListener("change", renderFormPreviews);

  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(productForm);
    const product = {
      id: editingProductId || createId("prod"),
      type: String(formData.get("type") || "account"),
      badge: String(formData.get("badge") || "").trim(),
      price: String(formData.get("price") || "").trim(),
      name: String(formData.get("name") || "").trim(),
      descriptionFr: String(formData.get("descriptionFr") || "").trim(),
      descriptionEn: String(formData.get("descriptionEn") || formData.get("descriptionFr") || "").trim(),
      details: parseDetailEntries(String(formData.get("details") || "")),
      images: String(formData.get("images") || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };

    if (!product.images.length) {
      setAdminFormMessage("Choisis au moins une photo pour ce produit.", false);
      return;
    }

    const existingIndex = appState.products.findIndex((entry) => entry.id === product.id);
    if (existingIndex >= 0) {
      appState.products[existingIndex] = product;
    } else {
      appState.products.unshift(product);
    }

    editingProductId = null;
    const saved = saveState();
    renderProducts();
    renderAdminProducts();
    resetProductForm("create");
    setAdminFormMessage(
      saved
        ? (currentLanguage === "en" ? "Product saved successfully." : "Produit enregistré avec succès.")
        : (currentLanguage === "en" ? "Product shown temporarily: local storage is unavailable." : "Produit affiché temporairement: le stockage local est indisponible."),
      saved
    );
  });
}

if (productImageButton && productImageInput) {
  productImageButton.addEventListener("click", () => productImageInput.click());
  productImageInput.addEventListener("change", async () => {
    await addProductImages(productImageInput.files || []);
    productImageInput.value = "";
  });
}

if (announcementImageButton && announcementImageInput) {
  announcementImageButton.addEventListener("click", () => announcementImageInput.click());
  announcementImageInput.addEventListener("change", async () => {
    const [file] = Array.from(announcementImageInput.files || []);
    await setAnnouncementImage(file);
    announcementImageInput.value = "";
  });
}

if (reviewForm) {
  reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(reviewForm);
    const name = String(formData.get("name") || "").trim();
    const message = String(formData.get("message") || "").trim();
    if (!name || !message) return;
    const reviews = loadReviews();
    reviews.unshift({
      id: createId("review"),
      name,
      rating: Number(formData.get("rating")),
      message,
      createdAt: new Date().toISOString(),
    });
    const saved = saveReviews(reviews);
    reviewForm.reset();
    setReviewMessage(saved ? translate("review_saved") : translate("review_storage_error"), !saved);
    renderReviews();
  });
}

if (purchaseForm) {
  purchaseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!selectedPurchaseProduct) return;

    const formData = new FormData(purchaseForm);
    const customerName = String(formData.get("customerName") || "").trim();
    const customerPhone = String(formData.get("customerPhone") || "").trim();
    const customerEmail = String(formData.get("customerEmail") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!customerName || !customerPhone) {
      setPurchaseMessage(currentLanguage === "en" ? "Name and WhatsApp number are required." : "Le nom et le numéro WhatsApp sont obligatoires.", true);
      return;
    }

    const order = {
      id: createId("order"),
      productId: selectedPurchaseProduct.id,
      productName: selectedPurchaseProduct.name,
      customerName,
      customerPhone,
      customerEmail,
      message: message || (currentLanguage === "en" ? "Purchase request" : "Demande d’achat"),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const saved = saveOrders([order, ...loadOrders()]);
    const whatsappMessage = currentLanguage === "en"
      ? `Hello, I want to buy "${selectedPurchaseProduct.name}". My name is ${customerName}. WhatsApp: ${customerPhone}.${customerEmail ? ` Email: ${customerEmail}.` : ""}${message ? ` Message: ${message}` : ""}`
      : `Bonjour, je veux acheter "${selectedPurchaseProduct.name}". Je m'appelle ${customerName}. WhatsApp : ${customerPhone}.${customerEmail ? ` E-mail : ${customerEmail}.` : ""}${message ? ` Message : ${message}` : ""}`;

    renderOrders();
    updateAdminStats();
    setPurchaseMessage(
      saved
        ? (currentLanguage === "en" ? "Request saved. Opening WhatsApp…" : "Demande enregistrée. Ouverture de WhatsApp…")
        : (currentLanguage === "en" ? "Opening WhatsApp…" : "Ouverture de WhatsApp…")
    );
    window.open(waMessage(whatsappMessage), "_blank", "noopener,noreferrer");
    window.setTimeout(closePurchaseDialog, 250);
  });
}

document.querySelectorAll("[data-purchase-close]").forEach((button) => {
  button.addEventListener("click", closePurchaseDialog);
});

purchaseDialog?.addEventListener("click", (event) => {
  if (event.target === purchaseDialog) closePurchaseDialog();
});

if (publishAnnouncementButton) {
  publishAnnouncementButton.addEventListener("click", () => {
    const titleInput = document.querySelector('input[name="announcementTitle"]');
    const textInput = document.querySelector('textarea[name="announcementText"]');
    const imageInput = document.querySelector('input[name="announcementImage"]');
    const statusInput = document.querySelector('select[name="announcementStatus"]');
    const priorityInput = document.querySelector('select[name="announcementPriority"]');

    const title = titleInput?.value?.trim();
    const text = textInput?.value?.trim();
    const image = imageInput?.value?.trim() || "hero.jpg";
    const status = statusInput?.value || "active";
    const priority = priorityInput?.value || "medium";

    if (!title || !text) {
      if (announcementMessage) {
        announcementMessage.textContent = "Le titre et le texte de l’annonce sont obligatoires.";
        announcementMessage.classList.remove("is-success");
        announcementMessage.classList.add("is-error");
      }
      return;
    }

    const nextAnnouncements = [
      {
        id: createId("announcement"),
        title,
        text,
        image,
        status,
        priority,
        createdAt: new Date().toISOString(),
      },
      ...loadAnnouncements(),
    ];

    const saved = saveAnnouncements(nextAnnouncements);
    renderAnnouncementsAdmin();
    renderAnnouncementsPublic();
    renderAnnouncementPreview();

    if (announcementMessage) {
      announcementMessage.textContent = saved
        ? (currentLanguage === "en" ? "Announcement published successfully." : "Annonce publiée avec succès.")
        : (currentLanguage === "en" ? "Announcement shown temporarily: local storage is unavailable." : "Annonce affichée temporairement: le stockage local est indisponible.");
      announcementMessage.classList.remove("is-error");
      announcementMessage.classList.toggle("is-success", saved);
      announcementMessage.classList.toggle("is-error", !saved);
    }

    const form = document.querySelector('.announcement-form');
    if (form) {
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach((field) => {
        if (field.name === "announcementStatus") field.value = "active";
        if (field.name === "announcementPriority") field.value = "medium";
        if (field.name !== "announcementStatus" && field.name !== "announcementPriority") field.value = "";
      });
      if (announcementImageName) announcementImageName.textContent = "Aucune image sélectionnée";
      renderAnnouncementPreview();
    }
  });
}

if (document.querySelector('input[name="announcementTitle"]')) {
  document.querySelectorAll('input[name="announcementTitle"], textarea[name="announcementText"], input[name="announcementImage"], select[name="announcementStatus"], select[name="announcementPriority"]').forEach((field) => {
    field.addEventListener("input", renderAnnouncementPreview);
    field.addEventListener("change", renderAnnouncementPreview);
  });
  renderAnnouncementPreview();
}

if (resetStoreButton) {
  resetStoreButton.addEventListener("click", async () => {
    if (!window.confirm(currentLanguage === "en" ? "Reset all local store data?" : "Réinitialiser toutes les données locales de la boutique ?")) return;
    editingProductId = null;
    Object.assign(appState, normalizeState(structuredClone(defaultState)));
    saveAnnouncements(structuredClone(defaultAnnouncements));
    await saveState();
    await saveOrders([]);
    await saveReviews(structuredClone(defaultReviews));
    renderProducts();
    renderAdminProducts();
    renderOrders();
    renderReviews();
    renderAnnouncementsAdmin();
    renderAnnouncementsPublic();
    resetProductForm("create");
    setAdminFormMessage("La boutique a été réinitialisée.", true);
    if (productForm) productForm.reset();
  });
}

if (newProductButton) {
  newProductButton.addEventListener("click", () => {
    resetProductForm("create");
    productForm?.scrollIntoView({ behavior: "smooth", block: "start" });
    productForm?.querySelector('input[name="name"]')?.focus();
  });
}

if (cancelEditProductButton) {
  cancelEditProductButton.addEventListener("click", () => {
    resetProductForm("create");
  });
}

if (langToggle) {
  langToggle.addEventListener("change", () => {
    applyLanguage(langToggle.checked ? "en" : "fr");
  });
}

if (adminLogoutButton) {
  adminLogoutButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

applyLanguage(currentLanguage);
syncStaticLinks();
renderProducts();
renderAdminProducts();
renderOrders();
renderAnnouncementsAdmin();
renderAnnouncementsPublic();
updateAdminStats();
resetProductForm("create");
if (document.querySelector('input[name="announcementTitle"]')) {
  renderAnnouncementPreview();
}
saveState();
