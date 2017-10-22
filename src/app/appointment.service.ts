import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class AppointmentService {

  constructor (private http: Http) {}

  getAppointmentList() {
    const url = 'http://localhost:8080/api/appointment/all';
    return this.http.get(url, { withCredentials: true });
  }

  confirmAppointment(id: number) {
    const url = 'http://localhost:8080/api/appointment/' + id + '/confirm';
    return this.http.get(url, { withCredentials: true });
  }

}
