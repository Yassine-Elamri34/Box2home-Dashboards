import React, { useState } from 'react';
import axios from 'axios';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react';

export default function AddUser() {
       const [formData, setFormData] = useState({
              email: '',
              username: '',
              role: ''
       });
       const [ErrorsForm, setErrorsForm] = useState({
              error: null,
              message: null
       });

       const handleChange = e => {
              const { name, value } = e.target;
              setFormData(prevState => ({
                     ...prevState,
                     [name]: value
              }));
       };

       const handleSubmit = async e => {
              e.preventDefault();
              try {
                     const response = await axios.post(
  'https://box2home-dashboards-2.onrender.com/api/v1/auth/register',
  formData
);
                     console.log(response.data); // Log the response if needed
                     // Clear form after successful submission if needed
                     setFormData({
                            email: '',
                            username: '',
                            password: '',
                            role: ''
                     });
              } catch (error) {
                     console.error('Error:', error);
                    const errorData = error.response?.data;

console.log(errorData); // VERY IMPORTANT (debug)

if (typeof errorData?.error === 'string') {
  setErrorsForm({ error: errorData.error });
} else if (errorData?.message) {
  setErrorsForm({ error: errorData.message });
} else {
  setErrorsForm({ error: 'Something went wrong' });
}
              }
       };

       return (
              <CContainer xl>
                     <form onSubmit={handleSubmit}>
                            <CRow>
                                   <CCol xs={12}>
                                          <CCard className="mb-4">
                                                 <CCardHeader>
                                                        <strong>Add New User</strong>
                                                 </CCardHeader>
                                                 <CCardBody>
                                                        <p className="text-medium-emphasis small">Please fill out this form and complete all required fields </p>
                                                        <CInputGroup className="mb-3">
                                                               <CInputGroupText id="basic-addon1">@</CInputGroupText>
                                                               <CFormInput
                                                                      placeholder="Email"
                                                                      aria-label="Email"
                                                                      type="email"
                                                                      aria-describedby="basic-addon1"
                                                                      name="email"
                                                                      value={formData.email}
                                                                      onChange={handleChange}
                                                                      required
                                                               />
                                                        </CInputGroup>
                                                        <CRow>
                                                               {ErrorsForm?.error && (
                                                                      <p style={{ color: 'red' }} className="text-medium-red">
                                                                             {ErrorsForm?.error}
                                                                      </p>
                                                               )}
                                                        </CRow>
                                                        <CInputGroup className="mb-3">
                                                               <CFormInput placeholder="Username" aria-label="Username" name="username" value={formData.username} onChange={handleChange} required />
                                                        </CInputGroup>
                                                        <CInputGroup className="mb-3">
                                                               <CFormInput placeholder="Password" aria-label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
                                                        </CInputGroup>
                                                        <CFormSelect size="lg" className="mb-3" aria-label="Large select example" name="role" value={formData.role} onChange={handleChange}>
                                                               <option>Select a role</option>
                                                               <option value="admin">Opérateur de tableau de bord</option>
                                                        </CFormSelect>
                                                 </CCardBody>
                                          </CCard>
                                   </CCol>
                            </CRow>
                            <div className="flex flex-s-b">
                                   <div>
                                          <CButton className="text-bold text-white" color="danger">
                                                 Cancel
                                          </CButton>
                                   </div>
                                   <div>
                                          <CButton type="submit" className="text-bold text-white" color="primary">
                                                 Submit
                                          </CButton>
                                   </div>
                            </div>
                     </form>
              </CContainer>
       );
}
