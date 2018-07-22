const PROXIMITY_FREQ = 1000;
const TEMPERATURE_FREQ = 1000;
const PHOTORESISTOR_FREQ = 1000;
const PROXIMITY_PIN = 4;
const TEMPERATURE_PIN = 'A0';
const SERVO_PIN = 10;
const RGB_PINS = [6,5,3];
const PHOTORESISTOR_PIN = "A1";
const BUTTON_PIN = 2;
const MOTION_PIN = 7;


const five = require("johnny-five");
const board = new five.Board();
var clientsConnected = false;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sensors');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log('con');
});

var sensorSchema = mongoose.Schema({
    temperature: Number,
    proximity: Number,
    photoresistor: Number,
    createdAt: Date
});
var Sensor = mongoose.model('Sensor', sensorSchema);

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    admin: Boolean
});
var User = mongoose.model('User', userSchema);

const query = {username: 'admin', password: 'password', admin: true};
User.find(query, function(err, data){
    if(data.length == 0){
      const user = new User({
        username: 'admin',
        password: 'password',
        admin: true,
        createdAt: new Date()
      });
      user.save((err,data)=> {
        if(err){
          console.log(err);
        }
      });
    }
});

board.on("ready", function() {
  const button = new five.Button(BUTTON_PIN);
  button.on("press", function() {
    try {
      wss.broadcast( JSON.stringify({data:{type: 'button', message: 'buttonPressed'}}) );
    } catch (e) {
      console.log(e);
    }
  });
  button.on("release", function() {
    try {
      wss.broadcast( JSON.stringify({data:{type: 'button', message: 'buttonReleased'}}) );
    } catch (e) {
      console.log(e);
    }
  });

  const photoresistor = new five.Sensor({
    pin: PHOTORESISTOR_PIN,
    freq: PHOTORESISTOR_FREQ,
  });

  const proximity = new five.Proximity({
    controller: "HCSR04",
    pin: PROXIMITY_PIN,
    freq: PROXIMITY_FREQ,
  });

  const temperature = new five.Thermometer({
    pin: TEMPERATURE_PIN,
    controller: "TMP36",
    freq: TEMPERATURE_FREQ,
  });

  const led = new five.Led.RGB({
    pins: RGB_PINS
  });

  const servo = new five.Servo(SERVO_PIN);
  servo.to(90);

  const motion = new five.Motion(MOTION_PIN);
  motion.on("motionstart", function() {
    try {
      wss.broadcast( JSON.stringify({data:{type: 'motion', message: 'motionStart'}}) );
    } catch (e) {
      console.log(e);
    }
  });
  motion.on("motionend", function() {
    try {
      wss.broadcast( JSON.stringify({data:{type: 'motion', message: 'motionEnd'}}) );
    } catch (e) {
      console.log(e);
    }
  });

  setInterval(() => {
    var sensor = new Sensor({
      temperature: temperature.C > 46 ? 46 : temperature.C,
      proximity: proximity.cm > 310 ? 310 : proximity.cm,
      photoresistor: photoresistor.value > 1000 ? 1000 : photoresistor.value,
      createdAt: new Date()
    });
    sensor.save((err,data)=> {
      if(err){
        console.log(err);
      }else{
        if(clientsConnected){
          try {
            wss.broadcast(JSON.stringify({data:{type: 'data', values: data}}));
          }
          catch (e) { console.log(e); }
        }
      }
    })
    return sensor;
  },10000)

  setInterval(() => {
    wss.broadcast(JSON.stringify({data:{type: 'servo', values: servo.position}}));
  },1000)

  var WebSocketServer = require('ws').Server
  var wss = new WebSocketServer({ port: 8080 });
  wss.on('connection', function connection(ws) {
    clientsConnected=true;
    ws.on('message', function incoming(message) {
      const ws_message = JSON.parse(message);
      try {
        const data = ws_message.data;
        switch (data.type) {
          case 'date':
            Sensor.find({"createdAt": {"$gte": new Date(data.date.startDate), "$lte": new Date(data.date.endDate) }},function (err, data){
              ws.send(JSON.stringify({data:{type: 'history', values: data}}));
            });
            break;
          case 'led':
            led.color(data.color);
            break;
          case 'ledOff':
            led.off();
            break;
          case 'servo':
            servo.to(data.servo);
            break;
          case 'auth':
            User.find({'username': data.username, 'password': data.password},function (err,data){
              ws.send(JSON.stringify({data: {type: 'auth', auth: (data.length > 0)}}))
            })
            break;
          default:
            break;
        }
      }catch(e){
        console.log(e);
      }
    });
  });

  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  }
});
