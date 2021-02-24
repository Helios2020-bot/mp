var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/auth', function(req, res, next) {

  const pusher = req.app.get('pusher');
  var users = req.app.get('users');
  const socketId = req.body.socket_id;
  
  console.log(socketId);
  const channel = req.body.channel_name;
  console.log('channel-name ', channel)
  const presenseData = {
    user_id: socketId,
    name: "Kiran",
  };

  const auth = pusher.authenticate(socketId, channel, presenseData);
  var user = {
    channel: channel,
    busy: 0,
    rejectList: []
  }
  users.push(user);
  res.send(auth);
});

module.exports = router;
