import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './services/invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private invoiceService: InvoiceService) { }
  title = 'Customer Invoices App';
  ngOnInit() {
    this.invoiceService.getInvoiceStatuses().subscribe();
  }
}

