import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useTransform,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

import bgHero from "@/assets/bg-hero.jpg";
import envelopeClosed from "@/assets/envelope-closed.png";
import envelopeOpen from "@/assets/envelope-open.png";
import story1 from "@/assets/story-1.jpeg";
import story2 from "@/assets/story-2.jpeg";
import story3 from "@/assets/story-3.jpeg";
import story4 from "@/assets/story-4.jpeg";
import story5 from "@/assets/story-5.jpeg";
import story6 from "@/assets/story-6.jpeg";
import story7 from "@/assets/story-6.jpeg";
import story8 from "@/assets/story-8.jpeg";
import floralWreath from "@/assets/floral-wreath.png";
import decoBurgundy from "@/assets/deco-burgundy-bouquet.png";
import decoWhiteOrchid from "@/assets/deco-white-orchid.png";
import decoVine from "@/assets/deco-hanging-vine.png";
import decoWaxSeal from "@/assets/deco-wax-seal.png";
import decoCherry from "@/assets/deco-cherry-blossom.png";
import decoHibiscus from "@/assets/deco-gold-hibiscus.png";

/* ---------- Animated decoration wrappers ---------- */
type DecoProps = {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
};

function Sway({ src, className = "", style, rotate = 0, delay = 0, amount = 4 }: DecoProps & { delay?: number; amount?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ transformOrigin: "top center", ...style }}
      initial={{ opacity: 0, y: -10, rotate: rotate - amount }}
      whileInView={{ opacity: 1, y: 0, rotate: [rotate - amount, rotate + amount, rotate - amount] }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        opacity: { duration: 1, delay },
        y: { duration: 1, delay },
        rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

function Float({ src, className = "", style, rotate = 0, delay = 0 }: DecoProps & { delay?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.9, rotate }}
      whileInView={{ opacity: 1, scale: 1, y: [0, -6, 0], rotate }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1.1, delay },
        y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

function Drift({ src, className = "", style, delay = 0, range = 10 }: DecoProps & { delay?: number; range?: number }) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={style}
      initial={{ opacity: 0, y: -8, rotate: -range }}
      whileInView={{ opacity: 1, y: [0, 8, 0], rotate: [-range, range, -range] }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        opacity: { duration: 1.2, delay },
        y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

/* ---------- Envelope (Section 1) ---------- */
function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const handle = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1800);
  };
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.button
        onClick={handle}
        initial={{ y: 40, opacity: 0, scale: 0.9 }}
        animate={{
          y: opening ? -10 : [0, -6, 0],
          opacity: 1,
          scale: opening ? 1.04 : 1,
        }}
        transition={{
          y: opening
            ? { duration: 0.6 }
            : { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 1.2, delay: 0.4 },
          scale: { duration: 1.2, delay: 0.4 },
        }}
        className="relative"
        style={{ width: "min(82vw, 340px)" }}
        aria-label="Open invitation"
      >
        <AnimatePresence mode="wait">
          {!opening ? (
            <motion.img
              key="closed"
              src={envelopeClosed}
              alt=""
              className="w-full h-auto block drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, rotateX: -8 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.img
              key="open"
              src={envelopeOpen}
              alt=""
              className="w-full h-auto block drop-shadow-[0_24px_44px_rgba(0,0,0,0.6)]"
              initial={{ opacity: 0, scale: 0.96, rotateX: 8 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.button>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: opening ? 0 : 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-[12%] left-0 right-0 text-center font-script text-[#f5d98a] text-3xl tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
      >
        Click to Open Invitation
      </motion.p>
    </div>
  );
}

/* ---------- Section wrapper ---------- */
function FadeSection({
  index,
  children,
  className = "",
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative h-[100dvh] w-full snap-start flex items-center justify-center ${className}`}
      data-section={index}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.02, y: -30 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ---------- Plain main image (no overlays/borders) ---------- */
function MainImg({
  image,
  width = "92%",
  maxWidth = 380,
  ratio = "1 / 1.4",
  rounded = "rounded-sm",
  extraStyle,
}: {
  image: string;
  width?: string;
  maxWidth?: number;
  ratio?: string;
  rounded?: string;
  extraStyle?: React.CSSProperties;
}) {
  return (
    <motion.img
      src={image}
      alt=""
      loading="lazy"
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`block object-cover ${rounded}`}
      style={{ width, maxWidth, aspectRatio: ratio, ...extraStyle }}
    />
  );
}

/* ---------- Image frame wrapper: decorations attach to image corners ---------- */
function ImageFrame({
  image,
  children,
  ratio = "1 / 1.4",
  rounded = "rounded-sm",
  circle = false,
}: {
  image: string;
  children?: React.ReactNode;
  ratio?: string;
  rounded?: string;
  circle?: boolean;
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      <div
        className="relative"
        style={{ width: "92%", maxWidth: 380, aspectRatio: circle ? "1" : ratio }}
      >
        <motion.img
          src={image}
          alt=""
          loading="lazy"
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`block w-full h-full object-cover ${circle ? "rounded-full" : rounded}`}
        />
        {children}
      </div>
    </div>
  );
}

/* ---------- Outside decoration — anchored to image corner, fully outside the frame ---------- */
type Anchor = "tl" | "tr" | "bl" | "br";
function OutsideDeco({
  src,
  anchor,
  size = "55%",
  delay = 0,
  rotate = 0,
}: {
  src: string;
  anchor: Anchor;
  size?: string;
  delay?: number;
  rotate?: number;
}) {
  // Anchors element so its body sits OUTSIDE the image, with one inner corner
  // just kissing the image corner (small overlap for "connected" feel).
  const pos: Record<Anchor, React.CSSProperties> = {
    tl: { right: "92%", bottom: "88%", transformOrigin: "bottom right" },
    tr: { left: "92%", bottom: "88%", transformOrigin: "bottom left" },
    bl: { right: "92%", top: "88%", transformOrigin: "top right" },
    br: { left: "92%", top: "88%", transformOrigin: "top left" },
  };
  const swayDir = anchor === "tl" || anchor === "br" ? [-2, 2, -2] : [2, -2, 2];
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className="pointer-events-none select-none absolute"
      style={{
        width: size,
        height: "auto",
        filter: "drop-shadow(0 8px 18px rgba(60,10,20,0.22))",
        ...pos[anchor],
      }}
      initial={{ opacity: 0, scale: 0.9, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, scale: 1, rotate: swayDir.map((d) => rotate + d) }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        opacity: { duration: 1.1, delay },
        scale: { duration: 1.1, delay, ease: "easeOut" },
        rotate: { duration: 9, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

/* ---------- Story layouts — curated decorations per section ---------- */
type DecoSpec = { src: string; anchor: Anchor; size?: string; rotate?: number; delay?: number };

function StoryLayout({
  image,
  variant,
  decos,
}: {
  image: string;
  variant: number;
  decos: DecoSpec[];
}) {
  if (variant === 3) {
    return (
      <ImageFrame image={image} circle>
        <Float src={floralWreath} className="absolute -inset-6 w-[calc(100%+3rem)] opacity-55 pointer-events-none" />
      </ImageFrame>
    );
  }
  return (
    <ImageFrame image={image}>
      {decos.map((d, i) => (
        <OutsideDeco key={i} {...d} />
      ))}
    </ImageFrame>
  );
}



// no-op placeholder to satisfy import surface
function Shimmer() {
  return null;
}

/* ---------- Music button ---------- */
const MUSIC_SRC =
  "https://res.cloudinary.com/dzgqaidej/video/upload/v1779900301/Jashn-E-BahaaraaInstrumental-Flute-A.R.Rahman_obyuwn.mp3";

function MusicButton() {
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = 0.5;
    if (on) a.play().catch(() => {});
    else a.pause();
  }, [on]);
  return (
    <>
      <audio ref={ref} src={MUSIC_SRC} loop preload="none" />
      <button
        aria-label={on ? "Pause music" : "Play music"}
        onClick={() => setOn((v) => !v)}
        className={`fixed bottom-5 right-5 z-50 w-12 h-12 rounded-full paper-burgundy gold-frame flex items-center justify-center text-[#f5d98a] ${
          on ? "pulse-ring" : ""
        }`}
      >
        {on ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 5v14l11-7z" />
          </svg>
        )}
      </button>
    </>
  );
}

/* ---------- Main experience ---------- */
const ALL_STORY_IMAGES = [
  story1, story2, story3, story4, story5, story6, story7, story8,
];

// Hide 3rd-last slide (the circle image variant). Story plan (variants):
// originally 8 image sections + 1 CTA. We want to comment out the 3rd-last
// (i.e. the slide with the circle wreath variant). Remove index 5 (story6)
// which previously used the circle layout.
const STORY_PLAN: { image: string; variant: number; decos: DecoSpec[] }[] = [
  // Welcome / royal — burgundy bouquet hangs from top-left, wax seal at bottom-right
  { image: story1, variant: 1, decos: [
    { src: decoBurgundy, anchor: "tl", size: "62%", rotate: -8 },
    { src: decoWaxSeal, anchor: "br", size: "28%" },
  ]},
  // Soft / ivory — single trailing white orchid from top-right
  { image: story2, variant: 5, decos: [
    { src: decoWhiteOrchid, anchor: "tr", size: "58%", rotate: 12 },
  ]},
  // Garden — hanging vine top-left, cherry blossom bottom-right
  { image: story3, variant: 2, decos: [
    { src: decoVine, anchor: "tl", size: "40%", rotate: -10 },
    { src: decoCherry, anchor: "br", size: "42%" },
  ]},
  // Sunlit / gold — single gold hibiscus bottom-right
  { image: story4, variant: 7, decos: [
    { src: decoHibiscus, anchor: "br", size: "48%", rotate: -15 },
  ]},
  // Romantic — cherry blossom top-left, vine bottom-right trailing
  { image: story5, variant: 4, decos: [
    { src: decoCherry, anchor: "tl", size: "44%", rotate: -8 },
    { src: decoVine, anchor: "br", size: "38%", rotate: 180 },
  ]},
  // { image: story6, variant: 3 },
  // Regal — burgundy bouquet top-right, wax seal bottom-left
  { image: story7, variant: 9, decos: [
    { src: decoBurgundy, anchor: "tr", size: "60%", rotate: 10 },
    { src: decoWaxSeal, anchor: "bl", size: "28%" },
  ]},
  // Finale — gold hibiscus top-right, white orchid bottom-left
  { image: story8, variant: 10, decos: [
    { src: decoHibiscus, anchor: "tr", size: "46%", rotate: 12 },
    { src: decoWhiteOrchid, anchor: "bl", size: "52%", rotate: -10 },
  ]},
];

void ALL_STORY_IMAGES;

function StoryStage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollHeight - el.clientHeight;
    scrollYProgress.set(max > 0 ? el.scrollTop / max : 0);
  };
  useEffect(() => { handleScroll(); }, []);

  return (
    <motion.div
      key="story"
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      {/* Soft ivory base background for all story sections */}
      <div className="absolute inset-0 bg-[#f8f1e4]" />
        
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 overflow-y-auto no-scrollbar snap-y snap-mandatory"
        style={{ scrollBehavior: "smooth" }}
      >
        {STORY_PLAN.map((s, i) => (
          <FadeSection key={i} index={i}>
            <StoryLayout image={s.image} variant={s.variant} decos={s.decos} />
          </FadeSection>
        ))}

        <FadeSection index={STORY_PLAN.length}>
          <div className="relative flex flex-col items-center justify-center px-8 text-center w-full">
            <img
              src={floralWreath}
              alt=""
              loading="lazy"
              className="absolute w-[110%] max-w-[520px] opacity-80 pointer-events-none"
            />
            <motion.a
              href="#"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.9 }}
              className="relative paper-burgundy gold-frame rounded-sm px-8 py-7 inline-flex flex-col items-center"
            >
              <div className="absolute inset-2 border border-[#c9a44c]/50 pointer-events-none rounded-sm" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#e8d5a8] mb-3">
                with love
              </span>
              <span className="font-script gold-text text-3xl leading-tight">
                for more details
              </span>
              <span className="font-script gold-text text-3xl leading-tight">
                please click here
              </span>
              <span className="mt-4 text-[10px] tracking-[0.4em] uppercase text-[#f5d98a]/80">
                open wedding website
              </span>
            </motion.a>
          </div>
        </FadeSection>
      </div>
    </motion.div>
  );
}

// preserve unused exports to avoid TS warnings
void useTransform;
void (null as unknown as MotionValue<number>);

function Experience() {
  const [stage, setStage] = useState<"envelope" | "story">("envelope");

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#1a0608]">
      <AnimatePresence>
        {stage === "envelope" && (
          <motion.div
            key="hero-bg"
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 14, ease: "easeOut" } }}
            style={{
              backgroundImage: `url(${bgHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        )}
      </AnimatePresence>
      {stage === "envelope" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40 pointer-events-none" />
      )}

      <AnimatePresence mode="wait">
        {stage === "envelope" && (
          <motion.div
            key="envelope"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <Envelope onOpen={() => setStage("story")} />
          </motion.div>
        )}

        {stage === "story" && <StoryStage key="story" />}
      </AnimatePresence>

      <MusicButton />
    </div>
  );
}

/* ---------- Mobile-only gate ---------- */
function MobileOnlyGate({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="hidden md:flex fixed inset-0 z-[100] paper-burgundy items-center justify-center text-center px-10">
        <div className="max-w-sm">
          <div className="font-script gold-text text-5xl mb-4">Pranay &amp; Binita</div>
          <p className="text-[#f5d98a]/80 text-sm tracking-widest uppercase">
            This invitation is best experienced on a mobile device.
            <br />
            Please open on your phone.
          </p>
        </div>
      </div>
      <div className="md:hidden">{children}</div>
    </>
  );
}

export default function App() {
  return (
    <MobileOnlyGate>
      <Experience />
    </MobileOnlyGate>
  );
}
