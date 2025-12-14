// import React, { useState, useEffect } from "react";
// import Breadcrumb from "../../components/common/Breadcrumb";
// import Layout from "../../layout/Layout";
// import toast from "react-hot-toast";
// import { useRouter } from "next/router";
// import styled from "styled-components";
// import { DoorDashClient } from "@doordash/sdk";



// // const CenteredBox = styled.div`
// //   display: flex;
// //   flex-direction: column;
// //   align-items: center;
// //   justify-content: center;
// //   min-height: 60vh;
// // `;
// // const CenteredForm = styled.div`
// //   width: 100%;
// //   max-width: 500px;
// //   margin: 0 auto;
// //   background: #fff;
// //   border-radius: 0.5rem;
// //   box-shadow: 0 2px 16px rgba(0,0,0,0.07);
// //   padding: 2rem 1.5rem;
// // `;

// // const Overlay = styled.div`
// //   position: fixed;
// //   top: 0; left: 0;
// //   width: 100vw; height: 100vh;
// //   background: rgba(0,0,0,0.55);
// //   z-index: 9999;
// //   display: flex;
// //   align-items: center;
// //   justify-content: center;
// // `;

// // const ModalBox = styled.div`
// //   background: #fff;
// //   width: 90%;
// //   max-width: 420px;
// //   border-radius: 12px;
// //   padding: 2rem;
// //   box-shadow: 0 2px 18px rgba(0,0,0,0.25);
// //   animation: fadeIn 0.2s ease-out;

// //   @keyframes fadeIn {
// //     from { opacity: 0; transform: scale(0.95); }
// //     to { opacity: 1; transform: scale(1); }
// //   }
// // `;

// // const Title = styled.h3`
// //   margin: 0 0 1rem 0;
// //   font-size: 1.25rem;
// // `;

// // const ErrorBox = styled.ul`
// //   background: #fee2e2;
// //   padding: 1rem;
// //   margin-bottom: 1rem;
// //   border-radius: 6px;

// //   li {
// //     color: #b91c1c;
// //     font-size: 0.9rem;
// //     margin-bottom: 4px;
// //   }
// // `;

// // const Text = styled.p`
// //   margin-bottom: 1.5rem;
// //   color: #111827;
// // `;

// // const Actions = styled.div`
// //   display: flex;
// //   justify-content: flex-end;
// //   gap: 1rem;
// // `;

// // const ConfirmBtn = styled.button`
// //   background: #16a34a;
// //   color: white;
// //   padding: 0.6rem 1.4rem;
// //   border: none;
// //   border-radius: 6px;
// //   cursor: pointer;
// // `;

// // const CancelBtn = styled.button`
// //   background: #dc2626;
// //   color: white;
// //   padding: 0.6rem 1.4rem;
// //   border: none;
// //   border-radius: 6px;
// //   cursor: pointer;
// // `;


// function DoorDashTracking() {
//   const [dashOrderId, setDashOrderId] = useState(null);
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//   setDashOrderId(id);
//   }, []);

//   console.log(id,'id')


//   return (
//     <Layout showFooter={false} isCustomHeader={true} customHeaderClass='customHeaderStyle'>
  

//       <div className="checkout-section pt-120 pb-120">
//         <div className="container">
//           Hello Tracking Page {dashOrderId}
//         </div>
//       </div>
//     </Layout>
//   );
// }





import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/common/Breadcrumb";
import Layout from "../../layout/Layout";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";

const TrackingContainer = styled.div`
  min-height: 100vh;
  background: #ffffffff;
  color: #fff;
  padding: 8rem 1rem;
`;

const TrackingCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 3rem 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  background: #fff !important;

  h1 {
    font-size: 2rem;
    color: #111827;
    margin: 0 0 0.5rem 0;
    font-weight: 700;
  }

  p {
    color: #6b7280;
    font-size: 1rem;
    margin: 0;
  }
`;

const OrderIdBox = styled.div`
  background: #0f172a;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;

  label {
    display: block;
    font-size: 0.875rem;
    color: #ffffffff;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    color: #ffffffff;
    margin: 0;
    font-weight: 700;
    font-family: 'Courier New', monospace;
  }
