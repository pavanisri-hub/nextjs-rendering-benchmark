import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout } from "../../components/Layout";
import { Product } from "../../components/ProductCard";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data: Product = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return (
      <Layout cartCount={cartCount}>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout cartCount={cartCount}>
      <div className="max-w-xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
        <h1
          data-testid="product-title"
          className="text-2xl font-semibold mb-2"
        >
          {product.title}
        </h1>
        <p className="text-lg font-medium mb-4">${product.price}</p>
        <button
          type="button"
          data-testid="add-to-cart-btn"
          onClick={() => setCartCount((c) => c + 1)}
          className="inline-flex items-center justify-center rounded-md bg-slate-900 text-white text-sm px-3 py-2 hover:bg-slate-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </Layout>
  );
}