import { Link, Navigate, useNavigate } from "react-router-dom";
import "./productCard.css";
import { useAuth } from "../global/AuthContext";
import { authService_cart } from "../data-services/authService_cart";
import { useEffect } from "react";

const ProductCard = ({ product }) => {
  const { user, admin } = useAuth();
  const u_id = user?.id;
  // console.log(product);

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-toggle="tooltip"]')
    );
    tooltipTriggerList.map((el) => new window.bootstrap.Tooltip(el));
  }, []);

  // console.log("ANish ")
  const notLogin = () => {
    alert("Plz Log-In Your Account...!");
  };
  const outOfStock =()=>{
    alert("Out Of Stock...!");
  }

  const addToCart = async () => {
    const cartData = {
      u_id: u_id,
      p_id: product.id,
      mainImage: product.mainImage,
      name: product.productName,
      price: product.price,
      quantity: 1,
    };
    const result = await authService_cart.insertCartDetails(cartData, u_id);
    if (result) {
      alert("Added in Cart...!  Cart Product's : " + result.length);
    }
  };

  // const navigate=navigator
  const navigate = useNavigate();
  const handleEditProduct = () => {
    // Navigate or open edit form
    navigate(`/edit_product/${product.id}/${product.category}`);
  };

  return (
    <div className="prodct-item-element col-sm-6 col-md-4 col-lg-3 ">
      <div className="product-item ">
        {/*Product Img*/}
        <div
          className="product-item-img p-card"
          style={{ border: "0px solid red" }}
        >
          {/*Image*/}

          <Link
            to={`/product_detail/${product.id}/${product.category}`}
            className="product-item-img-link img"
          >
            <img src={product.mainImage} alt="Product Item" />
          </Link>

          {/*Add to Link*/}
          <div className="add-to-link">
            {product?.stock === true ? (
              <>
                <button
                  className="btn btn-outline-primary btn--sm button"
                  onClick={outOfStock}
                >
                  Add To Cart
                </button>
              </>
            ) : (
              <>
                {" "}
                {user?.email === admin?.email ? (
                  <button
                    className="btn btn-outline-primary btn--sm button"
                    onClick={handleEditProduct} // admin edit ke liye function
                  >
                    Edit Product
                  </button>
                ) : user ? (
                  <button
                    onClick={addToCart}
                    className="btn btn-outline-primary btn--sm button"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-primary btn--sm button"
                    onClick={notLogin}
                  >
                    Add To Cart
                  </button>
                )}
              </>
            )}
          </div>
          {/*Hover Icons*/}

          <div className="hover-product-icon ">
            <div className="product-icon-btn-wrap ">
              {product?.stock === true ? (
                <>
                  <a data-toggle="tooltip" data-placement="left">
                    <span>Out Of Stock</span>
                    {/* <i className="ti-search" /> */}
                  </a>
                </>
              ) : (
                <>
                  {user && user.email === admin?.email ? null : user ? (
                    <button
                      onClick={addToCart}
                      className="btn rounded-circle wishlist-btn"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Add to Wishlist"
                    >
                      <i className="ti-heart" />
                    </button>
                  ) : (
                    <button
                      onClick={notLogin}
                      className="btn rounded-circle wishlist-btn"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="Add to Wishlist"
                    >
                      <i className="ti-heart" />
                    </button>
                  )}
                </>
              )}

              {/* <Link
                to={"/Home"}
                data-toggle="tooltip"
                data-placement="left"
                title="Add to Compare"
              >
                <i className="ti-reload" />
              </Link> */}
            </div>
          </div>
          {/*Labels*/}
          <div className="product-labels"></div>
        </div>
        {/*Product Content*/}

        <div className="product-item-content">
          {/* <div className="tag">
              <Link to={"/Home"}>Minimal</Link>
            </div> */}

          <Link
            to={`/product_detail/${product.id}/${product.category}`}
            className="product-item-title"
          >
            <span>{product.productName}</span>
          </Link>
          <p className="product-item-price">
            <span className="product-price-amount">
              {/* <span className="product-price-currency-symbol">$</span> */}
              &#8377;{product.price}
            </span>
          </p>
          <div className="product-rating">
            <div
              className="star-rating"
              itemProp="reviewRating"
              itemScope
              itemType="http://schema.org/Rating"
              title="Rated 4 out of 5"
            >
              <span style={{ width: "60%" }} />
            </div>
            <Link
              to={`/product_detail/${product.id}/${product.category}`}
              className="product-rating-count"
            >
              <span className="count">3</span> Reviews
            </Link>
          </div>
          <p className="product-description">
            {/* When an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic remaining essentially unchanged. */}
          </p>
          <br></br>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
