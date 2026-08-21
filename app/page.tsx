"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type WeatherKind = "loading" | "clear" | "cloudy" | "fog" | "drizzle" | "rain" | "snow" | "storm";

type WeatherState = {
  kind: WeatherKind;
  label: string;
};

const weatherPreviews: Partial<Record<WeatherKind, WeatherState>> = {
  clear: { kind: "clear", label: "Clear skies" },
  cloudy: { kind: "cloudy", label: "Overcast" },
  fog: { kind: "fog", label: "Foggy" },
  drizzle: { kind: "drizzle", label: "Drizzling" },
  rain: { kind: "rain", label: "Raining" },
  snow: { kind: "snow", label: "Snowing" },
  storm: { kind: "storm", label: "Thunderstorms" },
};

function describeWeather(code: number, isDay: boolean): WeatherState {
  if (code === 0) return { kind: "clear", label: isDay ? "Clear skies" : "Clear night" };
  if (code === 1) return { kind: "clear", label: "Mostly clear" };
  if (code === 2) return { kind: "cloudy", label: "Partly cloudy" };
  if (code === 3) return { kind: "cloudy", label: "Overcast" };
  if (code === 45 || code === 48) return { kind: "fog", label: "Foggy" };
  if (code >= 51 && code <= 55) return { kind: "drizzle", label: "Drizzling" };
  if (code === 56 || code === 57) return { kind: "drizzle", label: "Freezing drizzle" };
  if (code === 61) return { kind: "rain", label: "Light rain" };
  if (code === 63) return { kind: "rain", label: "Raining" };
  if (code === 65) return { kind: "rain", label: "Heavy rain" };
  if (code === 66 || code === 67) return { kind: "rain", label: "Freezing rain" };
  if (code === 71) return { kind: "snow", label: "Light snow" };
  if (code === 73 || code === 77) return { kind: "snow", label: "Snowing" };
  if (code === 75) return { kind: "snow", label: "Heavy snow" };
  if (code === 80) return { kind: "rain", label: "Passing showers" };
  if (code === 81 || code === 82) return { kind: "rain", label: "Rain showers" };
  if (code === 85) return { kind: "snow", label: "Light snow showers" };
  if (code === 86) return { kind: "snow", label: "Heavy snow showers" };
  if (code === 95) return { kind: "storm", label: "Thunderstorms" };
  if (code === 96 || code === 99) return { kind: "storm", label: "Storms and hail" };
  return { kind: "cloudy", label: "Weather unavailable" };
}

function melbourneUtcOffset(date: Date) {
  const offset = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    timeZoneName: "shortOffset",
  }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value;

  return (offset ?? "GMT+10").replace("GMT", "UTC");
}

const placements = [
  {
    year: "2024",
    organisation: "BAE Systems",
    href: "https://www.baesystems.com/en-aus/",
    role: "Engineering work experience · Melbourne",
    copy: "Spent a week inside BAE Systems, sitting in on technical meetings and talks, then working with the team on practical problems.",
    points: ["Explored aerospace and satellite infrastructure", "Received a certificate of work experience"],
  },
  {
    year: "2023",
    organisation: "CSIRO",
    href: "https://www.csiro.au/en/",
    role: "Cyber security work experience",
    copy: "Spent a week with CSIRO's cyber security team, getting hands-on with application and systems security work.",
    points: ["Investigated unauthorised access incidents", "Explored measures for reducing cyber threats and damage"],
  },
] as const;

const community = [
  ["2020 — 2024", "Community festivals", "Sound, lighting and live-streaming operator · BHTCC & Ballarat Indian Association"],
  ["2020", "Clean Up Australia Day", "Community service · Ballarat Grammar"],
  ["2020 & 2024", "Food Is Free", "Community service · Ballarat Grammar / Clarendon College"],
  ["2025", "Salvation Army Wendouree", "Retail volunteer"],
  ["2025 — 2026", "Duke of Edinburgh Gold", "Participant"],
] as const;

