import React from 'react';
import { CFooter } from '@coreui/react';

const AppFooter = () => {
       return (
              <CFooter>
                     <div>
                            <a href="https://www.box2home.fr/" target="_blank" rel="noopener noreferrer">
                                   Box2home
                            </a>
                            <span className="ms-1">&copy;Box2Home 2016 - 2024, Inc. All Rights Reserved.</span>
                     </div>
              </CFooter>
       );
};

export default React.memo(AppFooter);
