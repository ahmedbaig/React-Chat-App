const mongoose = require('mongoose');

const MessageBackupSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: -1
    },
    reciever: {
      type: String,
      default: ''
    },
    messages:[{
      to: {
        type: String,
        default: ''
      },
      from: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      }
    }],
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('MessageBackup', MessageBackupSchema);
