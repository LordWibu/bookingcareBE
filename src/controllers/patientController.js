import patientService from '../services/patientService';

let postBookAppointment = async (req, res) => {
    try {
        let extraInfo = await patientService.postBookAppointment(req.body);
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

let postVerifyBookAppointment = async (req, res) => {
    try {
        let extraInfo = await patientService.postVerifyBookAppointment(req.body);
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

let postConfirmBookAppointment = async (req, res) => {
    try {
        let extraInfo = await patientService.postConfirmBookAppointment(req.body.id);
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

let getAllBooking = async (req, res) => {
    try {
        let booking = await patientService.getAllBooking();
        return res.status(200).json(
            booking
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

let deleteBooking = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await patientService.deleteBooking(req.body.id);
    return res.status(200).json(message);
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    postConfirmBookAppointment: postConfirmBookAppointment,
    getAllBooking: getAllBooking,
    deleteBooking: deleteBooking
}