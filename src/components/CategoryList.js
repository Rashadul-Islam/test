import React, { useEffect } from "react";
import { useState } from "react";
import CategoryData from "./CategoryData";

const CategoryList = () => {
  const data = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];

  const [getData, setGetData] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    let temp = [];
    for (let e of data) {
      !temp[e.category] ? (temp[e.category] = [e]) : temp[e.category].push(e);
    }
    setGetData(temp);
    // eslint-disable-next-line
  }, []);

  const cat = Array.from(new Set(data?.map((a) => a.category)))?.map((id) => {
    return data?.find((a) => a.category === id);
  });

  useEffect(() => {
    let newArr = [];
    for (let i = 0; i < cat.length; i++) {
      newArr.push(getData[`${cat[i].category}`]);
    }
    setResult(newArr);
    // eslint-disable-next-line
  }, [getData]);

  return (
    <div>
      {result?.map((single, i) => (
        <CategoryData key={i} data={single} />
      ))}
    </div>
  );
};

export default CategoryList;
