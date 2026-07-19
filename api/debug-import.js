// Endpoint temporal de diagnostico: revela por que falla el import de stats.js
// en Vercel. Borrar cuando el problema este resuelto.
export default async (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  const report = [];
  report.push("node: " + process.version);
  report.push("memory limit env: " + (process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE || "n/a"));
  try {
    const fursona = await import("../src/common/fursona.js");
    report.push("fursona.js OK, chars: " + fursona.FURSONA_B64.length);
  } catch (e) {
    report.push("fursona.js ERROR: " + (e && e.stack ? e.stack : String(e)));
  }
  try {
    const m = await import("../src/cards/stats.js");
    report.push("stats.js OK: " + typeof m.renderStatsCard);
  } catch (e) {
    report.push("stats.js ERROR: " + (e && e.stack ? e.stack : String(e)));
  }
  return res.send(report.join("\n"));
};
