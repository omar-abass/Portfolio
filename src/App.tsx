import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@utils/routes';
import { Navbar } from '@components/layout/Navbar';
import { Footer } from '@components/layout/Footer';
import { Cursor } from '@components/common/Cursor';
import { Loader } from '@components/common/Loader';
import { NeuralSynapseBackground } from '@components/common';
import Home from '@pages/Home';
import NotFound from '@pages/NotFound';

const App = () => {
  return (
    <>
      <NeuralSynapseBackground />
      <Loader />
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
