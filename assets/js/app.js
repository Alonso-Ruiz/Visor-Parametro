const $ = (id) => document.getElementById(id);
const nf0 = new Intl.NumberFormat("es-PE", { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat("es-PE", { minimumFractionDigits: 1, maximumFractionDigits: 2 });

const ui = {
  welcome: $("welcomeModal"),
  enter: $("enterButton"),
  closeWelcome: $("closeWelcome"),
  help: $("helpButton"),
  search: $("searchInput"),
  clearSearch: $("clearSearch"),
  results: $("searchResults"),
  layersPanel: $("layersPanel"),
  layersButton: $("layersButton"),
  closeLayers: $("closeLayers"),
  opacity: $("opacityInput"),
  opacityOutput: $("opacityOutput"),
  satelliteOpacity: $("satelliteOpacityInput"),
  satelliteOpacityOutput: $("satelliteOpacityOutput"),
  roadsToggle: $("roadsToggle"),
  redVialToggle: $("redVialToggle"),
  allRoadsToggle: $("allRoadsToggle"),
  districtToggle: $("districtToggle"),
  proposedZoningToggle: $("proposedZoningToggle"),
  legend: $("legend"),
  mapStatus: $("mapStatus"),
  home: $("homeButton"),
  togglePanel: $("togglePanelButton"),
  detailPanel: $("detailPanel"),
  detailEmpty: $("detailEmpty"),
  detailContent: $("detailContent"),
  closeDetail: $("closeDetail"),
  zoneCode: $("zoneCode"),
  zoneName: $("zoneName"),
  featureId: $("featureId"),
  notice: $("normativeNotice"),
  use: $("useSelect"),
  roadSelect: $("roadSelect"),
  roadSourceMeta: $("roadSourceMeta"),
  roadWidth: $("roadWidthInput"),
  retreat: $("retreatInput"),
  floorHeight: $("floorHeightInput"),
  epapToggle: $("epapToggle"),
  epapControls: $("epapControls"),
  epap: $("epapInput"),
  epapOutput: $("epapOutput"),
  epapType: $("epapTypeSelect"),
  epapCondition: $("epapConditionSelect"),
  epapFactor: $("epapFactorSelect"),
  epapRuleNote: $("epapRuleNote"),
  roadBand: $("roadBandBadge"),
  lotArea: $("lotAreaMetric"),
  freeArea: $("freeAreaMetric"),
  baseCe: $("baseCeMetric"),
  authorizedCe: $("authorizedCeMetric"),
  buildableArea: $("buildableAreaMetric"),
  height: $("heightMetric"),
  floors: $("floorsMetric"),
  density: $("densityMetric"),
  lotCompliance: $("lotCompliance"),
  lotMinimum: $("lotMinimum"),
  baseBuildableLabel: $("baseBuildableLabel"),
  authorizedBuildableLabel: $("authorizedBuildableLabel"),
  baseBuildableBar: $("baseBuildableBar"),
  authorizedBuildableBar: $("authorizedBuildableBar"),
  bonusSummary: $("bonusSummary"),
  print: $("printButton"),
  printDetail: $("printDetailButton"),
  tilt3d: $("tilt3dButton"),
  flat2d: $("flat2dButton"),
  mapModelHud: $("mapModelHud"),
  mapLotCode: $("mapLotCode"),
  modelSelectionLabel: $("modelSelectionLabel"),
  modelFloors: $("modelFloors"),
  modelHeight: $("modelHeight"),
  modelArea: $("modelArea"),
  occupationDonut: $("occupationDonut"),
  freeAreaDonut: $("freeAreaDonut"),
  epapDonut: $("epapDonut"),
  occupationLabel: $("occupationLabel"),
  freeAreaLabel: $("freeAreaLabel"),
  epapLabel: $("epapLabel"),
};

const state = {
  collection: null,
  features: [],
  featureById: new Map(),
  selectedFeature: null,
  selectedFeatures: [],
  selectionAnchorId: null,
  proposedZoning: null,
  roads: [],
  roadCollection: null,
  redVial: null,
  districtBoundary: null,
  roadCandidates: [],
  fillOpacity: 0.82,
  satelliteOpacity: 0.5,
  currentUse: "multifamiliar",
  lastModel: null,
  ready: false,
};

const map = new maplibregl.Map({
  container: "map",
  center: [-76.995, -12.096],
  zoom: 14,
  pitch: 38,
  bearing: -18,
  minZoom: 12,
  maxZoom: 20,
  maxPitch: 75,
  canvasContextAttributes: { antialias: true, preserveDrawingBuffer: true },
  style: {
    version: 8,
    sources: {
      satellite: {
        type: "raster",
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
        tileSize: 256,
        attribution: "Tiles © Esri",
      },
    },
    layers: [{
      id: "satellite",
      type: "raster",
      source: "satellite",
      paint: {
        "raster-opacity": 0.5,
        "raster-saturation": -0.82,
        "raster-contrast": -0.12,
        "raster-brightness-min": 0.04,
        "raster-brightness-max": 0.82,
      },
    }],
  },
});
map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "bottom-right");
map.dragRotate.enable();
map.touchZoomRotate.enableRotation();

function zoneColor(zone) {
  return ZONE_COLORS[zone] || "#aeb8b3";
}

function zoneColorExpression() {
  const expression = ["match", ["get", "zona"]];
  Object.entries(ZONE_COLORS).forEach(([zone, color]) => expression.push(zone, color));
  expression.push("#aeb8b3");
  return expression;
}

function proposedZoningColorExpression() {
  const expression = ["match", ["get", "simb_012"]];
  Object.entries(ZONE_COLORS).forEach(([zone, color]) => expression.push(zone, color));
  expression.push("#aeb8b3");
  return expression;
}

function loadData() {
  try {
    state.collection = LOTES_DATA;
    state.features = state.collection.features;
    state.featureById = new Map(state.features.map((feature) => [String(feature.properties.id), feature]));
    state.proposedZoning = typeof json_PropuestaZonificacin_0 !== "undefined" ? json_PropuestaZonificacin_0 : emptyCollection();
    state.roadCollection = normalizeRoadCollection(json_Secciones_Viales_3_1);
    state.roads = state.roadCollection.features;
    state.redVial = json_red_vial_0;
    state.districtBoundary = json_limite_distrital_0;
    buildLegend();
    map.once("load", installMapLayers);
  } catch (error) {
    console.error(error);
    ui.mapStatus.classList.add("error");
    ui.mapStatus.querySelector("span:last-child").textContent = "No se pudo cargar la capa de lotes";
  }
}

function installMapLayers() {
  if (state.proposedZoning?.features?.length) {
    map.addSource("proposed-zoning", { type: "geojson", data: state.proposedZoning });
    map.addLayer({
      id: "proposed-zoning-fill",
      type: "fill",
      source: "proposed-zoning",
      paint: { "fill-color": proposedZoningColorExpression(), "fill-opacity": 0.5 },
    });
    map.addLayer({
      id: "proposed-zoning-line",
      type: "line",
      source: "proposed-zoning",
      paint: {
        "line-color": "rgba(255,255,255,.82)",
        "line-width": ["interpolate", ["linear"], ["zoom"], 13, 0.45, 17, 1.35],
      },
    });
  }
  map.addSource("lots", { type: "geojson", data: state.collection });
  map.addLayer({ id: "lots-fill", type: "fill", source: "lots", paint: { "fill-color": zoneColorExpression(), "fill-opacity": state.fillOpacity } });
  map.addLayer({ id: "lots-line", type: "line", source: "lots", paint: { "line-color": "rgba(36,43,42,.92)", "line-width": ["interpolate", ["linear"], ["zoom"], 13, 0.55, 17, 1.25] } });
  map.addSource("district-boundary", { type: "geojson", data: state.districtBoundary });
  map.addLayer({
    id: "district-boundary-casing",
    type: "line",
    source: "district-boundary",
    paint: { "line-color": "#202827", "line-width": ["interpolate", ["linear"], ["zoom"], 12, 2.8, 16, 5], "line-opacity": 0.95 },
  });
  map.addLayer({
    id: "district-boundary",
    type: "line",
    source: "district-boundary",
    paint: { "line-color": "#aeb8b6", "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1, 16, 2], "line-opacity": 0.96 },
  });
  map.addLayer({ id: "lot-selected-fill", type: "fill", source: "lots", filter: ["==", ["get", "id"], ""], paint: { "fill-color": "#00ff9d", "fill-opacity": 0.22 } });
  map.addLayer({ id: "lot-selected-line", type: "line", source: "lots", filter: ["==", ["get", "id"], ""], paint: { "line-color": "#eafff6", "line-width": 3.2, "line-blur": 0.2 } });
  map.addSource("roads", { type: "geojson", data: state.roadCollection });
  map.addSource("red-vial", { type: "geojson", data: state.redVial });
  map.addLayer({
    id: "red-vial-casing",
    type: "line",
    source: "red-vial",
    paint: { "line-color": "#27302e", "line-width": ["interpolate", ["linear"], ["zoom"], 12, 2.8, 16, 5.2], "line-opacity": 0.92 },
  });
  map.addLayer({
    id: "red-vial",
    type: "line",
    source: "red-vial",
    paint: {
      "line-color": ["match", ["get", "CLASIFIC"], "Vía Local Preferencial", "#bd342b", "Vía Local Secundaria", "#d24939", "#a94439"],
      "line-width": ["interpolate", ["linear"], ["zoom"], 12, 1.25, 16, 3.1],
      "line-opacity": 0.95,
    },
  });
  map.addLayer({
    id: "roads-casing",
    type: "line",
    source: "roads",
    paint: { "line-color": "#303735", "line-width": ["interpolate", ["linear"], ["zoom"], 13, 3, 17, 6], "line-opacity": 0.94 },
  });
  map.addLayer({
    id: "roads",
    type: "line",
    source: "roads",
    paint: {
      "line-color": ["match", ["get", "clasificacion"], "Vía Local Preferencial", "#bd342b", "Vía Local Secundaria", "#555b58", "#555b58"],
      "line-width": ["interpolate", ["linear"], ["zoom"], 13, 1.5, 17, 3.5],
      "line-opacity": 0.96,
    },
  });
  map.addLayer({ id: "road-selected", type: "line", source: "roads", filter: ["==", ["get", "codigo"], "__none__"], paint: { "line-color": "#00f09a", "line-width": 5.5, "line-opacity": 1 } });
  map.addSource("epap-model", { type: "geojson", data: emptyCollection() });
  map.addLayer({ id: "epap-model", type: "fill-extrusion", source: "epap-model", paint: { "fill-extrusion-color": "#e2a53f", "fill-extrusion-height": 0.55, "fill-extrusion-base": 0, "fill-extrusion-opacity": 0.95 } });
  map.addSource("cabida-model", { type: "geojson", data: emptyCollection() });
  map.addLayer({
    id: "cabida-model",
    type: "fill-extrusion",
    source: "cabida-model",
    paint: {
      "fill-extrusion-color": ["get", "color"],
      "fill-extrusion-height": ["get", "height"],
      "fill-extrusion-base": ["get", "base"],
      "fill-extrusion-opacity": 0.94,
      "fill-extrusion-vertical-gradient": true,
    },
  });
  if (typeof map.setLight === "function") map.setLight({ anchor: "map", color: "#ffffff", intensity: 0.58, position: [1.2, 205, 38] });

  const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 12, className: "lot-popup" });
  map.on("mousemove", (event) => {
    const lotFeature = map.queryRenderedFeatures(event.point, { layers: ["lots-fill"] })[0];
    map.getCanvas().style.cursor = lotFeature ? "pointer" : "";
    if (!lotFeature) {
      popup.remove();
      return;
    }
    const lot = state.featureById.get(String(lotFeature.properties.id));
    if (lot) popup.setLngLat(event.lngLat).setHTML(`<b>Lote ${escapeHtml(lot.properties.cod_lote || lot.properties.id)}</b><br>${escapeHtml(lot.properties.zona)} · ${nf0.format(featureArea(lot))} m²`).addTo(map);
  });
  map.on("click", (event) => {
    const lotFeature = map.queryRenderedFeatures(event.point, { layers: ["lots-fill"] })[0];
    const lot = lotFeature ? state.featureById.get(String(lotFeature.properties.id)) : null;
    if (lot) {
      const original = event.originalEvent;
      selectFeature(lot, true, Boolean(original?.ctrlKey || original?.metaKey), Boolean(original?.shiftKey));
    } else {
      popup.remove();
    }
  });

  state.ready = true;
  fitDistrict();
  ui.mapStatus.classList.add("ready");
  ui.mapStatus.querySelector("span:last-child").textContent = `${nf0.format(state.features.length)} lotes · ${nf0.format(state.roads.length)} secciones normativas · ${nf0.format(state.redVial.features.length)} tramos de red vial · límite distrital`;
}

