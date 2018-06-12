const User = require('../../models/Users');
const UserSession = require('../../models/UserSessions');
const cors = require('cors');
module.exports = (app) => {

    // SINGING IN

    app.post('/api/account/signin', cors(), (req, res, next) => {
        const { body } = req;
        const {
            phoneNumber,
            password
        } = body;


        if(!phoneNumber){
            return res.send({
                success: false,
                message: 'Error: Phone Number cannot be blank'
            });
        }

        if(!password){
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank'
            });
        }

        User.find({
            phoneNumber: phoneNumber
        }, (err, users) => {
            if(err){
                console.log('ERR 2:',err);
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }else if (users.length != 1){
                return res.send({
                    success: false,
                    message: 'Error: Invalid input'
                });
            }

            const user = users[0];
            if(!user.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Error: Invalid password'
                });
            }

            // Otherwise
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc) => {
                if(err){
                    console.log(err);
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }

                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id
                });

            });
        });
    });
};
