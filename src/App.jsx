import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Projects from './pages/projects';
import Education from './pages/education';
 
const App = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
         </Routes>
      </>
   );
};
 
export default App;