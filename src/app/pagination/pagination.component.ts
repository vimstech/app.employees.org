import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PagerService } from '../services/pager.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Output() pageChanged = new  EventEmitter<number>();
  @Input() pagination: any;
  // pager object
  pager: any = {};

  constructor(private pagerService: PagerService) { }

  ngOnInit() {
    this.setPage()
  }

  onPageChange (page) {
    this.pageChanged.emit(page);
    this.pagination.page = page;
    this.setPage();
  }
  setPage() {
    this.pager = this.pagerService.getPager(this.pagination);
  }
}
