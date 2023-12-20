using InvoiceManagerUI.Models;

namespace InvoiceManagerUI.Repositories.Interfaces
{
    public interface IInvoiceRepository : IRepository<Invoice>
    {
        Task<IEnumerable<Invoice>> GetOverdueInvoicesAsync();
        Task<IEnumerable<Invoice>> GetInvoicesByCustomerIdAsync(int customerId);
    }
}
