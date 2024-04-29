import { Routes, Route, HashRouter } from 'react-router-dom';

import Landing from '@/pages/landing/index';
import Example from '@/pages/expample';
import Cat from '@/pages/cat';
import GroupPage from '@/pages/group';
import GroupSetting from '@/pages/group/setting';
import MakeGroupPage from '@/pages/group/makeGroup';

const RouterComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/example'} element={<Example />} />
        <Route path={'/cat'} element={<Cat />} />
        <Route path={'/group'} element={<GroupPage />} />
        <Route path={'/groupSetting'} element={<GroupSetting />} />
        <Route path={'/makeGroup'} element={<MakeGroupPage />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterComponent;
