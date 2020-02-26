import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataTableResponse } from '../app/models/datatable-response'
import { Observable } from 'rxjs';
import { Context } from './DNN/context.service';

@Injectable({
  providedIn: 'root'
})
export class DNNDataTablesService {

  private apiBaseUrl: string;
  private apiPaged = 'cities/paged';

  constructor(private context: Context, private http: HttpClient) {
    this.apiBaseUrl = this.context._properties.routingWebAPI;
  }

  getCitiesPaged(dtParams: any): Observable<DataTableResponse> {
    const apiRequestUrl = this.apiBaseUrl + this.apiPaged;
    return this.http.post<DataTableResponse>(apiRequestUrl, dtParams);
  }
}
