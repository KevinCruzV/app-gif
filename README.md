# GIF Explorer

Recruitment assignment implementation for Picnic. The application is a Next.js (App Router) app that lets users explore GIFs from Giphy. It shows a looping random GIF when idle and switches to an interactive search interface once a query is entered.

## Architecture Overview

- **Next.js App Router** is used to keep routing declarative while allowing both server and client components. Screen 1 (home) is a client component so that it can react to search input and random GIF polling. Screen 2 (detail) is a server component that streams the selected GIF directly from the Giphy API.
- **API routes** under `app/api/gifs/*` proxy calls to Giphy from the browser. They ensure the API key remains server-side and normalise the responses to a compact `Gif` shape consumed by the UI.
- **Client state** on the home screen lives in React hooks. The current query is mirrored into the URL (`?q=`) so navigating back from the details screen restores the previous search state automatically. Random GIF polling is paused whenever a search is active.
- **Shared utilities** in `lib/giphy.ts` centralise typing and transformation of raw Giphy responses. This makes both the API routes and UI consume the same shape.

This setup keeps the codebase small while separating cross-cutting concerns (API access vs. UI) and makes it simple to extend with additional endpoints or screens.

## Third-Party Libraries

- **Next.js 14**, **React 18** – foundation of the application, providing server components, routing, and image optimisation.
- **Vitest** – lightweight test runner for unit tests around the shared utilities.

No additional UI frameworks are used to keep styling straightforward and dependency footprint minimal.

## Design Decisions & Trade-offs

- **Server/API separation:** The detail page fetches from Giphy directly on the server because it is already rendered there. Client views use API routes to avoid exposing the API key when making browser requests.
- **Polling interval:** Random GIF refresh is fixed at 10 seconds to balance freshness with network usage. The interval stops as soon as a search becomes active to avoid wasted calls.
- **Search UX:** Live search starts after two characters with a small 250ms debounce to prevent flooding the API while keeping results responsive.
- **Minimal styling:** Layout uses vanilla CSS for clarity. The focus of the assignment is on behaviour and structure rather than visual polish.
- **Testing scope:** Unit tests cover the transformation helpers and eligibility logic. UI tests are omitted to keep the suite fast and focused on core logic per the assignment brief.

## Getting Started

1. Create an `.env.local` file with your Giphy key:

   ```bash
   GIPHY_API_KEY=7lJARDw74YrnPfvqfNWePduw0mNm0CBS
   ```

2. Install dependencies and run the development server:

   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run the unit tests with:

```bash
npm test
```

To inspect coverage:

```bash
npm run test:coverage
```
