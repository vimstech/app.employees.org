import { Injectable } from '@angular/core';
import { range } from 'lodash'
@Injectable({
  providedIn: 'root'
})
export class PagerService {
  getPager(pagination) {
    let totalPages = pagination.pages;
    let currentPage = pagination.page;
    let pageSize = pagination.per;
    let totalItems = pagination.total;
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    
    // if (totalPages <= 5) {
    //     startPage = 1;
    //     endPage = totalPages;
    // } else {
    //     if (currentPage <= 3) {
    //         startPage = 1;
    //         endPage = 5;
    //     } else if (currentPage + 1 >= totalPages) {
    //         startPage = totalPages - 4;
    //         endPage = totalPages;
    //     } else {
    //         startPage = currentPage - 2;
    //         endPage = currentPage+2;
    //     }
    // }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    let pages = range(startPage, endPage + 1);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
