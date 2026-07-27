"use client";

import { useEffect, useRef, useState } from "react";

const projects = [
  {
    number: "01",
    status: "CURRENT PROJECT",
    title: "Velo",
    kicker: "NFC products and the software around them.",
    description:
      "I’m building the product layer behind NFC cards, stands and fobs: tap routing, shareable profiles, customer tools, analytics and the boring operational pieces that make the whole thing dependable.",
    note: "A real product means thinking past the landing page — identity, privacy, provisioning, failure states and what happens after the thousandth tap.",
    tags: ["Next.js", "NFC", "Product systems", "Analytics"],
    kind: "velo",
  },
  {
    number: "02",
    status: "WORK IN PROGRESS",
    title: "Cramwise",
    kicker: "A calmer way to plan around university.",
    description:
      "Cramwise turns deadlines, routines and available time into a realistic week. The interesting bit isn’t making another calendar — it’s deciding what matters next, showing why, and recovering when Tuesday goes sideways.",
    note: "The scheduling engine is deterministic on purpose. If a planner rearranges your life, it should be able to explain itself.",
    tags: ["Scheduling", "Product design", "Supabase", "TypeScript"],
    kind: "cramwise",
  },
] as const;

const smallBuilds = [
  {
    title: "NFC hacker card",
    year: "2024",
    text: "A PCB business card designed in EasyEDA, with NFC built into the object rather than pasted on as an afterthought.",
    href: "https://github.com/Aaryan-N/Aaryan_Hacker_Card",
    image:
      "https://github.com/user-attachments/assets/fea3c193-7afe-44d0-b681-8ba417ae409f",
  },
  {
    title: "Four-port USB hub",
    year: "2024",
    text: "A small hardware detour: schematic, board layout and a reminder that traces are less forgiving than TypeScript.",
    href: "https://github.com/Aaryan-N/UsbHub",
    image:
      "https://github.com/user-attachments/assets/fe2b8472-b026-4a9e-8165-447ca8ffd0fa",
  },
] as const;

