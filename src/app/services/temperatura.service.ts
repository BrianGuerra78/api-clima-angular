import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const urlBase = 'https://api.openweathermap.org/data/2.5/weather';
const appId = '9cd8f47e1d2c5fda43847a4a66ec18b3';
//'https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9cd8f47e1d2c5fda43847a4a66ec18b3'
@Injectable({
  providedIn: 'root'
})
export class TemperaturaService {

  constructor(private http: HttpClient) { }

  getEstadoTiemmpo (ciudad: string, codigo: string) {
    const url= `${ urlBase }?q=${ ciudad },${ codigo }&appid=${appId}`;

    return this.http.get(url);
  }
}
