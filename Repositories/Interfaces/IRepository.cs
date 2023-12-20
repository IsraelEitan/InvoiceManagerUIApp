namespace InvoiceManagerUI.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync(int pageNumber, int pageSize);
        Task<IEnumerable<T>> GetAllAsync();
        Task<int> GetTotalCountAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}
