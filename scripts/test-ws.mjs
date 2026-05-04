/**
 * WebSocket endpoint test — run with: node scripts/test-ws.mjs
 * Tests both subscribe (live) and one-shot modes.
 * 
 * Usage:
 *   node scripts/test-ws.mjs              # subscribe mode (stays open for updates)
 *   node scripts/test-ws.mjs --oneshot    # one-shot fetch and exit
 */

const WS_URL = "wss://nyx.gowth.tech/ws";
const GUILD_ID = "1457044306899501060";
const ROLE_IDS = [
  "1463075318938996767",  // Owner
  "1463075809525760090",  // Co Owner
  "1480533621239714019",  // EA Head
];

const oneshot = process.argv.includes("--oneshot");
const TIMEOUT = 10000;

console.log("─────────────────────────────────");
console.log("  Nyxari WS Endpoint Test");
console.log("─────────────────────────────────");
console.log(`  URL:      ${WS_URL}`);
console.log(`  Guild:    ${GUILD_ID}`);
console.log(`  Roles:    ${ROLE_IDS.length}`);
console.log(`  Mode:     ${oneshot ? "one-shot" : "subscribe (live)"}`);
console.log("─────────────────────────────────\n");

const start = Date.now();

const ws = new WebSocket(WS_URL);

const timer = setTimeout(() => {
  console.log(`\n✗ TIMEOUT — no response after ${TIMEOUT / 1000}s`);
  ws.close();
  process.exit(1);
}, TIMEOUT);

ws.addEventListener("open", () => {
  const elapsed = Date.now() - start;
  console.log(`✓ Connected in ${elapsed}ms`);

  const payload = JSON.stringify({
    type: oneshot ? "members_by_roles" : "subscribe",
    guildId: GUILD_ID,
    roleIds: ROLE_IDS,
  });

  console.log(`→ Sending: ${payload}\n`);
  ws.send(payload);
});

ws.addEventListener("message", (event) => {
  clearTimeout(timer);
  const elapsed = Date.now() - start;

  let msg;
  try {
    msg = JSON.parse(event.data);
  } catch {
    console.log(`✗ Invalid JSON: ${event.data}`);
    return;
  }

  if (msg.type === "members_by_roles") {
    console.log(`✓ Initial data received in ${elapsed}ms`);
    console.log(`  Type: ${msg.type}\n`);

    let totalMembers = 0;
    for (const roleId of ROLE_IDS) {
      const members = msg.data?.[roleId] || [];
      const roleName =
        roleId === ROLE_IDS[0] ? "Owner" :
        roleId === ROLE_IDS[1] ? "Co Owner" : "EA Head";

      console.log(`  ${roleName} (${roleId}): ${members.length} member(s)`);
      totalMembers += members.length;

      for (const m of members) {
        const parts = [m.displayName || m.username, `status:${m.status}`];
        if (m.customStatus) parts.push(`"${m.customStatus}"`);
        if (m.activities?.length) parts.push(`activities:${m.activities.length}`);
        console.log(`    → ${parts.join(" · ")}`);
      }
    }

    console.log(`\n  Total: ${totalMembers} members`);
    console.log(`  Response: ${elapsed}ms`);
    console.log("─────────────────────────────────");
    console.log(elapsed < 2000 ? "  ✓ PASS" : "  ⚠ SLOW");
    console.log("─────────────────────────────────");

    if (oneshot) {
      ws.close();
      process.exit(0);
    } else {
      console.log("\n  Listening for live presence updates... (Ctrl+C to stop)\n");
    }
  }

  if (msg.type === "presence_update") {
    const t = new Date().toLocaleTimeString();
    const d = msg.data || {};
    console.log(`  [${t}] PRESENCE_UPDATE → ${d.displayName || d.username || msg.userId}`);
    console.log(`    status: ${d.status || "?"}`);
    if (d.activities?.length) {
      for (const a of d.activities) {
        console.log(`    activity: ${a.name}${a.details ? ` — ${a.details}` : ""}${a.state ? ` · ${a.state}` : ""}`);
      }
    }
    console.log();
  }
});

ws.addEventListener("error", (e) => {
  clearTimeout(timer);
  console.log(`\n✗ Error: ${e.message || "unknown"}`);
  process.exit(1);
});

ws.addEventListener("close", (e) => {
  if (e.code !== 1000) {
    console.log(`\n✗ Closed: code=${e.code} reason=${e.reason}`);
    process.exit(1);
  }
});
