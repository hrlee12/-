import { Routes, Route, HashRouter } from 'react-router-dom';

import Landing from '@/pages/landing/index';
import Example from '@/pages/expample';
import Cat from '@/pages/cat';

const RouterComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/example' element={<Example />} />
        <Route path='/cat' element={<Cat />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterComponent;
