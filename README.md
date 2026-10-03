# 🐾 PawPedia — Learn, Love & Care for Dogs

A mobile-first, installable web app (PWA) for dog lovers and future dog parents.
It is plain HTML/CSS/JS with no build step, so it deploys to Netlify as-is and can be wrapped as an Android app later.

## Features

| Section | What it does |
|---|---|
| **Breed Encyclopedia** | 14 breeds (including the Indian Pariah / Indie). For each: what it loves to play, behaviour, best quality, dislikes, good foods, ideal temperature and climate, trait meters, and common health issues with how to overcome them. |
| **Bark Lab** | Synthesised barks, howls, whines and growls (Web Audio, no audio files) with an animated dog, plus what each bark means. |
| **Life Timeline** | Newborn → senior: how the dog looks, behaves, care checklist and food at each stage. Includes a dog-to-human age calculator. |
| **Health** | Common issues and emergencies (parvo, tick fever, heatstroke, bloat, rabies…): signs, prevention and what to do. Also a vaccination schedule. |
| **Food Guide** | Searchable list of safe, in-moderation and toxic foods. |
| **Adoption Guide** | Interactive "good dog parent" checklist, with progress saved on the device. |
| **Breed Match Quiz** | Six questions → top three breeds for your home, activity, climate, experience, grooming and kids. |
| **Get a Dog & Services** | Revenue funnels (below). |

## Revenue streams built in

All forms use **Netlify Forms**. Submissions appear in the Netlify dashboard under *Forms*, and you can turn on email or Slack notifications there.

1. **`dog-query`**: "Want to get a dog?" leads (adopt or buy, breed, city). Every breed page and quiz result links here with the breed pre-filled. Monetise via breeder or shelter referral fees.
2. **`shop-waitlist`**: Dog Food Shop *coming soon* waitlist, to size demand before launching e-commerce.
3. **`partner-enquiry`**: shelters, breeders, vets, groomers, trainers and brands can request paid listings or ads. The "I'm interested" buttons (vet consult, grooming, training, boarding, insurance, Premium) also land here, tagged by service, for commission or subscription offerings.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Form submissions only work once deployed on Netlify.

## Deploy to Netlify

1. In Netlify: **Add new site → Import an existing project →** pick this GitHub repo.
2. Leave the build command empty and set the publish directory to `.` (already set in `netlify.toml`).
3. Deploy. Netlify detects the three forms automatically at deploy time. Make sure form detection is enabled under *Site configuration → Forms*.

Alternatively, drag and drop the project folder onto <https://app.netlify.com/drop>.

## Going Android later

The app is already a PWA (manifest, icons, offline service worker), so there are two easy paths:

- **Trusted Web Activity (recommended first step):** use [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) or [PWABuilder](https://www.pwabuilder.com/) with your Netlify URL to generate a Play Store–ready Android package. Add the generated `/.well-known/assetlinks.json` to this repo.
- **Capacitor:** `npx cap init` with `webDir: "."` to wrap the same files in a native shell, if you later need native plugins (push notifications, payments).

## Project structure

```
index.html            App shell, all views and the static Netlify forms
success.html          No-JS form fallback page
css/styles.css        Styles (light and dark mode)
js/data.js            All content: breeds, timeline, health, foods, barks, checklist, quiz
js/dog.js             Animated SVG dog
js/bark.js            Web Audio bark/howl/whine/growl synthesiser
js/app.js             Hash router and UI logic
sw.js                 Offline cache
manifest.webmanifest  PWA manifest
netlify.toml          Netlify config and headers
```

To add a breed or food, edit `js/data.js`. To pick up changes offline, bump `CACHE` in `sw.js` when you release.

> Content is general educational guidance and not a substitute for a veterinarian.
