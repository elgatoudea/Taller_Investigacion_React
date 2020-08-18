import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';



const Formulario = () => {

    const { register, errors, handleSubmit } = useForm();

    const [entradas, setEntradas] = useState([]);

    const procesarFormulario = (data, e) => {
        console.log(data);
        setEntradas([
            ...entradas,
            data
        ])
        // limpiar campos
        e.target.reset();
    }

    const handleInputChange = (event) => {
        console.log('Funciona');
    }

    



        return (
            <Fragment>
                
                <br />
                

                
                <form onSubmit={handleSubmit(procesarFormulario)}>


                    <div className="form-row">


                        <div className="form-group col-md-6">
                            <label htmlFor="inputTipoDoc">Tipo de Documento</label>
                            <select className="form-control" name="TipoDoc" >
                                <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                                <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                                <option value="Cédula de Extrangería">Cédula de Extrangería</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputNumId">Número de Documento</label>
                            <input type="text" className="form-control" name="NumId" placeholder="Ingrese su Número de Identidad"
                                ref={
                                    register({
                                        required: { value: true, message: 'Ingrese su Número de Identidad' }
                                        , minLength: {
                                            value: 7, message: 'Mínimo 7 carácteres'
                                        }
                                    })
                                } onChange={handleInputChange} />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.NumId?.message}
                            </span>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputFechaNac">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" name="FechaNac" placeholder="Ingrese su Fecha de Nacimiento"
                                ref={
                                    register({
                                        required: { value: true, message: 'Ingrese su Fecha de Nacimiento' }
                                    })
                                } onChange={handleInputChange} />
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.FechaNac?.message}
                            </span>
                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group col-md-12">
                            <hr style={{ backgroundColor: "white", height: 1 }} />
                            <label htmlFor="selectSalud">¿Es trabajador de la salud u otro personal ámbito hospitalario
                        que haya tenido contacto estrecho con un caso probable o confirmado por virus nuevo?</label>

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="contactoEstrecho1" name="contactoEstrecho1" className="custom-control-input" ref={
                                    register({
                                        required: { value: true, message: 'Ingrese Si o No' }
                                    })
                                } onChange={handleInputChange} />
                                <label className="custom-control-label" htmlFor="contactoEstrecho1">Si -</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="contactoEstrecho2" name="contactoEstrecho1" className="custom-control-input" ref={
                                    register({
                                        required: { value: true, message: 'Ingrese Si o No' }
                                    })
                                } onChange={handleInputChange} />
                                <label className="custom-control-label" htmlFor="contactoEstrecho2"> No</label>
                            </div>
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.contactoEstrecho1?.message}
                            </span>
                            <hr style={{ backgroundColor: "white", height: 1 }} />

                            <label htmlFor="selectSalud">¿Viajó a áreas de circulación del virus nuevo?</label>
                            <br />

                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="contactoEstrecho3" name="contactoEstrecho2" className="custom-control-input" ref={
                                    register({
                                        required: { value: true, message: 'Ingrese Si o No' }
                                    })
                                } onChange={handleInputChange} />
                                <label className="custom-control-label" htmlFor="contactoEstrecho3">Si -</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="contactoEstrecho4" name="contactoEstrecho2" className="custom-control-input" ref={
                                    register({
                                        required: { value: true, message: 'Ingrese Si o No' }
                                    })
                                } onChange={handleInputChange} />
                                <label className="custom-control-label" htmlFor="contactoEstrecho4"> No</label>
                            </div>
                            <span className="text-danger text-small d-block mb-2">
                                {errors?.contactoEstrecho2?.message}
                            </span>
                            <hr style={{ backgroundColor: "white", height: 1 }} />



                        </div>
                    </div>





                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Agregar
                </button>
                </form>

                <ul className="mt-2">
                    {
                        entradas.map((item, index) =>
                            <li key={index}>
                                <hr style={{ backgroundColor: "white", height: 1 }} />

                                {index + 1}: El paciente {item.Nombres} {item.Apellidos} -
                           identificado con {item.TipoDoc} Número : {item.NumId}, nacido el {item.FechaNac}
                           , el cual {item.contactoEstrecho1} tuvo contacto extrecho con algún paciente,
                           además, {item.contactoEstrecho2} Viajó a áreas de circulación del virus nuevo.
                           <br />

                                <hr style={{ backgroundColor: "white", height: 1 }} />
                            </li>
                        )
                    }
                </ul>

            </Fragment>
        );
    }

    export default Formulario;