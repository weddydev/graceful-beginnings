import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Heart, Sparkles } from "lucide-react";

import closedEnvelope from "@/assets/envelope-closed.png";
import openEnvelope from "@/assets/envelope-open.png";
import sectionBrunch from "@/assets/section-brunch.png";
import sectionHaldi from "@/assets/section-haldi.png";
import sectionMehendi from "@/assets/section-mehendi.png";
import sectionReception from "@/assets/section-reception.png";
import sectionSangeet from "@/assets/section-sangeet.png";
import sectionWedding from "@/assets/section-wedding.png";
import sectionWelcome from "@/assets/section-welcome.png";
import swanOverlay from "@/assets/swan-overlay.png";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ScratchNameCardProps = {
  accent: "burgundy" | "blush";
  label: string;
  name: string;
  onReveal: () => void;
  revealed: boolean;
};

type SectionScene = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
  vibe: "royal" | "sunlit" | "garden" | "postal" | "ceremony" | "night";
};

const imageSections: SectionScene[] = [
  {
    id: "welcome",
    title: "A royal first chapter",
    subtitle: "Monogram, tassel, and lotus details set the tone for the story ahead.",
    image: sectionWelcome,
    alt: "A royal burgundy wedding invitation with lotus florals and tassel details.",
    vibe: "royal",
  },
  {
    id: "haldi",
    title: "Haldi & Holi",
    subtitle: "Morning light, citrus florals, and joyous color in a gilded composition.",
    image: sectionHaldi,
    alt: "A golden haldi invitation card with ornate floral borders and citrus bouquet.",
    vibe: "sunlit",
  },
  {
    id: "mehendi",
    title: "Mehendi & Masti",
    subtitle: "A garden paper panel with hand-drawn warmth, tea steam, and delicate ornament.",
    image: sectionMehendi,
    alt: "A green and ivory mehendi invitation with floral border and illustrated tea cup.",
    vibe: "garden",
  },
  {
    id: "sangeet",
    title: "Sangeet Night",
    subtitle: "Vintage postage drama, celebratory rhythm, and movement framed like an heirloom poster.",
    image: sectionSangeet,
    alt: "A vintage-inspired blue sangeet invitation poster with dancers and postage motifs.",
    vibe: "postal",
  },
  {
    id: "wedding",
    title: "The ceremony",
    subtitle: "Ivory arches, peacock elegance, and the serenity of an embossed ceremonial card.",
    image: sectionWedding,
    alt: "An ornate red and ivory wedding ceremony invitation with arch motif and peacock illustration.",
    vibe: "ceremony",
  },
  {
    id: "reception",
    title: "Reception under chandeliers",
    subtitle: "Black lacquer, gold botanicals, and candlelit glamour for the final evening scene.",
    image: sectionReception,
    alt: "A black and gold reception invitation with chandelier and botanical frame.",
    vibe: "night",
  },
  {
    id: "brunch",
    title: "A farewell brunch",
    subtitle: "Soft striped paper and riverside calm for the last gentle page of the weekend.",
    image: sectionBrunch,
    alt: "An oval farewell brunch invitation with pastoral landscape and striped border.",
    vibe: "sunlit",
  },
];