function emptyCollection() { return { type: "FeatureCollection", features: [] }; }

function normalizeRoadCollection(collection) {
  return {
    ...collection,
    features: (collection?.features || []).map((feature) => {
      const p = feature.properties || {};
      return {
        ...feature,
        properties: {
          ...p,
          codigo: p.CODIGO || p["CÓDIGO"] || p["CODIGO"] || "",
          via: p.NOMBRE || p.NOMBRE_FIN || "Vía sin nombre",
          tramo: p.TRAMO || "Tramo sin descripción",
          clasificacion: p.CLASIFICA || p.CLASIFIC || "",
          ancho_m: Number(p.ANCHO) || 0,
        },
      };
    }),
  };
}

function selectFeature(feature, zoom = true, additive = false, range = false) {
  const id = String(feature.properties.id);
  if (range && state.selectionAnchorId) {
    const anchorIndex = state.features.findIndex((item) => String(item.properties.id) === state.selectionAnchorId);
    const targetIndex = state.features.findIndex((item) => String(item.properties.id) === id);
    if (anchorIndex >= 0 && targetIndex >= 0) {
      const start = Math.min(anchorIndex, targetIndex);
      const end = Math.max(anchorIndex, targetIndex);
      const selectedIds = new Set(additive ? state.selectedFeatures.map((item) => String(item.properties.id)) : []);
      for (const item of state.features.slice(start, end + 1)) selectedIds.add(String(item.properties.id));
      state.selectedFeatures = [...selectedIds].map((itemId) => state.featureById.get(itemId)).filter(Boolean);
    }
  } else if (additive) {
    const selectedIds = new Set(state.selectedFeatures.map((item) => String(item.properties.id)));
    if (selectedIds.has(id)) selectedIds.delete(id);
    else selectedIds.add(id);
    state.selectedFeatures = [...selectedIds].map((itemId) => state.featureById.get(itemId)).filter(Boolean);
    state.selectionAnchorId = id;
  } else {
    state.selectedFeatures = [feature];
    state.selectionAnchorId = id;
  }

  if (!state.selectedFeatures.length) {
    state.selectedFeature = null;
    if (state.ready) {
      map.setFilter("lot-selected-fill", ["in", ["get", "id"], ["literal", []]]);
      map.setFilter("lot-selected-line", ["in", ["get", "id"], ["literal", []]]);
    }
    ui.mapModelHud.classList.add("is-hidden");
    ui.detailPanel.classList.remove("is-open");
    ui.detailEmpty.classList.remove("is-hidden");
    ui.detailContent.classList.add("is-hidden");
    clearMapModel();
    resetRoadHighlight();
    return;
  }

  state.selectedFeature = state.selectedFeatures.includes(feature) ? feature : state.selectedFeatures.at(-1);
  feature = state.selectedFeature;
  if (state.ready) {
    const ids = state.selectedFeatures.map((item) => String(item.properties.id));
    map.setFilter("lot-selected-fill", ["in", ["get", "id"], ["literal", ids]]);
    map.setFilter("lot-selected-line", ["in", ["get", "id"], ["literal", ids]]);
    if (zoom) focusFeatures(state.selectedFeatures, true);
  }

  const props = feature.properties;
  ui.zoneCode.textContent = props.zona;
  ui.zoneName.textContent = titleCase(props.zona_nombre);
  ui.featureId.textContent = `LOTE ${props.cod_lote || props.id}`;
  ui.retreat.value = Number(props.retiro_frontal) > 0 ? Number(props.retiro_frontal) : 0;
  ui.mapLotCode.textContent = props.cod_lote || props.id;
  ui.modelSelectionLabel.textContent = state.selectedFeatures.length > 1
    ? `Cabida sobre ${nf0.format(state.selectedFeatures.length)} lotes`
    : "Cabida sobre el lote";
  ui.mapModelHud.classList.remove("is-hidden");
  ui.detailEmpty.classList.add("is-hidden");
  ui.detailContent.classList.remove("is-hidden");
  ui.detailPanel.classList.add("is-open");
  ui.print.disabled = false;
  ui.printDetail.disabled = false;
  configureUses(props.zona);
  detectRoads(feature);
  updateCalculation();
}

