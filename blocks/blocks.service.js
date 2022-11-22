const Blocks = require('./blocks.model');
const Comments = require('./comments.model');

class BlockService {
    async createBlock(data) {
        let blockData = {
            block_content: data.block_content,
            createtor_id: data.createtor_id,
            is_aproved: false,
            created_on: new Date().getTime(),
            updated_on: new Date().getTime()
        }
        let newBlock = await Blocks.create(blockData);
        if (newBlock)
            return {
                code: 200,
                msg: "SUCCESS"
            }

        return {
            code: 405,
            msg: "ERROR"
        }
    }

    async getBlocks(callback) {

        await Blocks.aggregate([
            {
                "$match": {
                    is_aproved: true,
                    is_deleted: false
                }
            }, {
                "$lookup": {
                    "from": "comments",
                    "localField": "_id",
                    "foreignField": "block_id",
                    "as": "comments"
                }
            }
        ]).exec(function (err, result) {
            console.log(result, err)
            if (result != null) {
                callback({
                    code: 200,
                    msg: "SUCCESS",
                    data: result
                })
            } else {
                callback({
                    code: 405,
                    msg: "ERROR"
                })
            }
        })

    }

    async editBlock(data) {
        let BlocksData = await Blocks.updateOne(
            { _id: data.block_id },
            {
                $set: {
                    block_content: data.block_content,
                    updated_on: new Date().getTime()
                }
            }
        );
        if (BlocksData)
            return ({
                code: 200,
                msg: "SUCCESS",
                data: BlocksData
            })
        return ({
            code: 405,
            msg: "ERROR"
        })
    }

    async aproveBlock(data) {
        let BlocksData = await Blocks.updateOne(
            { _id: data.block_id },
            { $set: { is_aproved: data.is_aproved } }
        );
        if (BlocksData)
            return ({
                code: 200,
                msg: "SUCCESS",
                data: BlocksData
            })
        return ({
            code: 405,
            msg: "ERROR"
        })
    }

    async addComment(data) {
        let commentData = {
            comment: data.comment,
            user_id: data.user_id,
            block_id: data.block_id,
            created_on: new Date().getTime(),
            updated_on: new Date().getTime()
        }
        let newComment = await Comments.create(commentData);
        if (newComment)
            return {
                code: 200,
                msg: "SUCCESS"
            }

        return {
            code: 405,
            msg: "ERROR"
        }
    }

}

module.exports = new BlockService();