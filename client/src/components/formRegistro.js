import React, {useState} from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik'

const Formulario = () => {
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    return (
        <>
            <Formik
                initialValues={{
                    nombre: '',
                    correo: '',
                    contraseña: ''
                }}
                validate={(valores) => {
                    let errores = {};
                    
                    //Validación nombre
                    if(!valores.nombre){
                        errores.nombre = 'Por favor ingresa tu nombre'
                    }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                        errores.contraseña = 'El nombre solo puede contener letras y espacios'
                    }

                    //Validación contraseña
                    if(!valores.contraseña){
                        errores.contraseña = 'Por favor ingresa tu contraseña'
                    }else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(valores.contraseña)){
                        errores.contraseña = 'La contraseña debe contener entre 6 a 20 caracteres'
                    }

                    //Validación correo
                    if(!valores.correo){
                        errores.correo = 'Por favor ingresa tu correo'
                    }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.correo)){
                        errores.correo = 'El correo solo puede contener letras, números, puntos, guiones, guión bajo y @'
                    }

                    return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                    resetForm();
                    console.log('Formulario enviado');
                    cambiarFormularioEnviado(true);
                    setTimeout(() => cambiarFormularioEnviado(false), 3000);
                }}
            >

                {( {errors} ) => (

                    <Form className="formulario">
                    {console.log(errors)}
                    <div>
                        <label htmlFor='nombre'>Nombre</label>
                        <Field 
                            type="text" 
                            id='nombre' 
                            name='nombre' 
                            placeholder='Tu nombre' 
                        />
                        <ErrorMessage name="nombre" component={() => (
                            <div className="nombre">{errors.nombre}</div>
                        )}/>
                    </div>
                    <div>
                        <label htmlFor='correo'>Correo</label>
                        <Field 
                            type="text" 
                            id='correo' 
                            name='correo' 
                            placeholder='ejemplo@correo.com' 
                        />
                        <ErrorMessage name="correo" component={() => (
                            <div className="error">{errors.correo}</div>
                        )}/>
                    </div>
                    <div>
                        <label htmlFor='contraseña'>contraseña</label>
                        <Field
                            type="text" 
                            id='contraseña' 
                            name='contraseña' 
                            placeholder='Tu contraseña' 
                        />
                        <ErrorMessage name="contraseña" component={() => (
                            <div className="error">{errors.contraseña}</div>
                        )}/>
                    </div>
                    <button type='submit'>Enviar</button>
                    {formularioEnviado && <p className='exito'>Formulario enviado con éxito</p>}
                    <div>
                        <p className='reg'>¿Ya tienes una cuenta? <a href=''>Inicia sesión</a></p>
                    </div>
                </Form>
                )}
                
                {/* {( { values, errors, touched, handleSubmit, handleChange, handleBlur } ) => (
                    <Form className="formulario">
                    {console.log(errors)}
                    <div>
                        <label htmlFor='contraseña'>contraseña</label>
                        <input 
                            type="text" 
                            id='contraseña' 
                            name='contraseña' 
                            placeholder='Tu contraseña' 
                            value={values.contraseña} 
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.contraseña && errors.contraseña && <div className="error">{errors.contraseña}</div>}
                    </div>
                    <div>
                        <label htmlFor='correo'>Correo</label>
                        <input 
                            type="text" 
                            id='correo' 
                            name='correo' 
                            placeholder='ejemplo@correo.com' 
                            value={values.correo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.correo && errors.correo && <div className="error">{errors.correo}</div>}
                    </div>
                    <button type='submit'>Enviar</button>
                    {formularioEnviado && <p className='exito'>Formulario enviado con éxito</p>}
                </Form>
                )} */}
            </Formik>
        </>
    );
}

export default Formulario;