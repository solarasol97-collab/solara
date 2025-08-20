import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

function TagBlogWidget({ setCategoryId }) {
  const [categories, setCategories] = useState([]);
  const [activeCatId, setActiveCatId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data.categories);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (id) => {
    setCategoryId(id);
    setActiveCatId(id);
  };

  return (
    <div className="single-widgets widget_egns_tag">
      {/* <div className="widget-title">
        <h3>Categories</h3>
      </div> */}
      <ul className="wp-block-tag-cloud">
        {/* "All" category */}
        <li>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleCategoryClick("");
            }}
            className={activeCatId === null ? "active-tag" : ""}
          >
            All
          </a>
        </li>

        {categories.map((cat) => (
          <li key={cat.id}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(cat.id);
              }}
              className={activeCatId === cat.id ? "active-tag" : ""}
            >
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagBlogWidget;
