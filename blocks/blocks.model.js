const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const BlockSchema = new mongoose.Schema({
    block_content: {
        type: String
    },
    createtor_id: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    is_aproved: {
        type: Boolean
    },
    created_on: {
        type: String
    },
    is_deleted: {
        type: Boolean,
        default: false
    },
    updated_on: {
        type: String
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});
module.exports = mongoose.model('blocks', BlockSchema);
