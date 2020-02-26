import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit, Output } from '@angular/core';
import { City } from './models/city';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DNNDataTablesService } from 'src/Service/dnndatatables.service'; 
import { Context } from '../Service/DNN/context.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit  {
  title = 'DNNDataTables';
  webapiResult = '';
  cities: City[];

    // DataTables
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  // Import
  progress: number;
  message: string;

  constructor(public context: Context,
    private dnnDataTablesService: DNNDataTablesService) {
    context.autoConfigure();
  }

  ngOnInit() {
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      dom: 'lrtip',
      ajax: (dataTableParameters: any, callback) => {
          this.dnnDataTablesService
          .getCitiesPaged({...dataTableParameters})
          .subscribe(resp => {
          that.cities = resp.data;

          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
        });
      },
      columns: [
        {data: 'Id', name: 'Id'},
        {data: 'Name', name: 'Name'},
        {data: 'Temp', name: 'Temp'},
        {data: 'High', name: 'High'},
        {data: 'Low', name: 'Low'}
      ]
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
