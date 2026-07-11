"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { contacts, menuItems, profile, vlogs, works } from "./content";
import type { MenuItem, PanelId } from "./types";

function ObjectArt({ kind }: { kind: MenuItem["object"] }) {
  if (kind === "book") {
    return <span className="object-art book-art" aria-hidden="true"><i /><i /><i /></span>;
  }
  if (kind === "camera") {
    return <span className="object-art camera-art" aria-hidden="true"><i className="reel reel-a" /><i className="reel reel-b" /><i className="lens" /></span>;
  }
  if (kind === "journal") {
    return <span className="object-art journal-art" aria-hidden="true"><i /><b>our<br />little<br />notes</b></span>;
  }
  return <span className="object-art phone-art" aria-hidden="true"><i className="receiver" /><i className="dial">•••<br />•••</i></span>;
}

function resolveBvid(bvid?: string, url?: string) {
  if (bvid?.startsWith("BV")) return bvid;
  return url?.match(/BV[a-zA-Z0-9]+/)?.[0] ?? "";
}

function MenuObject({ item, onSelect }: { item: MenuItem; onSelect: (id: PanelId) => void }) {
  return (
    <div className={`hanger hanger-${item.id}`} data-menu-item={item.id}>
      <span className="rope" aria-hidden="true" />
      <button className="object-button" onClick={() => onSelect(item.id)} aria-label={`打开 ${item.label}`}>
        <ObjectArt kind={item.object} />
        <span className="object-label"><strong>{item.label}</strong><small>{item.note}</small></span>
      </button>
    </div>
  );
}

