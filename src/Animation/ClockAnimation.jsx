import React, { useEffect, useRef } from 'react';
import { TimelineMax, SteppedEase } from 'gsap';
function ClockAnimation() {
  const secondsHandRef = useRef(null);
  const minutesHandRef = useRef(null);
  const hourHandRef = useRef(null);

  useEffect(() => {
    const tl = new TimelineMax({ repeat: -1 });
    const totalDur = 60 * 60; // Number of seconds * number of minutes each hour

    tl.to(
      secondsHandRef.current,
      totalDur / 3600,
      {
        rotation: 360,
        transformOrigin: "50% 90%",
        ease: SteppedEase.config(60),
        repeat: -1,
      },
      0
    );
    tl.to(
      minutesHandRef.current,
      totalDur / 60,
      {
        rotation: 360,
        transformOrigin: "50% 90%",
        ease: SteppedEase.config(60),
        repeat: -1,
      },
      0
    );
    tl.to(
      hourHandRef.current,
      totalDur / 5,
      {
        rotation: 360,
        transformOrigin: "50% 90%",
        ease: SteppedEase.config(60),
        repeat: -1,
      },
      0
    );

    // Clean up the animation when the component unmounts
    return () => {
      tl.kill();
    };
  }, []);
  return (
    <svg width="262" height="262" xmlnsXlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient x1="0%" y1="0%" y2="100%" id="linearGradient-1">
          <stop stop-color="#507FF8" offset="0%" />
          <stop stop-color="#58EBE5" offset="100%" />
        </linearGradient>
        <circle id="path-2" cx="112" cy="112" r="112" />
        <filter
          x="-15.2%"
          y="-10.3%"
          width="130.4%"
          height="130.4%"
          filterUnits="objectBoundingBox"
          id="filter-3"
        >
          <feOffset dy="11" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="9.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feComposite
            in="shadowBlurOuter1"
            in2="SourceAlpha"
            operator="out"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <filter
          x="-14.3%"
          y="-9.4%"
          width="128.6%"
          height="128.6%"
          filterUnits="objectBoundingBox"
          id="filter-4"
        >
          <feGaussianBlur
            stdDeviation="6.5"
            in="SourceAlpha"
            result="shadowBlurInner1"
          />
          <feOffset
            dx="-3"
            dy="13"
            in="shadowBlurInner1"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            values="0 0 0 0 0.176470588 0 0 0 0 0.48627451 0 0 0 0 0.737254902 0 0 0 1 0"
            in="shadowInnerInner1"
          />
        </filter>
        <circle id="path-5" cx="112" cy="112" r="32" />
        <filter
          x="-10.9%"
          y="-10.9%"
          width="121.9%"
          height="121.9%"
          filterUnits="objectBoundingBox"
          id="filter-6"
        >
          <feGaussianBlur
            stdDeviation="3"
            in="SourceAlpha"
            result="shadowBlurInner1"
          />
          <feOffset
            dx="-3"
            dy="8"
            in="shadowBlurInner1"
            result="shadowOffsetInner1"
          />
          <feComposite
            in="shadowOffsetInner1"
            in2="SourceAlpha"
            operator="arithmetic"
            k2="-1"
            k3="1"
            result="shadowInnerInner1"
          />
          <feColorMatrix
            values="0 0 0 0 0.896116395 0 0 0 0 0.896116395 0 0 0 0 0.896116395 0 0 0 1 0"
            in="shadowInnerInner1"
          />
        </filter>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-7"
        >
          <stop stop-color="#8A8BC4" offset="0%" />
          <stop stop-color="#6460A2" offset="100%" />
        </linearGradient>
        <rect
          id="path-8"
          x=".72"
          y="15.734"
          width="7.68"
          height="89.6"
          rx="3.84"
        />
        <filter
          x="-130.2%"
          y="-5.6%"
          width="360.4%"
          height="122.3%"
          filterUnits="objectBoundingBox"
          id="filter-9"
        >
          <feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="2.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <linearGradient
          x1="50%"
          y1="100%"
          x2="50%"
          y2="0%"
          id="linearGradient-10"
        >
          <stop stop-color="#6460A2" offset="0%" />
          <stop stop-color="#8A8BC4" offset="100%" />
        </linearGradient>
        <rect
          id="path-11"
          x=".72"
          y="39.734"
          width="7.68"
          height="66"
          rx="3.84"
        />
        <filter
          x="-130.2%"
          y="-7.6%"
          width="360.4%"
          height="130.3%"
          filterUnits="objectBoundingBox"
          id="filter-12"
        >
          <feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="2.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-13"
        >
          <stop stop-color="#FE85A3" offset="0%" />
          <stop stop-color="#BC87D8" offset="100%" />
        </linearGradient>
        <rect
          id="path-14"
          x="2.72"
          y=".734"
          width="3.84"
          height="104.96"
          rx="1.92"
        />
        <filter
          x="-260.4%"
          y="-4.8%"
          width="620.8%"
          height="119.1%"
          filterUnits="objectBoundingBox"
          id="filter-15"
        >
          <feOffset dy="5" in="SourceAlpha" result="shadowOffsetOuter1" />
          <feGaussianBlur
            stdDeviation="2.5"
            in="shadowOffsetOuter1"
            result="shadowBlurOuter1"
          />
          <feColorMatrix
            values="0 0 0 0 0.737254902 0 0 0 0 0.529411765 0 0 0 0 0.847058824 0 0 0 0.4 0"
            in="shadowBlurOuter1"
          />
        </filter>
        <linearGradient
          x1="50%"
          y1="0%"
          x2="50%"
          y2="100%"
          id="linearGradient-16"
        >
          <stop stop-color="#E7F5FF" offset="0%" />
          <stop stop-color="#6A64C5" offset="100%" />
        </linearGradient>
      </defs>
      <g id="Page-1" fill="none" fill-rule="evenodd">
        <g id="Artboard" transform="translate(-56 -171)">
          <g id="Nigeria" transform="translate(75 179)">
            <g id="Clock">
              <g id="Static">
                <g id="Outer-Circle">
                  <use
                    fill="black"
                    filter="url(#filter-3)"
                    xlinkHref="#path-2"
                  />
                  <use fill="#FFFFH" xlinkHref="#path-2" />
                  <use
                    fill="black"
                    filter="url(#filter-4)"
                    H
                    xlinkHref="#path-2"
                  />
                  <circle
                    stroke="url(#linearGradient-1)"
                    stroke-width="9.6"
                    stroke-linejoin="square"
                    cx="112"
                    cy="112"
                    r="107.2"
                  />
                </g>
                <g id="Calibration" transform="translate(8.96 8.96)">
                  <path
                    d="M0 101.12h10.88a1.92 1.92 0 1 1 0 3.84H0v-3.84z"
                    id="Rectangle"
                    fill="#529CF3"
                  />
                  <path
                    d="M195.2 101.12h10.88v3.84H195.2a1.92 1.92 0 1 1 0-3.84z"
                    id="Rectangle"
                    fill="#56CEEA"
                  />
                  <path
                    d="M96.64 4.48h10.88a1.92 1.92 0 1 1 0 3.84H96.64V4.48z"
                    id="Rectangle"
                    fill="#529CF3"
                    transform="rotate(90 103.04 6.4)"
                  />
                  <path
                    d="M50.154 15.251h5.12a1.28 1.28 0 0 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#5192F4"
                    transform="rotate(60 53.354 16.531)"
                  />
                  <path
                    d="M12.949 51.411h5.12a1.28 1.28 0 1 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#5293F5"
                    transform="rotate(30 16.149 52.691)"
                  />
                  <path
                    d="M149.909 188.371h5.12a1.28 1.28 0 0 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#57D7E9"
                    transform="rotate(-120 153.109 189.651)"
                  />
                  <path
                    d="M50.069 187.731h5.12a1.28 1.28 0 0 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#55BEED"
                    transform="scale(1 -1) rotate(60 380.646 0)"
                  />
                  <path
                    d="M13.589 151.251h5.12a1.28 1.28 0 0 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#53ACF0"
                    transform="scale(1 -1) rotate(30 586.043 0)"
                  />
                  <path
                    d="M187.029 151.891h5.12a1.28 1.28 0 0 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#57D7E9"
                    transform="rotate(-150 190.229 153.171)"
                  />
                  <path
                    d="M149.331 15.509h5.12a1.28 1.28 0 1 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#53ACF0"
                    transform="scale(-1 1) rotate(60 0 -247.403)"
                  />
                  <path
                    d="M185.811 51.989h5.12a1.28 1.28 0 1 1 0 2.56h-5.12v-2.56z"
                    id="Rectangle"
                    fill="#55BEED"
                    transform="scale(-1 1) rotate(30 0 -652.131)"
                  />
                  <path
                    d="M98.56 197.76h10.88v3.84H98.56a1.92 1.92 0 1 1 0-3.84z"
                    id="Rectangle"
                    fill="#56CEEA"
                    transform="rotate(90 103.04 199.68)"
                  />
                </g>
                <use
                  filter="url(#filter-6)"
                  H
                  xlinkHref="#path-5"
                  id="Inner-Circle"
                  fill="black"
                />
              </g>
              <g id="Ticking" transform="translate(107.28 14.266)">
                <g id="Minute-hand" ref={minutesHandRef}>
                  <use
                    fill="black"
                    filter="url(#filter-9)"
                    H
                    xlinkHref="#path-8"
                  />
                  <use fill="url(#linearGradient-H" xlinkHref="#path-8" />
                </g>
                <g id="Hour-hand" ref={hourHandRef}>
                  <use
                    fill="black"
                    filter="url(#filter-12)"
                    H
                    xlinkHref="#path-11"
                  />
                  <use fill="url(#linearGradient-10)" H xlinkHref="#path-11" />
                </g>
                <g id="Seconds-hand" ref={secondsHandRef}> 
                  <use
                    fill="black"
                    filter="url(#filter-15)"
                    H
                    xlinkHref="#path-14"
                  />
                  <use fill="url(#linearGradient-13)" H xlinkHref="#path-14" />
                </g>
                <circle
                  id="Knob"
                  fill="url(#linearGradient-16)"
                  cx="4.72"
                  cy="97.734"
                  r="4.48"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default ClockAnimation;
