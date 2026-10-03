/* PawPedia general content (breed data lives in js/breeds.js).
 * General educational guidance only; always confirm health and diet decisions with a vet. */

window.TIMELINE = [
  {
    id: "newborn",
    stage: "Newborn",
    age: "0–2 weeks",
    scale: 0.35,
    eyesClosed: true,
    looks: "Eyes and ears are sealed shut. Tiny, wrinkly and mostly asleep (about 90% of the day). Can only crawl.",
    behaviour: "Relies on mother for warmth, food and toileting. Finds mum by smell and touch.",
    care: ["Keep the whelping area at 29–32 °C in week 1", "Make sure every pup nurses and gains weight daily", "Handle gently for a few seconds a day"],
    food: "Only mother's milk (or vet-advised puppy milk replacer — never cow's milk)."
  },
  {
    id: "transitional",
    stage: "Transitional",
    age: "2–4 weeks",
    scale: 0.42,
    looks: "Eyes open (blue at first) and ears open. Wobbly first steps, and baby teeth start appearing.",
    behaviour: "Starts to bark, growl, wag and play with littermates. Begins leaving the bed to toilet.",
    care: ["First deworming around 2 weeks (vet-guided)", "Introduce gentle new sounds and textures", "Keep with mother and litter"],
    food: "Mostly milk. Weaning on wet puppy mush can begin around 3–4 weeks."
  },
  {
    id: "socialisation",
    stage: "Socialisation window",
    age: "3–12 weeks",
    scale: 0.5,
    looks: "Round, fluffy puppy shape. Coordination improves fast, and coat colour becomes clearer.",
    behaviour: "The most important learning period. Experiences now shape lifelong confidence. Learns bite inhibition from littermates.",
    care: ["First vaccine (DHPPi + L) at 6–8 weeks, boosters every 3–4 weeks", "Safely meet many people, sounds and surfaces", "Should stay with mother until at least 8 weeks"],
    food: "Fully weaned by 7–8 weeks onto quality puppy food, 4 small meals a day."
  },
  {
    id: "juvenile",
    stage: "Puppy",
    age: "3–6 months",
    scale: 0.62,
    looks: "Rapid growth with leggy, gangly proportions. Adult teeth replace baby teeth (teething!).",
    behaviour: "Curious, chewy and testing boundaries. Perfect time for basic obedience and house-training.",
    care: ["Rabies vaccine at around 12–14 weeks", "Puppy training classes", "Plenty of safe chew toys for teething"],
    food: "Puppy food, 3 meals a day. Large breeds need a large-breed puppy formula."
  },
  {
    id: "adolescent",
    stage: "Adolescent",
    age: "6–18 months",
    scale: 0.82,
    looks: "Nearly adult height but still filling out. The adult coat grows in. Small breeds finish growing first.",
    behaviour: "The 'teenage' phase: selective hearing, more energy, and may test rules. Sexual maturity arrives.",
    care: ["Discuss spay/neuter timing with your vet", "Keep training consistent and positive", "Avoid long runs or hard jumps until growth plates close"],
    food: "Move from puppy to adult food at 9–12 months (small) or 12–18 months (large), 2 meals a day."
  },
  {
    id: "adult",
    stage: "Adult",
    age: "1.5–7 years",
    scale: 1,
    looks: "Full size, strong and muscular, with a glossy coat. In its prime.",
    behaviour: "Settled personality, calmer than adolescence, and fully trained routines. The best years for adventures.",
    care: ["Yearly vaccine boosters and health check", "Monthly tick, flea and deworming prevention", "Regular dental care"],
    food: "Adult maintenance food, 2 meals a day. Adjust portions to keep a visible waist."
  },
  {
    id: "senior",
    stage: "Senior",
    age: "7+ years (large breeds ~6+)",
    scale: 0.95,
    grey: true,
    looks: "Grey muzzle and eyebrows, possibly cloudy eyes. Slower movements and some muscle loss.",
    behaviour: "Sleeps more, may lose some hearing or sight, and can get confused at night. Still loves gentle play and company.",
    care: ["Vet check every 6 months with blood work", "Orthopedic bed, ramps and non-slip floors", "Shorter, more frequent walks"],
    food: "Senior diet with fewer calories and joint support. Ask your vet about omega-3 or glucosamine."
  }
];

