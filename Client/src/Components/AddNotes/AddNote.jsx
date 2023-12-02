import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { addNotes } from "../AxiosConfig/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { image_upload_url } from "../../../Config/Config";

function AddNote() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [cloudinaryImage, setCloudinaryImage] = useState("");
  const [cloudinaryFile, setCloudinaryFile] = useState("");

  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  async function createNewPost(e) {
    e.preventDefault();
    if (image) {
      const allowedFormats = ["image/jpeg", "image/png"];
      if (!allowedFormats.includes(image.type)) {
        toast.error("Invalid image format. Please select a JPEG or PNG image.");
        return;
      }
    }

    if (files) {
      const allowedFileFormats = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedFileFormats.includes(files.type)) {
        toast.error("Invalid file format. Please select a PDF or DOCX file.");
        return;
      }
    }

    await imageHandler();
    await fileHandler();

    if (cloudinaryFile && cloudinaryImage) {
      const response = await addNotes(
        title,
        summary,
        content,
        cloudinaryImage,
        cloudinaryFile,
        parseData._id
      );

      if (response.data.newNote) {
        setRedirect(true);
      }
    }
  }

  const imageHandler = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "noteImage");
    formData.append("cloud_name", "dnkc0odiw");
    const response = await axios.post(`${image_upload_url}`, formData);

    setCloudinaryImage(response.data.public_id);
  };

  const fileHandler = async () => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "noteFiles");
    formData.append("cloud_name", "dnkc0odiw");
    const response = await axios.post(`${image_upload_url}`, formData);

    setCloudinaryFile(response.data.public_id);
    console.log(response.data.public_id, "jjjj");
  };

  if (redirect) {
    return <Navigate to={"/homePage"} />;
  }

  return (
    <Container style={{ marginTop: "6rem" }}>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Row className="justify-content-center align-items-center ">
        <Col
          md={12}
          className="justify-content-center align-items-center text-center"
        >
          <h1>Add a new note here </h1>
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

            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(e) => {
                  const inputElement = e.target;
                  if (inputElement && inputElement.files) {
                    const selectedFile = inputElement.files[0];
                    setImage(selectedFile);
                  }
                }}
              />
              <label>Allowed formats: JPEG/PNG</label>
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                File
              </label>
              <input
                type="file"
                id="file"
                className="form-control"
                onChange={(e) => {
                  const inputElement = e.target;
                  if (
                    inputElement &&
                    inputElement.files &&
                    inputElement.files.length > 0
                  ) {
                    const selectedFile = inputElement.files[0];
                    setFiles(selectedFile);
                  }
                }}
              />
              <label>Allowed formats: PDF</label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Create post
              </button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddNote;
