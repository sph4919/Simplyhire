particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#1e90ff"
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.3,
      random: true
    },
    size: {
      value: 4,
      random: true
    },
    move: {
      enable: true,
      speed: 1.5
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      },
      resize: true
    }
  },
  retina_detect: true
});
