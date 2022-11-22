const express = require('express');
const router = express.Router();
const validator = require('../tools/validators');

// const UserService = require('./users.service');
const blockService = require('./blocks.service')

class BlockController {
    constructor() {
        router.post('/createblock', this.createblock);
        router.post('/editblock', this.editblock);
        router.post('/aproveblock', this.aproveblock);
        router.get('/getblocks', this.getblocks);
        router.post('/addcomment', this.addcomment);
    }

    async createblock(req, res) {
        const data = {
            creator_id: req.body.creator_id != undefined ? req.body.creator_id.trim() : '' || '',
            block_content: req.body.block_content != undefined ? req.body.block_content : '' || '',
        }
        let required = ['creator_id', 'block_content'];
        if (!validator.validateForm(required, data)) {
            let requiredata = validator.getRequiredParam(required, data);
            return res.status(200).json({
                code: 405,
                msg_type: requiredata[0].toUpperCase() + "_INVALID"
            })
        }
        const result = await blockService.createBlock(data);
        res.json(result);
    }

    async editblock(req, res) {
        const data = {
            block_id: req.body.block_id != undefined ? req.body.block_id.trim() : '' || '',
            block_content: req.body.block_content != undefined ? req.body.block_content : '' || '',
        }
        let required = ['block_content', 'block_id'];
        if (!validator.validateForm(required, data)) {
            let requiredata = validator.getRequiredParam(required, data);
            return res.status(200).json({
                code: 405,
                msg_type: requiredata[0].toUpperCase() + "_INVALID"
            })
        }
        const result = await blockService.editBlock(data);
        res.json(result);
    }

    async aproveblock(req, res) {
        const data = {
            block_id: req.body.block_id != undefined ? req.body.block_id.trim() : '' || '',
            is_aproved: req.body.is_aproved != undefined ? req.body.is_aproved.trim() : '' || ''
        }
        let required = ['block_id', 'is_aproved'];
        if (!validator.validateForm(required, data)) {
            let requiredata = validator.getRequiredParam(required, data);
            return res.status(200).json({
                code: 405,
                msg_type: requiredata[0].toUpperCase() + "_INVALID"
            })
        }
        const result = await blockService.aproveBlock(data);
        res.json(result);
    }

    async getblocks(req, res) {
        // const result = await blockService.getBlocks();
        // res.json(result);

        blockService.getBlocks(function (result) {
            res.status(200).json(result);
        })
    
    }

    async addcomment(req, res) {
        const data = {
            user_id: req.body.user_id != undefined ? req.body.user_id.trim() : '' || '',
            block_id: req.body.block_id != undefined ? req.body.block_id.trim() : '' || '',
            comment: req.body.comment != undefined ? req.body.comment : '' || '',
        }
        let required = ['block_id', 'comment', 'user_id'];
        if (!validator.validateForm(required, data)) {
            let requiredata = validator.getRequiredParam(required, data);
            return res.status(200).json({
                code: 405,
                msg_type: requiredata[0].toUpperCase() + "_INVALID"
            })
        }
        const result = await blockService.addComment(data);
        res.json(result);
    }
}

new BlockController();
module.exports = router;