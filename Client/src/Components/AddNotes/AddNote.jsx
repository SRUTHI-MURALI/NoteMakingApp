import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { addNotes } from '../AxiosConfig/AxiosConfig';

function AddNote() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);

  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  async function createNewPost(e) {
    e.preventDefault();

    

    const response= await addNotes(title,summary,content,files,parseData._id)

    if (response.data.newNote) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/homePage'} />;
  }

  return (
    <Container className='mt-5'>
      <form onSubmit={createNewPost}>
        <Row>
          <Col>
            <input
              type="title"
              placeholder={'Title'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Col>
         
        </Row>
        <Row>
        <Col>
            <input
              type="summary"
              placeholder={'Summary'}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ReactQuill
              value={content}
              onChange={(value) => setContent(value)}
              placeholder="Write something..."
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <input type="file" onChange={(e) => setFiles(e.target.files)} />
          </Col>
        </Row>
        <Row>
          <Col >
            <button style={{ marginTop: '5px' }}>Create post</button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default AddNote;
