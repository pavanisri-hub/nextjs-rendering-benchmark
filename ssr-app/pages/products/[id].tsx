import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Layout } from "../../components/Layout";
import { Product } from "../../components/ProductCard";

type ProductPageProps = {
  product: Product;
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (
  context
) => {
  const { id } = context.params || {};

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export default function ProductDetailPage({ product }: ProductPageProps) {
  const [cartCount, setCartCount] = useState(0);

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