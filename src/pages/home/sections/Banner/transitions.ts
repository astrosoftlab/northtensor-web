const transitionTime = 300000 // <-- for complex animation

let complexAnDirection = 'forwards' // <-- for continuous animation
let complexIntervalFrame: NodeJS.Timer | undefined // <-- for 'always on' gradient transition
let currentPct = 0 // <-- current pct for complex animation
let complexElapsed = 0 // <-- complex elapsed time

let elements: any[] = [
  {
    className: 'orbital-bg-gradient-transition',
    colors: [
      [
        { pct: 0, color: { r: 217, g: 175, b: 255 } },
        { pct: 50, color: { r: 255, g: 216, b: 190 } },
        { pct: 100, color: { r: 191, g: 255, b: 238 } }
      ],
      [
        { pct: 0, color: { r: 180, g: 116, b: 237 } },
        { pct: 50, color: { r: 242, g: 168, b: 118 } },
        { pct: 100, color: { r: 120, g: 246, b: 213 } }
      ],
      [
        { pct: 0, color: { r: 138, g: 55, b: 214 } },
        { pct: 50, color: { r: 219, g: 121, b: 56 } },
        { pct: 100, color: { r: 56, g: 222, b: 178 } }
      ],
      [
        { pct: 0, color: { r: 104, g: 44, b: 177 } },
        { pct: 50, color: { r: 181, g: 99, b: 45 } },
        { pct: 100, color: { r: 44, g: 187, b: 149 } }
      ],
      [
        { pct: 0, color: { r: 0, g: 34, b: 144 } },
        { pct: 50, color: { r: 144, g: 57, b: 0 } },
        { pct: 100, color: { r: 1, g: 150, b: 110 } }
      ]
    ]
  },
  {
    className: 'orbital-atom-gradient-transition',
    colors: [
      [
        { pct: 0, color: { r: 16, g: 16, b: 16 } },
        { pct: 50, color: { r: 16, g: 16, b: 16 } },
        { pct: 100, color: { r: 16, g: 16, b: 16 } }
      ],
      [
        { pct: 0, color: { r: 44, g: 18, b: 67 } },
        { pct: 50, color: { r: 70, g: 39, b: 18 } },
        { pct: 100, color: { r: 20, g: 73, b: 59 } }
      ],
      [
        { pct: 0, color: { r: 147, g: 51, b: 234 } },
        { pct: 50, color: { r: 255, g: 103, b: 2 } },
        { pct: 100, color: { r: 50, g: 169, b: 137 } }
      ]
    ]
  },
  {
    className: 'orbital-nucleus-gradient-transition',
    colors: [
      [
        { pct: 0, color: { r: 222, g: 202, b: 255 } },
        { pct: 50, color: { r: 255, g: 218, b: 193 } },
        { pct: 100, color: { r: 192, g: 255, b: 238 } }
      ],
      [
        { pct: 0, color: { r: 105, g: 30, b: 226 } },
        { pct: 50, color: { r: 255, g: 103, b: 2 } },
        { pct: 100, color: { r: 50, g: 169, b: 137 } }
      ],
      [
        { pct: 0, color: { r: 172, g: 60, b: 225 } },
        { pct: 50, color: { r: 255, g: 103, b: 2 } },
        { pct: 100, color: { r: 50, g: 169, b: 137 } }
      ]
    ]
  }
]

// This function transitions between two rgb colors
const getColor = function (pct: number, colorSet: any) {
  for (var i = 1; i < colorSet.length - 1; i++) {
    if (pct < colorSet[i].pct) {
      break
    }
  }
  // This conversion figures out the transition between two rgb values
  var lower = colorSet[i - 1]
  var upper = colorSet[i]
  var range = upper.pct - lower.pct
  var rangePct = (pct - lower.pct) / range
  var pctLower = 1 - rangePct
  var pctUpper = rangePct
  var color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  }
  // And returns the rgb code
  return `${color.r}, ${color.g}, ${color.b}`
}

// This is our animation which we run on hover
export const startTransitions = function () {
  if (complexIntervalFrame === undefined) {
    complexIntervalFrame = setInterval(() => {
      let time = transitionTime / 1000
      let numberOfFrames = time * 60 // 60 frames per second -> 1 second = 60 frames

      if (currentPct >= 100) {
        complexAnDirection = 'backwards'
      } else if (currentPct <= 0) {
        complexAnDirection = 'forwards'
      }
      // If the animation is going forward
      if (complexAnDirection == 'forwards') {
        // Add 1 to elapsed
        complexElapsed += 1
        // The elapsed frames out of max frames
        currentPct = Math.min(complexElapsed / numberOfFrames, 1) * 100
      } else if (complexAnDirection === 'backwards') {
        // Otherwise we're going back - subtract 1 from ellapsed
        complexElapsed -= 1
        // The elapsed frames out of max frames
        currentPct = Math.max(complexElapsed / numberOfFrames, 0) * 100
      }

      elements = [
        {
          ...elements[0],
          gradient: `radial-gradient(50% 50% at 50% 50%, rgba(${getColor(
            currentPct,
            elements[0].colors[0]
          )}, 0.97) 0%, rgba(${getColor(currentPct, elements[0].colors[1])}, 0.79) 22%, rgba(${getColor(
            currentPct,
            elements[0].colors[2]
          )}, 0.60) 45%, rgba(${getColor(currentPct, elements[0].colors[3])}, 0.30) 73%, rgba(${getColor(
            currentPct,
            elements[0].colors[4]
          )}, 0.00) 100%)`
        },
        {
          ...elements[1],
          gradient: `radial-gradient(126.98% 126.98% at 50% -13.49%, rgb(${getColor(
            currentPct,
            elements[1].colors[0]
          )}) 35%, rgb(${getColor(currentPct, elements[1].colors[1])}) 68%, rgb(${getColor(
            currentPct,
            elements[1].colors[2]
          )}) 100%)`
        },
        {
          ...elements[2],
          gradient: `linear-gradient(113deg, rgb(${getColor(currentPct, elements[2].colors[0])}) 11.44%, rgb(${getColor(
            currentPct,
            elements[2].colors[1]
          )}) 60.27%)`,
          boxShadow: `-35.03579px -50.05113px 80.1px 0px rgba(${getColor(
            currentPct,
            elements[2].colors[2]
          )}, 0.76) inset, 0px 20.02045px 40px 0px rgba(194, 255, 255, 0.25) inset, 0px 0px 24px 0px rgba(255, 255, 255, 0.26) inset`
        }
      ]
      for (const element of elements) {
        const els = document.getElementsByClassName(element.className)
        for (let i = 0, len = els.length; i < len; i++) {
          const el = els[i] as HTMLElement
          el.style.background = element.gradient
          if (element.boxShadow) {
            el.style.boxShadow = element.boxShadow
          }
        }
      }
    }, 16.667) // 60 frames per second
  }
}
