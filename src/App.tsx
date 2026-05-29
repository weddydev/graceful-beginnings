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
import redseal from "@/assets/red-seal.png";
import green2flower from "@/assets/greenflower.png";
import goldbutter from  "@/assets/gold-butter.png";
import goldcorner from  "@/assets/gold-corner.png";
import story1 from "@/assets/story-1.jpeg";
import greenflower from "@/assets/green-flower.png";
import story2 from "@/assets/story-2.jpeg";
import story3 from "@/assets/story-3.jpeg";
import story4 from "@/assets/story-4.jpeg";
import story5 from "@/assets/story-5.jpeg";
import story6 from "@/assets/story-6.jpeg";
import story7 from "@/assets/story-6.jpeg";
import story8 from "@/assets/story-8.jpeg";
import floralWreath from "@/assets/floral-wreath.png";
import twoswans from "@/assets/two-swans.png";
import decoBurgundy from "@/assets/deco-burgundy-bouquet.png";
import decoWhiteOrchid from "@/assets/deco-white-orchid.png";
import decoVine from "@/assets/deco-hanging-vine.png";
import decoWaxSeal from "@/assets/deco-wax-seal.png";
import decoCherry from "@/assets/deco-cherry-blossom.png";
import decoHibiscus from "@/assets/deco-gold-hibiscus.png";
import swan from "@/assets/e-swan.png";
import butterfly from "@/assets/e-butterfly.png";
import feather from "@/assets/e-feather.png";
import pigeon from "@/assets/e-pigeon.png";
import ribbon from "@/assets/e-ribbon.png";
import cornerframe from "@/assets/e-corner-frame.png";
import horizontalflowers from "@/assets/e-horizontal-flowers.png";
import verticalflowers from "@/assets/e-vertical-flowers.png";
import orntassle from "@/assets/orn-tassel.png";
import boquet from "@/assets/deco-burgundy-bouquet.png";
import ornpearl from "@/assets/orn-pearl.png";

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
  ratio = "1 / 1.5",
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
  ratio = "1 / 1.5",
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

/* ============================================================================
   DECORATION POSITIONING — fully adjustable by numbers
   ----------------------------------------------------------------------------
   Each deco is placed RELATIVE TO THE IMAGE (not the viewport), so its
   position stays identical across every mobile screen size.

   All numbers are in % of the IMAGE box (width or height of the photo frame).

     x        →  horizontal anchor, 0 = left edge of image, 100 = right edge
     y        →  vertical anchor,   0 = top edge of image,  100 = bottom edge
     size     →  width of the deco, as % of the image width
     rotate   →  rotation in degrees (negative = counter-clockwise)
     delay    →  animation delay in seconds (optional)
     sway     →  idle sway amplitude in degrees (optional, default 2)

   The deco is CENTERED on (x, y). To put it OUTSIDE the image:
     • use x < 0 or x > 100 to push past the left/right edge
     • use y < 0 or y > 100 to push past the top/bottom edge
   Examples:
     { x: -10, y: 10,  size: 50 }  → hugs top-left corner, mostly outside
     { x: 110, y: 95,  size: 35 }  → hangs off bottom-right corner
     { x: 50,  y: -15, size: 40 }  → crown on top center, outside
   ========================================================================== */
type DecoSpec = {
  src: string;
  x: number;
  y: number;
  size: number;
  rotate?: number;
  delay?: number;
  sway?: number;
};

function Deco({ src, x, y, size, rotate = 0, delay = 0, sway = 2 }: DecoSpec) {
  return (
    <motion.img
      src={src}
      alt=""
      loading="lazy"
      aria-hidden
      className="pointer-events-none select-none absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}%`,
        height: "auto",
        transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
        transformOrigin: "center center",
        filter: "drop-shadow(0 8px 18px rgba(60,10,20,0.22))",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{
        opacity: 1,
        scale: 1,
        rotate: [rotate - sway, rotate + sway, rotate - sway],
      }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        opacity: { duration: 1.1, delay },
        scale: { duration: 1.1, delay, ease: "easeOut" },
        rotate: { duration: 9, repeat: Infinity, ease: "easeInOut", delay },
      }}
    />
  );
}

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
        <Deco key={i} {...d} />
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

