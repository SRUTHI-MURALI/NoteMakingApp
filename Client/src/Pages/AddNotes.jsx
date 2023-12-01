import React from 'react'
import AddNote from '../Components/AddNotes/AddNote'
import { Container } from 'react-bootstrap'
import Header from '../Components/UserHome/Header'

function AddNotes() {
  return (
    <Container>
        <Header/>
         <AddNote/>
    </Container>
  
  )
}

export default AddNotes