window.HEALTH = [
  {
    name: "Parvovirus",
    icon: "🦠",
    severity: "Emergency",
    signs: "Severe vomiting, bloody diarrhoea, lethargy and no appetite, mainly in unvaccinated puppies.",
    prevent: "Complete the puppy vaccination course. Avoid public dog areas until fully vaccinated.",
    action: "Go to a vet immediately. Survival depends on fast IV fluids and supportive care."
  },
  {
    name: "Ticks, fleas & tick fever",
    icon: "🕷️",
    severity: "Common",
    signs: "Scratching, visible ticks (ears, toes, neck), pale gums, fever, weakness or bleeding (tick fever).",
    prevent: "Use a monthly vet-recommended spot-on, chewable or collar. Check the coat after walks and clean bedding often.",
    action: "Remove ticks with a tick tool by twisting gently. See a vet for fever, lethargy or pale gums."
  },
  {
    name: "Heatstroke",
    icon: "🌡️",
    severity: "Emergency",
    signs: "Heavy panting, thick drool, bright red gums, wobbliness, vomiting or collapse.",
    prevent: "Walk only in cool hours, give constant shade and water, and never leave a dog in a parked car.",
    action: "Move to shade, cool with room-temperature (not ice-cold) water, offer sips of water and get to a vet."
  },
  {
    name: "Obesity",
    icon: "⚖️",
    severity: "Common",
    signs: "Can't feel the ribs easily, no visible waist, tires quickly.",
    prevent: "Measure meals, keep treats under 10% of daily calories, and exercise every day.",
    action: "Ask your vet for a target weight and calorie plan, then lose weight gradually."
  },
  {
    name: "Dental disease",
    icon: "🦷",
    severity: "Common",
    signs: "Bad breath, yellow or brown tartar, red gums, chewing on one side.",
    prevent: "Brush with dog toothpaste (never human toothpaste) 3+ times a week. Use dental chews.",
    action: "Your vet may recommend a professional cleaning under anaesthesia."
  },
  {
    name: "Ear infections",
    icon: "👂",
    severity: "Common",
    signs: "Head shaking, scratching ears, bad smell, redness or discharge.",
    prevent: "Dry the ears after baths or swims and clean them weekly with a vet-approved cleaner.",
    action: "See a vet for diagnosis. Infections need the right drops (bacterial vs yeast)."
  },
  {
    name: "Skin allergies",
    icon: "🐾",
    severity: "Common",
    signs: "Itching, licking paws, red skin, hot spots, hair loss.",
    prevent: "Groom regularly, use a quality diet, and keep up flea prevention.",
    action: "Your vet can identify food or environmental allergies and prescribe relief."
  },
  {
    name: "Bloat (GDV)",
    icon: "🎈",
    severity: "Emergency",
    signs: "Swollen hard belly, retching without vomiting, restlessness and drooling, mostly in deep-chested large breeds.",
    prevent: "Feed smaller meals, use a slow feeder, and avoid exercise for an hour after meals.",
    action: "This is life-threatening within hours. Go to an emergency vet immediately."
  },
  {
    name: "Separation anxiety",
    icon: "😟",
    severity: "Behavioural",
    signs: "Howling, destruction or toileting only when left alone. Panics when you leave.",
    prevent: "Practise short absences from puppyhood, give exercise before leaving, and offer puzzle toys.",
    action: "Increase alone time gradually and consult a positive-reinforcement trainer or vet behaviourist."
  },
  {
    name: "Hip dysplasia & arthritis",
    icon: "🦴",
    severity: "Chronic",
    signs: "Stiffness after rest, bunny-hopping, reluctance to climb stairs or jump.",
    prevent: "Choose screened parents, keep the dog lean, and give puppies controlled exercise.",
    action: "Your vet can advise on weight management, pain relief, physiotherapy and joint supplements."
  },
  {
    name: "Rabies",
    icon: "⚠️",
    severity: "Emergency",
    signs: "Behaviour change, drooling, difficulty swallowing, aggression, paralysis. It is fatal once symptoms appear.",
    prevent: "Rabies vaccine at around 3 months, then boosters as your vet advises. This is mandatory in many places.",
    action: "If bitten by an unknown animal, wash the wound with soap for 15 minutes and see a doctor and vet the same day."
  },
  {
    name: "Distemper",
    icon: "🤧",
    severity: "Emergency",
    signs: "Eye and nose discharge, cough, fever, then twitching or seizures.",
    prevent: "Core vaccine (part of DHPPi) with boosters.",
    action: "Isolate the dog and see a vet urgently. There is no cure, only supportive care."
  }
];

