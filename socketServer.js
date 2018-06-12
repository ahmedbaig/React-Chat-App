const nodemon = require('nodemon');
const path = require('path');

nodemon({
  execMap: {
    js: 'node'
  },
  script: path.join(__dirname, 'server/socketServer'),
  ignore: [],
  watch: process.env.NODE_ENV !== 'production' ? ['server/*'] : false,
  ext: 'js'
})
.on('restart', function() {
  console.log('Socket Server restarted!');
})
.once('exit', function () {
  console.log('Shutting down Socket Server');
  process.exit();
});
