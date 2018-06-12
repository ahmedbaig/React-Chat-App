const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const UserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

UserSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
