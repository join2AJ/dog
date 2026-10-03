/* 3D models for the "View in 3D & AR" viewer (Google <model-viewer>).
 *
 * To add a breed: put its files in /models and add an entry keyed by breed id (see js/breeds.js).
 *   glb   – required. glTF binary; embedded animations (walk, idle, bark…) play automatically.
 *   usdz  – optional. Lets iPhone/iPad open the model in AR Quick Look (Android uses the .glb).
 *   credit – shown under the viewer; required for CC BY models.
 *
 * Example:
 *   "german-shepherd": {
 *     glb: "/models/german-shepherd.glb",
 *     usdz: "/models/german-shepherd.usdz",
 *     credit: { title: "German Shepherd", artist: "Author name", license: "CC BY 4.0", page: "https://…" }
 *   }
 */
window.MODELS = {};
