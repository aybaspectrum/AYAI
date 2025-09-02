# [REMOVED] Instafolio Sidebar Developer Guide

## Overview
This feature and all related code have been removed from the codebase as of September 2025.

---

## Feature Purpose
- Provide users with a sidebar listing all their uploaded CVs.
- Allow users to select, view, or delete any uploaded file.
- Improve navigation and management of multiple CVs within Instafolio.

---

## Component Structure
- **Sidebar Component**: Displays a list of uploaded files (filename, upload date, status).
- **Main Area**: Shows extraction results or details for the selected file.
- **File Actions**: Select, view, delete, or re-upload files.

### Key Files
- `src/app/instafolio/Sidebar.tsx` (sidebar UI logic)
- `src/app/instafolio/page.tsx` (main Instafolio page)
- `src/server/api/routers/instafolio.ts` (API endpoints for file listing, deletion, etc.)
- `uploads/` (directory for storing uploaded files)

---

## Data Flow & API
1. **Fetching Files**: Sidebar fetches the list of uploaded files from the backend (API or direct file system/database query).
2. **Selecting a File**: When a user clicks a file, the main area loads its extraction results.
3. **Deleting a File**: User can delete a file, which updates the sidebar and removes the file from storage.

---

## How to Extend or Maintain
- **Add new file actions** (e.g., rename, download) by updating the Sidebar component and corresponding API endpoints.
- **Change file metadata** (e.g., add tags or notes) by extending the file model and UI.
- **Improve performance** by paginating the file list or caching results.

---

## Best Practices
- Keep sidebar UI responsive and accessible.
- Use optimistic updates for file actions (update UI before server confirms).
- Handle errors gracefully (e.g., file not found, permission denied).
- Keep API endpoints secure and user-specific.

---

## Troubleshooting
- If files do not appear, check API connectivity and file permissions.
- If file actions fail, review backend logs for errors.
- For UI bugs, use browser dev tools and React error boundaries.

---

## Resources
- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Project README](./README.md)

---

For further questions, contact the project maintainer or check the main developer guide.
