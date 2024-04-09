import contactService from '../services/contactService';
import { sendMailFeedback } from '../services/emailService';
import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';

let createContact = async (req, res) => {
    try {
        let contact = await contactService.createContact(req.body);
        return res.status(200).json(
            contact
        )
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from the server!'
        })
    }
}

//req.query.date
let getAllContact = async (req, res) => {
    try {
        let contact = await contactService.getListContact();
        return res.status(200).json(contact);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let getDetailContactById = async (req, res) => {
    try {
        let info = await contactService.getDetailContactById(req.query.id);
        return res.status(200).json(info);
    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

let sendFeedback = async (req, res) => {
    try {
        let contact = await db.Contact.findOne({
            where: { id: req.params.id }
        })

        sendMailFeedback({
            email: contact.email,
            fullName: contact.fullName,
            feedback: req.body.feedback
        })

        await db.Contact.update({
            status: true
        }, {
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json({
            errCode: 0,
            errMessage: "Send Feedback succeed!"
        })
    } catch (e) {
        res.status(200).json({
            errCode: -1,
            errMessage: "Error from server!"
        })
    }
}

module.exports = {
    createContact: createContact,
    getAllContact: getAllContact,
    getDetailContactById: getDetailContactById,
    sendFeedback: sendFeedback
}
