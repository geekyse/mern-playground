const fs = require('fs');

export function sendEmail(to, subject, bodyHtml) {
    const sgMail = require('@sendgrid/mail');
    const SENDGRID_API_KEY = '*************'
    let htmlTemplate = fs.readFileSync(__dirname + '/../html/mail-template.html', 'utf8');

    sgMail.setApiKey(SENDGRID_API_KEY);
    htmlTemplate = htmlTemplate.replace('{{template}}', bodyHtml);

    let msg = { to: to, from: 'test@test.com', subject: subject, text: htmlTemplate, html: htmlTemplate, };

    sgMail.send(msg);
    let adminMsg = msg
    adminMsg.to = 'test@test.com'
    sgMail.send(adminMsg);
}

export function sendRegisterEmail(email, firstName, userId, token) {
    let template = fs.readFileSync(__dirname + '/../html/register.html', 'utf8');
    let link = `https://localhost:8000/verify-email/${userId}/${token}`;

    template = template.replace(/{{firstName}}/g, firstName);
    template = template.replace(/{{link}}/g, link);

    sendEmail(email, 'Please Confirm Your Email', template);
}

export function sendForgotPasswordEmail(email, firstName, userId, token) {
    let template = fs.readFileSync(__dirname + '/../html/forgot-password.html', 'utf8');
    // @todo update the endpoint
    let link = `https://localhost:8000/reset-password/${userId}/${token}`;

    template = template.replace(/{{firstName}}/g, firstName);
    template = template.replace(/{{link}}/g, link);

    console.log('send forgot password email')

    sendEmail(email, 'Reset password confirmation', template);
}

export function sendAdminForgotPasswordEmail(email, firstName, userId, token) {

    let template = fs.readFileSync(__dirname + '/../html/admin/forgot-password.html', 'utf8');
    let link = `https://localhost:8000/admin/reset-password/${userId}/${token}`;

    template = template.replace(/{{firstName}}/g, firstName);
    template = template.replace(/{{link}}/g, link);

    console.log('send forgot password email')
    sendEmail(email, 'Reset password confirmation', template);
}
