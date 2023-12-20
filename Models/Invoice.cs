using InvoiceManagerUI.Enums;

namespace InvoiceManagerUI.Models
{
    public class Invoice
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public InvoiceStatus Status { get; set; }
        public decimal Amount { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; } 
    }
}
