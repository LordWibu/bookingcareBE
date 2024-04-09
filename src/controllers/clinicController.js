import clinicService from '../services/clinicService';


let createClinic = async (req, res) => {
    try {
        let info = await clinicService.createClinic(req.body);
        return res.status(200).json(
            info
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        const search = req.query.keyword || '';
        let info = await clinicService.getAllClinic(search);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let getDetailClinicById = async (req, res) => {
    try {
        let info = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let updateClinic = async (req, res) => {
    try {
        let data = await clinicService.updateClinic(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteClinic = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await clinicService.deleteClinic(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    updateClinic: updateClinic,
    deleteClinic: deleteClinic
}