import React, { Component } from 'react';
import { CardActions, Button, Card, CardText, CardTitle } from 'react-mdl';
import TabPanel from 'react-tab-panel';
import 'react-tab-panel/index.css';
import { Grid, Row, Col, Badge, Label, Popover } from 'react-bootstrap';
import DataView from './DataView';
import HistoryView from './HistoryView';
import FunctionsView from './FunctionsView';
import logo from 'file!../logo.png';
import AboutView from './AboutView';

const socket = new WebSocket('ws://localhost:8080');
const initialState = {
  data:[],
  connected: false,
  dateRange: null,
  request: [],
  color: {
    r: '241',
    g: '112',
    b: '19',
    a: '1',
  },
  buttonState: false,
  buttonMessage: '',
  history: [],
  auth: false,
  username: '',
  password: '',
  activeTab: 0,
  motion: false,
  servoCurrent: 90,
  servoSet: 90,
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
    socket.onopen = this.onopen;
    socket.onmessage = this.onmessage;
  }


  onopen = () => {
    this.setState({connected: true})
  }

  onmessage = (message) => {
    const ws_message = JSON.parse(message.data);
    const data = ws_message.data;
    switch (data.type) {
      case 'data':
        this.setState({data: [...this.state.data,data.values]});
        break;
      case 'button':
        this.setState({buttonMessage: data.message})
        this.setState({buttonState: data.message == 'buttonPressed' })
        break;
      case 'history':
        this.setState({history: data.values});
        break;
      case 'auth':
        this.setState({auth: data.auth});
        break;
      case 'motion':
        this.setState({motion: data.message == 'motionStart'});
        break;
      case 'servo':
        this.setState({servoCurrent: data.values});
        break;
      default:
        break;
    }
  }

  buttonDate = () => {
    socket.send(JSON.stringify({data:{type: 'date', date: this.state.dateRange}}));
  }

  handleSelectDate = (dateRange) => {
    this.setState({dateRange}) // Momentjs object
  }

  handleColorChange = (color) => {
    this.setState({color: color.hex})
  }

  buttonColor = () => {
    socket.send(JSON.stringify({data: {type: 'led', color: this.state.color}}));
  }

  buttonLedOff = () => {
    socket.send(JSON.stringify({data: {type: 'ledOff'}}));
  }

  onSliderChange = (servoSet) => {
    this.setState({servoSet})
  }

  buttonServo = () => {
    socket.send(JSON.stringify({data: {type: 'servo', servo: this.state.servoSet}}))
  }

  usernameChange = (username) => {
    this.setState({username})
  }

  passwordChange = (password) => {
    this.setState({password})
  }

  buttonLogin = () => {
    socket.send(JSON.stringify({data:{username: this.state.username, password: this.state.password, type: 'auth'}}))
  }

  findAverage = (array) => {
    if(array.length < 1){
      return {proximity: 0, photoresistor: 0, temperature: 0}
    }else{
      let result = array.reduce((p,c) => {
        return {
          proximity: parseFloat(p.proximity + c.proximity),
          photoresistor: parseFloat(p.photoresistor + c.photoresistor),
          temperature: parseFloat(p.temperature + c.temperature),
        }
      })
      result.proximity = result.proximity / array.length;
      result.photoresistor = result.photoresistor / array.length;
      result.temperature = result.temperature / array.length;
      return result;
    }
  }

  render() {
    let currentVal;
    if (this.state.data.length == 0){
      currentVal = {proximity: 0, photoresistor: 0, temperature: 0};
    }else {
      currentVal = this.state.data[this.state.data.length - 1];
    }
    if (!this.state.auth) {
      return(
        <Grid>
          <Row>
            <Col xs={12} style={{textAlign: 'center'}}>
                <Row>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <img style={{width:380 , height: 380}} src={'http://localhost:3000' + logo} />
                    <h2>Login</h2>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <input type="text" onChange={(e) => this.usernameChange(e.target.value)}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <input type="password" onChange={(e) => this.passwordChange(e.target.value)}/>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} style={{textAlign: 'center'}}>
                    <Button raised colored ripple onClick={this.buttonLogin}>Login</Button>
                  </Col>
                </Row>
            </Col>
          </Row>
        </Grid>
      );
    }else{
      return (
        <Grid fluid={true}>
          <Row>
            <Col sm={12} md={12}>
              <TabPanel>
                <DataView
                  tabTitle="Realtime"
                  data={this.state.data}
                  currentVal={currentVal}
                  buttonState={this.state.buttonState}
                  motion={this.state.motion}
                />
                <HistoryView
                  tabTitle="History"
                  data={this.state.history}
                  currentVal={this.findAverage(this.state.history)}
                  handleSelectDate={this.handleSelectDate}
                  buttonDate={this.buttonDate}
                  />
                <FunctionsView
                  tabTitle="Functions"
                  color={this.state.color}
                  servoSet={this.state.servoSet}
                  servoCurrent={this.state.servoCurrent}
                  handleColorChange={this.handleColorChange}
                  buttonColor={this.buttonColor}
                  buttonLedOff={this.buttonLedOff}
                  onSliderChange={this.onSliderChange}
                  buttonServo={this.buttonServo}
                  />
                <AboutView
                tabTitle="About" />
              </TabPanel>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
}
