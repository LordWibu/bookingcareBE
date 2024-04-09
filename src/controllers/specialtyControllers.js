import specialtyService from '../services/specialtyService';

let createSpecialty = async (req, res) => {
    try {
        let extraInfo = await specialtyService.createSpecialty(req.body);
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

let getAllSpecialties = async (req, res) => {
    try {
        const search = req.query.keyword || '';
        let specialties = await specialtyService.getAllSpecialties(search);
        return res.status(200).json(specialties);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateSpecialties = async (req, res) => {
    try {
        let data = await specialtyService.updateSpecialties(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteSpecialty = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await specialtyService.deleteSpecialty(req.body.id);
    return res.status(200).json(message);
}

let getDetailSpecialtyById = async (req, res) => {
    try {
        let info = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties,
    updateSpecialties: updateSpecialties,
    deleteSpecialty: deleteSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,

}