import React, { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import "./logreg.css";

// Hooks
import useAuth from "../hooks/useAuth";

const Formulario = () => {
	const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
	// Context
	const context = useAuth();
	const { login } = context;

	return (
		<>
			<h1>Iniciar Sesión</h1>
			<div className="contenedor">
				<Formik
					initialValues={{
						contraseña: "",
						correo: "",
					}}
					validate={(valores) => {
						let errores = {};

						//Validación contraseña
						if (!valores.contraseña) {
							errores.contraseña = "Por favor ingresa tu contraseña";
						} else if (
							!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(
								valores.contraseña
							)
						) {
							errores.contraseña =
								"El contraseña solo puede contener letras y espacios";
						}

						//Validación correo
						if (!valores.correo) {
							errores.correo = "Por favor ingresa tu correo";
						} else if (
							!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
								valores.correo
							)
						) {
							errores.correo =
								"El correo solo puede contener letras, números, puntos, guiones, guión bajo y @";
						}

						return errores;
					}}
					onSubmit={async (valores, { resetForm }) => {
						try {
							await login(valores.correo, valores.contraseña);
						} catch (error) {
							resetForm();
						}
					}}
				>
					{({ errors }) => (
						<Form className="formulario">
							{console.log(errors)}
							<div>
								<label htmlFor="correo">Correo</label>
								<Field
									type="text"
									id="correo"
									name="correo"
									placeholder="ejemplo@correo.com"
								/>
								<ErrorMessage
									name="correo"
									component={() => <div className="error">{errors.correo}</div>}
								/>
							</div>
							<div>
								<label htmlFor="contraseña">contraseña</label>
								<Field
									type="password"
									id="contraseña"
									name="contraseña"
									placeholder="Tu contraseña"
								/>
								<ErrorMessage
									name="contraseña"
									component={() => (
										<div className="error">{errors.contraseña}</div>
									)}
								/>
							</div>
							<button type="submit">Enviar</button>
							{formularioEnviado && (
								<p className="exito">Formulario enviado con éxito</p>
							)}
							<div>
								<p className="reg">
									¿No tienes una cuenta? <a href="/auth/register">Regístrate</a>
								</p>
							</div>
						</Form>
					)}

					{/* {( { values, errors, touched, handleSubmit, handleChange, handleBlur } ) => (
                        <Form className="formulario">
                        {console.log(errors)}
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
                            <label htmlFor='contraseña'>Contraseña</label>
                            <Field
                                type="password" 
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
                            <p className='reg'>¿No tienes una cuenta? <a href='/auth/register'>Regístrate</a></p>
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
			</div>
		</>
	);
};

export default Formulario;
