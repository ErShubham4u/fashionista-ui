// InvoiceTemplate.js
import React from "react";
import { useAuth } from "../../global/AuthContext";

const InvoiceTemplate = React.forwardRef(({ order }, ref) => {
  const { user, admin } = useAuth();
  console.log(order);
  console.log(user);
  return (
    <div
      ref={ref}
      style={{
        width: "800px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        color: "#000",
        backgroundColor: "#fff",
        fontSize: "12px",
      }}
    >
      <h2>Tax Invoice</h2>
      <table width="100%" style={{ marginBottom: "10px" }}>
        <tbody>
          <tr>
            <td style={{ paddingLeft: "8px" }}>
              <b>Order Id:</b> {order.order_id}
            </td>
            <td>
              <b>Invoice No:</b> {order.order_id || "FAQGR62600013637"}
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: "8px" }}>
              <b>Order Date:</b> {order.date}
            </td>
            <td>
              <b>Invoice Date:</b> {new Date().toLocaleDateString("en-IN")}
            </td>
          </tr>
          {/* <tr>
            <td colSpan="2"><b>GSTIN:</b> 09AYDPT7392R1Z6 &nbsp; <b>PAN:</b> AYDPT7392R</td>
          </tr> */}
        </tbody>
      </table>

      <table
        width="100%"
        style={{
          marginBottom: "20px",
          borderCollapse: "collapse",
          fontSize: "14px",
        }}
      >
        <tbody>
          <tr>
            {/* Sold By */}
            <td
              style={{ verticalAlign: "top", padding: "10px", width: "33.33%" }}
            >
              <strong>Sold By</strong>
              <br />
              FashionIsta,
              <br />
              {admin?.street_address}, {admin?.sub_district}
              <br />
              {admin?.dist}, {admin?.state} - {admin?.zip}
              <br />
              <strong>Email :</strong> {admin?.email}
            </td>

            {/* Shipping Address */}
            <td
              style={{ verticalAlign: "top", padding: "10px", width: "33.33%" }}
            >
              <strong>Shipping Address</strong>
              <br />
              {user?.username || ""}
              <br />
              {order.shipping ||
                `${user?.street_address || ""} ${user?.sub_district || ""}, ${
                  user?.dist || ""
                }, ${user?.state || ""} - ${user?.zip || ""}`}
              <br />
              Phone: {user?.phone}
            </td>

            {/* Billing Address */}
            <td
              style={{ verticalAlign: "top", padding: "10px", width: "33.33%" }}
            >
              <strong>Billing Address</strong>
              <br />
              {user?.username || ""}
              <br />
              {order.shipping ||
                `${user?.street_address || ""} ${user?.sub_district || ""}, ${
                  user?.dist || ""
                }, ${user?.state || ""} - ${user?.zip || ""}`}
              <br />
              Phone: {user?.phone}
            </td>
          </tr>
        </tbody>
      </table>

      <table
        width="100%"
        border="1"
        cellPadding="8"
        style={{
          borderCollapse: "collapse",
          marginTop: "20px",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>Product</th>
            <th></th>
            <th>Price</th>
            <th>Qty</th>
            <th>Gross Amount</th>
            {/* <th>Discount</th> */}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items?.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              {/* <td>{item.description}</td> */}

             

              {[item.preDrape, item.fall, item.blouse].filter(Boolean).length >
              0 ? (
                <td className="align-middle">
                  {[
                    item.preDrape && `preDrape: ${item.preDrape}`,
                    item.fall && `fall: ${item.fall}`,
                    item.blouse && `blouse: ${item.blouse}`,
                  ]
                    .filter(Boolean)
                    .map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                </td>
              ) : item?.size ? (
                <td className="align-middle">Size : {item?.size}</td>
              ) : (
                <td className="product-name"></td>
              )}

              <td>₹{item.price}</td>

               <td>{item.quantity}</td>

              <td>
                ₹
                {(
                  (+item.price || 0) +
                  (+item.preDrape || 0) +
                  (+item.fall || 0) +
                  (+item.blouse || 0)
                ).toLocaleString("en-IN")}
                .00
              </td>

              {/* <td>₹{item.discount}</td> */}

              <td>
                ₹
                {(
                  (Number(item.price || 0) +
                    Number(item.preDrape || 0) +
                    Number(item.fall || 0) +
                    Number(item.blouse || 0)) *
                  Number(item.quantity || 1)
                ).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
          <tr style={{ backgroundColor: "#f9f9f9", fontWeight: "bold" }}>
            <td colSpan="3" style={{ textAlign: "right" }}>
              TOTAL QTY:
            </td>
            <td>{order.totalQuantity}</td>
            <td colSpan="1" style={{ textAlign: "right" }}>
              TOTAL AMOUNT:
            </td>
            <td>
              ₹
              {order.items
                ?.reduce((sum, item) => {
                  const itemTotal =
                    (Number(item.price || 0) +
                      Number(item.preDrape || 0) +
                      Number(item.fall || 0) +
                      Number(item.blouse || 0)) *
                    Number(item.quantity || 1);

                  return sum + itemTotal;
                }, 0)
                .toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <p
          style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}
        >
          TOTAL PRICE: ₹ 
              {order.items
                ?.reduce((sum, item) => {
                  const itemTotal =
                    (Number(item.price || 0) +
                      Number(item.preDrape || 0) +
                      Number(item.fall || 0) +
                      Number(item.blouse || 0)) *
                    Number(item.quantity || 1);

                  return sum + itemTotal;
                }, 0)
                .toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
        </p>

        <p style={{ fontSize: "10px", marginBottom: "4px" }}>
          All values are in INR
        </p>

        <p style={{ fontSize: "10px", marginBottom: "4px" }}>
          <strong>Seller Registered Address:</strong> FashionIsta,
          {admin?.street_address}, {admin?.sub_district}, {admin?.dist}, {admin?.state} - {admin?.zip}
        </p>

        <p style={{ fontSize: "10px", marginBottom: "0" }}>
          <strong>Declaration:</strong> The goods sold are intended for end user
          consumption and not for resale.
        </p>
      </div>

      {/* <p style={{ fontSize: "10px" }}>
        FSSAI License number: null
      </p> */}

      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <b>Ordered Through</b>
        <br />
        <a>Ruee by FashionIsta..❤️</a>
      </div>

      {/* <div style={{ marginTop: "40px", textAlign: "right" }}> */}
        {/* <img src="/signature.png" alt="Signature" width="100" /> */}
        {/* <br />
        <b>SUPER ENTERPRISES</b>
        <br />
        Authorized Signature */}
      {/* </div> */}
    </div>
  );
});

export default InvoiceTemplate;
