# 🐾 PawPedia — Learn, Love & Care for Dogs

A mobile-first, installable web app (PWA) for dog lovers and future dog parents.
It is plain HTML, CSS and JS with no build step, so it deploys to Netlify as-is and can be wrapped as an Android app later.

## Features

| Section | What it does |
|---|---|
| **Breed encyclopedia** | 51 breeds from 8 regions (South Asia, East Asia, Russia & Arctic, Europe, Americas, Africa, Middle East & Central Asia, Oceania). Includes Indian breeds: Indie, Rajapalayam, Mudhol Hound, Kombai and Chippiparai. Filter by **region, country and size**, sort by energy, size, first-timer friendliness or quietness, and save favourites ❤️. |
| **Breed profile** | Real photo; play style, behaviour, best quality, dislikes, foods, ideal temperature and climate; 8 trait meters; breed-specific barks; puppy, adult and senior snapshot; common issues and fixes; optional **3D & AR view**. |
| **Bark Lab** | Pick any breed to hear its **own signature sounds** (e.g. Husky "back-talk", Beagle bay, Rottweiler rumble, Basenji yodel) with what each means, plus a universal dog-language guide in that breed's voice. **Real recordings** with a live sound visualiser. |
| **Life stages** | Breed-aware timeline from newborn to senior. Ages, expected weight, food and senior age adjust to the breed's size and lifespan. Uses **real puppy and senior photos of the breed** where available, plus breed tips and a dog-to-human age calculator. |
| **Adoption guide** | Readiness check with score · 9-step adoption journey + 3-3-3 rule · **cost planner** (₹ / $, by breed) · questions for shelters and breeders + red flags · saved checklist · first-30-days routine, training basics and introducing kids and pets. |
| **Breed match quiz** | 8 questions, one at a time, giving your top 6 breeds. Factors in climate safety, apartment size, barking tolerance and region preference. |
| **Health / Food** | Emergencies and common issues; searchable safe / moderate / toxic food list (incl. curd, roti, paneer, mango). |
| **Get a dog & services** | Revenue funnels (below). |
| **Credits** | Attribution for every photo and recording. |

Light and dark themes (follows the system, with a toggle), works offline after the first visit, and installs to the home screen.

## Design system

`css/tokens.css` defines the design system. Components only use semantic tokens, so themes (and a future Android theme) change in one place.

- **Colour:** teal primary (`--primary`, trust/health), sunny amber accent (`--accent`, play), coral (`--love`, adoption CTAs), and warm sand neutrals. Semantic roles: `--surface*`, `--text*`, `--success|warning|danger` (+ `-container`). Full dark theme included.
- **Type:** Fredoka (display) + Plus Jakarta Sans (body); scale `--fs-2xs … --fs-hero`.
- **Space / shape / motion:** 4 px grid `--sp-1…10`, radii `--r-xs…--r-pill`, shadows `--shadow-sm|md|lg`, `--ease`, `--dur*`.
- **Components** (`css/styles.css`): app bar, bottom tab bar, sheets, cards (tonal / sunny / callout), buttons (primary / love / tonal / outline / ghost), chips, tags, badges, segmented control, meters, stepper, accordions, sound cards, breed picker and the 3D viewer.

## Revenue streams built in

All forms use **Netlify Forms**. Submissions appear in the Netlify dashboard under *Forms*.

1. **`dog-query`**: "Want to get a dog?" leads. Every breed page and quiz result links here with the breed pre-filled. Monetise via breeder or shelter referral fees.
2. **`shop-waitlist`**: Dog Food Shop *coming soon* waitlist.
3. **`partner-enquiry`**: paid listings for shelters, breeders, vets, groomers, trainers and brands. The "I'm interested" buttons (vet consult, grooming, training, boarding, insurance, Premium) also land here, tagged by service.

## 3D models & "View in your space" (AR)

The breed page and Bark Lab show **🧊 View in 3D & AR** for any breed that has a model, using Google's open-source [`<model-viewer>`](https://modelviewer.dev). That's the same viewer and AR (Scene Viewer on Android, Quick Look on iPhone) as Google's 3D animals. Visitors can rotate and zoom the model, its animations (walk, idle…) play automatically, and tapping the dog plays its bark.

To add a model:

1. Get a **`.glb`** file you have the rights to use (Sketchfab CC BY models, purchased models, or commissioned ones). Keep it under ~5 MB, and use `gltf-transform optimize` if it's larger.
2. Optionally add a **`.usdz`** for iPhone AR.
3. Put the files in `/models` and register them in `js/models.js` with credit details.

## Media sources

- **Photos:** Wikimedia Commons (CC BY / CC BY-SA / public domain), resized. Every photo is credited on the image and on the Credits page.
- **Sounds:** Freesound via Openverse (CC0 / CC BY), trimmed and volume-normalised in `/sounds`. Each breed plays real recordings pitched to its size. Only the Basenji yodel and the "scream" are synthesised (labelled *Simulated*) until a freely licensed recording is found.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Form submissions only work once deployed on Netlify.

## Deploy to Netlify

1. In Netlify: **Add new site → Import an existing project →** pick this repo.
2. Leave the build command empty; the publish directory is `.` (set in `netlify.toml`).
3. Deploy. Netlify detects the three forms automatically (make sure form detection is enabled under *Site configuration → Forms*).

## Going Android later

The app is already a PWA (manifest, icons, offline service worker):

- **Trusted Web Activity (recommended first step):** use [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) or [PWABuilder](https://www.pwabuilder.com/) with your Netlify URL to generate a Play Store package, and add the generated `/.well-known/assetlinks.json`.
- **Capacitor:** wrap the same files if you later need native plugins (push notifications, payments).

## Project structure

```
index.html            App shell, icon sprite, static Netlify forms
css/tokens.css        Design tokens (light + dark)
css/styles.css        Components & layout
js/breeds.js          51 breeds: regions, traits, barks, life notes
js/data.js            Timeline, health, foods, universal barks, quiz, adoption guide data
js/credits.js         Photo & sound attributions (generated)
js/sounds.js          Real-recording sound engine + visualiser data
js/models.js          3D model registry for the AR viewer
js/app.js             Router and all views
images/               breeds/, puppies/, seniors/, stages/
sounds/               Trimmed CC0 / CC BY recordings
models/               3D models (.glb / .usdz)
sw.js                 Offline cache (shell + media)
```

When you release, bump `CACHE` in `sw.js` so returning visitors get the new version.

> Content is general educational guidance and not a substitute for a veterinarian.
