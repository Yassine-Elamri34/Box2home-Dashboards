import React, { useEffect, useState } from 'react';

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CContainer,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';

import { CChartBar, CChartDoughnut, CChartLine, CChartPie } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';
import CIcon from '@coreui/icons-react';
import { cilCloudDownload } from '@coreui/icons';

import axios from 'axios';
import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown';

const GlobalDashBoard = () => {
  const [localData, setLocalData] = useState(null);

  let randomColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'];

  const getGlobalKPI = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/kpi/global');
      if (response?.data?.data) {
        setLocalData(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const maxPickNumber = 150;

  const pickIssuesData = (item) => {
    let counts = 0;
    item?.data?.forEach(elm => {
      if (elm.status_count < maxPickNumber) counts += elm.status_count;
    });
    return counts;
  };

  const countAllIssuesByStatus = (data = {}) => {
    let groupedStatus = {};

    Object.values(data).forEach(yearArr => {
      (yearArr || []).forEach(item => {
        item?.data?.forEach(elem => {
          if (!groupedStatus[elem.status]) groupedStatus[elem.status] = 0;
          groupedStatus[elem.status] += elem.status_count;
        });
      });
    });

    return groupedStatus;
  };

  useEffect(() => {
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
                <CCardHeader>Overall Package Status</CCardHeader>
                <CCardBody>
               <CChartDoughnut
  data={{
    labels: ['Completed', 'In Progress', 'Failed'],
    datasets: [
      {
        data: [
          localData?.ordersByStatus?.finished_successfully || 0,
          localData?.ordersByStatus?.in_progress || 0,
          localData?.ordersByStatus?.LIVRAISON_IMPOSSIBLE || 0
        ],
        backgroundColor: ['#2eb85c', '#3399ff', '#e55353']
      }
    ]
  }}
/>
                </CCardBody>
              </CCard>
            </CCol>

            <CCol xs={6}>
              <CCard className="mb-4">
                <CCardHeader>Percentages</CCardHeader>
                <CCardBody>
                  <CChartPie
  data={{
    labels: ['Completed', 'In Progress', 'Failed'],
    datasets: [
      {
        data: [
          localData?.percentageOrderStatus?.finished_successfully || 0,
          localData?.percentageOrderStatus?.in_progress || 0,
          localData?.percentageOrderStatus?.LIVRAISON_IMPOSSIBLE || 0
        ],
        backgroundColor: ['#2eb85c', '#3399ff', '#e55353']
      }
    ]
  }}
/>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}

      {/* BAR */}
      <CCard className="mb-4">
        <CCardHeader>Package Volume by Year</CCardHeader>
        <CCardBody>
          <CChartBar
            data={{
              labels: Object.keys(localData?.averageWeightOrVolumePerOrder || {}),
              datasets: [
  {
    label: 'Volume',
    data: Object.values(localData?.averageWeightOrVolumePerOrder || {}),
    backgroundColor: '#3399ff'
  }
]
            }}
          />
        </CCardBody>
      </CCard>

      {/* LINE SAFE */}
      <CCard className="mb-4">
        <CCardBody>
 <CCardHeader>Failed Orders by Status</CCardHeader>




          <CChartLine
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr'],
             datasets: [
  {
    label: '2022',
    data: [2, 4, 3, 5],
    borderColor: '#2eb85c',
    backgroundColor: 'rgba(46,184,92,0.2)',
    tension: 0.4
  },
  {
    label: '2023',
    data: [3, 2, 6, 4],
    borderColor: '#3399ff',
    backgroundColor: 'rgba(51,153,255,0.2)',
    tension: 0.4
  },
  {
    label: '2024',
     data: [1, 3, 2, 7],
    borderColor: '#e55353',
    backgroundColor: 'rgba(229,83,83,0.2)',
    tension: 0.4
  }
]
            }}
          />

        </CCardBody>
      </CCard>

      {/* PACKAGE SOURCES */}
      <CCard className="mb-4">
        <CCardBody>
              

          {(localData?.packageSources || []).map((item, index) => (
            <div key={index}>
              {item.source} - {item.package_count}
            </div>
          ))}

          <CTable>
            <CTableBody>
              {(localData?.topOrdersExternalCodes || []).map((item, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{item.sales_channel}</CTableDataCell>
                  <CTableDataCell>{item.order_count}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

        </CCardBody>
      </CCard>

    </CContainer>
  );
};

export default GlobalDashBoard;























































// import React, { useEffect, useState } from 'react';

// import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCardHeader, CCol, CContainer, CProgress, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
// import { CChartBar, CChartDoughnut, CChartLine, CChartPie } from '@coreui/react-chartjs';
// import { getStyle, hexToRgba } from '@coreui/utils';
// import CIcon from '@coreui/icons-react';
// import { cilCloudDownload } from '@coreui/icons';

// import axios from 'axios';
// import WidgetsDropdown from 'src/views/widgets/WidgetsDropdown';

// const GlobalDashBoard = () => {
//        const [localData, setLocalData] = useState(null);

//        let randomColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark', 'light'];
//        const getGlobalKPI = async e => {
//               try {
//                      const response = await axios.get('http://localhost:4000/api/v1/kpi/global');

//                      console.log(response.data.data);
//                      if (response?.data?.data) {
//                             setLocalData(response.data.data);
//                      }
//               } catch (error) {
//                      console.error('Error:', error);
//               }
//        };
//        const maxPickNumber = 150;
//        const pickIssuesData = item => {
//               let counts = 0;
//               item.data.map(elm => {
//                      if (elm.status_count < maxPickNumber) counts += elm.status_count;
//               });

//               return counts;
//        };

//        const countAllIssuesByStatus = data => {
//               let allYearsData = [];

//               Object.keys(data).map(year => {
//                      allYearsData = [...allYearsData, ...data[year]];
//               });
//               let groupedStatus = {};

//               allYearsData.map(item =>
//                      item.data.map(elem => {
//                             if (!groupedStatus[elem.status]) groupedStatus[elem.status] = 0;

//                             groupedStatus[elem.status] += elem.status_count;
//                      })
//               );

//               console.log('allYearsData', groupedStatus);
//               return groupedStatus;
//        };

//        useEffect(() => {
//               console.clear();
//               getGlobalKPI();
//        }, []);

//        if (!localData) return <div>Loading...</div>;
//        return (
//               <CContainer>
//                      {localData?.ordersByStatus && (
//                             <>
//                                    <WidgetsDropdown ordersByStatus={localData?.ordersByStatus} />
//                                    <CRow>
//                                           <CCol xs={6}>
//                                                  <CCard className="mb-4">
//                                                         <CCardHeader>Status globale des colis </CCardHeader>
//                                                         <CCardBody>
//                                                                <CChartDoughnut
//                                                                       data={{
//                                                                              labels: ['Terminé avec succès', 'En cours', 'Livraison impossible'],
//                                                                              datasets: [
//                                                                                     {
//                                                                                            backgroundColor: ['#41B883', '#00D8FF', '#E46651'],
//                                                                                            data: [
//                                                                                                   localData?.ordersByStatus.finished_successfully,
//                                                                                                   localData?.ordersByStatus.in_progress,
//                                                                                                   localData?.ordersByStatus.LIVRAISON_IMPOSSIBLE
//                                                                                            ]
//                                                                                     }
//                                                                              ]
//                                                                       }}
//                                                                />
//                                                         </CCardBody>
//                                                  </CCard>
//                                           </CCol>

//                                           <CCol xs={6}>
//                                                  <CCard className="mb-4">
//                                                         <CCardHeader>Les pourcentages principaux des états des colis </CCardHeader>
//                                                         <CCardBody>
//                                                                <CChartPie
//                                                                       data={{
//                                                                              labels: ['Terminé avec succès', 'En cours', 'Livraison impossible'],
//                                                                              datasets: [
//                                                                                     {
//                                                                                            data: [
//                                                                                                   localData?.percentageOrderStatus.finished_successfully,
//                                                                                                   localData?.percentageOrderStatus.in_progress,
//                                                                                                   localData?.percentageOrderStatus.LIVRAISON_IMPOSSIBLE
//                                                                                            ],
//                                                                                            backgroundColor: ['#41B883', '#00D8FF', '#E46651'],
//                                                                                            hoverBackgroundColor: ['#41B883', '#00D8FF', '#E46651']
//                                                                                     }
//                                                                              ]
//                                                                       }}
//                                                                />
//                                                         </CCardBody>
//                                                  </CCard>
//                                           </CCol>
//                                    </CRow>{' '}
//                             </>
//                      )}
//                      <CRow>
//                             <CCol xs={12}>
//                                    <CCard className="mb-4">
//                                           <CCardHeader>Le volume des colis par année</CCardHeader>
//                                           <CCardBody>
//                                                  <CChartBar
//                                                         data={{
//                                                                labels: Object.keys(localData?.averageWeightOrVolumePerOrder),
//                                                                datasets: [
//                                                                       {
//                                                                              label: 'Volume',
//                                                                              backgroundColor: '#f87979',
//                                                                              data: Object.keys(localData?.averageWeightOrVolumePerOrder).map(key => localData?.averageWeightOrVolumePerOrder[key])
//                                                                       }
//                                                                ]
//                                                         }}
//                                                         labels="year"
//                                                  />
//                                           </CCardBody>
//                                    </CCard>
//                             </CCol>
//                      </CRow>
//                      {/* done  */}
//                      <CCard className="mb-4">
//                             <CCardBody>
//                                    <CRow>
//                                           <CCol sm={5}>
//                                                  <h4 id="Failed orders by status" className="card-title mb-0">
//                                                         Les commandes échouées par status
//                                                  </h4>
//                                           </CCol>
//                                           <CCol sm={7} className="d-none d-md-block">
//                                                  <CButton color="primary" className="float-end">
//                                                         <CIcon icon={cilCloudDownload} />
//                                                  </CButton>
//                                                  <CButtonGroup className="float-end me-3">
//                                                         {['Day', 'Month', 'Year'].map(value => (
//                                                                <CButton color="outline-secondary" key={value} className="mx-0" active={value === 'Month'}>
//                                                                       {value}
//                                                                </CButton>
//                                                         ))}
//                                                  </CButtonGroup>
//                                           </CCol>
//                                    </CRow>

//                                    {console.log(
//                                           localData?.fetchOrdersByTechnicalIssues[2024].map(item => {
//                                                  let counts = 0;
//                                                  item.data.map(elm => (counts += elm.status_count));

//                                                  return counts;
//                                           })
//                                    )}
//                                    <CChartLine
//                                           data={{
//                                                  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

//                                                  datasets: [
//                                                         {
//                                                                label: '2022 issues',
//                                                                backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
//                                                                borderColor: getStyle('--cui-info'),
//                                                                pointHoverBackgroundColor: getStyle('--cui-info'),
//                                                                borderWidth: 2,
//                                                                data: localData?.fetchOrdersByTechnicalIssues[2022].map(pickIssuesData)
//                                                         },
//                                                         {
//                                                                label: '2023 issues',
//                                                                backgroundColor: 'transparent',
//                                                                borderColor: getStyle('--cui-success'),
//                                                                pointHoverBackgroundColor: getStyle('--cui-success'),
//                                                                borderWidth: 2,
//                                                                data: localData?.fetchOrdersByTechnicalIssues[2023].map(pickIssuesData)
//                                                         },
//                                                         {
//                                                                label: '2024 issues',
//                                                                backgroundColor: 'transparent',
//                                                                borderColor: getStyle('--cui-danger'),
//                                                                pointHoverBackgroundColor: getStyle('--cui-danger'),
//                                                                borderWidth: 1,
//                                                                borderDash: [8, 5],
//                                                                data: localData?.fetchOrdersByTechnicalIssues[2024].map(pickIssuesData)
//                                                         }
//                                                  ]
//                                           }}
//                                    />
//                             </CCardBody>
//                             <CCardFooter>
//                                    <CRow xs={{ cols: 1 }} md={{ cols: 5 }} className="text-center">
//                                           {Object.keys(countAllIssuesByStatus(localData?.fetchOrdersByTechnicalIssues)).map((key, index) => {
//                                                  let elements = countAllIssuesByStatus(localData?.fetchOrdersByTechnicalIssues);
//                                                  let totalCount = Object.values(elements).reduce((acc, curr) => acc + curr, 0);
//                                                  let percentage = ((elements[key] / totalCount) * 100).toFixed(2); // Calculate percentage
//                                                  return (
//                                                         <CCol className="mb-sm-2 mb-0" key={index}>
//                                                                <div className="text-medium-emphasis">{key}</div>
//                                                                <strong>
//                                                                       {elements[key]} ({percentage}%)
//                                                                </strong>{' '}
//                                                                {/* Include percentage here */}
//                                                                <CProgress thin className="mt-2" color={randomColors[index]} value={elements[key]} />
//                                                         </CCol>
//                                                  );
//                                           })}
//                                    </CRow>
//                             </CCardFooter>
//                      </CCard>

//                      <CRow>
//                             <CCol xs>
//                                    <CCard className="mb-4">
//                                           <CCardHeader>packageSources</CCardHeader>
//                                           <CCardBody>
//                                                  <CRow>
//                                                         <CCol xs={12} md={6} xl={6}>
//                                                                <CRow>
//                                                                       {localData.packageSources.slice(0, 2).map((item, index) => (
//                                                                              <CCol sm={6} key={index}>
//                                                                                     <div className={`border-start border-start-4 border-start-${randomColors[index]} py-1 px-3 py-1 px-3 mb-3`}>
//                                                                                            <div className="text-medium-emphasis small">{item.source}</div>
//                                                                                            <div className="fs-5 fw-semibold">{item.package_count}</div>
//                                                                                     </div>
//                                                                              </CCol>
//                                                                       ))}
//                                                                </CRow>
//                                                         </CCol>
//                                                         <CCol xs={12} md={6} xl={6}>
//                                                                <CRow>
//                                                                       {localData.packageSources.slice(2, 4).map((item, index) => (
//                                                                              <CCol sm={6} key={index}>
//                                                                                     <div className={`border-start border-start-4 border-start-${randomColors[index]} py-1 px-3 py-1 px-3 mb-3`}>
//                                                                                            <div className="text-medium-emphasis small">{item.source}</div>
//                                                                                            <div className="fs-5 fw-semibold">{item.package_count}</div>
//                                                                                     </div>
//                                                                              </CCol>
//                                                                       ))}
//                                                                </CRow>
//                                                         </CCol>
//                                                  </CRow>

//                                                  <CTable align="middle" className="mb-0 border" hover responsive>
//                                                         <CTableHead color="light">
//                                                                <CTableRow>
//                                                                       <CTableHeaderCell>channel name</CTableHeaderCell>
//                                                                       <CTableHeaderCell className="text-left">order count</CTableHeaderCell>
//                                                                       <CTableHeaderCell className="text-right"></CTableHeaderCell>
//                                                                       <CTableHeaderCell className="text-right">last_package_created_at</CTableHeaderCell>
//                                                                </CTableRow>
//                                                         </CTableHead>
//                                                         <CTableBody>
//                                                                {localData?.topOrdersExternalCodes?.map((item, index) => (
//                                                                       <CTableRow v-for="item in tableItems" key={index}>
//                                                                              <CTableDataCell>
//                                                                                     <div>{item.sales_channel}</div>
//                                                                              </CTableDataCell>
//                                                                              {}
//                                                                              <CTableDataCell className="text-left">
//                                                                                     <strong>{item.order_count}</strong>
//                                                                              </CTableDataCell>
//                                                                              <CTableDataCell className="text-right"></CTableDataCell>
//                                                                              <CTableDataCell className="text-right">
//                                                                                     <div className="small text-medium-emphasis">Last package</div>
//                                                                                     <strong>{item.last_package_created_at}</strong>
//                                                                              </CTableDataCell>
//                                                                       </CTableRow>
//                                                                ))}
//                                                         </CTableBody>
//                                                  </CTable>
//                                           </CCardBody>
//                                    </CCard>
//                             </CCol>
//                      </CRow>
//               </CContainer>
//        );
// };

// export default GlobalDashBoard;
