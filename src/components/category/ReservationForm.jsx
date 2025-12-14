// import React, { useState } from "react";
// import ReactDatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// function ReservationForm() {
//   const [startDate1, setStartDate1] = useState(false);
//   return (
//     <div className="container">
//       <div className="reservation-1 mb-120">
//         <div className="row d-flex align-items-center justify-content-center mb-40">
//           <div className="col-lg-8">
//             <div className="section-title text-center">
//               <span>
//                 <img
//                   className="left-vec"
//                   src="assets/images/icon/sub-title-vec.svg"
//                   alt="sub-title-vec"
//                 />
//                 Online Reserve
//                 <img
//                   className="right-vec"
//                   src="assets/images/icon/sub-title-vec.svg"
//                   alt="sub-title-vec"
//                 />
//               </span>
//               <h2>For Online Reservation</h2>
//             </div>
//           </div>
//         </div>
//         <div className="row justify-content-center">
//           <div className="col-lg-10">
//             <form>
//               <div className="row justify-content-center">
//                 <div className="col-lg-6 col-md-6 mb-25">
//                   <div className="form-inner">
//                     <input type="text" placeholder="Name*" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 mb-25">
//                   <div className="form-inner">
//                     <input type="text" placeholder="Phone*" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 mb-25">
//                   <div className="form-inner">
//                     <input type="text" placeholder="People" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 mb-25">
//                   <div className="form-inner date-icon">
//                     <ReactDatePicker
//                       selected={startDate1}
//                       onChange={(date) => setStartDate1(date)}
//                       placeholderText="Check In"
//                       className="claender"
//                     />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 mb-25">
//                   <div className="form-inner">
//                     <select className="time-select">
//                       <option value="time">08 : 00 am</option>
//                       <option>09 : 00 am</option>
//                       <option value={1}>10 : 00 am</option>
//                       <option value={2}>11 : 00 am</option>
//                       <option value={3}>12 : 00 pm</option>
//                       <option value={4}>01 : 00 pm</option>
//                       <option value={5}>02 : 00 pm</option>
//                       <option value={6}>03 : 00 pm</option>
//                       <option value={7}>04 : 00 pm</option>
//                       <option value={8}>05 : 00 pm</option>
//                       <option value={9}>06 : 00 pm</option>
//                       <option value={10}>07 : 00 pm</option>
//                       <option value={11}>08 : 00 pm</option>
//                       <option value={12}>09 : 00 pm</option>
//                       <option value={13}>10 : 00 pm</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6 sm-mb-25">
//                   <div className="form-inner">
//                     <input type="email" placeholder="Email" />
//                   </div>
//                 </div>
//                 <div className="col-lg-6 col-md-6">
//                   <div className="form-inner">
//                     <button type="submit">Reserve Now</button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f6;
  padding: 2rem 1rem;
`;

const Header = styled.div`
  margin-bottom: 5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #000000;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #64748b;
  text-align: center;
  margin-top: 0.25rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 36rem; /* Increased width to match the desired UI */
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.375rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  // gap: 1rem;
`;

const SectionText = styled.div`
  font-size: 1.5rem;
   font-weight: 600;
  color: #000000;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  display: block;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  background-size: 1.5em;
  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const DatePickerWrapper = styled.div`
  width: 100%;
  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    &:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
    }
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #0f172a;
  color: white;
  border-radius: 0.375rem;
  border: none;
  font-weight: 500;
  &:hover {
    // background-color: blue;
    background-color: #0f172a;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

function ReservationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    guests: "",
    date: null,
    time: "",
    specialRequest:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Reservation submitted:", formData);
        try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData,specialRequest:formData.specialRequest || ""}),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      window.location.href = "/shop";
      // Optionally redirect
    } catch (err) {
      console.error('Error submitting reservation:', err);
      }
    // Add your submission logic here
  };

  return (
    <Container>
      <Header>
        {/* <Title>Reserve a Table</Title> */}
        {/* <Subtitle>Book your dining experience in advance and skip the wait</Subtitle> */}
      </Header>
      <Card>
        <SectionText >Table Reservation</SectionText>
        <p className="text-sm text-gray-500">Please fill out the form below to make your reservation.</p>
        <Form onSubmit={handleSubmit} style={{fontSize:'14px'}}>
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <Grid>
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="(123) 456-7890"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>
          </Grid>
          <div>
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              type="text"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              placeholder="Enter number of people"
            />
          </div>
          <Grid>
            <div>
              <Label htmlFor="date">Date</Label>
              <DatePickerWrapper>
                <ReactDatePicker
                  selected={formData.date}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                />
              </DatePickerWrapper>
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              >
                <option value="" disabled>Select a time</option>
                <option value="08:00">08:00 am</option>
                <option value="09:00">09:00 am</option>
                <option value="10:00">10:00 am</option>
                <option value="11:00">11:00 am</option>
                <option value="12:00">12:00 pm</option>
                <option value="13:00">01:00 pm</option>
                <option value="14:00">02:00 pm</option>
                <option value="15:00">03:00 pm</option>
                <option value="16:00">04:00 pm</option>
                <option value="17:00">05:00 pm</option>
                <option value="18:00">06:00 pm</option>
                <option value="19:00">07:00 pm</option>
                <option value="20:00">08:00 pm</option>
                <option value="21:00">09:00 pm</option>
                <option value="22:00">10:00 pm</option>
              </Select>
            </div>
          </Grid>
          <div>
              <Label htmlFor="specialRequest">Special Requests</Label>
              <Input
                 type="text"
                 id="specialRequest"
                 name="specialRequest"
               value={formData.specialRequest}
               onChange={handleChange}
               placeholder="Any dietary restrictions or special occasions?"
             />
            </div>
          <Button type="submit">Confirm Reservation</Button>
        </Form>
      </Card>

        <div className="mt-16 text-center mb-8 mt-5" style={{color:'#0f172a'}}>
        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
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
            <div style={{borderRadius:'5px'}} className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="h-10 w-10 text-primary"
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
            <div style={{borderRadius:'5px'}} className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="h-6 w-6 text-primary"
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
            <div style={{borderRadius:'5px'}} className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 512 512"
                className="h-6 w-6 text-primary"
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
            <div style={{borderRadius:'5px'}} className="h-12 w-12 rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary/10 transition-all">
              <svg
                stroke="currentColor"
                fill="black"
                stroke-width="0"
                viewBox="0 0 448 512"
                className="h-6 w-6 text-primary"
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
    </Container>
  );
}

export default ReservationForm;