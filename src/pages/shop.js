// import React, { useEffect, useState } from "react";
// import BannerBlogWidget from "../components/blog/BannerBlogWidget";
// import CategoryBlogWidget from "../components/blog/CategoryBlogWidget";
// import SearchBlogWidget from "../components/blog/SearchBlogWidget";
// import TagBlogWidget from "../components/blog/TagBlogWidget";
// import Breadcrumb from "../components/common/Breadcrumb";
// import PaginatedItems from "../components/pagination/ShopCardPagination";
// import ShopNewItem from "../components/shop/ShopNewItem";
// import Layout from "../layout/Layout";

// function shop() {
//   const [showCart, setShowCart] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const intent = localStorage.getItem("navigationIntent");
//       console.log("Intent from localStorage:", intent);

//       if (intent === "order") {
//         setShowCart(true);
//       } else {
//         setShowCart(false);
//       }

//       // Clean up localStorage after processing
//       // localStorage.removeItem("navigationIntent");
//     }
//   }, []); // Empty dependency array for one-time execution on mount
//   console.log(showCart, "showCart");
//   return (
//     <Layout>
//       <Breadcrumb pageName="Shop" pageTitle="Shop" />
//       <div className="Shop-pages pt-120 mb-120">
//         <div className="container">
//           <div className="row g-lg-5 gy-5">
//             {/* <div className="col-lg-4">
//               <div className="widget-area">
//                 <BannerBlogWidget />
//                 <SearchBlogWidget />
//                 <ShopNewItem />
//                 <CategoryBlogWidget />
//                 <TagBlogWidget />
//               </div>
//             </div> */}
//             <div className="col-lg-12">
//               <div className="row g-4">
//                 <div className="widget-area">
//                   {/* <BannerBlogWidget /> */}
//                   <SearchBlogWidget />
//                   {/* <ShopNewItem /> */}
//                   {/* <CategoryBlogWidget /> */}
//                   <TagBlogWidget />
//                 </div>
//                 <PaginatedItems itemsPerPage={8} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// export default shop;
import React, { useEffect, useState } from "react";
// import BannerBlogWidget from "../components/blog/BannerBlogWidget";
// import CategoryBlogWidget from "../components/blog/CategoryBlogWidget";
import SearchBlogWidget from "../components/blog/SearchBlogWidget";
import TagBlogWidget from "../components/blog/TagBlogWidget";
import Breadcrumb from "../components/common/Breadcrumb";
import PaginatedItems from "../components/pagination/ShopCardPagination";
import Layout from "../layout/Layout";
import axios from "axios";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/products?search=${search}&categoryId=${categoryId}`
      );
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };
console.log(products, 'products')
  useEffect(() => {
    fetchProducts();
  }, [search, categoryId]);

  return (
    <Layout showFooter={false} isCustomHeader={true} customHeaderClass='customHeaderStyle'>
      {/* <Breadcrumb pageName="Shop" pageTitle="Shop" /> */}
      <div className="Shop-pages pt-120">
      <h4 className="text-center mb-5" style={{color:'#0f172a'}}> Feature Products</h4>
        <div className="container">
          <div className="row g-lg-5 gy-5">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="widget-area">
                  <SearchBlogWidget setSearch={setSearch} />
                  {/* <CategoryBlogWidget setCategoryId={setCategoryId} /> */}
                  <TagBlogWidget setCategoryId={setCategoryId}/>
                </div>
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <PaginatedItems itemsPerPage={6} items={products} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Shop;
