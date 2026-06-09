import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const navLinks = [
  { label: "Poems", href: "#poems" },
  { label: "Sacred Scrolls", href: "#blog" },
  { label: "Realms", href: "#realms" },
  { label: "Oracle", href: "#about" },
  { label: "Commune", href: "#commune" },
];

const blogPosts = [
  {
    tag: "Fairy Lore",
    tagClass: "tag-fae",
    title: "The Court of Dusk Fairies: A Meditation on In-Between Places",
    excerpt:
      "There is a magic that lives only in thresholds - the breath before dawn, the heartbeat between sleep and waking...",
    meta: "Full Moon · Mar 2025",
  },
  {
    tag: "Mystical",
    tagClass: "tag-mystic",
    title: "Seven Names of the Moon Goddess: A Poetic Invocation",
    excerpt:
      "She has been called by a thousand names across a thousand lifetimes. Each name is a different facet of the same eternal light...",
    meta: "Waning Crescent · Feb 2025",
  },
  {
    tag: "Spiritual",
    tagClass: "tag-spirit",
    title: "On Grief & Growing: When the Forest Teaches You to Let Go",
    excerpt:
      "Some lessons only come in the language of roots and seasons. The forest does not mourn its leaves - it transforms them...",
    meta: "Dark Moon · Jan 2025",
  },
  {
    tag: "Poetry",
    tagClass: "tag-poetry",
    title: "Constellations She Named After Herself: A Collection",
    excerpt:
      "Six poems written during the meteor shower, when the sky felt like a mirror and every falling star whispered a truth...",
    meta: "New Moon · Jan 2025",
  },
  {
    tag: "Fairy Lore",
    tagClass: "tag-fae",
    title: "How to Hear the Whispering Wood: A Sensory Ritual for Poets",
    excerpt:
      "Stand at the edge of the treeline at dusk. Close your eyes. Breathe in once for the earth, once for the sky, and once for the space between...",
    meta: "Waxing Moon · Dec 2024",
  },
  {
    tag: "Mystical",
    tagClass: "tag-mystic",
    title: "The Alchemy of Words: Turning Pain into Sacred Poetry",
    excerpt:
      "Every wound is a doorway. Every scar a stanza. Poetry is not decoration - it is transmutation, the oldest magic known to women...",
    meta: "Full Moon · Dec 2024",
  },
];

const categories = [
  { label: "Moon Cycles", className: "cp1" },
  { label: "Fairy Courts", className: "cp2" },
  { label: "Starseed Verses", className: "cp3" },
  { label: "Original Poetry", className: "cp4" },
  { label: "Divine Feminine", className: "cp5" },
  { label: "Oracle Musings", className: "cp1" },
  { label: "Fairy Lore", className: "cp2" },
  { label: "Earth Rituals", className: "cp3" },
  { label: "Spells & Intentions", className: "cp4" },
  { label: "Metamorphosis", className: "cp5" },
];

function RuneDivider() {
  return (
    <div className="rune-divider" aria-hidden="true">
      ✦ ✧ ✦ ✧ ✦
    </div>
  );
}

function SectionHeading({ label, title, intro }) {
  return (
    <Fragment>
      <p className="section-label reveal">{label}</p>
      <h2 className="section-title reveal">{title}</h2>
      {intro ? <p className="section-intro reveal">{intro}</p> : null}
    </Fragment>
  );
}

function BlogCard({ tag, tagClass, title, excerpt, meta }) {
  return (
    <article className="blog-card reveal">
      <span className={`card-tag ${tagClass}`}>✦ {tag}</span>
      <h3 className="card-title">{title}</h3>
      <p className="card-excerpt">{excerpt}</p>
      <div className="card-meta">
        <span>{meta}</span>
        <a href="#" className="card-read">
          Read →
        </a>
      </div>
    </article>
  );
}

