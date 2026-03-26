using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options) : base(options) {}

    public DbSet<Project> Projects { get; set; }
    public DbSet<Contact> Contacts { get; set; }
}