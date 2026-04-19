using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    private readonly CloudinaryService _cloudinary;

    public ProjectController(ApplicationDbContext context, CloudinaryService cloudinary)
    {
        _context = context;
        _cloudinary = cloudinary;
    }

    // GET ALL
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _context.Projects.ToListAsync());
    }

    // GET BY ID
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        return project == null ? NotFound() : Ok(project);
    }

    // CREATE
    [HttpPost]
    public async Task<IActionResult> Create(Project project)
    {
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(Get), new { id = project.Id }, project);
    }

    // UPDATE
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Project updated)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();

        project.Title = updated.Title;
        project.Description = updated.Description;
        project.Technologies = updated.Technologies;
        project.GithubUrl = updated.GithubUrl;
        project.LiveUrl = updated.LiveUrl;

        await _context.SaveChangesAsync();

        return Ok(project);
    }

    // DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null) return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // UPLOAD IMAGE
    [HttpPost("upload")]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        if (file == null)
            return BadRequest("No file");

        var imageUrl = await _cloudinary.UploadImageAsync(file);

        return Ok(new { imageUrl });
    }
}