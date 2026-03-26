using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ContactController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST
    [HttpPost]
    public async Task<IActionResult> Send(Contact contact)
    {
        _context.Contacts.Add(contact);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Message received" });
    }

    // GET
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(_context.Contacts.ToList());
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var message = await _context.Contacts.FindAsync(id);
        if (message == null) return NotFound();

        _context.Contacts.Remove(message);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}