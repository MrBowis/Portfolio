import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';
import Education from './pages/education';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/portfolio" element={<Dashboard />} />
            <Route path="/portfolio/projects" element={<Projects />} />
            <Route path="/portfolio/education" element={<Education />} />
         </Routes>
      </>
   );
};
 
export default App;