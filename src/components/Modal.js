import React from "react";
import { useState } from "react";
import "../styles/style.css";
const Modal = ({ isModalOpen, setIsModalOpen }) => {
  const localData = localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [];

  const [clickIcon, setClickIcon] = useState(false);
  const [error, setError] = useState();
  const [input, setInput] = useState({
    title: "",
    url: "",
    category: "",
  });

  const cat = Array.from(new Set(localData.map((a) => a.category))).map(
    (id) => {
      return localData.find((a) => a.category === id);
    }
  );

  const handleChange = (e) => {
    const newInput = { ...input };
    if (e.target.name === "title") {
      if (e.target.value.length > 30) {
        setError("Title shouldn't exceed 30 character");
      } else {
        setError("");
        newInput[e.target.name] = e.target.value;
      }
    }
    if (e.target.name === "category") {
      if (cat?.map((data) => data === e.target.value)) {
        setError("Category already exist");
      } else {
        setError("");
        newInput[e.target.name] = e.target.value;
      }
    }
    if (e.target.name === "url") {
      if (
        /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
          e.target.value
        )
      ) {
        setError("");
        newInput[e.target.name] = e.target.value;
      } else {
        setError("URL not valid");
      }
    }
    setInput(newInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = [...localData, input];
    localStorage.setItem("data", JSON.stringify(newData));
    setClickIcon(false);
    document.getElementById("input_form").reset();
  };

  return (
    <div className="modal">
      <div className="modal_container">
        <form className="modal_form" id="input_form" onSubmit={handleSubmit}>
          <h4>Add Bookmark</h4>
          <input
            className="modal_input"
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            className="modal_input"
            type="text"
            name="url"
            onChange={handleChange}
            placeholder="Url"
            required
          />
          <div>
            {clickIcon ? (
              <input
                className="modal_input"
                type="text"
                name="category"
                onChange={handleChange}
                placeholder="Category"
                required
              />
            ) : (
              <select
                name="category"
                onChange={handleChange}
                className="modal_input"
                required
              >
                {cat.map((ct) => (
                  <option key={ct.category} value={ct.category}>
                    {ct.category}
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={() => setClickIcon(true)}
              className="modal_button"
            >
              +
            </button>
          </div>
          <p>{error}</p>
          <div className="modal_action_button">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="action_button"
            >
              Cancel
            </button>
            <button type="submit" className="action_button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
