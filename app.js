const nodemailer = require('nodemailer')
const {google} = require('googleapis')

const CLIENT_ID = '492649093281-tere7u8oeeplg5ofgm074tenirevkbq0.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04iH3o3CmLUrGCgYIARAAGAQSNwF-L9IrKRmPc1EN8mIN7hKJhXOxIBD2SCKmTXV3wzpabmadjRV24lMjFYKknSc5q-6bOGAMsA0'

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})


console.log(process.argv); // the first two arguments are the node location and javascript file location, they dont mean anything

args = process.argv

const toEmail = args[2]
const subjectLine = args[3]
const emailBody = args[4]

async function sendMail(){
    try{
        const accessToken = await oAuth2Client.getAccessToken
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'coms6156projectnotifier@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        
        const mailOptions = {
            from: 'coms6156projectnotifier@gmail.com',
            to: toEmail,
            subject: subjectLine,
            text: emailBody,
            html: '<p>'.concat(emailBody, '</p>')
        };

        const result = await transport.sendMail(mailOptions)

        return result

    }catch(error){
        return error
    }
}


sendMail().then(result => console.log('Email sent...',result))
.catch(error => console.log(error.message));