function WorksPanel() {
  const [index, setIndex] = useState(0);
  const item = works[index];
  const next = (delta: number) => setIndex((current) => (current + delta + works.length) % works.length);

  return (
    <div className="panel-content works-panel">
      <header className="panel-header"><div><span>PORTFOLIO / {item.year}</span><h2>{item.title}</h2></div><em>{String(index + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}</em></header>
      <div className="work-art" style={{ "--p1": item.palette[0], "--p2": item.palette[1], "--p3": item.palette[2] } as React.CSSProperties}>
        {item.image ? <img src={item.image} alt={item.imageAlt || item.title} loading="lazy" /> : <><span className="sun-disc" /><span className="work-window" /><span className="work-shadow" /></>}
        <b>{item.category}</b>
      </div>
      <p>{item.description}</p>
      <div className="panel-controls">
        <button onClick={() => next(-1)} aria-label="上一件作品">‹ PREV</button>
        <span>take a closer look</span>
        <button onClick={() => next(1)} aria-label="下一件作品">NEXT ›</button>
      </div>
    </div>
  );
}

function VlogPanel() {
  const [selected, setSelected] = useState(0);
  const vlog = vlogs[selected];
  const bvid = resolveBvid(vlog.bvid, vlog.bilibiliUrl);
  return (
    <div className="panel-content vlog-panel">
      <header className="panel-header"><div><span>VIDEO DIARY</span><h2>VLOG ON TAPE</h2></div><em>REC ●</em></header>
      <div className="vlog-layout">
        <div className="tape-list">
          {vlogs.map((item, index) => (
            <button key={item.id} className={selected === index ? "selected" : ""} onClick={() => setSelected(index)}>
              <i style={{ background: item.accent }} /><span><strong>{item.title}</strong><small>{item.date} · {item.duration}</small></span>
            </button>
          ))}
        </div>
        <div className="retro-screen">
          {bvid ? (
            <iframe title={vlog.title} src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&autoplay=0`} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen />
          ) : (
            <div className="test-pattern"><span>NO SIGNAL</span><b>{vlog.title}</b><small>把 BV 号填入 app/content.ts 即可播放</small></div>
          )}
        </div>
      </div>
      <p>{vlog.note}</p>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="panel-content about-panel">
      <header className="panel-header"><div><span>WHO WE ARE / WHAT WE KEEP</span><h2>ABOUT US</h2></div><em>花·生 & 影子</em></header>
      <div className="about-grid">
        <div className="portrait-placeholder"><span>花</span><span>影</span><small>PHOTO<br />GOES HERE</small></div>
        <div><h3>{profile.title}</h3><p>{profile.intro}</p><div className="tag-row">{profile.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
      </div>
      <blockquote>“Take some time to live.”<small>— 留一点时间，认真生活</small></blockquote>
    </div>
  );
}

function ContactPanel() {
  return (
    <div className="panel-content contact-panel">
      <header className="panel-header"><div><span>DROP US A LITTLE NOTE</span><h2>CONTACT</h2></div><em>HELLO!</em></header>
      <p className="contact-intro">如果你也喜欢缓慢的影像、好看的房间和生活里奇怪的小事，欢迎来找到我们。</p>
      <div className="contact-list">
        {contacts.map((item) => <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"><strong>{item.label}</strong><span>{item.value}</span><b>↗</b></a>)}
      </div>
      <div className="postcard"><b>SEE YOU<br />SOMEWHERE</b><span className="stamp">花·生<br />& 影子</span></div>
    </div>
  );
}

function ActivePanel({ id }: { id: PanelId }) {
  if (id === "works") return <WorksPanel />;
  if (id === "vlog") return <VlogPanel />;
  if (id === "about") return <AboutPanel />;
  return <ContactPanel />;
}

export function InteractiveStage() {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState<PanelId | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener("change", update);
    if (sessionStorage.getItem("take-some-time-entered") === "yes") setStarted(true);
    return () => {
      media.removeEventListener("change", update);
      timelineRef.current?.kill();
      audioRef.current?.close();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && active && !transitioning) closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const playNote = (frequency: number, duration = .08) => {
    if (!soundOn) return;
    try {
      const context = audioRef.current ?? new AudioContext();
      audioRef.current = context;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(.055, context.currentTime + .012);
      gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + duration);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration + .02);
    } catch { /* Audio is an optional enhancement. */ }
  };

  const launch = () => {
    sessionStorage.setItem("take-some-time-entered", "yes");
    playNote(523, .12);
    setStarted(true);
    requestAnimationFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const targets = root.querySelectorAll(".brand-plaque, .cloud, .mascot, .hanger, .signature-card");
      if (reduceMotion) { gsap.set(targets, { clearProps: "all" }); return; }
      timelineRef.current = gsap.timeline()
        .fromTo(".brand-plaque", { y: -220, rotation: -3 }, { y: 0, rotation: 0, duration: 1, ease: "bounce.out" })
        .fromTo(".cloud", { y: -160, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .08, ease: "back.out(1.8)" }, "-=.55")
        .fromTo(".mascot", { y: -520, rotation: 16 }, { y: 0, rotation: 0, duration: 1.45, ease: "elastic.out(1,.35)" }, "-=.42")
        .fromTo(".hanger", { y: -620, rotation: -12 }, { y: 0, rotation: 0, duration: 1.4, stagger: .12, ease: "elastic.out(1,.42)" }, "-=1.12")
        .fromTo(".signature-card", { x: -320 }, { x: 0, duration: .85, ease: "back.out(1.7)" }, "-=.8");
    });
  };

  const openPanel = (id: PanelId) => {
    if (transitioning || active) return;
    setTransitioning(true);
    playNote(id === "vlog" ? 392 : 466, .1);
    timelineRef.current?.kill();
    if (reduceMotion) { setActive(id); window.history.replaceState(null, "", `#${id}`); setTransitioning(false); return; }
    const selected = `[data-menu-item="${id}"]`;
    timelineRef.current = gsap.timeline({ onComplete: () => { setActive(id); window.history.replaceState(null, "", `#${id}`); requestAnimationFrame(() => gsap.fromTo(panelRef.current, { y: -700, rotation: -4, opacity: 0 }, { y: 0, rotation: 0, opacity: 1, duration: 1.15, ease: "elastic.out(1,.45)", onComplete: () => { setTransitioning(false); panelRef.current?.focus(); } })); } })
      .to(".mascot", { y: -470, rotation: 10, duration: .7, ease: "back.in(1.4)" })
      .to(`.hanger:not(${selected})`, { y: -650, rotation: -8, duration: .68, stagger: .07, ease: "back.in(1.35)" }, "-=.58")
      .to(selected, { x: -110, rotation: -7, duration: .75, ease: "elastic.out(1,.5)" }, "-=.2");
  };

  const closePanel = () => {
    if (transitioning || !active) return;
    setTransitioning(true);
    playNote(330, .09);
    timelineRef.current?.kill();
    if (reduceMotion) { const previous = active; setActive(null); window.history.replaceState(null, "", window.location.pathname); setTransitioning(false); requestAnimationFrame(() => rootRef.current?.querySelector<HTMLButtonElement>(`[data-menu-item="${previous}"] button`)?.focus()); return; }
    timelineRef.current = gsap.timeline({ onComplete: () => {
      const previous = active;
      setActive(null);
      window.history.replaceState(null, "", window.location.pathname);
      requestAnimationFrame(() => {
        gsap.timeline({ onComplete: () => setTransitioning(false) })
          .to(".hanger", { y: 0, x: 0, rotation: 0, duration: 1.05, stagger: .09, ease: "elastic.out(1,.48)" })
          .to(".mascot", { y: 0, rotation: 0, duration: 1.05, ease: "elastic.out(1,.42)", onComplete: () => rootRef.current?.querySelector<HTMLButtonElement>(`[data-menu-item="${previous}"] button`)?.focus() }, "-=.85");
      });
    }}).to(panelRef.current, { y: -700, rotation: 4, opacity: 0, duration: .72, ease: "back.in(1.4)" });
  };

  useEffect(() => {
    if (!started || active || transitioning) return;
    const section = window.location.hash.slice(1) as PanelId;
    if (menuItems.some((item) => item.id === section)) openPanel(section);
    // The hash is restored only when the stage first becomes available.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const trackEyes = (event: React.PointerEvent<HTMLElement>) => {
    if (!rootRef.current || active) return;
    const x = Math.max(-5, Math.min(5, (event.clientX / window.innerWidth - .5) * 10));
    const y = Math.max(-4, Math.min(4, (event.clientY / window.innerHeight - .5) * 8));
    rootRef.current.style.setProperty("--eye-x", `${x}px`);
    rootRef.current.style.setProperty("--eye-y", `${y}px`);
  };

  const shareSite = async () => {
    const data = { title: "TAKE SOME TIME TO LIVE", text: "花·生 & 影子的作品与生活影像空间", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      playNote(659, .09);
    } catch { /* The visitor may cancel the native share sheet. */ }
  };

  return (
    <main ref={rootRef} className={`site-shell ${started ? "is-started" : "is-closed"} ${active ? "has-panel" : ""}`} onPointerMove={trackEyes} aria-busy={transitioning}>
      {!started && <section className="launch-screen"><button className="play-button" onClick={launch} aria-label="进入 TAKE SOME TIME TO LIVE"><span /></button><p>CLICK TO TAKE SOME TIME</p></section>}
      <section className="stage" aria-hidden={!started}>
        <div className="grain" />
        <div className="brand-plaque"><span /><h1>TAKE SOME TIME<br />TO LIVE</h1><small>花·生 & 影子的生活实验室</small></div>
        <div className="cloud cloud-a" /><div className="cloud cloud-b" /><div className="cloud cloud-c" />
        <div className="mascot" aria-hidden="true"><span className="mascot-rope" /><div className="mascot-disc"><i className="eye left"><b /></i><i className="eye right"><b /></i></div><div className="mascot-smile" /><div className="enter-tag"><strong>ENTER</strong><small>LOOK AROUND</small></div></div>
        <nav className="object-nav" aria-label="主要栏目">{menuItems.map((item) => <MenuObject item={item} onSelect={openPanel} key={item.id} />)}</nav>
        {active && <div className="panel-zone"><div className="panel-rope left" /><div className="panel-rope right" /><section ref={panelRef} tabIndex={-1} className="hanging-panel" aria-live="polite"><button className="back-button" onClick={closePanel}>← BACK TO MENU</button><ActivePanel id={active} /></section></div>}
        <div className="signature-card"><i /><p><strong>花·生 & 影子</strong><br /><span>TAKE SOME TIME TO LIVE © 2026</span></p><div className="utility-buttons"><button onClick={() => { setSoundOn((value) => !value); if (!soundOn) playNote(523); }} aria-pressed={soundOn}>{soundOn ? "SOUND ▮▮▮" : "SOUND OFF"}</button><button onClick={shareSite}>{copied ? "COPIED ✓" : "SHARE ↗"}</button></div></div>
      </section>
    </main>
  );
}
