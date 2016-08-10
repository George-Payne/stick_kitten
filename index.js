'use strict';

const Promise = require('bluebird'),
      adb = require('adbkit'),
      client = adb.createClient(),
      http = require('http'),
      fs = require('fs'),
      index = fs.readFileSync(__dirname + '/index.html');


  let procs = [],
      logs =[],
      connects = 0;

  let app = http.createServer(function(req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(index);
  });

const io = require('socket.io').listen(app);

  io.on('connection', (socket) => {
      // Use socket to communicate with this particular client only, sending it it's own id
      socket.emit('priors', logs);

      consoleCat("Hello! " + ++connects + " consoles connected.");
      socket.on('disconnect', () => consoleCat("Goodbye! " + --connects + " consoles connected."));
  });

const port = process.argv[2] || 3000;

  app.listen(port);

  consoleCat("Stick Kitten running on localhost:" + port, true)


  client.listDevices()
    .then((devices) => {
      devices.forEach((device) => {
        consoleCat("Device " + device.id + " connected");
        client.openLogcat(device.id)
          .then((log) => {
            procs.push(log);

            log.on('entry', (entry) => {
              if(entry.tag === "ReactNativeJS"){
                logs.push(entry);
                io.emit("log", entry);

              }

            });

            log.on('error', (entry) => {
              if(entry.tag === "ReactNativeJS"){
                io.emit("err", entry);
              }
            });

          })
          .catch((err) => {
            console.error(err)
          })
      })
    });

  process.on('exit', () => {
    procs.forEach(p => p.kill());
    io.close();
  });

function consoleCat(msg, full){
  const cat = [
    " ",
    "   A_A",
    "  (-.-)   - " + msg,
    "   |-|",
    "  /   \\",
    " |     |  __",
    " |  || | |  \\___",
    " \\_||_/_/",
    " "
  ];
  if(full){
    cat.forEach(line => console.log(line));
  }else{
    console.log(cat[1]);
    console.log(cat[2]);
    console.log(" ");
  }
}
