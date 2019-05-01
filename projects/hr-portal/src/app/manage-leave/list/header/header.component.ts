import { Component, OnInit, Output, EventEmitter, ViewChild, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatInput } from '@angular/material';
import { LeaveStatus } from '../../model/leave.model';

/**
 * This is the Component decorator.
 * Component selector, scss and html files are declared here
 */
@Component({
  selector: 'one-talent-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  /** store selected leave status id */
  public selectedStatus: number;
  /** formgroup of the component */
  public form: FormGroup;
  /** from date value of the datepicker from ngmodel */
  public fromDate: Date;
  /** to date value of the datepicker from ngmodel */
  public toDate: Date;
  /** subject to get the latest emited value */
  public subject: Subject<string> = new Subject();
  /** search value of the component */
  public searchText: string;
  /** minimum date of the datepicker */
  public minDate: Date;
  /** maximum date of the datepicker */
  public maxDate: Date;
  /** boolean value of button disable */
  public buttonDisabled: boolean;
  /** boolean value of the search input */
  public checkSearch: boolean;
  /** emits the selected status value to the list component using output decorator */
  @Output() public selectStatusEvent: EventEmitter<number> = new EventEmitter<number>();
  /** emits the search value to the list component using output decorator */
  @Output() public searchTextEvent: EventEmitter<string> = new EventEmitter<string>();
  /** emits the selected from date value to the list component using output decorator */
  @Output() public selectFromDateEvent: EventEmitter<Date> = new EventEmitter<Date>();
  /** emits the selected to date value to the list component using output decorator */
  @Output() public selectToDateEvent: EventEmitter<Date> = new EventEmitter<Date>();
  /** emits the status value to the list component using output decorator */
  @Input() public leaveStatusData : LeaveStatus[];
  /** view child property to get the input value of the material datepicker */
  @ViewChild('inputFrom', { read: MatInput }) public inputFrom: MatInput;
  /** view child property to get the input value of the material datepicker */
  @ViewChild('inputTo', { read: MatInput }) public inputTo: MatInput;

  constructor() {
    let fb: FormBuilder = new FormBuilder();
    this.form = fb.group({
      searchTextBox: ['']
    });
    this.buttonDisabled = true;
    this.checkSearch = false;
  }

  public ngOnInit(): void {
    this.selectedStatus = 0;
    this.subject
      .pipe(debounceTime(500))
      .subscribe(() => {
        let searchText: string = this.form.controls.searchTextBox.value;
        this.searchTextEvent.emit(searchText);
      }
      );
  }
  /** 
   * life cycle hook interface AfterViewInit for method ngAfterViewInit
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   */
  public ngAfterViewInit(): void { }

  /** 
   * send the next value of subject as observable on every keyup event using subject.next method
   * @author: Mayur Patel
   * @created date: 06/04/2019
   */
  public keyUpp(): void {
    if (!this.checkSearch) { this.subject.next(); }
  }
 

  /**
   * Checks the search text and sets the valid search input
   * @author: Mayur Patel
   * @created date: 18/04/2019
   * @param checkSearch: boolean value
   */
  public checkValidSearch(checkSearch: boolean): void {
    this.checkSearch = checkSearch;
  }
  /** 
   * emits the selected status
   * @author: Mayur Patel
   * @created date: 06/04/2019
   */
  public selected(): void {
    this.inputFrom.value = '';
    this.inputTo.value = '';
    this.selectStatusEvent.emit(this.selectedStatus);
  }


  /**
   * gets the selected from-date
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   * @param eventFromdate : selected from-date
   */
  public selectedFromDate(eventFromdate: Date): void {
    this.fromDate = eventFromdate;
    this.minDate = new Date(this.fromDate);
    this.buttonDisabled = false;
  }

  /**
   * gets the selected to-date
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   * @param eventTodate : selected to-date
   */
  public selectedToDate(eventTodate: Date): void {
    this.toDate = eventTodate;
    this.maxDate = new Date(this.toDate);
  }

  /**
   * Filters between date
   * it will emit the from date and to date value 
   * And also it will clear the selected dates
   * And set the max and min date value to null.
   * @author: Bhumi Desai
   * @created date: 08/04/2019
   */
  public filterByDate(): void {
    if (this.fromDate && this.toDate) {
      this.selectFromDateEvent.emit(this.fromDate);
      this.selectToDateEvent.emit(this.toDate);
      this.selectedStatus = 0;
    }
    this.inputFrom.value = '';
    this.inputTo.value = '';
    this.maxDate = null;
    this.minDate = null;
  }

  

}
