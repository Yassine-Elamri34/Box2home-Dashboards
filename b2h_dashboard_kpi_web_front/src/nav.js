/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import CIcon from '@coreui/icons-react';
import { cilBarChart, cilPeople, cilSpeedometer, cilUserFollow, cilUserPlus, cilContact, cidContact } from '@coreui/icons';
import { CNavItem, CNavTitle } from '@coreui/react';

export default [
       {
              component: CNavItem,
              name: 'Package Tracking',
              to: '/dashboard',
              icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />
       },

       {
              component: CNavTitle,
              name: 'User Management'
       },
       {
              component: CNavItem,
              name: 'User List',
              to: '/users/list',
              icon: <CIcon icon={cilPeople} customClassName="nav-icon" />
       },
       {
              component: CNavItem,
              name: 'Add User',
              to: '/users/add',
              icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />
       },

       {
              component: CNavTitle,
              name: 'Client Management'
       },
       {
              component: CNavItem,
              name: 'Customer List',
              to: '/client/list',
              icon: <CIcon icon={cilPeople} customClassName="nav-icon" />
       },
       {
              component: CNavItem,
              name: 'Add Customer',
              to: '/client/add',
              icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />
       },

       {
              component: CNavTitle,

              name: 'Package by Customer'
       },

       {
              component: CNavItem,
              name: 'AUTOVER',
              to: '/client/sales-channel/AUTOVER',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />
       },

       {
              component: CNavItem,
              name: 'Centiro',
              to: '/client/sales-channel/centiro',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />
       },

       {
              component: CNavItem,
              name: 'EDI_CAFOM',
              to: '/client/sales-channel/EDI_CAFOM',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />
       },
       {
              component: CNavItem,
              name: 'EMMA',
              to: '/client/sales-channel/EMMA',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />
       },

       {
              component: CNavItem,
              name: 'MDM',
              to: '/client/sales-channel/MDM',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />
       },
       {
              component: CNavItem,
              name: 'Melting_point',
              to: '/client/sales-channel/melting_point',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />
       },
       {
              component: CNavItem,
              name: 'SCHMIDT',
              to: '/client/sales-channel/SCHMIDT',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" />
       },
       {
              component: CNavItem,
              name: 'PANTOS',
              to: '/client/sales-channel/PANTOS',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" /> //
       },
       {
              component: CNavItem,
              name: 'MONOPRIX',
              to: '/client/sales-channel/MONOPRIX',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" /> //
       },
       {
              component: CNavItem,
              name: 'FURNIFIED',
              to: '/client/sales-channel/FURNIFIED',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" /> //
       },
       {
              component: CNavItem,
              name: 'EUROMATIC',
              to: '/client/sales-channel/EUROMATIC',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" /> //
       },
       {
              component: CNavItem,
              name: 'Fournier',
              to: '/client/sales-channel/fournier',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" /> //
       },
       {
              component: CNavItem,
              name: 'CSV_GAMMVERT',
              to: '/client/sales-channel/CSV_GAMMVERT',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" /> //
       },
       {
              component: CNavItem,
              name: 'CAFOM',
              to: '/client/sales-channel/CAFOM',
              icon: <CIcon icon={cilContact} customClassName="nav-icon" /> //
       }
];
