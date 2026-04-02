import React, { useState } from 'react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react';
import axios from 'axios'; // For making HTTP requests
import { useNavigate } from 'react-router-dom';

const ClientForm = () => {
       // State to store form data
       const navigation = useNavigate();
       const [formData, setFormData] = useState({
              clientName: '',
              contacts: {
                     phoneNumber: '',
                     email: ''
              },
              zones: [{ zoneLabel: '', channels: [{ channelId: '', slots: '' }], zipCodes: '' }],
              configurations: [{ item: '', value: '' }]
       });

       // Handler for form input changes
       const handleChange = (e, index, subIndex, fieldKey) => {
              const { name, value } = e.target;

              if (index !== undefined && subIndex !== undefined && fieldKey) {
                     // Nested array update (e.g., zones.channels)
                     setFormData(prev => ({
                            ...prev,
                            [name]: prev[name].map((item, i) =>
                                   i === index
                                          ? {
                                                   ...item,
                                                   [fieldKey]: item[fieldKey].map((subItem, j) => (j === subIndex ? { ...subItem, [name]: value } : subItem))
                                            }
                                          : item
                            )
                     }));
              } else if (index !== undefined && fieldKey) {
                     // Array of objects update (e.g., zones, configurations)
                     setFormData(prev => ({
                            ...prev,
                            [name]: prev[name].map((item, i) => (i === index ? { ...item, [fieldKey]: value } : item))
                     }));
              } else if (name.includes('.')) {
                     // Nested object update (e.g., contacts)
                     const [parentKey, childKey] = name.split('.');
                     setFormData(prev => ({
                            ...prev,
                            [parentKey]: { ...prev[parentKey], [childKey]: value }
                     }));
              } else {
                     // Top-level field update
                     setFormData(prev => ({ ...prev, [name]: value }));
              }
       };

       // Handler for adding a new zone
       const addZone = () => {
              setFormData({
                     ...formData,
                     zones: [
                            ...formData.zones,
                            {
                                   zoneLabel: '',
                                   channels: [{ channelId: '', slots: '' }], // Ensure at least one channel exists
                                   zipCodes: ''
                            }
                     ]
              });
       };
       const [ErrorsForm, setErrorsForm] = useState({
              error: null,
              message: null
       });
       // Handler for adding a new configuration
       const addConfiguration = () => {
              setFormData({
                     ...formData,
                     configurations: [...formData.configurations, { item: '', value: '' }]
              });
       };

       // Handler for submitting form
       const handleSubmit = async e => {
              e.preventDefault();

              try {
                     // Send form data to backend API
                     const response = await axios.post('http://localhost:4000/api/v1/clients', formData);
                     console.log(response.data); // Handle successful response
                     navigation('/client/list');
              } catch (error) {
                     console.error('Error:', error); // Handle error
                     if (error?.response?.data?.error?.includes('Email')) setErrorsForm({ error: error?.response?.data.error });
              }
       };

       return (
              <CRow>
                     <CCol>
                            <CCard>
                                   <CCardHeader>
                                          <strong>Create Client</strong>
                                   </CCardHeader>
                                   <CCardBody>
                                          <CForm onSubmit={handleSubmit}>
                                                 {/* Client Name */}
                                                 <div className="mb-3">
                                                        <CFormLabel htmlFor="clientName">Name</CFormLabel>
                                                        <CFormInput type="text" id="clientName" name="clientName" value={formData.clientName} onChange={e => handleChange(e)} placeholder="Enter client name" required />
                                                 </div>

                                                 {/* Contacts */}
                                                 <div className="mb-3">
                                                        <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                                                        <CFormInput
                                                               type="text"
                                                               id="phoneNumber"
                                                               name="contacts.phoneNumber"
                                                               value={formData.contacts.phoneNumber}
                                                               onChange={e => handleChange(e)} // No need for index or fieldKey here
                                                               placeholder="Enter phone number"
                                                               required
                                                        />
                                                 </div>
                                                 <div className="mb-3">
                                                        <CFormLabel htmlFor="email">Email</CFormLabel>
                                                        <CFormInput
                                                               type="email"
                                                               id="email"
                                                               name="contacts.email"
                                                               value={formData.contacts.email}
                                                               onChange={e => handleChange(e)} // No need for index or fieldKey here
                                                               placeholder="Enter email"
                                                               required
                                                        />
                                                 </div>
                                                 <CRow>
                                                        {ErrorsForm?.error && (
                                                               <p style={{ color: 'red' }} className="text-medium-red">
                                                                      {ErrorsForm?.error}
                                                               </p>
                                                        )}
                                                 </CRow>
                                                 {/* Zones */}
                                                 <div className="mb-3">
                                                        <CFormLabel>Zones</CFormLabel>
                                                        {formData.zones.map((zone, index) => (
                                                               <div key={index}>
                                                                      <CRow className="mb-3">
                                                                             {/* Zone Label */}
                                                                             <CCol>
                                                                                    <CFormInput
                                                                                           className="mb-3"
                                                                                           type="text"
                                                                                           name="zones"
                                                                                           value={zone.zoneLabel}
                                                                                           onChange={e => handleChange(e, index, undefined, 'zoneLabel')}
                                                                                           placeholder="Enter zone label"
                                                                                           required
                                                                                    />
                                                                             </CCol>
                                                                             <CCol>
                                                                                    <CFormInput
                                                                                           className="mb-3"
                                                                                           type="number"
                                                                                           name="zones"
                                                                                           value={zone.zipCodes}
                                                                                           onChange={e => handleChange(e, index, undefined, 'zipCodes')}
                                                                                           placeholder="Enter zone label"
                                                                                           required
                                                                                    />
                                                                             </CCol>
                                                                      </CRow>
                                                               </div>
                                                        ))}
                                                        <CButton color="primary" onClick={addZone}>
                                                               Add Zone
                                                        </CButton>
                                                 </div>

                                                 {/* Configurations */}
                                                 <div className="mb-3">
                                                        <CFormLabel>Configurations</CFormLabel>
                                                        {formData.configurations.map((configuration, index) => (
                                                               <div key={index}>
                                                                      <CRow className="mb-3">
                                                                             <CCol>
                                                                                    <CFormInput
                                                                                           type="text"
                                                                                           name="configurations"
                                                                                           value={configuration.item}
                                                                                           onChange={e => handleChange(e, index, undefined, 'item')}
                                                                                           placeholder="Enter item"
                                                                                           required
                                                                                    />
                                                                             </CCol>
                                                                             <CCol>
                                                                                    <CFormInput
                                                                                           type="text"
                                                                                           name="configurations"
                                                                                           value={configuration.value}
                                                                                           onChange={e => handleChange(e, index, undefined, 'value')}
                                                                                           placeholder="Enter value"
                                                                                           required
                                                                                    />
                                                                             </CCol>
                                                                      </CRow>
                                                               </div>
                                                        ))}
                                                        <CButton color="primary" onClick={addConfiguration}>
                                                               Add Configuration
                                                        </CButton>
                                                 </div>

                                                 {/* Submit Button */}
                                                 <CButton type="submit" color="primary">
                                                        Submit
                                                 </CButton>
                                          </CForm>
                                   </CCardBody>
                            </CCard>
                     </CCol>
              </CRow>
       );
};

export default ClientForm;