function ScratchNameCard({ accent, label, name, onReveal, revealed }: ScratchNameCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const drawingRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  const gradientStops = useMemo(
    () =>
      accent === "burgundy"
        ? {
            start: "rgba(84, 16, 30, 0.98)",
            mid: "rgba(140, 37, 56, 0.95)",
            end: "rgba(214, 182, 120, 0.88)",
          }
        : {
            start: "rgba(171, 95, 116, 0.98)",
            mid: "rgba(218, 156, 170, 0.94)",
            end: "rgba(244, 214, 184, 0.9)",
          },
    [accent],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || revealed) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const { width, height } = wrapper.getBoundingClientRect();
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, gradientStops.start);
      gradient.addColorStop(0.55, gradientStops.mid);
      gradient.addColorStop(1, gradientStops.end);
      context.clearRect(0, 0, width, height);
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      context.globalAlpha = 0.16;
      for (let i = 0; i < 26; i += 1) {
        context.fillStyle = i % 2 === 0 ? "rgba(255,255,255,0.24)" : "rgba(255,240,214,0.28)";
        context.beginPath();
        context.arc(
          18 + ((i * 37) % width),
          14 + ((i * 29) % height),
          (i % 3) + 1.2,
          0,
          Math.PI * 2,
        );
        context.fill();
      }
      context.globalAlpha = 1;
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "rgba(255, 233, 196, 0.55)";
      context.lineWidth = 1;
      context.strokeRect(10, 10, width - 20, height - 20);

      context.fillStyle = "rgba(255, 246, 225, 0.95)";
      context.font = `600 ${Math.max(24, width / 8)}px var(--font-script)`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, width / 2, height / 2 + 4);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [gradientStops, isMounted, label, revealed]);

  const getPoint = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const scratch = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    const { x, y } = getPoint(event);
    context.globalCompositeOperation = "destination-out";
    context.beginPath();
    context.arc(x, y, 24, 0, Math.PI * 2);
    context.fill();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;
    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 30) transparent += 1;
    }

    if (transparent / (data.length / 4) > 0.38) {
      onReveal();
    }
  };

  return (
    <div
      className={cn(
        "invitation-card relative isolate overflow-hidden px-5 py-6 sm:px-8 sm:py-8",
        accent === "burgundy" ? "card-burgundy" : "card-blush",
      )}
    >
      <div className="invitation-card__frame" />
      <div className="invitation-card__ornament invitation-card__ornament--top" />
      <div className="invitation-card__ornament invitation-card__ornament--bottom" />
      <div className="relative z-10 flex min-h-[18rem] flex-col items-center justify-center gap-4 text-center sm:min-h-[24rem]">
        <p className="eyebrow">Revealed with love</p>
        <div className={cn("name-panel", revealed && "name-panel--revealed")}> 
          <p className="name-script">{name}</p>
          <p className="name-subtitle">Forever begins here</p>
        </div>
      </div>
      <div
        ref={wrapperRef}
        className={cn(
          "scratch-surface absolute inset-[12px] z-20 transition-opacity duration-700 sm:inset-[18px]",
          revealed && "pointer-events-none opacity-0",
        )}
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full touch-none rounded-[2rem]"
          onPointerDown={(event) => {
            drawingRef.current = true;
            scratch(event);
          }}
          onPointerMove={(event) => {
            if (!drawingRef.current) return;
            scratch(event);
          }}
          onPointerUp={() => {
            drawingRef.current = false;
            checkReveal();
          }}
          onPointerLeave={() => {
            drawingRef.current = false;
            checkReveal();
          }}
        />
      </div>
    </div>
  );
}

