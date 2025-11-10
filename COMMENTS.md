# Project Comments

### ESM Module Resolution with ts-node

I am using a fresh latest vite create project with latest versions for all packages.

Faced a few issues on TS config for json-server fixed those by creating a tsconfig separately as a temporary fix with a few rules.

## Implementation Approach

Created a `useFetchApplications` hook in `src/hooks/` to handle API interactions.

Benefits:

- Separation of concerns - data fetching logic isolated from UI
- Reusable hook if needed elsewhere
- Clean component code focused on rendering
- Easy to test independently

## Styling Improvements

I have never opened Figma into a proper account and font weight and colors are taken by eye

- Updated font weights to match Figma design (600 for values, 500 for labels)
- Adjusted colors: `#1a2b3c` for text, `#a0a8b1` for labels
- Made email links clickable with `mailto:` and styled in blue (`#246AC1`)
- Added hover effect on email links with underline
- Centered button using flexbox
- Button shows "Loading..." text while fetching

## For Date Formatting

- Created `formatDate` utility function in `src/utils/`
- Formats dates to DD-MM-YYYY format as per Figma design
- Wrote few tests for the utility covering edge cases
- Handles both simple date strings and ISO 8601 datetime formats

## Testing

- Set up Vitest configuration in `vite.config.ts`
- Created tests for `useFetchApplications` hook using React Testing Library
- Used global fetch mocking for API tests

### Final thoughts

I have never touched the CreateApplicationForm, as this step was not mentioned in the task list for this test. However, I could implement it, given that there were ~30 more minutes available from the two hour limit.