window.FOODS = [
  { name: "Plain cooked chicken", verdict: "safe", note: "Boneless and unseasoned. Great protein and good for upset tummies with rice." },
  { name: "Plain cooked rice", verdict: "safe", note: "Easy to digest. Use it in a bland diet when the dog has loose motions." },
  { name: "Carrots", verdict: "safe", note: "Crunchy and low-calorie, and good for teeth. Cut into pieces for small dogs." },
  { name: "Apples", verdict: "safe", note: "Remove the seeds and core first. A sweet, crunchy treat." },
  { name: "Blueberries", verdict: "safe", note: "Packed with antioxidants. A perfect training-size treat." },
  { name: "Banana", verdict: "moderate", note: "Fine in small amounts but high in sugar." },
  { name: "Watermelon", verdict: "safe", note: "Seedless and rind removed. Hydrating in summer." },
  { name: "Pumpkin (plain)", verdict: "safe", note: "Plain cooked pumpkin only, not pie filling. Helps both diarrhoea and constipation." },
  { name: "Cooked eggs", verdict: "safe", note: "Boiled or scrambled without butter or salt. Good protein." },
  { name: "Sweet potato (cooked)", verdict: "safe", note: "Cooked and plain. A good source of fibre and vitamins." },
  { name: "Green beans", verdict: "safe", note: "Plain. A filling, low-calorie snack for dogs on a diet." },
  { name: "Cucumber", verdict: "safe", note: "Very low-calorie and refreshing." },
  { name: "Cooked fish (salmon)", verdict: "safe", note: "Fully cooked and boneless. Rich in omega-3. Never give it raw." },
  { name: "Peanut butter", verdict: "moderate", note: "Only if xylitol-free and unsalted. High in fat, so a small lick only." },
  { name: "Curd / plain yogurt", verdict: "moderate", note: "Plain and unsweetened, in small amounts. Some dogs are lactose intolerant." },
  { name: "Cheese / paneer", verdict: "moderate", note: "A small amount is OK. High in fat, and some dogs can't digest dairy." },
  { name: "Roti / bread (plain)", verdict: "moderate", note: "Plain, without ghee or butter. Low nutritional value, so don't make it a main food." },
  { name: "Chocolate", verdict: "toxic", note: "Contains theobromine. Dark chocolate is the most dangerous. Can cause seizures and death." },
  { name: "Grapes & raisins", verdict: "toxic", note: "Can cause sudden kidney failure, even in small amounts." },
  { name: "Onion", verdict: "toxic", note: "Raw, cooked or powdered, it damages red blood cells. Watch for it in curries and gravies." },
  { name: "Garlic", verdict: "toxic", note: "Even more potent than onion. Avoid all garlic-flavoured food." },
  { name: "Xylitol (sugar-free gum, sweets)", verdict: "toxic", note: "Causes a rapid drop in blood sugar and liver failure. Check peanut butter labels." },
  { name: "Macadamia nuts", verdict: "toxic", note: "Cause weakness, vomiting, tremors and fever." },
  { name: "Alcohol", verdict: "toxic", note: "Even small amounts cause poisoning." },
  { name: "Coffee & tea (caffeine)", verdict: "toxic", note: "Causes restlessness, a racing heart and tremors." },
  { name: "Cooked bones", verdict: "toxic", note: "Splinter and can tear the gut or cause blockages." },
  { name: "Raw bread dough", verdict: "toxic", note: "Yeast expands in the stomach and produces alcohol." },
  { name: "Avocado", verdict: "toxic", note: "The pit is a choking hazard and the skin and leaves contain persin. Best avoided." },
  { name: "Salty / spicy food", verdict: "toxic", note: "Chips, namkeen and spicy leftovers can cause salt poisoning and an upset stomach." },
  { name: "Milk (cow's)", verdict: "moderate", note: "Many adult dogs are lactose intolerant, which can cause diarrhoea." },
  { name: "Mango", verdict: "moderate", note: "The flesh is fine in small amounts. Remove the skin and the stone (choking and cyanide risk)." }
];

