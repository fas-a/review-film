import React from 'react';
import Carousel from './components/Carousel';
import SweepCard from './components/SweepCard';
import Filter from './components/Filter';

function LandingPage() {
  return (
    <div>
      <Carousel />
      <SweepCard title="Most View"/>
      <SweepCard title="Most Popular"/>
      <div class="w-full px-4 md:px-20 xl:px-40 grid mt-4">
        <Filter />
      </div>
    </div>
  );
}

export default LandingPage;
