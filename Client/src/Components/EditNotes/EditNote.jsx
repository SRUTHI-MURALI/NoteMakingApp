import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import {  editNote, getEditData } from "../AxiosConfig/AxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Image_Url} from "../../../Config/Config";

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
        console.log(res.data,'lll');
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
    // if (image) {
    //   const allowedFormats = ["image/jpeg", "image/png"];
    //   if (!allowedFormats.includes(image.type)) {
    //     toast.error("Invalid image format. Please select a JPEG or PNG image.");
    //     return;
    //   }
    // }

    // if (files) {
    //   const allowedPdfFormats = ["application/pdf", "application/docx"];
    //   if (!allowedPdfFormats.includes(files.type)) {
    //     toast.error("Invalid PDF format. Please select a PDF file.");
    //     return;
    //   }
    // }
   
    {
      const response = await editNote(
        title,
        summary,
        content,
       noteId
      );

      if (response.data) {
        setRedirect(true);
      }
    }
  }

//   const imageHandler = async () => {
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "noteImage");
//     formData.append("cloud_name", "dnkc0odiw");
//     const response = await axios.post(`${image_upload_url}`, formData);

//     setCloudinaryImage(response.data.public_id);
//   };

//   const fileHandler = async () => {
//     const formData = new FormData();
//     formData.append("file", files);
//     formData.append("upload_preset", "noteFiles");
//     formData.append("cloud_name", "dnkc0odiw");
//     const response = await axios.post(`${image_upload_url}`, formData);

//     setCloudinaryFile(response.data.public_id);
//   };

  if (redirect) {
    return <Navigate to={"/homePage"} />;
  }

  return (
    <Container style={{marginTop:'8rem'}}>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Row className="justify-content-center align-items-center ">
  <Col md={12} className="justify-content-center align-items-center text-center">
    <h1>Add a new note here </h1>
  </Col>
        <Col md={8}>
          <form onSubmit={createNewPost}style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
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
            {/* <div className="mb-3">
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
            </div> */}
            {/* <div className="mb-3">
              <label htmlFor="file" className="form-label">
                File
              </label>
              <input
                type="file"
                className="form-control"
                id="file"
                onChange={(e) => {
                  const inputElement = e.target;
                  if (inputElement && inputElement.files) {
                    const selectedFile = inputElement.files[0];
                    setFiles(selectedFile); // Update the file state
                  }
                }}
              />
              <label>Allowed formats: PDF</label>
            </div> */}
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
