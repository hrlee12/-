import { Routes, Route, HashRouter } from 'react-router-dom';

import Landing from '@/pages/landing/index';
import Example from '@/pages/expample';
import Cat from '@/pages/cat';
import LoginPage from '@/pages/account/LoginPage';
import SignUpPage from '@/pages/account/SignUpPage';
import GroupPage from '@/pages/group';
import GroupSetting from '@/pages/group/setting';
import MakeGroupPage from '@/pages/group/makeGroup';
import GroupInfoPage from '@/pages/group/info';
import MyCatSetting from '@/pages/cat/Setting';
import MyCatInfo from '@/pages/cat/info';
import MyCat from '@/pages/cat';

const RouterComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/example'} element={<Example />} />
        <Route path={'/cat'} element={<Cat />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/signup'} element={<SignUpPage />} />
        <Route path={'/group'} element={<GroupPage />} />
        <Route path={'/groupSetting'} element={<GroupSetting />} />
        <Route path={'/makeGroup'} element={<MakeGroupPage />} />
        <Route path={'/groupInfo'} element={<GroupInfoPage />} />
        <Route path={'/cat'} element={<MyCat />} />
        {/*후에 여기 개인 id 바인딩을 고려해야함*/}
        <Route path={'/catInfo'} element={<MyCatInfo />} />
        <Route path={'/catSetting'} element={<MyCatSetting />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterComponent;
