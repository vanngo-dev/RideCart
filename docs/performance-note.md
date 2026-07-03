# Performance Notes

This phase reviews practical frontend production readiness for the RideCart commerce UI slice.

## Checked Areas

- Product images use local placeholder assets instead of broken remote or missing paths.
- Product image elements use `loading="lazy"` where appropriate.
- Product image elements use `decoding="async"` to reduce blocking image decode work.
- Product filtering is isolated in `useProductFilters` and uses computed values.
- Cart totals are computed in the Pinia cart store instead of duplicated across views.
- Production build is verified through Vite.
- TypeScript checks are run before build.
- Unit and E2E tests are run before considering the phase complete.

## Image Strategy

The project uses lightweight local SVG placeholders in `public/images/products`.

This avoids:

- Broken image icons.
- Repeated 404 requests in the browser console.
- Unclear visual layout during review.
- Large binary assets in the repository.

Future real product images should be optimized before commit. Recommended guidelines:

- Use compressed WebP, AVIF, SVG, or optimized JPEG/PNG.
- Keep dimensions consistent for product cards.
- Preserve meaningful `imageAlt` values in product data.
- Avoid large uncompressed image files.
- Prefer local assets for a self-contained demo.

## Rendering Notes

Product card and product detail image containers use fixed aspect ratios so layout remains stable while images load.

Filtering and sorting run on a small local dataset. If the dataset becomes large, future improvements could include:

- Debounced search input.
- Route-driven filter query params.
- Server-side pagination.
- Virtualized product grids.

## Build Review

Recommended production-readiness commands:

```bash
npm run type-check
npm run test:unit
npm run build
npm run test:e2e
Known Scope

This is a compact frontend slice, not a full production commerce system.

Not included in this performance pass:

Real CDN image optimization.
Lighthouse CI.
Bundle analyzer.
Route-level code splitting.
Real API caching.
Real checkout performance testing.
Final Notes

The current performance goal is not maximum optimization. The goal is a clean, stable, reviewable frontend build with no obvious broken assets, no preventable console noise, and predictable UI rendering.