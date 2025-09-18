import type { Post } from "../../types";

export default function productTemplate({
  id,
  content = "Unknown Item",
  likes = 0,
  likedBy,
  timestamp,
  author,
}: Post) {
  const paramsString = `id=${id}&author=${author}`;
  const searchParams = new URLSearchParams(paramsString);
  const detailsUrl = `/post-details.html?${searchParams.toString()}`;

  return `
    <article class="c-product-preview-details animate__animated animate__fadeInUp animate__delay-${index}s" data-productId="${id}" data-component="productPreviewDetails">
      <div class="c-product-preview-info">
        <h1 class="c-product-preview-title">
          <a href=${detailsUrl}>${content}</a>
        </h1>

        <div class="c-product-preview-rating">
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9733;</span>
          <span>&#9734;</span>
          <span>(123 reviews)</span>
        </div>
      </div>
    </article>
 `;
}
