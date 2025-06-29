// src/components/Portfolio/Portfolio.jsx
import React, { useState, useEffect } from "react";
import "./portfolio.css";
import pb from "../../pocketbase"; // Adjust the path if needed

const Portfolio = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch portfolio data
        const works = await pb.collection("WorkMenu").getFullList();
        setMenuItems(works);
        setFilteredItems(works);

        // Fetch categories
        const cats = await pb.collection("WorkCategory").getFullList();
        const catNames = cats.map((c) => c.Name);
        setCategories(["Everything", ...catNames]);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchData();
  }, []);

  const filterItem = (categoryItem) => {
    if (categoryItem === "Everything") {
      setFilteredItems(menuItems);
    } else {
      const updatedItems = menuItems.filter(
        (item) => item.category === categoryItem
      );
      setFilteredItems(updatedItems);
    }
  };

  return (
    <section className="work container section" id="work">
      <h2 className="section__title">Recent Works</h2>

      <div className="work__filters">
        {categories.map((cat, index) => (
          <span
            className="work__item"
            key={index}
            onClick={() => filterItem(cat)}
          >
            {cat}
          </span>
        ))}
      </div>

      <div className="work__container grid">
        {filteredItems.map((elem) => {
          const { id, title, category, image } = elem;
          return (
            <div className="work__card" key={id}>
              <div className="work__thumbnail">
                <img
                  src={pb.files.getURL(elem, elem.image)}
                  alt={title}
                  className="work__img"
                />
                <div className="work__mask"></div>
              </div>

              <span className="work__category">{category}</span>
              <h3 className="work__title">{title}</h3>
              <a href="#" className="work__button">
                <i className="icon-link work__button-icon"></i>
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
