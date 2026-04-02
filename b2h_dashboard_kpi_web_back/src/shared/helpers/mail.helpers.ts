import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
       service: "Gmail",
       host: "smtp.gmail.com",
       port: 465,
       secure: true,
       auth: {
            user: 'elamriyassin34@gmail.com',
            pass: 'rqvo sjsn zsbr xybg'
       },
});

export async function sendWelcomeEmail({ email, username, password }) {
       // Email template
       const mailOptions = {
              from: 'stagepfe11@proton.me',
              to: email,
              subject: 'Welcome to Our Dashboard',
              // text: `Hello ${username},\n\nWelcome to our dashboard! Your account has been successfully created. your password is ${password}\n\nThank you!`
              text: `Bonjour,${username},\n\nvotre mot de passe est :${password}\n\n

Bienvenue à notre plateforme !

Nous sommes ravis de vous accueillir parmi nous. Vous avez créé un compte avec succès et vous êtes désormais prêt(e) à explorer tout ce que notre service a à offrir.

N'hésitez pas à nous contacter si vous avez des questions ou avez besoin d'assistance. Nous sommes là pour vous aider.

Cordialement,
L'équipe Box2home`

       };


       await transporter.sendMail(mailOptions);
}
