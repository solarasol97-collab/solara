import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import Layout from "../layout/Layout";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import styled from "styled-components";
import { DoorDashClient } from "@doordash/sdk";



const CenteredBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
`;
const CenteredForm = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 16px rgba(0,0,0,0.07);
  padding: 2rem 1.5rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.55);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalBox = styled.div`
  background: #fff;
  width: 90%;
  max-width: 420px;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 18px rgba(0,0,0,0.25);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const Title = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
`;

const ErrorBox = styled.ul`
  background: #fee2e2;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 6px;

  li {
    color: #b91c1c;
    font-size: 0.9rem;
    margin-bottom: 4px;
  }
`;

const Text = styled.p`
  margin-bottom: 1.5rem;
  color: #111827;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ConfirmBtn = styled.button`
  background: #16a34a;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  background: #dc2626;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;


function QuantityDisplay({ quantity, price }) {
  return (
    <div className="product-total d-flex align-items-center">
      <div className="quantity-nav nice-number d-flex align-items-center">
        <span style={{ margin: "0 8px" }}>{quantity}</span>
      </div>
      <strong>
        <i className="bi bi-x-lg px-2" />
        <span className="product-price">${(quantity * price).toFixed(2)}</span>
      </strong>
    </div>
  );
}

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [billing, setBilling] = useState({ fname: "", lname: "", country: "", address: "", city: "", postcode: "", phone: "", email: "", notes: "" });
  const [shipping, setShipping] = useState({ sfname: "", slname: "", snotes: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [qouteData, setQouteData] = useState(null);
  const [dashOrderId, setDashOrderId] = useState(null);

  const router = useRouter();

  // Get type from router state (works in Next.js 13+ with app router, or with custom push)
  let deliveryType = undefined;
  if (typeof window !== 'undefined' && router && router.components && router.components[router.pathname] && router.components[router.pathname].props && router.components[router.pathname].props.pageProps && router.components[router.pathname].props.pageProps.state) {
    deliveryType = router.components[router.pathname].props.pageProps.state.type;
  } else if (router && router.query && router.query.type) {
    deliveryType = router.query.type;
  } else if (router && router.state && router.state.type) {
    deliveryType = router.state.type;
  } else if (typeof window !== 'undefined' && window.history && window.history.state && window.history.state.options && window.history.state.options.state && window.history.state.options.state.type) {
    deliveryType = window.history.state.options.state.type;
  }

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }
  }, []);



  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product.discountPrice ?? item.product.price) * item.quantity,
    0
  );
  const shippingFee = 15;
  const tax = 5;
  const totalExcl = subtotal + shippingFee + tax;
  const totalIncl = totalExcl;

  const handleBillingChange = e => {
    const { name, value } = e.target;
    setBilling(prev => ({ ...prev, [name]: value }));
  };
  const handleShippingChange = e => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const  calculateCartTotals = (cartItems = [], { shippingFee = 15, tax = 5 } = {}) => {
  const subtotal = cartItems.reduce((sum, item) => {
    const price = (item?.product?.discountPrice ?? item?.product?.price ?? 0);
    const qty = Number(item?.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const shipping = subtotal === 0 ? 0 : shippingFee;
  const taxAmount = tax;
  const totalExcl = subtotal + shipping + taxAmount;
  const totalIncl = totalExcl;

  return {
    subtotal,
    shipping,
    tax: taxAmount,
    totalExcl,
    totalIncl,
  };
}

function validateRequiredFields() {
  if (deliveryType === "take-away") return true;

  const required = ["fname","lname","country","address","city","postcode","phone","email"];
  const errors = [];

  required.forEach(f => {
    if (!billing[f] || String(billing[f]).trim() === "") {
      errors.push(`${f} is required`);
    }
  });

  setValidationErrors(errors);
  return errors.length === 0;
}

  const getDoordashDeliveryQuote = async () => {

   let payload= {  billing,shipping }
   const token = localStorage.getItem("token")
   try {
      const res = await fetch('/api/doordash-qoute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        let {subtotal} = calculateCartTotals(cartItems);
        setQouteData({...data?.response,subtotal});
        setDashOrderId(data?.response?.external_delivery_id);
        console.log(data,'data')
      } else {
        console.error('Order error', data);
      }
    } catch (err) {
      console.error('Network error', err);
    }
    
  }

  const acceptDoordashDeliveryQuote = async () => {
   let payload= { dashOrderId }
   const token = localStorage.getItem("token")
   try {
      const res = await fetch('/api/doordash-qoute-accept', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        return;
      } else {
        console.error('Order error', data);
      }
    } catch (err) {
      console.error('Network error', err);
    }

    
  }

  const handleSubmit = async e => {
    e.preventDefault();
    let {subtotal} = calculateCartTotals(cartItems);
    try {
      const res = await fetch('/api/checkout_sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({amount: subtotal})
      });
      await handlePostOrder()
      const data = await res.json();
    } catch (err) {
      console.error('Network error', err);
    }

  };

  const handlePostOrder = async () => {
      const storedUser = localStorage.getItem("user");
      if(!storedUser){
        return toast.error("Please login to proceed to checkout");
      }
      const token = localStorage.getItem("token")
      const payload = {
        items: cartItems.map(item => ({ productId: item.product.id, quantity: item.quantity })),
        shippingAddress: { ...billing, ...shipping , dashOrderId }
      };
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        await acceptDoordashDeliveryQuote();
        toast.success("Order placed successfully")
        router.push(`/doordash-tracking/${dashOrderId}`);
      } else {
        console.error('Order error', data);
      }
    } catch (err) {
      console.error('Network error', err);
    }
  }

  return (
    <Layout showFooter={false} isCustomHeader={true} customHeaderClass='customHeaderStyle'>
      {/* <Breadcrumb pageName="Checkout" pageTitle="Checkout" /> */}
      {showConfirmModal && (
  <Overlay>
    <ModalBox>

      <Title>Confirm Order</Title>

      {validationErrors.length > 0 && (
        <ErrorBox>
          {validationErrors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ErrorBox>
      )}

      <Text>Are you sure you want to place this order?</Text>
      <Text>Your Order will be filled and delivered by <b>DoorDash</b> with Fee charges :- <b>${((qouteData?.fee)/100).toFixed(2)}</b></Text>
      <Text>Your Order total will be :- <b>${((qouteData?.fee)/100 + totalIncl).toFixed(2)}</b></Text>

      <Actions>
        <ConfirmBtn
          onClick={async () => {
            setShowConfirmModal(false);
            handleSubmit({ preventDefault: () => {} });
          }}
        >
          Yes, Confirm
        </ConfirmBtn>

        <CancelBtn onClick={() => setShowConfirmModal(false)}>
          Cancel
        </CancelBtn>
      </Actions>

    </ModalBox>
  </Overlay>
)}

      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-lg-7">
                {deliveryType !== 'take-away' ? (
                  <div className="form-wrap box--shadow mb-30">
                    <h4 className="title-25 mb-20">Billing Details</h4>
                    <div className="row">
                      {['fname','lname','country','address','city','postcode','phone','email'].map(name => (
                        <div key={name} className={`col-${name==='city'||name==='country'?'12':'6'}`}>
                          <div className="form-inner">
                            <label>{name === 'fname' ? 'First Name' : name === 'lname' ? 'Last Name' : name.charAt(0).toUpperCase() + name.slice(1)}</label>
                            {name === 'city' ? (
                              <select name={name} value={billing[name]} onChange={handleBillingChange} style={{ appearance: 'none' }}>
                                <option>Town / City</option><option>Dhaka</option><option>Saidpur</option><option>New York</option>
                              </select>
                            ) : (
                              <input
                                type={name === 'email' ? 'email' : 'text'}
                                name={name}
                                placeholder={name === 'fname' ? 'First Name' : name === 'lname' ? 'Last Name' : name.charAt(0).toUpperCase() + name.slice(1)}
                                value={billing[name]}
                                onChange={handleBillingChange}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Order Notes</label>
                          <textarea name="notes" rows={6} value={billing.notes} onChange={handleBillingChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <CenteredBox>
                    <CenteredForm>
                      <h4 className="title-25 mb-20" style={{textAlign:'center'}}>Take-Away Order</h4>
                      <p style={{textAlign:'center', color:'#64748b', marginBottom:'1.5rem'}}>No billing details required for take-away orders. Please review your order and place it below.</p>
                    </CenteredForm>
                  </CenteredBox>
                )}
                {/* <div className="form-wrap box--shadow mb-30">
                  <h4 className="title-25 mb-20">Ship to a Different Address?</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input type="text" name="sfname" placeholder="Your first name" value={shipping.sfname} onChange={handleShippingChange} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input type="text" name="slname" placeholder="Your last name" value={shipping.slname} onChange={handleShippingChange} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Notes</label>
                        <textarea name="snotes" rows={3} value={shipping.snotes} onChange={handleShippingChange} />
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <aside className="col-lg-5">
                <div className="added-product-summary mb-30">
                  <h5 className="title-25 checkout-title">Order Summary</h5>
                  <ul className="added-products">
                    {cartItems?.map((item, idx) => (
                      <li key={idx} className="single-product d-flex justify-content-start">
                        <div className="product-img">
                          <img src={item?.product?.images[0]?.url || item?.product?.images} alt={item?.product?.name} />
                        </div>
                        <div className="product-info">
                          <h5 className="product-title"><a href="#">{item?.product?.name}</a></h5>
                          <QuantityDisplay quantity={item?.quantity} price={item?.product?.discountPrice ?? item?.product?.price} />
                        </div>
                        <div className="delete-btn"><i className="bi bi-x-lg" /></div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="summery-card cost-summery mb-30">
                  <table className="table cost-summery-table">
                    <thead><tr><th>Subtotal</th><th>${subtotal.toFixed(2)}</th></tr></thead>
                    <tbody>
                      <tr><td>Delivery</td><td>${shippingFee.toFixed(2)}</td></tr>
                      <tr><td className="tax">Tax</td><td>${tax.toFixed(2)}</td></tr>
                      <tr><td>Total ( tax excl.)</td><td>${totalExcl.toFixed(2)}</td></tr>
                      <tr><td>Total ( tax incl.)</td><td>${totalIncl.toFixed(2)}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="place-order-btn">
                  <button
                    type="button"
                    className="primary-btn8 lg--btn"
                    onClick={async () => {
                      if (!validateRequiredFields()) {
                        toast.error("Please fill in all required fields");
                        return;
                      }
                      await getDoordashDeliveryQuote();
                      setShowConfirmModal(true);
                    }}
                  >
                    Proceed
                  </button>

                </div>
              </aside>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}




export default Checkout;
