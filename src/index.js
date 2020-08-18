import React, { Fragment, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './index.css';

import App from './App';
import Navbar from "./components/Navbar";
import * as serviceWorker from './serviceWorker';
import { esNombre, esDoc, esFecha } from "./validaciones";





class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      value: "",
      error: false,
      mensajeError: ""
    };
  }
  actualizarState(e) {
    const { name, value } = e.target;
    console.log(this.props.validacion(value));

    if (this.props.validacion(value)) {
      this.setState({
        value,
        error: false,
        mensajeError: ""
      });
      this.props.actualizarState({
        name, value, error: false
      });
    } else {
      this.setState({
        value,
        error: true,
        mensajeError: this.props.mensajeError
      });
      this.props.actualizarState({
        name, value, error: true
      });
    }
  }
  render() {
    return (

      <div className="form-group col-md-6 componente-input">
        <label htmlFor={"id-" + this.props.name}>{this.props.label}</label>
        <input
          id={"id-" + this.props.name}
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          className={this.state.error ? "border-error" : ""}
          onChange={this.actualizarState} />
        {
          this.state.error ? (
            <span className="text-danger text-small d-block mb-2">
              {this.state.mensajeError}
            </span>
          ) : ("")
        }

      </div>

    )
  }
}

class InputCheckbox extends React.Component {
  constructor(props) {
    super(props)
    this.actualizarState = this.actualizarState.bind(this);
    this.state = { activo: false };
  }
  actualizarState(e) {
    const { name, checked } = e.target;
    this.setState({ activo: checked });
    this.props.actualizarState({
      name, value: checked, error: false
    })
  }
  render() {
    return (
      <div>
        <input
          id={"id-" + this.props.name}
          type="checkbox"
          name={this.props.name}
          checked={this.state.activo}
          onChange={this.actualizarState} />
        <label htmlFor={"id-" + this.props.name}>{this.props.label}</label>
      </div>
    )
  }
}

