import { Routes, Route, HashRouter } from 'react-router-dom';

import Landing from '@/pages/landing/index';
import Example from '@/pages/expample';
import Cat from '@/pages/cat';
import GroupPage from '@/pages/group';
import GroupInfoPage from '@/pages/group/info';

const RouterComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/example'} element={<Example />} />
        <Route path={'/cat'} element={<Cat />} />
        <Route path={'/group'} element={<GroupPage />} />
        <Route path={'/groupInfo'} element={<GroupInfoPage />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterComponent;
