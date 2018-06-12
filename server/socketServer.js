var http = require('http');
var sockjs = require('sockjs');
var Filter = require('bad-words');

var echo = sockjs.createServer({ sockjs_url: '' });
var clients = {};
var filter = new Filter();

// Broadcast to all clients
function broadcast(message){
  // iterate through each client in clients object
  for (var client in clients){
    // send the message to that client
    console.info('\n\nbroadcasting message: [%s] to client: [%s] ',message, client)
    clients[client].write(message);
  }
}

echo.on('connection', function(conn) {
    // add this client to clients object
    console.info("\nconnected: " + conn.id);
    clients[conn.id] = conn;
    let i = 0;
    if(i==0){
      let message = '{\"connectionID\": \"' + conn.id + '\"}';
      clients[conn.id].write(message);
      i++;
    }
    conn.on('data', function(message) {
        console.info('\n\n[%s] sent message: [%s]',conn.id, message)
        broadcast(filter.clean(message));
    });
    // on connection close event
    conn.on('close', function() {
    console.info("\ndisconnect: " + conn.id);
    delete clients[conn.id];
      fetch('http://localhost:3017/api/account/status',{
        method: 'POST',
        mode: 'cors',
        headers: {
          'Access-Control-Request-Origin': '*',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-origin,content-type",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          socketId: conn.id,
          status: 'offline'
        })
      })
    });
});

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Test Chat System!');
  res.end();
});
echo.installHandlers(server, {prefix:'/chat'});
server.listen(process.env.PORT||9999, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('>>> 🔌 Open http://0.0.0.0:%s/chat on your network.', process.env.PORT||9999);
});
