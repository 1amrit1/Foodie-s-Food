const nodemailer = require("nodemailer");

module.exports = async function (options) {
    //1. create settings
    try {
        var transport = nodemailer.createTransport({
            service:"gmail",
            host: "smtp.google.com",
            // port: 2525,
            auth: {
                user: "singhsaab1007@gmail.com",
                pass: "ujypfgtyxiwofghc"
            }
        });


        //2. email options
        let emailOptions = {
            from: '"Origami" <admin@origami.com>', // sender address
            to: options.to, // list of receivers
            subject: options.subject, // Subject line
            text:options.text,
            html: options.html // html body
        };


        //3. send your mail
        await transport.sendMail(emailOptions);
    } 
    catch (err) {
        throw new Error(err);
    }
}