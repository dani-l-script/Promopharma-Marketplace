import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  description: string;
  price: number;
  discount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  description,
  price,
  discount,
}) => {
  const { addToCart } = useCart();

  return (
    <div className="p-4 border rounded shadow-md">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <h3 className="mt-2 text-xl font-semibold">{title}</h3>
      <p>{description}</p>
      <p>
        ${price - discount}{" "}
        <span className="line-through text-gray-500">${price}</span>
      </p>
      <button
        onClick={() =>
          addToCart({
            id,
            title,
            image,
            description,
            price,
            discount,
            quantity: 0,
          })
        }
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};
