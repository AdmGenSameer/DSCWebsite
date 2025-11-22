import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Physics2DPlugin } from "gsap/Physics2DPlugin";

import "./SpookyPumpkins.css";

// Register plugins correctly
gsap.registerPlugin(Draggable, InertiaPlugin, Physics2DPlugin);

// Utility functions
const distance = (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1);
const length = (x, y) => Math.hypot(x, y);
const angle = (x1, y1, x2, y2) =>
  (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;

// States
const PumpkinStates = {
  SPAWNING: "spawning",
  IDLE: "idle",
  PULLING: "pulling",
  DRAGGING: "dragging",
  DROPPING: "dropping",
  LEAVING: "leaving",
};

/* --------------------------
   PARTICLES
---------------------------*/

/* --------------------------
   CREATE PUMPKIN (REALISTIC)
---------------------------*/

const createPumpkinGroup = ({ size, stem }) => {
  const group = document.createElement("div");
  group.className = "pumpkin-group";

  const dragger = document.createElement("div");
  dragger.className = "pumpkin-dragger";
  dragger.style.width = `${size}px`;
  dragger.style.height = `${size}px`;

  const creature = document.createElement("div");
  creature.className = "pumpkin-creature";
  creature.style.width = `${size}px`;
  creature.style.height = `${size}px`;

  // Body with realistic pumpkin details
  const body = document.createElement("div");
  body.className = "pumpkin-body";
  body.style.width = `${size}px`;
  body.style.height = `${size}px`;

  // Realistic pumpkin SVG face
  body.innerHTML = `
    <svg viewBox="0 0 64 64" enable-background="new 0 0 64 64" id="Filled_Outline_00000081607312705973271110000009714898175699931553_" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M41,17h-0.1c-2.705-1.27-5.714-2-8.9-2s-6.195,0.73-8.9,2H23C10.85,17,1,26.85,1,39v0 c0,12.15,9.85,22,22,22h0.1c2.705,1.27,5.714,2,8.9,2s6.195-0.73,8.9-2H41c12.15,0,22-9.85,22-22v0C63,26.85,53.15,17,41,17z" fill="#ff5900"></path> <path d="M21,4L21,4c0,1.657,1.343,3,3,3h0c2.761,0,5,2.239,5,5v3h6v-3c0-6.075-4.925-11-11-11h0 C22.343,1,21,2.343,21,4z" fill="#7a7305"></path> <path d="M25,31c1.105,0,2,0.895,2,2v0c0,1.105-0.895,2-2,2h-4c-2.209,0-4-1.791-4-4v0c0-2.209,1.791-4,4-4h0 C23.209,27,25,28.791,25,31L25,31L25,31z M39,31c-1.105,0-2,0.895-2,2v0c0,1.105,0.895,2,2,2h4c2.209,0,4-1.791,4-4v0 c0-2.209-1.791-4-4-4h0C40.791,27,39,28.791,39,31L39,31L39,31z M49,43l-5,3l-3-3l-3,3l-3-3l-3,3l-3-3l-3,3l-3-3l-3,3l-5-3l5,10 l3-3l3,3l3-3l3,3l3-3l3,3l3-3l3,3L49,43z" fill="#ffd500"></path> </g> <g> <path d="M21,36h4c1.654,0,3-1.346,3-3c0-1.331-0.871-2.462-2.073-2.854C25.521,27.795,23.466,26,21,26 c-2.757,0-5,2.243-5,5S18.243,36,21,36z M21,28c1.654,0,3,1.346,3,3c0,0.553,0.447,1,1,1c0.552,0,1,0.448,1,1s-0.448,1-1,1h-4 c-1.654,0-3-1.346-3-3S19.346,28,21,28z" fill="#260A04"></path> <path d="M39,36h4c2.757,0,5-2.243,5-5s-2.243-5-5-5c-2.466,0-4.521,1.795-4.927,4.146 C36.871,30.538,36,31.669,36,33C36,34.654,37.346,36,39,36z M39,32c0.553,0,1-0.447,1-1c0-1.654,1.346-3,3-3s3,1.346,3,3 s-1.346,3-3,3h-4c-0.552,0-1-0.448-1-1S38.448,32,39,32z" fill="#260A04"></path> <path d="M48.485,42.143l-4.33,2.599l-2.448-2.448c-0.391-0.391-1.023-0.391-1.414,0L38,44.586l-2.293-2.293 c-0.391-0.391-1.023-0.391-1.414,0L32,44.586l-2.293-2.293c-0.391-0.391-1.023-0.391-1.414,0L26,44.586l-2.293-2.293 c-0.391-0.391-1.023-0.391-1.414,0l-2.448,2.448l-4.33-2.599c-0.38-0.229-0.867-0.178-1.194,0.124 c-0.326,0.302-0.413,0.783-0.215,1.181l5,10c0.144,0.287,0.417,0.488,0.734,0.54c0.321,0.051,0.641-0.054,0.867-0.28L23,51.414 l2.293,2.293c0.391,0.391,1.023,0.391,1.414,0L29,51.414l2.293,2.293c0.391,0.391,1.023,0.391,1.414,0L35,51.414l2.293,2.293 c0.391,0.391,1.023,0.391,1.414,0L41,51.414l2.293,2.293C43.481,53.896,43.737,54,44,54c0.053,0,0.106-0.004,0.16-0.013 c0.317-0.052,0.591-0.253,0.734-0.54l5-10c0.198-0.397,0.111-0.879-0.215-1.181C49.353,41.965,48.867,41.914,48.485,42.143z M43.726,51.312l-2.019-2.019c-0.391-0.391-1.023-0.391-1.414,0L38,51.586l-2.293-2.293C35.512,49.098,35.256,49,35,49 s-0.512,0.098-0.707,0.293L32,51.586l-2.293-2.293c-0.391-0.391-1.023-0.391-1.414,0L26,51.586l-2.293-2.293 c-0.391-0.391-1.023-0.391-1.414,0l-2.019,2.019l-2.844-5.688l2.055,1.233c0.394,0.235,0.897,0.174,1.222-0.15L23,44.414 l2.293,2.293c0.391,0.391,1.023,0.391,1.414,0L29,44.414l2.293,2.293c0.391,0.391,1.023,0.391,1.414,0L35,44.414l2.293,2.293 c0.391,0.391,1.023,0.391,1.414,0L41,44.414l2.293,2.293c0.324,0.325,0.827,0.386,1.222,0.15l2.055-1.233L43.726,51.312z" fill="#260A04"></path> <path d="M64,39c0-12.63-10.233-22.911-22.843-22.996c-1.623-0.746-3.351-1.3-5.157-1.633V12 c0-6.617-5.383-12-12-12c-2.206,0-4,1.794-4,4s1.794,4,4,4s4,1.794,4,4v2.371c-1.805,0.333-3.534,0.887-5.157,1.633 C10.233,16.089,0,26.37,0,39s10.233,22.911,22.843,22.996C25.633,63.279,28.733,64,32,64s6.367-0.721,9.157-2.004 C53.767,61.911,64,51.63,64,39z M24,6c-1.103,0-2-0.897-2-2s0.897-2,2-2c5.514,0,10,4.486,10,10v2.095 C33.341,14.035,32.675,14,32,14s-1.341,0.035-2,0.095V12C30,8.691,27.309,6,24,6z M45.218,59.574C50.547,55.555,54,49.174,54,42 h-2c0,11.028-8.972,20-20,20s-20-8.972-20-20h-2c0,7.174,3.453,13.555,8.782,17.574C9.218,57.616,2,49.135,2,39 s7.218-18.616,16.782-20.574C13.453,22.445,10,28.826,10,36h2c0-11.028,8.972-20,20-20s20,8.972,20,20h2 c0-7.174-3.453-13.555-8.782-17.574C54.782,20.384,62,28.865,62,39S54.782,57.616,45.218,59.574z" fill="#260A04"></path> </g> </g> </g></svg>
  `;

  // Stems
  const stem1 = document.createElement("div");
  stem1.className = "pumpkin-stem";
  stem1.style.width = "20px";
  stem1.style.height = `${stem}px`;
  stem1.style.right = `${size * 0.5}px`;
  stem1.style.top = `${size * 0.5 - stem * 0.5}px`;

  const stem2 = stem1.cloneNode(true);

  creature.appendChild(stem1);
  creature.appendChild(stem2);
  creature.appendChild(body);

  group.appendChild(dragger);
  group.appendChild(creature);

  return group;
};

/* --------------------------
   PUMPKIN CLASS (physics, drag)
---------------------------*/

class Pumpkin {
  constructor(x, y, color, size, stem, stageRef, stageSize, onComplete) {
    this.group = createPumpkinGroup({ color, size, stem });
    stageRef.current.appendChild(this.group);

    this.dragger = this.group.querySelector(".pumpkin-dragger");
    this.el = this.group.querySelector(".pumpkin-creature");
    this.onComplete = onComplete;

    this.startX = x;
    this.startY = y;
    this.radius = size * 0.5;

    gsap.set([this.dragger, this.el], {
      xPercent: -50,
      yPercent: -50,
      x,
      y,
    });

    this.qX = gsap.quickTo(this.el, "x", { duration: 0.2, ease: "back.out" });
    this.qY = gsap.quickTo(this.el, "y", { duration: 0.2, ease: "back.out" });

    // Draggable
    [this.draggable] = Draggable.create(this.dragger, {
      bounds: {
        top: 0,
        left: 0,
        width: stageSize.w,
        height: stageSize.h + this.radius,
      },
      onDragStart: () => this.setState(PumpkinStates.PULLING),
      onDragEnd: () => {
        if (this.state === PumpkinStates.DRAGGING) {
          this.setState(PumpkinStates.DROPPING);
        } else {
          this.setState(PumpkinStates.IDLE);
        }
      },
    });

    this.setState(PumpkinStates.IDLE);
  }

  /* --------------------------
     All state handlers...
     (Idle, Pulling, Dragging, Drop, Leaving)
     Same as your original, cleaned and fixed
  ---------------------------*/

  setState(next) {
    const prev = this.state;
    this.state = next;

    switch (next) {
      case PumpkinStates.IDLE:
        this.idle(prev);
        break;
      case PumpkinStates.PULLING:
        this.pulling();
        break;
      case PumpkinStates.DRAGGING:
        this.dragging();
        break;
      case PumpkinStates.DROPPING:
        this.dropping();
        break;
      case PumpkinStates.LEAVING:
        this.leaving();
        break;
      default:
        break;
    }
  }

  /* --- IDLE --- */
  idle(from) {
    if (this.pullingTicker) gsap.ticker.remove(this.pullingTicker);
    if (this.draggingTicker) gsap.ticker.remove(this.draggingTicker);

    const tl = gsap.timeline({
      onComplete: () => {
        const idleTl = gsap.timeline({ repeat: -1 });
        this.idleAnimation = idleTl;

        idleTl.to(
          this.el,
          { scaleX: 1.1, scaleY: 0.9, duration: 2 },
          0.2
        );
        idleTl.to(
          this.el,
          { scaleX: 1, scaleY: 1, duration: 1.3 },
          2.4
        );
      },
    });

    if (from === PumpkinStates.SPAWNING) {
      tl.fromTo(
        this.el,
        { scale: 0 },
        { scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" }
      );
    }
  }

  /* --- PULLING --- */
  pulling() {
    if (this.idleAnimation) this.idleAnimation.kill();

    this.pullingTicker = () => {
      const d = distance(
        this.startX,
        this.startY,
        this.draggable.x,
        this.draggable.y
      );

      const a = angle(
        this.startX,
        this.startY,
        this.draggable.x,
        this.draggable.y
      );

      const stretch = gsap.utils.clamp(
        0,
        1,
        d / 300
      );

      gsap.set(this.el, {
        rotation: a,
        scaleX: 1 + stretch * 2,
        scaleY: 1 - stretch * 0.2,
      });

      if (stretch === 1) {
        this.setState(PumpkinStates.DRAGGING);
      }
    };

    gsap.ticker.add(this.pullingTicker);
  }

  /* --- DRAGGING --- */
  dragging() {
    if (this.pullingTicker) gsap.ticker.remove(this.pullingTicker);

    let lock = true;

    const relaxTL = gsap.timeline({
      onComplete: () => {
        lock = false;
      },
    });

    relaxTL.to(this.el, {
      scaleX: 1,
      scaleY: 1,
      duration: 1,
      ease: "elastic.out",
    });

    this.draggingTicker = () => {
      const { x, y, deltaX, deltaY } = this.draggable;
      const l = length(deltaX, deltaY);

      this.qX(x);
      this.qY(y);

      if (l > 12 && !lock) {
        const a = angle(0, 0, deltaX, deltaY);
        const s = Math.min(1, l / 60);

        gsap.set(this.el, {
          rotation: a,
          scaleX: 1 + s * 0.5,
          scaleY: 1 - s * 0.2,
        });
      }
    };

    gsap.ticker.add(this.draggingTicker);
  }

  /* --- DROPPING --- */
  dropping() {
    if (this.draggingTicker) gsap.ticker.remove(this.draggingTicker);
    this.draggable.disable();

    const tl = gsap.timeline({
      onComplete: () => this.setState(PumpkinStates.LEAVING),
    });

    tl.to(this.el, {
      y: "+=300",
      scaleY: 0.5,
      scaleX: 1.3,
      duration: 0.4,
      ease: "power2.in",
    });

    tl.to(this.el, {
      scaleY: 1,
      scaleX: 1,
      duration: 0.7,
      ease: "elastic.out(1,0.4)",
    });
  }

  /* --- LEAVING (walk out) --- */
  leaving() {
    const tl = gsap.timeline({
      onComplete: () => this.destroy(),
    });

    tl.to(this.el, {
      x: "+=400",
      rotation: 10,
      duration: 1.5,
      ease: "power3.inOut",
    });

    tl.to(
      this.el,
      {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      "-=0.2"
    );
  }

  destroy() {
    this.group.remove();
    this.onComplete();
  }
}

export default function SpookyPumpkins({
  config = {
    minPumpkins: 3,
    maxPumpkins: 6,
    pumpkinColors: ["#F66C56", "#F66C56", "#F66C56"],
    minSize: 60,
    maxSize: 120,
    stemRatio: 0.9,
  },
}) {
  const {
    minPumpkins,
    maxPumpkins,
    pumpkinColors,
    minSize,
    maxSize,
    stemRatio,
  } = config;

  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });
  const pumpkins = useRef([]);
  const count = useRef(0);

  useEffect(() => {
    const update = () => {
      setStageSize({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
  }, []);

  useEffect(() => {
    if (!stageSize.w) return;

    const spawn = () => {
      const size = gsap.utils.random(minSize, maxSize);

      const pumpkin = new Pumpkin(
        gsap.utils.random(100, stageSize.w - 100),
        stageSize.h,
        gsap.utils.random(pumpkinColors),
        size,
        size * stemRatio,
        stageRef,
        stageSize,
        () => {
          count.current -= 1;
          if (count.current < minPumpkins) spawn();
          if (count.current < maxPumpkins) spawn();
        }
      );

      pumpkins.current.push(pumpkin);
      count.current -= 1;
    };

    for (let i = 0; i < minPumpkins; i += 1) {
      setTimeout(spawn, i * 400);
    }
  }, [stageSize, minPumpkins, maxPumpkins, pumpkinColors, minSize, maxSize, stemRatio]);

  return (
    <div ref={stageRef} className="pumpkin-stage"/>
  );
}