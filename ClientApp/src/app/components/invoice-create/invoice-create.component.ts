import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { CreateInvoiceDto } from '../../dtos/create-invoice.dto'; 
import { Router } from '@angular/router';
import { FormHelperService } from '../../services/shared/form-helper.service';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent {
  invoiceForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
    private formHelperService: FormHelperService
  ) {

    // Date in 'yyyy-MM-dd' format
    const currentDate = new Date().toISOString().split('T')[0];

    this.invoiceForm = this.formBuilder.group({
      date: [currentDate, Validators.required],
      status: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      customerId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onStatusChange(selectedStatus: string) {
    this.invoiceForm.get('status')?.setValue(selectedStatus);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const createInvoiceDto: CreateInvoiceDto = {
        date: this.invoiceForm.value.date,
        status: this.invoiceForm.value.status,
        amount: this.invoiceForm.value.amount,
        customerId: this.invoiceForm.value.customerId
      };

      this.invoiceService.createInvoice(createInvoiceDto).subscribe(result => {
        console.log('Invoice Created', result);
        //Navigate to the list of invoices
        this.router.navigate(['/invoices']);
      });
    } else {
      this.formHelperService.markFormGroupTouched(this.invoiceForm);
    }
  }
}


