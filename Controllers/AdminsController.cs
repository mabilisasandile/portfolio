using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/admins")]
[Authorize(Roles = "Admin")]
public class AdminsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AdminsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // GET ALL ADMINS
    [HttpGet]
    public IActionResult GetAdmins()
    {
        var admins = _context.Admins
            .Select(a => new
            {
                a.Id,
                a.Email
            })
            .ToList();

        return Ok(admins);
    }

    // DELETE ADMIN
    [HttpDelete("{id}")]
    public IActionResult DeleteAdmin(int id)
    {
        var admin = _context.Admins.Find(id);
        var currentEmail = User.Identity?.Name;

        if (admin == null)
            return NotFound("Admin not found");

        if (admin.Email == currentEmail)
            return BadRequest("You cannot delete yourself");

        _context.Admins.Remove(admin);
        _context.SaveChanges();

        return Ok("Admin deleted");
    }

    [HttpPut("{id}")]
    public IActionResult UpdateAdmin(int id, UpdateAdminDto dto)
    {
        var admin = _context.Admins.Find(id);

        if (admin == null)
            return NotFound("Admin not found");

        var currentEmail = User.Identity?.Name;

        // Prevent editing yourself
        if (admin.Email == currentEmail)
            return BadRequest("You cannot edit yourself");

        admin.Email = dto.Email;

        // Only update password if provided
        if (!string.IsNullOrEmpty(dto.Password))
        {
            admin.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
        }

        _context.SaveChanges();

        return Ok("Admin updated");
    }
}