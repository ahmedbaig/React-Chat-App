const User = require('../../models/Users');
const UserSession = require('../../models/UserSessions');
const cors = require('cors');
module.exports = (app) => {

    // LOGOUT

    app.get('/api/account/logout', cors(), (req, res, next) => {
        // GET TOKEN

        const { query } = req;
        const { token } = query; 
        // ?token = test

        // VERIFY TOKEN IS ONE OF A KIND

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set:{
                "isDeleted":true
            }
        }, null, 
        (err, sessions) => {
            if(err){
                return  res.send({
                    success: false,
                    message: 'Error: Invalid'
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