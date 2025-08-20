import Link from "next/link";
import React, { useState, useEffect, useReducer } from "react";
import Layout from "../layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import styled from "styled-components";

// Counter logic
const initialCount = { count: 1 };
function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "set":
      return { count: action.payload };
    default:
      throw new Error();
  }
}

const ItemCounter = ({ quantity, onChange }) => {
  const [state, dispatch] = useReducer(counterReducer, { count: quantity });

  useEffect(() => {
    dispatch({ type: "set", payload: quantity });
  }, [quantity]);

  const increment = () => {
    onChange(state.count + 1);
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    if (state.count > 1) {
      onChange(state.count - 1);
      dispatch({ type: "decrement" });
    }
  };

  return (
    <QuantityNav>
      <button onClick={decrement} type="button">
        <i className="bi bi-dash"></i>
      </button>
      <span>{state.count}</span>
      <button onClick={increment} type="button">
        <i className="bi bi-plus"></i>
      </button>
    </QuantityNav>
  );
};

// Styled components
const Container = styled.div`
  min-height: 75vh;
  padding: 1rem;
  background-color: #f3f4f6;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 767px) {
    padding: 0.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
  max-width: 48rem;

  @media (max-width: 767px) {
    padding: 0.5rem 0;
    margin-bottom: 0.75rem;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;

  @media (max-width: 767px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.25rem;

  @media (max-width: 767px) {
    font-size: 0.75rem;
  }
`;

// const ContentWrapper = styled.div`
//   width: 100%;
//   max-width: 60rem;
//   display: flex;
//   gap: 1rem;

//   @media (max-width: 767px) {
//     flex-direction: column;
//   }
// `;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  display: flex;
  flex-direction: column; /* ✅ Always stack vertically */
  gap: 1rem;
`;

const ProductCard = styled.div`
  flex: 2;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  @media (max-width: 767px) {
    padding: 1rem;
    margin-top:5%
  }
`;

const SummaryCard = styled.div`
  flex: 1;
  background-color: white;
  width:50%;
  align-self:end;

  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 767px) {
    padding: 1rem;
    width: 100%;
  }
`;

const SectionText = styled.div`
  font-size: 1.875rem;
  color: #0f172a;
  margin-bottom: 0.5rem;
  text-align: center;

  @media (max-width: 767px) {
    font-size: 1rem;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;

  @media (max-width: 767px) {
    -webkit-overflow-scrolling: touch;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    color: #1e293b;
  }

  td {
    vertical-align: middle;
  }

  .delete-icon {
    cursor: pointer;
    color: #ef4444;
    float: right;
  }

  del {
    color: #64748b;
    margin-right: 0.5rem;
  }
`;

const QuantityNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  button {
    width: 30px;
    height: 30px;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #f3f4f6;
    }
  }

  span {
    font-size: 1rem;
    font-weight: 500;
  }

  @media (max-width: 767px) {
    button {
      width: 25px;
      height: 25px;
    }
    span {
      font-size: 0.875rem;
    }
  }
`;

const TotalTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 0.75rem;
    text-align: right;
    border-bottom: 1px solid #e2e8f0;
    white-space: nowrap;
  }

  th {
    font-weight: 600;
    color: #1e293b;
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #1f2937;
  color: white;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-end;
  min-width: 120px;

  @media (max-width: 767px) {
    font-size: 0.875rem;
    width: 100%;
    align-self: center;
  }
`;

const ResponsiveSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  background: white;
  color: #1e293b;
  transition: border 0.2s;
  &:focus {
    border: 1.5px solid #1e40af;
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 0.95rem;
    padding: 0.4rem;
  }
`;

const PickupRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  align-items: flex-start;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;
const PickupInput = styled.input`
  flex: 1 1 0;
  min-width: 0;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  @media (max-width: 767px) {
    width: 100%;
    font-size: 0.95rem;
  }
`;

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState(null);
  const [deliveryType, setDeliveryType] = useState("Delivery");
  const [carNumber, setCarNumber] = useState("");
  const [carModel, setCarModel] = useState("");
  const [parkingLocation, setParkingLocation] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      try {
        setCartItems(JSON.parse(stored));
      } catch {
        setCartItems([]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, hydrated]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user:", error);
      }
    }
  }, []);

  const handleRemove = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const handleQuantityChange = (index, newQty) => {
    const updated = [...cartItems];
    updated[index].quantity = newQty;
    setCartItems(updated);
  };

  const getSubtotal = (item) => {
    const price = item.product?.discountPrice ?? item.product?.price;
    return price * item.quantity;
  };

  const total = cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);
