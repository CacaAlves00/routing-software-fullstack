import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MenuBar from './components/MenuBar'
import Search from './components/Search'
import locationIcon from './imgs/location.svg'
import './App.css'
import ImportFile from './components/ImportFile'
import { useState } from 'react'
import Welcome from './components/Welcome'
import About from './components/About'
import Deliveries from './components/Deliveries'
import Trucks from './components/Trucks'

// AJEITAR FONTE TEXTUAL

function App() {

  return (
    <div className="App">

      <Router>
        <MenuBar />

        <Routes>
          <Route exact path='' element=
            {
              // <>
              //   <header id='search-container'>

              //     <Search setDeliveries={setDeliveries} />
              //     <img src={locationIcon} alt='Location alt' />

              //   </header>

              //   <DeliveryTable data={deliveries}/>
              // </>
              <Welcome />
            } />

          <Route path='/list-deliveries' element={<Deliveries />} />

          <Route path='/list-trucks' element={<Trucks />} />
          

          <Route path='/import-file' element={<ImportFile />} />

          <Route path='/about' element={<About />} />

        </Routes>
      </Router>

    </div >
  )
}

export default App
