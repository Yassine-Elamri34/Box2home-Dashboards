import React, { useEffect, useState } from 'react';

import { CAvatar, CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { CChartBar, CChartDoughnut, CChartLine, CChartPie } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cibFacebook, cibGoogle, cibLinkedin, cibTwitter, cilCloudDownload, cilPeople, cilUser, cilUserFemale } from '@coreui/icons';

import WidgetsDropdown from '../widgets/WidgetsDropdown';
import axios from 'axios';

const Dashboard = () => {
       const [localData, setLocalData] = useState(null);

       const progressExample = [
              { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
              { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
              { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
              { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
              { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' }
       ];

       const progressGroupExample1 = [
              { title: 'Monday', value1: 34, value2: 78 },
              { title: 'Tuesday', value1: 56, value2: 94 },
              { title: 'Wednesday', value1: 12, value2: 67 },
              { title: 'Thursday', value1: 43, value2: 91 },
              { title: 'Friday', value1: 22, value2: 73 },
              { title: 'Saturday', value1: 53, value2: 82 },
              { title: 'Sunday', value1: 9, value2: 69 }
       ];

       const progressGroupExample2 = [
              { title: 'Male', icon: cilUser, value: 53 },
              { title: 'Female', icon: cilUserFemale, value: 43 }
       ];

       const progressGroupExample3 = [
              { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
              { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
              { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
              { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' }
       ];
       let randomColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'];
       const getGlobalKPI = async e => {
              try {
                     const response = await axios.get(
  'https://box2home-dashboards-2.onrender.com/api/v1/kpi/global'
);

                     console.log(response.data.data);
                     if (response?.data?.data) {
                            setLocalData(response.data.data);
                     }
              } catch (error) {
                     console.error('Error:', error);
              }
       };
       const maxPickNumber = 150;
       const pickIssuesData = item => {
              let counts = 0;
              item.data.map(elm => {
                     if (elm.status_count < maxPickNumber) counts += elm.status_count;
              });

              return counts;
       };

       const countAllIssuesByStatus = data => {
              let allYearsData = [];

              Object.keys(data).map(year => {
                     allYearsData = [...allYearsData, ...data[year]];
              });
              let total_issues = {};
              let groupedStatus = {};

              allYearsData.map(item =>
                     item.data.map(elem => {
                            if (!groupedStatus[elem.status]) groupedStatus[elem.status] = 0;

                            groupedStatus[elem.status] += elem.status_count;
                            total_issues += elem.status_count;
                     })
              );

              console.log('allYearsData', groupedStatus);
              return groupedStatus;
       };

       useEffect(() => {
              console.clear();
              getGlobalKPI();
       }, []);

       if (!localData) return <div>Loading...</div>;
       return (
              <CContainer>
                     {localData?.ordersByStatus && (
                            <>
                                   <WidgetsDropdown ordersByStatus={localData?.ordersByStatus} />
                                   <CRow>
                                          <CCol xs={6}>
                                                 <CCard className="mb-4">
                                                        <CCardHeader>Status globale des colis </CCardHeader>
                                                        <CCardBody>
                                                               <CChartDoughnut
                                                                      data={{
                                                                             labels: ['Terminé avec succès', 'En cours', 'Livraison impossible'],
                                                                             datasets: [
                                                                                    {
                                                                                           backgroundColor: ['#41B883', '#00D8FF', '#E46651'],
                                                                                           data: [
                                                                                                  localData?.ordersByStatus.finished_successfully,
                                                                                                  localData?.ordersByStatus.in_progress,
                                                                                                  localData?.ordersByStatus.LIVRAISON_IMPOSSIBLE
                                                                                           ]
                                                                                    }
                                                                             ]
                                                                      }}
                                                               />
                                                        </CCardBody>
                                                 </CCard>
                                          </CCol>

                                          <CCol xs={6}>
                                                 <CCard className="mb-4">
                                                        <CCardHeader>Les pourcentages principaux des états des colis</CCardHeader>
                                                        <CCardBody>
                                                               <CChartPie
                                                                      data={{
                                                                             labels: ['Terminé avec succès', 'En cours', 'Livraison impossible'],
                                                                             datasets: [
                                                                                    {
                                                                                           data: [
                                                                                                  localData?.percentageOrderStatus.finished_successfully,
                                                                                                  localData?.percentageOrderStatus.in_progress,
                                                                                                  localData?.percentageOrderStatus.LIVRAISON_IMPOSSIBLE
                                                                                           ],
                                                                                           backgroundColor: ['#41B883', '#00D8FF', '#E46651'],
                                                                                           hoverBackgroundColor: ['#41B883', '#00D8FF', '#E46651']
                                                                                    }
                                                                             ]
                                                                      }}
                                                               />
                                                        </CCardBody>
                                                 </CCard>
                                          </CCol>
                                   </CRow>{' '}
                            </>
                     )}
                     <CRow>
                            <CCol xs={12}>
                                   <CCard className="mb-4">
                                          <CCardHeader>Le volume des colis par année</CCardHeader>
                                          <CCardBody>
                                                 <CChartBar
                                                        data={{
                                                               labels: Object.keys(localData?.averageWeightOrVolumePerOrder),
                                                               datasets: [
                                                                      {
                                                                             label: 'Volume',
                                                                             backgroundColor: '#f87979',
                                                                             data: Object.keys(localData?.averageWeightOrVolumePerOrder).map(key => localData?.averageWeightOrVolumePerOrder[key])
                                                                      }
                                                               ]
                                                        }}
                                                        labels="year"
                                                 />
                                          </CCardBody>
                                   </CCard>
                            </CCol>
                     </CRow>
                     {/* done  */}
                     <CCard className="mb-4">
                            <CCardBody>
                                   <CRow>
                                          <CCol sm={5}>
                                                 <h4 id="Les commandes échouées par statut" className="card-title mb-0">
                                                        Les commandes échouées par statut{' '}
                                                 </h4>
                                          </CCol>
                                          <CCol sm={7} className="d-none d-md-block">
                                                 <CButton color="primary" className="float-end">
                                                        <CIcon icon={cilCloudDownload} />
                                                 </CButton>
                                                 <CButtonGroup className="float-end me-3">
                                                        {['Day', 'Month', 'Year'].map(value => (
                                                               <CButton color="outline-secondary" key={value} className="mx-0" active={value === 'Month'}>
                                                                      {value}
                                                               </CButton>
                                                        ))}
                                                 </CButtonGroup>
                                          </CCol>
                                   </CRow>

                                   {console.log(
                                          localData?.fetchOrdersByTechnicalIssues[2024].map(item => {
                                                 let counts = 0;
                                                 item.data.map(elm => (counts += elm.status_count));

                                                 return counts;
                                          })
                                   )}
                                   <CChartLine
                                          data={{
                                                 labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

                                                 datasets: [
                                                        {
                                                               label: '2022 issues',
                                                               backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
                                                               borderColor: getStyle('--cui-info'),
                                                               pointHoverBackgroundColor: getStyle('--cui-info'),
                                                               borderWidth: 2,
                                                               data: localData?.fetchOrdersByTechnicalIssues[2022].map(pickIssuesData)
                                                        },
                                                        {
                                                               label: '2023 issues',
                                                               backgroundColor: 'transparent',
                                                               borderColor: getStyle('--cui-success'),
                                                               pointHoverBackgroundColor: getStyle('--cui-success'),
                                                               borderWidth: 2,
                                                               data: localData?.fetchOrdersByTechnicalIssues[2023].map(pickIssuesData)
                                                        },
                                                        {
                                                               label: '2024 issues',
                                                               backgroundColor: 'transparent',
                                                               borderColor: getStyle('--cui-danger'),
                                                               pointHoverBackgroundColor: getStyle('--cui-danger'),
                                                               borderWidth: 1,
                                                               borderDash: [8, 5],
                                                               data: localData?.fetchOrdersByTechnicalIssues[2024].map(pickIssuesData)
                                                        }
                                                 ]
                                          }}
                                   />
                            </CCardBody>
                            <CCardFooter>
                                   <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
                                          {Object.keys(countAllIssuesByStatus(localData?.fetchOrdersByTechnicalIssues)).map((key, index) => {
                                                 let elements = countAllIssuesByStatus(localData?.fetchOrdersByTechnicalIssues);
                                                 let totalCount = Object.values(elements).reduce((acc, curr) => acc + curr, 0);
                                                 let percentage = ((elements[key] / totalCount) * 100).toFixed(2); // Calculate percentage
                                                 return (
                                                        <CCol className="mb-sm-2 mb-0" key={index}>
                                                               <div className="text-medium-emphasis">{key}</div>
                                                               <strong>
                                                                      {elements[key]} ({percentage}%)
                                                               </strong>{' '}
                                                               {/* Include percentage here */}
                                                               <CProgress thin className="mt-2" color={randomColors[index]} value={elements[key]} />
                                                        </CCol>
                                                 );
                                          })}
                                   </CRow>
                            </CCardFooter>
                     </CCard>

                     <CRow>
                            <CCol xs>
                                   <CCard className="mb-4">
                                          <CCardHeader>packageSources</CCardHeader>
                                          <CCardBody>
                                                 <CRow>
                                                        <CCol xs={12} md={6} xl={6}>
                                                               <CRow>
                                                                      {localData.packageSources.slice(0, 2).map((item, index) => (
                                                                             <CCol sm={6} key={index}>
                                                                                    <div className={`border-start border-start-4 border-start-${randomColors[index]} py-1 px-3 py-1 px-3 mb-3`}>
                                                                                           <div className="text-medium-emphasis small">{item.source}</div>
                                                                                           <div className="fs-5 fw-semibold">{item.package_count}</div>
                                                                                    </div>
                                                                             </CCol>
                                                                      ))}
                                                               </CRow>
                                                        </CCol>
                                                        <CCol xs={12} md={6} xl={6}>
                                                               <CRow>
                                                                      {localData.packageSources.slice(2, 4).map((item, index) => (
                                                                             <CCol sm={6} key={index}>
                                                                                    <div className={`border-start border-start-4 border-start-${randomColors[index]} py-1 px-3 py-1 px-3 mb-3`}>
                                                                                           <div className="text-medium-emphasis small">{item.source}</div>
                                                                                           <div className="fs-5 fw-semibold">{item.package_count}</div>
                                                                                    </div>
                                                                             </CCol>
                                                                      ))}
                                                               </CRow>
                                                        </CCol>
                                                 </CRow>

                                                 <CTable align="middle" className="mb-0 border" hover responsive>
                                                        <CTableHead color="light">
                                                               <CTableRow>
                                                                      <CTableHeaderCell>channel name</CTableHeaderCell>
                                                                      <CTableHeaderCell className="text-left">order count</CTableHeaderCell>
                                                                      <CTableHeaderCell className="text-right"></CTableHeaderCell>
                                                                      <CTableHeaderCell className="text-right">last_package_created_at</CTableHeaderCell>
                                                               </CTableRow>
                                                        </CTableHead>
                                                        <CTableBody>
                                                               {localData?.topOrdersExternalCodes?.map((item, index) => (
                                                                      <CTableRow v-for="item in tableItems" key={index}>
                                                                             <CTableDataCell>
                                                                                    <div>{item.sales_channel}</div>
                                                                             </CTableDataCell>
                                                                             {}
                                                                             <CTableDataCell className="text-left">
                                                                                    <strong>{item.order_count}</strong>
                                                                             </CTableDataCell>
                                                                             <CTableDataCell className="text-right"></CTableDataCell>
                                                                             <CTableDataCell className="text-right">
                                                                                    <div className="small text-medium-emphasis">Last package</div>
                                                                                    <strong>{item.last_package_created_at}</strong>
                                                                             </CTableDataCell>
                                                                      </CTableRow>
                                                               ))}
                                                        </CTableBody>
                                                 </CTable>
                                          </CCardBody>
                                   </CCard>
                            </CCol>
                     </CRow>
              </CContainer>
       );
};

export default Dashboard;
