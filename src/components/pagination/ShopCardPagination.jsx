import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
// import shopCarddata from "../../data/shopCard_dara.json";

// Example items, to simulate fetching from another resources.
// const items = shopCarddata;

// function Items({ currentItems }) {
//   return (
//     <>
//       {currentItems.map((item) => (
//         <div className="col-md-4 col-sm-6" key={item.id}>
//           <div className="food-items2-wrap">
//             <div className="food-img">
//               <img
//                 className="img-fluid"
//                 src={item.image}
//                 alt="h2-food-item-1"
//               />
//               <div className="cart-icon">
//                 <Link href="/cart" legacyBehavior>
//                   <a>
//                     <i className="bi bi-cart-plus" />
//                   </a>
//                 </Link>
//               </div>
//               <div className="pric-tag">
//                 <span>${item.price}</span>
//               </div>
//             </div>
//             <div className="food-content">
//               <ul className="d-flex align-items-center justify-content-center p-0 gap-1">
//                 <li>
//                   <i className="bi bi-star-fill" />
//                 </li>
//                 <li>
//                   <i className="bi bi-star-fill" />
//                 </li>
//                 <li>
//                   <i className="bi bi-star-fill" />
//                 </li>
//                 <li>
//                   <i className="bi bi-star-fill" />
//                 </li>
//                 <li>
//                   <i className="bi bi-star-fill" />
//                 </li>
//               </ul>
//               <h3>
//                 <Link href="/shop-details">{item.title}</Link>
//               </h3>
//             </div>
//           </div>
//         </div>
//       ))}
//     </>
//   );
// }
// function PaginatedItems({ itemsPerPage }) {
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   // Simulate fetching items from another resources.
//   // (This could be items from props; or items loaded in a local state
//   // from an API endpoint with useEffect and useState)
//   const endOffset = itemOffset + itemsPerPage;
//   const currentItems = items.slice(itemOffset, endOffset);
//   const pageCount = Math.ceil(items.length / itemsPerPage);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % items.length;
//     setItemOffset(newOffset);
//   };

//   return (
//     <>
//       <Items currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel={<i className="bi bi-arrow-right" />}
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={2}
//         pageCount={pageCount}
//         previousLabel={<i className="bi bi-arrow-left" />}
//         renderOnZeroPageCount={null}
//         pageClassName="page-item"
//         pageLinkClassName="page-link"
//         previousClassName="page-item"
//         previousLinkClassName="page-link"
//         nextClassName="page-item"
//         nextLinkClassName="page-link"
//         breakClassName="page-item"
//         breakLinkClassName="page-link"
//         containerClassName="pagination"
//         activeClassName="active"
//       />
//     </>
//   );
// }
function Items({ currentItems }) {
  const [currentIntent, setCurrentIntent] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentIntent(localStorage.getItem("navigationIntent"));
    }
  }, []);

  const handleAddToCart = (item) => {
    const stored = localStorage.getItem("cartItems");
    const cartItems = stored ? JSON.parse(stored) : [];
  console.log(item,'itemssss')
    const existingIndex = cartItems.findIndex(
      (cartItem) => cartItem?.product?.id === item?.id
    );
  
    if (existingIndex > -1) {
      cartItems[existingIndex].quantity += 1; // or set to a specific count if you want
    } else {
      cartItems.push({
        product: item,
        quantity: 1,
      });
    }
  
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    toast.success("Product added to cart successfully");
  };

  return (
    <>
      {currentItems.map((item) => (
        <>
        <div className="col-md-3 col-sm-6" key={item.id}>
          <div className="food-items2-wrap">
            <Link href={`/shop-details/${item.id}`}>
            <div className="food-img">
              <img className="img-fluid p-0" src={item.images[0]?.url} alt={item.name} />
              {currentIntent === "order" ? (
                <>
                  <div className="cart-icon">
                    {/* <a
                      onClick={() => handleAddToCart(item)}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="bi bi-cart-plus" />
                    </a> */}
                  </div>
                </>
              ) : (
                <>
                  <div className="batch">
                    <a>{item?.category?.name}</a>
                  </div>
                </>
              )}

              <div className="pric-tag">
                <span style={{color:'#059669'}}>${item.price}</span>
              </div>
            </div>
            </Link>

            <div className="food-content">
            <Link href={`/shop-details/${item.id}`}>
              {/* Stars */}
              {/* <ul className="d-flex align-items-center justify-content-center p-0 gap-1">
                {Array(5)
                  .fill(0)
                  .map((_, idx) => (
                    <li key={idx}>
                      <i className="bi bi-star-fill" />
                    </li>
                  ))}
              </ul> */}
              <h3>
                <Link href={`/shop-details/${item.id}`}>{item.name}</Link>
              </h3>
              <p>
                {(() => {
                  if (!item.description) return null;
                  const words = item.description.split(" ");
                  console.log(words);
                  if (words.length > 8) {
                    return words.slice(0, 8).join(" ") + "...";
                  }
                  return item.description;
                })()}
              </p>
              {item.tags && (
                <div>
                  {item.tags.slice(0, 3).map((tag, idx) => (
                    <span className="tag-badge" key={tag.id || idx}>
                      {tag.name}
                    </span>
                  ))}
                  {item.tags.length > 3 && <span className="tag-badge">+1</span>}
                </div>
              )}
           </Link>
                {/* {currentIntent === "order" && <div className="m-4 mb-0" > <button  onClick={() => handleAddToCart(item)} className="shop-add-cart-button" type="submit"><i class="fa fa-shopping-cart "></i> <span className="ml-5">Add to cart(${item.price})</span> </button> </div> } */}
                {currentIntent === "order" && <div className="m-4 mb-0" > <button  onClick={() => handleAddToCart(item)} className="shop-add-cart-button" type="submit"><i class="fa fa-shopping-cart "></i> <span className="ml-5">Add to cart</span> </button> </div> }
            </div>
            
          </div>
        </div>
      
        </>
      ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, items }) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel={<i className="bi bi-arrow-right" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel={<i className="bi bi-arrow-left" />}
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}

export default PaginatedItems;
