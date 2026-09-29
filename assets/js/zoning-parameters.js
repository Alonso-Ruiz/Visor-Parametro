const ROAD_BANDS = [
  { label: "Vía ≤ 20 m", max: 20 },
  { label: "20 m < vía ≤ 25 m", max: 25 },
  { label: "25 m < vía ≤ 35 m", max: 35 },
  { label: "35 m < vía ≤ 45 m", max: 45 },
  { label: "Vía > 45 m", max: Infinity },
];

const commonUses = {
  unifamiliar: "Vivienda unifamiliar",
  multifamiliar: "Vivienda multifamiliar",
  conjunto: "Conjunto residencial",
  comercial: "Comercio y oficinas",
};

const EPAP_LOT_MIN = {
  ZDB: 300,
  ZDM: 450,
  ZDA: 800,
  "ZDM-S": 450,
  "ZDA-S": 800,
};

const ZONE_COLORS = {
  "ZDB": "#f0e600",
  "ZDM": "#a9d80b",
  "ZDA": "#d92720",
  "ZDM-S": "#f39a09",
  "ZDA-S": "#12a99a",
  "ZRP": "#64b84e",
  "OU": "#aab4b5",
  "E1": "#66c4be",
  "E2": "#34aeb0",
  "E3": "#247f8b",
  "H2": "#e76a78",
  "H3": "#d94d68",
  "H4": "#bd385d",
  "ZARQ": "#9caeab",
  "SC": "#c8d0cf",
};

const ZONE_PARAMETERS = {
  ZDB: {
    label: "Zona de Densidad Baja",
    uses: ["unifamiliar", "multifamiliar", "comercial"],
    lotMin: {
      unifamiliar: [300, 300, 450, 450, 600],
      multifamiliar: [450, 450, 600, 600, 1000],
      comercial: [600, 600, 1000, 1000, 1500],
    },
    freeArea: {
      unifamiliar: [30, 30, 30, 30, 35],
      multifamiliar: [35, 35, 35, 35, 40],
      comercial: [15, 15, 15, 15, 20],
    },
    ceBase: [1.95, 2.25, 2.8, 2.8, 3],
    ceMax: [2.73, 3.15, 3.92, 3.92, 4.2],
    densityBase: [1000, 1000, 1100, 1100, 1400],
    densityMax: [1400, 1400, 1540, 1540, 1960],
    heightFactor: 0.5,
  },
  ZDM: {
    label: "Zona de Densidad Media",
    uses: ["unifamiliar", "multifamiliar", "conjunto", "comercial"],
    lotMin: {
      unifamiliar: [300, 300, 450, 450, 600],
      multifamiliar: [450, 450, 600, 600, 1000],
      conjunto: [1500, 1500, 1800, 1800, 2500],
      comercial: [600, 600, 1000, 1000, 1500],
    },
    freeArea: {
      unifamiliar: [30, 30, 30, 30, 35],
      multifamiliar: [30, 30, 30, 30, 35],
      conjunto: [50, 50, 50, 50, 50],
      comercial: [20, 20, 20, 20, 25],
    },
    ceBase: [3, 3.25, 3.6, 4, 5.2],
    ceMax: [4.2, 4.55, 5.04, 5.6, 7.28],
    densityBase: [1300, 1400, 1600, 1800, 2000],
    densityMax: [1820, 1960, 2240, 2520, 2800],
    densityConjuntoBase: [1100, 1100, 1300, 1400, 1600],
    densityConjuntoMax: [1540, 1540, 1820, 1960, 2240],
    heightFactor: 1,
  },
  ZDA: {
    label: "Zona de Densidad Alta",
    uses: ["multifamiliar", "conjunto", "comercial"],
    lotMin: {
      multifamiliar: [600, 600, 800, 800, 1000],
      conjunto: [1500, 1500, 1800, 1800, 2500],
      comercial: [600, 600, 1000, 1000, 1500],
    },
    freeArea: {
      multifamiliar: [35, 35, 35, 35, 40],
      conjunto: [50, 50, 50, 50, 50],
      comercial: [25, 25, 25, 25, 30],
    },
    ceBase: [5, 5.2, 6.25, 6.8, 8.7],
    ceMax: [7, 7.28, 8.75, 9.52, 12.18],
    densityBase: [1900, 2000, 2400, 2600, 3300],
    densityMax: [2660, 2800, 3360, 3640, 4620],
    densityConjuntoBase: [1500, 1600, 1900, 2100, 2600],
    densityConjuntoMax: [2100, 2240, 2660, 2940, 3640],
    heightFactor: 1.5,
  },
};

ZONE_PARAMETERS["ZDM-S"] = {
  ...ZONE_PARAMETERS.ZDM,
  label: "Zona de Densidad Media Sostenible",
  sustainable: true,
  uses: ["multifamiliar", "conjunto"],
  lotMin: {
    multifamiliar: [450, 450, 600, 600, 1000],
    conjunto: [450, 450, 600, 600, 1000],
  },
  epapLotMin: [450, 450, 600, 600, 1000],
};

ZONE_PARAMETERS["ZDA-S"] = {
  ...ZONE_PARAMETERS.ZDA,
  label: "Zona de Densidad Alta Sostenible",
  sustainable: true,
  uses: ["multifamiliar", "conjunto"],
  lotMin: {
    multifamiliar: [600, 600, 800, 800, 1000],
    conjunto: [600, 600, 800, 800, 1000],
  },
  epapLotMin: [800, 800, 800, 800, 1000],
};

function roadBandIndex(width) {
  const value = Number(width) || 0;
  return ROAD_BANDS.findIndex((band) => value <= band.max);
}

function useLabel(key) {
  return commonUses[key] || key;
}

function parametersFor(zone, use, roadWidth) {
  const definition = ZONE_PARAMETERS[zone];
  if (!definition) return null;
  const band = Math.max(0, roadBandIndex(roadWidth));
  const selectedUse = definition.uses.includes(use) ? use : definition.uses[0];
  const isConjunto = selectedUse === "conjunto";
  return {
    definition,
    use: selectedUse,
    band,
    bandLabel: ROAD_BANDS[band].label,
    lotMin: definition.lotMin[selectedUse]?.[band] ?? null,
    freeArea: definition.freeArea[selectedUse]?.[band] ?? definition.freeArea.multifamiliar?.[band] ?? 0,
    ceBase: definition.ceBase[band],
    ceMax: definition.ceMax[band],
    densityBase: isConjunto ? definition.densityConjuntoBase?.[band] : definition.densityBase[band],
    densityMax: isConjunto ? definition.densityConjuntoMax?.[band] : definition.densityMax[band],
    heightFactor: definition.heightFactor,
    epapLotMin: EPAP_LOT_MIN[zone] ?? null,
  };
}
