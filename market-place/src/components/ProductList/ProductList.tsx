import { ProductCard } from "../ProductCard/ProductCard";

const products = [
  {
    id: 1,
    title: "Product 1",
    image: "/placeholder.png",
    description: "Description of Product 1",
    price: 100,
    discount: 10,
  },
  {
    id: 2,
    title: "Product 2",
    image: "/placeholder.png",
    description: "Description of Product 2",
    price: 200,
    discount: 20,
  },
  // Add more products as needed
];

export const ProductList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};
