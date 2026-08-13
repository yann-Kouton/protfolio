/**
 * Transforme les URLs présentes dans un texte brut en liens cliquables.
 * Utilisé pour les champs "description" (texte simple, pas du markdown).
 *
 * @param {string} text
 * @returns {(string|JSX.Element)[]}
 */
import React from "react";

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function linkify(text) {
  if (!text) return text;

  const parts = text.split(URL_REGEX);

  return parts.map((part, i) => {
    if (!URL_REGEX.test(part)) return part;
    URL_REGEX.lastIndex = 0;

    // Ne pas inclure la ponctuation de fin de phrase dans le lien
    const trailingMatch = part.match(/[.,;:!?)\]]+$/);
    const trailing = trailingMatch ? trailingMatch[0] : "";
    const url = trailing ? part.slice(0, -trailing.length) : part;

    return (
      <React.Fragment key={i}>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 hover:text-gold-soft"
        >
          {url}
        </a>
        {trailing}
      </React.Fragment>
    );
  });
}
