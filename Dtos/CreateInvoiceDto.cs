using InvoiceManagerUI.Enums;
using System.ComponentModel.DataAnnotations;

namespace InvoiceManagerUI.Dtos
{
    public sealed record CreateInvoiceDto(
        [Required] DateTime Date,
        [Required] string Status,
        [Required, Range(0.01, double.MaxValue)] decimal Amount,
        [Required, Range(1, int.MaxValue)] int CustomerId);
}
