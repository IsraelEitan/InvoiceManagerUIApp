namespace InvoiceManagerUI.Exceptions
{
    public class InvalidEntityException : Exception
    {
        public InvalidEntityException() : base() { }

        public InvalidEntityException(string message) : base(message) { }

        public InvalidEntityException(string message, Exception innerException)
            : base(message, innerException) { }
    }
}
