import React, { useState } from "react";
import "../styles/style.css";

const CategoryData = ({ data }) => {
  const [dataInfo, setDataInfo] = useState(null);
  const newTab = (data) => {
    window.open(`${data}`, "_blank");
  };
  return (
    <div>
      <h3 className="category_title">{data && data[0].category}</h3>
      <div className="categoryData_container">
        {data?.map((val) => (
          <div className="category_data_value" key={val.title}>
            <h5 style={{ cursor: "pointer" }} onClick={() => newTab(val.url)}>
              {val.title}
            </h5>
            <button onClick={() => setDataInfo(val)}>Details</button>
          </div>
        ))}
      </div>
      <div className="categoryData_onClick">
        {dataInfo && (
          <div className="categoryData_div">
            <p>Title: {dataInfo.title}</p>
            <p>URL: {dataInfo.url}</p>
            <p>Category: {dataInfo.category}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryData;