window.ADOPT_CHECKLIST = [
  { group: "Before you bring a dog home", items: [
    "Everyone in the family agrees and nobody is severely allergic",
    "I have 2–3 hours every day for walks, play, training and care",
    "My home or society allows dogs (check rental and society rules)",
    "I've budgeted for food, vet, vaccines, grooming and emergencies",
    "I've chosen a breed or mix whose energy and size match my lifestyle",
    "I've considered adopting from a shelter or rescue",
    "I have a plan for the dog when I travel"
  ]},
  { group: "Supplies ready", items: [
    "Food & water bowls (steel or ceramic)",
    "Age-appropriate food (same brand the dog ate before, to start)",
    "Collar or harness, leash and an ID tag with my phone number",
    "Comfortable bed or crate",
    "Chew toys and puzzle toys",
    "Poop bags, pet-safe cleaner and a grooming brush"
  ]},
  { group: "First weeks", items: [
    "First vet visit within a week (health check, vaccine and deworming plan)",
    "Microchip and local registration (if required)",
    "Fixed routine for meals, walks, toilet and sleep",
    "Start reward-based training for name, sit, come and leave it",
    "Puppy-proof the home: wires, medicines, chemicals and small objects",
    "Gently socialise with people, sounds and calm vaccinated dogs"
  ]},
  { group: "Being a great dog parent — forever", items: [
    "Vaccines, deworming and tick prevention always on schedule",
    "Daily exercise plus mental games like sniffing, puzzles and training",
    "Brush teeth and coat regularly; trim nails monthly",
    "Never hit or shout; reward what you want to see",
    "Spay or neuter at the vet-recommended age",
    "Never leave the dog in a car, on a short chain, or alone for 8+ hours",
    "Yearly check-up (every 6 months once senior)"
  ]}
];

/* Universal dog "language" — played in the selected breed's voice in the Bark Lab. */
window.BARKS = [
  { s: "alert", t: "Alert barking", when: "Rapid, repeated barks at mid pitch", says: "\"Hey! Someone's here! Pack, pay attention!\"", body: "Ears forward, body tall, tail up." },
  { s: "bark", t: "Attention bark", when: "Single sharp barks with pauses, looking at you", says: "\"Hello? Dinner? Walk? Now?\"", body: "Staring at you or the thing it wants." },
  { s: "excited", t: "Play & excitement", when: "Higher, bouncy barks and yips", says: "\"Come play with me!\"", body: "Play bow, wiggly body, loose open mouth." },
  { s: "growl", t: "Warning growl", when: "A low, steady rumble", says: "\"Back off. I'm uncomfortable.\"", body: "Stiff body, hard stare, maybe a lifted lip. Give space and never punish a growl." },
  { s: "whine", t: "Whine", when: "A high, nasal sound", says: "\"I'm anxious, excited, or I need something.\"", body: "Pacing, lip-licking, or looking at the door." },
  { s: "howl", t: "Howl", when: "A long, sustained tone, often after sirens", says: "\"I'm here. Where is everyone?\"", body: "Head tilted up. Often social, sometimes loneliness." }
];

