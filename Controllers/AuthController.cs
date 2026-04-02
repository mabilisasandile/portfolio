using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
// using Backend.Data;
using Microsoft.AspNetCore.Authorization;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public AuthController(ApplicationDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDto dto)
    {
        if (_context.Admins.Any(a => a.Email == dto.Email))
            return BadRequest("Admin already exists");

        var admin = new Admin
        {
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
        };

        _context.Admins.Add(admin);
        _context.SaveChanges();

        return Ok("Admin registered");
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        var admin = _context.Admins.FirstOrDefault(a => a.Email == dto.Email);
        if (admin == null || !BCrypt.Net.BCrypt.Verify(dto.Password, admin.PasswordHash))
            return Unauthorized("Invalid credentials");

        var token = CreateToken(admin);
        return Ok(new { token });
    }

    private string CreateToken(Admin admin)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Name, admin.Email),
            new Claim(ClaimTypes.Role, "Admin")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("secure-data")]
    public IActionResult GetSecureData()
    {
        return Ok("This is protected");
    }
}