function configureUses(zone) {
  const definition = ZONE_PARAMETERS[zone];
  ui.use.innerHTML = "";
  const uses = definition?.uses || ["sin_parametro"];
  if (!uses.includes(state.currentUse)) state.currentUse = uses[0];
  uses.forEach((use) => {
    const option = document.createElement("option");
    option.value = use;
    option.textContent = use === "sin_parametro" ? "Sin parámetros edificatorios" : useLabel(use);
    ui.use.append(option);
  });
  ui.use.value = state.currentUse;
  ui.use.disabled = !definition;
}

function detectRoads(feature) {
  resetRoadHighlight();
  state.roadCandidates = [];
  ui.roadSelect.innerHTML = `<option value="manual">Ingreso manual</option>`;
  if (!state.roads.length) {
    ui.roadWidth.readOnly = false;
    ui.roadSourceMeta.textContent = "La capa vial no está disponible. Ingrese el ancho manualmente.";
    return;
  }

  const boundaryPoints = polygonsFromGeometry(feature.geometry)
    .flatMap((polygon) => sampleRing(polygon[0], 48));
  const candidates = state.roads.map((road) => {
    const lines = linesFromGeometry(road.geometry);
    let distance = Infinity;
    for (const point of boundaryPoints) {
      for (const line of lines) {
        for (let index = 0; index < line.length - 1; index += 1) {
          distance = Math.min(distance, distancePointSegmentMeters(point, line[index], line[index + 1]));
          if (distance < 0.25) break;
        }
      }
    }
    return { road, distance };
  }).filter((candidate) => Number(candidate.road.properties.ancho_m) > 0)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 6);

  state.roadCandidates = candidates;
  candidates.forEach((candidate, index) => {
    const p = candidate.road.properties;
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${p.codigo} · ${p.via || "Vía sin nombre"} · ${nf1.format(p.ancho_m)} m`;
    ui.roadSelect.append(option);
  });

  if (candidates.length) {
    ui.roadSelect.value = "0";
    applyRoadCandidate(0, false);
  } else {
    ui.roadSelect.value = "manual";
    ui.roadWidth.readOnly = false;
    ui.roadSourceMeta.textContent = "No se detectó un tramo normativo cercano. Ingrese el ancho manualmente.";
  }
}

function applyRoadCandidate(index, recalculate = true) {
  resetRoadHighlight();
  if (index === "manual" || index == null || Number.isNaN(Number(index))) {
    ui.roadWidth.readOnly = false;
    ui.roadSourceMeta.textContent = "Modo manual. Verifique el ancho correspondiente al frente de acceso del proyecto.";
    if (recalculate) updateCalculation();
    return;
  }
  const candidate = state.roadCandidates[Number(index)];
  if (!candidate) return;
  const p = candidate.road.properties;
  ui.roadWidth.value = Number(p.ancho_m).toFixed(2).replace(/\.00$/, "");
  ui.roadWidth.readOnly = true;
  ui.roadSourceMeta.textContent = `${p.clasificacion} · ${p.tramo || "Tramo sin descripción"} · a ${nf0.format(candidate.distance)} m del límite.`;
  if (state.ready) map.setFilter("road-selected", ["==", ["get", "codigo"], p.codigo]);
  if (recalculate) updateCalculation();
}

function resetRoadHighlight() {
  if (state.ready && map.getLayer("road-selected")) map.setFilter("road-selected", ["==", ["get", "codigo"], "__none__"]);
}

function sampleRing(ring, maxPoints) {
  const clean = ring.length > 1 && ring[0][0] === ring.at(-1)[0] && ring[0][1] === ring.at(-1)[1]
    ? ring.slice(0, -1)
    : ring;
  const step = Math.max(1, Math.ceil(clean.length / maxPoints));
  return clean.filter((_, index) => index % step === 0);
}

function linesFromGeometry(geometry) {
  if (geometry?.type === "LineString") return [geometry.coordinates];
  if (geometry?.type === "MultiLineString") return geometry.coordinates;
  return [];
}

function distancePointSegmentMeters(point, start, end) {
  const cosLat = Math.cos((point[1] * Math.PI) / 180);
  const ax = (start[0] - point[0]) * 111320 * cosLat;
  const ay = (start[1] - point[1]) * 110540;
  const bx = (end[0] - point[0]) * 111320 * cosLat;
  const by = (end[1] - point[1]) * 110540;
  const dx = bx - ax;
  const dy = by - ay;
  const denominator = dx * dx + dy * dy;
  const t = denominator ? clamp(-(ax * dx + ay * dy) / denominator, 0, 1) : 0;
  return Math.hypot(ax + t * dx, ay + t * dy);
}

function updateCalculation() {
  if (!state.selectedFeature) return;
  const feature = state.selectedFeature;
  const zone = feature.properties.zona;
  const roadWidth = clamp(numberValue(ui.roadWidth, 20), 6, 80);
  const retreat = clamp(numberValue(ui.retreat, 0), 0, 30);
  const floorHeight = clamp(numberValue(ui.floorHeight, 3), 2.4, 5);
  const p = parametersFor(zone, state.currentUse, roadWidth);
  const lotArea = featureArea(feature);

  if (!p) {
    ui.notice.textContent = "La categoría seleccionada no cuenta con una tabla de parámetros edificatorios en el documento fuente. Se mantiene visible como capa territorial.";
    ui.notice.classList.remove("is-hidden");
    fillMetrics({ lotArea });
    clearMapModel();
    return;
  }

  const epapEnabled = ui.epapToggle.checked;
  const epapPercent = epapEnabled ? Number(ui.epap.value) : 0;
  const epapFactor = Number(ui.epapFactor.value) || 1;
  const cea = (epapPercent / 100) * epapFactor;
  const authorizedCe = Math.min(p.ceMax, p.ceBase + cea);
  const bonusProgress = p.ceMax > p.ceBase ? (authorizedCe - p.ceBase) / (p.ceMax - p.ceBase) : 0;
  const footprintRatio = Math.max(0.05, 1 - p.freeArea / 100);
  const baseHeight = p.heightFactor * (roadWidth + retreat);
  const heightMultiplier = epapEnabled ? clamp(authorizedCe / p.ceBase, 1, 1.4) : 1;
  const maxHeight = baseHeight * heightMultiplier;
  const floorsByCe = Math.max(1, Math.floor(authorizedCe / footprintRatio + 1e-7));
  const floorsByHeight = Math.max(1, Math.floor(maxHeight / floorHeight + 1e-7));
  const floors = Math.max(1, Math.min(floorsByCe, floorsByHeight));
  const buildableArea = lotArea * authorizedCe;
  const baseBuildableArea = lotArea * p.ceBase;
  const maxBuildableArea = lotArea * p.ceMax;
  const density = state.currentUse === "comercial"
    ? null
    : Math.round(p.densityBase + (p.densityMax - p.densityBase) * clamp(bonusProgress, 0, 1));

  ui.notice.classList.toggle("is-hidden", !p.definition.sustainable);
  if (p.definition.sustainable) {
    ui.notice.textContent = "Zona sostenible: el acceso a mayor intensidad requiere unidad de gestión, reajuste mínimo del 70% del área privada de la submanzana y cumplimiento de las condiciones concurrentes.";
  }

  fillMetrics({
    lotArea,
    freeArea: p.freeArea,
    baseCe: p.ceBase,
    authorizedCe,
    baseBuildableArea,
    buildableArea,
    maxBuildableArea,
    height: maxHeight,
    floors,
    density,
    roadBand: p.bandLabel,
    lotMin: p.lotMin,
    epapLotMin: epapEnabled ? p.epapLotMin : null,
    epapPercent,
  });

  state.lastModel = { lotArea, freeArea: p.freeArea, floors, floorHeight, authorizedCe, epapEnabled, epapPercent, height: maxHeight, buildableArea };
  const models = state.selectedFeatures.map((selected) => {
    const selectedParams = parametersFor(selected.properties.zona, state.currentUse, roadWidth);
    if (!selectedParams) return null;
    const selectedAuthorizedCe = Math.min(selectedParams.ceMax, selectedParams.ceBase + cea);
    const selectedHeight = selectedParams.heightFactor * (roadWidth + retreat) * (epapEnabled ? clamp(selectedAuthorizedCe / selectedParams.ceBase, 1, 1.4) : 1);
    const selectedFootprintRatio = Math.max(0.05, 1 - selectedParams.freeArea / 100);
    const selectedFloors = Math.max(1, Math.min(
      Math.floor(selectedAuthorizedCe / selectedFootprintRatio + 1e-7),
      Math.floor(selectedHeight / floorHeight + 1e-7),
    ));
    return {
      feature: selected,
      values: {
        lotArea: featureArea(selected), freeArea: selectedParams.freeArea, floors: selectedFloors,
        floorHeight, authorizedCe: selectedAuthorizedCe, epapEnabled, epapPercent,
        height: selectedHeight, buildableArea: featureArea(selected) * selectedAuthorizedCe,
      },
    };
  }).filter(Boolean);
  updateMapModel(models);
}

function fillMetrics(values) {
  const dash = "—";
  ui.lotArea.textContent = values.lotArea ? nf0.format(values.lotArea) : dash;
  ui.freeArea.textContent = values.freeArea ?? dash;
  ui.baseCe.textContent = values.baseCe != null ? nf1.format(values.baseCe) : dash;
  ui.authorizedCe.textContent = values.authorizedCe != null ? nf1.format(values.authorizedCe) : dash;
  ui.buildableArea.textContent = values.buildableArea != null ? nf0.format(values.buildableArea) : dash;
  ui.height.textContent = values.height != null ? nf1.format(values.height) : dash;
  ui.floors.textContent = values.floors ?? dash;
  ui.density.textContent = values.density != null ? nf0.format(values.density) : dash;
  ui.roadBand.textContent = values.roadBand || "Sin tabla";

  const freeArea = Number(values.freeArea);
  const epap = Number(values.epapPercent) || 0;
  const occupation = Number.isFinite(freeArea) ? Math.max(0, 100 - freeArea) : 0;
  setDonut(ui.occupationDonut, ui.occupationLabel, occupation, "#08794d");
  setDonut(ui.freeAreaDonut, ui.freeAreaLabel, Number.isFinite(freeArea) ? freeArea : 0, "#75b993");
  setDonut(ui.epapDonut, ui.epapLabel, epap, "#dc9d3b");
  ui.modelFloors.textContent = values.floors ?? dash;
  ui.modelHeight.textContent = values.height != null ? nf1.format(values.height) : dash;
  ui.modelArea.textContent = values.buildableArea != null ? nf0.format(values.buildableArea) : dash;

  const baseBuildable = Number(values.baseBuildableArea) || 0;
  const authorizedBuildable = Number(values.buildableArea) || 0;
  const maximumBuildable = Math.max(Number(values.maxBuildableArea) || 0, authorizedBuildable, baseBuildable, 1);
  ui.baseBuildableLabel.textContent = baseBuildable ? `${nf0.format(baseBuildable)} m²` : "— m²";
  ui.authorizedBuildableLabel.textContent = authorizedBuildable ? `${nf0.format(authorizedBuildable)} m²` : "— m²";
  ui.baseBuildableBar.style.width = `${clamp((baseBuildable / maximumBuildable) * 100, 0, 100)}%`;
  ui.authorizedBuildableBar.style.width = `${clamp((authorizedBuildable / maximumBuildable) * 100, 0, 100)}%`;
  const additionalArea = Math.max(0, authorizedBuildable - baseBuildable);
  const additionalPercent = baseBuildable ? (additionalArea / baseBuildable) * 100 : 0;
  ui.bonusSummary.textContent = additionalArea > 0
    ? `EPAP incorpora ${nf0.format(additionalArea)} m² de edificabilidad adicional (${nf1.format(additionalPercent)}% sobre el escenario base).`
    : "El escenario actual mantiene la edificabilidad base.";

  ui.lotCompliance.className = "compliance";
  if (values.lotMin != null) {
    const required = values.epapLotMin || values.lotMin;
    const ok = values.lotArea >= required;
    ui.lotCompliance.textContent = ok ? "Cumple área mínima" : "Área menor a la mínima";
    ui.lotCompliance.classList.add(ok ? "ok" : "warn");
    ui.lotMinimum.textContent = `${values.epapLotMin ? "Mínimo para EPAP" : "Lote normativo"}: ${nf0.format(required)} m²`;
  } else {
    ui.lotCompliance.textContent = dash;
    ui.lotMinimum.textContent = "Lote normativo: —";
  }
}

function setDonut(element, label, value, color) {
  const percent = clamp(Number(value) || 0, 0, 100);
  element.style.setProperty("--value", `${percent * 3.6}deg`);
  element.style.setProperty("--donut-color", color);
  label.textContent = `${nf0.format(percent)}%`;
}

function featureArea(feature) {
  const sourceArea = Number(feature.properties.area_m2);
  if (sourceArea > 0) return sourceArea;
  const polygons = polygonsFromGeometry(feature.geometry);
  return polygons.reduce((total, polygon) => total + Math.abs(planarRingArea(polygon[0])), 0);
}

function polygonsFromGeometry(geometry) {
  if (geometry.type === "Polygon") return [geometry.coordinates];
  if (geometry.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function localRing(ring) {
  const clean = ring.slice(0, -1);
  const centerLon = clean.reduce((sum, p) => sum + p[0], 0) / clean.length;
  const centerLat = clean.reduce((sum, p) => sum + p[1], 0) / clean.length;
  const cosLat = Math.cos((centerLat * Math.PI) / 180);
  return clean.map(([lon, lat]) => [
    (lon - centerLon) * 111320 * cosLat,
    (lat - centerLat) * 110540,
  ]);
}

function planarRingArea(ring) {
  const points = localRing(ring);
  let area = 0;
  points.forEach((point, index) => {
    const next = points[(index + 1) % points.length];
    area += point[0] * next[1] - next[0] * point[1];
  });
  return area / 2;
}

function buildLegend() {
  const counts = state.features.reduce((acc, feature) => {
    const zone = feature.properties.zona;
    acc[zone] = (acc[zone] || 0) + 1;
    return acc;
  }, {});
  const ordered = Object.entries(counts).sort((a, b) => {
    const aKnown = ZONE_PARAMETERS[a[0]] ? 0 : 1;
    const bKnown = ZONE_PARAMETERS[b[0]] ? 0 : 1;
    return aKnown - bKnown || b[1] - a[1];
  });
  const proposedCounts = (state.proposedZoning?.features || []).reduce((acc, feature) => {
    const zone = feature.properties.simb_012 || "SC";
    acc[zone] = (acc[zone] || 0) + 1;
    return acc;
  }, {});
  const proposedOrdered = Object.entries(proposedCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "es"));
  const lotsLegend = ordered.map(([zone, count]) => `
    <div class="legend-item">
      <span><i style="background:${zoneColor(zone)}"></i>${escapeHtml(zone)}</span>
      <b>${nf0.format(count)}</b>
    </div>`).join("");
  const proposedLegend = proposedOrdered.map(([zone, count]) => `
    <div class="legend-item">
      <span><i style="background:${zoneColor(zone)}"></i>${escapeHtml(zone)}</span>
      <b>${nf0.format(count)}</b>
    </div>`).join("");
  ui.legend.innerHTML = `
    <div class="legend-group-title">Lotes actuales</div>
    ${lotsLegend}
    ${proposedLegend ? `<div class="legend-group-title">Propuesta de zonificación</div>${proposedLegend}` : ""}
  `;
}

function renderSearch() {
  const query = ui.search.value.trim().toLocaleLowerCase("es");
  if (!query) {
    ui.results.innerHTML = "";
    ui.results.classList.remove("has-results");
    return;
  }
  const matches = state.features.filter((feature) => {
    const p = feature.properties;
    return String(p.id).includes(query)
      || String(p.cod_lote || "").toLocaleLowerCase("es").includes(query)
      || String(p.cuc || "").toLocaleLowerCase("es").includes(query)
      || String(p.via || "").toLocaleLowerCase("es").includes(query)
      || p.zona.toLocaleLowerCase("es").includes(query)
      || p.zona_nombre.toLocaleLowerCase("es").includes(query);
  }).slice(0, 10);
  ui.results.innerHTML = matches.length ? matches.map((feature) => {
    const p = feature.properties;
    return `<button class="search-result" type="button" data-feature-id="${p.id}" role="option">
      <i style="background:${zoneColor(p.zona)}"></i>
      <span><strong>Lote ${escapeHtml(p.cod_lote || p.id)} · ${escapeHtml(p.zona)}</strong><span>${nf0.format(featureArea(feature))} m²${p.via ? ` · ${escapeHtml(p.via)}` : ""}</span></span>
      <b>${p.cuc ? `CUC ${escapeHtml(p.cuc)}` : escapeHtml(titleCase(p.zona_nombre))}</b>
    </button>`;
  }).join("") : `<div class="search-result"><span></span><span><strong>Sin resultados</strong><span>Pruebe con un código de lote, CUC, vía o zona.</span></span></div>`;
  ui.results.classList.add("has-results");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function roadLinkMarkup(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return "";
    return `<br><a href="${escapeHtml(url.href)}" target="_blank" rel="noopener noreferrer">Abrir ficha vial</a>`;
  } catch {
    return "";
  }
}

function titleCase(value) {
  return String(value).toLocaleLowerCase("es").replace(/(^|[\s/])\S/g, (char) => char.toLocaleUpperCase("es"));
}

function numberValue(input, fallback) {
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

// ─────────────────────────────────────────────────────────────────────────────
// Cabida georreferenciada: la forma del lote se extruye sobre el propio mapa.
// ─────────────────────────────────────────────────────────────────────────────

function allGeometryPoints(geometry) {
  return polygonsFromGeometry(geometry).flatMap((polygon) => polygon.flatMap((ring) => ring));
}

function geometryCenter(geometry) {
  const points = allGeometryPoints(geometry);
  return points.reduce((acc, point) => [acc[0] + point[0] / points.length, acc[1] + point[1] / points.length], [0, 0]);
}

function scaleGeometry(geometry, scale, anchor = geometryCenter(geometry)) {
  const scaleRing = (ring) => ring.map(([x, y]) => [anchor[0] + (x - anchor[0]) * scale, anchor[1] + (y - anchor[1]) * scale]);
  return {
    type: geometry.type,
    coordinates: geometry.type === "Polygon"
      ? geometry.coordinates.map(scaleRing)
      : geometry.coordinates.map((polygon) => polygon.map(scaleRing)),
  };
}

function updateMapModel(models) {
  if (!state.ready || !map.getSource("cabida-model")) return;
  const floors = [];
  const epapFeatures = [];
  for (const { feature, values } of models) {
    const footprintRatio = Math.max(0.05, 1 - values.freeArea / 100);
    const footprint = scaleGeometry(feature.geometry, Math.sqrt(footprintRatio));
    for (let index = 0; index < values.floors; index += 1) {
      const gap = index ? 0.08 : 0;
      floors.push({
        type: "Feature",
        properties: {
          base: index * values.floorHeight + gap,
          height: (index + 1) * values.floorHeight,
          color: index % 2 ? (values.epapEnabled ? "#00a968" : "#1e805a") : (values.epapEnabled ? "#008f58" : "#176c4c"),
        },
        geometry: footprint,
      });
    }
    const points = allGeometryPoints(feature.geometry);
    const anchor = points.reduce((best, point) => (point[0] + point[1] < best[0] + best[1] ? point : best), points[0]);
    if (values.epapEnabled && values.epapPercent > 0) {
      epapFeatures.push({ type: "Feature", properties: {}, geometry: scaleGeometry(feature.geometry, Math.sqrt(clamp(values.epapPercent / 100, 0.01, 0.5)), anchor) });
    }
  }
  map.getSource("cabida-model").setData({ type: "FeatureCollection", features: floors });
  map.getSource("epap-model").setData({ type: "FeatureCollection", features: epapFeatures });
}

function clearMapModel() {
  if (!state.ready) return;
  map.getSource("cabida-model")?.setData(emptyCollection());
  map.getSource("epap-model")?.setData(emptyCollection());
}

function geometryBounds(geometry) {
  const points = allGeometryPoints(geometry);
  return points.reduce((bounds, [x, y]) => [
    Math.min(bounds[0], x), Math.min(bounds[1], y), Math.max(bounds[2], x), Math.max(bounds[3], y),
  ], [Infinity, Infinity, -Infinity, -Infinity]);
}

function focusFeature(feature, animate = true) {
  const bounds = geometryBounds(feature.geometry);
  map.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], {
    padding: { top: 120, bottom: 150, left: 120, right: 120 },
    maxZoom: 18.3,
    pitch: 60,
    bearing: -24,
    duration: animate ? 900 : 0,
  });
}

function focusFeatures(features, animate = true) {
  if (features.length === 1) return focusFeature(features[0], animate);
  const bounds = features.reduce((result, feature) => {
    const next = geometryBounds(feature.geometry);
    return [Math.min(result[0], next[0]), Math.min(result[1], next[1]), Math.max(result[2], next[2]), Math.max(result[3], next[3])];
  }, [Infinity, Infinity, -Infinity, -Infinity]);
  map.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], {
    padding: { top: 120, bottom: 150, left: 120, right: 120 }, maxZoom: 18.3,
    pitch: 60, bearing: -24, duration: animate ? 900 : 0,
  });
}

function fitDistrict() {
  if (!state.features.length) return;
  const district = state.features.reduce((result, feature) => {
    const next = geometryBounds(feature.geometry);
    return [Math.min(result[0], next[0]), Math.min(result[1], next[1]), Math.max(result[2], next[2]), Math.max(result[3], next[3])];
  }, [Infinity, Infinity, -Infinity, -Infinity]);
  map.fitBounds([[district[0], district[1]], [district[2], district[3]]], { padding: 35, pitch: 38, bearing: -18, duration: 700 });
}

// ─────────────────────────────────────────────────────────────────────────────
// UI events
// ─────────────────────────────────────────────────────────────────────────────

function hideWelcome() { ui.welcome.classList.add("is-hidden"); }
ui.enter.addEventListener("click", hideWelcome);
ui.closeWelcome.addEventListener("click", hideWelcome);
ui.help.addEventListener("click", () => ui.welcome.classList.remove("is-hidden"));

ui.layersButton.addEventListener("click", () => ui.layersPanel.classList.toggle("is-hidden"));
ui.closeLayers.addEventListener("click", () => ui.layersPanel.classList.add("is-hidden"));
ui.togglePanel.addEventListener("click", () => ui.detailPanel.classList.add("is-open"));
ui.closeDetail.addEventListener("click", () => ui.detailPanel.classList.remove("is-open"));
ui.home.addEventListener("click", fitDistrict);
ui.tilt3d.addEventListener("click", () => {
  if (state.selectedFeatures.length) focusFeatures(state.selectedFeatures, true);
  else map.easeTo({ pitch: 60, bearing: -24, duration: 650 });
});
ui.flat2d.addEventListener("click", () => map.easeTo({ pitch: 0, bearing: 0, duration: 650 }));

ui.opacity.addEventListener("input", () => {
  state.fillOpacity = Number(ui.opacity.value) / 100;
  ui.opacityOutput.textContent = `${ui.opacity.value}%`;
  if (state.ready) map.setPaintProperty("lots-fill", "fill-opacity", state.fillOpacity);
});

ui.satelliteOpacity.addEventListener("input", () => {
  state.satelliteOpacity = Number(ui.satelliteOpacity.value) / 100;
  ui.satelliteOpacityOutput.textContent = `${ui.satelliteOpacity.value}%`;
  if (state.ready) map.setPaintProperty("satellite", "raster-opacity", state.satelliteOpacity);
});

function applyRoadLayerToggles() {
  if (!state.ready) return;
  const sectionVisibility = ui.roadsToggle.checked ? "visible" : "none";
  const redVialVisibility = ui.redVialToggle.checked ? "visible" : "none";
  map.setLayoutProperty("roads", "visibility", sectionVisibility);
  map.setLayoutProperty("roads-casing", "visibility", sectionVisibility);
  map.setLayoutProperty("road-selected", "visibility", sectionVisibility);
  map.setLayoutProperty("red-vial", "visibility", redVialVisibility);
  map.setLayoutProperty("red-vial-casing", "visibility", redVialVisibility);
}

function syncAllRoadsToggle() {
  const sectionsVisible = ui.roadsToggle.checked;
  const networkVisible = ui.redVialToggle.checked;
  ui.allRoadsToggle.checked = sectionsVisible && networkVisible;
  ui.allRoadsToggle.indeterminate = sectionsVisible !== networkVisible;
}

ui.allRoadsToggle.addEventListener("change", () => {
  ui.roadsToggle.checked = ui.allRoadsToggle.checked;
  ui.redVialToggle.checked = ui.allRoadsToggle.checked;
  ui.allRoadsToggle.indeterminate = false;
  applyRoadLayerToggles();
});

ui.roadsToggle.addEventListener("change", () => {
  applyRoadLayerToggles();
  syncAllRoadsToggle();
});

ui.redVialToggle.addEventListener("change", () => {
  applyRoadLayerToggles();
  syncAllRoadsToggle();
});

ui.districtToggle.addEventListener("change", () => {
  if (!state.ready) return;
  const visibility = ui.districtToggle.checked ? "visible" : "none";
  map.setLayoutProperty("district-boundary", "visibility", visibility);
  map.setLayoutProperty("district-boundary-casing", "visibility", visibility);
});

ui.proposedZoningToggle.addEventListener("change", () => {
  if (!state.ready || !map.getLayer("proposed-zoning-fill")) return;
  const visibility = ui.proposedZoningToggle.checked ? "visible" : "none";
  map.setLayoutProperty("proposed-zoning-fill", "visibility", visibility);
  map.setLayoutProperty("proposed-zoning-line", "visibility", visibility);
});

ui.search.addEventListener("input", renderSearch);
ui.clearSearch.addEventListener("click", () => {
  ui.search.value = "";
  renderSearch();
  ui.search.focus();
});
ui.results.addEventListener("click", (event) => {
  const button = event.target.closest("[data-feature-id]");
  if (!button) return;
  const id = button.dataset.featureId;
  const feature = state.featureById.get(id);
  if (feature) selectFeature(feature, true);
  ui.results.classList.remove("has-results");
});

ui.use.addEventListener("change", () => {
  state.currentUse = ui.use.value;
  updateCalculation();
});
ui.roadSelect.addEventListener("change", () => applyRoadCandidate(ui.roadSelect.value));
[ui.roadWidth, ui.retreat, ui.floorHeight].forEach((input) => input.addEventListener("input", updateCalculation));
ui.epapToggle.addEventListener("change", () => {
  ui.epapControls.classList.toggle("is-disabled", !ui.epapToggle.checked);
  updateCalculation();
});
ui.epap.addEventListener("input", () => {
  ui.epapOutput.textContent = `${ui.epap.value}%`;
  updateCalculation();
});
function updateEpapRules() {
  const type = ui.epapType.value;
  if (type === "portal") {
    ui.epapCondition.value = "additional";
    ui.epapCondition.disabled = true;
    ui.epapFactor.value = "1.15";
    ui.epapRuleNote.textContent = "Portal exterior o interior: factor 1.15 sobre el área cedida total.";
  } else if (type === "terraza") {
    ui.epapCondition.value = "normative";
    ui.epapCondition.disabled = true;
    ui.epapFactor.value = "1";
    ui.epapRuleNote.textContent = "Terraza dentro del retiro y del área libre normativa: factor 1.00.";
  } else {
    ui.epapCondition.disabled = false;
    const additional = ui.epapCondition.value === "additional";
    ui.epapFactor.value = additional ? "1.15" : "1";
    ui.epapRuleNote.textContent = additional
      ? "EPAP excedente al área libre mínima: factor 1.15, calculado solo sobre el excedente."
      : "EPAP computado dentro del área libre mínima: factor 1.00.";
  }
  updateCalculation();
}

ui.epapType.addEventListener("change", updateEpapRules);
ui.epapCondition.addEventListener("change", updateEpapRules);

function printTechnicalSheet() {
  if (!state.selectedFeature) return;
  ui.welcome.classList.add("is-hidden");
  const previousTitle = document.title;
  document.title = `Ficha_${state.selectedFeature.properties.zona}_ID_${state.selectedFeature.properties.id}_San_Borja`;
  window.print();
  window.setTimeout(() => { document.title = previousTitle; }, 600);
}

ui.print.disabled = true;
ui.printDetail.disabled = true;
ui.print.addEventListener("click", printTechnicalSheet);
ui.printDetail.addEventListener("click", printTechnicalSheet);

window.addEventListener("resize", () => map.resize());

loadData();
updateEpapRules();
