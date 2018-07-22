import React, { Component } from 'react';
import { DateRange } from 'react-date-range';
import { CardActions, Button, Card, CardText, CardTitle } from 'react-mdl';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries, Crosshair} from 'react-vis';
import { Grid, Row, Col, Badge, Label, Popover } from 'react-bootstrap';
import 'react-vis/main.css';

export default class HistoryView extends React.Component {
  render(){
    return(
      <Grid fluid={true}>
        <Row>
          <Col xs={4}>
            <Card shadow={0} style={{width: 450}}>
              <CardTitle style={{color: 'blue', textAlign: 'center'}}>Proximity</CardTitle>
              <CardText>
                <XYPlot
                  width={400}
                  height={400}>
                  <HorizontalGridLines />
                  <LineSeries
                    color={'blue'}
                    data={this.props.data.map((entry,i) => Object.assign({x: i, y: parseInt(entry.proximity) }) )}>
                  </LineSeries>
                  <XAxis />
                  <YAxis />
                </XYPlot>
              </CardText>
              <CardActions border style={{textAlign: 'center'}}>
                <h4>Average Value: {parseInt(this.props.currentVal.proximity)}</h4>
              </CardActions>
            </Card>
          </Col>
          <Col xs={4}>
            <Card shadow={0} style={{width: 450}}>
              <CardTitle style={{color: 'red', textAlign: 'center'}}>Temperature</CardTitle>
              <CardText>
                <XYPlot
                  width={400}
                  height={400}>
                  <HorizontalGridLines />
                  <LineSeries
                    color={'red'}
                    data={this.props.data.map((entry,i) => Object.assign({x: i, y: parseInt(entry.temperature) }) )}>
                  </LineSeries>
                  <XAxis />
                  <YAxis />
                </XYPlot>
              </CardText>
              <CardActions border style={{textAlign: 'center'}}>
                <h4>Average Value: {parseInt(this.props.currentVal.temperature)}</h4>
              </CardActions>
            </Card>
          </Col>
          <Col xs={4}>
            <Card shadow={0} style={{width: 450}}>
              <CardTitle style={{color: 'green', textAlign: 'center'}}>Photoresistor</CardTitle>
              <CardText>
                <XYPlot
                  width={400}
                  height={400}>
                  <HorizontalGridLines />
                  <LineSeries
                    color={'green'}
                    data={this.props.data.map((entry,i) => Object.assign({x: i, y: parseInt(entry.photoresistor) }) )}>
                  </LineSeries>
                  <XAxis />
                  <YAxis />
                </XYPlot>
              </CardText>
              <CardActions border style={{textAlign: 'center'}}>
                <h4>Average Value: {parseInt(this.props.currentVal.photoresistor)}</h4>
              </CardActions>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={{textAlign: 'center'}}>
            <Card shadow={0} style={{width: 'auto'}}>
              <CardTitle style={{textAlign: 'center'}}>History</CardTitle>
              <CardText>
                <DateRange
                  onInit={this.props.handleSelectDate}
                  onChange={this.props.handleSelectDate} />
              </CardText>
              <CardActions border>
                <Button raised colored ripple onClick={this.props.buttonDate}>Fetch</Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Grid>
    );
  }
}
