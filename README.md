# Kameleoon-Test

Interactive conversion-rate visualization dashboard built with **React**, **TypeScript**, and **Recharts**.
Supports multiple display modes, styling configurations, theming, and PNG exporting.

GitHub Pages demo link:
[Live Demo](https://nightspirit152.github.io/kameleoon-test/)

# Visualization Library

The project uses **Recharts**, a React-based SVG visualization library, chosen for:

* declarative component API
* responsive containers
* built-in animations
* good TypeScript support
* customizable grid, axes, tooltip, legend

# Implemented Features
## Variation Filter

Allows selecting which experiment variations (Original, Variation A, Variation B, etc.) to display on the chart.

## Day / Week View

Two data aggregation modes:

* Day — raw daily data
* Week — ISO week aggregation with recalculated conversion rate``

Conversion rate formula:

`conversionRate = (conversions / visits) * 100`

Weekly labels formatted as:

`Jan 2025 — W4`

## Line Style Selector

Supports multiple chart rendering styles:

* monotone
* linear
* shadow (emphasized line with soft background)
* area chart mode

## Light / Dark Theme

Full theme support affecting:

* chart container
* axes
* grid
* legend
* tooltip
* line/area colors

## Export to PNG

One-click export of the current chart to PNG using `html-to-image`.

## Responsive Layout (671px–1300px)

Custom layout rules applied for screens between **671px** and **1300px**.

Bonus Features Summary

* Variation filter
* Day/Week aggregation
* Line style selector
* Light/Dark mode
* Export to PNG

## Local Setup

**Install dependencies:**

`npm install`

**Run locally:**

`npm run dev`
