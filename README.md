# webOBot
### Home Automation with Arduino & JS

<img src="johnyfive-react-mongo/logo.png" width="256" height="256">

This is my thesis project for completing the Electronic Engineering studies in the Technological Educational Institute of Central Greece.

The fundamental idea behind this project was to built a system for home automation, monitoring and interaction with ones home environment remotely.

### Abstract
It is a fact that in recent years, automation and more specific applications in industry, at home, in the workplace, multiply and grow. Through the internet many automations provide the possibility for remote control, which is combined with the economic materials and thus constantly creating new web automation applications.
The purpose of the project is to create an automated web system that finds application in the home and provide remote control of systems associated with it.
The system consists of an Arduino board, to which an ultrasound sensor, a motion, a temperature, a photoresist, and a button, a LED and a servo are connected.
The Arduino is connected via serial with the computer, who plays the role of parent as in parent - child architecture, Arduino gives measurements, and accepts commands only when requested by the computer - server.
The measurements are recorded in a database, providing the user the ability to look older measurements inside a period of time.
For the interaction of the user and the application, a browser is used, where orders are given and measurements are presented in graphs.
In this thesis, there is the analysis of the connections and the hardware structure, software and communication of each system to the other.


### Arduino platform 
Using the Arduino platform which is cheap and easy to prototype and test out different circuits, with a variety of sensors and components for data acquisition and control. 
The sensors used in this project are:  
- **Parallax Ping** sensor, for proximity sensing
- **Movement sensor**, for movement sensing
- **TMP 36** Temperature sensor, for reading the current temperature
- **LDR** (Light Dependent Resistor), for sensing the current light temperature
- **Servo** motor, for moving certain parts of the system remotely
- **Button**, for feedback and to test performance
- **RGB LED**, used as a feedback, to control lighting based on a ColorPicker

<img src="images/IODiagram.png" width="450" height="263">

### Server - Board
**Firmata**
A library that contains the firmware for many different components and sensors. Some customisation was required for several components to work.

**Johnny-Five**
A JavaScript library, mainly used for creating robots and autonomous vehicles based on the Arduino platform, allows for communication with Firmata.

**NodeJS**
The systems back-end consists of a Node running for controlling the Arduino and allows for remote control.

<img src="images/StackJohnyFirmata.png" width="450" height="253">

### Complete Stack


<img src="images/StackComplete.png" width="355" height="355">
