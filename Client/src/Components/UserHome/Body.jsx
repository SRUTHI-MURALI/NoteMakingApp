import React, { useState ,useEffect} from 'react'
import {  Button, Card, Col, Container, Row } from 'react-bootstrap'
import SearchBar from '../SearchBar/SearchBar'
import './Home.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotes } from '../AxiosConfig/AxiosConfig'

function Body() {
    const [serachedNote,setSearchedNote]= useState()
    const [allNotes,setAllNotes]= useState([])
    const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;


    const navigate=useNavigate()

    const handleAddNote = (e)=>{
        e.preventDefault()
        navigate("/addNotes")
    }

  useEffect(()=>{
    try {
      const notes= async(userId)=>{
        const res= await getNotes(userId) 
        console.log(res.data.notesFind,'pppp');
        setAllNotes(res.data.notesFind)
      }
      notes(parseData._id)
    } catch (error) {
      toast.error("Error fetching notes")
    }
    },[])

    console.log(allNotes.map((e)=>{
      console.log(e.title,'ii');
    }));

    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
      return formattedDate;
    }
    

  return (
    <Container className='body-class'>
         <Row className='mb-5'>
          <Col xs={12} md={6} className="float-left ">
            
           <SearchBar setSearchedNote={setSearchedNote}/>
          </Col>
          <Col xs={12} md={6} >
            
            <Button
              className="float-end add-button"
              variant="info"
              onClick={handleAddNote}
              
            >
              {" "}
              Add a Note{" "}
            </Button>
          </Col>
        </Row>
        <Row>
        {allNotes ? (
  allNotes.map((notes) => (
    <React.Fragment key={notes._id}>
      <Col xs={6} className='mt-3'>
        <Link
          style={{ textDecoration: "none" }}
          to={`/noteDetails/${notes?._id}`}
        >
           <div style={{ width: "15rem", height: "16rem" }}>

          <Card.Img
                        style={{ height: "14rem" }}
                        variant="top"
                        
                        // src={${Image_Url}/${tutor?.photo}}
                      />
        </div>
        </Link>
      </Col>
      <Col xs={6} className='mt-5'>
  <h3 style={{ marginBottom: '10px', fontWeight: 'bold' }}>{notes?.title}</h3>
  <p style={{ marginBottom: '5px' }}>{notes?.summary}</p>
  <p style={{ color: 'gray' }}>{formatDate(notes?.createdAt)}</p>
</Col>

    </React.Fragment>
  ))
) : null}


        </Row>
        
    </Container>
  )
}

export default Body
