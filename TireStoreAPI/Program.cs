using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Stripe;
using System.Text;
using TireStoreApi.Models;
using TireStoreApi.Services;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Încarcă fișierul de configurare
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ✅ Configurare Stripe
var stripeSecretKey = builder.Configuration["Stripe:SecretKey"];
if (string.IsNullOrEmpty(stripeSecretKey))
{
    throw new ArgumentNullException("Stripe SecretKey is missing in configuration.");
}
StripeConfiguration.ApiKey = stripeSecretKey;

// ✅ Configurare JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var jwtSecretKey = jwtSettings["SecretKey"];
if (string.IsNullOrEmpty(jwtSecretKey))
{
    throw new ArgumentNullException("JWT Secret Key is missing in configuration.");
}
var key = Encoding.ASCII.GetBytes(jwtSecretKey);

// ✅ Înregistrare serviciilor în Dependency Injection
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<UserService>();

// ✅ Configurare conexiune la baza de date SQL Server
builder.Services.AddDbContext<TireStoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ✅ Adăugăm suport pentru controlere și Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "Tire Store API", Version = "v1" });
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

// ✅ Configurare CORS pentru acces din frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ✅ Configurare autentificare cu JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
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
        c.RoutePrefix = "swagger";
    });
}

// ✅ Middleware pentru gestionarea cererilor
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();
app.MapControllers();

// ✅ Rulează aplicația
app.Run();