window.QUIZ = [
  { id: "home", q: "Where do you live?", options: [
    { icon: "🏢", label: "Apartment / flat", value: "apt" },
    { icon: "🏡", label: "House with a small yard", value: "small" },
    { icon: "🌳", label: "House with a big yard or farm", value: "big" }
  ]},
  { id: "activity", q: "How active are you?", options: [
    { icon: "🛋️", label: "Mostly relaxed: short walks", value: 1 },
    { icon: "🚶", label: "Moderately active: daily walks", value: 3 },
    { icon: "🏃", label: "Very active: running, hiking", value: 5 }
  ]},
  { id: "climate", q: "What's your climate like?", options: [
    { icon: "☀️", label: "Hot / tropical", value: "hot" },
    { icon: "⛅", label: "Moderate", value: "mild" },
    { icon: "❄️", label: "Cold", value: "cold" }
  ]},
  { id: "experience", q: "Have you had a dog before?", options: [
    { icon: "🌱", label: "First-time owner", value: "first" },
    { icon: "👍", label: "Some experience", value: "some" },
    { icon: "🏆", label: "Very experienced", value: "pro" }
  ]},
  { id: "grooming", q: "How much grooming can you handle?", options: [
    { icon: "🧼", label: "Minimal, please", value: 1 },
    { icon: "🪮", label: "Weekly brushing is fine", value: 3 },
    { icon: "💇", label: "I enjoy daily grooming", value: 5 }
  ]},
  { id: "noise", q: "How do you feel about barking?", options: [
    { icon: "🤫", label: "I need a quiet dog", value: 1 },
    { icon: "🙂", label: "Some barking is OK", value: 3 },
    { icon: "📢", label: "A vocal watchdog is great", value: 5 }
  ]},
  { id: "kids", q: "Are there young children at home?", options: [
    { icon: "👶", label: "Yes", value: "yes" },
    { icon: "🧑", label: "No", value: "no" }
  ]},
  { id: "region", q: "Prefer a breed from a particular region?", options: [
    { icon: "🌐", label: "Any region", value: "" },
    { icon: "🛕", label: "Native Indian / South Asian breeds", value: "south-asia" },
    { icon: "🏯", label: "East Asian breeds", value: "east-asia" },
    { icon: "🏰", label: "European breeds", value: "europe" }
  ]}
];

/* ---------- Adoption guide ---------- */
window.READY_QUESTIONS = [
  "Can you give a dog 2–3 hours of your time every day?",
  "Does everyone at home want a dog, with no severe allergies?",
  "Does your landlord or housing society allow dogs?",
  "Can you afford food, vet care and an emergency fund every month?",
  "Do you have a plan for the dog when you travel or work late?",
  "Are you ready for a 10–16 year commitment, through moves and life changes?",
  "Will you train with patience and rewards, never hitting or shouting?",
  "Can you accept chewed shoes, accidents and muddy paws during the first months?"
];

window.JOURNEY = [
  { t: "Research honestly", d: "Match energy, size, grooming, barking and climate needs to YOUR life, not to looks. Take the Breed Match Quiz and read the breed pages.", tip: "Mixed breeds and Indies are often healthier and fit beautifully into Indian homes." },
  { t: "Choose where to get your dog", d: "Shelters and rescues (adoption) or a responsible, registered breeder. Never buy from pet shops or online sellers who ship puppies.", tip: "Adoption fees usually include vaccination, deworming and sterilisation." },
  { t: "Meet the dog (more than once)", d: "Watch how it reacts to you, your family and handling. Meet the mother if it's a puppy. Ask about its health and behaviour history.", tip: "Bring everyone who'll live with the dog, including your current dog if you have one." },
  { t: "Ask the right questions", d: "Use our 'Ask & red flags' tab: vaccination card, deworming record, temperament, why it was surrendered.", tip: "A good shelter or breeder will ask YOU questions too. That's a great sign." },
  { t: "Paperwork", d: "Adoption agreement or purchase receipt, vaccination and deworming card, microchip number, and pedigree papers (e.g. KCI) if from a breeder. Register with your municipality if required.", tip: "Keep digital copies on your phone." },
  { t: "Prepare your home", d: "Buy supplies, set up a quiet resting corner, and puppy-proof: hide wires, medicines, cleaning chemicals and small objects.", tip: "Use the checklist tab to track everything." },
  { t: "Bring-home day", d: "Pick a calm day when you'll be home for a few days. Go straight to the toilet spot, then let the dog explore one room. Keep visitors away for now.", tip: "Use the same food it was eating, then switch gradually over 7–10 days." },
  { t: "Vet visit in week 1", d: "General health check, plan vaccines and deworming, start tick prevention, and discuss sterilisation and microchipping.", tip: "Save your vet's and the nearest 24×7 emergency clinic's numbers." },
  { t: "Settle in with the 3-3-3 rule", d: "Expect 3 days of decompression, 3 weeks of learning the routine, and 3 months to feel truly at home.", tip: "Patience now builds a lifetime of trust." }
];

