import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';

let createContact = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.fullName &&
                data.email &&
                data.address &&
                data.phoneNumber &&
                data.content
            ) {
                await db.Contact.create({
                    fullName: data.fullName,
                    email: data.email,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    content: data.content,
                    status: data.status
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })

            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })

            }
        } catch (e) {
            reject(e)
        }
    })
}

let getListContact = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let contact = await db.Contact.findAll({
                where: { status: 0 }
            });
            if (contact) {
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    contact
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameters!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getDetailContactById = (contactId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!contactId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Contact.findOne({
                    where: { id: contactId }
                });

                if (!data) {
                    data = {}
                }
                resolve({
                    errMessage: "OK",
                    errCode: 0,
                    data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

//Khi click vao 'Click here', chuyen statusId tu S1 => S2(active)
// let sendFeedback = (data, feedback) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             if (!data.email || !data.contactId || feedback) {
//                 resolve({
//                     errCode: 1,
//                     errMessage: 'Missing required parameters!'
//                 })
//             } else {
//                 let appointment = await db.Booking.findOne({
//                     where: {
//                         doctorId: data.doctorId,
//                         token: data.token,
//                         status: false
//                     },
//                     raw: false,//dung dc ham update
//                 })

//                 if (appointment) {
//                     appointment.statusId = 'S2'
//                     await appointment.save();
//                     resolve({
//                         errCode: 0,
//                         errMessage: 'Update the appointment succeed!'
//                     })
//                 } else {
//                     resolve({
//                         errCode: 2,
//                         errMessage: 'Appointment has been activated or does not exist!'
//                     })
//                 }
//             }
//         } catch (e) {
//             reject(e);
//         }
//     })
// }
module.exports = {
    createContact: createContact,
    // postVerifyBookAppointment: postVerifyBookAppointment,
    getListContact: getListContact,
    getDetailContactById: getDetailContactById,
    //sendFeedback: sendFeedback
}

