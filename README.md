## Description

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

It is based off of a Gateway Agent running on RPIv3.  

The idea is to locally manage multiple Gateway Agents and or possibly use in discussions or demonstrations.  There also exists the possiblity for reusable components for general enablement.


Initially the exposed resources below are used.

| Method | Resource |
|-----|-------|
| Get | /devices|
| Get | /devices/<device-id>/telemetry|

A planned extension was to build a more comprehensive interface for locally configuring and managing devices in the field that is based off of [JSON Schemas](https://github.com/rjsf-team/react-jsonschema-form).

You may need to configure a proxy in order to contend with [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).  

There are plenty of opportunities for improvement.


### Steps for Simulation.

- Start the gwagent_simulator
- Start the sensor_simulator
- Start gwkit


### Step 1
- Enter URL for retrieving devices.  

![alt text](https://github.com/ccrawfor/gwkit/blob/master/img/agent.png "Devices")

### Step 2

- Select **Device ID** `(did)`.

![alt text](https://github.com/ccrawfor/gwkit/blob/master/img/grid.png "Devices")
 
You will get an error message if you select anything other than a Device ID.

![alt text](https://github.com/ccrawfor/gwkit/blob/master/img/alert.png "Devices")

View updated telemetry data.  The graph updates every second.

![alt text](https://github.com/ccrawfor/gwkit/blob/master/img/graph.png "Devices")



