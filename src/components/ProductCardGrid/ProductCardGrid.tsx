import { useState } from "react";

import "./ProductCardGrid.scss";

import { useAppDispatch, useAppSelector } from "@/hooks";

import { Product } from "@/types";

import { addProductAsync } from "@/redux/thunk";

import { ProductForm, Modal, ProductCard } from "..";

export const ProductCardGrid = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newProduct, setNewProduct] = useState({
    imageUrl: "https://via.placeholder.com/150",
    name: "",
    count: "",
    size: { width: "", height: "" },
    weight: "",
    comments: [],
  });

  const { items } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();

  const toggleModal = () => setIsModalVisible(!isModalVisible);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "width" || name === "height") {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        size: {
          ...prevProduct.size,
          [name]: value,
        },
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleConfirm = async () => {
    await dispatch(addProductAsync(newProduct));
    toggleModal();
  };

  return (
    <ul className="product-card-grid">
      {items.map((product: Product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}

      <button onClick={toggleModal}>Add Product</button>
      {isModalVisible && (
        <Modal onClose={toggleModal}>
          <ProductForm
            product={newProduct}
            handleInputChange={handleInputChange}
            toggleModal={toggleModal}
            handleSubmit={handleConfirm}
          />
        </Modal>
      )}
    </ul>
  );
};
