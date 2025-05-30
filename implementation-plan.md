# Project Modernization Plan

This document outlines the steps to modernize the Pine City Zoo website.

## Phase 1: HTML Structure and Basic CSS Cleanup

1.  **Create `implementation-plan.md`**: Initialize the plan file.
    *   Status: Done
    *   Summary: The `implementation-plan.md` file was created with the initial modernization plan.
2.  **Refactor `index.html` to use Semantic HTML5 tags**:
    *   Status: Done
    *   Summary: Replaced `div` elements with `<header>`, `<nav>`, and `<main>` tags in `index.html`. Preserved original IDs to maintain CSS targeting for now.
    *   Details: Replace `div` elements used for semantic sections (like header, navigation, main content) with appropriate HTML5 tags (e.g., `<header>`, `<nav>`, `<main>`, `<footer>`).
3.  **Update `style.css` to reflect HTML changes**:
    *   Status: Done
    *   Summary: Verified existing ID selectors in `style.css` still apply after HTML tag changes. Performed basic CSS cleanup.
    *   Details: Adjust selectors in `style.css` to match the new semantic tags in `index.html`.
4.  **Basic CSS Cleanup in `style.css`**:
    *   Status: Done
    *   Summary: Removed commented-out `background-color` from `#header` and duplicate `.tortoise` styles from `style.css`.
    *   Details: Remove commented-out code, duplicate styles, and any other obviously unused CSS.

## Phase 2: CSS Layout and Responsiveness

1.  **Introduce CSS Variables in `style.css`**:
    *   Status: Done
    *   Summary: Defined CSS custom properties for common colors, fonts, and image URLs in `style.css`. Updated existing rules to use these variables.
    *   Details: Define and use CSS custom properties for colors, fonts, and spacing.
2.  **Refactor Layout using Flexbox/Grid in `style.css`**:
    *   Status: Done
    *   Summary: Refactored `#tabs-top` and `#tabs-bottom` to use Flexbox for layout of navigation links. Removed floats and updated related styling for anchor tags.
    *   Details: Modernize layout for header, navigation, and main content areas using Flexbox or CSS Grid.
3.  **Improve Responsiveness**:
    *   Status: Done
    *   Summary: Added horizontal padding to main content areas (`#main-home`, `#main`, `#content`) to improve text flow on smaller screens. Noted that further work with media queries might be needed for full responsiveness.
    *   Details: Add/refine media queries and use flexible units for better adaptability across devices.

## Phase 3: JavaScript and Map Interaction

1.  **Review and Refactor `map.js`**:
    *   Status: Done
    *   Summary: Refactored `map.js` to manage a single info box, allow closing by clicking the same pin or outside, added basic off-screen position adjustment for the info box, and escaped characters in content strings. Validated `data-location` attribute presence.
    *   Details: Update JavaScript to ES6+ syntax, optimize event handling and DOM manipulation.
2.  **Address Overlapping Map Pins**:
    *   Status: Done
    *   Summary: Adjusted `top` and `left` percentages for overlapping map pin classes in `style.css` to provide unique coordinates. Noted that `map.js` `getLocationData` needs updating for new animal-specific classes.
    *   Details: Modify `style.css` and/or `map.js` to ensure map location pins are displayed correctly without overlapping.

## Phase 4: Accessibility and Other Pages

1.  **Improve Accessibility (a11y)**:
    *   Status: Done
    *   Summary: Made map pins focusable and activatable via keyboard. Added Escape key closure and ARIA roles for info box. Added a close button to info box and managed focus transfer.
    *   Details: Ensure keyboard navigation, add ARIA attributes, and check color contrast.
2.  **Apply Improvements to Other HTML Pages**:
    *   Status: Done
    *   Summary: Refactored all remaining HTML pages (`animals-page.html`, `feedback-page.html`, `amphitheatre-page.html`, `dine-page.html`, `elephant-page.html`, `gemsbok-page.html`, `giraffe-page.html`, `gorilla-page.html`, `ice-cream-page.html`, `insect-house-page.html`, `koalas-page.html`, `lion-page.html`, `lost-forrest-page.html`, `monkey-page.html`, `monkey-trail-page.html`, `mos-pizza-page.html`, `pandas-page.html`, `rhino-beetle-page.html`, `tiger-page.html`, `warthog-page.html`, `wild-things-page.html`, `map-page.html`, `places-page.html`, `weather-page.html`) to use semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<article>`), corrected document structure, and ensured consistent placement of navigation elements. Standardized content wrappers and fixed minor issues like incorrect titles or missing headings.
    *   Details: Extend semantic HTML changes and relevant CSS improvements to all other HTML pages in the project.

## Phase 5: New Content Pages

1.  **Create Visitor Information / FAQ Page**:
    *   Status: Done
    *   Summary: Created `visitor-info.html` with sections for opening hours, tickets, directions, accessibility, rules, facilities, FAQs, and contact info. Added corresponding styles to `style.css` for consistent presentation.
    *   Details: Create a new page (`visitor-info.html`) to provide practical information for zoo visitors, including opening hours, ticket prices, directions, accessibility information, zoo rules, facilities, and FAQs. Style the page consistently with the rest of the site.

2.  **Create Events & Shows Page**:
    *   Status: Done
    *   Summary: Created `events-page.html` with sections for daily schedule, Amphitheatre shows, and special/upcoming events. Added corresponding styles to `style.css`. Updated bottom navigation on all pages to include links to Visitor Info and Events.
    *   Details: Create a new page (`events-page.html`) to showcase daily activities, special events, and shows at the zoo. This page will help visitors plan their day by providing schedules and details for various happenings.

3.  **Enhance Map Page with Additional Locations**:
    *   Status: Done
    *   Summary: Added new interactive pins to `map-page.html` for various animal habitats and the ice-cream shop. Updated `map.js` with corresponding titles, descriptions, and location details for these new pins, sourcing information from their respective individual pages. Existing CSS in `style.css` is used for pin positioning.
    *   Details: Add missing locations (primarily animal habitats and ice-cream shop) to `map-page.html` as interactive pins. Update `map.js` with corresponding information (titles, descriptions, locations) for these new pins, drawing data from individual animal/place pages. Ensure CSS positioning in `style.css` correctly displays new pins.

4.  **Refine Map Pin Appearance with Icons**:
    *   Status: Done
    *   Summary: Replaced letter-based map pins on `map-page.html` with appropriate Font Awesome icons. Updated `.map-location` divs in HTML and adjusted styles in `style.css` to ensure icons are displayed clearly with correct color and size within the pins.
    *   Details: Replace letter-based map pins on `map-page.html` with Font Awesome icons to improve visual clarity and reduce crowdedness. Update `.map-location` divs in HTML and adjust styles in `style.css` as needed for optimal icon display. 