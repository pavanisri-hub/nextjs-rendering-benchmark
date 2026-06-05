# Next.js Rendering Benchmark (CSR vs SSR vs SSG)

This project implements the same product catalog three times using different Next.js rendering strategies:

- `csr-app`: Client-Side Rendering
- `ssr-app`: Server-Side Rendering
- `ssg-app`: Static Site Generation with ISR (revalidate 60s)

## Live Deployments

- CSR: (https://nextjs-rendering-benchmark-cp1j.vercel.app/products)
- SSR:(https://nextjs-rendering-benchmark.vercel.app/products)>
- SSG: (https://nextjs-rendering-benchmark-v8op.vercel.app/)
> Replace these URLs after deploying each app to Vercel.

- CSR: https://your-csr-app.vercel.app
- SSR: https://your-ssr-app.vercel.app
- SSG: https://your-ssg-app.vercel.app

## Running locally

```bash
# CSR
cd csr-app
npm install
npm run dev

# SSR
cd ssr-app
npm install
npm run dev

# SSG
cd ssg-app
npm install
npm run dev
```

## Lighthouse Results

Raw Lighthouse JSON reports are stored under `results/`.  
Use `node parse-results.js` to print a summary table in the terminal.