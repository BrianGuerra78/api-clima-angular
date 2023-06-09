import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TemperaturaService } from '../../services/temperatura.service';
//import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent implements OnInit{

  formulario!: FormGroup;
  tiempo: any;
  name: any;
  temperatura: any;
  humedad: any;
  latitud: any;
  longitud: any;
  descripcion: any;
  showError!: boolean;
  mensajeError!: string;
  fecha = new Date();

  constructor(private fb: FormBuilder, private _tiempo: TemperaturaService) {
    this.iniciaFormulario();
  }

  ngOnInit(): void {
  }

  /**
   * método que crea e inicia un formulario.
   */
  iniciaFormulario() {

    this.formulario = this.fb.group({
      ciudad: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      codigo: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]]
    });

  }

  consultar() {
    this.showError = false;
    console.log("Formulario: ", this.formulario);

    this._tiempo.getEstadoTiemmpo( this.formulario.get('ciudad')?.value, this.formulario.get('codigo')?.value)
        .subscribe( respuesta => {
          this.tiempo = respuesta;
          this.name = this.tiempo.name;
          this.temperatura = this.tiempo.main.temp;
          this.humedad = this.tiempo.main.humidity;
          this.latitud = this.tiempo.coord.lat;
          this.longitud = this.tiempo.coord.lon;
          this.descripcion = this.tiempo.weather[0].description;

          console.log("respuesta: ", respuesta);
        },(error:any) => {
          this.showError = true;
          this.mensajeError = "Error al consultar el tiempo. Intentelo nuevamente!!";
        })
  }

}
