import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

export default function Users() {
       const [rowData, setRowData] = useState([]);

       const defaultColDef = useMemo(() => {
              return {
                     filter: 'agTextColumnFilter',
                     floatingFilter: true
              };
       }, []);

       const fetchListUsers = async () => {
              try {
                     const { data } = await axios.get('http://localhost:4000/api/v1/users/list');
                     setRowData(data.data); // Set the fetched data to the rowData state
              } catch (error) {
                     console.log(error);
              }
       };

       useEffect(() => {
              fetchListUsers();
       }, []);

       return (
              <div className="users-list ag-theme-quartz">
                     <AgGridReact
                            rowData={rowData}
                            columnDefs={[
                                   { field: 'username', flex: 1, minWidth: 100 }, // Adjusted column definitions
                                   { field: 'email', flex: 1, minWidth: 100 },
                                   { field: 'role', flex: 1, minWidth: 100 }
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