/* ============================================================================
   PER-SECTION DECORATION CONFIG
   ----------------------------------------------------------------------------
   TWEAK THESE NUMBERS to move / resize / rotate any decoration.
   All values are RELATIVE TO THE IMAGE (% of image width or height), so the
   layout stays identical on every phone size.

     x       0–100 → center INSIDE image | <0 = past left | >100 = past right
     y       0–100 → center INSIDE image | <0 = past top  | >100 = past bottom
     size    width of deco as % of image width
     rotate  degrees (negative = counter-clockwise)
     sway    optional idle wobble in degrees (default 2)
     delay   optional animation delay in seconds
   ========================================================================== */
const STORY_PLAN: { image: string; variant: number; decos: DecoSpec[] }[] = [
  // 1 — Welcome / royal
  { image: story1, variant: 1, decos: [
    { src: horizontalflowers, x: 8, y: -37,  size: 82, rotate: 8 },
    { src: green2flower,  x: 88, y: 88,  size: 25, rotate: 28 },
  ]},
  // 2 — Soft / ivory
  { image: story2, variant: 5, decos: [
    { src: decoHibiscus, x: 78, y: 90, size: 30, rotate: 15 },
    { src: feather, x: -4, y: -30, size: 50, rotate: 12 },
  ]},
  // 3 — Garden
  { image: story4, variant: 2, decos: [
    // { src: decoVine,   x: -6,  y: -4,  size: 32, rotate: -15 },
    // { src: decoCherry, x: 64, y: -20,  size: 52, rotate: 10 },
    { src: swan, x: 46, y: -35, size: 70, rotate: 0 },
    { src: orntassle, x: -6, y: 100, size: 30, rotate: 0 },
  ]},
  // 4 — Sunlit / gold
  { image: story3, variant: 7, decos: [
    { src: greenflower, x: -8, y: -24, size: 25, rotate: 0 },
    { src: decoHibiscus, x: 80, y: 88, size: 32, rotate: -18 },
  ]},
    // 5 — Romantic
    { image: story5, variant: 4, decos: [
    { src: ornpearl, x: 50, y: -20, size: 150, rotate: 0 },
    // { src: pigeon, x: -14,  y: -52,   size: 68, rotate: -5 },
    { src: decoCherry,   x:-19, y: 76, size: 68, rotate: 15 },
  ]},
  // 6 — Regal
  { image: story7, variant: 9, decos: [
    { src: goldbutter, x: 79, y: 90, size: 36, rotate: 0 },
    { src: goldcorner,  x: -12,  y: -22, size: 48, rotate: 0 },
  ]},
  // 7 — Finale
  { image: story8, variant: 10, decos: [
    { src: decoHibiscus,    x: -10, y: 90,  size: 38, rotate: 15 },
    { src: decoWhiteOrchid, x: 66,  y: -18,  size: 56, rotate: -12 },
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
            <h2 style={{ fontSize: "1.5rem" , fontWeight: "bold" }}>Wedding Weekend Details</h2>
            <span>Visit our wedding website below for all event details and RSVP information.</span>
            <img src={redseal} className="absolute w-[20%] max-w-[520px] opacity-100 pointer-events-none" style={{ left: "50% ", top: "-30%", transform: "translate(-50%, -50%)" }} alt="" />
            <img
              src={boquet}
              alt=""
              loading="lazy"
              className="absolute w-[80%]  max-w-[520px] opacity-100 pointer-events-none"
              style={{ left: "20% ", top: "-30%", transform: "translate(-50%, -50%)" }}
            />
            <motion.a
              href="https://withjoy.com/pranay-and-binita?utm_medium=web&utm_source=joy&utm_campaign=website_overview_copy"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.9 }}
              className="relative paper-burgundy gold-frame rounded-sm px-8 py-4 inline-flex flex-col items-center mt-5"
            >
              <div className="absolute inset-2 border border-[#c9a44c]/50 pointer-events-none rounded-sm " />
              
              <span className="font-script gold-text text-3xl leading-tight ">
                Visit Website
              </span>
              
            </motion.a>
          </div>
          <img className="absolute w-[100%] max-w-[520px] opacity-100 pointer-events-none" style={{ left: "50%", top: "80%", transform: "translate(-50%, -50%)" }} src={twoswans} alt="" />
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
