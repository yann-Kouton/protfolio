// Fonction serverless Vercel : sert une page HTML avec les balises Open Graph
// (og:image, og:title, og:description) correspondant à l'article demandé,
// pour que les aperçus de partage (Facebook, WhatsApp, X, LinkedIn, Discord…)
// affichent la bonne image de couverture. Les robots de ces plateformes ne
// lisent que le HTML brut, jamais le JavaScript de la SPA — d'où cette
// page générée côté serveur, uniquement pour eux (voir vercel.json).

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function fetchPost(slug) {
  const projectId = process.env.VITE_FIREBASE_PROJECT_ID;
  const apiKey = process.env.VITE_FIREBASE_API_KEY;
  if (!projectId || !apiKey) return null;

  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: "posts" }],
          where: {
            compositeFilter: {
              op: "AND",
              filters: [
                { fieldFilter: { field: { fieldPath: "slug" }, op: "EQUAL", value: { stringValue: slug } } },
                { fieldFilter: { field: { fieldPath: "published" }, op: "EQUAL", value: { booleanValue: true } } },
              ],
            },
          },
          limit: 1,
        },
      }),
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  const doc = data?.[0]?.document;
  if (!doc) return null;

  const f = doc.fields || {};
  return {
    title: f.title?.stringValue || "",
    description: f.description?.stringValue || "",
    coverImageUrl: f.coverImageUrl?.stringValue || "",
  };
}

export default async function handler(req, res) {
  const { slug } = req.query;
  const siteUrl = `https://${req.headers.host}`;
  const pageUrl = `${siteUrl}/blog/${slug}`;

  const post = await fetchPost(slug).catch(() => null);

  const title = post?.title || "Blog";
  const description = post?.description || "";
  const image = post?.coverImageUrl || "";

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<title>${escapeHtml(title)}</title>
<meta property="og:type" content="article" />
<meta property="og:title" content="${escapeHtml(title)}" />
<meta property="og:description" content="${escapeHtml(description)}" />
<meta property="og:url" content="${pageUrl}" />
${image ? `<meta property="og:image" content="${escapeHtml(image)}" />\n<meta property="og:image:secure_url" content="${escapeHtml(image)}" />` : ""}
<meta name="twitter:card" content="${image ? "summary_large_image" : "summary"}" />
<meta name="twitter:title" content="${escapeHtml(title)}" />
<meta name="twitter:description" content="${escapeHtml(description)}" />
${image ? `<meta name="twitter:image" content="${escapeHtml(image)}" />` : ""}
<meta http-equiv="refresh" content="0; url=${pageUrl}" />
</head>
<body>
<p><a href="${pageUrl}">${escapeHtml(title)}</a></p>
</body>
</html>`);
}
