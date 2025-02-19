using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TireStoreApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configurăm serviciile
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<TireStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurare Swagger
builder.Services.AddEndpointsApiExplorer();



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseRouting();
app.MapControllers();

app.Run();