const currentProjects = [
  {
    title: "Velo",
    note: "NFC products with customer profiles, smart tap routing and straightforward management tools behind them.",
    tags: ["Next.js", "NFC", "Supabase"],
  },
  {
    title: "Cramwise",
    note: "A study planner that turns deadlines and free time into a schedule you might actually stick to.",
    tags: ["TypeScript", "Scheduling", "Product design"],
  },
] as const;

const projects = [
  { title: "Fira", note: "A distributed Discord bot built around clustering, sharding and separate MongoDB stores.", tags: ["JavaScript", "MongoDB", "Discord.js"], href: "https://github.com/Aaryan-N/Fira" },
  { title: "NFC hacker card", note: "A two-layer PCB business card with NFC built straight into the board.", tags: ["NFC", "EasyEDA", "PCB"], href: "https://github.com/Aaryan-N/Aaryan_Hacker_Card" },
  { title: "Four-port USB hub", note: "A compact four-port hub I took from schematic design through to PCB layout.", tags: ["USB", "PCB", "EasyEDA"], href: "https://github.com/Aaryan-N/UsbHub" },
  { title: "Zoom clone", note: "A working video-meeting app I built to get deeper into Next.js architecture.", tags: ["Next.js", "React", "Tailwind"], href: "https://github.com/Aaryan-N/Zoom_Clone" },
] as const;

function Tags({ items }: { items: readonly string[] }) {
  return <ul className="tags">{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function DegreeProgress() {
  const [progress, setProgress] = useState(12.7);

  useEffect(() => {
    const update = () => {
      const start = Date.UTC(2026, 0, 1);
      const end = Date.UTC(2031, 0, 1);
      const nextProgress = ((Date.now() - start) / (end - start)) * 100;
      setProgress(Math.max(0, Math.min(100, nextProgress)));
    };

    update();
    const timer = window.setInterval(update, 100);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="degree-status" aria-label={`Degree progress ${progress.toFixed(2)} percent`}>
      <span>Bach Eng&amp;Sci ’31</span>
      <b aria-hidden="true">{progress.toFixed(9)}%</b>
      <div aria-hidden="true"><i style={{ "--degree-progress": `${progress}%` } as CSSProperties} /></div>
      <span>@ Monash University</span>
    </div>
  );
}

type CarbonReading = {
  grams: string;
  cleanerThan: string;
  cachedAt: number;
};

const carbonReportUrl = "https://www.websitecarbon.com/website/aaryan-is-a-dev/";
const carbonApiUrl = "https://api.websitecarbon.com/b?url=https%3A%2F%2Faaryan.is-a.dev%2F";
const verifiedCarbonReading: CarbonReading = {
  grams: "0.03",
  cleanerThan: "96",
  cachedAt: Date.UTC(2026, 7, 21),
};

function LiveCarbonPercentage({ value }: { value: string }) {
  const baseValue = Number(value);
  const [displayValue, setDisplayValue] = useState(baseValue);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const startedAt = performance.now();
    const timer = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      setDisplayValue(baseValue + ((Math.sin(elapsed / 1250) + 1) / 2) * 0.000009);
    }, 180);

    return () => window.clearInterval(timer);
  }, [baseValue]);

  return (
    <span className="carbon-percentage" aria-label={`Cleaner than ${baseValue} percent of pages tested`}>
      {displayValue.toFixed(6)}% cleaner
    </span>
  );
}

