# Page Popper Lite

A browser extension that adds confetti celebrations to any webpage. Works together with the Page Popper website.

## What it does

Page Popper Lite enables confetti effects on any website you visit. The extension listens for triggers from the Page Popper website and displays beautiful confetti animations.

### How it works with the website

1. **User visits the Page Popper website** and configures their confetti celebration (preset style, timer duration, target URL).

2. **Website encodes config in URL hash**: When the countdown completes, the website opens a new tab with the target URL and appends a special hash parameter:
   ```
   https://example.com#pagepopper={"config":{...},"presetName":"Fireworks"}
   ```

3. **Extension detects the hash**: The content script runs on every page and checks for the `pagepopper=` parameter in the URL hash.

4. **Confetti triggers**: The extension parses the config and triggers the confetti animation on the target page.

5. **Cleanup**: The hash is removed from the URL to prevent re-triggering on refresh.

### Communication flow

```
Website (configures confetti)
    |
    | window.open(url + "#pagepopper=...")
    v
New Tab Opens (target website)
    |
    | Extension content script detects hash
    v
Confetti Animation Plays
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
pnpm install
# or
npm install
```

### Development

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Load the extension in your browser:

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `build/chrome-mv3-dev` folder

The extension will auto-reload as you make changes.

## Building

### Chrome (Manifest V3)

```bash
pnpm build
# or
npm run build
```

Output: `build/chrome-mv3-prod`

### Firefox (Manifest V2)

```bash
pnpm build:firefox
```

Output: `build/firefox-mv2-prod`

#### Firefox requires adding the following to `manifest.json`

```json
"browser_specific_settings": {
        "gecko": {
            "id": "extension-name@domain.com",
            "strict_min_version": "109.0",
            "data_collection_permissions": {
                "required": false
            }
        }
    }
```

### Package as ZIP

```bash
# Chrome
pnpm build:zip

# Firefox
pnpm build:firefox:zip
```

## Project Structure

```
extension-lite/
├── content.ts          # Content script - detects URL hash and triggers confetti
├── popup.tsx           # Extension popup UI
├── confetti-effects.ts # Confetti animation handlers
├── confetti-utils.ts   # Shared utilities and presets
├── package.json        # Dependencies and scripts
└── .github/
    └── workflows/
        └── release.yml # Auto-build and release on version tags
```

## Releasing

The project uses GitHub Actions for automated releases.

### Manual release process

1. Bump version in `package.json`:
   ```json
   "version": "0.2.0"
   ```

2. Commit, tag, and push:
   ```bash
   git add package.json
   git commit -m "chore: bump version to 0.2.0"
   git tag -a v0.2.0 -m "Release v0.2.0"
   git push && git push --tags
   ```

3. GitHub Actions will automatically:
   - Build Chrome and Firefox extensions
   - Create a GitHub Release with zip files
   - Clean up old releases (keeps latest 5)

### Release artifacts

- `pagepopper-lite-chrome-{version}.zip`
- `pagepopper-lite-firefox-{version}.zip`

## License

MIT

**Note:** This extension is intentionally kept simple. It serves its original purpose of triggering confetti on webpages via the Page Popper website. The author prefers to maintain simplicity over adding more features.
