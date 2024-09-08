using System.Net.Mail;
using System.Net;

namespace RapidRoute.InterFaces
{
    public class EmailSender : IEmailSender
    {
        public Task SendEmailAsync(string email, string subject, string message)
        {
            
            var mail = "absam8923@gmail.com";
            var pas = "jbupfbzbscjeaqhj";
            var smtpClient = new SmtpClient("smtp.gmail.com",587)
            {
                
                Credentials = new NetworkCredential(mail, pas),
                EnableSsl = true,
            };

            return smtpClient.SendMailAsync(
                new MailMessage(from: mail, to: email, subject, message)
                );
        }
    }
}
//using RapidRoute.InterFaces;
//using System;
//using System.Net;
//using System.Net.Mail;
//using System.Threading.Tasks;

//namespace RapidRoute.Interfaces
//{
//    public class EmailSend : IEmail
//    {
//        private readonly string _smtpServer = "smtp.gmail.com";
//        private readonly int _port = 587;
//        private readonly string _email = "absam8923@gmail.com";
//        private readonly string _password ="jbupfbzbscjeaqhj";

//        public async Task SendMailAsync(string email, string subject, string message)
//        {
//            try
//            {
//               var smtpClient = new SmtpClient(_smtpServer)
//                {
//                    Port = _port,
//                    Credentials = new NetworkCredential(_email, _password),
//                    EnableSsl = true,
//                }
//                {
//                    var mailMessage = new MailMessage
//                    {
//                        From = new MailAddress(_email),
//                        Subject = subject,
//                        Body = message,

//                    };

//                    mailMessage.To.Add(email);

//                    await smtpClient.SendMailAsync(mailMessage);
//                }
//            }
//            catch (Exception ex)
//            {
//                // Log or handle the exception as needed
//                Console.WriteLine($"Error sending email: {ex.Message}");
//                throw; // Optional: rethrow to allow higher-level handlers to catch it
//            }
//        }
//    }
//}
