const { reject } = require("lodash");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name ||
                !data.imageBase64 ||
                !data.descriptionHTML ||
                !data.descriptionMarkdown
            ) {

                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters!'
                })
            } else {

                await db.Specialty.create({
                    name: data.name,
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

//encode: chuyển ảnh từ file -> binary
//decode: chuyển từ dạng binary(db) -> string(trong đây là quá trình decode)

let getAllSpecialties = async (search) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties;
            if (search !== '') {
                specialties = await db.Specialty.findAll({
                    where: {
                        name: {

                            [Op.like]: `%${search}%`

                        },

                    }
                })
            } else {
                specialties = await db.Specialty.findAll({})
            }

            if (specialties && specialties.length > 0) {
                specialties.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                specialties
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateSpecialties = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let specialty = await db.Specialty.findOne({
                where: { id: data.id },
                raw: false
            });
            if (specialty) {
                specialty.name = data.name;
                specialty.descriptionHTML = data.descriptionHTML;
                specialty.descriptionMarkdown = data.descriptionMarkdown;
                if (data.imageBase64) {
                    specialty.image = data.imageBase64;
                }

                await specialty.save();
                resolve({
                    errCode: 0,
                    message: 'Update specialty succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'Specialty Not Found!!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteSpecialty = (specialtyId) => {
    return new Promise(async (resolve, reject) => {
        let specialty = await db.Specialty.findOne({
            where: { id: specialtyId }
        })
        if (!specialty) {
            resolve({
                errCode: 2,
                errMessage: `The specialty isn't exist!`
            })
        }
        await db.Specialty.destroy({
            where: { id: specialtyId }
        });
        resolve({
            errCode: 0,
            errMessage: 'The specialty is deleted!'
        })
    })
}

let getDetailSpecialtyById = (specialtyId, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!specialtyId || !location) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.Specialty.findOne({
                    where: { id: specialtyId },
                    attributes: ['descriptionHTML', 'descriptionMarkdown', 'image']
                });

                if (data) {
                    let doctorSpecialty = [];
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                    if (location === 'ALL') {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: { specialtyId: specialtyId },
                            attributes: ['doctorId', 'provinceId']
                        })
                    } else {
                        doctorSpecialty = await db.Doctor_Info.findAll({
                            where: {
                                specialtyId: specialtyId,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }

                    data.doctorSpecialty = doctorSpecialty;
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

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialties: getAllSpecialties,
    updateSpecialties: updateSpecialties,
    deleteSpecialty: deleteSpecialty,
    getDetailSpecialtyById: getDetailSpecialtyById,

}