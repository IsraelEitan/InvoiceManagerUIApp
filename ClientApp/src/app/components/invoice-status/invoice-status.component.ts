import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-status',
  templateUrl: './invoice-status.component.html',
  styleUrls: ['./invoice-status.component.css']
})
export class InvoiceStatusComponent implements OnInit {

  invoiceStatuses: string[] = [];
  selectedStatus!: string;

  @Input() initialStatus!: string;
  @Output() statusChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit() {
    this.invoiceService.getInvoiceStatuses().subscribe(statuses => {
      this.invoiceStatuses = statuses;
      // Set an initial selected status
      if (this.initialStatus) {
        this.selectedStatus = this.initialStatus; 
      } else if (statuses.length > 0) {
        this.selectedStatus = statuses[0]; 
      }
    });
  }

  statusChanged() {
    this.statusChange.emit(this.selectedStatus);
  }

  updateSelectedStatus(newStatus: string) {
    this.selectedStatus = newStatus;
    this.statusChanged();
  }

}
