import React, { useState, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import ScrollWall from '../../Static/ScrollWall.jpg'
import axios from 'axios';
import AddBook from './AddBook/AddBook';
import Chapter from './Chapter/Chapter';


function Book(props) {
    const auth = useAuth()
    const [bookList, setBookList] = useState({books : []})

    useEffect(() => {
        getBookList(props.currentProject.name, auth.currentUser.uid)
    }, []);

    const handleClick = () => {
        console.log("Card Click")
    }

    const getBookList = async (ProjectID, userID) => {
        let response = await axios.get('http://127.0.0.1:8000/' + userID + '/project/' + ProjectID + '/book/list');
        setBookList({books : response.data})};

    return ( 
        <Container className='d-flex align-items-center justify-content-center ' style={{minHeight: '100vh'}}>
            <Row className='w-100 overflow-auto' 
            style = {{
                maxWidth: '50vw',
                minHeight: '30vh',
                backgroundColor: '#2D2424',
                borderStyle: 'solid',
                borderColor: '#5C3D2E',
                borderWidth: '5px',
                borderRadius: '1rem',
                }}>
                <Row className='justify-content-center text-center w-100 overflow-hidden'
                style ={{
                    maxWidth: '100vw',
                    maxHeight: '2rem',
                    backgroundColor: '#E0C097',
                    borderColor: '#5C3D2E',
                    color: '#B85C38',
                    fontSize: '1.25rem',
                    fontWeight: '800'
                }}>
                    Book Shelf
                </Row>
                <Row>
                    <Col>
                        <Row md={2}>
                            {bookList.books.map((book) =>
                                <Card onClick={() => handleClick()} className='shadow m-1'
                                style={{
                                    backgroundColor: '#E0C097',
                                    borderColor: '#5C3D2E',
                                    color: '#B85C38',
                                    fontSize: '1rem',
                                    borderRadius: '1rem',
                                    borderWidth: '.25rem',
                                    maxWidth: '10vw',
                                    maxHeight: '30vh'
                                }}>
                                    <Card.Img variant='top' src={ScrollWall} className='overflow-hidden mt-1 shadow'
                                    style={{
                                        borderRadius: '1rem',
                                        minHeight: '10vh',
                                        objectFit: 'cover'

                                        }}/>
                                        <Card.Body>
                                            <Card.Title className='text-center'>{book.title}</Card.Title>
                                            <Card.Text className='overflow-auto'>{book.summary}</Card.Text>
                                            <Card.Title>{book.category}</Card.Title>
                                        </Card.Body>
                                </Card>
                            )}
                        </Row>
                    </Col>
                    <Col>
                        <Chapter />
                    </Col>
                </Row>
                <AddBook currentProject={props.currentProject}/>
            </Row>
        </Container>
     );
}

export default Book;