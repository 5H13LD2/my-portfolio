# Portfolio Design Refinement Plan

This plan outlines the steps to align the portfolio's scrolling behavior, animations, and subtle design elements with the `padilla.vercel.app` reference.

## User Review Required

> [!IMPORTANT]
> - **Subtle Grid Lines**: I will add faint vertical lines on the left and right of your content, and horizontal dividers between sections to create a "structured" or "blueprint" aesthetic.
> - **Scroll Indicator**: I will add the animated mouse icon and the "PORTFOLIO" label at the top of the Featured Projects section.
> - **Project Prominence**: The first project in the "Featured" section will be styled to be more prominent (spanning full width or having a unique intro animation) to satisfy the "show first project like its featured project" requirement.

## Proposed Changes

### Global Styles & Layout
#### [MODIFY] [index.css](file:///home/jerico/Downloads/my-portfolio/src/index.css)
- Add classes for the "low visible lines" (subtle vertical and horizontal dividers).
- Define a "reveal" animation for elements as they enter the viewport (fade-in + slide-up).
- Add the scroll indicator mouse animation.

#### [MODIFY] [App.tsx](file:///home/jerico/Downloads/my-portfolio/src/App.tsx)
- Wrap the main content in a container that includes the vertical bounding lines.
- Insert the "PORTFOLIO" header and the animated scroll indicator above the Featured Projects section.
- Refactor the "Featured Projects" grid to make the first project stand out.
- Update the Intersection Observer logic to apply the new reveal animations consistently.

## Verification Plan

### Manual Verification
- Scroll from the Hero section to the Projects section and verify:
    - The animated mouse icon appears.
    - Subtle lines are visible but not distracting.
    - The first project is prominent.
    - Elements animate in smoothly.
- Test responsiveness (ensure lines don't break the layout on mobile).
