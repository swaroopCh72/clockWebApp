const wrap = document.getElementById('wrap');
const sky = document.getElementById('sky');
const orb = document.getElementById('orb');
const greetingEl = document.getElementById('greeting');
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const hourStat = document.getElementById('hourStat');
const minStat = document.getElementById('minStat');
const secStat = document.getElementById('secStat');

function pad(n) {
  return String(n).padStart(2, '0');
}

const SUN_SVG = `
  <svg viewBox="0 0 64 64" width="88" height="88">
    <defs>
      <radialGradient id="g1" cx="45%" cy="35%">
        <stop offset="0%" stop-color="#FFF59D"/>
        <stop offset="85%" stop-color="#FFB74D"/>
      </radialGradient>
    </defs>
    <circle cx="32" cy="28" r="14" fill="url(#g1)"/>
  </svg>
`;

const MOON_SVG = `
  <svg viewBox="0 0 64 64" width="88" height="88">
    <defs>
      <linearGradient id="m1" x1="0" x2="1">
        <stop offset="0%" stop-color="#F8F9FA"/>
        <stop offset="100%" stop-color="#E6EEF6"/>
      </linearGradient>
    </defs>
    <path d="M40 16c-9 0-16 7-16 16 
             0 9 7 16 16 16 
             9 0 16-7 16-16 
             0-9-7-16-16-16z" 
          fill="url(#m1)"/>
  </svg>
`;

function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const hoursDec = hours + minutes / 60 + seconds / 3600;

  // Greeting
  let greeting = "Hello";
  if (hours >= 5 && hours < 12) greeting = "Good morning";
  else if (hours >= 12 && hours < 17) greeting = "Good afternoon";
  else if (hours >= 17 && hours < 21) greeting = "Good evening";
  else greeting = "Good night";

  greetingEl.textContent = greeting;

  // Time + Date
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = ((hours + 11) % 12) + 1;

  timeEl.textContent = `${pad(hour12)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;

  dateEl.textContent = now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Stats
  hourStat.textContent = `${hours} h`;
  minStat.textContent = `${minutes} m`;
  secStat.textContent = `${seconds} s`;

  // Background sky
  const dayStart = 6;
  const dayEnd = 18;

  let dayFactor = Math.max(0, Math.min(1, (hoursDec - dayStart) / (dayEnd - dayStart)));
  dayFactor = Math.sin(dayFactor * Math.PI / 2);

  const dayTop = `rgba(135,206,235,${0.9 * dayFactor + 0.05})`;
  const nightTop = `rgba(6,10,35,${0.75 * (1 - dayFactor) + 0.05})`;

  sky.style.background = `linear-gradient(180deg, ${dayTop}, ${nightTop})`;

  // Orb movement
  const across = (hoursDec % 24) / 24;
  const arc = Math.sin(across * Math.PI);

  const skyHeight = 320;
  const orbTop = 12 + (1 - arc) * (skyHeight * 0.55);

  orb.style.left = `calc(${across * 100}% - 44px)`;
  orb.style.top = `${orbTop}px`;

  // Sun or Moon
  const isDay = hours >= dayStart && hours < dayEnd;

  orb.innerHTML = isDay ? SUN_SVG : MOON_SVG;
  orb.style.opacity = isDay ? 0.95 : 0.75;

  setTimeout(updateClock, 1000 - (now.getMilliseconds() % 1000));
}

document.addEventListener("DOMContentLoaded", updateClock);
