import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import Pricing from '../../Pricing';

function Home() {
    console.log(homeObjOne);
  return (
    <>
    <section id='home'>
        <HeroSection {...homeObjOne} />
    </section>
    <section id='services'>
        <HeroSection {...homeObjThree} />
    </section>
    <section id='products'>
        <HeroSection {...homeObjTwo} />
    </section>
    <section id='pricing'>
        <Pricing />
    </section>
    <section id='signup'>
        <HeroSection {...homeObjFour} />
    </section>
    </>
  );
}

export default Home;
