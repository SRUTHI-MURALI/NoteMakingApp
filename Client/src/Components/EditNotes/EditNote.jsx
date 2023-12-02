import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { editNote, getEditData } from "../AxiosConfig/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image_Url } from "../../../Config/Config";

function EditNote({ noteId }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    try {
      const getData = async (id) => {
        const res = await getEditData(id);
        res.data.notesFind.map((item) => {
          setTitle(item?.title);
          setSummary(item?.summary || null);
          setContent(item?.content || null);
          setImage(item?.image || null);
        });
      };
      getData(noteId);
    } catch (error) {
      toast.error("error fectching data");
    }
  }, [noteId]);

  async function createNewPost(e) {
    e.preventDefault();
   

    {
      const response = await editNote(title, summary, content, noteId);

      if (response.data) {
        setRedirect(true);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/homePage"} />;
  }

  return (
    <Container style={{ marginTop: "8rem" }}>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Row className="justify-content-center align-items-center ">
        <Col
          md={12}
          className="justify-content-center align-items-center text-center"
        >
          <h1>Edit Your note here </h1>
        </Col>
        <Col md={8}>
          <form
            onSubmit={createNewPost}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="summary" className="form-label">
                Summary
              </label>
              <input
                type="text"
                className="form-control"
                id="summary"
                placeholder="Enter summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content
              </label>
              <ReactQuill
                value={content}
                onChange={(value) => setContent(value)}
                placeholder="Write something..."
              />
            </div>
            {image && (
              <div className="mb-3">
                <div className="mt-2 " style={{ height: "4rem" }}>
                  <strong>Current Image:</strong>
                  <img
                    src={`${Image_Url}/${image}`}
                    alt="Current Image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      margin: "1.3rem",
                    }}
                  />
                </div>
              </div>
            )}

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Edit Note
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditNote;
