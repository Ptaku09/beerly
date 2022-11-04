import { useEffect, useState } from 'react';

export enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
}

const useScroll = (threshold: number = 100) => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(ScrollDirection.DOWN);

  useEffect(() => {
    let previousScrollYPosition = window.scrollY;

    const isScrolledMoreThanThreshold = (currentScrollYPosition: number) => {
      return Math.abs(currentScrollYPosition - previousScrollYPosition) > threshold;
    };

    const isScrollingUp = (currentScrollYPosition: number) =>
      currentScrollYPosition > previousScrollYPosition &&
      !(previousScrollYPosition > 0 && currentScrollYPosition === 0) &&
      !(currentScrollYPosition > 0 && previousScrollYPosition === 0);

    const updateScrollDirection = () => {
      const currentScrollYPosition = window.scrollY;

      if (isScrolledMoreThanThreshold(currentScrollYPosition)) {
        setScrollDirection(isScrollingUp(currentScrollYPosition) ? ScrollDirection.UP : ScrollDirection.DOWN);
        previousScrollYPosition = currentScrollYPosition > 0 ? currentScrollYPosition : 0;
      }
    };

    const onScroll = () => {
      window.requestAnimationFrame(updateScrollDirection);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return {
    scrollDirection,
    scrollToTop,
  };
};

export default useScroll;
