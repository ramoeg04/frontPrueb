import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mensaje } from '../model/mensaje.model';
import { Respuesta } from '../model/respuesta.model';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigService } from '../configuration/config.service';
import { map } from 'rxjs/operators';

// tslint:disable-next-line:member-ordering
//const baseUrl = 'https://soniatback.herokuapp.com/api/v1';
const baseUrl = 'https://soniatchatbotback.herokuapp.com/api/v1';

let headers: any;
let parametros: any;
let mensaje: Mensaje;
let token: Mensaje;
let respuesta: Respuesta;
let accessToken: any;

@Injectable()
export class ApiService {

  constructor(private configService: ConfigService, private http: HttpClient) { }

  public extractToken() {
    const parametros = {
      username : 'admin',
      password : 'password'
    };

    headers = {
      'Authorization': 'Basic ' + btoa('admin:password'),
      'Content-type': 'application/json'
    };
    return this.http.post(baseUrl + '/bot/login', parametros, {headers, responseType: 'text'});
  }

  getAnswer(mensaje: Mensaje, token: string) {
    headers = {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Access-Control-Allow-Methods': 'GET,POST'
    };
    console.log('aqui');
    return this.http.get(baseUrl + '/bot/botQuestion?question=' + mensaje, {headers, responseType: 'text'}
    );
    console.log('alla');
  }
    

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return Observable.throw(errorMessage);
  }
}
