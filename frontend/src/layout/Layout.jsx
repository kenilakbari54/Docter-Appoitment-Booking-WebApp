import React from 'react';
import Header from '../component/Header/Header';
import Footer from '../component/Footer/Footer';
import Router from '../routes/Router';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
