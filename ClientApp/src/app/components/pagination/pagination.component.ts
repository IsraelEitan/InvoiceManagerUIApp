import { AppConfig } from '../../app.config';
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems = 0;
  @Input() itemsPerPage = AppConfig.defaultPageSize;
  @Input() currentPage = 1;
  @Output() pageChanged = new EventEmitter<number>();

  totalPages = 0;

  ngOnChanges(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages && newPage !== this.currentPage) {
      this.currentPage = newPage;
      this.pageChanged.emit(this.currentPage);
    }
  }
}
