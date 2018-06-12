const mongoose = require('mongoose');

const FriendsSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: -1
    },
    contact:[{
      name: {
        type: String,
        default: ''
      },
      number: {
        type: String,
        default: ''
      }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Friends', FriendsSchema);
