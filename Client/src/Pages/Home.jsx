import React,{useEffect} from 'react'
import Header from '../Components/UserHome/Header'
import { Container } from 'react-bootstrap'
import Body from '../Components/UserHome/Body'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate=useNavigate()
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const parseData = userData ? JSON.parse(userData) : null;
    if (parseData) {
      navigate("/homePage");
    }else{
      navigate("/login");

    }
  }, [navigate]);
  return (
   
     <Container>
      <Header/>
      <Body/>
     </Container>
  
  )
}

export default Home
