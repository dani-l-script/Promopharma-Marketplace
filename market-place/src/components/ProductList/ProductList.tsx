// src/components/ProductList/ProductList.tsx

import React from "react";
import { Product } from "@/common/types/Product";

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  if (!products.length) {
    return (
      <p className="text-gray-500 text-center">No hay productos disponibles.</p>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <li
          key={product.code}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
        >
          {/* Imagen del Producto */}
          {product.images && product.images.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={
                product.images[0].variants["100"]?.formats.jpg?.resolutions[
                  "1x"
                ].url || "/placeholder.png"
              }
              alt={product.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4">
              <span className="text-gray-500">No hay imagen disponible</span>
            </div>
          )}

          {/* Detalles del Producto */}
          <h2 className="text-xl font-semibold mb-2 text-gray-800">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Proveedor:</span> {product.supplier}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Precio:</span>{" "}
            {product.prices.salesPrice.formattedValue}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Calificación:</span> {product.rating}{" "}
            ({product.reviewCount} reseñas)
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Tamaño del Paquete:</span>{" "}
            {product.packagingSize}
          </p>

          {/* Acción Adicional */}
          <div className="mt-auto">
            <a
              href={product.url}
              className="text-blue-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver Detalles
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