function App() {
  const shellRef = useRef(null);
  const cursorRef = useRef(null);
  const trailRef = useRef(null);
  const canvasRef = useRef(null);
  const [email, setEmail] = useState("");
  const [placeholder, setPlaceholder] = useState("your@email.com");

  useEffect(() => {
    const cursor = cursorRef.current;
    const trail = trailRef.current;
    if (!cursor || !trail || !window.matchMedia("(pointer: fine)").matches) {
      return undefined;
    }

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let frameId = 0;

    const handleMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animate = () => {
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return undefined;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const stars = [];
    let width = 0;
    let height = 0;
    let frameId = 0;

    const seedStars = () => {
      stars.length = 0;
      for (let index = 0; index < 220; index += 1) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 1.5 + 0.2,
          alpha: Math.random(),
          speed: Math.random() * 0.004 + 0.001,
          hue: Math.random() > 0.85 ? 280 : 260,
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedStars();
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      stars.forEach((star) => {
        star.alpha += star.speed;
        if (star.alpha > 1 || star.alpha < 0) {
          star.speed *= -1;
        }
        context.beginPath();
        context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        context.fillStyle = `hsla(${star.hue}, 80%, 85%, ${star.alpha})`;
        context.fill();
      });
      frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const glyphs = ["🧚", "✨", "🌸", "⭐", "🌟", "💫", "🦋", "🌙"];
    const timers = new Set();
    const nodes = new Set();

    const spawnFairy = () => {
      const fairy = document.createElement("div");
      fairy.className = "fairy";
      fairy.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      fairy.style.left = `${Math.random() * 100}vw`;
      fairy.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;

      const duration = 8 + Math.random() * 10;
      fairy.style.animationDuration = `${duration}s`;
      document.body.appendChild(fairy);
      nodes.add(fairy);

      const timeoutId = window.setTimeout(() => {
        fairy.remove();
        nodes.delete(fairy);
        timers.delete(timeoutId);
      }, duration * 1000);

      timers.add(timeoutId);
    };

    const intervalId = window.setInterval(spawnFairy, 1800);

    for (let index = 0; index < 5; index += 1) {
      const timeoutId = window.setTimeout(() => {
        spawnFairy();
        timers.delete(timeoutId);
      }, index * 400);
      timers.add(timeoutId);
    }

    return () => {
      window.clearInterval(intervalId);
      timers.forEach((timerId) => window.clearTimeout(timerId));
      timers.clear();
      nodes.forEach((node) => node.remove());
      nodes.clear();
    };
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) {
      return undefined;
    }

    const targets = shell.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((node) => node.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.includes("@")) {
      setEmail("");
      setPlaceholder("✦ You have joined the sacred circle ✦");
    }
  };

  return (
    <div className="app-shell" ref={shellRef}>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-trail" ref={trailRef} />
      <canvas id="starfield" ref={canvasRef} />

      <nav>
        <a href="#top" className="nav-logo">
          ✦ G&P ✦
        </a>
        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-orb orb1" />
          <div className="hero-orb orb2" />
          <div className="hero-orb orb3" />
          <p className="hero-eyebrow">✦ A Sanctuary of Words ✦</p>
          <h1 className="hero-title">
            Goddesses
            <br />
            &amp; Poets
          </h1>
          <p className="hero-subtitle">Laura · Mitchella · Agina</p>
          <p className="hero-byline">
            Where ancient magic meets starlit verse - a realm of fairies, mystic revelations,
            and poetry born from the sacred feminine.
          </p>
          <div className="hero-cta">
            <a href="#poems" className="btn-primary">
              Enter the Realm
            </a>
            <a href="#blog" className="btn-ghost">
              Read the Scrolls
            </a>
          </div>
          <div className="scroll-rune">
            <span>↓</span>
            descend
          </div>
        </section>

        <section id="poems">
          <SectionHeading
            label="✦  The Oracle Speaks  ✦"
            title="Featured Verse"
            intro="Each poem is a spell - cast with intention, received with wonder."
          />
          <div className="poem-stage reveal">
            <p className="poem-title-tag">~ The Forest Between Stars ~</p>
            <div className="poem-body">
              She walks where moonlight
              {"\n"}weaves its silver thread
              {"\n"}through branches no mortal eye
              {"\n"}has ever seen -
              {"\n\n"}Her name is older
              {"\n"}than the <em>first word</em>,
              {"\n"}written on the wings
              {"\n"}of every forgotten fairy queen.
              {"\n\n"}She is the space between
              {"\n"}the thunder and the rain,
              {"\n"}the echo of a goddess
              {"\n"}
              <em>remembering her name</em>.
              {"\n\n"}In the cathedral of the wild,
              {"\n"}where ferns bow to ancient stone,
              {"\n"}she speaks in constellations -
              {"\n"}and the universe comes home.
            </div>
            <p className="poem-author">- Laura Mitchella Agina</p>
          </div>
        </section>

        <RuneDivider />

        <section id="blog">
          <SectionHeading
            label="✦  Sacred Scrolls  ✦"
            title="From the Grimoire"
            intro="Musings on magic, moonlight, and the language of the soul."
          />
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <BlogCard key={post.title} {...post} />
            ))}
          </div>
        </section>

        <RuneDivider />

        <section id="realms">
          <SectionHeading
            label="✦  Navigate  ✦"
            title="The Realms"
            intro="Choose your portal and wander through the worlds within this grimoire."
          />
          <div className="categories-wrap reveal">
            {categories.map((category) => (
              <a key={category.label} href="#" className={`cat-pill ${category.className}`}>
                {category.label}
              </a>
            ))}
          </div>
        </section>

        <RuneDivider />

        <section id="about">
          <SectionHeading label="✦  The Oracle  ✦" title="Who Walks Here" />
          <div className="about-inner">
            <div className="about-glyph reveal">
              <div className="glyph-ring">
                <div className="glyph-inner">🌙</div>
              </div>
            </div>
            <div className="about-text reveal">
              <h3>Goddess · Poet · Wanderer</h3>
              <p>
                I am Laura - and also Mitchella, and Agina. Like the moon, I wear many faces, and
                I speak in many tongues. Each name is a different door into the same sacred house.
              </p>
              <p>
                This space was born from a need to speak the unspeakable - the language of ferns
                after rain, of starlight on still water, of grief transmuted into gold. Here,
                poetry is ritual and mysticism is mother tongue.
              </p>
              <p>
                Welcome to the wild, luminous, in-between place. Pull up a root. Stay awhile. The
                fairies have been expecting you.
              </p>
              <div className="name-trio">
                <span className="name-badge">Laura</span>
                <span className="name-badge">Mitchella</span>
                <span className="name-badge">Agina</span>
              </div>
            </div>
          </div>
        </section>

        <RuneDivider />

        <section id="commune">
          <SectionHeading label="✦  Join the Circle  ✦" title="The Sacred Commune" />
          <div className="newsletter-box reveal">
            <h3>Whispers to Your Inbox</h3>
            <p>
              New poems, moon musings, fairy dispatches, and mystical meditations - delivered
              with every new moon and full moon cycle.
            </p>
            <form className="newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter-input"
                placeholder={placeholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <button className="newsletter-btn" type="submit">
                Join the Coven
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-logo">✦ Goddesses &amp; Poets ✦</div>
        <ul className="footer-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <p className="footer-copy">© 2025 Laura Mitchella Agina · All spells reserved · Made under moonlight</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
