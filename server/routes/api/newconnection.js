const User = require('../../models/Users');
const UserSession = require('../../models/UserSessions');
const cors = require('cors');
module.exports = (app) => {

    // NEW CONNECTION

    app.post('/api/account/newconnection', (req, res, next) => {
        // get TOKEN && sockID from POST body

        const { body } = req;
        const {
            token,
            socketId
        } = body;

        // VERIFY TOKEN IS ONE OF A KIND AND NOT DELETED

        UserSession.find({
            _id: token,
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
              UserSession.findOneAndUpdate({
                _id: token,
                isDeleted: false
              },{
                $set: {
                  "socketId": socketId
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
                    message: "Connection ID changed"
                });
              })
            }
        });
    });
};
