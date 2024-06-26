import { FC, useState } from "react";

import "./ProductCard.scss";

import { Product } from "@/types";

import { useAppDispatch } from "@/hooks";

import { deleteProductAsync, editProductAsync } from "@/redux/thunk";

import { Modal, ProductForm } from "..";
import { Link } from "react-router-dom";

interface IProductCard {
  product: Product;
}

export const ProductCard: FC<IProductCard> = ({ product }) => {
  const [editedProduct, setEditedProduct] = useState(product);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const dispatch = useAppDispatch();

  const { id, imageUrl, name, count, size, weight } = product;

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const toggleEditModal = () => setIsEditModalVisible(!isEditModalVisible);

  const handleConfirmDelete = () => {
    dispatch(deleteProductAsync(id));
    setIsModalVisible(false);
  };

  const handleSaveChanges = () => {
    dispatch(editProductAsync(editedProduct));
    toggleEditModal();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "width" || name === "height") {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        size: {
          ...prevProduct.size,
          [name]: value,
        },
      }));
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  return (
    <div className="product-card">
      <img src={imageUrl} alt={name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>
        <p className="product-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          faucibus, lorem eget semper tincidunt, lectus nulla hendrerit arcu, et
          ultrices ante nibh sit amet eros.
        </p>
        <div className="product-details">
          <ul>
            <li>
              <span>ID:</span>
              {id}
            </li>
            <li>
              <span>Count:</span>
              {count}
            </li>
            <li>
              <span>Size:</span>
              {size.width}x{size.height} cm
            </li>
            <li>
              <span>Weight:</span>
              {weight}
            </li>
          </ul>
        </div>

        <button onClick={toggleModal}>Delete</button>
        <button onClick={toggleEditModal}>Edit</button>

        {isModalVisible && (
          <Modal onClose={toggleModal}>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={handleConfirmDelete}>Confirm</button>
            <button onClick={toggleModal}>Cancel</button>
          </Modal>
        )}

        {isEditModalVisible && (
          <Modal onClose={toggleEditModal}>
            <p>Edit Product Details</p>
            <ProductForm
              product={editedProduct}
              handleInputChange={handleInputChange}
              toggleModal={toggleEditModal}
              handleSubmit={handleSaveChanges}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};
