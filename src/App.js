import { useState } from "react";
import CategoryList from "./components/CategoryList";
import Modal from "./components/Modal";
import "./styles/style.css";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="main_heading">
        <h4 className="title">Bookmark Manager</h4>
        <button onClick={() => setIsModalOpen(true)}>Add Bookmark</button>
      </div>
      <CategoryList />
      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
}

export default App;
