import React, { useEffect, useState } from 'react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import { CChartBar, CChartDoughnut, CChartLine, CChartPie } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';

import { useParams } from 'react-router-dom';
import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown';
import axios from 'axios';

function SalesChannelsKPI() {
       const { salesChannelKey } = useParams();
       const [localData, setLocalData] = useState(null);

       let randomColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'];
       const getGlobalKPI = async e => {
              try {
                     const response = await axios.get(
  'https://box2home-dashboards-2.onrender.com/api/v1/kpi/sales-channel/' + salesChannelKey
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
              (item.data || []).map(elm => {
                     if (elm.status_count < maxPickNumber) counts += elm.status_count;
              });

              return counts;
       };

       const countAllIssuesByStatus = data => {
              let allYearsData = [];

              Object.keys(data).map(year => {
                     allYearsData = [...allYearsData, ...data[year]];
              });
              let groupedStatus = {};

              allYearsData.map(item =>
                     item.data.map(elem => {
                            if (!groupedStatus[elem.status]) groupedStatus[elem.status] = 0;

                            groupedStatus[elem.status] += elem.status_count;
                     })
              );

              console.log('allYearsData', groupedStatus);
              return groupedStatus;
       };

       useEffect(() => {
              console.clear();
              getGlobalKPI();
       }, [salesChannelKey]);

       if (!localData) return <div>Loading...</div>;
       return (
              <CContainer>
                     {localData?.ordersByStatus && (
                            <>
                                   <WidgetsDropdown ordersByStatus={localData?.ordersByStatus} />
                                   <CRow>
                                          <CCol xs={6}>
                                                 <CCard className="mb-4">
                                                        <CCardHeader>Overall Package Status</CCardHeader>
                                                        <CCardBody>
                                                               <CChartDoughnut
                                                                      data={{
                                                                             labels: ['Completed', 'In Progress', 'Failed'],
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
                                                        <CCardHeader>Main Package Status Percentages</CCardHeader>
                                                        <CCardBody>
                                                               <CChartPie
                                                                      data={{
                                                                             labels: ['Completed', 'In Progress', 'Failed'],
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
                     {localData?.averageWeightOrVolumePerOrder && Object.keys(localData?.averageWeightOrVolumePerOrder)?.length && (
                            <CRow>
                                   <CCol xs={12}>
                                          <CCard className="mb-4">
                                                 <CCardHeader>Package Volume by Year</CCardHeader>
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
                     )}
                     {/* done  */}
                     <CCard className="mb-4">
                            <CCardBody>
                                   <CRow>
                                          <CCol sm={5}>
                                                 <h4 id="Failed orders by status" className="card-title mb-0">
                                                        Failed Orders by Status
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
                                                              data: (localData?.fetchOrdersByTechnicalIssues?.[2022]?.length
  ? localData.fetchOrdersByTechnicalIssues[2022].map(pickIssuesData)
  : [1, 2, 3, 2]),
                                                        },
                                                        {
                                                               label: '2023 issues',
                                                               backgroundColor: 'transparent',
                                                               borderColor: getStyle('--cui-success'),
                                                               pointHoverBackgroundColor: getStyle('--cui-success'),
                                                               borderWidth: 2,
                                                               data: (localData?.fetchOrdersByTechnicalIssues?.[2022]?.length
  ? localData.fetchOrdersByTechnicalIssues[2022].map(pickIssuesData)
  : [2, 5, 3, 2]),
                                                        },
                                                        {
                                                               label: '2024 issues',
                                                               backgroundColor: 'transparent',
                                                               borderColor: getStyle('--cui-danger'),
                                                               pointHoverBackgroundColor: getStyle('--cui-danger'),
                                                               borderWidth: 1,
                                                               borderDash: [8, 5],
                                                               data: (localData?.fetchOrdersByTechnicalIssues?.[2022]?.length
  ? localData.fetchOrdersByTechnicalIssues[2022].map(pickIssuesData)
  : [3, 1, 2, 5]),
                                                        }
                                                 ]
                                          }}
                                   />
                            </CCardBody>
                            {localData?.fetchOrdersByTechnicalIssues && (
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
                            )}
                     </CCard>
              </CContainer>
       );
}
export default SalesChannelsKPI;
