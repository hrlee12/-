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
import Drawing from '@/pages/drawing';
import AlonePreview from '@/pages/preview/alonePreview';
import GroupPreview from '@/pages/preview/groupPreview';
import MyCatSkin from '@/pages/cat/skin';
import Chatting from '@/pages/chatting';
// import ScreenShare from '@/pages/screenshare';

const RouterComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path={'/'} element={<Landing />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/example'} element={<Example />} />
        <Route path={'/cat'} element={<Cat />} />
        <Route path={'/signup'} element={<SignUpPage />} />
        <Route path={'/group'} element={<GroupPage />} />
        <Route path={'/groupSetting/:groupId'} element={<GroupSetting />} />
        <Route path={'/makeGroup'} element={<MakeGroupPage />} />
        <Route path={'/groupInfo/:groupId'} element={<GroupInfoPage />} />
        <Route path={'/cat'} element={<MyCat />} />
        {/*<Route path={'/screenshare'} element={<ScreenShare />} />*/}
        <Route path={'/catInfo'} element={<MyCatInfo />} />
        <Route path={'/catSetting'} element={<MyCatSetting />} />
        <Route path={'/catSkin'} element={<MyCatSkin />} />
        <Route path={'/drawing/:groupId'} element={<Drawing />} />
        <Route path={'/previewAlone'} element={<AlonePreview />} />
        <Route path={'/previewTwo'} element={<GroupPreview />} />
        <Route path={'/chatting/:groupId'} element={<Chatting />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterComponent;
