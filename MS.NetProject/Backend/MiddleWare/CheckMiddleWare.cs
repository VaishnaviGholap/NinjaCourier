using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace RapidRoute.MiddleWare
{
    public class CheckMiddleWare
    {
        
            private readonly RequestDelegate _next;
            private readonly IConfiguration _configuration;

            public CheckMiddleWare(RequestDelegate next, IConfiguration configuration)
            {
                _next = next;
                _configuration = configuration;
            }

            public async Task InvokeAsync(HttpContext context)
            {
                var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

                if (token != null)
                {
                    try
                    {
                        var tokenHandler = new JwtSecurityTokenHandler();
                        var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
                        tokenHandler.ValidateToken(token, new TokenValidationParameters
                        {
                            ValidateIssuer = true,
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuerSigningKey = true,
                            ValidIssuer = _configuration["Jwt:Issuer"],
                            ValidAudience = _configuration["Jwt:Audience"],
                            IssuerSigningKey = new SymmetricSecurityKey(key)
                        }, out SecurityToken validatedToken);

                        // Optionally, you can add user claims or roles to the HttpContext here if needed
                        var jwtToken = (JwtSecurityToken)validatedToken;
                        var userId = jwtToken.Claims.First(x => x.Type == "UserId").Value;
                        context.Items["UserId"] = userId; // Example of adding information to the HttpContext
                    }
                    catch
                    {
                        // Token validation failed
                        context.Response.StatusCode = 401; // Unauthorized
                        await context.Response.WriteAsync("Unauthorized");
                        return;
                    }
                }

                await _next(context);
            }
        

    }
}