function CarbonBadge() {
  const [reading, setReading] = useState<CarbonReading>(verifiedCarbonReading);

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = "portfolio-carbon-reading";

    const load = async () => {
      try {
        const cached = window.localStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached) as CarbonReading;
          if (Date.now() - parsed.cachedAt < 7 * 24 * 60 * 60 * 1000) {
            setReading(parsed);
            return;
          }
        }

        const response = await fetch(carbonApiUrl, { signal: controller.signal });
        if (!response.ok) throw new Error("Carbon result unavailable");
        const data = await response.json() as { c?: string | number; p?: string | number };
        if (data.c === undefined || data.p === undefined) throw new Error("Carbon result missing");

        const nextReading = {
          grams: String(data.c),
          cleanerThan: String(data.p),
          cachedAt: Date.now(),
        };
        window.localStorage.setItem(cacheKey, JSON.stringify(nextReading));
        setReading(nextReading);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    };

    void load();
    return () => controller.abort();
  }, []);

  return (
    <a className="carbon-badge" href={carbonReportUrl} target="_blank" rel="noreferrer" aria-label="View this site's Website Carbon report">
      <span className="carbon-main">
        <span className="carbon-mark" aria-label="Carbon rating A plus">A+</span>
        <span className="carbon-reading"><strong>{reading.grams}g CO₂</strong><small>per page view</small></span>
        <span className="carbon-source">Website<br />Carbon ↗</span>
      </span>
      <LiveCarbonPercentage key={reading.cleanerThan} value={reading.cleanerThan} />
    </a>
  );
}

