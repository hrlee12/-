import { Routes, Route, HashRouter } from 'react-router-dom';

import Landing from '../pages/landing/index';
import Example from '../pages/expample';

const RouterComponent = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/example' element={<Example />} />
      </Routes>
    </HashRouter>
  );
};

export default RouterComponent;
