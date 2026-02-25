/**
 * Runtime validators for the static JSON data files used by calculators.
 *
 * Each validator checks the top-level shape, verifies arrays have the
 * expected item structure, and confirms numeric fields are actually
 * finite numbers.  They throw descriptive errors only when data is
 * corrupted or malformed -- valid data passes silently.
 */

/* ------------------------------------------------------------------ */
/*  Internal helpers                                                    */
/* ------------------------------------------------------------------ */

function assertObject(
  data: unknown,
  label: string
): asserts data is Record<string, unknown> {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new Error(`${label}: expected a non-null object`);
  }
}

function assertArray(
  value: unknown,
  label: string
): asserts value is unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${label}: expected an array`);
  }
}

function assertFiniteNumber(value: unknown, label: string): void {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label}: expected a finite number, got ${String(value)}`);
  }
}

function assertString(value: unknown, label: string): void {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label}: expected a non-empty string`);
  }
}

/* ------------------------------------------------------------------ */
/*  GS Pay Tables  (src/data/gs-pay-tables.json)                       */
/* ------------------------------------------------------------------ */

export function validateGsPayData(data: unknown): void {
  assertObject(data, "GS pay data");
  const d = data as Record<string, unknown>;

  // year
  assertFiniteNumber(d.year, "GS pay data > year");

  // source
  assertString(d.source, "GS pay data > source");

  // basePayTable -- object with GS-1 through GS-15, each an array of 10 numbers
  assertObject(d.basePayTable, "GS pay data > basePayTable");
  const table = d.basePayTable as Record<string, unknown>;

  const expectedGrades = Array.from({ length: 15 }, (_, i) => `GS-${i + 1}`);
  for (const grade of expectedGrades) {
    if (!(grade in table)) {
      throw new Error(`GS pay data: missing grade ${grade} in basePayTable`);
    }
    const steps = table[grade];
    if (!Array.isArray(steps) || steps.length !== 10) {
      throw new Error(
        `GS pay data: grade ${grade} must have exactly 10 steps, got ${
          Array.isArray(steps) ? steps.length : typeof steps
        }`
      );
    }
    for (let i = 0; i < steps.length; i++) {
      if (typeof steps[i] !== "number" || !Number.isFinite(steps[i] as number)) {
        throw new Error(
          `GS pay data: grade ${grade} step ${i + 1} is not a finite number`
        );
      }
    }
  }

  // localityAreas -- array of { name: string, code: string, rate: number }
  assertArray(d.localityAreas, "GS pay data > localityAreas");
  const areas = d.localityAreas as unknown[];

  if (areas.length === 0) {
    throw new Error("GS pay data: localityAreas array is empty");
  }

  for (let i = 0; i < areas.length; i++) {
    const label = `GS pay data > localityAreas[${i}]`;
    assertObject(areas[i], label);
    const area = areas[i] as Record<string, unknown>;
    assertString(area.name, `${label}.name`);
    assertString(area.code, `${label}.code`);
    assertFiniteNumber(area.rate, `${label}.rate`);
  }
}

/* ------------------------------------------------------------------ */
/*  Military Pay  (src/data/military-pay.json)                         */
/* ------------------------------------------------------------------ */

export function validateMilitaryPayData(data: unknown): void {
  assertObject(data, "Military pay data");
  const d = data as Record<string, unknown>;

  // year
  assertFiniteNumber(d.year, "Military pay data > year");

  // basePay -- object keyed by rank (E-1..E-9, W-1..W-5, O-1..O-10)
  // Each rank maps years-of-service strings to numbers
  assertObject(d.basePay, "Military pay data > basePay");
  const basePay = d.basePay as Record<string, unknown>;

  const expectedRanks = [
    "E-1", "E-2", "E-3", "E-4", "E-5", "E-6", "E-7", "E-8", "E-9",
    "W-1", "W-2", "W-3", "W-4", "W-5",
    "O-1", "O-2", "O-3", "O-4", "O-5", "O-6", "O-7", "O-8", "O-9", "O-10",
  ];

  for (const rank of expectedRanks) {
    if (!(rank in basePay)) {
      throw new Error(`Military pay data: missing rank ${rank} in basePay`);
    }
    assertObject(basePay[rank], `Military pay data > basePay.${rank}`);
    const yos = basePay[rank] as Record<string, unknown>;
    for (const [key, val] of Object.entries(yos)) {
      assertFiniteNumber(
        val,
        `Military pay data > basePay.${rank}["${key}"]`
      );
    }
  }

  // bas -- { enlisted: number, officer: number }
  assertObject(d.bas, "Military pay data > bas");
  const bas = d.bas as Record<string, unknown>;
  assertFiniteNumber(bas.enlisted, "Military pay data > bas.enlisted");
  assertFiniteNumber(bas.officer, "Military pay data > bas.officer");

  // bah -- object keyed by location, each { withDependents: number, withoutDependents: number }
  assertObject(d.bah, "Military pay data > bah");
  const bah = d.bah as Record<string, unknown>;
  for (const [location, entry] of Object.entries(bah)) {
    const label = `Military pay data > bah["${location}"]`;
    assertObject(entry, label);
    const loc = entry as Record<string, unknown>;
    assertFiniteNumber(loc.withDependents, `${label}.withDependents`);
    assertFiniteNumber(loc.withoutDependents, `${label}.withoutDependents`);
  }

  // yearsOfServiceKeys -- array of numbers
  assertArray(
    d.yearsOfServiceKeys,
    "Military pay data > yearsOfServiceKeys"
  );
  const yosKeys = d.yearsOfServiceKeys as unknown[];
  if (yosKeys.length === 0) {
    throw new Error("Military pay data: yearsOfServiceKeys array is empty");
  }
  for (let i = 0; i < yosKeys.length; i++) {
    assertFiniteNumber(
      yosKeys[i],
      `Military pay data > yearsOfServiceKeys[${i}]`
    );
  }
}

/* ------------------------------------------------------------------ */
/*  CPI Data  (src/data/cpi-data.json)                                 */
/* ------------------------------------------------------------------ */

export function validateCpiData(data: unknown): void {
  assertObject(data, "CPI data");
  const d = data as Record<string, unknown>;

  // source
  assertString(d.source, "CPI data > source");

  // baseYear
  assertString(d.baseYear, "CPI data > baseYear");

  // data -- object keyed by year string, values are finite numbers
  assertObject(d.data, "CPI data > data");
  const cpiEntries = d.data as Record<string, unknown>;

  const keys = Object.keys(cpiEntries);
  if (keys.length === 0) {
    throw new Error("CPI data: data object is empty");
  }

  for (const [year, value] of Object.entries(cpiEntries)) {
    // Keys should look like year strings (all digits)
    if (!/^\d{4}$/.test(year)) {
      throw new Error(
        `CPI data: unexpected key "${year}" (expected a 4-digit year)`
      );
    }
    assertFiniteNumber(value, `CPI data > data["${year}"]`);
  }
}

/* ------------------------------------------------------------------ */
/*  Cost of Living  (src/data/cost-of-living.json)                     */
/* ------------------------------------------------------------------ */

const COST_OF_LIVING_CATEGORIES = [
  "overall",
  "housing",
  "grocery",
  "transportation",
  "healthcare",
  "utilities",
] as const;

export function validateCostOfLivingData(data: unknown): void {
  assertObject(data, "Cost-of-living data");
  const d = data as Record<string, unknown>;

  // source
  assertString(d.source, "Cost-of-living data > source");

  // cities -- array of city objects
  assertArray(d.cities, "Cost-of-living data > cities");
  const cities = d.cities as unknown[];

  if (cities.length === 0) {
    throw new Error("Cost-of-living data: cities array is empty");
  }

  for (let i = 0; i < cities.length; i++) {
    const label = `Cost-of-living data > cities[${i}]`;
    assertObject(cities[i], label);
    const city = cities[i] as Record<string, unknown>;

    assertString(city.name, `${label}.name`);

    for (const cat of COST_OF_LIVING_CATEGORIES) {
      assertFiniteNumber(city[cat], `${label}.${cat}`);
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Wage Gap Data  (src/data/wage-gap-data.json)                       */
/* ------------------------------------------------------------------ */

export function validateWageGapData(data: unknown): void {
  assertObject(data, "Wage gap data");
  const d = data as Record<string, unknown>;

  // overall -- { men: number, women: number, gap_cents: number, source: string }
  assertObject(d.overall, "Wage gap data > overall");
  const overall = d.overall as Record<string, unknown>;
  assertFiniteNumber(overall.men, "Wage gap data > overall.men");
  assertFiniteNumber(overall.women, "Wage gap data > overall.women");
  assertFiniteNumber(overall.gap_cents, "Wage gap data > overall.gap_cents");
  assertString(overall.source, "Wage gap data > overall.source");

  // occupations -- array of { category, men, women, gap_cents }
  assertArray(d.occupations, "Wage gap data > occupations");
  const occupations = d.occupations as unknown[];

  if (occupations.length === 0) {
    throw new Error("Wage gap data: occupations array is empty");
  }

  for (let i = 0; i < occupations.length; i++) {
    const label = `Wage gap data > occupations[${i}]`;
    assertObject(occupations[i], label);
    const occ = occupations[i] as Record<string, unknown>;
    assertString(occ.category, `${label}.category`);
    assertFiniteNumber(occ.men, `${label}.men`);
    assertFiniteNumber(occ.women, `${label}.women`);
    assertFiniteNumber(occ.gap_cents, `${label}.gap_cents`);
  }

  // education_multipliers -- Record<string, number>
  assertObject(
    d.education_multipliers,
    "Wage gap data > education_multipliers"
  );
  const eduMultipliers = d.education_multipliers as Record<string, unknown>;
  for (const [key, val] of Object.entries(eduMultipliers)) {
    assertFiniteNumber(
      val,
      `Wage gap data > education_multipliers["${key}"]`
    );
  }

  // experience_multipliers -- Record<string, number>
  assertObject(
    d.experience_multipliers,
    "Wage gap data > experience_multipliers"
  );
  const expMultipliers = d.experience_multipliers as Record<string, unknown>;
  for (const [key, val] of Object.entries(expMultipliers)) {
    assertFiniteNumber(
      val,
      `Wage gap data > experience_multipliers["${key}"]`
    );
  }

  // state_adjustments -- Record<string, number>
  assertObject(d.state_adjustments, "Wage gap data > state_adjustments");
  const stateAdj = d.state_adjustments as Record<string, unknown>;
  for (const [key, val] of Object.entries(stateAdj)) {
    assertFiniteNumber(
      val,
      `Wage gap data > state_adjustments["${key}"]`
    );
  }
}
