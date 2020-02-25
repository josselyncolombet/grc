import React from 'react';
import './App.css';
import Header from './components/header/Header'
import Breadcrumb from './components/breadcrumb/Breadcrumb'
import Students from './components/students/Students'
function App() {
  return (
    <div className="App">
      <Header /> 
      <Breadcrumb />
      <Students />
    </div>
  );
}

export default App;
