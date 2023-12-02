import React from 'react';
import {  useParams } from 'react-router-dom';
import EditNote from '../Components/EditNotes/EditNote';
import Header from '../Components/UserHome/Header';

function EditNotes() {
  
  const { id } = useParams();
  console.log(id, 'params');

  return (
    <div>
      <Header/>
      <EditNote noteId={id}/>
    </div>
  );
}

export default EditNotes;
