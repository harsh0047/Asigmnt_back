const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String
    },
    block_id: {
        type: Schema.Types.ObjectId,
        ref: "blocks"
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "users"
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
module.exports = mongoose.model('comments', CommentSchema);
