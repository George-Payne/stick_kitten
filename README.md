# Stick Kitten
###### Logcat... get it...?
React native console (for android) without running "debug js remotely".
Will also connect to devices automatically, and reverse ports.

~~~~
	
   A_A
  (-.-)   - Hello!
   |-|
  /   \
 |     |  __
 |  || | |  \___
 \_||_/_/
 
~~~~

to start:

`npm install && npm start`

to run on another port:

`node index.js <port>`

Make sure your device is connected before running.

If you get an error on start up, replace `node_modules/adbkit-logcat/lib/logcat/parser/binary.js` with the binary.js file in extras.


[Reason this exists](http://stackoverflow.com/questions/38867536/slow-animations-when-debugger-running)
