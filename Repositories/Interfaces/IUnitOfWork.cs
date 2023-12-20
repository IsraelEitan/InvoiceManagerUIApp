namespace InvoiceManagerUI.Repositories.Interfaces
{
    public interface IUnitOfWork
    {
        IInvoiceRepository Invoices { get; }
        Task CompleteAsync();
    }
}
