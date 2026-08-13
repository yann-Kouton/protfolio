const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Upload un fichier vers Cloudinary via un upload preset "non signé"
 * (aucune clé secrète n'est exposée côté client — voir README).
 *
 * @param {File} file
 * @param {"image" | "raw"} resourceType - "image" pour les photos/couvertures,
 *   "raw" pour les PDF et notebooks (.ipynb).
 * @param {string} folder - sous-dossier Cloudinary, ex: "blog/covers"
 */
export async function uploadToCloudinary(file, resourceType, folder) {
  if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error(
      "Cloudinary n'est pas configuré (VITE_CLOUDINARY_CLOUD_NAME / VITE_CLOUDINARY_UPLOAD_PRESET manquants)."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  if (folder) formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error?.message || "Échec de l'upload Cloudinary.");
  }

  const data = await res.json();
  return data.secure_url;
}
