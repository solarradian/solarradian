import { Resend } from 'resend';
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.RESEND_API){
    console.log("provide RESEND_API in .env file")
}

const resend = new Resend(process.env.RESEND_API);

const sendEmail = async({sendTo , subject , html}) =>{

    try {
        
        const { data, error } = await resend.emails.send({
            from: 'Solar Radian <contact@solarradian.com>',
            to: sendTo,
            subject: subject,
            html: html,
          });
          if (error) {
            return console.error({ error });
          }

          return data
          
    } catch (error) {
        console.log(error)
    }


}

export default sendEmail;
  
