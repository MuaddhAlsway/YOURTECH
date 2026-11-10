
import { lazy, Suspense } from 'react';
import Hero from '../components/home/Hero';

const HomeBelowFold = lazy(() => import('./HomeBelowFold'));

export default function Home() {
  return (
    <>
      <Hero />

      <Suspense fallback={<div className="home__below-fold home__below-fold--loading" aria-hidden="true" />}>
        <HomeBelowFold />
      </Suspense>
    </>
  );
}
