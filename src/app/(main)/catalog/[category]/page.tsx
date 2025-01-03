import Products from "@/components/Products/Products";
import { products } from "@/app/mockedData/products";

export default function All() {
  return (
    <>
      <Products products={products} />
    </>
  );
}
