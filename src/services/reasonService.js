const { reject } = require("lodash");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");

let createReason = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.specialtyId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {

                await db.Reason.create({
                    name: data.name,
                    specialtyId: data.specialtyId
                })

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


let getAllReasons = async (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            let reasons;
            if (search !== '') {
                reasons = await db.Reason.findAll({
                    where: {
                        name: {

                            [Op.like]: `%${search}%`

                        },

                    }
                })
            } else {
                reasons = await db.Reason.findAll({})
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                reasons
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateReason = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let reason = await db.Reason.findOne({
                where: { id: data.id },
                raw: false
            });
            if (reason) {
                reason.name = data.name;
                reason.specialtyId = data.specialtyId;
                await reason.save();
                resolve({
                    errCode: 0,
                    message: 'Update reason succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Reason Not Found!!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteReason = (reasonId) => {
    return new Promise(async (resolve, reject) => {
        let reason = await db.Reason.findOne({
            where: { id: reasonId }
        })
        if (!reason) {
            resolve({
                errCode: 2,
                errMessage: `The reason isn't exist!`
            })
        }
        await db.Reason.destroy({
            where: { id: reasonId }
        });
        resolve({
            errCode: 0,
            errMessage: 'The reason is deleted!'
        })
    })
}

let getDetailReasonById = (reasonId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!reasonId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let result = await db.Reason.findOne({
                    where: { id: reasonId },
                });


                if (result) {
                    let doctorReason = [];
                    doctorReason = await db.Doctor_Info.findAll({
                        where: {
                            specialtyId: result.specialtyId,
                        },
                        attributes: ['doctorId']
                    })

                    result.doctorReason = doctorReason;
                } else {
                    result = {}

                }
                resolve({
                    errMessage: "OK",
                    errCode: 0,
                    result
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createReason: createReason,
    getAllReasons: getAllReasons,
    updateReason: updateReason,
    deleteReason: deleteReason,
    getDetailReasonById: getDetailReasonById,

}