function ProjectVisual({ kind }: { kind: (typeof projects)[number]["kind"] }) {
  if (kind === "velo") {
    return (
      <div className="project-visual velo-visual" aria-label="Velo product interface concept">
        <div className="visual-topline">
          <span>VELO / CUSTOMER 0042</span>
          <span className="live-dot">LIVE</span>
        </div>
        <div className="phone-shell">
          <div className="phone-speaker" />
          <div className="profile-mark">AN</div>
          <strong>Aaryan Narayan</strong>
          <span>Builder · Australia</span>
          <div className="profile-link">Portfolio <b>↗</b></div>
          <div className="profile-link">Current project <b>↗</b></div>
        </div>
        <div className="tap-card">
          <span>TAPS / 7 DAYS</span>
          <strong>1,284</strong>
          <div className="tap-bars" aria-hidden="true">
            {[42, 66, 51, 86, 74, 93, 79].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
        </div>
        <div className="nfc-orbit" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual cramwise-visual" aria-label="Cramwise planning interface concept">
      <div className="visual-topline">
        <span>WED / 29 JUL</span>
        <span>08:42</span>
      </div>
      <div className="next-task">
        <span>DO THIS NEXT</span>
        <strong>Finish systems lab</strong>
        <p>Due tomorrow · 75 min left</p>
        <button type="button">Start focus →</button>
      </div>
      <div className="week-strip" aria-hidden="true">
        <span>M</span>
        <span>T</span>
        <span className="today">W</span>
        <span>T</span>
        <span>F</span>
      </div>
      <div className="plan-block block-one">09:00 · Systems lab</div>
      <div className="plan-block block-two">13:30 · Reading</div>
      <div className="risk-note">
        <span>PLAN CHANGED?</span>
        <b>Rebuild the week, keep the work.</b>
      </div>
    </div>
  );
}

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("top");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
    };

    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection((visible.target as HTMLElement).dataset.section ?? "top");
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.25, 0.6] },
    );

    sections.forEach((section) => observerRef.current?.observe(section));
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Aaryan Narayan, back to top">
          A/N
        </a>
        <nav aria-label="Main navigation">
          <a className={activeSection === "work" ? "active" : ""} href="#work">
            Work
          </a>
          <a className={activeSection === "about" ? "active" : ""} href="#about">
            About
          </a>
          <a href="mailto:aaryan.narayan@outlook.com">Say hello ↗</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top" data-section="top">
          <div className="hero-meta">
            <span>SYD, AU</span>
            <span>STUDENT / BUILDER</span>
            <span className="availability"><i /> CURRENTLY BUILDING</span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Hi, I’m Aaryan.</p>
            <h1>
              I spend a lot of time
              <span>making things.</span>
            </h1>
            <p className="hero-intro">
              I’m a student in Australia interested in software, hardware and
              everything that happens between an idea and a useful finished thing.
            </p>
          </div>

          <div className="hero-bottom">
            <a className="scroll-cue" href="#work">
              <span>SCROLL TO THE BUILDS</span>
              <b>↓</b>
            </a>
            <p>
              This is a small, changing collection of what I’ve been learning and
              working on lately.
            </p>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            <span>CURRENTLY: VELO + CRAMWISE</span><b>·</b>
            <span>RECENTLY: PRODUCT SYSTEMS + PCBS</span><b>·</b>
            <span>BASED IN AUSTRALIA</span><b>·</b>
            <span>CURRENTLY: VELO + CRAMWISE</span><b>·</b>
            <span>RECENTLY: PRODUCT SYSTEMS + PCBS</span><b>·</b>
            <span>BASED IN AUSTRALIA</span><b>·</b>
          </div>
        </div>

        <section className="work-section" id="work" data-section="work">
          <div className="section-heading">
            <p>SELECTED WORK / 2026</p>
            <h2>A few current projects.</h2>
            <span>The things taking up most of my tabs at the moment.</span>
          </div>

          <div className="project-list">
            {projects.map((project) => (
              <article className="project" key={project.title}>
                <div className="project-index">
                  <span>{project.number}</span>
                  <span>{project.status}</span>
                </div>
                <div className="project-copy">
                  <p>{project.kicker}</p>
                  <h3>{project.title}</h3>
                  <div className="project-description">
                    <p>{project.description}</p>
                    <aside>{project.note}</aside>
                  </div>
                  <ul aria-label={`${project.title} technologies and themes`}>
                    {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <ProjectVisual kind={project.kind} />
              </article>
            ))}
          </div>
        </section>

        <section className="builds-section" data-section="work">
          <div className="section-heading compact">
            <p>OFF-SCREEN EXPERIMENTS</p>
            <h2>I also make objects.</h2>
          </div>
          <div className="small-build-grid">
            {smallBuilds.map((build, index) => (
              <a
                className="small-build"
                href={build.href}
                target="_blank"
                rel="noreferrer"
                key={build.title}
              >
                <div className="build-image-wrap">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={build.image} alt={`${build.title} project`} />
                  <span>OPEN REPO ↗</span>
                </div>
                <div className="build-title">
                  <span>0{index + 3}</span>
                  <h3>{build.title}</h3>
                  <time>{build.year}</time>
                </div>
                <p>{build.text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="about-section" id="about" data-section="about">
          <div className="about-label">
            <span>ABOUT / THE SHORT VERSION</span>
          </div>
          <div className="about-copy">
            <h2>
              Still figuring it out.
              <br />
              Building as I go.
            </h2>
            <div className="about-columns">
              <p>
                I’m Aaryan, a student in Australia who likes working across the
                whole shape of a problem: the interface, the system underneath it,
                and occasionally the circuit board it runs on.
              </p>
              <p>
                I’m interested in robotics, useful products and the messy middle
                where an idea has to become something a real person can actually
                use. This page is less a trophy cabinet and more a live workbench.
              </p>
            </div>
          </div>
          <div className="about-notes">
            <p>THINGS I KEEP COMING BACK TO</p>
            <ul>
              <li><span>01</span> Products that explain themselves</li>
              <li><span>02</span> Hardware you can hold</li>
              <li><span>03</span> Making complex systems feel calm</li>
              <li><span>04</span> Learning just past my comfort zone</li>
            </ul>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <p>If you’d like to talk about any of this</p>
          <a href="mailto:aaryan.narayan@outlook.com">Say hello <span>↗</span></a>
        </div>
        <div className="footer-meta">
          <span>© 2026 AARYAN NARAYAN</span>
          <a href="https://github.com/Aaryan-N" target="_blank" rel="noreferrer">
            GITHUB ↗
          </a>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </>
  );
}
