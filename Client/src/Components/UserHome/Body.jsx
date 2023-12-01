import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteNote, getNotes, tagNote, untagNote } from "../AxiosConfig/AxiosConfig";
import { Image_Url } from "../../../Config/Config";
import ReactPaginate from "react-paginate";
import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import {MdOutlineStarOutline} from "react-icons/md"
import { MdOutlineStarPurple500} from 'react-icons/md'
import {RxCross2} from 'react-icons/rx'
import {FaEdit} from 'react-icons/fa'


function Body() {
 
  const [allNotes, setAllNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchedNote, setSearchedNote] = useState([]);
  const userData = localStorage.getItem("userData");
  const parseData = userData ? JSON.parse(userData) : null;

  const navigate = useNavigate();

  const handleAddNote = (e) => {
    e.preventDefault();
    navigate("/addNotes");
  };

  const handleTag= async(id)=>{
    try {
      await tagNote(id)
      window.location.reload()
    } catch (error) {
      toast.error("Error tagging notes");
    }
  }

  const handleUnTag= async(id)=>{
    try {
      await untagNote(id)
      window.location.reload()
    } catch (error) {
      toast.error("Error tagging notes");
    }
  }

  const handleEdit= async(id)=>{
    try {
     navigate(`/editNote/${id}`)
      
    } catch (error) {
      toast.error("Error editing notes");
    }
  }

  const handleDelete= async (id)=>{
    try {
      await deleteNote(id)
      window.location.reload()
    } catch (error) {
      toast.error("Error deleting notes");
    }
  }

  useEffect(() => {
    try {
      const notes = async (userId) => {
        const res = await getNotes(userId);

        setAllNotes(res.data.notesFind);
      };
      notes(parseData._id);
    } catch (error) {
      toast.error("Error fetching notes");
    }
  }, []);

  useEffect(()=>{
    try {
      setAllNotes(searchedNote)
      console.log(allNotes,'ghhjk');
    } catch (error) {
      toast.error("Error fetching notes");
    }
  },[searchedNote])

  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  let PageSize = 8;
  const pageCount = Math.ceil(allNotes.length / PageSize);

  const currentTableData = useMemo(() => {
    const firstPage = currentPage * PageSize;
    const lastPage = Math.min(firstPage + PageSize, allNotes.length);
    return allNotes.slice(firstPage, lastPage);
  }, [allNotes, currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <>
      <Container className="body-class ">
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>

        <Row className="mb-5">
          <Col xs={12} md={6} className="float-left ">
            <SearchBar setSearchedNote={setSearchedNote} />
          </Col>
          <Col xs={12} md={6}>
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
        {/* <Container style={{width:'50rem'}}> */}
        <Row>
          {allNotes
            ? currentTableData.map((notes) => (
                <React.Fragment key={notes._id}>
                  <Col xs={12} sm={6} md={4} className="mt-3 ">
                    <Link
                      style={{ textDecoration: "none" }}
                     
                    >
                      <div style={{ width: "15rem", height: "16rem" }}>
                        <Card.Img
                          style={{ height: "14rem" }}
                          variant="top"
                          src={`${Image_Url}/${notes?.image}`}
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col xs={12} sm={6} md={5} className="mt-5">
                    
                    <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                      {notes?.title}
                    </h3>
                    <p style={{ color: "gray" }}>
                      {formatDate(notes?.createdAt)}
                    </p>
                    <p style={{ marginBottom: "5px" }}>{notes?.summary}</p>
                    <p
                    style={{ marginBottom: "5px" }}
                    dangerouslySetInnerHTML={{ __html: notes?.content }}
                  ></p>
                    
                  </Col>
                  <Col xs={12} sm={6} md={3} className="mt-3">
                   <Button variant="none" onClick={()=>handleEdit(notes?._id)} > <FaEdit/></Button>
                    {notes?.tagged ? (
                      <Button variant="none" onClick={()=>handleUnTag(notes?._id)} > <MdOutlineStarPurple500/></Button>
                    ):(
                      <Button variant="none" onClick={()=>handleTag(notes?._id)} > <MdOutlineStarOutline/></Button>
                    )}
              
              <Button variant="none" onClick={()=>handleDelete(notes?._id)} > <RxCross2/></Button>
                   </Col>
                 

                </React.Fragment>
              ))
            : null}
        </Row>
        <Container className="d-flex justify-content-center mt-3">
          <ReactPaginate
            previousLabel={<FaBackward />}
            nextLabel={<TbPlayerTrackNextFilled />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </Container>
      </Container>
    </>

    // </Container>
  );
}

export default Body;
