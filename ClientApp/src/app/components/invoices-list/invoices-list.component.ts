import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { InvoiceDto } from '../../dtos/invoice.dto';
import { PagedResult } from '../../dtos/paged-result.dto'; 
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrls: ['./invoices-list.component.css']
})
export class InvoicesListComponent implements OnInit {
  pagedResult: PagedResult<InvoiceDto> = new PagedResult<InvoiceDto>();
  currentPage: number = 1;
  pageSize: number = AppConfig.defaultPageSize;

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  editInvoice(invoiceId: number): void {
    this.router.navigate(['/invoices/edit', invoiceId]);
  }

  deleteInvoice(invoiceId: number): void {
    const confirmation = confirm('Are you sure you want to delete this invoice?');
    if (confirmation) {
      this.invoiceService.deleteInvoice(invoiceId).subscribe({
        next: () => {
          alert('Invoice deleted successfully');
          this.loadInvoices();
        },
        error: (error) => {
          console.error('Error deleting invoice:', error);
          alert('Failed to delete invoice');
        }
      });
    }
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices(this.currentPage, this.pageSize).subscribe((result: PagedResult<InvoiceDto>) => {
      this.pagedResult = result;
    });
  }

  onPageChange(newPage: number): void {
    this.currentPage = newPage;
    this.loadInvoices();
  }
}
