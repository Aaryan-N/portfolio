"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ThemeChoice = "light" | "system" | "dark";

const featured = [
  {
    index: "01",
    title: "Velo",
    year: "2026",
    label: "NFC product platform",
    copy: "A product platform for NFC cards, stands and fobs. I’m building the customer profiles, tap-routing infrastructure, management tools and operational systems behind it.",
    tags: ["Next.js", "NFC", "Supabase", "Product systems"],
    kind: "velo",
  },
  {
    index: "02",
    title: "Cramwise",
    year: "2026",
    label: "Study planner",
    copy: "A planning system that turns deadlines, workload and available time into a realistic study schedule, then recalculates it when plans change.",
    tags: ["TypeScript", "Scheduling", "Product design", "Supabase"],
    kind: "cramwise",
  },
] as const;

const archive = [
  {
    index: "03",
    title: "Fira",
    year: "2024",
    type: "Discord / backend",
    copy: "A distributed Discord bot using clustering, sharding and separate MongoDB stores for economy, support, user and configuration data.",
    tags: ["JavaScript", "MongoDB", "Discord.js"],
    href: "https://github.com/Aaryan-N/Fira",
    image: null,
  },
  {
    index: "04",
    title: "NFC hacker card",
    year: "2024",
    type: "PCB",
    copy: "A two-layer PCB business card with NFC integrated directly into the board.",
    tags: ["EasyEDA", "NFC", "PCB"],
    href: "https://github.com/Aaryan-N/Aaryan_Hacker_Card",
    image: "https://github.com/user-attachments/assets/fea3c193-7afe-44d0-b681-8ba417ae409f",
  },
  {
    index: "05",
    title: "Four-port USB hub",
    year: "2024",
    type: "Hardware",
    copy: "A compact four-port USB hub taken from schematic design through PCB layout.",
    tags: ["PCB", "USB", "EasyEDA"],
    href: "https://github.com/Aaryan-N/UsbHub",
    image: "https://github.com/user-attachments/assets/fe2b8472-b026-4a9e-8165-447ca8ffd0fa",
  },
  {
    index: "06",
    title: "Zoom clone",
    year: "2024",
    type: "Web",
    copy: "A functional video-meeting interface built while learning application architecture in Next.js.",
    tags: ["Next.js", "React", "Tailwind"],
    href: "https://github.com/Aaryan-N/Zoom_Clone",
    image: null,
  },
  {
    index: "07",
    title: "Spotify clone",
    year: "2024",
    type: "Web",
    copy: "A responsive music interface with album, track and library views.",
    tags: ["React", "JavaScript", "UI"],
    href: "https://github.com/Aaryan-N/spotify-clone",
    image: null,
  },
] as const;

const aiWork = [
  {
    status: "CURRENT PRACTICE",
    title: "Agent orchestration",
    copy: "I design multi-agent workflows that divide larger engineering tasks into focused streams for research, implementation, review and verification. Each agent works within a defined scope, with structured handoffs before the work is integrated.",
    detail: "Task decomposition · parallel execution · context handoffs · validation",
    tags: ["Multi-agent systems", "Orchestration", "Planning", "Review"],
  },
  {
    status: "DEVELOPMENT WORKFLOW",
    title: "AI across the toolchain",
    copy: "I work across multiple AI-enabled IDEs and coding agents, moving between planning, implementation, debugging and code review depending on the task. The repository, tests and production behaviour remain the source of truth—not the model output.",
    detail: "AI IDEs · coding agents · repository context · test-driven verification",
    tags: ["AI-assisted development", "Coding agents", "Tooling", "Verification"],
  },
  {
    status: "PRODUCT EXPERIMENTATION",
    title: "Structured extraction",
    copy: "In Cramwise, I’ve explored using models to turn inconsistent academic information into structured records. Low-confidence output is reviewed before it is saved, while scheduling and risk calculations remain deterministic.",
    detail: "Extraction · confidence states · review-before-save · deterministic planning",
    tags: ["Product AI", "Structured data", "Human review", "Cramwise"],
  },
] as const;

function setTilt(event: ReactPointerEvent<HTMLElement>, strength = 10) {
  if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  event.currentTarget.style.setProperty("--rx", `${(0.5 - y) * strength}deg`);
  event.currentTarget.style.setProperty("--ry", `${(x - 0.5) * strength}deg`);
  event.currentTarget.style.setProperty("--sx", `${x * 100}%`);
  event.currentTarget.style.setProperty("--sy", `${y * 100}%`);
}

