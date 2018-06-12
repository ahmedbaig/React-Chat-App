const User = require('../../models/Users');
const UserSession = require('../../models/UserSessions');
const cors = require('cors');
module.exports = (app) => {

    // STATUS

    app.post('/api/account/status', (req, res, next) => {
        // GET TOKEN && STATUS

        const { body } = req;

        const {
          socketId,
          status
        } = body;

        // ?token = test

        // VERIFY TOKEN IS ONE OF A KIND AND NOT DELETED

        UserSession.find({
            socketId: socketId,
            isDeleted: false
        }, (err, sessions) => {
            if(err){
                return  res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            }else if (sessions.length != 1){
                return res.send({
                    success: false,
                    message: 'Error: Invalid token'
                });
            }else {
              let userId = sessions[0].userId;
              User.findOneAndUpdate({
                _id: userId,
                isDeleted: false
              },{
                $set: {
                  "status": status
                }
              }, null, (err, session) => {
                if(err){
                    return  res.send({
                        success: false,
                        message: 'Error: Invalid'
                    });
                }
                return res.send({
                    success: true,
                    status: status
                });
              })
            }
        });
    });
};
