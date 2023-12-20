using InvoiceManagerUI.Repositories.Interfaces;
using InvoiceManagerUI.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using InvoiceManagerUI.Services;
using InvoiceManagerUI.Data;
using InvoiceManagerUI.Helpers;
using InvoiceManagerUI.Helpers.interfaces;
using Microsoft.Extensions.Caching.Memory;
using InvoiceManagerUI.Validators;
using InvoiceManagerUI.Models;
using System.Reflection;

namespace InvoiceManagerUI.Extensions
{
    internal static class ServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<PaginationSettings>(configuration.GetSection("Pagination"));

            services.AddScoped<IInvoicesService, InvoiceService>();
            services.AddScoped<IInvoiceCacheManager, InvoicesCacheManager>();
            services.AddScoped<IUnitOfWork, InvoicesUnitOfWork>();
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();

            services.AddDbContext<CustomerInvoiceDbContext>(options =>
                        options.UseSqlServer(configuration.GetConnectionString("DefaultConnection"),
                        b => b.MigrationsAssembly(typeof(Program).Assembly.FullName)));

            services.AddAutoMapper(typeof(Program));

            services.AddControllers(options =>
            {
                options.Filters.Add(new ModelValidationActionFilter());
            });

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "CustomerInvoice Web App API",
                    Description = "CustomerInvoice Web App API (ASP.NET Core 7.0)",
                });

                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader();
                });
            });

            // Add memory cache if not already added
            if (!services.Any(x => x.ServiceType == typeof(IMemoryCache)))
            {
                services.AddMemoryCache();
            }

            services.AddEndpointsApiExplorer();
        }
    }
}
