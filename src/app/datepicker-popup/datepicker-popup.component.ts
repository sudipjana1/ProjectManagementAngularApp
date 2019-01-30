import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-datepicker-popup',
  templateUrl: './datepicker-popup.component.html',
  styleUrls: ['./datepicker-popup.component.css']
})
export class DatepickerPopupComponent implements OnInit {
  @Input() model = {
    "year": 2018,
    "month": 11,
    "day": 11
  };
  @Output() modelChange = new EventEmitter();
  //dateModel: any = "2018-01-01"

  constructor() { }

  // ngOnChanges(changes: SimpleChanges){
  //   const model: SimpleChange = changes.model;
  //   console.log("date pick")
  //   console.log(model.previousValue);
  //   console.log(model.currentValue);

  //   this.model = model.currentValue;
  // }

  ngOnInit() {
    //this.model = "2018-01-02"
  }

  onAreaUserControlChanged(){
    console.log("Change");
    console.log(this.model);
    this.modelChange.emit(this.model);

  }

}
