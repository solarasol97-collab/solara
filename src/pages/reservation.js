import React, { useEffect, useState } from "react";
import ReservationForm from "../components/category/ReservationForm";
import Breadcrumb from "../components/common/Breadcrumb";
import Layout from "../layout/Layout";

function reservation() {
  const [pageData, setPageData] = useState(null);

  // Access data from sessionStorage
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem('reservationData');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setPageData(parsedData);
        
        console.log("Reservation data from sessionStorage:", parsedData);
        
        // You can use this data to pre-fill the reservation form
        if (parsedData.source === "menu-cards") {
          console.log("User came from menu cards to make reservation");
          // You could pre-fill form fields, show different content, etc.
        }
        
        // Clear the data after using it (optional)
        // sessionStorage.removeItem('reservationData');
      }
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  }, []);

  return (
    <Layout showFooter={false} isCustomHeader={true} customHeaderClass='customHeaderStyle'>
      {/* <Breadcrumb pageName="Reservation" pageTitle="Reservation" /> */}
      
      {/* Show source information */}
      {pageData && pageData.source === "menu-cards" && (
        <div className="container mt-4">
          <div className="alert alert-success" role="alert">
            <strong>Welcome!</strong> You're making a reservation from our main page.
            {pageData.userPreferences && (
              <span className="ms-2">We'll help you find the perfect table!</span>
            )}
          </div>
        </div>
      )}

      {/* Show user preferences if available */}
      {pageData && pageData.userPreferences && (
        <div className="container mt-3">
          <div className="alert alert-info" role="alert">
            <strong>Your Preferences:</strong>
            <ul className="mb-0 mt-2">
              <li>Preferred Time: {pageData.userPreferences.preferredTime}</li>
              <li>Party Size: {pageData.userPreferences.partySize} people</li>
              {pageData.userPreferences.specialRequests && (
                <li>Special Requests: {pageData.userPreferences.specialRequests}</li>
              )}
            </ul>
          </div>
        </div>
      )}

      <div>
        {/* ========== Reservation end============= */}
        <ReservationForm />
        {/* ========== Reservation end============= */}

        
      </div>
    </Layout>
  );
}

export default reservation;
