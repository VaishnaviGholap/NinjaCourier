using Twilio.Types;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace RapidRoute.OTPService
{

    //public class OtpService : ITwilioRestClient
    //{
    //    private readonly ITwilioRestClient _client;
    //    public OtpService(IConfiguration configuration, System.Net.Http.HttpClient httpClient) {
    //        httpClient.DefaultRequestHeaders.Add("X-Custom-Header", "CustomOtpService");
    //        _client = new TwilioRestClient(
    //            configuration["Twilio:AccountSid"],
    //            configuration["Twilio:AuthToken"],
    //            httpClient: new SystemNetHttpClient(httpClient));
    //    }
    //    public string AccountSid => throw new NotImplementedException();

    //    public string Region => throw new NotImplementedException();

    //    public Twilio.Http.HttpClient HttpClient => throw new NotImplementedException();

    //    public Response Request(Request request)
    //    {
    //        throw new NotImplementedException();
    //    }

    //    public Task<Response> RequestAsync(Request request)
    //    {
    //        throw new NotImplementedException();
    //    }
    //}

    public interface IService
    {
        Task SendOtp(string toNum, string msg);
    }

    public class TwilioOtp : IService
    {
        private readonly string _sid;
        private readonly string _auth;
        private readonly string _num;
        public TwilioOtp(string sid, string auth, string num) {
        
            _sid = sid;
            _auth = auth;
            _num = num;
        }
        public Task SendOtp(string toNum, string msg)
        {
            TwilioClient.Init(_sid, _auth);
            var smsMsg = new CreateMessageOptions(new PhoneNumber(toNum))
            {
                From = _num,
                Body = msg
            };
            var msgResourse = MessageResource.Create(smsMsg);
            return Task.FromResult(msgResourse);
        }
    }
}
