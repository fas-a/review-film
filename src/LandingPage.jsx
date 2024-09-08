import React from 'react';
import Carousel from './components/Carousel';
import SweepCard from './components/SweepCard';

function LandingPage() {
  return (
    <div>
      <Carousel />
      <SweepCard title="Most View"/>
      <SweepCard title="Most Popular"/>
    </div>
  );
}

export default LandingPage;
