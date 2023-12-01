import React, { useState ,useEffect} from 'react'
import {  Button, Col, Container, Row } from 'react-bootstrap'
import SearchBar from '../SearchBar/SearchBar'
import './Home.css'
import { useNavigate } from 'react-router-dom'
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
    
  return (
    <Container className='body-class'>
         <Row >
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
        
    </Container>
  )
}

export default Body
