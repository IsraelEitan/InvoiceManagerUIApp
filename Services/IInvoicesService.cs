using InvoiceManagerUI.Models;

namespace InvoiceManagerUI.Services
{
    public interface IInvoicesService
    {
        Task<IEnumerable<Invoice>> GetAllInvoicesAsync(int pageNumber, int pageSize);
        Task<IEnumerable<Invoice>> GetAllInvoicesAsync();
        Task<int> GetTotalCountAsync();
        Task<Invoice> GetInvoiceByIdAsync(int id);
        Task<IEnumerable<Invoice>> GetInvoicesByCustomerIdAsync(int CustomerId);
        Task<IEnumerable<Invoice>> GetOverdueInvoicesAsync();
        Task<Invoice> CreateInvoiceAsync(Invoice invoice);
        Task UpdateInvoiceAsync(int id, Invoice invoice);
        Task DeleteInvoiceAsync(int id);
    }

}
