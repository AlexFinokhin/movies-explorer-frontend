import { useState, useEffect } from "react";
import {
  MOVIES_COUNT_12,
  MOVIES_COUNT_8,
  MOVIES_COUNT_5,
  MOVIES_BREAKPOINT_1279,
  MOVIES_BREAKPOINT_1223,
  MOVIES_BREAKPOINT_766,
  MOVIES_BREAKPOINT_700,
  MOVIES_BREAKPOINT_643,
  MOVIES_BREAKPOINT_642,
  MOVIES_BREAKPOINT_0,
} from "../utils/constants";

export const useVisibleCount = () => {
  const [visibleMovies, setVisibleMovies] = useState(0);

  const visibleCount = () => {
    const width = window.innerWidth;

    const breakpoints = [
      { width: MOVIES_BREAKPOINT_1279, count: MOVIES_COUNT_12 },
      { width: MOVIES_BREAKPOINT_1223, count: MOVIES_COUNT_8 },
      { width: MOVIES_BREAKPOINT_766, count: MOVIES_COUNT_8 },
      { width: MOVIES_BREAKPOINT_700, count: MOVIES_COUNT_5 },
      { width: MOVIES_BREAKPOINT_643, count: MOVIES_COUNT_8 },
      { width: MOVIES_BREAKPOINT_642, count: MOVIES_COUNT_5 },
      { width: MOVIES_BREAKPOINT_0, count: MOVIES_COUNT_5 },
    ];

    const { count } = breakpoints.find(
      (breakpoint) => width >= breakpoint.width
    );

    return count;
  };

  const handleResize = () => {
    setVisibleMovies(visibleCount());
  };

  let resizeTimer;

  const debouncedHandleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(handleResize, 1000);
  };

  useEffect(() => {
    setVisibleMovies(visibleCount());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedHandleResize);
    };
    // eslint-disable-next-line
  }, []);

  return [visibleMovies, setVisibleMovies];
};
