import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ReactDOM from 'react-dom';
import './index.css';
import Routine from './contexts/routine/components/Routine';
import Calendar from './contexts/calendar/components/Calendar';

function App() {

  return (
    <Container fluid>
      <Row>
        <Col className="app-header"> xRout.Life </Col>
      </Row>

      <Row>
        <Col sm={{size: 2, offset: 1}}> <Routine/> </Col>
        <Col xs="8"> <Calendar/> </Col>
      </Row>
    </Container>
  );
}

export default App;
