const nodemailer = require('nodemailer');
class MailService {

    constructor (){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port:587,
            secure:false, 
            auth:{
                user:"reactkisselow@gmail.com",
                pass:`$d/RGr3wz\k!YF=N`
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from:"reactkisselow@gmail.com",
            to,
            subject:'Account activation on react-pizza.store',
            text:'',
            html: `
                <div> 
                <h1>For activation tap on link</h1>
                <a href = "${link}">${link}</a>
                </div>

            `
        })
    }
}

module.exports = new MailService();