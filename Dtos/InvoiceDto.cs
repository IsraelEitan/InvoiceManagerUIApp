using System.ComponentModel.DataAnnotations;

namespace InvoiceManagerUI.Dtos
{
    public sealed record InvoiceDto(
        int Id,
        DateTime Date,
        string Status,
        decimal Amount,
        int CustomerId);
}
