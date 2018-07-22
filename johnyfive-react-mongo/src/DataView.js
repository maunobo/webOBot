import React, { Component } from 'react';
import { CardActions, Button, Card, CardText, CardTitle } from 'react-mdl';
import ReactPlayer from 'react-player';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
import { Grid, Row, Col, Badge, Label, Popover } from 'react-bootstrap';
import beep from 'file!../beep.mp3';
import 'react-vis/main.css';

export default class DataView extends React.Component {
  render(){
    return(
      <Grid fluid={true}>
        <Row>
          <Col xs={4}>
            <Card shadow={0} style={{width: 450}}>
              <CardTitle style={{color: 'blue'}}>Proximity</CardTitle>
              <CardText>
                <XYPlot
                  width={400}
                  height={400}>
                  <HorizontalGridLines />
                  <LineSeries
                    color={'blue'}
                    data={this.props.data.slice(-100).map((entry,i) => Object.assign({x: i, y: parseInt(entry.proximity) }) )}>
                  </LineSeries>
                  <XAxis />
                  <YAxis />
                </XYPlot>
              </CardText>
              <CardActions border>
                <h4>Current Value: {parseInt(this.props.currentVal.proximity)}</h4>
              </CardActions>
            </Card>
          </Col>
          <Col xs={4}>
            <Card shadow={0} style={{width: 450}}>
              <CardTitle style={{color: 'red'}}>Temperature</CardTitle>
              <CardText>
                <XYPlot
                  width={400}
                  height={400}>
                  <HorizontalGridLines />
                  <LineSeries
                    color={'red'}
                    data={this.props.data.slice(-100).map((entry,i) => Object.assign({x: i, y: parseInt(entry.temperature) }) )}>
                  </LineSeries>
                  <XAxis />
                  <YAxis />
                </XYPlot>
              </CardText>
              <CardActions border>
                <h4>Current Value: {parseInt(this.props.currentVal.temperature)}</h4>
              </CardActions>
            </Card>
          </Col>
          <Col xs={4}>
            <Card shadow={0} style={{width: 450}}>
              <CardTitle style={{color: 'green'}}>Photoresistor</CardTitle>
              <CardText>
                <XYPlot
                  width={400}
                  height={400}>
                  <HorizontalGridLines />
                  <LineSeries
                    color={'green'}
                    data={this.props.data.slice(-100).map((entry,i) => Object.assign({x: i, y: parseInt(entry.photoresistor) }) )}>
                  </LineSeries>
                  <XAxis />
                  <YAxis />
                </XYPlot>
              </CardText>
              <CardActions border>
                <h4>Current Value: {parseInt(this.props.currentVal.photoresistor)}</h4>
              </CardActions>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div id="square" style={{ width: 100, height: 100, backgroundColor: this.props.buttonState ? 'green' : 'red'}}>
              <h4 style={{textAlign: 'center', paddingTop: 40}}>Button</h4>
            </div>
            <div style={{ height: 120 , display: !this.props.motion ? 'none' : ''}}>
              <Popover placement="right" positionLeft={200} positionTop={50} title="Caution" id="popover">
                Movement Detected!
              </Popover>
            </div>
            <ReactPlayer url={'http://localhost:3000'+beep} playing={this.props.motion} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