window.ASK_LIST = {
  shelter: [
    "How old is the dog, and what do you know about its history?",
    "Why was it surrendered or rescued?",
    "Is it vaccinated, dewormed and sterilised? Can I see the records?",
    "How does it behave with kids, cats, other dogs and strangers?",
    "Any health issues, fears or behaviour quirks?",
    "Can I foster first, or return it if it truly doesn't work out?"
  ],
  breeder: [
    "Can I meet the mother (and father if possible)?",
    "Are the parents health-screened (hips, eyes, DNA tests for the breed)?",
    "How old will the puppy be when it comes home? (Should be at least 8 weeks.)",
    "Is the litter registered (e.g. with KCI)?",
    "How have the puppies been socialised?",
    "Will you take the dog back at any age if I can't keep it?"
  ],
  redFlags: [
    "Won't let you see the mother or where the puppies are raised",
    "Many breeds for sale or always has puppies (puppy mill)",
    "Selling puppies younger than 8 weeks",
    "No vaccination or deworming records",
    "Offers to deliver or ship the puppy without you visiting",
    "Pressure to pay quickly, or 'rare colour' premium pricing",
    "Puppies that look lethargic, thin, with runny eyes or a dirty coat"
  ]
};

/* Rough cost ranges. They vary a lot by city, brand and dog, and are meant for planning only. */
window.COSTS = {
  INR: {
    symbol: "₹",
    monthly: {
      food: { Toy: [1200, 2500], Small: [1500, 3000], Medium: [3000, 5000], Large: [4500, 8000], Giant: [7000, 12000] },
      preventive: { Toy: [500, 900], Small: [600, 1000], Medium: [800, 1300], Large: [1000, 1800], Giant: [1500, 2500] },
      grooming: [[0, 300], [200, 600], [500, 1200], [1000, 2000], [1500, 3000]],
      toys: [500, 1500],
      insurance: [300, 1500]
    },
    oneTime: {
      adoption: [0, 5000],
      vaccines: [4000, 8000],
      sterilisation: { Toy: [4000, 8000], Small: [5000, 9000], Medium: [6000, 12000], Large: [8000, 15000], Giant: [10000, 20000] },
      microchip: [1000, 2500],
      supplies: [5000, 15000]
    },
    emergency: [20000, 50000]
  },
  USD: {
    symbol: "$",
    monthly: {
      food: { Toy: [20, 40], Small: [25, 50], Medium: [40, 70], Large: [60, 100], Giant: [90, 150] },
      preventive: { Toy: [25, 45], Small: [30, 50], Medium: [35, 60], Large: [40, 75], Giant: [50, 90] },
      grooming: [[0, 15], [10, 40], [30, 70], [50, 90], [70, 120]],
      toys: [15, 40],
      insurance: [25, 70]
    },
    oneTime: {
      adoption: [50, 400],
      vaccines: [100, 350],
      sterilisation: { Toy: [200, 400], Small: [200, 450], Medium: [250, 500], Large: [300, 600], Giant: [350, 700] },
      microchip: [40, 60],
      supplies: [200, 500]
    },
    emergency: [1000, 2000]
  }
};

window.ROUTINE = [
  ["6:30 am", "Toilet break and short sniff walk"],
  ["7:30 am", "Breakfast, then rest (no running for an hour)"],
  ["9 am–12 pm", "Nap, puzzle toy or chew. Practise short alone-time."],
  ["12:30 pm", "Toilet break plus a 5-minute training game"],
  ["4 pm", "Play session: fetch, tug or sniffing games"],
  ["6:30 pm", "Main walk (in cool hours in summer)"],
  ["7:30 pm", "Dinner, then calm family time"],
  ["10 pm", "Last toilet break, then bed in its own spot"]
];

window.TRAINING_BASICS = [
  { t: "Name & focus", d: "Say its name, reward the moment it looks at you. Practise 10× a day." },
  { t: "Sit", d: "Lure the nose up with a treat; the bottom goes down. Reward instantly." },
  { t: "Come (recall)", d: "Run backwards happily calling its name. Big reward every time. Never call it to punish." },
  { t: "Leave it", d: "Treat in a closed fist; reward from the OTHER hand when it backs off." },
  { t: "Loose-leash walking", d: "Stop when the leash tightens and move on when it loosens. Reward by your side." },
  { t: "Settle on a mat", d: "Reward calm lying on a mat. This is the 'off switch' every dog needs." }
];
