import reasonService from '../services/reasonService';

let createReason = async (req, res) => {
    try {
        let extraInfo = await reasonService.createReason(req.body);
        return res.status(200).json(
            extraInfo
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let getAllReasons = async (req, res) => {
    try {
        const search = req.query.keyword || '';
        let reasons = await reasonService.getAllReasons(search);
        return res.status(200).json(reasons);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateReason = async (req, res) => {
    try {
        let data = await reasonService.updateReason(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteReason = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await reasonService.deleteReason(req.body.id);
    return res.status(200).json(message);
}

let getDetailReasonById = async (req, res) => {
    try {
        let info = await reasonService.getDetailReasonById(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    createReason: createReason,
    getAllReasons: getAllReasons,
    updateReason: updateReason,
    deleteReason: deleteReason,
    getDetailReasonById: getDetailReasonById,

}