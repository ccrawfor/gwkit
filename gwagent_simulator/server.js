var express = require('express');
var app = express();

app.get('/devices', function(req, res) {
    
     res.json([
         {"metadata":[{"id":"did","value":"c9b6df0f-4e5a-4841-b169-c9d36ef90e7f"},
         {"id":"model_id","value":"224603cd-4053-41ff-b584-3f31348800fb"},
         {"id":"model_version","value":"1"}],"id":"c9b6df0f-4e5a-4841-b169-c9d36ef90e7f"}]);
})

app.get('/devices/*/telemetry', function(req, res) {
    
    var t = new Date();  // current time
    var y = Math.random();
    
    res.json([{"id":"1","ts":String(t.getTime()),"value":String(y)}]);
})

    //res.send("hello")
var server = app.listen(8081, function() {
   var host = server.address().address
   var port = server.address().port
   console.log("gwagent_simulator app listening at http://%s:%s",host, port) 
})
