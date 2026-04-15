import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/shared/header'
import Listing from './components/listing/page'
import Form from './components/form'

function App() {

  return (
    <Router>
      <Header />
      <main className='mt-17.5'>
        <Routes>
          <Route path="/" element={<Listing />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
