import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import StockProjectArt from '../../Static/StockProjectArt.jpg'
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';


function Projects() {
    const auth = useAuth();
    const [projectList, setProjectList] = useState({projects: []})

    const getProjectList = async (userID) => {
        let response = await axios.get('http://127.0.0.1:8000/' + userID + '/project/');
        setProjectList({
            projects: response.data,
        })
    }

    useEffect(() => {
        getProjectList(auth.currentUser.uid)
    }, []);

    return ( 
        <Container className='d-flex justify-content-center align-items-center' style={{minHeight: '100vh', minWidth: '100vw'}}>
            <Row md={2} xs={1} className='w-100 justify-content-center'>
                {projectList.projects.map((project) => (
                    <Col className='m-2'
                    style={{
                        maxHeight: '50vh',
                        maxWidth: '40vw',
                        backgroundColor: '#E0C097',
                        borderStyle: 'solid',
                        borderColor: '#5C3D2E',
                        borderWidth: '5px',
                        borderRadius: '1rem',
                    }}>
                        <Row>
                            <Col >
                            <img className='d-block m-3 shadow mx-auto' src={StockProjectArt} alt='stock' 
                        style={{
                            borderRadius: '1rem',
                            maxHeight: '40vh'
                        }}/>
                            </Col>
                            <Col>
                                <Card
                                style={{
                                    backgroundColor: '#E0C097',
                                    borderColor: '#E0C097',
                                    color: '#B85C38',
                                    fontSize: '1rem',
                                    minHeight: '40vh'
                                }}>
                                    <Card.Body>
                                        <Card.Title className='mt-2' style={{fontSize: '2rem', textShadow: '2.5px 2.5px 6px'}}>{project.name}</Card.Title>
                                        <Card.Text className='my-5' style={{fontSize: '1.25rem', textShadow: '2px 2px 4px'}}>{project.summary}</Card.Text>
                                        <Button className='w-50 shadow'
                                        style={{
                                            position: 'absolute',
                                            bottom: '.5rem',
                                            right: '4rem',
                                            backgroundColor: '#B85C38',
                                            borderColor: '#B85C38',
                                            color: '#E0C097',
                                            fontFamily: ('EB Garamond', 'serif'),
                                            fontStyle: 'italic',
                                        }}>
                                            Pick Project
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                ))}
            </Row>

        </Container>
     );
}

export default Projects;