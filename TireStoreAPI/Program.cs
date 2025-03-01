using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using TireStoreApi.Models;
using TireStoreApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Încarcă fișierul de configurare
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ✅ Verifică setările JWT pentru a preveni excepții
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
if (jwtSettings == null || string.IsNullOrEmpty(jwtSettings["SecretKey"]))
{
    throw new ArgumentNullException("JWT Secret Key is missing in configuration.");
}

// ✅ Înregistrare serviciilor în Dependency Injection
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserService>();
// Serviciu pentru gestionarea utilizatorilor

// ✅ Adăugăm suport pentru controlere și Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Tire Store API", Version = "v1" });

    // ✅ Adăugăm suport pentru JWT în Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Introduceți token-ul JWT în formatul: Bearer {your_token}"
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            new string[] {}
        }
    });
});

// ✅ Configurare conexiune la baza de date SQL Server
builder.Services.AddDbContext<TireStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Configurare CORS pentru acces din frontend (React sau alt UI)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")  // Permite cereri doar de la frontend-ul React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ✅ Configurare autentificare cu JWT
var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false; // Poate fi activat în producție
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"] ?? "https://localhost:5258",
            ValidAudience = jwtSettings["Audience"] ?? "https://localhost:5258",
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

var app = builder.Build();

// ✅ Middleware pentru Swagger în mod Development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Tire Store API v1");
        c.RoutePrefix = "swagger"; // Accesezi UI-ul la /swagger
    });
}

// ✅ Activare CORS (trebuie plasat înainte de autentificare)
app.UseCors("AllowFrontend");

// ✅ Middleware pentru autentificare și autorizare
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();


// ✅ Definim rutele aplicației
app.UseRouting();
app.MapControllers();

// ✅ Rulează aplicația
app.Run();
