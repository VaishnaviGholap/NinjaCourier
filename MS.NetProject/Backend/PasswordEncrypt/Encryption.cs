namespace RapidRoute.PasswordEncrypt
{
    public class Encryption
    {
        public static string Encrypt(string input)
        {
            var planText = System.Text.Encoding.UTF8.GetBytes(input);
            return System.Convert.ToBase64String(planText);
        }

        public static string Decrypt(string encodedPass)
        {
            var encodedBytes = System.Convert.FromBase64String(encodedPass);
            return System.Text.Encoding.UTF8.GetString(encodedBytes);
        }
    }
}
