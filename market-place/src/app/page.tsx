// src/app/products/page.tsx

import React from "react";
import fetchProducts from "@/utils/fetchProducts";
import ProductList from "@/components/ProductList/ProductList";
import { Product } from "@/common/types/Product";

// Este es un componente de servidor por defecto en App Router
const ProductsPage = async () => {
  try {
    const products: Product[] = await fetchProducts();

    console.log("aquiiii"); // Debe aparecer en la consola del servidor

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
        <ProductList products={products} />
      </div>
    );
  } catch (error: unknown) {
    let errorMessage = "No se pudo obtener los productos.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error("Error obteniendo productos:", errorMessage);

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
        <p className="text-red-500">Error: {errorMessage}</p>
      </div>
    );
  }
};

export default ProductsPage;
