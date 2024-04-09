import newsService from '../services/newsService';

let createNews = async (req, res) => {
    try {
        let extraInfo = await newsService.createNews(req.body);
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

let getAllNews = async (req, res) => {
    try {
        const search = req.query.keyword || '';
        const isdoctor = req.query.isdoctor || '';
        let news = await newsService.getAllNews(search, isdoctor);
        return res.status(200).json(news);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let updateNews = async (req, res) => {
    try {
        let data = await newsService.updateNews(req.body);
        return res.status(200).json(data);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let deleteNews = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await newsService.deleteNews(req.body.id);
    return res.status(200).json(message);
}

let getDetailNewsById = async (req, res) => {
    try {
        let info = await newsService.getDetailNewsById(req.query.id, req.query.location);
        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    createNews: createNews,
    getAllNews: getAllNews,
    updateNews: updateNews,
    deleteNews: deleteNews,
    getDetailNewsById: getDetailNewsById,

}