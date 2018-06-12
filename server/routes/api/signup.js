const User = require('../../models/Users');
const cors = require('cors');

module.exports = (app) => {
    // app.get('/api/counters', (req, res, next) => {
    //   Counter.find()
    //     .exec()
    //     .then((counter) => res.json(counter))
    //     .catch((err) => next(err));
    // });

    // app.post('/api/counters', function (req, res, next) {
    //   const counter = new Counter();

    //   counter.save()
    //     .then(() => res.json(counter))
    //     .catch((err) => next(err));
    // });

    // SINGING UP
    app.post('/api/account/signup', cors(), (req, res, next) => {
        const { body } = req;
        const {
            phoneNumber,
            password
        } = body;

        if (!phoneNumber){
            return res.send({
                success: false,
                message: 'Error: Phone Number cannot be blank'
            })
        }

        if (!password){
            return res.send({
                success: false,
                message: 'Error: password cannot be blank'
            })
        }


        // STEPS
        // 1. verify email doesn't exit
        // 2. Save

        User.find ({
            phoneNumber: phoneNumber
        }, (err, previousUsers) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else if (previousUsers.length > 0){
                return res.send({
                    success: false,
                    message: 'Error: Account already exists.'
                });
            }

            // Save the new user
            const newUser = new User();
            newUser.phoneNumber = phoneNumber;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed Up'
                });
            });
        });
    });
};
