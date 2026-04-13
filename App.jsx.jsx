import { useEffect, useMemo, useState } from "react";

export default function MoonlightWeddingInvitation() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --bg1: #08101f;
          --bg2: #111c33;
          --gold: #d7a84b;
          --gold-soft: #f0d290;
          --line: rgba(255,255,255,0.18);
          --text-soft: rgba(255,255,255,0.82);
        }

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }

        .font-display { font-family: 'Cormorant Garamond', serif; }
        .font-body { font-family: 'Inter', sans-serif; }

        .night-sky {
          --forest-bottom: clamp(0px, 1vh, 12px);
          --forest-height: clamp(108px, 14vw, 170px);
          --mist-overlap: clamp(22px, 3vh, 40px);
          --glow-lift: clamp(18px, 2.4vh, 34px);
          background:
            radial-gradient(circle at 50% 38%, rgba(255,255,255,0.22), transparent 16%),
            linear-gradient(180deg, #223a6b 0%, #122754 26%, #08193d 58%, #061129 100%);
          position: relative;
          overflow: hidden;
        }

        .night-sky::before,
        .night-sky::after {
          background: radial-gradient(circle at 50% 42%, rgba(255,255,255,0.18), transparent 26%);
          opacity: 0.78;
        }

        .moon {
          position: absolute;
          top: 32px;
          left: 46px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          box-shadow: 10px 0 0 0 #f5e6b8;
          transform: rotate(-18deg);
          opacity: 0.95;
          filter: drop-shadow(0 0 10px rgba(255,244,200,0.45));
        }

        .hill {
          position: absolute;
          bottom: 0;
          background: linear-gradient(180deg, rgba(13,28,64,0.98), rgba(8,18,43,1));
          z-index: 1;
        }

        .hill.left {
          left: -10%;
          width: 55%;
          height: 22%;
          border-top-right-radius: 60% 100%;
        }

        .hill.right {
          right: -10%;
          width: 55%;
          height: 25%;
          border-top-left-radius: 60% 100%;
        }

        .mist {
          position: absolute;
          left: 50%;
          bottom: calc(var(--forest-bottom) + var(--forest-height) - var(--mist-overlap));
          transform: translateX(-50%);
          width: 120%;
          height: 180px;
          pointer-events: none;
          z-index: 5;

          background:
            radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.12) 22%, rgba(255,255,255,0.05) 40%, transparent 70%),
            radial-gradient(ellipse at 30% 70%, rgba(255,255,255,0.12) 0%, transparent 60%),
            radial-gradient(ellipse at 70% 75%, rgba(255,255,255,0.10) 0%, transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,0.08), transparent 70%);

          filter: blur(18px);
          opacity: 0.65;
          animation: mistDrift 28s ease-in-out infinite alternate;
        }

        /* 🌙 volumetric moon rays */
        .moon-rays {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
          background:
            radial-gradient(circle at 60px 40px, rgba(255,255,210,0.25), transparent 120px),
            conic-gradient(from 210deg at 60px 40px,
              rgba(255,255,220,0.18),
              transparent 12deg,
              rgba(255,255,220,0.14) 20deg,
              transparent 32deg,
              rgba(255,255,220,0.12) 44deg,
              transparent 60deg
            );
          filter: blur(6px);
          opacity: .55;
          animation: moonRayMove 18s ease-in-out infinite alternate;
        }

        @keyframes moonRayMove {
          0% { opacity:.45; transform: translateY(0px) scale(1); }
          100% { opacity:.7; transform: translateY(8px) scale(1.05); }
        }

        @keyframes mistDrift {
          0% {
            transform: translateX(-50%) translateY(0px) scale(1);
            opacity: 0.55;
          }
          50% {
            transform: translateX(-48%) translateY(-6px) scale(1.04);
            opacity: 0.75;
          }
          100% {
            transform: translateX(-52%) translateY(4px) scale(0.98);
            opacity: 0.6;
          }
        }

        .forest-wrap {
          position: absolute;
          inset: auto 0 var(--forest-bottom) 0;
          height: var(--forest-height);
          z-index: 4;
          pointer-events: none;
          overflow: visible;
        }

        .forest-svg {
          position: absolute;
          left: -12%;
          bottom: 0;
          width: 124%;
          height: 100%;
          display: block;
          overflow: visible;
          z-index: 2;
        }

        

        .horizon-glow {
          position: absolute;
          left: 50%;
          bottom: calc(100% - clamp(34px, 5vh, 56px));
          transform: translateX(-50%);
          width: min(132%, 1200px);
          height: clamp(52px, 8vw, 110px);
          background: radial-gradient(ellipse at center,
            rgba(255,255,255,0.52) 0%,
            rgba(255,255,255,0.22) 24%,
            rgba(255,255,255,0.10) 48%,
            rgba(255,255,255,0.04) 62%,
            transparent 78%
          );
          filter: blur(12px);
          z-index: 1;
          pointer-events: none;
        }

        .bottom-vignette {
          display: none;
        }

        .tree-base {
          position: absolute;
          bottom: 0;
          background: linear-gradient(180deg, rgba(10,20,42,0.95), rgba(5,10,20,1));
          border-radius: 50% 50% 0 0;
        }

        .tree-trunk {
          position: absolute;
          bottom: 0;
          width: 6px;
          background: #08101f;
          border-radius: 6px 6px 0 0;
        }

        .star {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 0 10px rgba(255,255,255,0.65);
          animation: none;
        }

        .star-static {
          position: absolute;
          border-radius: 9999px;
          background: rgba(255,255,255,0.85);
          pointer-events: none;
        }

        .star-cross {
          position: absolute;
          width: 16px;
          height: 16px;
          z-index: 1;
          background: white;
          clip-path: polygon(
            50% 0%,
            61% 35%,
            98% 35%,
            68% 57%,
            79% 91%,
            50% 70%,
            21% 91%,
            32% 57%,
            2% 35%,
            39% 35%
          );
          box-shadow: 0 0 12px rgba(255,255,255,0.9);
          animation: starPulse 6s ease-in-out infinite;
          will-change: transform, opacity, filter;
        }

        .hero-glow {
          position: absolute;
          left: 50%;
          top: 39%;
          width: clamp(280px, 44vw, 620px);
          height: clamp(280px, 44vw, 620px);
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,255,255,0.22), rgba(255,255,255,0.08) 36%, transparent 72%);
          filter: blur(10px);
          pointer-events: none;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-size: 12px;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
        }

        .count-card {
          min-width: 0;
          width: auto;
          padding: clamp(0.55rem, 1vw, 0.85rem) clamp(0.2rem, 0.5vw, 0.45rem) clamp(0.5rem, 0.8vw, 0.75rem);
          border-left: 1px solid rgba(255,255,255,0.18);
          overflow: hidden;
        }

        .count-card:first-child { border-left: none; }

        .count-value {
          font-variant-numeric: tabular-nums;
          white-space: nowrap;
          line-height: 1;
        }

        .glass {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.12);
          box-shadow: 0 10px 35px rgba(0,0,0,0.2);
          backdrop-filter: blur(8px);
        }

        .gold-button {
          position: relative;
          overflow: visible;
          background: linear-gradient(180deg, #e0b55d 0%, #c8932f 100%);
          color: white;
          box-shadow: none;
          transition: transform 0.25s ease;
        }

        .gold-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(199,146,47,0.34), inset 0 1px 0 rgba(255,255,255,0.3);
        }

        .pulse {
          animation: pulseGlow 3s cubic-bezier(0.4,0,0.2,1) infinite;
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(1);
            box-shadow: 0 10px 24px rgba(199,146,47,0.18);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 18px 38px rgba(222,181,91,0.28);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 10px 24px rgba(199,146,47,0.18);
          }
        }

        @keyframes starPulse {
          0%, 100% {
            transform: scale(0.78);
            opacity: 0.55;
            filter: drop-shadow(0 0 4px rgba(255,255,255,0.35));
          }
          50% {
            transform: scale(1.22);
            opacity: 1;
            filter: drop-shadow(0 0 18px rgba(255,255,255,0.95));
          }
        }

        @media (max-width: 640px) {
          .count-value {
            font-size: clamp(1.35rem, 8vw, 2.2rem);
            letter-spacing: 0;
          }
          .count-label {
            font-size: 0.62rem;
            letter-spacing: 0.14em;
          }
          .count-card {
            min-width: 0;
            width: auto;
            padding: 9px 3px 8px;
          }

          .night-sky {
            min-height: 100svh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 8px;
            padding-bottom: 70px;
            --forest-bottom: 0px;
            --forest-height: clamp(98px, 18vw, 122px);
            --mist-overlap: clamp(58px, 9vw, 78px);
            --glow-lift: clamp(0px, 0.8vh, 8px);
          }
          .mist {
            height: 68px;
            width: 108%;
            opacity: 0.52;
            filter: blur(14px);
          }
          .horizon-glow {
            bottom: calc(100% - 42px);
            width: min(112%, 620px);
            height: 44px;
            opacity: 0.6;
            filter: blur(10px);
          }
          .forest-wrap {
            inset: auto 0 var(--forest-bottom) 0;
            height: var(--forest-height);
          }
        }
      `}</style>
      <InvitationPage />
    </div>
  );
}

function InvitationPage() {
  const weddingDate = new Date('2026-08-01T15:00:00');

  return (
    <div className="font-body">
      <Hero weddingDate={weddingDate} />
      <Details />
      <Schedule />
      <RSVP />
      <Footer />
    </div>
  );
}

function Hero({ weddingDate }) {
  return (
    <section className="night-sky relative min-h-screen flex items-center justify-center px-4 pt-[clamp(1.25rem,4vh,2.5rem)] pb-[clamp(6rem,10vh,9rem)]">
      <div className="moon" />
      <div className="moon-rays" />
      <div className="hero-glow" />
      <span className="star" style={{ top: '16%', left: '17%', animationDelay: '0.2s' }} />
      <span className="star" style={{ top: '21%', left: '77%', animationDelay: '1.1s' }} />
      <span className="star" style={{ top: '34%', left: '12%', animationDelay: '1.8s' }} />
      <span className="star" style={{ top: '14%', left: '61%', animationDelay: '0.9s' }} />
      <span className="star" style={{ top: '27%', left: '86%', animationDelay: '1.5s' }} />
      <span className="star" style={{ top: '58%', left: '22%', animationDelay: '0.5s' }} />
      <span className="star" style={{ top: '65%', left: '80%', animationDelay: '2.2s' }} />
      <span className="star-cross" style={{ top: '11%', left: '29%', animationDelay: '0.7s' }} />
      <span className="star-cross" style={{ top: '18%', left: '72%', animationDelay: '1.6s' }} />
      <span className="star-cross" style={{ top: '30%', left: '84%', animationDelay: '2.1s' }} />
      <span className="star-cross" style={{ top: '24%', left: '9%', animationDelay: '1.2s' }} />
      <span className="star-cross" style={{ top: '43%', left: '66%', animationDelay: '2.5s' }} />

      {/* static tiny stars for dense night sky */}
      {Array.from({length: 120}).map((_,i)=>{
        const top = Math.random()*70;
        const left = Math.random()*100;
        const size = Math.random()*2+1;
        const opacity = Math.random()*0.5+0.4;
        return (
          <span
            key={i}
            className="star-static"
            style={{
              top: top+"%",
              left: left+"%",
              width: size,
              height: size,
              opacity
            }}
          />
        )
      })}

      <ForestSilhouette />
      <div className="bottom-vignette" />
      

      <div className="relative z-10 w-full max-w-[min(92vw,980px)] text-center mt-0 sm:mt-[clamp(0.5rem,3vh,2rem)]">
        <div className="fade-up pt-4">
          <div className="flex items-center justify-center gap-4 mt-1">
            <span className="h-px w-16 sm:w-24 bg-white/20" />
            <div className="text-center">
            <p className="font-display text-white/90 leading-none text-[clamp(2.6rem,6vw,5rem)]">Peter & Kristína</p>
            <p className="font-body mt-2 uppercase text-white/70 tracking-[0.28em] text-[clamp(0.72rem,1.2vw,0.95rem)]">Pozvánka na svadbu</p>
            </div>
            <span className="h-px w-16 sm:w-24 bg-white/20" />
          </div>
        </div>

        <div className="mt-[clamp(1.25rem,2.2vw,2rem)] fade-up delay-1 flex justify-center">
          <CoupleIllustration />
        </div>

        <div className="mt-[clamp(0.8rem,1.2vw,1.25rem)] fade-up delay-2 flex justify-center">
          <Countdown targetDate={weddingDate} />
        </div>

        <div className="mt-[clamp(0.9rem,1.6vw,1.5rem)] fade-up delay-3 flex items-center justify-center">
          <a
            href="#rsvp"
            className="gold-button pulse inline-flex items-center gap-2 rounded-full px-[clamp(1.5rem,3vw,2.5rem)] py-[clamp(0.75rem,1.2vw,0.95rem)] text-[clamp(0.72rem,1vw,0.95rem)] font-semibold tracking-[0.22em] uppercase"
          >
            Potvrdenie účasti
          </a>
        </div>
      </div>
    </section>
  );
}

function ForestSilhouette() {
  return (
    <div className="forest-wrap" aria-hidden="true">
      <div className="horizon-glow" />
      <svg viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax slice" className="forest-svg">
        <defs>
          <linearGradient id="forestBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#09142b" />
            <stop offset="100%" stopColor="#03070f" />
          </linearGradient>
          <filter id="forestSoft" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0.7" />
          </filter>
        </defs>

        

        <g fill="#27406f" opacity="0.22" transform="translate(22,34) scale(1.02,0.68)">
          <path d="M0 220 L0 176 L-8 176 L6 162 L-4 162 L12 146 L2 146 L20 124 L10 124 L34 92 L58 124 L48 124 L66 146 L56 146 L72 162 L62 162 L76 176 L66 176 L66 220 Z" />
          <path d="M70 220 L70 168 L60 168 L74 154 L64 154 L80 138 L70 138 L88 116 L78 116 L102 84 L126 116 L116 116 L134 138 L124 138 L140 154 L130 154 L144 168 L134 168 L134 220 Z" />
          <path d="M142 220 L142 180 L132 180 L146 166 L136 166 L152 150 L142 150 L160 128 L150 128 L174 96 L198 128 L188 128 L206 150 L196 150 L212 166 L202 166 L216 180 L206 180 L206 220 Z" />
          <path d="M214 220 L214 170 L204 170 L218 156 L208 156 L224 140 L214 140 L232 118 L222 118 L246 86 L270 118 L260 118 L278 140 L268 140 L284 156 L274 156 L288 170 L278 170 L278 220 Z" />
          <path d="M286 220 L286 178 L276 178 L290 164 L280 164 L296 148 L286 148 L304 126 L294 126 L318 94 L342 126 L332 126 L350 148 L340 148 L356 164 L346 164 L360 178 L350 178 L350 220 Z" />
          <path d="M358 220 L358 168 L348 168 L362 154 L352 154 L368 138 L358 138 L376 116 L366 116 L390 84 L414 116 L404 116 L422 138 L412 138 L428 154 L418 154 L432 168 L422 168 L422 220 Z" />
          <path d="M430 220 L430 180 L420 180 L434 166 L424 166 L440 150 L430 150 L448 128 L438 128 L462 96 L486 128 L476 128 L494 150 L484 150 L500 166 L490 166 L504 180 L494 180 L494 220 Z" />
          <path d="M502 220 L502 170 L492 170 L506 156 L496 156 L512 140 L502 140 L520 118 L510 118 L534 86 L558 118 L548 118 L566 140 L556 140 L572 156 L562 156 L576 170 L566 170 L566 220 Z" />
          <path d="M574 220 L574 178 L564 178 L578 164 L568 164 L584 148 L574 148 L592 126 L582 126 L606 94 L630 126 L620 126 L638 148 L628 148 L644 164 L634 164 L648 178 L638 178 L638 220 Z" />
          <path d="M646 220 L646 168 L636 168 L650 154 L640 154 L656 138 L646 138 L664 116 L654 116 L678 84 L702 116 L692 116 L710 138 L700 138 L716 154 L706 154 L720 168 L710 168 L710 220 Z" />
          <path d="M718 220 L718 180 L708 180 L722 166 L712 166 L728 150 L718 150 L736 128 L726 128 L750 96 L774 128 L764 128 L782 150 L772 150 L788 166 L778 166 L792 180 L782 180 L782 220 Z" />
          <path d="M790 220 L790 170 L780 170 L794 156 L784 156 L800 140 L790 140 L808 118 L798 118 L822 86 L846 118 L836 118 L854 140 L844 140 L860 156 L850 156 L864 170 L854 170 L854 220 Z" />
          <path d="M862 220 L862 178 L852 178 L866 164 L856 164 L872 148 L862 148 L880 126 L870 126 L894 94 L918 126 L908 126 L926 148 L916 148 L932 164 L922 164 L936 178 L926 178 L926 220 Z" />
          <path d="M934 220 L934 168 L924 168 L938 154 L928 154 L944 138 L934 138 L952 116 L942 116 L966 84 L990 116 L980 116 L998 138 L988 138 L1004 154 L994 154 L1008 168 L998 168 L998 220 Z" />
          <path d="M1006 220 L1006 180 L996 180 L1010 166 L1000 166 L1016 150 L1006 150 L1024 128 L1014 128 L1038 96 L1062 128 L1052 128 L1070 150 L1060 150 L1076 166 L1066 166 L1080 180 L1070 180 L1070 220 Z" />
          <path d="M1078 220 L1078 170 L1068 170 L1082 156 L1072 156 L1088 140 L1078 140 L1096 118 L1086 118 L1110 86 L1134 118 L1124 118 L1142 140 L1132 140 L1148 156 L1138 156 L1152 170 L1142 170 L1142 220 Z" />
          <path d="M1150 220 L1150 178 L1140 178 L1154 164 L1144 164 L1160 148 L1150 148 L1168 126 L1158 126 L1182 94 L1206 126 L1196 126 L1214 148 L1204 148 L1220 164 L1210 164 L1224 178 L1214 178 L1214 220 Z" />
          <path d="M1222 220 L1222 168 L1212 168 L1226 154 L1216 154 L1232 138 L1222 138 L1240 116 L1230 116 L1254 84 L1278 116 L1268 116 L1286 138 L1276 138 L1292 154 L1282 154 L1296 168 L1286 168 L1286 220 Z" />
          <path d="M1294 220 L1294 180 L1284 180 L1298 166 L1288 166 L1304 150 L1294 150 L1312 128 L1302 128 L1326 96 L1350 128 L1340 128 L1358 150 L1348 150 L1364 166 L1354 166 L1368 180 L1358 180 L1358 220 Z" />
          <path d="M1366 220 L1366 170 L1356 170 L1370 156 L1360 156 L1376 140 L1366 140 L1384 118 L1374 118 L1398 86 L1422 118 L1412 118 L1430 140 L1420 140 L1436 156 L1426 156 L1440 170 L1430 170 L1430 220 Z" />
          <path d="M1438 220 L1438 178 L1428 178 L1442 164 L1432 164 L1448 148 L1438 148 L1456 126 L1446 126 L1470 94 L1494 126 L1484 126 L1502 148 L1492 148 L1508 164 L1498 164 L1512 178 L1502 178 L1502 220 Z" />
          <path d="M1510 220 L1510 168 L1500 168 L1514 154 L1504 154 L1520 138 L1510 138 L1528 116 L1518 116 L1542 84 L1566 116 L1556 116 L1574 138 L1564 138 L1580 154 L1570 154 L1584 168 L1574 168 L1574 220 Z" />
        </g>

        <g fill="#13254a" opacity="0.38" transform="translate(10,18) scale(1,0.82)">
          <path d="M0 220 L0 166 L-8 166 L6 150 L-4 150 L12 132 L2 132 L20 108 L10 108 L34 74 L58 108 L48 108 L66 132 L56 132 L72 150 L62 150 L76 166 L66 166 L66 220 Z" />
          <path d="M56 220 L56 158 L46 158 L60 142 L50 142 L66 124 L56 124 L74 100 L64 100 L88 66 L112 100 L102 100 L120 124 L110 124 L126 142 L116 142 L130 158 L120 158 L120 220 Z" />
          <path d="M118 220 L118 170 L108 170 L122 154 L112 154 L128 136 L118 136 L136 112 L126 112 L150 78 L174 112 L164 112 L182 136 L172 136 L188 154 L178 154 L192 170 L182 170 L182 220 Z" />
          <path d="M182 220 L182 160 L172 160 L186 144 L176 144 L192 126 L182 126 L200 102 L190 102 L214 68 L238 102 L228 102 L246 126 L236 126 L252 144 L242 144 L256 160 L246 160 L246 220 Z" />
          <path d="M246 220 L246 174 L236 174 L250 158 L240 158 L256 140 L246 140 L264 116 L254 116 L278 82 L302 116 L292 116 L310 140 L300 140 L316 158 L306 158 L320 174 L310 174 L310 220 Z" />
          <path d="M312 220 L312 162 L302 162 L316 146 L306 146 L322 128 L312 128 L330 104 L320 104 L344 70 L368 104 L358 104 L376 128 L366 128 L382 146 L372 146 L386 162 L376 162 L376 220 Z" />
          <path d="M378 220 L378 170 L368 170 L382 154 L372 154 L388 136 L378 136 L396 112 L386 112 L410 78 L434 112 L424 112 L442 136 L432 136 L448 154 L438 154 L452 170 L442 170 L442 220 Z" />
          <path d="M444 220 L444 160 L434 160 L448 144 L438 144 L454 126 L444 126 L462 102 L452 102 L476 68 L500 102 L490 102 L508 126 L498 126 L514 144 L504 144 L518 160 L508 160 L508 220 Z" />
          <path d="M510 220 L510 174 L500 174 L514 158 L504 158 L520 140 L510 140 L528 116 L518 116 L542 82 L566 116 L556 116 L574 140 L564 140 L580 158 L570 158 L584 174 L574 174 L574 220 Z" />
          <path d="M576 220 L576 162 L566 162 L580 146 L570 146 L586 128 L576 128 L594 104 L584 104 L608 70 L632 104 L622 104 L640 128 L630 128 L646 146 L636 146 L650 162 L640 162 L640 220 Z" />
          <path d="M642 220 L642 170 L632 170 L646 154 L636 154 L652 136 L642 136 L660 112 L650 112 L674 78 L698 112 L688 112 L706 136 L696 136 L712 154 L702 154 L716 170 L706 170 L706 220 Z" />
          <path d="M708 220 L708 160 L698 160 L712 144 L702 144 L718 126 L708 126 L726 102 L716 102 L740 68 L764 102 L754 102 L772 126 L762 126 L778 144 L768 144 L782 160 L772 160 L772 220 Z" />
          <path d="M774 220 L774 174 L764 174 L778 158 L768 158 L784 140 L774 140 L792 116 L782 116 L806 82 L830 116 L820 116 L838 140 L828 140 L844 158 L834 158 L848 174 L838 174 L838 220 Z" />
          <path d="M840 220 L840 162 L830 162 L844 146 L834 146 L850 128 L840 128 L858 104 L848 104 L872 70 L896 104 L886 104 L904 128 L894 128 L910 146 L900 146 L914 162 L904 162 L904 220 Z" />
          <path d="M906 220 L906 170 L896 170 L910 154 L900 154 L916 136 L906 136 L924 112 L914 112 L938 78 L962 112 L952 112 L970 136 L960 136 L976 154 L966 154 L980 170 L970 170 L970 220 Z" />
          <path d="M972 220 L972 160 L962 160 L976 144 L966 144 L982 126 L972 126 L990 102 L980 102 L1004 68 L1028 102 L1018 102 L1036 126 L1026 126 L1042 144 L1032 144 L1046 160 L1036 160 L1036 220 Z" />
          <path d="M1038 220 L1038 174 L1028 174 L1042 158 L1032 158 L1048 140 L1038 140 L1056 116 L1046 116 L1070 82 L1094 116 L1084 116 L1102 140 L1092 140 L1108 158 L1098 158 L1112 174 L1102 174 L1102 220 Z" />
          <path d="M1104 220 L1104 162 L1094 162 L1108 146 L1098 146 L1114 128 L1104 128 L1122 104 L1112 104 L1136 70 L1160 104 L1150 104 L1168 128 L1158 128 L1174 146 L1164 146 L1178 162 L1168 162 L1168 220 Z" />
          <path d="M1170 220 L1170 170 L1160 170 L1174 154 L1164 154 L1180 136 L1170 136 L1188 112 L1178 112 L1202 78 L1226 112 L1216 112 L1234 136 L1224 136 L1240 154 L1230 154 L1244 170 L1234 170 L1234 220 Z" />
          <path d="M1236 220 L1236 160 L1226 160 L1240 144 L1230 144 L1246 126 L1236 126 L1254 102 L1244 102 L1268 68 L1292 102 L1282 102 L1300 126 L1290 126 L1306 144 L1296 144 L1310 160 L1300 160 L1300 220 Z" />
          <path d="M1302 220 L1302 174 L1292 174 L1306 158 L1296 158 L1312 140 L1302 140 L1320 116 L1310 116 L1334 82 L1358 116 L1348 116 L1366 140 L1356 140 L1372 158 L1362 158 L1376 174 L1366 174 L1366 220 Z" />
          <path d="M1368 220 L1368 162 L1358 162 L1372 146 L1362 146 L1378 128 L1368 128 L1386 104 L1376 104 L1400 70 L1424 104 L1414 104 L1432 128 L1422 128 L1438 146 L1428 146 L1442 162 L1432 162 L1432 220 Z" />
          <path d="M1434 220 L1434 170 L1424 170 L1438 154 L1428 154 L1444 136 L1434 136 L1452 112 L1442 112 L1466 78 L1490 112 L1480 112 L1498 136 L1488 136 L1504 154 L1494 154 L1508 170 L1498 170 L1498 220 Z" />
          <path d="M1500 220 L1500 160 L1490 160 L1504 144 L1494 144 L1510 126 L1500 126 L1518 102 L1508 102 L1532 68 L1556 102 L1546 102 L1564 126 L1554 126 L1570 144 L1560 144 L1574 160 L1564 160 L1564 220 Z" />
        </g>

        <g fill="#07101f" opacity="0.95">
          <path d="M0 220 L0 158 L-8 158 L6 140 L-4 140 L12 120 L2 120 L20 96 L10 96 L34 58 L58 96 L48 96 L66 120 L56 120 L72 140 L62 140 L76 158 L66 158 L66 220 Z" />
          <path d="M40 220 L40 150 L30 150 L44 132 L34 132 L50 112 L40 112 L58 88 L48 88 L70 56 L92 88 L82 88 L100 112 L90 112 L106 132 L96 132 L110 150 L100 150 L100 220 Z" />
          <path d="M90 220 L90 160 L80 160 L94 142 L84 142 L100 124 L90 124 L108 100 L98 100 L120 66 L142 100 L132 100 L150 124 L140 124 L156 142 L146 142 L160 160 L150 160 L150 220 Z" />
          <path d="M150 220 L150 150 L140 150 L154 132 L144 132 L160 112 L150 112 L168 88 L158 88 L180 56 L202 88 L192 88 L210 112 L200 112 L216 132 L206 132 L220 150 L210 150 L210 220 Z" />
          <path d="M210 220 L210 165 L200 165 L214 147 L204 147 L220 129 L210 129 L228 105 L218 105 L240 72 L262 105 L252 105 L270 129 L260 129 L276 147 L266 147 L280 165 L270 165 L270 220 Z" />
          <path d="M270 220 L270 150 L260 150 L274 132 L264 132 L280 112 L270 112 L288 88 L278 88 L300 56 L322 88 L312 88 L330 112 L320 112 L336 132 L326 132 L340 150 L330 150 L330 220 Z" />
          <path d="M330 220 L330 160 L320 160 L334 142 L324 142 L340 124 L330 124 L348 100 L338 100 L360 66 L382 100 L372 100 L390 124 L380 124 L396 142 L386 142 L400 160 L390 160 L390 220 Z" />
          <path d="M390 220 L390 150 L380 150 L394 132 L384 132 L400 112 L390 112 L408 88 L398 88 L420 56 L442 88 L432 88 L450 112 L440 112 L456 132 L446 132 L460 150 L450 150 L450 220 Z" />
          <path d="M450 220 L450 168 L440 168 L454 150 L444 150 L460 132 L450 132 L468 108 L458 108 L480 76 L502 108 L492 108 L510 132 L500 132 L516 150 L506 150 L520 168 L510 168 L510 220 Z" />
          <path d="M510 220 L510 150 L500 150 L514 132 L504 132 L520 112 L510 112 L528 88 L518 88 L540 56 L562 88 L552 88 L570 112 L560 112 L576 132 L566 132 L580 150 L570 150 L570 220 Z" />
          <path d="M570 220 L570 162 L560 162 L574 144 L564 144 L580 126 L570 126 L588 102 L578 102 L600 70 L622 102 L612 102 L630 126 L620 126 L636 144 L626 144 L640 162 L630 162 L630 220 Z" />
          <path d="M630 220 L630 150 L620 150 L634 132 L624 132 L640 112 L630 112 L648 88 L638 88 L660 56 L682 88 L672 88 L690 112 L680 112 L696 132 L686 132 L700 150 L690 150 L690 220 Z" />
          <path d="M690 220 L690 165 L680 165 L694 147 L684 147 L700 129 L690 129 L708 105 L698 105 L720 72 L742 105 L732 105 L750 129 L740 129 L756 147 L746 147 L760 165 L750 165 L750 220 Z" />
          <path d="M750 220 L750 150 L740 150 L754 132 L744 132 L760 112 L750 112 L768 88 L758 88 L780 56 L802 88 L792 88 L810 112 L800 112 L816 132 L806 132 L820 150 L810 150 L810 220 Z" />
          <path d="M810 220 L810 160 L800 160 L814 142 L804 142 L820 124 L810 124 L828 100 L818 100 L840 66 L862 100 L852 100 L870 124 L860 124 L876 142 L866 142 L880 160 L870 160 L870 220 Z" />
          <path d="M870 220 L870 150 L860 150 L874 132 L864 132 L880 112 L870 112 L888 88 L878 88 L900 56 L922 88 L912 88 L930 112 L920 112 L936 132 L926 132 L940 150 L930 150 L930 220 Z" />
          <path d="M930 220 L930 168 L920 168 L934 150 L924 150 L940 132 L930 132 L948 108 L938 108 L960 76 L982 108 L972 108 L990 132 L980 132 L996 150 L986 150 L1000 168 L990 168 L990 220 Z" />
          <path d="M990 220 L990 150 L980 150 L994 132 L984 132 L1000 112 L990 112 L1008 88 L998 88 L1020 56 L1042 88 L1032 88 L1050 112 L1040 112 L1056 132 L1046 132 L1060 150 L1050 150 L1050 220 Z" />
          <path d="M1050 220 L1050 162 L1040 162 L1054 144 L1044 144 L1060 126 L1050 126 L1068 102 L1058 102 L1080 70 L1102 102 L1092 102 L1110 126 L1100 126 L1116 144 L1106 144 L1120 162 L1110 162 L1110 220 Z" />
          <path d="M1110 220 L1110 150 L1100 150 L1114 132 L1104 132 L1120 112 L1110 112 L1128 88 L1118 88 L1140 56 L1162 88 L1152 88 L1170 112 L1160 112 L1176 132 L1166 132 L1180 150 L1170 150 L1170 220 Z" />
          <path d="M1170 220 L1170 168 L1160 168 L1174 150 L1164 150 L1180 132 L1170 132 L1188 108 L1178 108 L1200 76 L1222 108 L1212 108 L1230 132 L1220 132 L1236 150 L1226 150 L1240 168 L1230 168 L1230 220 Z" />
          <path d="M1230 220 L1230 150 L1220 150 L1234 132 L1224 132 L1240 112 L1230 112 L1248 88 L1238 88 L1260 56 L1282 88 L1272 88 L1290 112 L1280 112 L1296 132 L1286 132 L1300 150 L1290 150 L1290 220 Z" />
          <path d="M1290 220 L1290 160 L1280 160 L1294 142 L1284 142 L1300 124 L1290 124 L1308 100 L1298 100 L1320 66 L1342 100 L1332 100 L1350 124 L1340 124 L1356 142 L1346 142 L1360 160 L1350 160 L1350 220 Z" />
          <path d="M1350 220 L1350 150 L1340 150 L1354 132 L1344 132 L1360 112 L1350 112 L1368 88 L1358 88 L1380 56 L1402 88 L1392 88 L1410 112 L1400 112 L1416 132 L1406 132 L1420 150 L1410 150 L1410 220 Z" />
          <path d="M1410 220 L1410 168 L1400 168 L1414 150 L1404 150 L1420 132 L1410 132 L1428 108 L1418 108 L1440 76 L1462 108 L1452 108 L1470 132 L1460 132 L1476 150 L1466 150 L1480 168 L1470 168 L1470 220 Z" />
          <path d="M1470 220 L1470 150 L1460 150 L1474 132 L1464 132 L1480 112 L1470 112 L1488 88 L1478 88 L1500 56 L1522 88 L1512 88 L1530 112 L1520 112 L1536 132 L1526 132 L1540 150 L1530 150 L1530 220 Z" />
          <path d="M1534 220 L1534 162 L1524 162 L1538 144 L1528 144 L1544 124 L1534 124 L1552 100 L1542 100 L1566 64 L1590 100 L1580 100 L1598 124 L1588 124 L1604 144 L1594 144 L1608 162 L1598 162 L1598 220 Z" />
        </g>

        <g fill="#04070d" opacity="1">
          {Array.from({ length: 32 }).map((_, i) => {
            const tops = [184, 170, 190, 176, 186, 168, 192, 174, 188, 172, 185, 169];
            const x = i * 50 - 26;
            const topY = tops[i % tops.length];

            return (
              <g key={i} transform={`translate(${x},0)`}>
                <path d={`M18 220 L18 ${topY} L10 ${topY} L22 ${topY - 16} L14 ${topY - 16} L28 ${topY - 32} L20 ${topY - 32} L36 ${topY - 56} L28 ${topY - 56} L48 ${topY - 90} L68 ${topY - 56} L60 ${topY - 56} L76 ${topY - 32} L68 ${topY - 32} L82 ${topY - 16} L74 ${topY - 16} L86 ${topY} L78 ${topY} L78 220 Z`} />
              </g>
            );
          })}
        </g>
      </svg>
      
    </div>
  );
}

function CoupleIllustration() {
  return (
    <div className="hero-illustration" style={{display:'flex',justifyContent:'center', width:'100%'}}>
      <img
  src="https://i.pinimg.com/736x/a9/27/09/a9270907adcfb2b945d2c350116f2d05.jpg"
  alt="Wedding couple"
  style={{
    width: 'min(34vw, 280px)',
    minWidth: '140px',
    maxHeight: 'clamp(140px, 28vh, 280px)',
    objectFit: 'contain',
    filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.55))'
  }}
/>
    </div>
  );
}

function Countdown({ targetDate }) {

  const calculate = () => {
    const now = new Date();
    const diff = Math.max(targetDate.getTime() - now.getTime(), 0);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calculate()), 1000);
    return () => clearInterval(interval);
  }, []);

  const items = useMemo(
    () => [
      { label: 'dni', value: timeLeft.days },
      { label: 'hodiny', value: timeLeft.hours },
      { label: 'minúty', value: timeLeft.minutes },
      { label: 'sekundy', value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  return (
    <div className="glass grid grid-cols-4 rounded-[1.8rem] px-[clamp(0.6rem,1.6vw,1.5rem)] py-[clamp(0.7rem,1.2vw,1.05rem)] bg-white/[0.035] w-[min(96vw,860px)]">
      {items.map((item) => (
        <div key={item.label} className="count-card text-center">
          <div className="count-value font-body font-light tabular-nums tracking-[0.03em] text-[clamp(1.6rem,4.6vw,4rem)]">{String(item.value).padStart(2, '0')}</div>
          <div className="count-label mt-1 uppercase tracking-[0.18em] text-white/75 text-[clamp(0.52rem,0.9vw,0.78rem)]">{item.label}</div>
        </div>
      ))}
    </div>
  );
}

function Details() {
  return (
    <section className="bg-slate-950 px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="divider mb-8">Kedy &amp; kde</div>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="section-card rounded-3xl p-8">
            <h2 className="font-display text-4xl sm:text-5xl">1. august 2026</h2>
            <p className="mt-4 text-white/80 text-lg leading-8">
              Sobota plná lásky, radosti, hudby a spoločných chvíľ s rodinou.
            </p>
            <div className="mt-6 space-y-3 text-white/78">
              <p><span className="text-white font-medium">Miesto:</span> Vila Etelka</p>
              <p><span className="text-white font-medium">Adresa:</span> Harmónia 3003, 900 01 Modra</p>
            </div>
          </div>
          <div className="section-card rounded-3xl p-8">
            <h3 className="font-display text-4xl">Pozvánka</h3>
            <p className="mt-4 text-white/80 leading-8">
              S radosťou vás pozývame, aby ste boli súčasťou nášho veľkého dňa.
              Budeme šťastní, ak tento výnimočný moment prežijete spolu s nami.
            </p>
            <a
              href="https://maps.google.com/?q=Vila%20Etelka%20Harm%C3%B3nia%203003%20900%2001%20Modra"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex rounded-full border border-white/20 px-5 py-3 text-sm uppercase tracking-[0.22em] text-white/85 transition hover:bg-white/5"
            >
              Otvoriť mapu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  const items = [
    ['15:00', 'Príchod hostí'],
    ['16:00', 'Obrad'],
    ['17:00', 'Prípitok a gratulácie'],
    ['18:00', 'Večera'],
    ['20:00', 'Zábava a oslava'],
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 to-[#0a1224] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="divider mb-8">Program</div>
        <div className="section-card rounded-[2rem] p-6 sm:p-8">
          <h2 className="font-display text-4xl sm:text-5xl text-center">Harmonogram dňa</h2>
          <div className="mt-8 divide-y divide-white/10">
            {items.map(([time, label]) => (
              <div key={time} className="grid grid-cols-[92px_1fr] items-center gap-4 py-5 sm:grid-cols-[120px_1fr]">
                <div className="text-xl sm:text-2xl font-light tracking-[0.12em] text-[#e7c476]">{time}</div>
                <div className="text-white/85 text-base sm:text-lg">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVP() {
  return (
    <section id="rsvp" className="bg-[#08101f] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <div className="divider mb-8">RSVP</div>
        <div className="section-card rounded-[2rem] p-6 sm:p-10">
          <h2 className="font-display text-center text-4xl sm:text-5xl">Potvrdenie účasti</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center leading-8 text-white/78">
            Dajte nám, prosím, vedieť, či prídete osláviť náš veľký deň spolu s nami.
          </p>

          <form className="mt-10 grid gap-5">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/70">Meno a priezvisko</label>
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/25" placeholder="Vaše meno" />
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/70">Email alebo telefón</label>
              <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/25" placeholder="Kontakt" />
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/70">Prídete?</label>
              <select className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-white/25">
                <option className="text-black">Áno, prídem</option>
                <option className="text-black">Nie, neprídem</option>
                <option className="text-black">Ešte neviem</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/70">Poznámka</label>
              <textarea rows="4" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-white/25" placeholder="Môžete nám nechať odkaz" />
            </div>
            <button type="button" className="gold-button mt-2 rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.28em] pulse">
              Odoslať RSVP
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#060b15] px-4 py-10 text-center text-white/55">
      <p className="font-display text-2xl text-white/75">Peter &amp; Kristína</p>
      <p className="mt-2 text-sm tracking-[0.2em] uppercase">1. august 2026 · Vila Etelka · Modra</p>
    </footer>
  );
}
