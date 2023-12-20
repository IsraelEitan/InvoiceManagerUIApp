import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';
import { InvoiceDto } from '../dtos/invoice.dto';
import { environment } from '../../environments/environment'
import { AppConfig } from '../app.config'; 
import { CreateInvoiceDto } from '../dtos/create-invoice.dto';
import { UpdateInvoiceDto } from '../dtos/update-invoice.dto';
import { PagedResult } from '../dtos/paged-result.dto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = environment.apiUrl + '/invoices'; 
  private invoiceStatuses$!: Observable<string[]>;
  constructor(private http: HttpClient) { }

  getAllInvoices(pageNumber: number = 1, pageSize: number = AppConfig.defaultPageSize): Observable<PagedResult<any>> {
    const params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());
   
    return this.http.get<PagedResult<any>>(`${this.apiUrl}/all`, { params });
  }

  getInvoiceById(id: number): Observable<InvoiceDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<InvoiceDto>(url).pipe(
      catchError(this.handleError)
    );
  }

  getInvoiceStatuses(): Observable<string[]> {
    if (!this.invoiceStatuses$) {
      this.invoiceStatuses$ = this.http.get<string[]>(`${this.apiUrl}/statuses`).pipe(
        catchError(this.handleError),
        shareReplay(1)
      );
    }
    return this.invoiceStatuses$;
  }

  createInvoice(invoice: CreateInvoiceDto): Observable<InvoiceDto> {
    return this.http.post<InvoiceDto>(this.apiUrl, invoice).pipe(
      catchError(this.handleError)
    );
  }

  updateInvoice(id: number, invoice: UpdateInvoiceDto): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, invoice).pipe(
      catchError(this.handleError)
    );
  }

  deleteInvoice(id: number): Observable<InvoiceDto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<InvoiceDto>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Something bad happened; please try again later.';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('An error occurred:', error.error.message);
      errorMessage = error.error.message;
    } else {
      // Server-side error
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      errorMessage = error.error?.message || errorMessage;
    }

    return throwError(errorMessage);
  }

}
