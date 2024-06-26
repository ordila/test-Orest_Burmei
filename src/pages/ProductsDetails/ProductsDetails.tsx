import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchProductByIdAsync } from "@/redux/thunk";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsDetails.scss";
export const ProductsDetails = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { item } = useAppSelector((state) => state.products);
  console.log("item", item);
  useEffect(() => {
    if (id) {
      dispatch(fetchProductByIdAsync(id));
    }
  }, [dispatch]);

  return (
    <div className="product-details">
      <h2>{item.name}</h2>
      <img src={item.imageUrl} alt={item.name} className="product-image" />
      <p className="product-description">{item.description}</p>

      <div className="product-size">
        <strong>Size:</strong> {item.size.width} x {item.size.height} cm
      </div>
      <div className="product-weight">
        <strong>Weight:</strong> {item.weight}
      </div>
      <div className="product-comments">
        <h3>Comments:</h3>
        {item.comments.length > 0 ? (
          <ul>
            {item.comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.date}:</strong> {comment.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};
