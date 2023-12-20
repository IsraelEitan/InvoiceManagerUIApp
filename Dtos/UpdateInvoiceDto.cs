using InvoiceManagerUI.Enums;
using System.ComponentModel.DataAnnotations;

namespace InvoiceManagerUI.Dtos
{
    public sealed record UpdateInvoiceDto(
        DateTime Date,
        [Required] string Status,
        decimal Amount);
}