function resetTilt(event: ReactPointerEvent<HTMLElement>) {
  event.currentTarget.style.setProperty("--rx", "0deg");
  event.currentTarget.style.setProperty("--ry", "0deg");
  event.currentTarget.style.setProperty("--sx", "50%");
  event.currentTarget.style.setProperty("--sy", "50%");
}

function HeroMachine() {
  return (
    <div className="machine-wrap" aria-hidden="true">
      <div className="machine">
        <div className="orbit orbit-one"><i /><i /><i /></div>
        <div className="orbit orbit-two"><i /><i /></div>

        <div className="core-cube">
          <div className="cube-face cube-front"><b>A/N</b><span>MEL · 2026</span></div>
          <div className="cube-face cube-back"><span>ROBOTICS</span></div>
          <div className="cube-face cube-right"><span>AI / AGENTS</span></div>
          <div className="cube-face cube-left"><span>NFC / PCB</span></div>
          <div className="cube-face cube-top"><span>PRODUCT</span></div>
          <div className="cube-face cube-bottom" />
        </div>

        <div className="machine-card machine-code">
          <span>AGENT / ORCHESTRATION</span>
          <div><i /><i /><i /><i /></div>
          <b>PLAN / BUILD / VERIFY</b>
        </div>

        <div className="machine-card machine-pcb">
          <span>NFC / REV.02</span>
          <div className="pcb-traces"><i /><i /><i /><i /></div>
          <b>13.56 MHz</b>
        </div>

        <div className="machine-card machine-status">
          <span>CURRENT</span>
          <b>VELO</b>
          <small>CRAMWISE</small>
        </div>

        <div className="neural-map">
          <i /><i /><i /><i /><i /><i /><i /><i />
          <span /><span /><span /><span /><span />
        </div>

        <div className="data-beam beam-one" />
        <div className="data-beam beam-two" />

        <div className="machine-shard shard-a">01</div>
        <div className="machine-shard shard-b">TOOLS</div>
        <div className="machine-shard shard-c">MEL</div>
      </div>
      <div className="scene-floor" />
    </div>
  );
}

