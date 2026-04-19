using System.ComponentModel.DataAnnotations;

public class Project
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }

    public string? Technologies { get; set; }

    public string? GithubUrl { get; set; }

    public string? LiveUrl { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public string ImageUrl { get; set; } = "";
}