document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById('startBtn');
  const bgMusic = document.getElementById('bgMusic');
  
  const state1 = document.getElementById('state1');
  const state2 = document.getElementById('state2');
  const state3 = document.getElementById('state3');
  
  const flame = document.getElementById('flame');
  const smoke = document.getElementById('smoke');
  
  const bouquet = document.getElementById('bouquet');
  const bouquetText = document.getElementById('bouquetText');
  const greetingCard = document.getElementById('greetingCard');
  
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
        bouquetText.classList.remove('hidden');
        setTimeout(() => bouquetText.classList.add('visible'), 500);

        // Card flies in after 4 seconds
        setTimeout(() => {
          greetingCard.classList.remove('hidden');
          setTimeout(() => greetingCard.classList.add('fly-in'), 50);
        }, 4000);
      }, 1500);
    }, 2000);
  });

  // State 3: Open Greeting Card
  greetingCard.addEventListener('click', () => {
    if (!greetingCard.classList.contains('opened')) {
      greetingCard.classList.add('opened');
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
    const colors = ['#ff1493', '#00bcd4', '#ffeb3b', '#4caf50', '#ff5722', '#9c27b0'];
    for (let i = 0; i < 35; i++) {
      let balloon = document.createElement('div');
      balloon.classList.add('balloon');
      
      let left = Math.random() * 100;
      let delay = Math.random() * 5;
      let duration = Math.random() * 8 + 6;
      let color = colors[Math.floor(Math.random() * colors.length)];
      
      balloon.style.left = left + '%';
      balloon.style.animationDelay = delay + 's';
      balloon.style.animationDuration = duration + 's';
      balloon.style.setProperty('--balloon-color', color);
      
      container.appendChild(balloon);
    }
  }
});
