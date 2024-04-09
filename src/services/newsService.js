const { reject } = require("lodash");
const db = require("../models");
const { Sequelize, Op } = require("sequelize");

let createNews = (data) => {
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

                await db.News.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,
                    isdoctor: data.isdoctor
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


let getAllNews = async (search, isdoctor) => {
    return new Promise(async (resolve, reject) => {
        try {
            let news;
            if (isdoctor !== '') {
                news = await db.News.findAll({
                    where: {
                        isdoctor
                    }
                })
            } else {
                news = await db.News.findAll({})
            }

            if (news && news.length > 0) {
                news.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'OK',
                news
            })
        } catch (e) {
            reject(e);
        }
    })
}

let updateNews = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter!'
                })
            }
            let news = await db.News.findOne({
                where: { id: data.id },
                raw: false
            });
            if (news) {
                news.name = data.name;
                news.descriptionHTML = data.descriptionHTML;
                news.descriptionMarkdown = data.descriptionMarkdown;
                news.isdoctor = data.isdoctor;
                if (data.imageBase64) {
                    news.image = data.imageBase64;
                }

                await news.save();
                resolve({
                    errCode: 0,
                    message: 'Update news succeeds!'
                });
            } else {
                resolve({
                    errCode: 1,
                    message: 'News Not Found!!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteNews = (newsId) => {
    return new Promise(async (resolve, reject) => {
        let news = await db.News.findOne({
            where: { id: newsId }
        })
        if (!news) {
            resolve({
                errCode: 2,
                errMessage: `The news isn't exist!`
            })
        }
        await db.News.destroy({
            where: { id: newsId }
        });
        resolve({
            errCode: 0,
            errMessage: 'The news is deleted!'
        })
    })
}

let getDetailNewsById = (newsId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!newsId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.News.findOne({
                    where: { id: newsId },
                    attributes: ['name', 'descriptionHTML', 'descriptionMarkdown', 'updatedAt']
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



module.exports = {
    createNews: createNews,
    getAllNews: getAllNews,
    updateNews: updateNews,
    deleteNews: deleteNews,
    getDetailNewsById: getDetailNewsById,

}