const tmax_optionsGlobal = {
    repeatDelay: 0.65,
    yoyo: true
  };
  
  gsap.registerPlugin(CSSPlugin);
  
  const tl = gsap.timeline(tmax_optionsGlobal);
  const pathElements = document.querySelectorAll('svg *');
  const stagger_val = 0.0125;
  const duration = 0.75;
  
  pathElements.forEach((el) => {
    gsap.set(el, {
      x: `+=${getRandom(-500, 500)}`,
      y: `+=${getRandom(-500, 500)}`,
      rotation: `+=${getRandom(-720, 720)}`,
      scale: 0,
      opacity: 0
    });
  });
  
  const stagger_opts_to = {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotation: 0,
    ease: 'power4.inOut'
  };
  
  gsap.to(pathElements, {
    duration,
    ...stagger_opts_to,
    stagger: {
      each: stagger_val,
      onComplete: function () {
        tl.timeScale(1);
      }
    }
  });
  
  const svg = document.querySelector('svg');
  svg.addEventListener('mouseenter', function () {
    tl.timeScale(0.15);
  });
  
  svg.addEventListener('mouseleave', function () {
    tl.timeScale(1);
  });
  
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  