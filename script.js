document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById('startBtn');
  const bgMusic = document.getElementById('bgMusic');
  
  const state1 = document.getElementById('state1');
  const state2 = document.getElementById('state2');
  const state3 = document.getElementById('state3');
  
  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');
  
  const bouquet = document.getElementById('bouquet');
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const letterContent = document.getElementById('letterContent');
  
  // Create Particles for State 2
  createParticles();

  // On Load: Confetti from bottom corners
  setTimeout(() => {
    fireConfetti();
  }, 500);

  // Transition 1 -> 2
  startBtn.addEventListener('click', () => {
    // Attempt to play audio
    bgMusic.play().catch(e => console.log("Audio play failed (User interaction needed or file missing):", e));
    
    state1.classList.remove('active');
    setTimeout(() => {
      state2.classList.add('active');
    }, 1500);
  });

  // Transition 2 -> 3
  flame.addEventListener('click', () => {
    // Blow out animation
    flame.style.opacity = '0';
    setTimeout(() => {
        flame.classList.add('hidden');
        smoke.classList.remove('hidden');
        smoke.classList.add('active');
    }, 300);

    // Transition to state 3
    setTimeout(() => {
      state2.classList.remove('active');
      setTimeout(() => {
        state3.classList.add('active');
        // Trigger State 3 animations
        bouquet.classList.add('animate-in');
        setTimeout(() => {
          envelopeWrapper.classList.add('animate-in');
        }, 1000);
      }, 1500);
    }, 2000);
  });

  // State 3: Open Letter
  envelopeWrapper.addEventListener('click', () => {
    if (!envelopeWrapper.classList.contains('opened')) {
      envelopeWrapper.classList.add('opened');
      letterContent.classList.remove('hidden');
    }
  });

  function fireConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      // launch a few confetti from the left edge
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 1 },
        colors: ['#ff1493', '#ff69b4', '#ffffff', '#ffb6c1']
      });
      // and launch a few from the right edge
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 1 },
        colors: ['#ff1493', '#ff69b4', '#ffffff', '#ffb6c1']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }

  function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 60; i++) {
      let particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random properties
      let size = Math.random() * 4 + 2; // 2px to 6px
      let left = Math.random() * 100; // 0% to 100%
      let delay = Math.random() * 5; // 0s to 5s
      let duration = Math.random() * 10 + 8; // 8s to 18s
      
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = left + '%';
      particle.style.animationDelay = delay + 's';
      particle.style.animationDuration = duration + 's';
      
      container.appendChild(particle);
    }
  }
});
