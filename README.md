# AI Image Generator

 Simple Next.js app that turns text prompts into images using OpenAI's image generation (`gpt-image-1`). The UI lets you enter a prompt, trigger generation, and view the returned image inline.

## Stack
- Next.js App Router
- React 19
- OpenAI Node SDK for image generation
- Tailwind CSS (Next 13+ built-in setup)

## Prerequisites
- Node.js 18+ and pnpm (or npm/yarn/bun)
- An OpenAI API key with image generation access

## Setup
1) Install dependencies (pnpm preferred to match the lockfile):
```bash
pnpm install
```
2) Add your OpenAI key:
```bash
cp .env.example .env  # if you keep an example file
```
Then set `OPENAI_API_KEY` in `.env`. Never commit real keys.

## Running
- Dev server: `pnpm dev` then open http://localhost:3000
- Build: `pnpm build`
- Start (after build): `pnpm start`
- Lint: `pnpm lint`

## How it works
- UI at `app/page.tsx` captures a text prompt and POSTs to `/api/generate`.
- API route `app/api/generate/route.ts` calls OpenAI `gpt-image-1` with size `1024x1024`.
- Response returns a base64 data URL, rendered directly in the page.

## API
`POST /api/generate`
```json
{ "prompt": "A cozy cabin in the woods at sunset" }
```
Response:
```json
{ "image": "data:image/png;base64,..." }
```
Returns 500 with `{ "error": "No image returned from OpenAI" }` if the model fails to respond.

## Notes
- Keep prompts short and descriptive for best results.
- Add rate limiting/auth if you deploy this publicly to avoid key abuse.
