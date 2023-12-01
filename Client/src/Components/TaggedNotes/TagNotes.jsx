import React, { useState, useEffect, useMemo } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

import "../UserHome/Home.css"
import { Link, } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getNotes, getTaggedNotes } from "../AxiosConfig/AxiosConfig";
import { Image_Url } from "../../../Config/Config";
import ReactPaginate from "react-paginate";
import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";



function TagNotes() {
    const [allNotes, setAllNotes] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
   

    useEffect(() => {
        try {
          const notes = async (userId) => {
            const res = await getTaggedNotes(userId);
    
            setAllNotes(res.data.notesFind);
          };
          notes(parseData._id);
        } catch (error) {
          toast.error("Error fetching notes");
        }
      }, []);

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
      <Col
          md={12}
          className="d-flex justify-content-center align-items-center text-center "
         style={{textDecoration:'underline'}}
        >
          <h1>See the tagged Notes</h1>
        </Col>
     
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
  )
}

export default TagNotes
