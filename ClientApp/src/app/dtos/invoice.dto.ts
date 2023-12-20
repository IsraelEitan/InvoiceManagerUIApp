export interface InvoiceDto {
  id: number;
  date: Date;
  status: string;
  amount: number;
  customerId: number;
}
