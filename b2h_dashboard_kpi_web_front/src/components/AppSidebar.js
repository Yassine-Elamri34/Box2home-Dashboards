import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react';

import { AppSidebarNav } from './AppSidebarNav';

import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
//import navigation from '../_nav'
import navigation from '../nav';

const AppSidebar = () => {
       const dispatch = useDispatch();
       const unfoldable = useSelector(state => state.sidebarUnfoldable);
       const sidebarShow = useSelector(state => state.sidebarShow);

       return (
              <CSidebar
                     position="fixed"
                     unfoldable={unfoldable}
                     visible={sidebarShow}
                     onVisibleChange={visible => {
                            dispatch({ type: 'set', sidebarShow: visible });
                     }}
              >
                     <CSidebarNav>
                            <AppSidebarNav items={navigation} />
                     </CSidebarNav>
                     <CSidebarToggler className="d-none d-lg-flex" onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })} />
              </CSidebar>
       );
};

export default React.memo(AppSidebar);
