import React from 'react';
import './App.css';
import Header from './components/header/newHeader'
import Sidebar from './components/header/Header'
import Breadcrumb from './components/breadcrumb/Breadcrumb'
import Students from './components/students/Students'
import logo from './img/logo.png';

function App() {
  return (
    <div className="container-fluid" style={{ padding: 0 }}>
  
        <Header />
  
      <div className="row" style={{margin:0}}>
        <div className="col-12" style={{padding:0}}>
          <Students />
        </div>
      </div>


    </div >
  );
}

export default App;
