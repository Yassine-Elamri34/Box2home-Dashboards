import React from 'react';
import Users from './mainProject/layouts/users';
import AddUser from './mainProject/layouts/AddUser';
import ClientList from './mainProject/layouts/clientList';
import AddClient from './mainProject/layouts/AddClient';
import EditClient from './mainProject/layouts/EditClient';
import GlobalDashBoard from './mainProject/layouts/GlobalDashBoard';
import SalesChannelsKPI from './mainProject/layouts/SalesChannelsKPI';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Colors = React.lazy(() => import('./views/theme/colors/Colors'));
const Typography = React.lazy(() => import('./views/theme/typography/Typography'));

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'));
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'));
// const Cards = React.lazy(() => import('./views/base/cards/Cards'));
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'));
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'));
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'));
const Navs = React.lazy(() => import('./views/base/navs/Navs'));
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'));
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'));
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'));
const Progress = React.lazy(() => import('./views/base/progress/Progress'));
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'));
const Tables = React.lazy(() => import('./views/base/tables/Tables'));
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'));

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'));
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'));
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'));

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'));
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'));
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'));
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'));
const Layout = React.lazy(() => import('./views/forms/layout/Layout'));
const Range = React.lazy(() => import('./views/forms/range/Range'));
const Select = React.lazy(() => import('./views/forms/select/Select'));
const Validation = React.lazy(() => import('./views/forms/validation/Validation'));

const Charts = React.lazy(() => import('./views/charts/Charts'));

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/icons/flags/Flags'));
const Brands = React.lazy(() => import('./views/icons/brands/Brands'));

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'));
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'));
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'));
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'));

const Widgets = React.lazy(() => import('./views/widgets/Widgets'));

const routes = [
       /// New routes
       { path: '/dashboard', name: 'Dashboard', element: GlobalDashBoard },
       { path: '/users/list', name: 'User List', element: Users },
       { path: '/users/add', name: 'Add New User', element: AddUser },
       { path: '/client/list', name: 'Customer List', element: ClientList },
       { path: '/client/add', name: 'Add New Customer', element: AddClient },
       { path: '/client/sales-channel/:salesChannelKey', name: 'Details pour canal  de vente extern', element: SalesChannelsKPI },
       { path: '/client/edit/:id', name: 'Modifier un  client', element: EditClient }
];

export default routes;
