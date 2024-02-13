import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Write.css";

function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result.split(',')[1];
      setImage(base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, image }),
      });

      if (response.ok) {
        console.log("Blog data saved successfully");
        setTitle("");
        setContent("");
        setImage(null);
      } else {
        console.error("Failed to save blog data");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <nav className="navbar-write">
        <img id="icon" src={require("../icons/movie-logo.png")} alt="Icon" />
        <Link id="login" className="Sign-Up" to="/Home">
          Home
        </Link>
      </nav>
      <div className="container-write">
        <div className="form-container-write">
          <div>
            
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              className="write-input"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="content">Content:</label>
            <textarea
              id="content"
              className="write-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="image">Upload Image:</label>
            <input
              type="file"
              className="write-input"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button className='write' onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default Write;
