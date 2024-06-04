import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './component/Dashboard';
import House1Plan from './page/House1Plan';
import House15Plan from './page/House15Plan';
import Forsage3 from './page/Forsage3';
import Landingpage from './Landingpage/Landingpage';
import Registration from './component/Registration';
import Statstable from './component/Statstable';
import Partnerstable from './component/Partnerstable';
import SlotDetail from './DetailPages/SlotDetail';
import House5Plan from './page/House5Plan'
import Tranfer from './page/Tranfer';
const App = () => {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/:id" element={<Landingpage />} />
          <Route path="/house-1-plan" element={<House1Plan />} />
          <Route path="/house-5-plan" element={<House5Plan />} />
          <Route path="/house-15-plan" element={<House15Plan />} />


          <Route path="/slot-20" element={<SlotDetail />} />
          <Route path="/slot-40" element={<SlotDetail />} />
          <Route path="/slot-100" element={<SlotDetail />} />
          <Route path="/slot-200" element={<SlotDetail />} />
          <Route path="/slot-500" element={<SlotDetail />} />
          <Route path="/slot-1000" element={<SlotDetail />} />
          <Route path="/slot-2000" element={<SlotDetail />} />
          <Route path="/slot-4000" element={<SlotDetail />} />

          <Route path="/Preview200" element={<Forsage3 />} />

          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/stats" element={<Partnerstable />} />
          <Route path="/upgrade" element={<Tranfer />} />
          <Route path="/partners" element={<Statstable />} />
        </Routes>
      </React.Fragment>
    </div>
  )
}

export default App
