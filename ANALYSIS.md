# Rendering Strategies Benchmark Analysis

## Lighthouse Results (Median)

The table below summarizes the median desktop Lighthouse results for the `/products` page across the three rendering strategies.

| Metric | CSR | SSR | SSG (ISR 60s) |
| ------ | --- | --- | ------------- |
| Performance Score (Desktop) | 60 | 98 | 90 |
| TTFB (ms) | 65.92 | 59.06 | 137.13 |
| LCP (ms) | 4178.67 | 991.72 | 1932.49 |
| TBT (ms) | 0.00 | 0.00 | 0.00 |
| curl test (content visible) | ✗ | ✓ | ✓ |

**Observations:**

- **SSR** achieved the best overall desktop performance score (98) and the lowest LCP (~0.99 s), meaning users see the main content fastest when the HTML is rendered on each request.  
- **SSG** had a strong performance score (90) with good LCP (~1.93 s), benefiting from static HTML and CDN delivery but still slightly behind SSR in this test.  
- **CSR** had the lowest performance score (60) and the slowest LCP (~4.18 s) because the browser has to download JavaScript, fetch data, and render on the client before showing the full product grid.  
- **TTFB** was very good for all three, with SSR slightly ahead in this particular run, and **TBT/CLS** were effectively zero or near-zero for all strategies, so interactivity and layout stability are strong in every version.  
- The **curl test** showed no product titles in CSR’s initial HTML (empty shell), while SSR and SSG both returned fully rendered product cards, confirming their SEO advantage.

### curl Test Details

- `curl https://nextjs-rendering-benchmark-cp1j.vercel.app/products | grep "product-card-title"` → **0 matches** (CSR, content rendered only after JS).  
- `curl https://nextjs-rendering-benchmark-v8op.vercel.app/products | grep "product-card-title" | wc -l` → **~20 matches** (SSR, HTML contains products).  
- `curl https://nextjs-rendering-benchmark.vercel.app/products | grep "product-card-title" | wc -l` → **~20 matches** (SSG, HTML contains products).

This confirms that SSR and SSG send actual product content in the first response, while CSR requires JavaScript execution before content appears.

### Decision Chart

Below are guidelines for choosing a rendering strategy based on page type, grounded in the measurements above (especially LCP, TTFB, and whether content appears in the initial HTML).

- **Marketing landing page**  
  **Recommended:** SSG.  
  **Why:** Marketing pages are usually mostly static, and SSG gave a high performance score (90) with low TTFB and good LCP, so users get a very fast, stable first view and crawlers see complete HTML without per-request server cost.

- **E‑commerce product search results page**  
  **Recommended:** SSR (or SSG + ISR for less dynamic catalogs).  
  **Why:** In the tests, SSR had the best LCP (~0.99 s) and top performance score (98), so users see search results quickly and SEO is strong. SSG + ISR can work when product data doesn’t change constantly, trading a bit of freshness for CDN-level speed.

- **User dashboard (behind login)**  
  **Recommended:** SSR or CSR.  
  **Why:** Dashboards are personalized and not a good fit for static generation. SSR provides fast initial HTML per user with fresh data at request time, while CSR can keep server costs lower by loading a static shell and then fetching user-specific data on the client.

- **Documentation site**  
  **Recommended:** SSG.  
  **Why:** Docs content is mostly static and benefits from being pre-rendered and served from the CDN. SSG’s strong performance score and low layout shift make it ideal for documentation with excellent SEO and minimal server load.

- **Blog**  
  **Recommended:** SSG with ISR.  
  **Why:** Blog posts rarely change after publishing, so static pages give very fast loads similar to the SSG results above. ISR (for example, `revalidate: 60` or longer) allows content updates without a full rebuild while maintaining low TTFB and solid LCP.

Overall, CSR is best when rich client-side interactivity and flexibility are the priority and SEO is less critical, SSR is ideal when you need fresh, personalized or frequently changing content with strong SEO, and SSG (with or without ISR) is the best option for mostly static, public-facing pages where maximum speed and scalability matter most.