import { cilEyedropper } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton } from '@coreui/react';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientList() {
       const navigation = useNavigate();
       const [rowData, setRowData] = useState([]);

       const defaultColDef = useMemo(
              () => ({
                     filter: true,
                     floatingFilter: true
              }),
              []
       );

       const fetchClientList = async () => {
              try {
                     var { data } = await axios.get(
  'https://box2home-dashboards-2.onrender.com/api/v1/clients/all'
);
                     setRowData(data.data?.reverse());
              } catch (error) {
                     console.log(error);
              }
       };

       useEffect(() => {
              fetchClientList();
       }, []);

       // eslint-disable-next-line react/prop-types
       const ButtonActionRenderer = data => navigation('/client/edit/' + data._id);

       return (
              <div className="users-list ag-theme-quartz">
                     <AgGridReact
                            rowData={rowData}
                            columnDefs={[
                                   { field: 'clientName', flex: 1, minWidth: 100 },
                                   { field: 'contacts.email', flex: 1, minWidth: 100 },
                                   { field: 'contacts.phoneNumber', flex: 1, minWidth: 100, filter: false, sortable: false },
                                   {
                                          headerName: 'Action',
                                          field: 'action',
                                          width: 100,
                                          cellRenderer: ({ data }) => (
                                                 <CButton color="primary" style={{ color: 'white' }} onClick={() => ButtonActionRenderer(data)}>
                                                        View <CIcon icon={cilEyedropper} />
                                                 </CButton>
                                          )
                                   }
                            ]}
                            ensureDomOrder={true}
                            defaultColDef={defaultColDef}
                            rowSelection="multiple"
                            suppressRowClickSelection={true}
                            pagination={true}
                            paginationPageSize={100}
                            paginationPageSizeSelector={[10, 20, 100]}
                            domLayout="autoHeight"
                     />
              </div>
       );
}
