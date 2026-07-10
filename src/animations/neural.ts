export const circuitDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  },
};

export const nodePulse = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

export const signalTravel = {
  hidden: { offsetDistance: '0%', opacity: 0 },
  visible: {
    offsetDistance: '100%',
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};