function LuxuryScene({ section, index }: { section: SectionScene; index: number }) {
  return (
    <section className={cn("scene-band", `scene-band--${section.vibe}`)} aria-labelledby={`${section.id}-title`}>
      <div className="scene-shell">
        <div className={cn("scene-layout", index % 2 === 1 && "scene-layout--reverse")}>
          <div className="scene-copy">
            <p className="eyebrow">Invitation scene {String(index + 1).padStart(2, "0")}</p>
            <h2 id={`${section.id}-title`} className="scene-title">
              {section.title}
            </h2>
            <p className="scene-subtitle">{section.subtitle}</p>
          </div>

          <div className={cn("scene-frame", `scene-frame--${section.vibe}`)}>
            <div className="scene-decor scene-decor--top" aria-hidden="true" />
            <div className="scene-decor scene-decor--bottom" aria-hidden="true" />
            <img
              src={section.image}
              alt={section.alt}
              loading="lazy"
              className="scene-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WeddingInvitationExperience() {
  const [introVisible, setIntroVisible] = useState(true);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [firstRevealed, setFirstRevealed] = useState(false);
  const [secondRevealed, setSecondRevealed] = useState(false);
  const scratchSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 1450);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!envelopeOpened) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
    const timer = window.setTimeout(() => {
      scratchSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 440);

    return () => {
      window.clearTimeout(timer);
    };
  }, [envelopeOpened]);

  const allRevealed = firstRevealed && secondRevealed;

  return (
    <main className="invitation-root">
      <section className="hero-stage" aria-label="Luxury wedding invitation introduction">
        <div className={cn("hero-aura", introVisible && "hero-aura--active")} aria-hidden="true" />
        <div className={cn("hero-vignette", introVisible && "hero-vignette--active")} aria-hidden="true" />

        <div className="hero-shell">
          <div className={cn("swan-scene", !introVisible && "swan-scene--settled")} aria-hidden="true">
            <img src={swanOverlay} alt="" className="swan-scene__image" width={1024} height={1024} />
          </div>

          <div className={cn("envelope-stage", envelopeOpened && "envelope-stage--opened")}>
            <div className="hero-copy">
              <p className="eyebrow">A handcrafted invitation</p>
              <h1 className="hero-title">Pranay &amp; Binita</h1>
              <p className="hero-subtitle">
                A cinematic wedding story unfolding like a treasured invitation set.
              </p>
            </div>

            <div className="envelope-stack" role="group" aria-label="Wedding invitation envelope">
              <img
                src={openEnvelope}
                alt="Open wedding invitation envelope"
                width={832}
                height={1472}
                className="envelope envelope--open"
              />
              <img
                src={closedEnvelope}
                alt="Closed wedding invitation envelope"
                width={832}
                height={1472}
                className="envelope envelope--closed"
              />
              <button
                type="button"
                className={cn("wax-seal", envelopeOpened && "wax-seal--opened")}
                onClick={() => setEnvelopeOpened(true)}
                aria-label="Open the invitation"
                disabled={envelopeOpened}
              >
                <span className="wax-seal__crest">PB</span>
                <span className="wax-seal__label">click to open</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={scratchSectionRef}
        className={cn("reveal-stage", envelopeOpened && "reveal-stage--visible")}
        aria-labelledby="names-title"
      >
        <div className="reveal-heading">
          <p className="eyebrow">Scratch the foil to reveal the names</p>
          <h2 id="names-title" className="reveal-title">
            Two invitation keepsakes, one love story.
          </h2>
        </div>

        <div className="scratch-grid">
          <ScratchNameCard
            accent="burgundy"
            label="Mr"
            name="Pranay"
            revealed={firstRevealed}
            onReveal={() => setFirstRevealed(true)}
          />

          <div className={cn("union-mark", allRevealed && "union-mark--revealed")} aria-hidden="true">
            <span>&amp;</span>
            <Sparkles className="union-mark__spark union-mark__spark--left" />
            <Sparkles className="union-mark__spark union-mark__spark--right" />
          </div>

          <ScratchNameCard
            accent="blush"
            label="Mrs"
            name="Binita"
            revealed={secondRevealed}
            onReveal={() => setSecondRevealed(true)}
          />
        </div>

        <div className={cn("scroll-invitation", allRevealed && "scroll-invitation--visible")}>
          <Heart className="h-4 w-4" />
          <span>Scroll to enter the invitation suite</span>
        </div>
      </section>

      <section className="story-intro" aria-label="Wedding story intro">
        <div className="story-intro__inner">
          <p className="eyebrow">Editorial invitation suite</p>
          <h2 className="story-intro__title">Each section is styled like a distinct ceremonial card.</h2>
          <p className="story-intro__text">
            Floral borders, wax-seal cues, tassel-inspired framing, embossed paper tones, and soft
            cinematic motion guide the full invitation experience.
          </p>
          <Button
            variant="invitation"
            size="invitation"
            onClick={() =>
              document.getElementById(imageSections[0].id)?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore the suite
          </Button>
        </div>
      </section>

      <div className="scenes-wrap">
        {imageSections.map((section, index) => (
          <div key={section.id} id={section.id}>
            <LuxuryScene section={section} index={index} />
          </div>
        ))}
      </div>
    </main>
  );
}
