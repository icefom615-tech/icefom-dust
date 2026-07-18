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

function tryPlayMuted(video: HTMLVideoElement) {
  video.muted = true;
  void video.play().catch(() => {
    // Browsers may defer autoplay while the network is still buffering.
    // The ready-state listeners and the final-scene timer retry it below.
  });
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
  const bilibili = contacts.find((item) => item.label === "BILIBILI");
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
          {vlog.videoSrc ? (
            <video src={vlog.videoSrc} poster={vlog.poster} controls preload="metadata" playsInline />
          ) : bvid ? (
            <iframe title={vlog.title} src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&autoplay=0`} loading="lazy" allow="fullscreen; picture-in-picture" allowFullScreen />
          ) : (
            <div className="test-pattern"><span>NO SIGNAL</span><b>{vlog.title}</b><small>填入 BV 号、B 站链接或本地视频即可播放</small></div>
          )}
        </div>
      </div>
      <p>{vlog.note}</p>
      {bilibili?.href && bilibili.href !== "#" ? (
        <a className="vlog-link" href={bilibili.href} target="_blank" rel="noreferrer">
          <span>WATCH MORE ON BILIBILI</span><b>↗</b>
        </a>
      ) : null}
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="panel-content about-panel">
      <header className="panel-header"><div><span>WHO WE ARE / WHAT WE KEEP</span><h2>ABOUT US</h2></div><em>花·生 & 尘光</em></header>
      <div className="about-grid">
        <div className="portrait-placeholder motion-portrait" aria-label="花与尘光的动态标识">
          <span className="portrait-orbit orbit-a" aria-hidden="true" />
          <span className="portrait-orbit orbit-b" aria-hidden="true" />
          <span className="paper-dot dot-a" aria-hidden="true" />
          <span className="paper-dot dot-b" aria-hidden="true" />
          <span className="paper-dot dot-c" aria-hidden="true" />
          <span className="portrait-figure figure-flower" aria-hidden="true"><b>花</b><em>尘</em></span>
          <span className="portrait-figure figure-shadow" aria-hidden="true"><b>影</b></span>
          <span className="sunflower-badge" aria-hidden="true"><i /><b>Q</b></span>
        </div>
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
      <div className="postcard"><b>SEE YOU<br />SOMEWHERE</b><span className="stamp">花·生<br />& 尘光</span></div>
    </div>
  );
}

function ActivePanel({ id }: { id: PanelId }) {
  if (id === "works") return <WorksPanel />;
  if (id === "vlog") return <VlogPanel />;
  if (id === "about") return <AboutPanel />;
  return <ContactPanel />;
}

function IntroCinema({ onDone }: { onDone: () => void }) {
  const flowerTreeRef = useRef<HTMLVideoElement>(null);
  const dots = [
    ["7%", "11%", 9, "0s"],
    ["13%", "6%", 16, "-.4s"],
    ["20%", "15%", 8, "-1.2s"],
    ["31%", "44%", 20, "-.8s"],
    ["39%", "24%", 10, "-1.6s"],
    ["58%", "12%", 18, "-.2s"],
    ["69%", "35%", 13, "-1.1s"],
    ["74%", "58%", 22, "-.6s"],
    ["83%", "25%", 11, "-1.4s"],
    ["90%", "8%", 26, "-.9s"],
    ["8%", "72%", 30, "-1.7s"],
    ["44%", "71%", 12, "-.3s"],
    ["62%", "78%", 7, "-1.9s"],
    ["92%", "65%", 14, "-.5s"],
  ] as const;
  const starDots = Array.from({ length: 22 }, (_, index) => index);

  useEffect(() => {
    const video = flowerTreeRef.current;
    if (!video) return;

    // Start loading immediately. On slower external networks the old one-shot
    // timer could fire before metadata arrived, leaving the video permanently paused.
    const retryPlay = () => tryPlayMuted(video);
    video.addEventListener("loadedmetadata", retryPlay);
    video.addEventListener("loadeddata", retryPlay);
    video.addEventListener("canplay", retryPlay);
    video.load();
    retryPlay();

    // Start the supplied effect as the final black scene fades in (30s into the shortened intro).
    const timer = window.setTimeout(() => {
      video.currentTime = 0;
      tryPlayMuted(video);
    }, 30000);
    return () => {
      window.clearTimeout(timer);
      video.removeEventListener("loadedmetadata", retryPlay);
      video.removeEventListener("loadeddata", retryPlay);
      video.removeEventListener("canplay", retryPlay);
    };
  }, []);

  return (
    <section
      className="intro-cinema"
      aria-label="尘 chen 片头动画，点击跳过"
      role="button"
      tabIndex={0}
      onClick={onDone}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") onDone();
      }}
    >
      <div className="intro-inkfield" aria-hidden="true">
        {dots.map(([left, top, size, delay], index) => (
          <span
            key={`${left}-${top}`}
            style={{ "--x": left, "--y": top, "--s": `${size}px`, "--d": delay } as React.CSSProperties}
            className={`ink-dot ink-dot-${index % 4}`}
          />
        ))}
      </div>
      <div className="intro-title intro-scene scene-symbol" aria-hidden="true">
        <img className="intro-hanzi intro-calligraphy" src="./images/chen-calligraphy.png" alt="一尘" />
        <span className="intro-roman">chen</span>
      </div>
      <div className="intro-scene scene-question" aria-hidden="true">
        <b>家</b><span>是落定的尘。</span><small>世界是扬起的沙。</small>
      </div>
      <div className="intro-scene scene-strokes" aria-hidden="true">
        <i /><i /><i /><i /><b>旅行</b><small>惊扰了光。</small>
      </div>
      <div className="intro-scene scene-world" aria-hidden="true">
        <span>日子</span><b>慢得下灰。</b><small>万物皆微尘，<br />自在。</small>
      </div>
      <div className="intro-scene scene-dark" aria-hidden="true">
        <div className="starline">{starDots.map((dot) => <i key={dot} />)}</div>
        <span>家是落定的尘。</span><b>尘</b><em>心</em><small>世界是扬起的沙。</small>
      </div>
      <div className="intro-scene scene-minimal" aria-hidden="true">
        <b>尘</b><span>万物皆微尘，</span><i>自在。</i>
      </div>
      <div className="intro-scene scene-geometry" aria-hidden="true">
        <span className="geo-circle" /><span className="geo-bar bar-a" /><span className="geo-bar bar-b" />
        <b>尘</b><small>万物皆微尘，自在。</small>
      </div>
      <div className="intro-scene scene-end" aria-hidden="true">
        <video
          ref={flowerTreeRef}
          className="flower-tree-video"
          src="./videos/flower-tree.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="scene-end-signature"><b>chen</b><span>take some time to live</span></div>
      </div>
      <span className="intro-finish" onAnimationEnd={onDone} aria-hidden="true" />
    </section>
  );
}

export function InteractiveStage() {
  const rootRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const introAudioRef = useRef<HTMLAudioElement | null>(null);
  const introDoneRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
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
    const forceIntro = new URLSearchParams(window.location.search).get("intro") === "1";
    if (forceIntro) sessionStorage.removeItem("take-some-time-entered");
    else if (sessionStorage.getItem("take-some-time-entered") === "yes") setStarted(true);
    return () => {
      media.removeEventListener("change", update);
      timelineRef.current?.kill();
      const audio = audioRef.current;
      audioRef.current = null;
      if (audio && audio.state !== "closed") {
        void audio.close().catch(() => undefined);
      }
      const introAudio = introAudioRef.current;
      if (introAudio) {
        introAudio.pause();
        introAudio.currentTime = 0;
        introAudioRef.current = null;
      }
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

  const animateStageEntrance = () => {
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

  const finishIntro = () => {
    if (introDoneRef.current) return;
    introDoneRef.current = true;
    const introAudio = introAudioRef.current;
    if (introAudio) {
      introAudio.pause();
      introAudio.currentTime = 0;
      introAudioRef.current = null;
    }
    sessionStorage.setItem("take-some-time-entered", "yes");
    if (new URLSearchParams(window.location.search).get("intro") === "1") {
      window.history.replaceState(null, "", window.location.pathname);
    }
    setIntroPlaying(false);
    setStarted(true);
    animateStageEntrance();
  };

  const launch = () => {
    playNote(523, .12);
    introDoneRef.current = false;
    if (reduceMotion) {
      sessionStorage.setItem("take-some-time-entered", "yes");
      setStarted(true);
      return;
    }
    // Start the extracted audio in the same click gesture that launches the intro,
    // which keeps sound playback compatible with mobile autoplay policies.
    const introAudio = new Audio("./audio/intro-sound.m4a");
    introAudio.preload = "auto";
    introAudio.volume = .9;
    introAudioRef.current = introAudio;
    void introAudio.play().catch(() => undefined);
    setIntroPlaying(true);
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
    const data = { title: "TAKE SOME TIME TO LIVE", text: "花·生 & 尘光的作品与生活影像空间", url: window.location.href };
    try {
      if (navigator.share) await navigator.share(data);
      else await navigator.clipboard.writeText(data.url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
      playNote(659, .09);
    } catch { /* The visitor may cancel the native share sheet. */ }
  };

  return (
    <main ref={rootRef} className={`site-shell ${started ? "is-started" : "is-closed"} ${active ? "has-panel" : ""}`} onPointerMove={trackEyes} aria-busy={transitioning || introPlaying}>
      {!started && !introPlaying && <section className="launch-screen"><button className="play-button" onClick={launch} aria-label="进入 TAKE SOME TIME TO LIVE"><span /></button><p>CLICK TO TAKE SOME TIME</p></section>}
      {introPlaying && <IntroCinema onDone={finishIntro} />}
      <section className="stage" aria-hidden={!started}>
        <div className="grain" />
        <div className="brand-plaque"><span /><h1>TAKE SOME TIME<br />TO LIVE</h1><small>花·生 & 尘光的生活实验室</small></div>
        <div className="cloud cloud-a" /><div className="cloud cloud-b" /><div className="cloud cloud-c" />
        <div className="mascot" aria-hidden="true"><span className="mascot-rope" /><div className="mascot-disc"><i className="eye left"><b /></i><i className="eye right"><b /></i></div><div className="mascot-smile" /><div className="enter-tag"><strong>ENTER</strong><small>LOOK AROUND</small></div></div>
        <nav className="object-nav" aria-label="主要栏目">{menuItems.map((item) => <MenuObject item={item} onSelect={openPanel} key={item.id} />)}</nav>
        {active && <div className="panel-zone"><div className="panel-rope left" /><div className="panel-rope right" /><section ref={panelRef} tabIndex={-1} className="hanging-panel" aria-live="polite"><button className="back-button" onClick={closePanel}>← BACK TO MENU</button><ActivePanel id={active} /></section></div>}
        <div className="signature-card"><i /><p><strong>花·生 & 尘光</strong><br /><span>TAKE SOME TIME TO LIVE © 2026</span></p><div className="utility-buttons"><button onClick={() => { setSoundOn((value) => !value); if (!soundOn) playNote(523); }} aria-pressed={soundOn}>{soundOn ? "SOUND ▮▮▮" : "SOUND OFF"}</button><button onClick={shareSite}>{copied ? "COPIED ✓" : "SHARE ↗"}</button></div></div>
      </section>
    </main>
  );
}
