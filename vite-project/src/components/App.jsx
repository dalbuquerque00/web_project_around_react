import { useState } from 'react'
import Header from "./Header/header.jsx";
import Main from './Main/main.jsx';
import Footer from './Footer/footer.jsx';

function App() {
  return (
    <>
    <div className='page__content'> 
      <Header/>
      <Main/>
      <Footer/>
    </div>
    </>
  )
}

export default App
