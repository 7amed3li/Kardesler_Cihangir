/**
 * Route Matrix & Regression Test
 * Tests all critical routes return 200 and validates price data integrity.
 */

const BASE = "http://localhost:3000";

const routes = [
  // Root & localized roots
  "/", "/ar", "/tr", "/ru", "/fa", "/fr", "/de", "/it", "/es", "/zh",
  // Menu pages
  "/menu", "/ar/menu", "/tr/menu", "/ru/menu", "/fa/menu", "/fr/menu",
  "/de/menu", "/it/menu", "/es/menu", "/zh/menu",
  // Best Kebab landing
  "/best-kebab-taksim", "/ar/best-kebab-taksim", "/tr/best-kebab-taksim",
  "/fr/best-kebab-taksim", "/de/best-kebab-taksim",
  // Breakfast landing
  "/turkish-breakfast-cihangir", "/ar/turkish-breakfast-cihangir", "/tr/turkish-breakfast-cihangir",
  // About & Contact
  "/about", "/contact",
  // API endpoints
  "/api/prices", "/api/rates", "/api/reviews",
  // Sitemap & Robots
  "/sitemap.xml", "/robots.txt",
];

async function testRoutes() {
  console.log("═══════════════════════════════════════════");
  console.log("  Route Matrix Test");
  console.log("═══════════════════════════════════════════\n");

  let passed = 0;
  let failed = 0;
  const failures = [];

  for (const route of routes) {
    try {
      const res = await fetch(`${BASE}${route}`, { redirect: "follow" });
      if (res.ok) {
        console.log(`  ✅ ${route} → ${res.status}`);
        passed++;
      } else {
        console.log(`  ❌ ${route} → ${res.status}`);
        failed++;
        failures.push({ route, status: res.status });
      }
    } catch (err) {
      console.log(`  ❌ ${route} → ERROR: ${err.message}`);
      failed++;
      failures.push({ route, error: err.message });
    }
  }

  console.log("\n═══════════════════════════════════════════");
  console.log(`  Results: ${passed} passed, ${failed} failed`);
  console.log("═══════════════════════════════════════════\n");

  // Test /api/prices returns valid data
  console.log("  Price API Validation:");
  try {
    const res = await fetch(`${BASE}/api/prices`);
    const json = await res.json();
    if (json.success && json.data && typeof json.data === "object") {
      const keys = Object.keys(json.data);
      const nullPrices = keys.filter(k => json.data[k] === null || json.data[k] === undefined);
      const zeroPrices = keys.filter(k => json.data[k] === 0);
      console.log(`  ✅ /api/prices: ${keys.length} items returned`);
      if (nullPrices.length > 0) console.log(`  ⚠️  ${nullPrices.length} items with null prices: ${nullPrices.slice(0, 5).join(", ")}`);
      if (zeroPrices.length > 0) console.log(`  ⚠️  ${zeroPrices.length} items with zero prices: ${zeroPrices.slice(0, 5).join(", ")}`);
    } else {
      console.log(`  ❌ /api/prices: invalid response structure`);
    }
  } catch (err) {
    console.log(`  ❌ /api/prices validation error: ${err.message}`);
  }

  if (failures.length > 0) {
    console.log("\n  Failed routes:");
    failures.forEach(f => console.log(`    - ${f.route}: ${f.status || f.error}`));
  }

  process.exit(failed > 0 ? 1 : 0);
}

testRoutes();
