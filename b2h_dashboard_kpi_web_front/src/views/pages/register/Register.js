import React, { useState } from 'react';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';

const Register = () => {
       const [formData, setFormData] = useState({
              username: '',
              email: '',
              password: '',
              repeatPassword: ''
       });

       const [errors, setErrors] = useState({});

       const handleChange = e => {
              const { name, value } = e.target;
              setFormData({
                     ...formData,
                     [name]: value
              });
       };

       const validateForm = () => {
              const errors = {};
              if (!formData.username.trim()) {
                     errors.username = 'Username is required';
              }
              if (!formData.email.trim()) {
                     errors.email = 'Email is required';
              } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                     errors.email = 'Email is invalid';
              }
              if (!formData.password.trim()) {
                     errors.password = 'Password is required';
              } else if (formData.password !== formData.repeatPassword) {
                     errors.repeatPassword = 'Passwords do not match';
              }
              setErrors(errors);
              return Object.keys(errors).length === 0;
       };

       const handleSubmit = async e => {
              e.preventDefault();
              if (validateForm()) {
                     try {
                            const response = await axios.post('/api/v1/auth/register', formData);
                            console.log('User registered successfully:', response.data);
                            // Optionally, redirect to a success page or do something else
                     } catch (error) {
                            console.log('Registration failed:', error.response.data);

                            if (error.response.data.includes('Email')) setErrors({ email: error.response.data.error });
                            // Handle registration failure, e.g., display error message
                     }
              }
       };

       return (
              <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
                     <CContainer>
                            <CRow className="justify-content-center">
                                   <CCol md={9} lg={7} xl={6}>
                                          <CCard className="mx-4">
                                                 <CCardBody className="p-4">
                                                        <CForm onSubmit={handleSubmit}>
                                                               <h1>Register</h1>
                                                               <p className="text-medium-emphasis">Create your account</p>
                                                               <CInputGroup className="mb-3">
                                                                      <CInputGroupText>
                                                                             <CIcon icon={cilUser} />
                                                                      </CInputGroupText>
                                                                      <CFormInput placeholder="Username" autoComplete="username" name="username" value={formData.username} onChange={handleChange} />
                                                                      {errors.username && <div className="text-danger">{errors.username}</div>}
                                                               </CInputGroup>
                                                               <CInputGroup className="mb-3">
                                                                      <CInputGroupText>@</CInputGroupText>
                                                                      <CFormInput placeholder="Email" autoComplete="email" name="email" value={formData.email} onChange={handleChange} />
                                                                      {errors.email && <div className="text-danger">{errors.email}</div>}
                                                               </CInputGroup>
                                                               <CInputGroup className="mb-3">
                                                                      <CInputGroupText>
                                                                             <CIcon icon={cilLockLocked} />
                                                                      </CInputGroupText>
                                                                      <CFormInput type="password" placeholder="Password" autoComplete="new-password" name="password" value={formData.password} onChange={handleChange} />
                                                                      {errors.password && <div className="text-danger">{errors.password}</div>}
                                                               </CInputGroup>
                                                               <CInputGroup className="mb-4">
                                                                      <CInputGroupText>
                                                                             <CIcon icon={cilLockLocked} />
                                                                      </CInputGroupText>
                                                                      <CFormInput
                                                                             type="password"
                                                                             placeholder="Repeat password"
                                                                             autoComplete="new-password"
                                                                             name="repeatPassword"
                                                                             value={formData.repeatPassword}
                                                                             onChange={handleChange}
                                                                      />
                                                                      {errors.repeatPassword && <div className="text-danger">{errors.repeatPassword}</div>}
                                                               </CInputGroup>
                                                               <div className="d-grid">
                                                                      <CButton type="submit" color="success">
                                                                             Create Account
                                                                      </CButton>
                                                               </div>
                                                        </CForm>
                                                 </CCardBody>
                                          </CCard>
                                   </CCol>
                            </CRow>
                     </CContainer>
              </div>
       );
};

export default Register;