// console.log(cartItems,'cartItems')
  return (
    <Layout showFooter={false} isCustomHeader={true} customHeaderClass="customHeaderStyle">
      <Container>
      <Toaster position="top-center" reverseOrder={false} />
        <Header>
          <Title>Cart</Title>
          <Subtitle>Review your items and proceed to checkout</Subtitle>
        </Header>
        <ContentWrapper>
          <ProductCard>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <SectionText>Cart Items</SectionText>
                <TableWrapper>
                  <Table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        {/* <th>Delete</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, idx) => (
                        <tr key={idx}>
                          <td>
                            <Link href="/shop-details" style={{color:'#0f172a'}}>{item?.product?.name}</Link>
                          </td>
                          <td>
                            {item.product?.discountPrice ? (
                              <>
                                <del>${item.product?.price.toFixed(2)}</del>
                                <span>${item.product?.discountPrice.toFixed(2)}</span>
                              </>
                            ) : (
                              <span>${item.product?.price.toFixed(2)}</span>
                            )}
                          </td>
                          <td>
                            <ItemCounter
                              quantity={item.quantity}
                              onChange={(q) => handleQuantityChange(idx, q)}
                            />
                          </td>
                          <td>${getSubtotal(item).toFixed(2)}</td>
                          <td>
                            <div className="delete-icon" style={{float:'left', padding:'10%',backgroundColor:'#0f172a',color:'white', borderRadius:'10px', boxShadow:'4px 8px 30px rgba(175, 37, 37, 0.19)'}} onClick={() => handleRemove(idx)}>
                              <i className="bi bi-x" />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </TableWrapper>
                {deliveryType === "Pick Up From Lot" && (
                  <>
                    <h4 style={{fontSize: '1.1rem', color: '#1e293b', margin: '1.5rem 0 1rem 0'}}>Pick Up Details</h4>
                    <PickupRow>
                      <PickupInput
                        type="text"
                        placeholder="Car Number"
                        value={carNumber}
                        onChange={e => setCarNumber(e.target.value)}
                      />
                      <PickupInput
                        type="text"
                        placeholder="Car Model"
                        value={carModel}
                        onChange={e => setCarModel(e.target.value)}
                      />
                      <PickupInput
                        type="text"
                        placeholder="Parking Location"
                        value={parkingLocation}
                        onChange={e => setParkingLocation(e.target.value)}
                      />
                    </PickupRow>
                  </>
                )}
              </>
            )}
          </ProductCard>

          <SummaryCard>
            {cartItems.length > 0 && (
              <>
                <TotalTable>
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Total</th>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <th>Choose</th>
                      <td>
                        <ResponsiveSelect
                          value={deliveryType}
                          onChange={e => setDeliveryType(e.target.value)}
                        >
                          <option value="Delivery">Delivery</option>
                          <option value="Take-Away">Take-Away</option>
                          <option value="Pick Up From Lot">Pick Up From Lot</option>
                        </ResponsiveSelect>
                      </td>
                    </tr>
                  </tbody>
                </TotalTable>
                <Button
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login to proceed to checkout");
                    } else {
                      if (deliveryType === "Pick Up From Lot") {
                        if (!carNumber.trim() || !carModel.trim() || !parkingLocation.trim()) {
                          toast.error("Please fill in all pick up details before proceeding.");
                          return;
                        }
                      }
                      if (deliveryType === "Take-Away") {
                        router.push({
                          pathname: "/check-out",
                          query: {},
                        }, undefined, { shallow: false, state: { type: "take-away" } });
                      } else {
                        router.push("/check-out");
                      }
                    }
                  }}
                >
                  Proceed to Checkout
                </Button>
              </>
            )}
          </SummaryCard>
        </ContentWrapper>
      </Container>

      <div className="mt-16 text-center mb-8" style={{padding:'15px', color:'#0f172a'}}>
        <h2 className="text-xl font-semibold">Follow Us</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Stay updated with our latest offers, events, and delicious new menu
          items
        </p>
        <div className="d-flex justify-content-center gap-3 pb-5">
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://instagram.com/innoxify"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
              </svg>
              <span className="sr-only">Instagram</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://facebook.com/innoxify"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
              </svg>
              <span className="sr-only">Facebook</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://twitter.com/innoxify"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
              </svg>
              <span className="sr-only">Twitter</span>
            </div>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors"
            href="https://linkedin.com/company/innoxify-solutions"
          >
            <div style={{borderRadius:'5px'}} className="rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="text-primary"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
              </svg>
              <span className="sr-only">LinkedIn</span>
            </div>
          </a>
        </div>
      </div>
    </Layout>
  );
}

export default Cart;
