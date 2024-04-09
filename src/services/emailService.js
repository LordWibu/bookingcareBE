require('dotenv').config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // port: 587,
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Hỏi Dân IT 👻" <haryphamdev@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend)
        ,
    });
}

let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>

        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online
        trên Bookingcare.vn</p>
        <p>Thông tin đặt kịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật vui lòng click 
        vào đường link bên dưới để hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Xin chân thành cảm ơn!</div>
    
    `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>

        <p>You receive this email for booking online examination
        on bookingcare.vn</p>
        <p>Information on medical examination:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is true, please click on the link below to complete the procedure to schedule a medical examination</p>
        <div>
        <a href=${dataSend.redirectLink} target="_blank">Click here</a>
        </div>

        <div>Sincerely thank!</div>
    `
    }

    return result;
}



let sendAttachment = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // port: 587,
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Hỏi Dân IT 👻" <haryphamdev@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png `,
                content: dataSend.imageBase64.split("base64,")[1],
                encoding: 'base64'
            },
        ],
    });
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}</h3>

        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online
        trên Bookingcare.vn</p>
        <p>Thông tin hoá đơn khám bệnh được đặt trong file sau:</p>
        

        <div>Xin chân thành cảm ơn!</div>
    
    `
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear name, ${dataSend.patientName}</h3>

        <p>You receive this email for booking online examination
        on bookingcare.vn</p>
        <p>Information on medical examination:</p>
       

        <div>Sincerely thank!</div>
    
    `
    }
    return result;
}

let sendMailFeedback = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // port: 587,
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    let info = await transporter.sendMail({
        from: '"Hỏi Dân IT 👻" <haryphamdev@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Liên hệ & hợp tác", // Subject line
        html: getBodyHTMLEmailContact(dataSend),

    });
}

let getBodyHTMLEmailContact = (dataSend) => {
    let result = `
        <h3>Xin chào ${dataSend.fullName}</h3>

        <p>Bạn nhận được email này vì đã liên hệ với chúng tôi
        trên Bookingcare.vn</p>
        <p>${dataSend.feedback}</p>
        
        <div>Xin chân thành cảm ơn!</div>
    `

    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachment: sendAttachment,
    sendMailFeedback: sendMailFeedback
}