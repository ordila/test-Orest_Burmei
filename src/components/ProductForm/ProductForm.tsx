import { FC } from "react";

import { ProductToAdd } from "@/types";
import "./ProductForm.scss";

export interface IProductForm {
  product: ProductToAdd;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  toggleModal: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
export const ProductForm: FC<IProductForm> = ({
  product,
  handleInputChange,
  toggleModal,
  handleSubmit,
}) => {
  const handleNestedInputChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    const [property, subProperty] = name.split(".");
    handleInputChange({
      target: {
        name: property,
        value: { ...product[property], [subProperty]: value },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <input
          id="imageUrl"
          required
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleInputChange}
        />
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          required
          name="name"
          placeholder="Name"
          value={product.name}
          onChange={handleInputChange}
        />
        <label htmlFor="count">Count:</label>
        <input
          id="count"
          required
          name="count"
          placeholder="Count"
          value={product.count}
          onChange={handleInputChange}
        />
        <label htmlFor="width">Width:</label>
        <input
          id="width"
          required
          name="size.width"
          placeholder="Width"
          value={product.size.width}
          onChange={handleNestedInputChange}
        />
        <label htmlFor="height">Height:</label>
        <input
          id="height"
          required
          name="size.height"
          placeholder="Height"
          value={product.size.height}
          onChange={handleNestedInputChange}
        />
        <label htmlFor="weight">Weight:</label>
        <input
          id="weight"
          required
          name="weight"
          placeholder="Weight"
          value={product.weight}
          onChange={handleInputChange}
        />
      </fieldset>
      <button type="submit">Confirm</button>
      <button type="button" onClick={toggleModal}>
        Cancel
      </button>
    </form>
  );
};
