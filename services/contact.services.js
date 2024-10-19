const nodemailer = require('nodemailer');
const { contactSchema } = require("../model/contact.model");

const transporter = nodemailer.createTransport({
    service: 'gmail', // or use another service
    auth: {
        user: 'whystudios8@gmail.com', // replace with your email
        pass: 'alyt ecpt vnfc ydin'   // replace with your email password
    }
});

// Message Received HTML email with logo
const messageReceivedEmail = (contact) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Message Received Successfully</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f9;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow-y: scroll;
                }
                .email-container {
                    background-color: #ffffff;
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    max-width: 600px;
                    margin: 20px;
                    padding: 10px;
                    text-align: justify;
                }
                .email-header {
                    padding: 10px 0;
                    text-align: center;
                }
                .email-header img {
                    width: 150px;
                    height: auto;
                    margin-bottom: 10px;
                }
                .email-header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .email-content {
                    padding: 20px;
                }
                .email-content p {
                    font-size: 16px;
                    color: #333333;
                }
                .email-footer {
                    font-size: 14px;
                    color: #666666;
                    margin-top: 10px;
                    text-align: center;
                    padding-top: 10px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">
                    <h1>Message Received Successfully</h1>
                </div>
                <div class="email-content">
                    <p>Dear ${contact.name},</p>
                    <p>
                        We have received your message. Thank you for reaching out to us. Our support team will get back to you shortly.
                    </p>
                    <p>If you have any additional questions, feel free to contact us.</p>
                    <p>Best regards,<br />The Support Team</p>
                </div>
                <div class="email-footer">
                    <p>&copy; ${new Date().getFullYear()} Innovex</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const createContact = async (req) => {
    try {
        let body = req.body;
        console.log(body, "body");

        // Create the contact
        let contact = await contactSchema.create(body);

        // Define the mail options
        let mailOptions = {
            from: 'your-email@gmail.com', // replace with your email
            to: contact.email, // assuming the contact object has an email field
            subject: 'Message Received Successfully',
            html: messageReceivedEmail(contact) // Send the HTML email with logo
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return contact;

    } catch (error) {
        console.error('Error creating contact or sending mail:', error);
        throw error;
    }
};

module.exports = {
    createContact
};
