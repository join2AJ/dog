/* Synthesised dog sounds with the Web Audio API — no audio files needed. */
(function () {
  let ctx = null;
  let noiseBuffer = null;

  function audio() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  const VOICES = {
    deep:   { f0: 150, dur: 0.30, formant: 650,  gain: 0.9 },
    medium: { f0: 270, dur: 0.22, formant: 1000, gain: 0.8 },
    small:  { f0: 520, dur: 0.14, formant: 1800, gain: 0.7 }
  };

  // One "woof": a falling sawtooth tone through a vocal-tract-like band filter, plus a puff of breath noise.
  function woof(c, t, voice, pitchMul = 1, durMul = 1) {
    const v = VOICES[voice] || VOICES.medium;
    const f0 = v.f0 * pitchMul;
    const dur = v.dur * durMul;

    const out = c.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(v.gain, t + 0.015);
    out.gain.exponentialRampToValueAtTime(v.gain * 0.5, t + dur * 0.4);
    out.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    const osc = c.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(f0 * 0.9, t);
    osc.frequency.linearRampToValueAtTime(f0 * 1.35, t + dur * 0.15);
    osc.frequency.exponentialRampToValueAtTime(f0 * 0.7, t + dur);

    const formant = c.createBiquadFilter();
    formant.type = "bandpass";
    formant.frequency.setValueAtTime(v.formant * pitchMul, t);
    formant.frequency.exponentialRampToValueAtTime(v.formant * pitchMul * 0.6, t + dur);
    formant.Q.value = 1.2;

    const body = c.createBiquadFilter();
    body.type = "lowpass";
    body.frequency.value = v.formant * 3;

    const noise = c.createBufferSource();
    noise.buffer = noiseBuffer;
    const noiseFilter = c.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = v.formant * 1.5;
    noiseFilter.Q.value = 0.8;
    const noiseGain = c.createGain();
    noiseGain.gain.value = 0.35;

    osc.connect(formant).connect(body).connect(out);
    noise.connect(noiseFilter).connect(noiseGain).connect(out);
    out.connect(c.destination);

    osc.start(t); osc.stop(t + dur + 0.02);
    noise.start(t); noise.stop(t + dur + 0.02);
  }

  function howl(c, t, base = 420, dur = 2.2) {
    const out = c.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.35, t + 0.25);
    out.gain.setValueAtTime(0.35, t + dur - 0.5);
    out.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    const osc = c.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(base * 0.8, t);
    osc.frequency.exponentialRampToValueAtTime(base * 1.35, t + dur * 0.35);
    osc.frequency.exponentialRampToValueAtTime(base * 1.1, t + dur * 0.8);
    osc.frequency.exponentialRampToValueAtTime(base * 0.75, t + dur);

    const vibrato = c.createOscillator();
    vibrato.frequency.value = 5.5;
    const vibratoDepth = c.createGain();
    vibratoDepth.gain.value = base * 0.03;
    vibrato.connect(vibratoDepth).connect(osc.frequency);

    const formant = c.createBiquadFilter();
    formant.type = "lowpass";
    formant.frequency.value = base * 4;

    osc.connect(formant).connect(out).connect(c.destination);
    osc.start(t); vibrato.start(t);
    osc.stop(t + dur); vibrato.stop(t + dur);
  }

  function whine(c, t) {
    const out = c.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.25, t + 0.1);
    out.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
    const osc = c.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(700, t);
    osc.frequency.exponentialRampToValueAtTime(1300, t + 0.6);
    osc.frequency.exponentialRampToValueAtTime(1000, t + 0.9);
    osc.connect(out).connect(c.destination);
    osc.start(t); osc.stop(t + 0.95);
  }

  function growl(c, t, dur = 0.9) {
    const out = c.createGain();
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.5, t + 0.15);
    out.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const osc = c.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.value = 85;
    const trem = c.createOscillator();
    trem.frequency.value = 28;
    const tremDepth = c.createGain();
    tremDepth.gain.value = 25;
    trem.connect(tremDepth).connect(osc.frequency);
    const lp = c.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 500;
    osc.connect(lp).connect(out).connect(c.destination);
    osc.start(t); trem.start(t);
    osc.stop(t + dur); trem.stop(t + dur);
  }

  // Returns the total duration in seconds so the UI can animate for that long.
  function play(kind, voice = "medium") {
    const c = audio();
    if (!c) return 0;
    const t = c.currentTime + 0.02;
    const v = voice === "howl" ? "medium" : voice;
    switch (kind) {
      case "single":
        if (voice === "howl") { howl(c, t, 380, 1.8); return 1.8; }
        woof(c, t, v); return 0.35;
      case "double":
        woof(c, t, v); woof(c, t + 0.28, v, 1.05); return 0.6;
      case "alert":
        for (let i = 0; i < 5; i++) woof(c, t + i * 0.24, "medium", 1 + Math.random() * 0.08, 0.85);
        return 1.3;
      case "play":
        woof(c, t, "small", 0.85, 0.9); woof(c, t + 0.2, "small", 0.95, 0.8); return 0.45;
      case "warning":
        growl(c, t, 0.8); woof(c, t + 0.75, "deep", 0.9, 1.3); return 1.2;
      case "demand":
        woof(c, t, "medium", 1.1); woof(c, t + 0.9, "medium", 1.15); return 1.2;
      case "howl":
        howl(c, t); return 2.2;
      case "whine":
        whine(c, t); whine(c, t + 1.0); return 1.9;
      default:
        woof(c, t, v); return 0.35;
    }
  }

  window.Bark = { play };
})();
