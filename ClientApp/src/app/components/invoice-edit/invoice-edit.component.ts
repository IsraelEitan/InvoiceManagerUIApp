import { Component, ViewChild , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../../services/invoice.service';
import { UpdateInvoiceDto } from '../../dtos/update-invoice.dto';
import { FormHelperService } from '../../services/shared/form-helper.service';
import { InvoiceStatusComponent } from '../invoice-status/invoice-status.component';

@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css']
})
export class InvoiceEditComponent implements OnInit {

  @ViewChild(InvoiceStatusComponent) invoiceStatusComponent!: InvoiceStatusComponent;

  invoiceForm: FormGroup;
  invoiceId!: number;
  initialStatus!: string;
  constructor(
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formHelperService: FormHelperService
  ) {

    this.invoiceForm = this.formBuilder.group({
      date: ['', Validators.required],
      status: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.invoiceId = +idParam;
      this.invoiceService.getInvoiceById(this.invoiceId).subscribe(invoice => {
        const receivedDate = new Date(invoice.date);
        const formattedDate = receivedDate.toISOString().split('T')[0];
        this.invoiceForm.get('date')?.setValue(formattedDate);
        this.invoiceStatusComponent.updateSelectedStatus(invoice.status);      
        this.invoiceForm.get('amount')?.setValue(invoice.amount);
      });    
    } else {
      //Redirect
      console.error('Invoice ID is not provided');
      this.router.navigate(['/invoices']);
    }
  }

  onStatusChange(selectedStatus: string) {
    this.invoiceForm.get('status')?.setValue(selectedStatus);
  }

  onSubmit() {
    if (this.invoiceForm.valid) {
      const updateInvoiceDto: UpdateInvoiceDto = {
        date: this.invoiceForm.value.date,
        status: this.invoiceForm.value.status,
        amount: this.invoiceForm.value.amount,   
      };

      this.invoiceService.updateInvoice(this.invoiceId, updateInvoiceDto).subscribe(result => {
        console.log('Invoice Updated', result);
        //Navigate to the list of invoices
        this.router.navigate(['/invoices']); 
      });
    } else {
      this.formHelperService.markFormGroupTouched(this.invoiceForm);
    }
  }
}
