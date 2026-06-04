# Rendering Strategies Benchmark Analysis

## Lighthouse Results (Median)

| Metric | CSR | SSR | SSG (ISR 60s) |
| ------ | --- | --- | ------------- |
| Performance Score (Desktop) |  |  |  |
| TTFB (ms) |  |  |  |
| LCP (ms) |  |  |  |
| TBT (ms) |  |  |  |
| curl test (content visible) | ✗ | ✓ | ✓ |

> Fill the cells above after running Lighthouse for each strategy and computing medians.

### Decision Chart

- Marketing landing page:  
  Recommendation: SSG. Reason: static content is best served from CDN with the lowest TTFB and strong SEO.

- E-commerce product search results page:  
  Recommendation: SSR or SSG + ISR. Reason: SSR gives fresh content per request; SSG + ISR gives better speed with controlled freshness.

- User dashboard (behind login):  
  Recommendation: SSR or CSR. Reason: dashboards are often personalized and not ideal for static generation.

- Documentation site:  
  Recommendation: SSG. Reason: docs are mostly static, SEO-friendly, and benefit from fast CDN delivery.

- Blog:  
  Recommendation: SSG + ISR. Reason: posts rarely change, and ISR keeps content fresh without full rebuilds.