function ProjectStage({ kind }: { kind: (typeof featured)[number]["kind"] }) {
  const isVelo = kind === "velo";
  return (
    <div
      className={`project-stage ${kind}-stage`}
      onPointerMove={(event) => setTilt(event, 8)}
      onPointerLeave={resetTilt}
      aria-label={`${isVelo ? "Velo" : "Cramwise"} interface model`}
    >
      <div className="stage-shine" />
      <div className="stage-grid" />
      <div className="stage-ring ring-a" />
      <div className="stage-ring ring-b" />

      <div className="stage-panel panel-main">
        <div className="panel-bar">
          <span>{isVelo ? "VELO / PROFILE" : "CRAMWISE / TODAY"}</span>
          <i />
        </div>
        {isVelo ? (
          <div className="velo-profile">
            <div className="profile-orb">AN</div>
            <b>Aaryan Narayan</b>
            <span>Melbourne</span>
            <div>Portfolio <em>↗</em></div>
            <div>Current work <em>↗</em></div>
          </div>
        ) : (
          <div className="cram-task">
            <span>UP NEXT</span>
            <b>Systems lab</b>
            <small>75 min · due tomorrow</small>
            <div className="task-meter"><i /></div>
            <button type="button" tabIndex={-1}>Start</button>
          </div>
        )}
      </div>

      <div className="stage-panel panel-data">
        <span>{isVelo ? "TAPS / WEEK" : "WEEK / LOAD"}</span>
        <b>{isVelo ? "1,284" : "68%"}</b>
        <div className="mini-chart">
          {[34, 58, 44, 78, 61, 92, 72].map((value) => (
            <i key={value} style={{ "--bar": `${value}%` } as CSSProperties} />
          ))}
        </div>
      </div>

      <div className="stage-panel panel-log">
        <span>LIVE LOG</span>
        <p>{isVelo ? "tap → resolve → profile" : "deadline → plan → focus"}</p>
        <p>{isVelo ? "route /mel/0042" : "rebuild /week/29"}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [melbourneTime, setMelbourneTime] = useState("--:-- --");
  const [activeSection, setActiveSection] = useState("top");
  const [theme, setTheme] = useState<ThemeChoice>("system");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const updateTime = () => {
      setMelbourneTime(
        new Intl.DateTimeFormat("en-AU", {
          timeZone: "Australia/Melbourne",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()).toUpperCase(),
      );
    };

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll", `${window.scrollY}`);
      document.documentElement.style.setProperty("--progress", `${progress}`);
    };

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current) setActiveSection((current.target as HTMLElement).dataset.section ?? "top");
      },
      { rootMargin: "-35% 0px -55%", threshold: [0, 0.2, 0.6] },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    reveals.forEach((item) => revealObserver.observe(item));
    updateTime();
    updateScroll();

    const interval = window.setInterval(updateTime, 30_000);
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("scroll", updateScroll);
      observerRef.current?.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme") as ThemeChoice | null;
    const initial = stored === "light" || stored === "dark" || stored === "system"
      ? stored
      : "system";
    const frame = window.requestAnimationFrame(() => setTheme(initial));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = (choice: ThemeChoice) => {
      const resolved = choice === "system" ? (media.matches ? "dark" : "light") : choice;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    };

    applyTheme(theme);

    const handleSystemTheme = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };

    media.addEventListener("change", handleSystemTheme);
    return () => media.removeEventListener("change", handleSystemTheme);
  }, [theme]);

  const chooseTheme = (choice: ThemeChoice) => {
    setTheme(choice);
    window.localStorage.setItem("portfolio-theme", choice);
  };

  const moveHero = (event: ReactPointerEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--mx", `${x}`);
    event.currentTarget.style.setProperty("--my", `${y}`);
  };

  return (
    <>
      <div className="progress-track" aria-hidden="true"><i /></div>
      <div className="page-noise" aria-hidden="true" />

      <header className="site-header">
        <div className="header-actions">
          <div className="theme-selector" aria-label="Colour theme">
            {(["light", "system", "dark"] as const).map((choice) => (
              <button
                type="button"
                key={choice}
                className={theme === choice ? "selected" : ""}
                aria-pressed={theme === choice}
                onClick={() => chooseTheme(choice)}
              >
                {choice === "system" ? "Auto" : choice}
              </button>
            ))}
          </div>
          <nav aria-label="Main navigation">
            <a className={activeSection === "work" ? "active" : ""} href="#work">Work</a>
            <a className={activeSection === "ai" ? "active" : ""} href="#ai">AI</a>
            <a className={activeSection === "archive" ? "active" : ""} href="#archive">Archive</a>
            <a className={activeSection === "about" ? "active" : ""} href="#about">About</a>
            <a href="mailto:aaryan.narayan@outlook.com">Email ↗</a>
          </nav>
        </div>
      </header>

      <main>
        <section
          className="hero"
          id="top"
          data-section="top"
          onPointerMove={moveHero}
        >
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="hero-meta">
              <span>MELBOURNE / {melbourneTime} LOCAL TIME</span>
            </div>
            <h1>
              I spend a lot of time
              <span>making things.</span>
            </h1>
            <p>I build product software, connected hardware and AI-assisted development systems.</p>
            <div className="hero-links">
              <a href="#work">Selected work <span>↓</span></a>
              <a href="https://github.com/Aaryan-N" target="_blank" rel="noreferrer">
                GitHub <span>↗</span>
              </a>
            </div>
          </div>
          <HeroMachine />
          <div className="hero-coordinate coord-a">37.8136° S</div>
          <div className="hero-coordinate coord-b">144.9631° E</div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div>
            <span>VELO</span><b>+</b><span>CRAMWISE</span><b>+</b><span>FIRA</span><b>+</b>
            <span>NFC CARD</span><b>+</b><span>USB HUB</span><b>+</b><span>MELBOURNE</span><b>+</b>
            <span>VELO</span><b>+</b><span>CRAMWISE</span><b>+</b><span>FIRA</span><b>+</b>
            <span>NFC CARD</span><b>+</b><span>USB HUB</span><b>+</b><span>MELBOURNE</span><b>+</b>
          </div>
        </div>

        <section className="work-section" id="work" data-section="work">
          <div className="section-intro" data-reveal>
            <span>01 / CURRENT</span>
            <h2>Current projects.</h2>
          </div>

          <div className="featured-list">
            {featured.map((project) => (
              <article className="featured-project" key={project.title} data-reveal>
                <div className="project-copy">
                  <div className="project-meta">
                    <span>{project.index}</span>
                    <span>{project.year}</span>
                  </div>
                  <p>{project.label}</p>
                  <h3>{project.title}</h3>
                  <div className="project-body">
                    <p>{project.copy}</p>
                    <ul aria-label={`${project.title} technologies`}>
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                  </div>
                </div>
                <ProjectStage kind={project.kind} />
              </article>
            ))}
          </div>
        </section>

        <section className="ai-section" id="ai" data-section="ai">
          <div className="ai-intro">
            <span>02 / AI</span>
            <h2>AI as part of the engineering system.</h2>
            <p>
              My focus is on coordinating agents, working across AI-enabled
              development environments and building reviewable workflows around
              model output.
            </p>
          </div>

          <div className="ai-layout">
            <div
              className="model-visual"
              onPointerMove={(event) => setTilt(event, 8)}
              onPointerLeave={resetTilt}
              aria-label="Multi-agent orchestration workflow"
            >
              <div className="model-grid" />
              <div className="token-stream">
                {"PLAN DELEGATE BUILD REVIEW VERIFY".split("").map((letter, index) => (
                  <i key={`${letter}-${index}`}>{letter === " " ? "·" : letter}</i>
                ))}
              </div>
              <div className="model-layer layer-input"><span>01</span><b>PLAN</b><small>define scope</small></div>
              <div className="model-layer layer-embed"><span>02</span><b>DELEGATE</b><small>route tasks</small></div>
              <div className="model-layer layer-attn"><span>03</span><b>EXECUTE</b><small>parallel work</small></div>
              <div className="model-layer layer-output"><span>04</span><b>VERIFY</b><small>review &amp; test</small></div>
              <div className="model-orbit"><i /><i /><i /></div>
            </div>

            <div className="ai-cases">
              {aiWork.map((item) => (
                <article className="ai-case" key={item.title}>
                    <div className="ai-case-meta">
                      <span>{item.status}</span>
                      <span>AI WORKFLOW</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                    <small>{item.detail}</small>
                    <ul aria-label={`${item.title} themes`}>
                      {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="archive-section" id="archive" data-section="archive">
          <div className="archive-head" data-reveal>
            <span>03 / ARCHIVE</span>
            <h2>Earlier work.</h2>
            <p>Selected projects that shaped how I work across software and hardware.</p>
          </div>

          <div className="archive-space">
            <div className="archive-axis" aria-hidden="true" />
            {archive.map((item, index) => (
              <a
                className="archive-card"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                key={item.title}
                style={{ "--i": index } as CSSProperties}
                onPointerMove={(event) => setTilt(event, 12)}
                onPointerLeave={resetTilt}
                data-reveal
              >
                <div className="card-shine" />
                {item.image ? (
                  <div className="archive-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt="" />
                  </div>
                ) : (
                  <div className="archive-schematic" aria-hidden="true">
                    <i /><i /><i /><i /><b>{item.index}</b>
                  </div>
                )}
                <div className="archive-meta">
                  <span>{item.index}</span>
                  <span>{item.type}</span>
                  <time>{item.year}</time>
                </div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <ul aria-label={`${item.title} technologies`}>
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <span className="archive-open">Open repo ↗</span>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section" id="about" data-section="about">
          <div className="about-head">
            <span>04 / ABOUT</span>
            <h2>Based in Melbourne. Working across software, hardware and applied AI.</h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I’m a student and product builder interested in systems that
                cross boundaries: interfaces connected to infrastructure,
                software connected to physical products, and AI workflows
                connected to real engineering practice.
              </p>
              <p>
                My current focus is Velo, Cramwise and agent-assisted software
                development. I enjoy owning the full path from an early idea to
                the implementation details that make it dependable.
              </p>
            </div>
            <div className="about-ledger">
              <div><span>BASE</span><p>Melbourne, Australia</p></div>
              <div><span>FOCUS</span><p>Product systems, agent workflows, connected hardware</p></div>
              <div><span>WORKING WITH</span><p>TypeScript, Next.js, Supabase, NFC and PCB design</p></div>
              <div><span>CURRENTLY</span><p>Building Velo and Cramwise</p></div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <span>05 / CONTACT</span>
        <p>Email is easiest.</p>
        <a href="mailto:aaryan.narayan@outlook.com">
          aaryan.narayan@outlook.com <i>↗</i>
        </a>
        <div>
          <span>© 2026 Aaryan Narayan</span>
          <a href="https://github.com/Aaryan-N" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="#top">Top ↑</a>
        </div>
      </footer>
    </>
  );
}
