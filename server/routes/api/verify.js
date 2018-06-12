const User = require('../../models/Users');
const UserSession = require('../../models/UserSessions');
const cors = require('cors');
module.exports = (app) => {

    // VERIFY

    app.get('/api/account/verify', (req, res, next) => {
        // GET TOKEN

        const { query } = req;
        const { token } = query; 
        // ?token = test

        // VERIFY TOKEN IS ONE OF A KIND

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
                return res.send({
                    success: true, 
                    message: 'Good' 
                });
            }
        });
    });
};