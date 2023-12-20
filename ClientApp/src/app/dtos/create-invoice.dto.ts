export interface CreateInvoiceDto {
  date: Date;
  status: string;
  amount: number;
  customerId: number;
}
