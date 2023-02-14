import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "../styles/write.css";
import moment from "moment";
import axios from "axios";

function Write() {
  //state must be defined before hooks to be used.
  const state = useLocation().state;
  const [title, setTitle] = useState(state?.title || null);
  const [value, setValue] = useState(state?.desc || null);
  const [cat, setCat] = useState(state?.cat || null);
  const { currentUser } = useContext(AuthContext);
  const hiddenFileInput = React.useRef(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser == null) {
      navigate("/");
    }
  }, [currentUser]);

  const uplaod = async () => {
    if (file !== null) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/upload", formData);
        console.log("in upload " + res.data.downloadURL);
        return res.data.downloadURL;
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handelClick = async (e) => {
    e.preventDefault();
    const imgUrl = await uplaod();
    // console.log("in submit " + imgUrl)
    try {
      state
        ? await axios.put(`/books/${state.id}`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : state?.img,
        })
        : await axios.post(`/books/`, {
          title,
          desc: value,
          cat,
          img: file ? imgUrl : null,
          date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });
      navigate("/");
    } catch (err) {
      console.log(err);
      setError("Empty fileds are not allowed!");
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      {currentUser ? (
        <div className="main-div-write">
          <h1 className="title-write">Add new book</h1>
          <label className="label-write">Title</label>
          <input
            className="input-write"
            type={"text"}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <label className="label-write">Description</label>
          <textarea
            className="input-write"
            type={"text"}
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <label className="label-write">Category</label>
          <select className="select-write" onChange={(e) => setCat(e.target.value)}value={cat} >
            <option value={null}> Choose category</option>
            <option value={"Action and adventure"}>Action and adventure</option>
            <option value={"Alternate history"}>Alternate history</option>
            <option value={"Anthology"}>Anthology</option>
            <option value={"Children"}>Children</option>
            <option value={"Classic"}>Classic</option>
            <option value={"Drama"}>Drama</option>
            <option value={"Sport and leisure"}>Sport and leisure</option>
            <option value={"Crime"}>Crime</option>
            <option value={"Fantasy"}>Fantasy</option>
            <option value={"Horror"}>Horror</option>
            <option value={"Mystery"}>Mystery</option>
            <option value={"Poetry"}>Poetry</option>
            <option value={"Political thriller"}>Political thriller</option>
            <option value={"Romance"}>Romance</option>
            <option value={"Satire"}>Satire</option>
            <option value={"Science fiction"}>Science fiction</option>
            <option value={"Short story"}>Short story</option>
            <option value={"Business/economics"}>Business/economics</option>
            <option value={"Crafts/hobbies"}>Crafts/hobbies</option>
            <option value={"Cookbook"}>Cookbook</option>
            <option value={"Diary"}>Diary</option>
            <option value={"Dictionary"}>Dictionary</option>
            <option value={"Thriller"}>Thriller</option>
            <option value={"Western"}>Western</option>
            <option value={"Art/architecture"}>Art/architecture</option>
            <option value={"Autobiography"}>Autobiography</option>
            <option value={"Biogrphy"}>Biogrphy</option>
            <option value={"Encyclopedia"}>Encyclopedia</option>
            <option value={"Health/fitness"}>Health/fitness</option>
            <option value={"History"}>History</option>
            <option value={"Humor"}>Humor</option>
            <option value={"Journal"}>Journal</option>
            <option value={"Philosophy"}>Philosophy</option>
            <option value={"Religion"}>Religion</option>
            <option value={"Science"}>Science</option>
          </select>
          <label className="label-write">Image</label>
          <>
            <button onClick={handleClick} className="button-write">
              Upload image
            </button>
            <input
              ref={hiddenFileInput}
              style={{ display: "none" }}
              type={"file"}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </>
          {file ? <p className="image-text">{file.name}</p> : null}
          <p className="error-write">{error}</p>
          <button className="button-write" onClick={handelClick}>
            Publish
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Write;
