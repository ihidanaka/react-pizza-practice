const nodemailer = require('nodemailer');
class MailService {

    constructor (){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
            secure:false, 
            auth:{
                user:"reactpizza.store@yandex.ru",
                pass:"emwxsmaqbfezrlds"
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from:"reactpizza.store@yandex.ru",
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