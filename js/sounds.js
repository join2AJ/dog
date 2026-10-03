/* PawPedia sound engine.
 * Plays real dog recordings (CC0 / CC BY, credited on the Credits page) through the Web Audio API,
 * nudging pitch to the breed's size. Only vocalisations with no freely licensed recording
 * (Basenji yodel, Shiba scream) are synthesised, and the UI marks those as "simulated". */
(function () {
  const CLIPS = {
    "bark-small":  { file: "bark-small.mp3",  label: "Small dog bark" },
    "bark-medium": { file: "bark-medium.mp3", label: "Medium dog bark" },
    "bark-large":  { file: "bark-large.mp3",  label: "Rottweiler bark" },
    "deep":        { file: "deep.mp3",        label: "Bullmastiff warning barks" },
    "alert-small": { file: "alert-small.mp3", label: "Chihuahua alert barking" },
    "alert-large": { file: "alert-large.mp3", label: "German Shepherd alert barking" },
    "yap":         { file: "yap.mp3",         label: "Small dog alert yaps" },
    "growl-small": { file: "growl-small.mp3", label: "Shih Tzu growl" },
    "growl-large": { file: "growl-large.mp3", label: "Large dog growl" },
    "playgrowl":   { file: "playgrowl.mp3",   label: "Small dog play growl" },
    "whine-small": { file: "whine-small.mp3", label: "Chihuahua puppy whine" },
    "whine-large": { file: "whine-large.mp3", label: "Dog whine" },
    "howl":        { file: "howl.mp3",        label: "Dog howl" },
    "beagle-howl": { file: "beagle-howl.mp3", label: "Beagle howling" },
    "talk":        { file: "talk.mp3",        label: "Husky 'talking'" },
    "excited":     { file: "excited.mp3",     label: "Excited dog" }
  };

  const SIZE_RATE = { Toy: 1.16, Small: 1.07, Medium: 1, Large: 0.95, Giant: 0.88 };
  const small = (size) => size === "Toy" || size === "Small";

  // Map a vocalisation type + breed size to a concrete clip.
  function resolve(type, size = "Medium") {
    const big = size === "Large" || size === "Giant";
    switch (type) {
      case "bark": return small(size) ? "bark-small" : big ? "bark-large" : "bark-medium";
      case "alert": return small(size) ? "alert-small" : "alert-large";
      case "deep": return small(size) ? "bark-medium" : "deep";
      case "yap": return "yap";
      case "growl": return small(size) ? "growl-small" : "growl-large";
      case "rumble": return "growl-large";
      case "playgrowl": return small(size) ? "playgrowl" : "growl-small";
      case "whine": return small(size) ? "whine-small" : "whine-large";
      case "howl": return "howl";
      case "bay": return "beagle-howl";
      case "talk": return "talk";
      case "excited": return "excited";
      default: return null; // synthesised: yodel, scream
    }
  }

  const SYNTH = new Set(["yodel", "scream"]);
  const isSimulated = (type) => SYNTH.has(type);

  let ctx = null, analyser = null, master = null, current = null;
  const buffers = new Map();

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      master.connect(analyser).connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  async function load(key) {
    if (buffers.has(key)) return buffers.get(key);
    const p = fetch("/sounds/" + CLIPS[key].file)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })
      .then((ab) => new Promise((res, rej) => ctx.decodeAudioData(ab, res, rej)));
    buffers.set(key, p);
    p.catch(() => buffers.delete(key));
    return p;
  }

  function stop() {
    if (current) { try { current.stop(); } catch { /* already stopped */ } current = null; }
  }

  function synth(type, rate) {
    const t = ctx.currentTime + 0.02;
    const out = ctx.createGain();
    out.connect(master);
    const osc = ctx.createOscillator();
    const vib = ctx.createOscillator();
    const vibGain = ctx.createGain();
    vib.connect(vibGain).connect(osc.frequency);
    osc.connect(out);
    let dur;
    if (type === "yodel") {
      // Basenji "barroo": warbling glide that flips up and down in pitch.
      dur = 1.6;
      osc.type = "triangle";
      const f = 520 * rate;
      osc.frequency.setValueAtTime(f, t);
      [0.25, 0.5, 0.75, 1.0, 1.25].forEach((d, i) => osc.frequency.linearRampToValueAtTime(i % 2 ? f * 0.75 : f * 1.45, t + d));
      osc.frequency.linearRampToValueAtTime(f * 0.6, t + dur);
      vib.frequency.value = 7; vibGain.gain.value = 18;
      out.gain.setValueAtTime(0.0001, t);
      out.gain.exponentialRampToValueAtTime(0.32, t + 0.08);
      out.gain.setValueAtTime(0.32, t + dur - 0.3);
      out.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    } else {
      // Shrill, rising-then-falling scream.
      dur = 1.1;
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(900 * rate, t);
      osc.frequency.exponentialRampToValueAtTime(1800 * rate, t + 0.35);
      osc.frequency.exponentialRampToValueAtTime(1100 * rate, t + dur);
      vib.frequency.value = 11; vibGain.gain.value = 60;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass"; lp.frequency.value = 3500;
      osc.disconnect(); osc.connect(lp).connect(out);
      out.gain.setValueAtTime(0.0001, t);
      out.gain.exponentialRampToValueAtTime(0.2, t + 0.05);
      out.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    }
    osc.start(t); vib.start(t); osc.stop(t + dur); vib.stop(t + dur);
    current = osc;
    return dur;
  }

  /** Play a vocalisation. Resolves with its duration in seconds (0 if audio is unavailable). */
  async function play(type, size = "Medium") {
    if (!audio()) return 0;
    stop();
    const rate = SIZE_RATE[size] || 1;
    const key = resolve(type, size);
    if (!key) return synth(type, rate);
    try {
      const buf = await load(key);
      stop();
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.playbackRate.value = rate;
      src.connect(master);
      src.start();
      current = src;
      return buf.duration / rate;
    } catch {
      return 0;
    }
  }

  /** Fill `out` (Uint8Array) with current frequency levels for a visualiser. */
  function levels(out) {
    if (analyser) analyser.getByteFrequencyData(out);
    return out;
  }

  window.Sounds = { play, stop, levels, resolve, isSimulated, CLIPS };
})();
