import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';
import emailService from './emailService';
import { v4 as uuidv4 } from 'uuid';


let buildUrlEmail = (doctorId, token) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`
    return result;
}
let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.date || !data.timeType
                || !data.fullName || !data.selectedGender || !data.address || !data.phoneNumber) {

                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    language: data.language,
                    redirectLink: buildUrlEmail(data.doctorId, token)
                })

                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3',
                        gender: data.selectedGender,
                        address: data.address,
                        firstName: data.fullName,
                        phonenumber: data.phoneNumber,
                    }
                });
                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {
                            patientId: user[0].id,
                            doctorId: data.doctorId,
                            date: data.date,
                            timeType: data.timeType,
                        },//timf theo dk, neu co id roi thi ko lam gi, neu chua co thi tao them
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            phonenumber: data.phoneNumber,
                            timeType: data.timeType,
                            token: token
                        }

                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save info patient succeed!'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

//Khi click vao 'Click here', chuyen statusId tu S1 => S2(active)
let postVerifyBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.token || !data.doctorId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false,//dung dc ham update
                })

                if (appointment) {
                    appointment.statusId = 'S2'
                    await appointment.save();
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment succeed!'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist!'
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    })
}

let postConfirmBookAppointment = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let appointment = await db.Booking.findOne({
                where: {
                    id: bookingId,
                    statusId: 'S1'
                },
                raw: false,//dung dc ham update
            })

            if (appointment) {
                appointment.statusId = 'S2'
                await appointment.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update the appointment succeed!'
                })
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Appointment has been activated or does not exist!'
                })
            }
            //}
        } catch (e) {
            reject(e);
        }
    })
}

let getAllBooking = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let booking = await db.Booking.findAll({

            });
            resolve({
                errCode: 0,
                errMessage: 'OK',
                booking
            })
        } catch (e) {
            reject(e);
        }
    })
}

let deleteBooking = (bookingId) => {
    return new Promise(async (resolve, reject) => {
        let booking = await db.Booking.findOne({
            where: { id: bookingId }
        })
        if (!booking) {
            resolve({
                errCode: 2,
                errMessage: `The booking isn't exist!`
            })
        }
        await db.Booking.destroy({
            where: { id: bookingId }
        });
        resolve({
            errCode: 0,
            errMessage: 'The booking is deleted!'
        })
    })
}

module.exports = {
    postBookAppointment: postBookAppointment,
    postVerifyBookAppointment: postVerifyBookAppointment,
    postConfirmBookAppointment: postConfirmBookAppointment,
    getAllBooking: getAllBooking,
    deleteBooking: deleteBooking
}

