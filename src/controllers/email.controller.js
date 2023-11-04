const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


async function sendVerificationEmail (recipientEmail){
    const msg = {
        to: recipientEmail,
        from: process.env.SENDER_EMAIL,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: Aqui va el link`,
        html: `<strong>Please verify your email by clicking on the following link: <a href="Aquí tambien va link">Aquí tambien va link</a></strong>`,
    };
    try {
        await sgMail.send(msg);
        console.log('Email sent');
        return { message: 'Verification email sent' };
    } catch (error) {
        console.log('Email not sent');

        throw new Error('Server error');
    }
}

module.exports = {
    sendVerificationEmail
}