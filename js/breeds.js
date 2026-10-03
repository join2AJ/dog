/* PawPedia breed data.
 * General educational guidance only; always confirm health and diet decisions with a vet.
 *
 * Ratings are 1–5. `barks` are breed-specific vocalisations; `s` is a key in SOUNDS (js/sounds.js).
 * `issues` are [problem, how to prevent or manage]. `life` holds breed-specific notes per life stage. */

window.REGIONS = [
  { id: "south-asia", name: "South Asia", icon: "🛕" },
  { id: "east-asia", name: "East Asia", icon: "🏯" },
  { id: "arctic", name: "Russia & Arctic", icon: "❄️" },
  { id: "europe", name: "Europe", icon: "🏰" },
  { id: "americas", name: "Americas", icon: "🗽" },
  { id: "africa", name: "Africa", icon: "🌍" },
  { id: "middle-east", name: "Middle East & Central Asia", icon: "🏜️" },
  { id: "oceania", name: "Oceania", icon: "🦘" }
];

window.BREEDS = [
  /* ───────────── South Asia ───────────── */
  {
    id: "indie", name: "Indian Pariah (Indie)", region: "south-asia", country: "India", flag: "🇮🇳",
    size: "Medium", weight: "15–30 kg", lifespan: "13–16 years", group: "Primitive / pariah",
    energy: 4, grooming: 1, apartment: 4, firstTime: 4, kids: 4, heatTolerance: 5, coldTolerance: 3, barkiness: 4,
    temperament: ["Alert", "Intelligent", "Loyal"],
    play: ["Chasing games", "Running & exploring", "Puzzle feeders", "Sniff walks"],
    behaviour: "Naturally alert and territorial, which makes it an excellent watchdog. Very clean and quick to learn. Bonds deeply with its family but can be wary of strangers until socialised.",
    bestQuality: "One of the world's oldest dog types. Hardy and healthy, with very few genetic problems, and made for the Indian climate.",
    dislikes: ["Being tied up or chained", "No outdoor time", "Rough handling"],
    foods: ["Home-cooked chicken & rice", "Plain curd (small amounts)", "Boiled eggs"],
    idealTemp: "18–32 °C",
    climate: "Evolved for South Asian heat. Still needs shade and water in peak summer.",
    issues: [["Ticks & tick fever", "Use a monthly vet-recommended tick preventive and check the coat after walks."], ["Skin infections", "Keep bedding dry and don't over-bathe (every 3–4 weeks is enough)."], ["Parvovirus in pups", "Complete all puppy vaccines before meeting unknown dogs."]],
    barks: [
      { s: "alert", t: "Night-watch alarm", when: "A stranger, cow or another dog near the gate after dark", says: "\"This is MY street. Everyone, wake up!\"" },
      { s: "howl", t: "Siren howl", when: "Ambulance sirens or temple bells", says: "\"I hear the pack calling. I'm answering!\"" },
      { s: "excited", t: "Welcome-home talk", when: "You return home", says: "\"Finally! Where were you? I missed you!\"" }
    ],
    life: { puppy: "Indie pups are quick learners. Start house-training and name recall from week 8.", adult: "Needs about 1–1.5 hours of activity a day. Loves free running in a safe, fenced area.", senior: "Usually ages well. Watch for arthritis and keep up tick prevention." }
  },
  {
    id: "rajapalayam", name: "Rajapalayam", region: "south-asia", country: "India", flag: "🇮🇳",
    size: "Large", weight: "22–30 kg", lifespan: "10–12 years", group: "Sighthound / guardian",
    energy: 4, grooming: 1, apartment: 1, firstTime: 2, kids: 3, heatTolerance: 5, coldTolerance: 2, barkiness: 3,
    temperament: ["Regal", "Protective", "One-person dog"],
    play: ["Sprinting in open ground", "Lure chasing", "Patrolling the yard", "Long walks"],
    behaviour: "A tall, milk-white hound from Tamil Nadu, once used to hunt wild boar and guard homes. Deeply loyal to its own family and aloof or suspicious with strangers.",
    bestQuality: "An elegant, fearless guardian with great speed. Featured on an Indian postage stamp.",
    dislikes: ["Strangers handling it", "Small cramped spaces", "Being left alone"],
    foods: ["High-protein home-cooked meat", "Quality large-breed kibble", "Boiled eggs"],
    idealTemp: "20–34 °C",
    climate: "Built for hot, dry South Indian weather. Its thin coat makes it feel the cold, so use a blanket in winter.",
    issues: [["Congenital deafness (white coat)", "Get a BAER hearing test as a puppy. Deaf dogs learn hand signals well."], ["Skin sensitivity & sunburn", "Its pink skin burns, so give shade at midday."], ["Hip dysplasia", "Keep it lean and choose screened parents."]],
    barks: [
      { s: "deep", t: "Gate-guard bark", when: "An unknown person approaches the property", says: "\"Stop right there. You're not family.\"" },
      { s: "growl", t: "Low warning", when: "A stranger reaches to touch it", says: "\"I don't know you. Please don't.\"" },
      { s: "whine", t: "Missing-you whine", when: "Its one special person leaves", says: "\"Don't go without me!\"" }
    ],
    life: { puppy: "Needs very early, gentle socialisation with visitors to avoid over-guarding.", adult: "Needs daily sprinting in a safe, fenced space. Not suited to apartments.", senior: "Keep the skin protected from sun, and get yearly hearing and joint checks." }
  },
  {
    id: "mudhol", name: "Mudhol Hound", region: "south-asia", country: "India", flag: "🇮🇳",
    size: "Large", weight: "22–28 kg", lifespan: "13–14 years", group: "Sighthound",
    energy: 5, grooming: 1, apartment: 1, firstTime: 2, kids: 3, heatTolerance: 5, coldTolerance: 2, barkiness: 2,
    temperament: ["Graceful", "Athletic", "Reserved"],
    play: ["Full-speed running", "Lure coursing", "Chasing a flirt pole", "Exploring fields"],
    behaviour: "A slim, lightning-fast sighthound from Karnataka (also called the Caravan Hound). Gentle and quiet at home, but has a strong urge to chase anything that runs.",
    bestQuality: "Exceptional stamina and speed. It has been inducted into the Indian Army and paramilitary forces.",
    dislikes: ["Being confined", "Cold, damp weather", "Rough treatment"],
    foods: ["Lean meats", "Rice with chicken", "Measured high-protein kibble"],
    idealTemp: "20–35 °C",
    climate: "Thrives in dry heat. Its thin coat and low body fat mean it feels cold quickly.",
    issues: [["Injuries from running", "Only let it run off-leash in enclosed areas and check the paws after."], ["Anaesthesia sensitivity (lean body)", "Tell your vet it is a sighthound before any surgery."], ["Ticks", "Use monthly tick prevention."]],
    barks: [
      { s: "bark", t: "Sighting alert", when: "It spots a cat, squirrel or rabbit", says: "\"Something's moving out there. Let me chase it!\"" },
      { s: "whine", t: "Restless whine", when: "It hasn't had its run today", says: "\"I need to RUN. Please!\"" },
      { s: "excited", t: "Play grumble", when: "Zoomies time", says: "\"Catch me if you can!\"" }
    ],
    life: { puppy: "Keep play gentle on growing joints. Train recall early with high-value treats.", adult: "Needs a daily sprint session plus long walks. Calm and lazy indoors afterwards.", senior: "Provide soft bedding (bony body) and keep it warm in winter." }
  },
  {
    id: "kombai", name: "Kombai", region: "south-asia", country: "India", flag: "🇮🇳",
    size: "Medium", weight: "20–30 kg", lifespan: "12–14 years", group: "Guardian / hunting",
    energy: 4, grooming: 1, apartment: 2, firstTime: 1, kids: 3, heatTolerance: 5, coldTolerance: 3, barkiness: 4,
    temperament: ["Fearless", "Protective", "Devoted"],
    play: ["Tug of war", "Patrolling", "Fetch", "Agility games"],
    behaviour: "A muscular, red-coated dog with a black mask from Tamil Nadu, historically used to guard and hunt boar. Fiercely protective of family and property, and suspicious of outsiders.",
    bestQuality: "Brave and loyal: one of India's finest native guard dogs.",
    dislikes: ["Strangers in its territory", "Inconsistent rules", "Isolation"],
    foods: ["Lean meat & rice", "Boiled eggs", "Quality kibble"],
    idealTemp: "20–34 °C",
    climate: "Tough and heat-hardy, suited to South Indian weather.",
    issues: [["Over-guarding / aggression", "Socialise widely from puppyhood and use calm, reward-based training."], ["Ticks", "Use monthly tick prevention."], ["Injuries from fights", "Supervise it around unfamiliar dogs."]],
    barks: [
      { s: "deep", t: "Territory alarm", when: "Someone unfamiliar approaches", says: "\"This house is protected!\"" },
      { s: "growl", t: "Serious growl", when: "It feels its family is threatened", says: "\"Back away. Now.\"" },
      { s: "bark", t: "Play challenge", when: "During tug or chase games", says: "\"Is that all you've got?\"" }
    ],
    life: { puppy: "Needs puppy classes and lots of friendly visitors. Its guarding instinct shows early.", adult: "Give it a job: patrol walks, obedience and puzzle feeders.", senior: "Generally healthy. Keep it fit to protect the joints." }
  },
  {
    id: "chippiparai", name: "Chippiparai", region: "south-asia", country: "India", flag: "🇮🇳",
    size: "Medium", weight: "15–22 kg", lifespan: "12–14 years", group: "Sighthound",
    energy: 4, grooming: 1, apartment: 2, firstTime: 3, kids: 3, heatTolerance: 5, coldTolerance: 1, barkiness: 2,
    temperament: ["Loyal", "Gentle", "Sensitive"],
    play: ["Sprints", "Lure chasing", "Gentle tug", "Long walks"],
    behaviour: "A sleek sighthound from the Madurai region, traditionally kept by royal families. Very attached to its owner and shy with strangers. Calm at home.",
    bestQuality: "A graceful, clean and low-maintenance one-family dog.",
    dislikes: ["Cold weather", "Harsh voices", "Being crowded by strangers"],
    foods: ["Chicken & rice", "Boiled eggs", "Lean fish (boneless)"],
    idealTemp: "22–35 °C",
    climate: "Loves heat. Use a jacket in cool or rainy weather.",
    issues: [["Feeling cold (very thin coat)", "Give it a coat and a padded bed in winter."], ["Injuries while running", "Only run it off-leash in enclosed areas."], ["Ticks", "Use monthly prevention."]],
    barks: [
      { s: "bark", t: "Polite alert", when: "Someone knocks", says: "\"Someone's at the door. Just letting you know.\"" },
      { s: "whine", t: "Shy whine", when: "Meeting strangers", says: "\"I'm unsure. Stay close to me.\"" },
      { s: "excited", t: "Happy chatter", when: "Its favourite person comes home", says: "\"You're back!\"" }
    ],
    life: { puppy: "Sensitive pups need gentle handling and positive exposure to people.", adult: "Needs a daily run and soft bedding (very lean body).", senior: "Keep it warm and check the teeth regularly." }
  },

  /* ───────────── East Asia ───────────── */
  {
    id: "tibetan-mastiff", name: "Tibetan Mastiff", region: "east-asia", country: "Tibet, China", flag: "🇨🇳",
    size: "Giant", weight: "45–73 kg", lifespan: "10–12 years", group: "Guardian",
    energy: 2, grooming: 4, apartment: 1, firstTime: 1, kids: 3, heatTolerance: 1, coldTolerance: 5, barkiness: 4,
    temperament: ["Independent", "Protective", "Aloof"],
    play: ["Patrolling its territory", "Slow walks", "Lying in the snow", "Gentle tug"],
    behaviour: "An ancient Himalayan guardian of flocks and monasteries. Independent and strong-willed, and often more active and vocal at night. Matures slowly, up to 3–4 years.",
    bestQuality: "An impressive, devoted guardian with a lion-like mane.",
    dislikes: ["Heat", "Strangers on its land", "Being bossed around"],
    foods: ["Giant-breed kibble", "Lean meat", "Fish (cooked, boneless)"],
    idealTemp: "-10–18 °C",
    climate: "Built for the cold Tibetan plateau. Unsuitable for hot climates without air conditioning.",
    issues: [["Hip & elbow dysplasia", "Feed for slow growth, keep it lean, and choose screened parents."], ["Hypothyroidism", "Get a blood test if it has weight gain, a dull coat or lethargy."], ["Entropion (eyelid)", "See a vet for watery or squinting eyes."]],
    barks: [
      { s: "deep", t: "Midnight boom", when: "Noises at night", says: "\"I'm on duty. Nobody gets past me.\"" },
      { s: "growl", t: "Rumbling warning", when: "A stranger enters", says: "\"I see you. Don't test me.\"" },
      { s: "howl", t: "Mountain howl", when: "Distant dogs or sirens", says: "\"Guardian here. Reporting in!\"" }
    ],
    life: { puppy: "Grows for up to 2 years. Use a giant-breed puppy diet and avoid stairs and jumping.", adult: "Low-to-moderate exercise needs, but needs a secure, spacious yard.", senior: "Ageing joints need an orthopedic bed and weight control." }
  },
  {
    id: "lhasa-apso", name: "Lhasa Apso", region: "east-asia", country: "Tibet, China", flag: "🇨🇳",
    size: "Small", weight: "5–8 kg", lifespan: "12–15 years", group: "Companion / watchdog",
    energy: 3, grooming: 5, apartment: 5, firstTime: 4, kids: 3, heatTolerance: 2, coldTolerance: 4, barkiness: 4,
    temperament: ["Confident", "Alert", "Independent"],
    play: ["Short indoor fetch", "Puzzle toys", "Patrolling windows", "Short walks"],
    behaviour: "Bred as an indoor sentinel in Tibetan monasteries, so it barks to announce visitors. Affectionate with family, cautious with strangers, and quite independent.",
    bestQuality: "A small but brave watchdog with a beautiful, low-shedding coat.",
    dislikes: ["Rough handling", "Strangers getting too close", "Heat"],
    foods: ["Small-bite kibble", "Boiled chicken", "Carrot bits"],
    idealTemp: "12–24 °C",
    climate: "A long coat for mountain cold. Keep it cool in summer, and consider a short trim.",
    issues: [["Eye problems (PRA, cherry eye)", "Wipe the eyes daily and see a vet for redness or cloudiness."], ["Matting & skin issues", "Brush daily or keep it trimmed short."], ["Kidney disease", "Get yearly blood and urine tests as it ages."]],
    barks: [
      { s: "yap", t: "Monastery alarm", when: "A visitor arrives", says: "\"Visitor! Visitor! Announcing the visitor!\"" },
      { s: "growl", t: "Mini warning", when: "A stranger picks it up", says: "\"Put me down. We haven't been introduced.\"" },
      { s: "whine", t: "Attention whine", when: "Ignored too long", says: "\"Excuse me, I'm still here.\"" }
    ],
    life: { puppy: "Start gentle grooming and handling sessions early.", adult: "Daily walks and short play. Groom every day or every other day.", senior: "Watch the eyes and kidneys, and keep the teeth clean." }
  },
  {
    id: "shih-tzu", name: "Shih Tzu", region: "east-asia", country: "China", flag: "🇨🇳",
    size: "Small", weight: "4–7 kg", lifespan: "10–16 years", group: "Companion",
    energy: 2, grooming: 5, apartment: 5, firstTime: 5, kids: 4, heatTolerance: 2, coldTolerance: 3, barkiness: 3,
    temperament: ["Affectionate", "Playful", "Outgoing"],
    play: ["Indoor fetch with small toys", "Gentle tug", "Learning tricks", "Lap time"],
    behaviour: "Bred purely as a palace companion, so it loves people and attention. Usually friendly with guests. Can be slow to house-train.",
    bestQuality: "A sweet, adaptable lap dog that sheds very little.",
    dislikes: ["Heat", "Being left alone", "Rough play"],
    foods: ["Small-bite kibble", "Boiled chicken", "Blueberries"],
    idealTemp: "16–24 °C",
    climate: "Its flat face makes heat risky. Keep it cool indoors in summer, and consider a short 'puppy cut' trim.",
    issues: [["Tear staining & eye issues", "Wipe the eyes daily and keep the hair around them trimmed."], ["Dental disease", "Brush its teeth several times a week."], ["Breathing problems in heat", "Avoid exercise in warm weather and use a harness."]],
    barks: [
      { s: "yap", t: "Doorbell yap", when: "The doorbell rings", says: "\"Guests! Do they have treats?\"" },
      { s: "whine", t: "Lap request", when: "You sit on the sofa without it", says: "\"There's a perfectly good lap going to waste.\"" },
      { s: "playgrowl", t: "Toy growl", when: "Playing tug", says: "\"Mine! (But keep playing.)\"" }
    ],
    life: { puppy: "Use a fixed toilet schedule; Shih Tzus are slow to house-train. Introduce grooming early.", adult: "Two short walks a day. Brush daily and visit a groomer every 4–6 weeks.", senior: "Get dental care and eye checks, and keep it lean to protect the back." }
  },
  {
    id: "pug", name: "Pug", region: "east-asia", country: "China", flag: "🇨🇳",
    size: "Small", weight: "6–8 kg", lifespan: "12–15 years", group: "Companion",
    energy: 2, grooming: 2, apartment: 5, firstTime: 5, kids: 4, heatTolerance: 1, coldTolerance: 2, barkiness: 2,
    temperament: ["Charming", "Mischievous", "Loving"],
    play: ["Short indoor games", "Squeaky toys", "Gentle tug", "Couch cuddles"],
    behaviour: "A clownish lap dog that wants to be wherever you are. It snores and snorts. Can be stubborn about training, but responds well to treats.",
    bestQuality: "An affectionate, low-exercise companion that is perfect for apartment life.",
    dislikes: ["Heat and humidity (dangerous)", "Strenuous exercise", "Being left out"],
    foods: ["Portion-controlled kibble", "Green beans", "Boiled chicken"],
    idealTemp: "16–22 °C",
    climate: "A flat-faced (brachycephalic) breed that overheats quickly. Keep it indoors with cooling above 26 °C.",
    issues: [["Breathing problems (BOAS)", "Keep it lean, use a harness, and avoid heat. Severe cases may need surgery."], ["Eye injuries", "See a vet immediately for squinting, redness or cloudiness."], ["Skin-fold infections", "Clean and dry the face wrinkles 2–3 times a week."]],
    barks: [
      { s: "yap", t: "Snorty bark", when: "Someone at the door", says: "\"Hrmph! Who goes there?\"" },
      { s: "excited", t: "Grumble-talk", when: "Dinner is being prepared", says: "\"Is that for me? It's for me, right?\"" },
      { s: "whine", t: "Pug pout", when: "Left out of the bedroom", says: "\"I belong ON the bed, not beside it.\"" }
    ],
    life: { puppy: "Easy to overfeed, so measure meals from day one. Start harness training early.", adult: "Two gentle 20-minute walks in cool hours. Keep it at a lean weight.", senior: "Breathing and eye problems often worsen with age, so get 6-monthly vet checks." }
  },
  {
    id: "pekingese", name: "Pekingese", region: "east-asia", country: "China", flag: "🇨🇳",
    size: "Toy", weight: "3–6 kg", lifespan: "12–14 years", group: "Companion",
    energy: 1, grooming: 4, apartment: 5, firstTime: 4, kids: 2, heatTolerance: 1, coldTolerance: 3, barkiness: 3,
    temperament: ["Dignified", "Stubborn", "Loyal"],
    play: ["Short strolls", "Soft toys", "Lounging on cushions", "Gentle indoor games"],
    behaviour: "A former pet of the Chinese imperial court that still acts like royalty. Devoted to its family, wary of strangers and quite stubborn. Not a fan of rough kids.",
    bestQuality: "A calm, regal and devoted lap companion with very low exercise needs.",
    dislikes: ["Heat", "Being picked up roughly", "Being told what to do"],
    foods: ["Toy-breed kibble", "Boiled chicken", "Pumpkin"],
    idealTemp: "15–22 °C",
    climate: "Flat face plus a thick coat make heat very dangerous. Keep it in air conditioning in summer.",
    issues: [["Breathing problems (BOAS)", "Keep it lean and cool, and use a harness."], ["Eye injuries", "Its eyes are prominent, so see a vet for any eye change."], ["Back problems (IVDD)", "Limit jumping and use ramps."]],
    barks: [
      { s: "yap", t: "Royal announcement", when: "A stranger enters", says: "\"Halt! Who approaches the throne?\"" },
      { s: "growl", t: "Imperial grumble", when: "Moved from its favourite cushion", says: "\"How dare you.\"" },
      { s: "whine", t: "Royal summons", when: "It wants something", says: "\"Servant! Attend to me.\"" }
    ],
    life: { puppy: "Handle gently and teach kids to sit on the floor to play with it.", adult: "Short walks in cool hours. Brush the coat several times a week.", senior: "Watch the breathing, eyes and back, and keep it lean." }
  },
  {
    id: "chow-chow", name: "Chow Chow", region: "east-asia", country: "China", flag: "🇨🇳",
    size: "Medium", weight: "20–32 kg", lifespan: "9–12 years", group: "Spitz / guardian",
    energy: 2, grooming: 4, apartment: 3, firstTime: 1, kids: 2, heatTolerance: 1, coldTolerance: 5, barkiness: 2,
    temperament: ["Aloof", "Dignified", "Cat-like"],
    play: ["Calm walks", "Sniffing", "Short fetch", "Lounging in cool spots"],
    behaviour: "Famous for its lion mane and blue-black tongue. Independent and aloof, it bonds with one or two people and ignores everyone else. Very clean, almost cat-like.",
    bestQuality: "A quiet, clean and dignified companion that is easy to house-train.",
    dislikes: ["Heat", "Being hugged by strangers", "Forced handling"],
    foods: ["Quality kibble", "Lean meat", "Cooked sweet potato"],
    idealTemp: "5–20 °C",
    climate: "Its heavy double coat makes hot weather tough. Keep it indoors with cooling.",
    issues: [["Entropion (eyelids roll in)", "See a vet for squinting or tearing. Surgery fixes it."], ["Hip & elbow dysplasia", "Keep it lean and choose screened parents."], ["Over-protectiveness", "Socialise early with many people."]],
    barks: [
      { s: "bark", t: "One-woof warning", when: "Something genuinely suspicious happens", says: "\"I only bark once. Take it seriously.\"" },
      { s: "growl", t: "Personal-space growl", when: "A stranger reaches for it", says: "\"We are not friends.\"" },
      { s: "excited", t: "Rare happy huff", when: "Its favourite person comes home", says: "\"Oh, it's you. Good.\"" }
    ],
    life: { puppy: "Socialisation is essential, so take it to puppy class and invite many guests.", adult: "Moderate walks in cool hours. Brush the thick coat 2–3 times a week.", senior: "Get eye and joint checks, and keep it cool and comfortable." }
  },
  {
    id: "shar-pei", name: "Shar Pei", region: "east-asia", country: "China", flag: "🇨🇳",
    size: "Medium", weight: "18–29 kg", lifespan: "8–12 years", group: "Guardian",
    energy: 3, grooming: 2, apartment: 3, firstTime: 2, kids: 3, heatTolerance: 2, coldTolerance: 3, barkiness: 2,
    temperament: ["Devoted", "Independent", "Calm"],
    play: ["Walks", "Puzzle toys", "Gentle tug", "Sniff games"],
    behaviour: "Known for its wrinkles and hippo-shaped muzzle. Loyal and calm with family, suspicious of strangers, and can be dominant with other dogs.",
    bestQuality: "A quiet, clean and devoted guardian with a unique look.",
    dislikes: ["Strangers touching it", "Water and baths", "Heat"],
    foods: ["Hypoallergenic kibble", "Lean meat", "Pumpkin"],
    idealTemp: "12–24 °C",
    climate: "Its skin folds and short muzzle need care in heat and humidity.",
    issues: [["Shar Pei fever", "Get recurring fevers and swollen hocks seen by a vet. It can lead to kidney disease."], ["Skin-fold infections", "Keep the folds clean and dry."], ["Entropion", "Many pups need eyelid tacking or surgery."]],
    barks: [
      { s: "deep", t: "Guard bark", when: "A stranger at the gate", says: "\"Halt. State your business.\"" },
      { s: "growl", t: "Grumble", when: "Another dog invades its space", says: "\"Find your own spot.\"" },
      { s: "whine", t: "Bath protest", when: "It sees the shampoo", says: "\"Absolutely not.\"" }
    ],
    life: { puppy: "Check the eyelids early; many pups need treatment. Socialise with dogs and people.", adult: "Moderate walks. Check the skin folds weekly.", senior: "Watch kidney health with yearly blood and urine tests." }
  },
  {
    id: "shiba", name: "Shiba Inu", region: "east-asia", country: "Japan", flag: "🇯🇵",
    size: "Small", weight: "7–11 kg", lifespan: "12–16 years", group: "Spitz",
    energy: 4, grooming: 3, apartment: 4, firstTime: 2, kids: 3, heatTolerance: 3, coldTolerance: 4, barkiness: 2,
    temperament: ["Independent", "Bold", "Cat-like"],
    play: ["Chasing games", "Flirt pole", "Puzzle feeders", "Exploring on a long leash"],
    behaviour: "Japan's ancient hunting spitz. Independent, clean and cat-like, with a strong prey drive and a famous high-pitched 'Shiba scream' when unhappy. Not reliable off-leash.",
    bestQuality: "Fox-like looks, very clean habits and big personality in a compact size.",
    dislikes: ["Being restrained or nail trims", "Being forced to do things", "Hot weather"],
    foods: ["Quality kibble", "Cooked fish (boneless)", "Blueberries"],
    idealTemp: "5–24 °C",
    climate: "Its double coat handles cold well. It sheds heavily twice a year.",
    issues: [["Allergies & itchy skin", "Feed a quality diet and use flea control. Your vet can identify triggers."], ["Luxating patella", "Keep it lean and see a vet for skipping or limping."], ["Escaping", "Use a secure fence and always walk it on a leash."]],
    barks: [
      { s: "scream", t: "The Shiba scream", when: "Nail trims, baths or being held", says: "\"THIS IS AN OUTRAGE!\"" },
      { s: "bark", t: "Rare alert bark", when: "Something truly odd outside", says: "\"I don't bark often. Pay attention.\"" },
      { s: "excited", t: "Happy grumble", when: "Walk time", says: "\"Adventure! Finally!\"" }
    ],
    life: { puppy: "Handle the paws, ears and mouth daily so grooming is less dramatic later. Use a long leash for recall work.", adult: "Needs about an hour of exercise, always leashed or fenced.", senior: "Usually ages well. Watch the eyes for glaucoma and the joints." }
  },
  {
    id: "akita", name: "Akita", region: "east-asia", country: "Japan", flag: "🇯🇵",
    size: "Large", weight: "32–59 kg", lifespan: "10–13 years", group: "Spitz / guardian",
    energy: 3, grooming: 3, apartment: 2, firstTime: 1, kids: 3, heatTolerance: 2, coldTolerance: 5, barkiness: 1,
    temperament: ["Loyal", "Dignified", "Courageous"],
    play: ["Long walks", "Snow play", "Tug", "Carrying items"],
    behaviour: "The breed of the famously loyal Hachikō. Quiet and dignified, devoted to family, reserved with strangers, and often intolerant of other dogs of the same sex.",
    bestQuality: "Legendary loyalty. A calm, quiet and powerful guardian.",
    dislikes: ["Strange dogs", "Heat", "Harsh training"],
    foods: ["Large-breed kibble", "Fish (cooked)", "Lean meat"],
    idealTemp: "-5–20 °C",
    climate: "Its thick coat is made for snowy northern Japan. Struggles in tropical heat.",
    issues: [["Hip dysplasia", "Keep it lean and choose screened parents."], ["Autoimmune disease (VKH, sebaceous adenitis)", "See a vet early for eye inflammation, skin changes or loss of nose pigment."], ["Bloat (GDV)", "Feed smaller meals and rest after eating."]],
    barks: [
      { s: "deep", t: "Rare warning bark", when: "A real threat", says: "\"If I'm barking, something's wrong.\"" },
      { s: "excited", t: "Akita 'talk'", when: "Greeting its family", says: "\"Mm-roo-roo. Welcome home.\"" },
      { s: "growl", t: "Dog-to-dog warning", when: "A same-sex dog stares at it", says: "\"Look away. Now.\"" }
    ],
    life: { puppy: "Socialise early with many calm dogs and people, and use puppy classes.", adult: "1 hour of daily exercise. Brush weekly, and daily when it 'blows' its coat.", senior: "Get joint and thyroid checks and keep it cool." }
  },
  {
    id: "jindo", name: "Korean Jindo", region: "east-asia", country: "South Korea", flag: "🇰🇷",
    size: "Medium", weight: "15–23 kg", lifespan: "12–15 years", group: "Spitz / hunting",
    energy: 4, grooming: 2, apartment: 2, firstTime: 2, kids: 3, heatTolerance: 3, coldTolerance: 4, barkiness: 2,
    temperament: ["Loyal", "Clean", "Independent"],
    play: ["Hiking", "Chasing games", "Climbing", "Puzzle toys"],
    behaviour: "A national treasure of Korea, famous for finding its way home over long distances. Intensely loyal to one person, very clean, and a skilled escape artist that can jump high fences.",
    bestQuality: "Unshakeable loyalty and a great sense of direction.",
    dislikes: ["Being rehomed or separated from its person", "Confinement", "Strangers"],
    foods: ["Quality kibble", "Lean meat", "Fish"],
    idealTemp: "5–26 °C",
    climate: "Handles seasonal climates well. Its double coat sheds twice a year.",
    issues: [["Escaping", "Use a 6-foot fence, never let it off-leash, and microchip it."], ["Hypothyroidism", "Get a blood test for weight or coat changes."], ["Prey drive", "Supervise it around cats and small pets."]],
    barks: [
      { s: "bark", t: "Alert bark", when: "A stranger nears its person", says: "\"I'm watching you.\"" },
      { s: "howl", t: "Homesick howl", when: "Separated from its person", says: "\"Where are you? I'm coming to find you.\"" },
      { s: "excited", t: "Hunting chatter", when: "It spots a squirrel", says: "\"Target spotted!\"" }
    ],
    life: { puppy: "Bond and socialise early. Jindos are slow to trust new people as adults.", adult: "Daily vigorous exercise and mental games.", senior: "Generally healthy; keep up joint and thyroid checks." }
  },

  /* ───────────── Russia & Arctic ───────────── */
  {
    id: "husky", name: "Siberian Husky", region: "arctic", country: "Russia", flag: "🇷🇺",
    size: "Medium", weight: "16–27 kg", lifespan: "12–14 years", group: "Sled dog",
    energy: 5, grooming: 4, apartment: 1, firstTime: 1, kids: 4, heatTolerance: 1, coldTolerance: 5, barkiness: 2,
    temperament: ["Energetic", "Mischievous", "Pack-oriented"],
    play: ["Running & canicross", "Pulling sports", "Digging pits", "Playing with other dogs"],
    behaviour: "Talkative: it howls and 'speaks' rather than barks. An escape artist with a strong prey drive. Friendly with everyone, so it is not a guard dog.",
    bestQuality: "Tremendous stamina and a striking look, with a playful, friendly nature.",
    dislikes: ["Hot weather", "Being bored or confined", "Being alone without company"],
    foods: ["High-protein diet", "Cooked fish (boneless)", "Lean meats"],
    idealTemp: "-10–18 °C",
    climate: "Built for extreme cold. Not suitable for hot climates without full-time air conditioning. Never shave its coat.",
    issues: [["Heatstroke", "Keep it in air conditioning in summer and exercise only in the cool early morning."], ["Escaping", "Use a tall fence with dig-guards and give intense daily exercise."], ["Eye conditions", "Get yearly eye exams."]],
    barks: [
      { s: "howl", t: "Pack howl", when: "Sirens, music or other huskies", says: "\"Awoooo! Pack, sound off!\"" },
      { s: "talk", t: "Husky back-talk", when: "Told 'no' or asked to get off the sofa", says: "\"Woo-woo-roo! I disagree!\"" },
      { s: "whine", t: "Bored whine", when: "Not enough exercise", says: "\"I was BORN to run 100 km a day.\"" }
    ],
    life: { puppy: "Teach recall and crate comfort early. Huskies love to roam.", adult: "Needs 2+ hours of running or pulling a day in cool weather.", senior: "Watch the eyes and thyroid, and keep it cool and active." }
  },
  {
    id: "samoyed", name: "Samoyed", region: "arctic", country: "Russia", flag: "🇷🇺",
    size: "Medium", weight: "16–30 kg", lifespan: "12–14 years", group: "Spitz / herding",
    energy: 4, grooming: 5, apartment: 2, firstTime: 3, kids: 5, heatTolerance: 1, coldTolerance: 5, barkiness: 4,
    temperament: ["Friendly", "Gentle", "Vocal"],
    play: ["Snow play", "Running", "Herding games", "Pulling a sled or cart"],
    behaviour: "Bred by Siberia's Samoyedic peoples to herd reindeer and keep families warm. Its upturned mouth gives the famous 'Sammy smile'. Very social and quite vocal.",
    bestQuality: "A joyful, gentle, people-loving dog that is great with kids.",
    dislikes: ["Heat", "Being alone", "Boredom (leads to barking)"],
    foods: ["Quality kibble", "Fish (cooked)", "Lean meats"],
    idealTemp: "-10–18 °C",
    climate: "Its dense white coat is designed for Arctic cold. Needs air conditioning in hot climates and heavy grooming.",
    issues: [["Hip dysplasia", "Keep it lean and choose screened parents."], ["Kidney disease (hereditary glomerulopathy)", "Get urine tests and see a vet for increased thirst."], ["Diabetes", "Keep it at a healthy weight and watch for increased thirst."]],
    barks: [
      { s: "bark", t: "Friendly announcement", when: "Anyone arrives", says: "\"New friend! Everyone come and see!\"" },
      { s: "talk", t: "Sammy chatter", when: "It wants your attention", says: "\"Roo-roo! Let's do something!\"" },
      { s: "howl", t: "Lonely howl", when: "Left alone", says: "\"Pack? Where did my pack go?\"" }
    ],
    life: { puppy: "Teach a 'quiet' cue early, since Samoyeds love to talk.", adult: "1–2 hours of exercise a day. Brush several times a week.", senior: "Get kidney and eye checks, and keep it cool." }
  },

  /* ───────────── Europe ───────────── */
  {
    id: "german-shepherd", name: "German Shepherd", region: "europe", country: "Germany", flag: "🇩🇪",
    size: "Large", weight: "22–40 kg", lifespan: "9–13 years", group: "Herding",
    energy: 5, grooming: 3, apartment: 1, firstTime: 2, kids: 4, heatTolerance: 3, coldTolerance: 4, barkiness: 4,
    temperament: ["Confident", "Courageous", "Intelligent"],
    play: ["Obedience & agility", "Hide-and-seek / scent work", "Fetch", "Tracking games"],
    behaviour: "Protective and loyal, usually reserved with strangers. Needs a job to do; without mental work it can become anxious or destructive.",
    bestQuality: "Highly intelligent and versatile. A top choice for police, search-and-rescue and protection work.",
    dislikes: ["Lack of mental stimulation", "Inconsistent rules", "Being isolated"],
    foods: ["High-protein kibble", "Cooked lean meat", "Plain pumpkin"],
    idealTemp: "8–24 °C",
    climate: "Its thick double coat suits moderate to cool climates. Needs shade and cooling in tropical summers.",
    issues: [["Hip dysplasia", "Choose health-screened lines and keep it lean."], ["Bloat (GDV)", "Feed 2–3 smaller meals and rest after eating."], ["Degenerative myelopathy", "A DNA test is available, and physiotherapy helps."]],
    barks: [
      { s: "alert", t: "Patrol alert", when: "Movement near the house", says: "\"Intruder detected. Family, stay back.\"" },
      { s: "deep", t: "Command-voice bark", when: "A stranger ignores its first warning", says: "\"Final warning.\"" },
      { s: "whine", t: "Working whine", when: "It wants to start a game or task", says: "\"Give me a job! Any job!\"" }
    ],
    life: { puppy: "Large-breed puppy food and no forced running until 12–18 months. Start obedience early.", adult: "Needs 1.5–2 hours a day of exercise plus brain work.", senior: "Watch the hind legs for weakness and get joint support." }
  },
  {
    id: "rottweiler", name: "Rottweiler", region: "europe", country: "Germany", flag: "🇩🇪",
    size: "Large", weight: "35–60 kg", lifespan: "9–10 years", group: "Working / guardian",
    energy: 4, grooming: 1, apartment: 1, firstTime: 1, kids: 3, heatTolerance: 2, coldTolerance: 4, barkiness: 2,
    temperament: ["Loyal", "Confident", "Protective"],
    play: ["Tug of war", "Pushing big balls", "Obedience work", "Carting"],
    behaviour: "Calm and confident, devoted to family, and naturally guarding. Needs early socialisation and firm, consistent, reward-based training.",
    bestQuality: "Powerful, protective and deeply loyal: a natural guardian.",
    dislikes: ["Heat", "Inconsistent leadership", "Being isolated"],
    foods: ["Large-breed kibble", "Lean meats", "Cooked eggs"],
    idealTemp: "8–22 °C",
    climate: "Its dark coat absorbs heat. Needs shade and air conditioning in hot climates.",
    issues: [["Hip & elbow dysplasia", "Choose screened parents and feed for controlled growth."], ["Osteosarcoma (bone cancer)", "Get any persistent limping checked quickly."], ["Aggression if unsocialised", "Start puppy classes early."]],
    barks: [
      { s: "deep", t: "Guardian boom", when: "A stranger at the gate", says: "\"I suggest you leave.\"" },
      { s: "rumble", t: "The Rottie rumble", when: "Being petted or relaxing", says: "\"Rrrr... that's the spot.\" (It's often a happy purr!)" },
      { s: "growl", t: "Serious growl", when: "It senses a real threat", says: "\"Do not come closer.\"" }
    ],
    life: { puppy: "Socialise intensively before 16 weeks and use large-breed puppy food.", adult: "1–2 hours of exercise and obedience practice daily.", senior: "Ages relatively early (around 7). Watch for lameness and lumps." }
  },
  {
    id: "dachshund", name: "Dachshund", region: "europe", country: "Germany", flag: "🇩🇪",
    size: "Small", weight: "7–14 kg", lifespan: "12–16 years", group: "Hound",
    energy: 3, grooming: 2, apartment: 4, firstTime: 3, kids: 3, heatTolerance: 3, coldTolerance: 2, barkiness: 5,
    temperament: ["Brave", "Curious", "Stubborn"],
    play: ["Digging in a sandbox", "Burrowing in blankets", "Scent games", "Tunnel play"],
    behaviour: "Bred to hunt badgers, so it is brave, loud and loves to dig. Can be stubborn and protective of its people.",
    bestQuality: "A big personality with a big bark: a little watchdog that adores its family.",
    dislikes: ["Stairs and jumping (back strain)", "Cold weather", "Being lifted wrongly"],
    foods: ["Portion-controlled kibble", "Green beans", "Pumpkin"],
    idealTemp: "16–26 °C",
    climate: "Its short legs and coat make it sensitive to cold. Use a sweater in winter.",
    issues: [["IVDD (spinal disc disease)", "Keep it lean, use ramps, and support the back when lifting."], ["Obesity", "Even small weight gains strain its back."], ["Dental disease", "Brush its teeth regularly."]],
    barks: [
      { s: "bark", t: "Big-dog bark", when: "Anything passes the window", says: "\"I'm 9 kg of pure guard dog!\"" },
      { s: "howl", t: "Hound bay", when: "It catches an exciting scent", says: "\"Badger! I smell a badger!\"" },
      { s: "whine", t: "Blanket whine", when: "It's cold", says: "\"Tuck me in, please.\"" }
    ],
    life: { puppy: "Teach a 'quiet' cue early and prevent jumping off furniture.", adult: "Two moderate walks a day. Keep it very lean.", senior: "Back care is key: use ramps and get a vet check for any wobbliness." }
  },
  {
    id: "doberman", name: "Doberman Pinscher", region: "europe", country: "Germany", flag: "🇩🇪",
    size: "Large", weight: "27–45 kg", lifespan: "10–12 years", group: "Working / guardian",
    energy: 5, grooming: 1, apartment: 2, firstTime: 2, kids: 3, heatTolerance: 3, coldTolerance: 1, barkiness: 3,
    temperament: ["Alert", "Loyal", "Fearless"],
    play: ["Running", "Obedience & protection sports", "Fetch", "Scent work"],
    behaviour: "Sensitive and affectionate with family; a 'velcro dog'. Alert and protective with strangers, and responds best to calm, positive training.",
    bestQuality: "An elegant, intelligent and loyal guardian that is very trainable.",
    dislikes: ["Cold weather (thin coat)", "Harsh handling", "Being left outside"],
    foods: ["High-protein kibble", "Lean meats", "Carrots"],
    idealTemp: "15–28 °C",
    climate: "Its thin single coat makes it sensitive to cold. Manages warmth better than many large breeds.",
    issues: [["Dilated cardiomyopathy (heart)", "Get yearly ECG or echo screening from age 2–3."], ["Von Willebrand's disease (bleeding)", "Get a DNA test and tell your vet before any surgery."], ["Wobbler syndrome", "Use a harness and see a vet for an unsteady gait."]],
    barks: [
      { s: "alert", t: "Sentinel alert", when: "Unusual sounds", says: "\"Something's off. Investigating.\"" },
      { s: "deep", t: "Protective bark", when: "A stranger approaches its family", says: "\"You're close enough.\"" },
      { s: "whine", t: "Velcro whine", when: "You leave the room", says: "\"Wait for me!\"" }
    ],
    life: { puppy: "Gentle, consistent training works best for this sensitive breed.", adult: "Needs 1.5+ hours of exercise. Give it a coat in winter.", senior: "Heart screening is essential. Watch for fainting or coughing." }
  },
  {
    id: "great-dane", name: "Great Dane", region: "europe", country: "Germany", flag: "🇩🇪",
    size: "Giant", weight: "45–90 kg", lifespan: "7–10 years", group: "Working",
    energy: 3, grooming: 1, apartment: 2, firstTime: 3, kids: 4, heatTolerance: 3, coldTolerance: 2, barkiness: 2,
    temperament: ["Gentle", "Friendly", "Patient"],
    play: ["Gentle romps", "Leisurely walks", "Tug", "Lounging on sofas"],
    behaviour: "The 'Apollo of dogs': huge but gentle, sweet and often a little clumsy. Thinks it's a lap dog. Calm indoors once mature.",
    bestQuality: "A gentle giant: friendly, patient and surprisingly calm at home.",
    dislikes: ["Cold floors", "Being alone", "Slippery surfaces"],
    foods: ["Giant-breed kibble", "Lean meat", "Cooked eggs"],
    idealTemp: "10–24 °C",
    climate: "Its short coat makes it feel the cold. Give it a padded bed off hard floors.",
    issues: [["Bloat (GDV), the highest-risk breed", "Feed 2–3 meals, use a slow feeder, rest after meals, and ask your vet about preventive gastropexy."], ["Heart disease (DCM)", "Get regular heart screening."], ["Bone cancer", "Get limping checked quickly."]],
    barks: [
      { s: "deep", t: "Earth-shaking woof", when: "The doorbell rings", says: "\"WOOF. (Hello, I'm friendly.)\"" },
      { s: "excited", t: "Gentle giant greeting", when: "Family returns", says: "\"Can I sit on your lap now?\"" },
      { s: "whine", t: "Baby whine", when: "It can't fit on the sofa", says: "\"Make room for me!\"" }
    ],
    life: { puppy: "Grows enormously fast. Use giant-breed puppy food, limit jumping and stairs, and avoid forced running until 18–24 months.", adult: "Moderate walks. Rest an hour after meals.", senior: "Considered senior from about 5–6 years. Use a soft bed and get regular heart checks." }
  },
  {
    id: "pomeranian", name: "Pomeranian", region: "europe", country: "Germany", flag: "🇩🇪",
    size: "Toy", weight: "1.5–3.5 kg", lifespan: "12–16 years", group: "Toy spitz",
    energy: 3, grooming: 4, apartment: 5, firstTime: 4, kids: 2, heatTolerance: 2, coldTolerance: 4, barkiness: 5,
    temperament: ["Bold", "Lively", "Inquisitive"],
    play: ["Chasing small balls", "Learning tricks", "Squeaky toys", "Indoor zoomies"],
    behaviour: "A big dog in a tiny body: alert, vocal and confident. It barks at everything, so teach a 'quiet' cue early. Fragile around small kids.",
    bestQuality: "A fluffy, intelligent and entertaining companion that suits small homes.",
    dislikes: ["Being picked up roughly", "Heat", "Being ignored"],
    foods: ["Toy-breed kibble", "Tiny pieces of boiled chicken", "Blueberries"],
    idealTemp: "10–22 °C",
    climate: "Its thick double coat suits cool weather. Keep it in air conditioning in hot months.",
    issues: [["Luxating patella", "Keep it lean and use ramps."], ["Collapsing trachea", "Always use a harness, never a collar."], ["Dental disease", "Brush its teeth daily."]],
    barks: [
      { s: "yap", t: "Rapid-fire yap", when: "A leaf moves outside", says: "\"Alert! Alert! Alert! Alert!\"" },
      { s: "playgrowl", t: "Fierce play growl", when: "Playing with a toy", says: "\"I am a mighty lion!\"" },
      { s: "whine", t: "Pick-me-up whine", when: "It wants to be held", says: "\"Up! Up! Up!\"" }
    ],
    life: { puppy: "Tiny pups can get low blood sugar, so feed 4 small meals a day.", adult: "Short walks and indoor play. Brush 3–4 times a week.", senior: "Watch for a honking cough (trachea) and dental problems." }
  },
  {
    id: "boxer", name: "Boxer", region: "europe", country: "Germany", flag: "🇩🇪",
    size: "Large", weight: "25–32 kg", lifespan: "10–12 years", group: "Working",
    energy: 5, grooming: 1, apartment: 2, firstTime: 3, kids: 5, heatTolerance: 2, coldTolerance: 2, barkiness: 2,
    temperament: ["Playful", "Bouncy", "Loyal"],
    play: ["Chase & wrestle", "Fetch", "Flirt pole", "Agility"],
    behaviour: "A clown that never really grows up. Bouncy, energetic and extremely patient with children, yet alert enough to be a good watchdog.",
    bestQuality: "A fun-loving, kid-friendly family protector.",
    dislikes: ["Heat", "Cold", "Being left alone"],
    foods: ["Quality kibble", "Lean meat", "Carrots"],
    idealTemp: "12–24 °C",
    climate: "Its short muzzle and coat make it sensitive to both heat and cold.",
    issues: [["Boxer cardiomyopathy (ARVC)", "Get yearly Holter or ECG screening. Watch for fainting."], ["Cancers (mast cell tumours)", "Get any new lump checked promptly."], ["Heat sensitivity", "Exercise only in cool hours."]],
    barks: [
      { s: "bark", t: "Playful demand bark", when: "Ball time is late", says: "\"Throw it! THROW IT!\"" },
      { s: "excited", t: "The 'woo-woo'", when: "Greeting you", says: "\"Woo-woo! You're home! Let's party!\"" },
      { s: "deep", t: "Guard bark", when: "A stranger at night", says: "\"I may be a clown, but I'm a guard too.\"" }
    ],
    life: { puppy: "Teach a calm 'sit' for greetings since Boxers jump a lot.", adult: "1–2 hours of play daily in cool hours.", senior: "Get heart screening and lump checks." }
  },
  {
    id: "poodle", name: "Poodle (Standard)", region: "europe", country: "France", flag: "🇫🇷",
    size: "Medium", weight: "20–32 kg", lifespan: "12–15 years", group: "Water dog",
    energy: 4, grooming: 5, apartment: 3, firstTime: 4, kids: 4, heatTolerance: 3, coldTolerance: 3, barkiness: 3,
    temperament: ["Brilliant", "Elegant", "Playful"],
    play: ["Retrieving", "Swimming", "Learning tricks", "Agility"],
    behaviour: "One of the smartest breeds, originally a water retriever. Playful, eager to please and very people-oriented. Also comes in Miniature and Toy sizes.",
    bestQuality: "Intelligence and a low-shedding coat: a good fit for many allergy-prone families.",
    dislikes: ["Boredom", "Being left alone", "Harsh voices"],
    foods: ["Quality kibble", "Lean meat", "Blueberries"],
    idealTemp: "10–26 °C",
    climate: "Its curly coat insulates and adapts well. Keep it trimmed in summer.",
    issues: [["Addison's disease", "See a vet for vague weakness, vomiting or a shaking episode."], ["Bloat (Standard size)", "Feed smaller meals and rest after eating."], ["Ear infections", "Pluck or clean the ears regularly."]],
    barks: [
      { s: "bark", t: "Smart alert", when: "Something unusual", says: "\"I've noticed something you haven't.\"" },
      { s: "excited", t: "Trick-time chatter", when: "Training treats come out", says: "\"Ooh, a new trick? Teach me!\"" },
      { s: "whine", t: "Boredom whine", when: "No mental stimulation", says: "\"I solved all my puzzles. Now what?\"" }
    ],
    life: { puppy: "Very trainable. Start clicker training and grooming early.", adult: "1 hour of exercise plus brain games. Professional grooming every 4–6 weeks.", senior: "Get eye and hormone (Addison's) checks." }
  },
  {
    id: "french-bulldog", name: "French Bulldog", region: "europe", country: "France", flag: "🇫🇷",
    size: "Small", weight: "8–13 kg", lifespan: "10–12 years", group: "Companion",
    energy: 2, grooming: 1, apartment: 5, firstTime: 4, kids: 4, heatTolerance: 1, coldTolerance: 2, barkiness: 1,
    temperament: ["Playful", "Adaptable", "Easygoing"],
    play: ["Short tug sessions", "Rolling balls", "Plush toys", "Short walks in cool weather"],
    behaviour: "Quiet compared with most breeds, but it 'talks' with yips and grumbles. Very attached to its owner. Clownish and adaptable.",
    bestQuality: "Compact, quiet and low-exercise: an ideal city companion.",
    dislikes: ["Heat (dangerous)", "Water (most can't swim)", "Being alone"],
    foods: ["Hypoallergenic kibble", "Boiled chicken", "Cucumber"],
    idealTemp: "16–22 °C",
    climate: "A flat-faced breed at high risk of heatstroke. Keep it in air conditioning in summer and never leave it in a car.",
    issues: [["Breathing problems (BOAS)", "Use a harness, keep it lean, and avoid heat."], ["Skin & food allergies", "Try an elimination diet under vet guidance."], ["Spinal problems", "Limit jumping and keep a healthy weight."]],
    barks: [
      { s: "excited", t: "Frenchie grumble", when: "Asking for something", says: "\"Mrrr-rrr-rrr. You know what I want.\"" },
      { s: "yap", t: "Rare yip", when: "Doorbell", says: "\"Someone's here! (I'll stay on the sofa.)\"" },
      { s: "whine", t: "Snuggle request", when: "Bedtime", says: "\"Under the blanket, please.\"" }
    ],
    life: { puppy: "Avoid overheating during play. Start harness and crate training early.", adult: "Two short walks in cool hours. Keep it lean.", senior: "Watch the breathing, spine and skin." }
  },
  {
    id: "golden-retriever", name: "Golden Retriever", region: "europe", country: "United Kingdom", flag: "🇬🇧",
    size: "Large", weight: "25–34 kg", lifespan: "10–12 years", group: "Retriever",
    energy: 4, grooming: 4, apartment: 2, firstTime: 5, kids: 5, heatTolerance: 2, coldTolerance: 4, barkiness: 2,
    temperament: ["Gentle", "Affectionate", "Trustworthy"],
    play: ["Fetch", "Swimming", "Carrying soft toys", "Training tricks"],
    behaviour: "Extremely affectionate and tolerant, especially with kids. Loves carrying things in its mouth. Rarely aggressive, so it makes a poor guard dog.",
    bestQuality: "A warm, patient, kid-friendly temperament with a famously soft mouth.",
    dislikes: ["Being ignored", "Hot, humid weather", "Long periods alone"],
    foods: ["Blueberries", "Apple slices (no seeds)", "Kibble with omega-3s"],
    idealTemp: "8–22 °C",
    climate: "Its dense coat makes heat hard. Use an air-conditioned or fan-cooled room in summer.",
    issues: [["Cancer (higher breed risk)", "Get regular vet check-ups from age 6 and check lumps quickly."], ["Skin allergies / hot spots", "Dry the coat fully after swims."], ["Hip dysplasia", "Keep it lean and choose screened parents."]],
    barks: [
      { s: "bark", t: "Hello bark", when: "Guests arrive", says: "\"New friends! I brought you a shoe!\"" },
      { s: "excited", t: "Toy-in-mouth mumble", when: "Greeting you with a toy", says: "\"Mmmf mmf! (Look what I found!)\"" },
      { s: "whine", t: "Gentle whine", when: "It wants to join you", says: "\"Can I come too?\"" }
    ],
    life: { puppy: "Large-breed puppy food. Socialisation is easy with this friendly pup.", adult: "1–1.5 hours of exercise. Brush 2–3 times a week.", senior: "Check for lumps monthly and get yearly blood tests." }
  },
  {
    id: "border-collie", name: "Border Collie", region: "europe", country: "United Kingdom", flag: "🇬🇧",
    size: "Medium", weight: "14–20 kg", lifespan: "12–15 years", group: "Herding",
    energy: 5, grooming: 3, apartment: 1, firstTime: 2, kids: 4, heatTolerance: 3, coldTolerance: 4, barkiness: 3,
    temperament: ["Workaholic", "Brilliant", "Energetic"],
    play: ["Frisbee", "Agility courses", "Herding balls (treibball)", "Learning new tricks"],
    behaviour: "Often called the smartest breed. Needs hours of physical and mental work daily. Without it, may herd kids, chase cars or become obsessive.",
    bestQuality: "Exceptional intelligence and trainability. A champion at dog sports.",
    dislikes: ["Boredom", "Small spaces with no activity", "Dull routines"],
    foods: ["Performance kibble", "Lean meats", "Cooked sweet potato"],
    idealTemp: "5–24 °C",
    climate: "Adapts to most climates. Its medium double coat sheds seasonally.",
    issues: [["Boredom-driven behaviour", "Give it 2+ hours of activity and training games daily."], ["Collie eye anomaly", "Choose DNA-tested parents."], ["Hip dysplasia", "Avoid repetitive high-impact jumping while young."]],
    barks: [
      { s: "bark", t: "Herding bark", when: "Kids or pets 'out of line'", says: "\"Everyone back into the group, please!\"" },
      { s: "whine", t: "Work-starved whine", when: "Under-exercised", says: "\"Give me sheep. Or a frisbee. Anything!\"" },
      { s: "excited", t: "Frisbee squeal", when: "The frisbee appears", says: "\"THE DISC! THE DISC!\"" }
    ],
    life: { puppy: "Teach an 'off switch' (settling on a mat) as well as tricks.", adult: "2+ hours of physical and mental work daily.", senior: "Keep its mind busy with gentle tricks and sniff games." }
  },
  {
    id: "beagle", name: "Beagle", region: "europe", country: "United Kingdom", flag: "🇬🇧",
    size: "Small", weight: "9–11 kg", lifespan: "12–15 years", group: "Scent hound",
    energy: 4, grooming: 2, apartment: 3, firstTime: 3, kids: 5, heatTolerance: 3, coldTolerance: 3, barkiness: 5,
    temperament: ["Merry", "Curious", "Friendly"],
    play: ["Scent trails & nose work", "Hide the treat", "Snuffle mats", "Playing with other dogs"],
    behaviour: "Follows its nose everywhere, so keep it leashed. Very vocal: it bays and howls. Loves company and does poorly alone.",
    bestQuality: "Cheerful, sturdy and a great size for families with kids.",
    dislikes: ["Being alone (it will howl)", "Strict confinement", "Walks with no sniffing"],
    foods: ["Carrot sticks", "Cucumber slices", "Measured kibble (it will overeat)"],
    idealTemp: "12–26 °C",
    climate: "Adapts to most climates.",
    issues: [["Obesity", "Lock food away and use a slow feeder."], ["Ear infections", "Clean the floppy ears weekly."], ["Escaping / roaming", "Use a secure fence and microchip it."]],
    barks: [
      { s: "bay", t: "The famous bay", when: "It finds a great scent", says: "\"AROOOO! The trail goes THIS way!\"" },
      { s: "howl", t: "Lonely howl", when: "Left alone", says: "\"The pack abandoned me!\"" },
      { s: "bark", t: "Food demand", when: "Kitchen noises", says: "\"I heard a wrapper.\"" }
    ],
    life: { puppy: "Start recall and 'leave it' early; its nose rules its brain.", adult: "1 hour of sniffy walks daily. Measure every meal.", senior: "Keep it lean to protect the back and joints." }
  },
  {
    id: "bulldog", name: "Bulldog (English)", region: "europe", country: "United Kingdom", flag: "🇬🇧",
    size: "Medium", weight: "18–25 kg", lifespan: "8–10 years", group: "Companion",
    energy: 1, grooming: 2, apartment: 4, firstTime: 4, kids: 4, heatTolerance: 1, coldTolerance: 2, barkiness: 1,
    temperament: ["Docile", "Stubborn", "Affectionate"],
    play: ["Short strolls", "Tug", "Chewing toys", "Napping"],
    behaviour: "Calm, courageous and friendly, and very attached to its people. Snores loudly. Prefers lounging to running.",
    bestQuality: "A gentle, easy-going and loyal couch companion.",
    dislikes: ["Heat (very dangerous)", "Long walks", "Stairs"],
    foods: ["Portion-controlled kibble", "Green beans", "Lean meat"],
    idealTemp: "15–21 °C",
    climate: "Among the most heat-sensitive breeds. Keep it in air conditioning in summer and never exercise it in heat.",
    issues: [["Breathing problems (BOAS)", "Keep it lean and cool. Surgery can help severe cases."], ["Skin-fold infections", "Clean the face and tail folds regularly."], ["Joint problems", "Keep a healthy weight and avoid jumping."]],
    barks: [
      { s: "excited", t: "Snort-snuffle", when: "Excited about food", says: "\"Snrrk! Is that bacon?\"" },
      { s: "rumble", t: "Grumble", when: "Woken up", says: "\"I was napping, thank you.\"" },
      { s: "bark", t: "Rare deep woof", when: "Doorbell", says: "\"Woof. Okay, back to sleep.\"" }
    ],
    life: { puppy: "Keep play short and cool, and start face-fold cleaning early.", adult: "Two short, cool walks daily. Keep it very lean.", senior: "Get breathing, joint and skin checks every 6 months." }
  },
  {
    id: "yorkshire", name: "Yorkshire Terrier", region: "europe", country: "United Kingdom", flag: "🇬🇧",
    size: "Toy", weight: "2–3.2 kg", lifespan: "13–16 years", group: "Toy terrier",
    energy: 3, grooming: 5, apartment: 5, firstTime: 4, kids: 2, heatTolerance: 3, coldTolerance: 2, barkiness: 5,
    temperament: ["Feisty", "Brave", "Affectionate"],
    play: ["Squeaky toys", "Chasing balls", "Hide-and-seek", "Short walks"],
    behaviour: "A tiny terrier with a big ego, originally a rat-catcher in mills. Confident, vocal and affectionate with its owner.",
    bestQuality: "Tiny, low-shedding and full of spunk. Great for apartments.",
    dislikes: ["Cold", "Rough handling", "Being ignored"],
    foods: ["Toy-breed kibble", "Boiled chicken bits", "Carrot slivers"],
    idealTemp: "18–26 °C",
    climate: "Its fine single coat gives little warmth, so use a sweater in cold weather.",
    issues: [["Dental disease", "Brush its teeth daily, since tiny mouths crowd teeth."], ["Collapsing trachea", "Use a harness only."], ["Low blood sugar (pups)", "Feed small, frequent meals."]],
    barks: [
      { s: "yap", t: "Terrier alarm", when: "Any sound at all", says: "\"I'll handle this! Stand back!\"" },
      { s: "playgrowl", t: "Ratter growl", when: "Shaking a toy", says: "\"Got you, rat!\"" },
      { s: "whine", t: "Cold whine", when: "Chilly weather", says: "\"Sweater. Now. Please.\"" }
    ],
    life: { puppy: "Feed 4 meals a day to prevent low blood sugar. Teach a 'quiet' cue.", adult: "Short walks and indoor play. Brush daily or keep it trimmed.", senior: "Get dental cleanings and watch for coughing." }
  },
  {
    id: "cocker-spaniel", name: "English Cocker Spaniel", region: "europe", country: "United Kingdom", flag: "🇬🇧",
    size: "Medium", weight: "12–15 kg", lifespan: "12–14 years", group: "Gundog",
    energy: 4, grooming: 4, apartment: 3, firstTime: 4, kids: 5, heatTolerance: 3, coldTolerance: 3, barkiness: 3,
    temperament: ["Merry", "Affectionate", "Eager"],
    play: ["Retrieving", "Sniffing out treats", "Swimming", "Field walks"],
    behaviour: "Known as the 'merry cocker' for its ever-wagging tail. Gentle, affectionate and eager to please. Loves to sniff and flush birds.",
    bestQuality: "A happy, affectionate family dog in a handy size.",
    dislikes: ["Being alone", "Harsh voices (sensitive)", "Ear handling when sore"],
    foods: ["Quality kibble", "Lean meat", "Blueberries"],
    idealTemp: "10–24 °C",
    climate: "Adapts well. Keep the feathered coat trimmed in hot weather.",
    issues: [["Ear infections", "Clean and dry the long ears weekly."], ["Eye problems (PRA)", "Choose DNA-tested parents."], ["Obesity", "Measure meals since spaniels love food."]],
    barks: [
      { s: "bark", t: "Happy bark", when: "Walk time", says: "\"Field trip! Let's go!\"" },
      { s: "excited", t: "Wiggle-whine", when: "Greeting family", says: "\"I missed you SO much!\"" },
      { s: "whine", t: "Sensitive whine", when: "Scolded", says: "\"I'm sorry. Still love me?\"" }
    ],
    life: { puppy: "Gentle training only. Start ear checks and grooming early.", adult: "1 hour of exercise. Groom every 6–8 weeks.", senior: "Get eye checks and weight control." }
  },
  {
    id: "cavalier", name: "Cavalier King Charles Spaniel", region: "europe", country: "United Kingdom", flag: "🇬🇧",
    size: "Small", weight: "5.9–8.2 kg", lifespan: "9–14 years", group: "Companion spaniel",
    energy: 3, grooming: 3, apartment: 5, firstTime: 5, kids: 5, heatTolerance: 2, coldTolerance: 3, barkiness: 2,
    temperament: ["Gentle", "Affectionate", "Adaptable"],
    play: ["Gentle fetch", "Lap time", "Short walks", "Sniff games"],
    behaviour: "A sweet, sociable lap spaniel that loves everyone: people, kids and other pets alike. Adapts to a quiet or active home.",
    bestQuality: "One of the most affectionate and adaptable companion dogs.",
    dislikes: ["Being alone", "Heat", "Being left out"],
    foods: ["Small-breed kibble", "Boiled chicken", "Blueberries"],
    idealTemp: "12–24 °C",
    climate: "Adapts well. Avoid hot afternoons.",
    issues: [["Mitral valve disease (heart)", "Get a yearly heart murmur check from age 1."], ["Syringomyelia (neck/skull)", "See a vet for scratching at the neck or signs of pain."], ["Ear infections", "Clean the ears weekly."]],
    barks: [
      { s: "yap", t: "Friendly yip", when: "Visitors arrive", says: "\"Hello! Will you pet me?\"" },
      { s: "excited", t: "Snuggle sounds", when: "Lap time", says: "\"This is my happy place.\"" },
      { s: "whine", t: "Lonely whine", when: "Left alone", says: "\"Please don't leave me.\"" }
    ],
    life: { puppy: "Very easy to train with gentle rewards. Socialise widely.", adult: "Moderate walks. Brush 2–3 times a week.", senior: "Heart checks are essential. Watch for coughing or fast breathing." }
  },
  {
    id: "dalmatian", name: "Dalmatian", region: "europe", country: "Croatia", flag: "🇭🇷",
    size: "Large", weight: "23–32 kg", lifespan: "11–13 years", group: "Coach dog",
    energy: 5, grooming: 2, apartment: 2, firstTime: 2, kids: 4, heatTolerance: 4, coldTolerance: 2, barkiness: 3,
    temperament: ["Energetic", "Outgoing", "Loyal"],
    play: ["Running alongside bikes or horses", "Fetch", "Agility", "Long hikes"],
    behaviour: "Bred to run alongside carriages for miles, so it has huge stamina. Playful and loyal, and can be reserved with strangers.",
    bestQuality: "Iconic spots and boundless endurance: a great jogging partner.",
    dislikes: ["Being under-exercised", "Cold weather", "Being alone"],
    foods: ["Low-purine diet (vet-advised)", "Rice", "Most vegetables & eggs"],
    idealTemp: "12–28 °C",
    climate: "Its short coat handles warm weather. Give it a coat in winter.",
    issues: [["Deafness (about 30% affected)", "Get a BAER hearing test as a puppy."], ["Urinary stones (uric acid)", "Feed a low-purine diet with lots of water. Avoid organ meats."], ["Skin allergies", "Feed a quality diet and use flea control."]],
    barks: [
      { s: "bark", t: "Coach-dog bark", when: "Horses, bikes or runners pass", says: "\"Let's run with them!\"" },
      { s: "excited", t: "The 'Dalmatian smile'", when: "Greeting family (teeth showing)", says: "\"I'm SO happy to see you!\" (It's a grin, not a snarl.)" },
      { s: "whine", t: "Energy whine", when: "Missed its run", says: "\"I have 30 km of energy left!\"" }
    ],
    life: { puppy: "Hearing test at 6 weeks. Plenty of socialisation.", adult: "Needs 2 hours of activity a day. Give it lots of water.", senior: "Get urine checks for stones and joint care." }
  },
  {
    id: "saint-bernard", name: "Saint Bernard", region: "europe", country: "Switzerland", flag: "🇨🇭",
    size: "Giant", weight: "54–82 kg", lifespan: "8–10 years", group: "Mountain rescue",
    energy: 2, grooming: 3, apartment: 1, firstTime: 3, kids: 5, heatTolerance: 1, coldTolerance: 5, barkiness: 1,
    temperament: ["Gentle", "Patient", "Friendly"],
    play: ["Snow play", "Slow walks", "Gentle tug", "Napping with kids"],
    behaviour: "Famous for Alpine mountain rescues. Calm, patient and gentle, especially with children. Drools a lot.",
    bestQuality: "A gentle giant: calm, kind and wonderful with kids.",
    dislikes: ["Heat (dangerous)", "Being alone", "Small spaces"],
    foods: ["Giant-breed kibble", "Lean meat", "Pumpkin"],
    idealTemp: "-5–18 °C",
    climate: "Made for Alpine cold. Needs full-time air conditioning in hot climates.",
    issues: [["Hip & elbow dysplasia", "Feed for slow growth and keep it lean."], ["Bloat (GDV)", "Feed smaller meals and rest after eating."], ["Eyelid problems", "See a vet for red or watery eyes."]],
    barks: [
      { s: "deep", t: "Mountain woof", when: "Someone unknown at the door", says: "\"WOOF. (Do you need rescuing?)\"" },
      { s: "rumble", t: "Contented groan", when: "Being brushed", says: "\"Mmmmmm. Perfect.\"" },
      { s: "whine", t: "Hot-day whine", when: "It's warm", says: "\"Too hot. Where's the snow?\"" }
    ],
    life: { puppy: "Grows very fast. Use giant-breed food and limit stairs and jumping.", adult: "Moderate walks in cool weather. Keep a drool towel handy.", senior: "Senior by around 6–7 years. Use an orthopedic bed and get joint support." }
  },
  {
    id: "bernese", name: "Bernese Mountain Dog", region: "europe", country: "Switzerland", flag: "🇨🇭",
    size: "Giant", weight: "35–55 kg", lifespan: "7–10 years", group: "Working / farm",
    energy: 3, grooming: 4, apartment: 1, firstTime: 4, kids: 5, heatTolerance: 1, coldTolerance: 5, barkiness: 2,
    temperament: ["Good-natured", "Calm", "Affectionate"],
    play: ["Cart pulling", "Hiking", "Snow play", "Gentle fetch"],
    behaviour: "A Swiss farm dog that pulled carts and guarded farms. Gentle, affectionate and very attached to family. Slow to mature.",
    bestQuality: "Sweet, calm and beautiful: an excellent family dog.",
    dislikes: ["Heat", "Being alone", "Harsh training"],
    foods: ["Large-breed kibble", "Lean meat", "Fish"],
    idealTemp: "-5–20 °C",
    climate: "Its thick tricolour coat suits cold climates. Needs air conditioning in heat.",
    issues: [["Cancer (histiocytic sarcoma)", "Get regular check-ups and look into any lump or lethargy quickly."], ["Hip & elbow dysplasia", "Choose screened parents and feed for slow growth."], ["Bloat", "Feed smaller meals and rest after eating."]],
    barks: [
      { s: "deep", t: "Farm-guard bark", when: "Visitors arrive", says: "\"Hello, visitor. I'm keeping an eye on you.\"" },
      { s: "excited", t: "Berner 'talk'", when: "Asking for attention", says: "\"Roo! Pet me, please.\"" },
      { s: "whine", t: "Lean-on-you whine", when: "Separated from family", says: "\"I belong next to you.\"" }
    ],
    life: { puppy: "Slow, steady growth with large-breed food. Short play sessions.", adult: "1 hour of exercise in cool hours. Brush 2–3 times a week.", senior: "Senior from about 6. Get regular cancer screening and joint care." }
  },
  {
    id: "maltese", name: "Maltese", region: "europe", country: "Malta", flag: "🇲🇹",
    size: "Toy", weight: "2–4 kg", lifespan: "12–15 years", group: "Toy companion",
    energy: 2, grooming: 5, apartment: 5, firstTime: 5, kids: 2, heatTolerance: 3, coldTolerance: 2, barkiness: 4,
    temperament: ["Gentle", "Playful", "Affectionate"],
    play: ["Indoor fetch", "Soft toys", "Tricks", "Lap time"],
    behaviour: "An ancient Mediterranean lapdog. Gentle, playful and fearless for its size, and very attached to its family.",
    bestQuality: "A sweet, low-shedding toy companion with a silky white coat.",
    dislikes: ["Being alone", "Rough handling", "Cold"],
    foods: ["Toy-breed kibble", "Boiled chicken", "Blueberries"],
    idealTemp: "18–26 °C",
    climate: "Its single silky coat provides little warmth, so give it a sweater in winter.",
    issues: [["Tear staining", "Wipe the eyes daily."], ["Dental disease", "Brush its teeth daily."], ["Luxating patella", "Keep it lean and use ramps."]],
    barks: [
      { s: "yap", t: "Tiny alarm", when: "Strangers arrive", says: "\"Small but mighty! Who's there?\"" },
      { s: "whine", t: "Cuddle request", when: "It wants to be held", says: "\"Hold me?\"" },
      { s: "playgrowl", t: "Play growl", when: "Tug with a toy", says: "\"Grrr! (This is fun.)\"" }
    ],
    life: { puppy: "Feed small meals often and handle it gently.", adult: "Short walks and indoor play. Brush daily.", senior: "Dental care and heart checks are important." }
  },

  /* ───────────── Americas ───────────── */
  {
    id: "labrador", name: "Labrador Retriever", region: "americas", country: "Canada", flag: "🇨🇦",
    size: "Large", weight: "25–36 kg", lifespan: "10–12 years", group: "Retriever",
    energy: 5, grooming: 2, apartment: 2, firstTime: 5, kids: 5, heatTolerance: 3, coldTolerance: 4, barkiness: 2,
    temperament: ["Friendly", "Outgoing", "Eager to please"],
    play: ["Fetch with a ball or frisbee", "Swimming", "Retrieving games", "Food puzzle toys"],
    behaviour: "Sociable and gentle with everyone. Very food-motivated, which makes training easy but overeating a risk. Stays puppy-like until about 3 years.",
    bestQuality: "Loyal, patient family companion that is easy to train. Popular for guide and therapy work.",
    dislikes: ["Being left alone for long hours", "Boredom", "Harsh scolding"],
    foods: ["Lean boiled chicken", "Carrots", "Green beans"],
    idealTemp: "10–24 °C",
    climate: "Its water-resistant double coat handles cool weather. In hot climates, walk at dawn or dusk.",
    issues: [["Obesity", "Measure every meal and count treats."], ["Hip & elbow dysplasia", "Keep it lean and avoid hard jumping until 18 months."], ["Ear infections", "Dry the ears after swimming."]],
    barks: [
      { s: "bark", t: "Hello-stranger bark", when: "Someone at the door", says: "\"Someone's here! Are they bringing snacks?\"" },
      { s: "excited", t: "Food anticipation", when: "Bowl being filled", says: "\"Best. Moment. Of. The. Day.\"" },
      { s: "whine", t: "Fetch whine", when: "The ball is out of reach", says: "\"Throw it again! Please!\"" }
    ],
    life: { puppy: "Measure food from day one. Labs are always hungry. Large-breed puppy food.", adult: "Needs 1+ hour of exercise. Swimming is ideal.", senior: "Weight and joint care. Watch for lumps." }
  },
  {
    id: "newfoundland", name: "Newfoundland", region: "americas", country: "Canada", flag: "🇨🇦",
    size: "Giant", weight: "45–70 kg", lifespan: "9–10 years", group: "Water rescue",
    energy: 2, grooming: 4, apartment: 1, firstTime: 4, kids: 5, heatTolerance: 1, coldTolerance: 5, barkiness: 1,
    temperament: ["Sweet", "Patient", "Devoted"],
    play: ["Swimming", "Water rescue games", "Cart pulling", "Gentle walks"],
    behaviour: "A water-rescue legend with webbed feet. Known as 'nature's babysitter' for its gentle patience with children. Drools a lot.",
    bestQuality: "Exceptionally gentle and a natural lifesaver in water.",
    dislikes: ["Heat", "Being alone", "Harsh voices"],
    foods: ["Giant-breed kibble", "Fish (cooked)", "Lean meat"],
    idealTemp: "-5–20 °C",
    climate: "Its thick water-resistant coat is made for cold Atlantic weather. Needs air conditioning in heat.",
    issues: [["Hip & elbow dysplasia", "Feed for slow growth and keep it lean."], ["Heart disease (SAS)", "Get a heart screening as a puppy."], ["Cystinuria (bladder stones)", "Get a DNA test and give plenty of water."]],
    barks: [
      { s: "deep", t: "Deep 'woof'", when: "Something unusual", says: "\"WOOF. Everything OK here?\"" },
      { s: "whine", t: "Rescue whine", when: "Someone splashing in water", says: "\"Someone needs saving! Let me go!\"" },
      { s: "rumble", t: "Contented rumble", when: "Lying next to kids", says: "\"All my little ones are safe.\"" }
    ],
    life: { puppy: "Giant-breed puppy food. Introduce water and grooming early.", adult: "Moderate exercise. Swimming is ideal. Brush 3 times a week.", senior: "Senior around 7. Get heart and joint care." }
  },
  {
    id: "chihuahua", name: "Chihuahua", region: "americas", country: "Mexico", flag: "🇲🇽",
    size: "Toy", weight: "1.5–3 kg", lifespan: "14–16 years", group: "Toy companion",
    energy: 3, grooming: 1, apartment: 5, firstTime: 4, kids: 1, heatTolerance: 4, coldTolerance: 1, barkiness: 5,
    temperament: ["Sassy", "Loyal", "Alert"],
    play: ["Chasing tiny toys", "Burrowing in blankets", "Short walks", "Lap time"],
    behaviour: "The world's smallest breed, with a giant attitude. Fiercely loyal to one person, suspicious of strangers, and loves burrowing in blankets.",
    bestQuality: "Long-lived, portable and devoted.",
    dislikes: ["Cold", "Being stepped on or grabbed", "Strangers"],
    foods: ["Toy-breed kibble", "Tiny chicken bits", "Blueberries"],
    idealTemp: "20–30 °C",
    climate: "Loves warmth. Shivers in the cold, so use a sweater.",
    issues: [["Dental disease", "Brush its teeth daily."], ["Low blood sugar", "Feed small meals often, especially puppies."], ["Luxating patella", "Use ramps and keep it lean."]],
    barks: [
      { s: "yap", t: "Fearless yap", when: "Big dogs walk past", says: "\"Come at me, giant!\"" },
      { s: "growl", t: "Tiny growl", when: "Someone near its person", says: "\"That's MY human.\"" },
      { s: "whine", t: "Blanket whine", when: "Cold", says: "\"Burrito-wrap me, please.\"" }
    ],
    life: { puppy: "Tiny pups need frequent meals and careful handling. Socialise to prevent snappiness.", adult: "Short walks and play. Keep it warm.", senior: "Can live 16+ years. Get dental and heart checks." }
  },
  {
    id: "boston-terrier", name: "Boston Terrier", region: "americas", country: "United States", flag: "🇺🇸",
    size: "Small", weight: "5–11 kg", lifespan: "11–13 years", group: "Companion",
    energy: 3, grooming: 1, apartment: 5, firstTime: 5, kids: 5, heatTolerance: 1, coldTolerance: 2, barkiness: 2,
    temperament: ["Friendly", "Lively", "Gentle"],
    play: ["Fetch", "Tug", "Learning tricks", "Short walks"],
    behaviour: "The 'American Gentleman', named for its tuxedo coat. Friendly, polite and lively, and gets on with everyone.",
    bestQuality: "A compact, cheerful and easy-going companion.",
    dislikes: ["Heat", "Cold", "Being alone"],
    foods: ["Small-breed kibble", "Boiled chicken", "Carrots"],
    idealTemp: "16–24 °C",
    climate: "Flat-faced, so avoid heat. Its short coat means a sweater in winter.",
    issues: [["Eye ulcers", "See a vet immediately for squinting or a cloudy eye."], ["Breathing problems (BOAS)", "Use a harness and avoid heat."], ["Deafness", "Get a hearing test as a pup."]],
    barks: [
      { s: "bark", t: "Polite bark", when: "Visitors", says: "\"Good evening! Come in!\"" },
      { s: "excited", t: "Snorty greeting", when: "Family returns", says: "\"Snort-snort! You're back!\"" },
      { s: "whine", t: "Play invite", when: "Bored", says: "\"Game? Any game?\"" }
    ],
    life: { puppy: "Easy to train. Protect its eyes from scratches during rough play.", adult: "Moderate play daily in cool hours.", senior: "Watch the eyes and breathing." }
  },
  {
    id: "malamute", name: "Alaskan Malamute", region: "americas", country: "United States", flag: "🇺🇸",
    size: "Large", weight: "34–45 kg", lifespan: "10–14 years", group: "Sled dog",
    energy: 5, grooming: 4, apartment: 1, firstTime: 1, kids: 4, heatTolerance: 1, coldTolerance: 5, barkiness: 2,
    temperament: ["Powerful", "Affectionate", "Playful"],
    play: ["Weight pulling", "Sledding", "Hiking", "Digging"],
    behaviour: "A powerful Arctic freight dog. Friendly with people but strong-willed, it 'woo-woos' and howls instead of barking. Loves to dig.",
    bestQuality: "Strength, stamina and a friendly 'wolf-like' presence.",
    dislikes: ["Heat", "Boredom", "Being alone"],
    foods: ["High-protein diet", "Fish (cooked)", "Lean meat"],
    idealTemp: "-15–15 °C",
    climate: "Made for Alaska. Not suitable for hot climates without full air conditioning.",
    issues: [["Hip dysplasia", "Keep it lean and choose screened parents."], ["Heat stress", "Keep it cool and exercise only on cold mornings."], ["Hypothyroidism", "Get blood tests if its coat or weight changes."]],
    barks: [
      { s: "talk", t: "Woo-woo talk", when: "Greeting or arguing", says: "\"Woo-woo-WOO! I have opinions!\"" },
      { s: "howl", t: "Arctic howl", when: "Sirens, or answering other dogs", says: "\"Awoooo! Malamutes, unite!\"" },
      { s: "growl", t: "Food guarding grumble", when: "Near its bowl", says: "\"Mine. Respectfully.\"" }
    ],
    life: { puppy: "Teach gentle leash manners early before it gets strong.", adult: "2 hours of work or play daily in cold weather.", senior: "Get joint and thyroid care and keep it cool." }
  },
  {
    id: "australian-shepherd", name: "Australian Shepherd", region: "americas", country: "United States", flag: "🇺🇸",
    size: "Medium", weight: "16–32 kg", lifespan: "12–15 years", group: "Herding",
    energy: 5, grooming: 3, apartment: 1, firstTime: 2, kids: 4, heatTolerance: 3, coldTolerance: 4, barkiness: 3,
    temperament: ["Smart", "Energetic", "Loyal"],
    play: ["Frisbee", "Agility", "Herding balls", "Trick training"],
    behaviour: "Despite its name, developed on American ranches. A tireless, clever herder that needs a job, and can try to herd children.",
    bestQuality: "A brilliant, versatile working partner with striking eyes.",
    dislikes: ["Boredom", "Being alone", "Small spaces"],
    foods: ["Performance kibble", "Lean meat", "Blueberries"],
    idealTemp: "5–25 °C",
    climate: "Its medium double coat adapts to most climates.",
    issues: [["MDR1 drug sensitivity", "Get a DNA test, since some common medicines can be dangerous."], ["Hip dysplasia", "Keep it lean."], ["Epilepsy", "See a vet for any seizure."]],
    barks: [
      { s: "bark", t: "Herding bark", when: "Things moving 'out of place'", says: "\"Move along! Stay together!\"" },
      { s: "excited", t: "Aussie 'talk'", when: "Asking to play", says: "\"Rooo! Let's DO something!\"" },
      { s: "whine", t: "Bored whine", when: "No job today", says: "\"I need a task.\"" }
    ],
    life: { puppy: "Teach calmness and stop nipping at heels early.", adult: "2 hours of exercise and brain work daily.", senior: "Keep its mind active and get eye checks." }
  },

  /* ───────────── Africa ───────────── */
  {
    id: "basenji", name: "Basenji", region: "africa", country: "DR Congo", flag: "🇨🇩",
    size: "Small", weight: "9.5–11 kg", lifespan: "13–14 years", group: "Primitive hound",
    energy: 4, grooming: 1, apartment: 3, firstTime: 2, kids: 3, heatTolerance: 4, coldTolerance: 1, barkiness: 1,
    temperament: ["Independent", "Curious", "Cat-like"],
    play: ["Lure coursing", "Chasing games", "Puzzle feeders", "Climbing"],
    behaviour: "The 'barkless dog' of Central Africa. It doesn't bark but makes a unique yodel called a 'barroo'. Cleans itself like a cat. Clever and mischievous.",
    bestQuality: "Almost no barking, very clean and very little smell.",
    dislikes: ["Rain and cold", "Being confined", "Repetitive training"],
    foods: ["Quality kibble", "Lean meat", "Cooked sweet potato"],
    idealTemp: "20–32 °C",
    climate: "Loves warmth and hates rain and cold.",
    issues: [["Fanconi syndrome (kidney)", "Get urine glucose tests from age 3 and a DNA test."], ["Eye disease (PRA)", "Choose DNA-tested parents."], ["Escaping & chewing", "Use secure fencing and give lots of puzzle toys."]],
    barks: [
      { s: "yodel", t: "The 'barroo' yodel", when: "Happy or excited", says: "\"Yodel-ay-hee-hoo! I'm happy!\"" },
      { s: "scream", t: "Basenji scream", when: "Upset or frustrated", says: "\"I object, loudly!\"" },
      { s: "whine", t: "Chortle-whine", when: "It wants something", says: "\"Hm-hmm? You know what I want.\"" }
    ],
    life: { puppy: "Puppy-proof everything, since Basenjis are expert chewers.", adult: "1 hour of exercise, always leashed or fenced.", senior: "Get yearly urine tests for Fanconi syndrome." }
  },
  {
    id: "ridgeback", name: "Rhodesian Ridgeback", region: "africa", country: "Zimbabwe", flag: "🇿🇼",
    size: "Large", weight: "29–41 kg", lifespan: "10–12 years", group: "Hound",
    energy: 4, grooming: 1, apartment: 1, firstTime: 2, kids: 4, heatTolerance: 5, coldTolerance: 2, barkiness: 1,
    temperament: ["Dignified", "Independent", "Loyal"],
    play: ["Running", "Lure coursing", "Hiking", "Tug"],
    behaviour: "Bred in southern Africa to track lions. Quiet, dignified and strong-willed, with a strong prey drive. Affectionate with family, reserved with strangers.",
    bestQuality: "A brave, athletic and quiet guardian, with the unique ridge of hair along its back.",
    dislikes: ["Cold", "Harsh training", "Being bored"],
    foods: ["Large-breed kibble", "Lean meat", "Eggs"],
    idealTemp: "18–34 °C",
    climate: "Handles heat very well. Its thin coat needs a jacket in cold weather.",
    issues: [["Dermoid sinus", "Puppies should be checked along the spine by a vet."], ["Hip dysplasia", "Keep it lean and choose screened parents."], ["Food stealing (counter-surfing)", "Keep food out of reach."]],
    barks: [
      { s: "deep", t: "Rare, serious bark", when: "Real intruder", says: "\"I don't bark for nothing.\"" },
      { s: "growl", t: "Lion-tracker growl", when: "It senses danger", says: "\"Stay behind me.\"" },
      { s: "excited", t: "Happy 'roo'", when: "Family returns", says: "\"Roo-roo! Good, you're safe.\"" }
    ],
    life: { puppy: "Consistent, gentle training. Socialise widely.", adult: "1–2 hours of running or hiking a day.", senior: "Get joint care and keep it warm." }
  },
  {
    id: "boerboel", name: "Boerboel", region: "africa", country: "South Africa", flag: "🇿🇦",
    size: "Giant", weight: "50–90 kg", lifespan: "9–11 years", group: "Mastiff / guardian",
    energy: 3, grooming: 1, apartment: 1, firstTime: 1, kids: 3, heatTolerance: 4, coldTolerance: 3, barkiness: 2,
    temperament: ["Confident", "Protective", "Calm"],
    play: ["Tug of war", "Pushing big balls", "Patrol walks", "Obedience work"],
    behaviour: "A South African farm mastiff bred to guard homesteads against predators. Calm and loving with family, and highly protective. Needs an experienced owner.",
    bestQuality: "An imposing, devoted protector that is calm at home.",
    dislikes: ["Strangers on its property", "Inconsistent rules", "Isolation"],
    foods: ["Giant-breed kibble", "Lean meat", "Cooked eggs"],
    idealTemp: "12–30 °C",
    climate: "Handles warm climates better than most mastiffs.",
    issues: [["Hip & elbow dysplasia", "Feed for slow growth and choose screened parents."], ["Eyelid problems", "See a vet for eye irritation."], ["Over-protectiveness", "Requires expert socialisation and training."]],
    barks: [
      { s: "deep", t: "Homestead guard bark", when: "Someone near the gate", says: "\"This farm is protected.\"" },
      { s: "growl", t: "Mastiff growl", when: "A perceived threat", says: "\"Leave.\"" },
      { s: "rumble", t: "Gentle grumble", when: "Lying with family", says: "\"All is well.\"" }
    ],
    life: { puppy: "Intensive socialisation and obedience training from 8 weeks.", adult: "Daily walks plus training. Needs a secure yard.", senior: "Joint care and weight control." }
  },

  /* ───────────── Middle East & Central Asia ───────────── */
  {
    id: "saluki", name: "Saluki", region: "middle-east", country: "Middle East", flag: "🌍",
    size: "Large", weight: "16–29 kg", lifespan: "12–14 years", group: "Sighthound",
    energy: 4, grooming: 2, apartment: 2, firstTime: 2, kids: 3, heatTolerance: 5, coldTolerance: 1, barkiness: 1,
    temperament: ["Gentle", "Aloof", "Graceful"],
    play: ["Sprinting in enclosed fields", "Lure coursing", "Long walks", "Lounging on soft beds"],
    behaviour: "One of the oldest breeds, the royal hunting hound of the Middle East. Gentle, quiet and reserved. Extreme prey drive, so it must never be off-leash in the open.",
    bestQuality: "Elegant, quiet and among the fastest dogs over long distances.",
    dislikes: ["Cold", "Hard floors", "Harsh handling"],
    foods: ["Quality kibble", "Lean meat", "Eggs"],
    idealTemp: "20–35 °C",
    climate: "A desert hound that loves heat. Use a coat in cold weather.",
    issues: [["Heart disease", "Get regular heart checks."], ["Anaesthesia sensitivity", "Tell your vet it is a sighthound."], ["Injuries while running", "Only run it in fenced areas."]],
    barks: [
      { s: "bark", t: "Rare bark", when: "Something truly strange", says: "\"Hm. That's odd.\"" },
      { s: "whine", t: "Chase whine", when: "It spots prey", says: "\"Let me go! I can catch it!\"" },
      { s: "excited", t: "Soft greeting", when: "Family comes home", says: "\"Oh, it's you. Lovely.\"" }
    ],
    life: { puppy: "Gentle handling and early recall work (but always use a leash outside).", adult: "Daily sprint in a fenced area plus walks.", senior: "Soft bedding, warmth and heart checks." }
  },
  {
    id: "afghan-hound", name: "Afghan Hound", region: "middle-east", country: "Afghanistan", flag: "🇦🇫",
    size: "Large", weight: "23–27 kg", lifespan: "12–14 years", group: "Sighthound",
    energy: 4, grooming: 5, apartment: 2, firstTime: 2, kids: 3, heatTolerance: 3, coldTolerance: 4, barkiness: 1,
    temperament: ["Dignified", "Aloof", "Clownish"],
    play: ["Sprinting", "Lure coursing", "Playful 'zoomies'", "Walks"],
    behaviour: "A glamorous mountain sighthound with a flowing silky coat. Aloof and independent, but silly and playful with family. Not eager to obey.",
    bestQuality: "Breathtaking beauty and elegance on the move.",
    dislikes: ["Rough handling", "Repetitive commands", "Being rushed"],
    foods: ["Quality kibble", "Lean meat", "Fish"],
    idealTemp: "5–25 °C",
    climate: "Its coat protected it in cold Afghan mountains. Keep it cool and groomed in summer.",
    issues: [["Coat matting", "Brush thoroughly several times a week."], ["Hip dysplasia & cataracts", "Choose screened parents."], ["Anaesthesia sensitivity", "Tell your vet before surgery."]],
    barks: [
      { s: "bark", t: "Rare bark", when: "Something unusual", says: "\"I've noticed. I won't mention it again.\"" },
      { s: "excited", t: "Zoomies yip", when: "Play time", says: "\"Wheee! Catch me!\"" },
      { s: "whine", t: "Grooming groan", when: "The brush appears", says: "\"Again? I'm already gorgeous.\"" }
    ],
    life: { puppy: "Patient, fun training. Introduce the brush early.", adult: "Daily run in a fenced area. Heavy grooming.", senior: "Eye checks and keep the coat manageable." }
  },
  {
    id: "canaan", name: "Canaan Dog", region: "middle-east", country: "Israel", flag: "🇮🇱",
    size: "Medium", weight: "16–25 kg", lifespan: "12–15 years", group: "Primitive / herding",
    energy: 4, grooming: 2, apartment: 3, firstTime: 3, kids: 4, heatTolerance: 5, coldTolerance: 3, barkiness: 4,
    temperament: ["Alert", "Vigilant", "Devoted"],
    play: ["Herding games", "Running", "Digging", "Puzzle toys"],
    behaviour: "A desert pariah dog that survived in the wild for centuries, now Israel's national breed. Alert, territorial and wary of strangers. Barks to alert.",
    bestQuality: "Hardy, healthy and an excellent watchdog.",
    dislikes: ["Strangers", "Being confined", "Boredom"],
    foods: ["Quality kibble", "Lean meat", "Rice"],
    idealTemp: "15–35 °C",
    climate: "Adapted to desert heat.",
    issues: [["Generally very healthy", "Yearly vet checks and vaccines."], ["Hip dysplasia (occasional)", "Keep it lean."], ["Over-alertness / barking", "Teach a 'quiet' cue and socialise."]],
    barks: [
      { s: "alert", t: "Desert sentinel bark", when: "Anything approaching", says: "\"Movement on the horizon!\"" },
      { s: "howl", t: "Wild howl", when: "Distant dogs howling", says: "\"My ancestors called like this.\"" },
      { s: "growl", t: "Warning grumble", when: "A stranger gets close", says: "\"Keep your distance.\"" }
    ],
    life: { puppy: "Early socialisation reduces wariness of strangers.", adult: "1 hour of exercise plus training.", senior: "Generally ages well." }
  },

  /* ───────────── Oceania ───────────── */
  {
    id: "cattle-dog", name: "Australian Cattle Dog", region: "oceania", country: "Australia", flag: "🇦🇺",
    size: "Medium", weight: "15–22 kg", lifespan: "12–16 years", group: "Herding",
    energy: 5, grooming: 1, apartment: 1, firstTime: 2, kids: 3, heatTolerance: 4, coldTolerance: 4, barkiness: 3,
    temperament: ["Tough", "Loyal", "Alert"],
    play: ["Herding", "Frisbee", "Agility", "Long runs"],
    behaviour: "The 'Blue Heeler' or 'Red Heeler', bred to drive cattle by nipping their heels. Tireless, clever and devoted to one person. May nip at heels when excited.",
    bestQuality: "Incredibly tough, smart and loyal: a perfect working partner.",
    dislikes: ["Boredom", "Being alone", "Strangers"],
    foods: ["Performance kibble", "Lean meat", "Eggs"],
    idealTemp: "5–32 °C",
    climate: "Hardy in heat and cold; it was bred for the outback.",
    issues: [["Deafness", "Get a BAER hearing test as a puppy."], ["Eye disease (PRA)", "Get a DNA test."], ["Heel nipping", "Redirect to toys and teach impulse control."]],
    barks: [
      { s: "bark", t: "Cattle-drive bark", when: "Things moving", says: "\"Move it! Come on!\"" },
      { s: "alert", t: "Watchdog alert", when: "Strangers", says: "\"Unknown on the property!\"" },
      { s: "whine", t: "Work whine", when: "Bored", says: "\"Where are the cows?\"" }
    ],
    life: { puppy: "Redirect nipping early and socialise widely.", adult: "2 hours of exercise and work daily.", senior: "Can live 16+ years. Keep its mind active." }
  },
  {
    id: "kelpie", name: "Australian Kelpie", region: "oceania", country: "Australia", flag: "🇦🇺",
    size: "Medium", weight: "14–20 kg", lifespan: "12–15 years", group: "Herding",
    energy: 5, grooming: 1, apartment: 1, firstTime: 2, kids: 4, heatTolerance: 5, coldTolerance: 3, barkiness: 3,
    temperament: ["Tireless", "Intelligent", "Eager"],
    play: ["Herding", "Frisbee", "Running", "Agility"],
    behaviour: "A sheep-herding workaholic famous for running across sheep's backs. Extremely energetic and clever. Happiest with a job.",
    bestQuality: "Unmatched work ethic and heat tolerance.",
    dislikes: ["Inactivity", "Being confined", "Being alone"],
    foods: ["Performance kibble", "Lean meat", "Rice"],
    idealTemp: "10–35 °C",
    climate: "Thrives in hot, dry weather.",
    issues: [["Hip dysplasia", "Keep it lean."], ["Cerebellar abiotrophy", "Get a DNA test."], ["Exhaustion (won't stop working)", "Enforce rest breaks and water in heat."]],
    barks: [
      { s: "bark", t: "Sheep-moving bark", when: "Herding", says: "\"Move along, woolly ones!\"" },
      { s: "excited", t: "Ready-to-work yips", when: "Boots go on", says: "\"Work time? Work time!\"" },
      { s: "whine", t: "Restless whine", when: "No exercise", says: "\"I could run all day.\"" }
    ],
    life: { puppy: "Teach an 'off switch' and rest periods.", adult: "2+ hours of active work daily.", senior: "Keep it moving gently to protect the joints." }
  }
];
