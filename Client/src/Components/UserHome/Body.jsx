import React, { useState } from 'react'
import {  Button, Col, Container, Row } from 'react-bootstrap'
import SearchBar from '../SearchBar/SearchBar'
import './Home.css'

function Body() {
    const [serachedNote,setSearchedNote]= useState()
    
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
