import doctorService from '../services/doctorService';


let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from server!'
        })
    }
}

let getAllDoctors = async (req, res) => {
    try {
        const search = req.query.keyword || '';
        let doctors = await doctorService.getAllDoctors(search);
        return res.status(200).json(doctors);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let postInfoDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInfoDoctor(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getdetailDoctorById = async (req, res) => {
    try {
        let info = await doctorService.getdetailDoctorById(req.query.id);
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

let bulkCreateSchedule = async (req, res) => {
    try {
        let info = await doctorService.bulkCreateSchedule(req.body);
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

let getScheduleByDate = async (req, res) => {
    try {
        let info = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
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

let getExtraDoctorInfoById = async (req, res) => {
    try {
        let extraInfo = await doctorService.getExtraDoctorInfoByIdService(req.query.doctorId);
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

let getProfileDoctorById = async (req, res) => {
    try {
        let extraInfo = await doctorService.getProfileDoctorById(req.query.doctorId);
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

let getListPatientForDoctor1 = async (req, res) => {
    try {
        let info = await doctorService.getListPatientForDoctor1(req.query.doctorId, req.query.date);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let getListPatientForDoctor2 = async (req, res) => {
    try {
        let info = await doctorService.getListPatientForDoctor2(req.query.date);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let sendRemedy = async (req, res) => {
    try {
        let info = await doctorService.sendRemedy(req.body);
        return res.status(200).json(info);
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInfoDoctor: postInfoDoctor,
    getdetailDoctorById: getdetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraDoctorInfoById: getExtraDoctorInfoById,
    getProfileDoctorById: getProfileDoctorById,
    getListPatientForDoctor1: getListPatientForDoctor1,
    getListPatientForDoctor2: getListPatientForDoctor2,
    sendRemedy: sendRemedy,

}