class InputSelect extends React.Component {
  constructor(props) {
    super(props)
    this.actualizarState = this.actualizarState.bind(this);
    this.state = { activo: "" };
  }
  actualizarState(e) {
    const { name, value } = e.target;
    this.setState({ value });
    this.props.actualizarState({
      name, value, error: value === "" ? true : false
    })
  }
  render() {
    return (
      <div className="form-group col-md-6 componente-input">
        <label htmlFor={"id-" + this.props.name}>{this.props.label}</label>
        <select
          id={"id-" + this.props.name}
          name={this.props.name}
          onChange={this.actualizarState}>
          {
            this.props.opciones.map((opcion, index) => (
              <option key={index} value={opcion.value}>{opcion.texto}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

class InputRadioButton extends React.Component {
  constructor(props) {
    super(props)
    this.actualizarState = this.actualizarState.bind(this);
    this.state = { activo: "" };
  }
  actualizarState(e) {
    const { name, value } = e.target;
    this.setState({ value });
    this.props.actualizarState({
      name, value, error: value === "" ? true : false
    })
  }
  render() {
    return (
      <div className="form-group col-md-6 componente-input">
        <label htmlFor={"id-" + this.props.name}>{this.props.label}</label>
        <select
          id={"id-" + this.props.name}
          name={this.props.name}
          onChange={this.actualizarState}>
          {
            this.props.opciones.map((opcion, index) => (
              <option key={index} value={opcion.value}>{opcion.texto}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

class Componente extends React.Component {

  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.actualizarState = this.actualizarState.bind(this);
    this.state = {
      nombre: {
        value: "",
        error: true
      },
      apellidos: {
        value: "",
        error: true
      },
      prioridad: {
        value: false,
        error: true
      },
      tipoDocumento: {
        value: "",
        error: true
      },
      numDocumento: {
        value: "",
        error: true
      },
      fechaNac: {
        value: "",
        error: true
      },
      contactoEstrecho1: {
        value: "",
        error: true
      },
      contactoEstrecho2: {
        value: "",
        error: true
      },
      viajeNivel: {
        value: "",
        error: true
      },
      destino: {
        value: "",
        error: true
      }

    }
  }

  reload = () => {
    window.location.reload(true);
}

  actualizarState(input) {
    this.setState({
      ...this.state,
      [input.name]: {
        value: input.value,
        error: input.error
      }
    }, () => { console.log(this.state); });

  }

  submit(e) {
    e.preventDefault();
    console.log(this.state)
    // limpiar campos
    e.target.reset();
    this.reload();
  }

  render() {
    return (
      <Fragment>

        <header className="App-header">
          <Navbar />
          <p>Taller 1 - Informática Avanzada</p>
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Formulario de control Covid-19</h1>
          <hr style={{ backgroundColor: "white", height: 1 }} />

          <form onSubmit={this.submit}>
            <div className="form-row">

              <InputText
                label="Nombres"
                name="nombre"
                placeholder="Nombre"
                validacion={esNombre}
                mensajeError="Se esperaban letras"
                actualizarState={this.actualizarState} />


              <InputText
                label="Apellidos"
                name="apellidos"
                placeholder="Apellidos"
                validacion={esNombre}
                mensajeError="Se esperaban letras"
                actualizarState={this.actualizarState} />


              <InputSelect
                name="tipoDocumento"
                label="Elige una opción:"
                actualizarState={this.actualizarState}
                opciones={[
                  { value: "", texto: "Seleccione un opción..." },
                  { value: "Tarjeta_de_Identidad", texto: "Tarjeta de Identidad" },
                  { value: "Cédula_de_Ciudadanía", texto: "Cédula de Ciudadanía" },
                  { value: "Cédula_de_Extrangería", texto: "Cédula de Extrangería" }
                ]} />

              <InputText
                label="Número de Documento"
                name="numDocumento"
                placeholder="Número de Documento"
                validacion={esDoc}
                mensajeError="Se esperaban numeros y/o letras"
                actualizarState={this.actualizarState} />


              <InputText
                label="Fecha de Nacimiento"
                name="fechaNac"
                type="date"
                placeholder="Fecha de Nacimiento"
                validacion={esFecha}
                mensajeError="Se esperaban letras"
                actualizarState={this.actualizarState} />

              <InputSelect
                name="contactoEstrecho1"
                label="Tuvo contacto extrecho con algún paciente:"
                actualizarState={this.actualizarState}
                opciones={[
                  { value: "", texto: "Seleccione un opción..." },
                  { value: "Si", texto: "Si" },
                  { value: "No", texto: "No" }
                ]} />

              <InputSelect
                name="contactoEstrecho2"
                label="Viajó a áreas de circulación del virus nuevo:"
                actualizarState={this.actualizarState}
                opciones={[
                  { value: "", texto: "Seleccione un opción..." },
                  { value: "Si", texto: "Si" },
                  { value: "No", texto: "No" }
                ]} />
            </div>



            {this.state.contactoEstrecho2.value === "Si" ?

              <div className="form-row">

                <InputSelect
                  name="viajeNivel"
                  label="¿El viaje fue en territorio nacional o internacional?:"
                  actualizarState={this.actualizarState}
                  opciones={[
                    { value: "", texto: "Seleccione un opción..." },
                    { value: "Nacional", texto: "Nacional" },
                    { value: "Internacional", texto: "Internacional" }
                  ]} />
                  <InputText
                    label="¿Dónde?"
                    name="destino"
                    placeholder="¿Dónde?"
                    validacion={esDoc}
                    mensajeError="Se esperaban numeros y/o letras"
                    actualizarState={this.actualizarState} />
                  



              </div> : <br/>}


              {this.state.contactoEstrecho2.value === "No"?
              <button
                disabled={this.state.nombre.error ||
                  this.state.apellidos.error ||
                  this.state.tipoDocumento.error ||
                  this.state.numDocumento.error ||
                  this.state.fechaNac.error ||
                  this.state.contactoEstrecho1.error ||
                  this.state.contactoEstrecho2.error 
                }
                type="submit"
                className={this.state.nombre.error ||
                  this.state.apellidos.error ||
                  this.state.tipoDocumento.error ||
                  this.state.numDocumento.error ||
                  this.state.fechaNac.error ||
                  this.state.contactoEstrecho1.error ||
                  this.state.contactoEstrecho2.error
                  ?
                  "button-disable" : "button"}>
                Enviar y refrescar
               </button>
               
               
               :<button
                disabled={this.state.nombre.error ||
                  this.state.apellidos.error ||
                  this.state.tipoDocumento.error ||
                  this.state.numDocumento.error ||
                  this.state.fechaNac.error ||
                  this.state.contactoEstrecho1.error ||
                  this.state.contactoEstrecho2.error ||
                  this.state.viajeNivel.error ||
                  this.state.destino.error
                }
                type="submit"
                className={this.state.nombre.error ||
                  this.state.apellidos.error ||
                  this.state.tipoDocumento.error ||
                  this.state.numDocumento.error ||
                  this.state.fechaNac.error ||
                  this.state.contactoEstrecho1.error ||
                  this.state.contactoEstrecho2.error||
                  this.state.viajeNivel.error ||
                  this.state.destino.error
                  ?
                  "button-disable" : "button"}>
                Enviar y refrescar
               </button>}

          </form>
          <br/>
          <br/>
          <ul className="mt-2">

            <li>
              <hr style={{ backgroundColor: "white", height: 1 }} />
              {this.state.nombre.value && this.state.apellidos.value && this.state.tipoDocumento.value &&
                this.state.numDocumento.value && this.state.fechaNac.value && this.state.contactoEstrecho1.value &&
                this.state.contactoEstrecho2.value ? 'El paciente: ' + this.state.nombre.value + ' ' +
                this.state.apellidos.value + ', identificado con ' + this.state.tipoDocumento.value + ', número : ' +
                this.state.numDocumento.value + ', nacido el ' + this.state.fechaNac.value + ', el cual ' +
                this.state.contactoEstrecho1.value + ' tuvo contacto extrecho con algún paciente, además, ' +
                this.state.contactoEstrecho2.value + ' Viajó a áreas de circulación del virus nuevo.'
                : ''}

                {this.state.contactoEstrecho2.value === "Si" ? ' El viaje fue a nivel ' + this.state.viajeNivel.value + 
                ' con destino a: ' + this.state.destino.value:""}
              <br />


              <hr style={{ backgroundColor: "white", height: 1 }} />
            </li>
          </ul>
          <br/>
          <a className="App-link"
            href="http://duvanvilla.ga">
            Página Web del Programador</a>

        </header>

      </Fragment>)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Componente />
  </React.StrictMode>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


