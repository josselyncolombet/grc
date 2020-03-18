import React from 'react';
import './App.css';
import Header from './components/header/Header'
import Breadcrumb from './components/breadcrumb/Breadcrumb'
import Students from './components/students/Students'
import logo from './img/logo.png';

function App() {
  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <div className="row-fluid" style={{ display: 'flex', flexDirection: 'row' }}>
        <Header />
        <Students />
      </div>
    </div>
  );
}

export default App;