`;

const StatusTimeline = styled.div`
  margin: 3rem 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #e5e7eb;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
  padding-left: 60px;

  &::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 6px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: ${props => props.completed ? '#10b981' : '#d1d5db'};
    border: 3px solid white;
    box-shadow: 0 0 0 2px ${props => props.completed ? '#10b981' : '#d1d5db'};
  }

  h4 {
    margin: 0 0 0.25rem 0;
    color: #111827;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const TrackingBtn = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MenuBtn = styled(Link)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  color: #111827;
  padding: 0.875rem 1.5rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;

  &:hover {
    background: #e5e7eb;
    border-color: #d1d5db;
    transform: translateY(-2px);
  }
`;

const InfoBox = styled.div`
  background: #eff6ff;
  border-left: 4px solid #0084ff;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 2rem;

  p {
    margin: 0;
    color: #1e40af;
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;

function DoorDashTracking() {
  const [dashOrderId, setDashOrderId] = useState(null);
  const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      setDashOrderId(id);
    }
  }, [id]);

  useEffect(() => {
    getStatus();
  }, [dashOrderId ])
  
  const getStatus = async () => {
  const token = localStorage.getItem("token")
      const payload = { orderId: dashOrderId };
      const res =  await fetch('/api/doordash-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
         },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      console.log(data,'data')
      setData(data?.response);
  }

  // const handleRefreshTracking = async () => {
  //   setLoading(true);
  //   try {
  //     // Simulate API call to refresh tracking status
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     toast.success("Tracking updated!");
  //   } catch (err) {
  //     toast.error("Failed to refresh tracking");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Layout showFooter={false} isCustomHeader={true} customHeaderClass="customHeaderStyle">
      {/* <TrackingContainer>
        <TrackingCard>
          <Header>
            <h1>📍 Order Tracking</h1>
            <p>Track your delivery in real-time</p>
          </Header>

          {dashOrderId && (
            <>
              <OrderIdBox>
                <label>Order ID</label>
                <p>{dashOrderId}</p>
              </OrderIdBox>

              <InfoBox>
                <p>✓ Your order is on the way! You'll receive updates as it progresses through each stage.</p>
              </InfoBox>

              <StatusTimeline>
                <TimelineItem completed>
                  <h4>Order Confirmed</h4>
                  <p>Just now</p>
                </TimelineItem>

                <TimelineItem >
                  <h4>Preparing Order</h4>
                  <p></p>
                </TimelineItem>

                <TimelineItem >
                  <h4>Out for Delivery</h4>
                  <p></p>
                </TimelineItem>

                <TimelineItem>
                  <h4>Arriving Soon</h4>
                  <p></p>
                </TimelineItem>

                <TimelineItem>
                  <h4>Delivered</h4>
                  <p></p>
                </TimelineItem>
              </StatusTimeline>

              <ButtonGroup>
                <TrackingBtn onClick={handleRefreshTracking} disabled={loading}>
                  {loading ? "Refreshing..." : "🔄 Refresh Status"}
                </TrackingBtn>
                <MenuBtn href="/">
                  🏠 Back to Menu
                </MenuBtn>
              </ButtonGroup>
            </>
          )}

          {!dashOrderId && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Loading order details...</p>
              <MenuBtn href="/">Back to Menu</MenuBtn>
            </div>
          )}
        </TrackingCard>
      </TrackingContainer> */}
      {
        data && <TrackingContainer>
        <TrackingCard>
          <Header>
            <h1>📍 Order Tracking</h1>
            <p>Track your delivery in real-time</p>
          </Header>

          {dashOrderId && (
            <>
              <OrderIdBox>
                <label>Order ID</label>
                <p>{dashOrderId}</p>
              </OrderIdBox>

              <InfoBox>
                <p>✓ Your order is placed successfully! You can view updates by clicking on the below url as it progresses through each stage.</p>
              </InfoBox>
               <a href={data?.tracking_url} target="_blank" rel="noopener noreferrer" ><p> <b style={{color:'black'}}>Track on Doordash here :-</b> {data?.tracking_url}</p></a> 


            </>
          )}

          {!dashOrderId && (
            <div style={{ textAlign: "center", padding: "2rem 0" }}>
              <p style={{ color: "#6b7280", marginBottom: "1rem" }}>Loading order details...</p>
              <MenuBtn href="/">Back to Menu</MenuBtn>
            </div>
          )}
        </TrackingCard>
      </TrackingContainer>
      }
         
    </Layout>
  );
}

export default DoorDashTracking;

