import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { HttpParams } from '@angular/common/http';
import { Mensaje } from '../model/mensaje.model';
import { delay } from 'q';
import { Respuesta } from '../model/respuesta.model';
import { AfterViewInit, AfterViewChecked, ElementRef } from '@angular/core';


@Component({
  selector: 'app-soniat',
  templateUrl: './soniat.component.html',
  styleUrls: [
    '../soniat/soniat.component.css'
  ]
})

export class SoniatComponent implements OnInit, AfterViewInit, AfterViewChecked{

  @ViewChild('chat', {static: false}) chatElement: ElementRef;
  @ViewChild('box', {static: false}) box: ElementRef;

  mensaje: Mensaje = new Mensaje();
  respuesta: Respuesta = new Respuesta();
  soniatForm: FormGroup;
  invalidForm = false;
  show: boolean = false;
  public mostrar: boolean = true;
  public prueba=[];

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { };

  ngOnInit() {

    this.soniatForm = this.formBuilder.group({
      mensaje: ['', Validators.required]
    });

    
    this.closeOpenedWindow();
    
  }

  ngAfterViewInit(){
    this.scrollToBottom();
    this.chatElement.nativeElement.focus()
  }
  ngAfterViewChecked(){
    this.scrollToBottom();
    this.chatElement.nativeElement.focus()
  }
  scrollToBottom(): void{
    try{
      this.box.nativeElement.scrollTop = this.box.nativeElement.scrollHeight;
    }catch(err){
      console.log(err)
    }
  }

  onSubmit() {

    let question = this.soniatForm.controls.mensaje.value;
    let token = '';
    if (question != null ) {
      this.apiService.extractToken().subscribe((data: any) => {
        token = data;
        this.conversar(question,token);
      }, error => {
        this.respuesta.mensaje = 'Error no existe conectividad con el MicroServicio por favor intente mas tarde';
      });
    }
  }


  conversar(q,e){
    console.log(62,'TOKEN A ENVIAR: ' + e);
    let array = new Array();
    let arreglo = this.historial(this.mensaje.mensaje);
    this.apiService.getAnswer(q, e).subscribe((data: any) => {
      this.respuesta.mensaje = data;
      console.log("Respuesta: ",this.respuesta.mensaje);
      let arreglo = this.historial(this.respuesta.mensaje);
      this.mensaje.mensaje = null;
      }, error => {
      this.respuesta.mensaje = 'Error no existe conectividad con el MicroServicio por favor intente mas tarde';
      this.mostrar = false;
    });
 
}


historial(mensaje){
  this.prueba.push(mensaje);
  console.log("AAAAAAA",this.prueba);
  console.log(this.prueba[0]);
} 


  
  convertirEstatus(estatus: string) {
    switch (estatus) {
      case 'SOA001':
        this.mensaje.mensaje = 'Estimado usuario, existe un problema de conexion con el servidor';
        break;
      case 'SOA002':
        this.mensaje.mensaje = 'Estimado usuario, disculpe las molestias pero el servicio no se encuentra disponible';
        break;
      default:
        break;
    }
  }

  closeOpenedWindow() {
    var y = document.getElementById("prueba");
    var x = document.getElementById("ocultar");
    if (y.style.display === "none") {
      y.style.display = "block";
      x.style.display = "none";
    } else {
      y.style.display = "none";
      x.style.display = "block";
    }
  }
  
 
}
