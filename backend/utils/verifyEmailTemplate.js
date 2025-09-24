const verifyEmailTemplate = ({ name, url }) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear ${name},</p>
        <p>Thank you for registering with BuyIt.</p>
        <p>Please verify your email by clicking the button below:</p>
        <a href="${url}" 
           style="display: inline-block; text-decoration: none; background-color: green; color: white; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
            Verify Email
        </a>
        <p>If you did not register, please ignore this email.</p>
        <br/>
        <p>Thanks,</p>
        <p>BuyIt Team</p>
    </div>
    `;
};

export default verifyEmailTemplate;