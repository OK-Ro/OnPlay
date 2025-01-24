import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./componenets/Navbar";
import MainSection from "./componenets/MainSection";
import WhyChooseUsSection from "./componenets/WhyChooseUsSection";
import FeaturedProductsSection from "./FeaturedProductsSection";
import TestimonialsSection from "./testimonies";
import OrderingProcessSection from "./componenets/OrderingProcessSection";
import FooterSection from "./FooterSection";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <MainSection />
        <WhyChooseUsSection />
        <FeaturedProductsSection />
        <TestimonialsSection />
        <OrderingProcessSection />
        <FooterSection />
      </div>
    </Router>
  );
}

export default App;
