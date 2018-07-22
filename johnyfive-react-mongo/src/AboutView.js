import React, { Component } from 'react';
import { Grid, Row, Col, Badge, Label, Popover } from 'react-bootstrap';
import logo from 'file!../logo.png';
import ardruino from 'file!../ardruino.png';

export default class AboutView extends React.Component {
  render(){
    return(
      <Grid>
        <Row>
          <Col xs={12} style={{textAlign: 'center'}}>
            <img style={{width:380 , height: 380}} src={'http://localhost:3000' + logo} />
          </Col>
        </Row>
        <Row>
          <Col xs={8} xsOffset={2} style={{textAlign: 'center', fontSize: 18}}>
            <div className="panel panel-default rounded" style={{backgroundColor: 'rgba(77,147,245,0.2)', fontStyle: 'thin' }}>
              <div className="panel-heading" style={{backgroundColor: 'white'}}>
                Welcome to Web-o-Bot!
              </div>
              <div className="panel-body">
                Web-o-Bot is a thesis project for the last semester.
                Web-o-Bot is a monitoring web application, easy to use and accessible from every device connected to the Internet.
                In order to use the Web-o-Bot app, an Arduino board with different components is needed.
                The app provides live feedback of data which is also stored in a database for future monitoring.
                Anyone can simply use a variety of components and sensors with the Arduino platform and the Web-o-Bot app.
                All it takes is imagination, patience and... time!
                Have fun!
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={8} xsOffset={2} style={{textAlign: 'center'}}>
            <img style={{width:160 , height: 109}} src={'http://localhost:3000' + ardruino} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
