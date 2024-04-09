const { reject } = require("lodash");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");


let createClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.address ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {

                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {

                await db.Clinic.create({
                    name: data.name,
                    address: data.address,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown
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

let getAllClinic = (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            let clinics;
            if (search === '') {
                clinics = await db.Clinic.findAll()
                if (clinics && clinics.length > 0) {
                    clinics.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    clinics
                })
            } else {
                clinics = await db.Clinic.findAll({
                    where: {
                        name: { [Op.like]: `%${search}%` }
                    }
                })
                if (clinics && clinics.length > 0) {
                    clinics.map(item => {
                        item.image = new Buffer(item.image, 'base64').toString('binary');
                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                    clinics
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}

let getDetailClinicById = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!clinicId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Clinic.findOne({
                    where: { id: clinicId },
                    attributes: ['name', 'address', 'descriptionHTML', 'descriptionMarkdown', 'image']
                });

                if (data) {
                    let doctorClinic = [];

                    data.image = new Buffer(data.image, 'base64').toString('binary');

                    doctorClinic = await db.Doctor_Info.findAll({
                        where: {
                            clinicId: clinicId,
                        },
                        attributes: ['doctorId', 'provinceId']
                    })

                    data.doctorClinic = doctorClinic;
                } else {
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

let updateClinic = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let clinic = await db.Clinic.findOne({
                where: { id: data.id },
                raw: false
            });
            if (clinic) {
                clinic.name = data.name;
                clinic.address = data.address;
                clinic.descriptionHTML = data.descriptionHTML;
                clinic.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    clinic.image = data.imageBase64;
                }

                await clinic.save();
                resolve({
                    errCode: 0,
                    message: 'Update clinic succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Clinic Not Found!!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteClinic = (clinicId) => {
    return new Promise(async (resolve, reject) => {
        let clinic = await db.Clinic.findOne({
            where: { id: clinicId }
        })
        if (!clinic) {
            resolve({
                errCode: 2,
                errMessage: `The clinic isn't exist!`
            })
        }
        await db.Clinic.destroy({
            where: { id: clinicId }
        });
        resolve({
            errCode: 0,
            errMessage: 'The clinic is deleted!'
        })
    })
}


module.exports = {
    createClinic: createClinic,
    getAllClinic: getAllClinic,
    getDetailClinicById: getDetailClinicById,
    updateClinic: updateClinic,
    deleteClinic: deleteClinic
}