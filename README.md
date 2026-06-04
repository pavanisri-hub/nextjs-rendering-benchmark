# Next.js Rendering Benchmark (CSR vs SSR vs SSG)

This project implements the same product catalog three times using different Next.js rendering strategies:

- `csr-app`: Client-Side Rendering
- `ssr-app`: Server-Side Rendering
- `ssg-app`: Static Site Generation with ISR (revalidate 60s)

## Live Deployments

> Replace these with your real Vercel URLs after deployment.

- CSR: <replace-with-csr-url>
- SSR: <replace-with-ssr-url>
- SSG: <replace-with-ssg-url>

## Project Structure

- `csr-app/` - CSR implementation
- `ssr-app/` - SSR implementation
- `ssg-app/` - SSG implementation
- `results/` - Lighthouse JSON reports
- `parse-results.js` - Node script to summarize Lighthouse results
- `ANALYSIS.md` - Final benchmark analysis and decision chart

## Local Development

### CSR
```bash
cd csr-app
npm install
npm run dev
```

### SSR
```bash
cd ssr-app
npm install
npm run dev
```

### SSG
```bash
cd ssg-app
npm install
npm run dev
```

## Benchmarking

1. Deploy each app to Vercel as a separate project.
2. Run Lighthouse CLI against each deployed `/products` page.
3. Save the raw JSON outputs in `results/`.
4. Run:

```bash
node parse-results.js
```

to print a summary table.

## Notes

- CSR uses client-side fetching with `useEffect`.
- SSR uses `getServerSideProps`.
- SSG uses `getStaticProps`, `getStaticPaths`, ISR, and `fallback: "blocking"`.
- The product data comes from DummyJSON.
