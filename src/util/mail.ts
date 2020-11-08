const fs = require('fs');

export function sendEmail(to, subject, bodyHtml) {
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
    const sgMail = require('@sendgrid/mail');
    const SENDGRID_API_KEY = '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'
    sgMail.setApiKey(SENDGRID_API_KEY);


    let htmlTemplate = fs.readFileSync(__dirname + '/../html/mail-template.html', 'utf8');

    htmlTemplate = htmlTemplate.replace('{{template}}', bodyHtml);

    let msg = {
        to: to,
        from: 'support@baseetaa.com',
        subject: subject,
        text: htmlTemplate,
        html: htmlTemplate,
    };

    sgMail.send(msg);
    let adminMsg = msg
    adminMsg.to = 'admin@baseetaa.com'
    sgMail.send(adminMsg);
}

export function sendRegisterEmail(email, firstName, userId, token) {
    let template = fs.readFileSync(__dirname + '/../html/register.html', 'utf8');

    let link = `https://baseetaa.com/verify-email/${userId}/${token}`;

    template = template.replace(/{{firstName}}/g, firstName);
    template = template.replace(/{{link}}/g, link);

    sendEmail(email, 'Welcome to baseetaa.com! Confirm Your Email', template);

}

export function sendForgotPasswordEmail(email, firstName, userId, token) {

    let template = fs.readFileSync(__dirname + '/../html/forgot-password.html', 'utf8');

    let link = `https://baseetaa.com/reset-password/${userId}/${token}`;

    template = template.replace(/{{firstName}}/g, firstName);
    template = template.replace(/{{link}}/g, link);

    console.log('send forgot password email')

    sendEmail(email, 'Reset password confirmation', template);

}

export function sendAdminForgotPasswordEmail(email, firstName, userId, token) {

    let template = fs.readFileSync(__dirname + '/../html/admin/forgot-password.html', 'utf8');

    let link = `https://baseetaa.com/admin/reset-password/${userId}/${token}`;

    template = template.replace(/{{firstName}}/g, firstName);
    template = template.replace(/{{link}}/g, link);

    console.log('send forgot password email')

    sendEmail(email, 'Reset password confirmation', template);

}