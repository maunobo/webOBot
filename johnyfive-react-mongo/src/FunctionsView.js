import React, { Component } from 'react';
import { CardActions, Button, Card, CardText, CardTitle } from 'react-mdl';
import { SketchPicker } from 'react-color';
import Slider from 'rc-slider';
import {Motion, spring} from 'react-motion';
import 'rc-slider/assets/index.css';
import { Grid, Row, Col, Badge, Label, Popover } from 'react-bootstrap';

export default class FunctionsView extends React.Component {
  render(){
    return(
      <Grid>
        <Row>
          <Col xs={6}>
            <Row>
              <Col xs={12} style={{textAlign: 'center', margin: 22}}>
                <SketchPicker type="sketch" color={this.props.color} onChange={ this.props.handleColorChange } />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Button raised colored ripple onClick={this.props.buttonColor} style={{margin: 10}}>Set color</Button>
                <Button raised colored ripple onClick={this.props.buttonLedOff} style={{margin: 10}}>Turn off Led</Button>
              </Col>
            </Row>
          </Col>
          <Col xs={6}>
            <Row>
              <Col xs={6} style={{marginTop: 100, marginBottom: 100}}>
                <Row>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <Motion style={{x: spring(this.props.servoCurrent)}}>
                      {({x}) =>
                        <div style={{
                          WebkitTransform: `rotate(${x}deg)`,
                          transform: `rotate(${x}deg)`,
                          backgroundColor: 'black',
                          width: 100,
                          height: 10,
                        }} />
                      }
                    </Motion>
                  </Col>
                </Row>
                <Row style={{marginTop: 50, textAlign: 'center'}}>
                  <Col xs={12}>
                    <Badge style={{backgroundColor: 'black'}}><Label style={{backgroundColor: 'black'}}><h6>{this.props.servoCurrent}</h6></Label></Badge>
                  </Col>
                </Row>
              </Col>
              <Col xs={6} style={{marginTop: 100, marginBottom: 100}}>
                <Row>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <Motion style={{x: spring(this.props.servoSet)}}>
                      {({x}) =>
                        <div style={{
                          WebkitTransform: `rotate(${x}deg)`,
                          transform: `rotate(${x}deg)`,
                          backgroundColor: 'red',
                          width: 100,
                          height: 10,
                        }} />
                      }
                    </Motion>
                  </Col>
                </Row>
                <Row style={{marginTop: 50, textAlign: 'center'}}>
                  <Col xs={12}>
                    <Badge style={{backgroundColor: 'red'}}><Label style={{backgroundColor: 'red'}}><h6>{this.props.servoSet}</h6></Label></Badge>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Slider value={this.props.servoSet} onChange={this.props.onSliderChange} min={0} max={180} />
              </Col>
            </Row>
            <Row>
              <Col xs={12} style={{textAlign: 'center', marginTop: 20}}>
                <Button raised colored ripple onClick={this.props.buttonServo}>Move Servo</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