function FlockCanvas({ level }: { level: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const levelRef = useRef(level);

  useEffect(() => {
    levelRef.current = level;
  }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const maxBoids = 76;
    const x = new Float32Array(maxBoids);
    const y = new Float32Array(maxBoids);
    const vx = new Float32Array(maxBoids);
    const vy = new Float32Array(maxBoids);
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let previousTime = 0;
    let stroke = "#4f67ff";

    for (let index = 0; index < maxBoids; index += 1) {
      const angle = Math.random() * Math.PI * 2;
      x[index] = Math.random() * width;
      y[index] = Math.random() * height;
      vx[index] = Math.cos(angle) * (0.45 + Math.random() * 0.55);
      vy[index] = Math.sin(angle) * (0.45 + Math.random() * 0.55);
    }

    const updateColour = () => {
      stroke = getComputedStyle(document.documentElement).getPropertyValue("--blue").trim() || "#4f67ff";
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = (time: number) => {
      if (document.hidden) return;
      if (time - previousTime < 33) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      previousTime = time;

      context.clearRect(0, 0, width, height);
      const sliderActivity = levelRef.current / 100;
      if (sliderActivity <= 0) {
        frame = window.requestAnimationFrame(draw);
        return;
      }

      const activity = Math.pow(sliderActivity, 0.82);
      const count = Math.round(10 + activity * (maxBoids - 10));
      const neighbourDistanceSquared = 82 * 82;
      const separationDistanceSquared = 22 * 22;
      const speedLimit = 0.65 + activity * 0.9;

      for (let first = 0; first < count; first += 1) {
        let neighbours = 0;
        let alignmentX = 0;
        let alignmentY = 0;
        let centreX = 0;
        let centreY = 0;
        let separationX = 0;
        let separationY = 0;

        for (let second = 0; second < count; second += 1) {
          if (first === second) continue;
          const offsetX = x[second] - x[first];
          const offsetY = y[second] - y[first];
          const distanceSquared = offsetX * offsetX + offsetY * offsetY;
          if (distanceSquared >= neighbourDistanceSquared) continue;

          neighbours += 1;
          alignmentX += vx[second];
          alignmentY += vy[second];
          centreX += x[second];
          centreY += y[second];
          if (distanceSquared < separationDistanceSquared && distanceSquared > 0) {
            separationX -= offsetX / distanceSquared;
            separationY -= offsetY / distanceSquared;
          }
        }

        if (neighbours > 0) {
          vx[first] += (alignmentX / neighbours - vx[first]) * 0.018;
          vy[first] += (alignmentY / neighbours - vy[first]) * 0.018;
          vx[first] += (centreX / neighbours - x[first]) * 0.00045;
          vy[first] += (centreY / neighbours - y[first]) * 0.00045;
          vx[first] += separationX * 0.24;
          vy[first] += separationY * 0.24;
        }

        const speed = Math.hypot(vx[first], vy[first]) || 1;
        if (speed > speedLimit) {
          vx[first] = (vx[first] / speed) * speedLimit;
          vy[first] = (vy[first] / speed) * speedLimit;
        }

        x[first] += vx[first];
        y[first] += vy[first];
        if (x[first] < -12) x[first] = width + 12;
        if (x[first] > width + 12) x[first] = -12;
        if (y[first] < -12) y[first] = height + 12;
        if (y[first] > height + 12) y[first] = -12;
      }

      context.beginPath();
      context.strokeStyle = stroke;
      context.globalAlpha = 0.08 + activity * 0.13;
      context.lineWidth = 1;
      for (let index = 0; index < count; index += 1) {
        const angle = Math.atan2(vy[index], vx[index]);
        context.moveTo(x[index] - Math.cos(angle) * 2, y[index] - Math.sin(angle) * 2);
        context.lineTo(x[index] + Math.cos(angle) * 5, y[index] + Math.sin(angle) * 5);
      }
      context.stroke();
      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      window.cancelAnimationFrame(frame);
      if (!document.hidden) {
        previousTime = 0;
        frame = window.requestAnimationFrame(draw);
      }
    };

    updateColour();
    resize();
    const colourObserver = new MutationObserver(updateColour);
    colourObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    frame = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      colourObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="boids-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [time, setTime] = useState("--:--");
  const [utcOffset, setUtcOffset] = useState("UTC+10");
  const [dark, setDark] = useState(false);
  const [weather, setWeather] = useState<WeatherState>({ kind: "loading", label: "Checking the weather…" });
  const [flockLevel, setFlockLevel] = useState(34);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(new Intl.DateTimeFormat("en-AU", {
        timeZone: "Australia/Melbourne",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now));
      setUtcOffset(melbourneUtcOffset(now));

    };

    const stored = window.localStorage.getItem("portfolio-theme");
    const nextDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedFlockValue = window.localStorage.getItem("portfolio-flock");
    const storedFlock = storedFlockValue === null ? null : Number(storedFlockValue);
    const frame = window.requestAnimationFrame(() => {
      setDark(nextDark);
      if (storedFlock !== null && Number.isFinite(storedFlock) && storedFlock >= 0 && storedFlock <= 100) setFlockLevel(storedFlock);
      document.documentElement.dataset.theme = nextDark ? "dark" : "light";
      update();
    });
    const timer = window.setInterval(update, 30_000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const previewKind = new URLSearchParams(window.location.search).get("weather") as WeatherKind | null;
    const previewWeather = previewKind ? weatherPreviews[previewKind] : undefined;

    if (previewWeather) {
      const previewFrame = window.requestAnimationFrame(() => setWeather(previewWeather));
      return () => {
        window.cancelAnimationFrame(previewFrame);
        controller.abort();
      };
    }

    const updateWeather = async () => {
      try {
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-37.8136&longitude=144.9631&current=weather_code,is_day&timezone=Australia%2FMelbourne&forecast_days=1",
          { cache: "no-store", signal: controller.signal },
        );
        if (!response.ok) throw new Error("Weather request failed");

        const data = await response.json() as { current?: { weather_code?: number; is_day?: number } };
        const code = data.current?.weather_code;
        if (typeof code !== "number") throw new Error("Weather data missing");

        setWeather(describeWeather(code, data.current?.is_day === 1));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setWeather({ kind: "cloudy", label: "Weather's gone shy" });
      }
    };

    void updateWeather();
    const timer = window.setInterval(updateWeather, 15 * 60 * 1000);
    return () => {
      controller.abort();
      window.clearInterval(timer);
    };
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    window.localStorage.setItem("portfolio-theme", next ? "dark" : "light");
  };

  const changeFlockLevel = (value: number) => {
    setFlockLevel(value);
    window.localStorage.setItem("portfolio-flock", String(value));
  };

  return (
    <main className="page-shell" id="top" data-weather={weather.kind}>
      <FlockCanvas level={flockLevel} />
      <div className="flock-control">
        <a href="https://en.wikipedia.org/wiki/Boids" target="_blank" rel="noreferrer">Spawn a flock? ↗</a>
        <input
          type="range"
          min="0"
          max="100"
          value={flockLevel}
          onChange={(event) => changeFlockLevel(Number(event.target.value))}
          aria-label="Flock activity"
        />
      </div>
      <div className={`weather-effect weather-${weather.kind}`} aria-hidden="true">
        {Array.from({ length: weather.kind === "snow" ? 20 : 12 }, (_, index) => (
          <i
            key={index}
            style={index >= 12 ? { left: `${8 + (index - 12) * 12}%`, animationDelay: `${-(index * 0.43)}s` } : undefined}
          />
        ))}
      </div>

      <header className="identity">
        <div className="identity-top">
          <div className="identity-title">
            <h1>Aaryan Narayan</h1>
            <p>Mechatronics &amp; Applied Mathematics Student <span aria-hidden="true">|</span> Robotics, Software &amp; AV Systems</p>
          </div>
          <div className="identity-meta">
            <span className="location-name">Melbourne, AU</span>
            <span className={`weather-status weather-status-${weather.kind}`} aria-live="polite"><i aria-hidden="true" />{weather.label}</span>
            <span>{time} ({utcOffset})</span>
            <button type="button" onClick={toggleTheme}>{dark ? "Light" : "Dark"}</button>
          </div>
        </div>
        <div className="contact-row">
          <a href="mailto:aaryan.narayan@outlook.com">email ↗</a><span>/</span>
          <a href="https://github.com/Aaryan-N" target="_blank" rel="noreferrer">github ↗</a><span>/</span>
          <a href="https://www.linkedin.com/in/aaryan-narayan/" target="_blank" rel="noreferrer">linkedin ↗</a><span>/</span>
          <a href="/Aaryan_Narayan_Resume.pdf" target="_blank" rel="noreferrer">résumé ↗</a>
        </div>
        <DegreeProgress />
      </header>

      <section className="compact-section focus-section" id="experience">
        <h2>Experience</h2>
        <div className="resume-list">
          <article>
            <time>2024 — present</time>
            <div>
              <h3><a href="https://slcaust.com.au/" target="_blank" rel="noreferrer">Sound &amp; Light Concepts Pty Ltd <span aria-hidden="true">↗</span></a></h3>
              <span>Event technology team member</span>
              <p>Set up, ran and packed down audio and video technology for all sorts of clients in fast-moving event environments.</p>
              <ul className="detail-list">
                <li>Worked in coordinated teams to deliver high-quality client outcomes.</li>
                <li>Maintained efficient and accurate organisational and operational practices.</li>
                <li>Adapted quickly to changing client needs and event conditions.</li>
              </ul>
            </div>
          </article>
        </div>
      </section>

      <section className="compact-section focus-section" id="placements">
        <h2>Placements</h2>
        <div className="resume-list">
          {placements.map((item) => (
            <article key={item.organisation}>
              <time>{item.year}</time>
              <div><h3><a href={item.href} target="_blank" rel="noreferrer">{item.organisation} <span aria-hidden="true">↗</span></a></h3><span>{item.role}</span><p>{item.copy}</p><ul className="detail-list">{item.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
            </article>
          ))}
        </div>
      </section>

      <section className="compact-section projects-section" id="work">
        <h2>Current work</h2>
        <div className="current-projects">
          {currentProjects.map((project) => <article key={project.title}><h3>{project.title}</h3><p>{project.note}</p><Tags items={project.tags} /></article>)}
        </div>
      </section>

      <section className="compact-section">
        <h2>Projects</h2>
        <div className="project-grid">
          {projects.map((project) => (
            <a href={project.href} target="_blank" rel="noreferrer" key={project.title}><h3>{project.title} <span>↗</span></h3><p>{project.note}</p><Tags items={project.tags} /></a>
          ))}
        </div>
      </section>

      <section className="compact-section" id="community">
        <h2>Beyond work</h2>
        <div className="community-list">
          {community.map(([period, title, note]) => <article key={`${period}-${title}`}><time>{period}</time><div><h3>{title}</h3><p>{note}</p></div></article>)}
        </div>
      </section>

      <footer>
        <span>© 2026 Aaryan Narayan</span>
        <div className="footer-links"><a href="mailto:aaryan.narayan@outlook.com">Email ↗</a><a href="#top">Top ↑</a></div>
        <CarbonBadge />
      </footer>
    </main>
  );
}
