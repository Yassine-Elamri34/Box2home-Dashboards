/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from 'axios';

const Login = props => {
       const [LoginData, setLoginData] = useState({
              password: null,
              email: null
       });
       const [ErrorsForm, setErrorsForm] = useState({
              error: null,
              message: null
       });
       const onChange = event => {
              console.log([event.target.name], event.target.value);
              setLoginData(
                     prev =>
                            Object.keys(LoginData).includes(event.target.name) && {
                                   ...prev,
                                   [event.target.name]: event.target.value
                            }
              );
       };

       const onSubmit = async e => {
              e.preventDefault();

              try {
                     let {
                            data: { data }
                     } = await axios.post(
  'https://box2home-dashboards-2.onrender.com/api/v1/auth/login',
  LoginData
);
                     console.log(data);

                     if (data.token) {
                            localStorage.setItem('Token', data.token);
                            props.refreshTokenSet(true);
                     }
              } catch (error) {
                     console.log(error?.response?.data);

                     setErrorsForm(error?.response?.data);
              }
       };

       return (
              <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                     <CContainer>
                            <CRow className="justify-content-center">
                                   <CCol md={8}>
                                          <CCardGroup>
                                                 <CCard className="p-4">
                                                        <CCardBody>
                                                               <CForm onSubmit={onSubmit}>
                                                                      <h1>Log In</h1>
                                                                      <p className="text-medium-emphasis">Log in to access the platform</p>
                                                                      <CInputGroup className="mb-3">
                                                                             <CInputGroupText>
                                                                                    <CIcon icon={cilUser} />
                                                                             </CInputGroupText>
                                                                             <CFormInput onChange={onChange} name="email" autoComplete="email" placeholder="Email" required />
                                                                      </CInputGroup>
                                                                      <CInputGroup className="mb-4">
                                                                             <CInputGroupText>
                                                                                    <CIcon icon={cilLockLocked} />
                                                                             </CInputGroupText>
                                                                             <CFormInput onChange={onChange} name="password" type="Password" placeholder="Mot de passe " autoComplete="current-password" />
                                                                      </CInputGroup>
                                                                      <CRow>
                                                                             {ErrorsForm?.error && (
                                                                                    <p style={{ color: 'red' }} className="text-medium-red">
                                                                                           {ErrorsForm?.error}
                                                                                    </p>
                                                                             )}
                                                                      </CRow>
                                                                      <CRow>
                                                                             <CCol xs={6}>
                                                                                    <CButton color="primary" className="px-4" type="submit">
                                                                                           Connexion
                                                                                    </CButton>
                                                                             </CCol>
                                                                      </CRow>
                                                               </CForm>
                                                        </CCardBody>
                                                 </CCard>
                                          </CCardGroup>
                                   </CCol>
                            </CRow>
                     </CContainer>
              </div>
       );
};
Login.prototype = {
       refreshTokenSet: PropTypes.func.isRequired
};
export default Login;
