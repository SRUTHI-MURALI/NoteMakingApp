import  { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import { Base_Url } from '../../../Config/Config';

const SearchBar = ({ setSearchedNote }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (searchValue) {
        const response = await axios.post(`${Base_Url}/user/searchitem`, { searchvalue: searchValue });
        setSearchedNote(response?.data?.searchData);  
        
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (
    <div  >
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit"  variant="info" className='add-button'>Search</Button>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default SearchBar;
