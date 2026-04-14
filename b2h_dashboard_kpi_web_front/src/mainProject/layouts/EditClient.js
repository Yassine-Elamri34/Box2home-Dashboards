import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

import { cilEnvelopeOpen, cilHeadphones, cilUser } from '@coreui/icons';
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader, CListGroup, CListGroupItem, CBadge, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';
import CIcon from '@coreui/icons-react';

const ClientDetailsPage = ({ client }) => {
       return (
              <CContainer fluid className="client-details-container">
                     <CCard>
                            <CCardHeader>Client Details: {client.clientName}</CCardHeader>
                            <CCardBody>
                                   <CRow className="mb-4">
                                          <CCol style={{ padding: '20px 0;' }} className="me-2" sm={12} md={12} lg={12}>
                                                 <CListGroup flush>
                                                        <CListGroupItem>
                                                               <CIcon icon={cilUser} className="me-2" /> Client Name: {client.clientName}
                                                        </CListGroupItem>
                                                        <CListGroupItem>
                                                               <CIcon icon={cilHeadphones} className="me-2" /> Phone Number: {client.contacts.phoneNumber}
                                                        </CListGroupItem>
                                                        <CListGroupItem>
                                                               <CIcon icon={cilEnvelopeOpen} className="me-2" /> Email: {client.contacts.email}
                                                        </CListGroupItem>
                                                 </CListGroup>
                                          </CCol>
                                   </CRow>
                                   <CRow>
                                          <CCol sm={6} md={8} lg={9}>
                                                 {/* Zones */}
                                                 <CCard className="mb-3">
                                                        <CCardHeader>Zones</CCardHeader>
                                                        <CCardBody>
                                                               <CTable bordered responsive hover>
                                                                      <CTableHead>
                                                                             <CTableRow>
                                                                                    <CTableHeaderCell scope="col">Zone Label</CTableHeaderCell>
                                                                                    <CTableHeaderCell scope="col">Zip Codes</CTableHeaderCell>
                                                                             </CTableRow>
                                                                      </CTableHead>
                                                                      <CTableBody>
                                                                             {client.zones.map(zone => (
                                                                                    <CTableRow key={zone.zoneLabel}>
                                                                                           <CTableDataCell>{zone.zoneLabel}</CTableDataCell>
                                                                                           <CTableDataCell>{zone.zipCodes}</CTableDataCell>
                                                                                    </CTableRow>
                                                                             ))}
                                                                      </CTableBody>
                                                               </CTable>
                                                        </CCardBody>
                                                 </CCard>

                                                 {/* Configurations */}
                                                 <CCard>
                                                        <CCardHeader>Configurations</CCardHeader>
                                                        <CCardBody>
                                                               {/* Render configurations dynamically based on their structure */}
                                                               {client.configurations.map(configuration => (
                                                                      <CListGroupItem key={configuration.id || Math.random()}>
                                                                             {/* Display configuration details based on its properties */}
                                                                             {configuration.item && (
                                                                                    <>
                                                                                           <strong>{configuration.item}: </strong>
                                                                                           {configuration.value}
                                                                                    </>
                                                                             )}
                                                                             {configuration.type === 'badge' && <CBadge color={configuration.color}>{configuration.label}</CBadge>}
                                                                             {/* Add logic to handle other configuration types */}
                                                                      </CListGroupItem>
                                                               ))}
                                                        </CCardBody>
                                                 </CCard>
                                          </CCol>
                                   </CRow>
                            </CCardBody>
                     </CCard>
              </CContainer>
       );
};
ClientDetailsPage.propTypes = {
       client: PropTypes.shape({
              clientName: PropTypes.string.isRequired,
              contacts: PropTypes.shape({
                     phoneNumber: PropTypes.string.isRequired,
                     email: PropTypes.string.isRequired
              }).isRequired,
              zones: PropTypes.arrayOf(
                     PropTypes.shape({
                            zoneLabel: PropTypes.string.isRequired,
                            zipCodes: PropTypes.string
                     })
              ).isRequired,
              configurations: PropTypes.arrayOf(PropTypes.object).isRequired
       }).isRequired
};

const ClientDetailsContainer = () => {
       const [formData, setFormData] = useState(null);
       const { id } = useParams();

       useEffect(() => {
              const fetchClientData = async () => {
                     try {
                            const response = await axios.get(
  `https://box2home-dashboards-2.onrender.com/api/v1/clients/${id}`
);
                            const clientData = response.data.data;
                            setFormData(clientData);
                     } catch (error) {
                            console.error('Error fetching client data:', error);
                     }
              };

              fetchClientData();
       }, [id]);

       return <div>{formData ? <ClientDetailsPage client={formData} /> : <div>Loading...</div>}</div>;
};

export default ClientDetailsContainer;
