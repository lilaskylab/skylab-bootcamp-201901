const nodemailer = require('nodemailer')
const validate = require('startlab-validation')
const pug = require('pug')
// const invitationTemplate = require('./templates/invitation.pug')
// const invitationTemplate = pug.compileFile('templates/invitation.pug')

const emailing = {
  sendInvitation(emailTo, name) {
    validate([
      { key: 'emailTo', value: emailTo, type: String },
      { key: 'name', value: name, type: String }
    ])

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'start.lab.app@gmail.com',
        pass: 'StartLab2019###'
      }
    })

    //const html = pug.renderFile('invitation.pug', { name: 'Nico' }) // por ahora no funciona

    const mailOptions = {
      from: 'start.lab.app@gmail.com',        // sender address
      to: emailTo,                            // list of receivers
      subject: 'Subject of your email',       // Subject line
      //html: html                            // plain text body
      // html: 'esto sí que funciona perfecto!'  // plain text body
      html: `Hello ${name}. <a href="http://localhost:3000/#/register">Register</a>`  // plain text body
    }

    transporter.sendMail(mailOptions, function (err, info) {
      if (err)
        console.log(err)
      else
        console.log(info);
    })
  }
}

module.exports = emailing