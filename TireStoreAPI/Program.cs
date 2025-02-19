using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TireStoreApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configurăm serviciile
builder.Services.AddControllers();
builder.Services.AddDbContext<TireStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurare Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Tire Store API",
        Version = "v1",
        Description = "API pentru gestionarea anvelopelor într-un magazin online."
    });
});

// Configurarea CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tire Store API v1");
        c.RoutePrefix = string.Empty; // Face Swagger UI să fie disponibil la rădăcina aplicației
    });
}

// Permitem CORS pentru toată aplicația
app.UseCors("AllowAllOrigins");

app.UseRouting();
app.MapControllers();

app.Run();
