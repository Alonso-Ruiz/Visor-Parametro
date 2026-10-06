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
  pushPull: $("pushPullButton"),
  undoModelEdit: $("undoModelEditButton"),
  redoModelEdit: $("redoModelEditButton"),
  modelInteractionHint: $("modelInteractionHint"),
  modelDimension: $("modelDimension"),
  modelEditor: $("modelEditor"),
  modelEditorBackdrop: $("modelEditorBackdrop"),
  modelEditorPreview: document.querySelector(".model-editor-preview"),
  mapCanvas: $("map"),
  closeModelEditor: $("closeModelEditor"),
  modelEditorLot: $("modelEditorLot"),
  modelLotArea: $("modelLotArea"),
  modelLotZone: $("modelLotZone"),
  modelParcelFaces: $("modelParcelFaces"),
  modelParcelFaceControls: $("modelParcelFaceControls"),
  modelParcelActiveFront: $("modelParcelActiveFront"),
  modelParcelRoadWidth: $("modelParcelRoadWidth"),
  modelParcelRetreat: $("modelParcelRetreat"),
  modelShapeOptions: $("modelShapeOptions"),
  modelShapeOrientation: $("modelShapeOrientation"),
  modelShapeParams: $("modelShapeParams"),
  modelShapeZone: $("modelShapeZone"),
  modelAddShapeZone: $("modelAddShapeZone"),
  modelRemoveShapeZone: $("modelRemoveShapeZone"),
  modelShapeStart: $("modelShapeStart"),
  modelShapeEnd: $("modelShapeEnd"),
  modelFloorUses: $("modelFloorUses"),
  modelUseAreas: $("modelUseAreas"),
  modelProgramUse: $("modelProgramUse"),
  modelProgramFreeArea: $("modelProgramFreeArea"),
  modelProgramRoofedArea: $("modelProgramRoofedArea"),
  modelProgramCe: $("modelProgramCe"),
  modelFaceCount: $("modelFaceCount"),
  modelFaceList: $("modelFaceList"),
  modelFaceControls: $("modelFaceControls"),
  modelSelectedFace: $("modelSelectedFace"),
  modelSelectedFaceLength: $("modelSelectedFaceLength"),
  modelFaceOffset: $("modelFaceOffset"),
  modelFaceOffsetNumber: $("modelFaceOffsetNumber"),
  modelFaceLimitHint: $("modelFaceLimitHint"),
  modelEditorCurrentHeight: $("modelEditorCurrentHeight"),
  modelHeightLimit: $("modelHeightLimit"),
  modelFloorDown: $("modelFloorDown"),
  modelFloorUp: $("modelFloorUp"),
  modelFloorCount: $("modelFloorCount"),
  modelFootprintArea: $("modelFootprintArea"),
  modelRoofedArea: $("modelRoofedArea"),
  modelFreeArea: $("modelFreeArea"),
  modelRulesSummary: $("modelRulesSummary"),
  restoreLotModel: $("restoreLotModelButton"),
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
  fillOpacity: 1,
  satelliteOpacity: 0.5,
  currentUse: "multifamiliar",
  lastModel: null,
  pushPullMode: false,
  modelEditorOpen: false,
  modelPreviewActive: false,
  allLots3dActive: false,
  modelPreviewLayerVisibility: null,
  modelEdits: loadSavedModelEdits(),
  wallEdits: loadSavedWallEdits(),
  modelShapes: loadSavedModelShapes(),
  shapeZones: loadSavedModelMap("sanborja-shape-zones-v1"),
  floorUses: loadSavedModelMap("sanborja-floor-uses-v1"),
  parcelFaces: loadSavedModelMap("sanborja-parcel-faces-v1"),
  selectedParcelFace: null,
  selectedShapeZone: 0,
  modelEditorTab: "lot",
  modelEditUndo: [],
  modelEditRedo: [],
  modelInputs: [],
  activeModelDrag: null,
  modelDimension: null,
  selectedWall: null,
  pendingWallControl: null,
  pendingHeightControl: null,
  suppressNextMapClick: false,
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
        maxzoom: 19,
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
  map.addSource("lots-3d-inset", { type: "geojson", data: buildInsetLotCollection(state.collection) });
  map.addLayer({ id: "lots-fill", type: "fill", source: "lots", layout: { visibility: state.allLots3dActive ? "none" : "visible" }, paint: { "fill-color": zoneColorExpression(), "fill-opacity": 1 } });
  map.addLayer({
    id: "lots-3d", type: "fill-extrusion", source: "lots-3d-inset",
    layout: { visibility: state.allLots3dActive ? "visible" : "none" },
    paint: {
      "fill-extrusion-color": zoneColorExpression(),
      "fill-extrusion-base": 0,
      "fill-extrusion-height": ["*", ["match", ["get", "zona"], "ZDB", 0.5, "ZDM", 1, "ZDA", 1.5, "ZDB-S", 0.5, "ZDM-S", 1, "ZDA-S", 1.5, 0.5], ["+", 20, ["coalesce", ["get", "retiro_frontal"], 0]]],
      "fill-extrusion-opacity": 0.9,
      "fill-extrusion-vertical-gradient": true,
    },
  });
  map.addLayer({ id: "lots-line", type: "line", source: "lots", paint: { "line-color": "rgba(36,43,42,.92)", "line-width": ["interpolate", ["linear"], ["zoom"], 13, 0.55, 17, 1.25] } });
  map.addLayer({
    id: "lots-3d-outline", type: "line", source: "lots-3d-inset",
    layout: { visibility: state.allLots3dActive ? "visible" : "none" },
    paint: { "line-color": "#1d302a", "line-width": ["interpolate", ["linear"], ["zoom"], 13, 1.2, 16, 2.1, 19, 3], "line-opacity": 1 },
  });
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
  map.addSource("pushpull-face", { type: "geojson", data: emptyCollection() });
  map.addLayer({ id: "pushpull-face", type: "fill-extrusion", source: "pushpull-face", paint: { "fill-extrusion-color": ["get", "color"], "fill-extrusion-base": ["get", "base"], "fill-extrusion-height": ["get", "height"], "fill-extrusion-opacity": 0.82 } });
  if (typeof map.setLight === "function") map.setLight({ anchor: "map", color: "#ffffff", intensity: 0.58, position: [1.2, 205, 38] });

  const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 12, className: "lot-popup" });
  map.getCanvas().addEventListener("mouseleave", () => popup.remove());
  map.on("mousemove", (event) => {
    if (state.modelPreviewActive) { popup.remove(); return; }
    const lotFeature = map.queryRenderedFeatures(event.point, { layers: [state.allLots3dActive ? "lots-3d" : "lots-fill"] })[0];
    map.getCanvas().style.cursor = state.activeModelDrag ? (state.activeModelDrag.type === "wall" ? "move" : "ns-resize") : (state.pushPullMode ? "crosshair" : (lotFeature ? "pointer" : ""));
    if (!lotFeature) {
      popup.remove();
      return;
    }
    const lot = state.featureById.get(String(lotFeature.properties.id));
    if (lot) popup.setLngLat(event.lngLat).setHTML(`<b>Lote ${escapeHtml(lot.properties.cod_lote || lot.properties.id)}</b><br>${escapeHtml(lot.properties.zona)} · ${nf0.format(featureArea(lot))} m²`).addTo(map);
  });
  map.on("click", (event) => {
    popup.remove();
    if (state.suppressNextMapClick) { state.suppressNextMapClick = false; return; }
    const lotFeature = map.queryRenderedFeatures(event.point, { layers: [state.allLots3dActive ? "lots-3d" : "lots-fill"] })[0];
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

function buildInsetLotCollection(collection, insetMeters = 0.25) {
  return {
    type: "FeatureCollection",
    features: (collection?.features || []).map((feature) => ({
      ...feature,
      geometry: insetLotGeometry(feature.geometry, insetMeters),
    })),
  };
}

function insetLotGeometry(geometry, insetMeters) {
  if (!geometry) return geometry;
  if (geometry.type === "Polygon") {
    const coordinates = geometry.coordinates || [];
    const outer = insetRing(coordinates[0], insetMeters);
    return outer ? { ...geometry, coordinates: [outer, ...coordinates.slice(1)] } : geometry;
  }
  if (geometry.type === "MultiPolygon") {
    const polygons = (geometry.coordinates || []).map((polygon) => {
      const outer = insetRing(polygon[0], insetMeters);
      return outer ? [outer, ...polygon.slice(1)] : polygon;
    });
    return { ...geometry, coordinates: polygons };
  }
  return geometry;
}

function insetRing(ring, insetMeters) {
  if (!Array.isArray(ring) || ring.length < 4) return null;
  const isClosed = ring[0][0] === ring.at(-1)[0] && ring[0][1] === ring.at(-1)[1];
  const points = (isClosed ? ring.slice(0, -1) : ring).map((point) => [Number(point[0]), Number(point[1])]);
  if (points.length < 3 || points.some((point) => !Number.isFinite(point[0]) || !Number.isFinite(point[1]))) return null;
  const origin = points[0];
  const cosLat = Math.cos((origin[1] * Math.PI) / 180);
  const local = points.map(([lon, lat]) => [(lon - origin[0]) * 111320 * cosLat, (lat - origin[1]) * 110540]);
  const area = local.reduce((sum, point, index) => {
    const next = local[(index + 1) % local.length];
    return sum + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2;
  if (Math.abs(area) < insetMeters * insetMeters * 4) return null;
  const orientation = Math.sign(area);
  const shiftedEdges = local.map((point, index) => {
    const next = local[(index + 1) % local.length];
    const dx = next[0] - point[0];
    const dy = next[1] - point[1];
    const length = Math.hypot(dx, dy);
    if (length < 0.01) return null;
    const normal = [-dy / length * orientation, dx / length * orientation];
    return { start: [point[0] + normal[0] * insetMeters, point[1] + normal[1] * insetMeters], direction: [dx, dy], normal };
  });
  if (shiftedEdges.some((edge) => !edge)) return null;
  const insetPoints = local.map((point, index) => {
    const previous = shiftedEdges[(index - 1 + shiftedEdges.length) % shiftedEdges.length];
    const next = shiftedEdges[index];
    const cross = previous.direction[0] * next.direction[1] - previous.direction[1] * next.direction[0];
    let candidate;
    if (Math.abs(cross) < 1e-7) {
      candidate = [point[0] + (previous.normal[0] + next.normal[0]) * insetMeters / 2, point[1] + (previous.normal[1] + next.normal[1]) * insetMeters / 2];
    } else {
      const dx = next.start[0] - previous.start[0];
      const dy = next.start[1] - previous.start[1];
      const t = (dx * next.direction[1] - dy * next.direction[0]) / cross;
      candidate = [previous.start[0] + previous.direction[0] * t, previous.start[1] + previous.direction[1] * t];
    }
    const mx = candidate[0] - point[0];
    const my = candidate[1] - point[1];
    const miter = Math.hypot(mx, my);
    if (!Number.isFinite(miter) || miter > insetMeters * 4) return null;
    return candidate;
  });
  if (insetPoints.some((point) => !point)) return null;
  const insetArea = Math.abs(insetPoints.reduce((sum, point, index) => {
    const next = insetPoints[(index + 1) % insetPoints.length];
    return sum + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2);
  if (insetArea < Math.max(0.1, Math.abs(area) * 0.15) || insetArea >= Math.abs(area)) return null;
  const output = insetPoints.map(([x, y]) => [origin[0] + x / (111320 * cosLat), origin[1] + y / 110540]);
  output.push([...output[0]]);
  return output;
}

function loadSavedModelEdits() {
  try {
    const entries = JSON.parse(localStorage.getItem("sanborja-model-edits-v1") || "[]");
    return new Map(Array.isArray(entries) ? entries.filter((entry) => Array.isArray(entry) && entry.length === 2 && Number.isFinite(Number(entry[1]))) : []);
  } catch { return new Map(); }
}

function loadSavedWallEdits() {
  try {
    const entries = JSON.parse(localStorage.getItem("sanborja-wall-edits-v1") || "[]");
    return new Map(Array.isArray(entries) ? entries.filter((entry) => Array.isArray(entry) && entry.length === 2 && entry[1] && typeof entry[1] === "object") : []);
  } catch { return new Map(); }
}

function loadSavedModelShapes() {
  try {
    const entries = JSON.parse(localStorage.getItem("sanborja-model-shapes-v1") || "[]");
    return new Map(Array.isArray(entries) ? entries.filter((entry) => Array.isArray(entry) && entry.length === 2 && entry[1] && typeof entry[1] === "object") : []);
  } catch { return new Map(); }
}

function loadSavedModelMap(key) {
  try {
    const entries = JSON.parse(localStorage.getItem(key) || "[]");
    return new Map(Array.isArray(entries) ? entries.filter((entry) => Array.isArray(entry) && entry.length === 2) : []);
  } catch { return new Map(); }
}

function persistModelEdits() {
  try { localStorage.setItem("sanborja-model-edits-v1", JSON.stringify([...state.modelEdits])); }
  catch (error) { console.warn("No se pudo guardar el modelo editado en este navegador.", error); }
  try { localStorage.setItem("sanborja-wall-edits-v1", JSON.stringify([...state.wallEdits])); }
  catch (error) { console.warn("No se pudieron guardar las paredes editadas en este navegador.", error); }
  try { localStorage.setItem("sanborja-model-shapes-v1", JSON.stringify([...state.modelShapes])); }
  catch (error) { console.warn("No se pudieron guardar las formas del modelo en este navegador.", error); }
  try { localStorage.setItem("sanborja-shape-zones-v1", JSON.stringify([...state.shapeZones])); }
  catch (error) { console.warn("No se pudieron guardar las zonas de forma.", error); }
  try { localStorage.setItem("sanborja-floor-uses-v1", JSON.stringify([...state.floorUses])); }
  catch (error) { console.warn("No se pudieron guardar los usos por piso.", error); }
  try { localStorage.setItem("sanborja-parcel-faces-v1", JSON.stringify([...state.parcelFaces])); }
  catch (error) { console.warn("No se pudieron guardar los frentes del lote.", error); }
}

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
    state.selectedWall = null;
    state.modelEditorOpen = false;
    renderModelEditor();
    if (state.ready) {
      map.setFilter("lot-selected-fill", ["in", ["get", "id"], ["literal", []]]);
      map.setFilter("lot-selected-line", ["in", ["get", "id"], ["literal", []]]);
    }
    ui.mapModelHud.classList.add("is-hidden");
    $("modifyPolygonButton").classList.add("is-hidden");
    setDetailPanel(false);
    ui.detailEmpty.classList.remove("is-hidden");
    ui.detailContent.classList.add("is-hidden");
    clearMapModel();
    resetRoadHighlight();
    return;
  }

  state.selectedFeature = state.selectedFeatures.includes(feature) ? feature : state.selectedFeatures.at(-1);
  state.selectedShapeZone = 0;
  state.selectedParcelFace = null;
  state.modelEditorOpen = false;
  state.pushPullMode = false;
  feature = state.selectedFeature;
  state.modelDimension = null;
  state.selectedWall = null;
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
  ui.pushPull.classList.remove("is-active");
  ui.pushPull.setAttribute("aria-pressed", "false");
  document.querySelector(".map-shell").classList.remove("push-pull-active");
  ui.detailEmpty.classList.add("is-hidden");
  ui.detailContent.classList.remove("is-hidden");
  setDetailPanel(true);
  const modifyButton = $("modifyPolygonButton");
  if (modifyButton) {
    modifyButton.disabled = state.selectedFeatures.length !== 1;
    modifyButton.classList.toggle("is-hidden", state.selectedFeatures.length !== 1);
  }
  ui.print.disabled = false;
  ui.printDetail.disabled = false;
  configureUses(props.zona);
  detectRoads(feature);
  const savedFront = Object.values(state.parcelFaces.get(id) || {}).find((entry) => entry.active);
  if (savedFront) {
    ui.roadSelect.value = "manual";
    ui.roadWidth.readOnly = false;
    ui.roadWidth.value = savedFront.width;
    ui.retreat.value = savedFront.retreat;
    ui.roadSourceMeta.textContent = "Frente configurado por cara del predio en PREDIAL · Lote.";
  }
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
  if (ui.modelProgramUse) {
    ui.modelProgramUse.innerHTML = ui.use.innerHTML;
    ui.modelProgramUse.value = state.currentUse;
    ui.modelProgramUse.disabled = !definition;
  }
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
        lotId: String(selected.properties.id),
        lotArea: featureArea(selected), freeArea: selectedParams.freeArea, floors: selectedFloors,
        floorHeight, authorizedCe: selectedAuthorizedCe, ceBase: selectedParams.ceBase, ceMax: selectedParams.ceMax,
        epapEnabled, epapPercent,
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
  return polygons.reduce((total, polygon) => total + Math.abs(planarRingArea(polygon[0]))
    - polygon.slice(1).reduce((holes, ring) => holes + Math.abs(planarRingArea(ring)), 0), 0);
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

function morphologyTemplate(type, shape = {}) {
  const ratio = (key, fallback) => clamp(Number(shape[key] ?? fallback) / 100, 0.1, 0.7);
  if (type === "l") { const body = ratio("body", 42); const arm = ratio("arm", 42); return [[[0, 0], [1, 0], [1, body], [arm, body], [arm, 1], [0, 1], [0, 0]]]; }
  if (type === "u") { const body = ratio("body", 36); const left = ratio("leftArm", 27); const right = ratio("rightArm", 27); return [[[0, 0], [1, 0], [1, 1], [1 - right, 1], [1 - right, body], [left, body], [left, 1], [0, 1], [0, 0]]]; }
  if (type === "patio") {
    const front = ratio("front", 25); const back = ratio("back", 25);
    const left = ratio("leftArm", 25); const right = ratio("rightArm", 25);
    return [
      [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]],
      [[left, front], [left, 1 - back], [1 - right, 1 - back], [1 - right, front], [left, front]],
    ];
  }
  if (type === "blocks") {
    const halfGap = ratio("gap", 20) / 2; const left = 0.5 - halfGap; const right = 0.5 + halfGap;
    return [
      [[0, 0], [left, 0], [left, 1], [0, 1], [0, 0]],
      [[right, 0], [1, 0], [1, 1], [right, 1], [right, 0]],
    ];
  }
  return null;
}

function rotateMorphologyPoint(point, turns) {
  let [x, y] = point;
  for (let i = 0; i < turns; i += 1) [x, y] = [1 - y, x];
  return [x, y];
}

function ringFitsInsideParcel(ring, lotPolygon) {
  const outer = lotPolygon[0];
  const origin = outer[0];
  const cosLat = Math.cos((origin[1] * Math.PI) / 180);
  const toLocal = (point) => [(point[0] - origin[0]) * 111320 * cosLat, (point[1] - origin[1]) * 110540];
  const candidate = ring.map(toLocal);
  const boundaries = lotPolygon.map((lotRing) => lotRing.map(toLocal));
  for (let i = 0; i < ring.length - 1; i += 1) {
    const a = candidate[i]; const b = candidate[i + 1];
    for (let j = 0; j < boundaries[0].length - 1; j += 1) {
      if (segmentsProperlyIntersect2d(a, b, boundaries[0][j], boundaries[0][j + 1])) return false;
    }
    for (const hole of boundaries.slice(1)) {
      for (let j = 0; j < hole.length - 1; j += 1) if (segmentsIntersect2d(a, b, hole[j], hole[j + 1])) return false;
    }
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const sample = [ring[i][0] + (ring[i + 1][0] - ring[i][0]) * t, ring[i][1] + (ring[i + 1][1] - ring[i][1]) * t];
      const sampleLocal = toLocal(sample);
      const onOuter = boundaries[0].some((point, edgeIndex) => pointOnSegment2d(sampleLocal, point, boundaries[0][(edgeIndex + 1) % (boundaries[0].length - 1)]));
      if (!onOuter && !pointInGeoRing(sample, outer)) return false;
      if (lotPolygon.slice(1).some((hole) => pointInGeoRing(sample, hole))) return false;
    }
  }
  return ringIsSimple(ring);
}

function fitMorphologyToPolygon(lotPolygon, template, occupancy, turns) {
  const outer = lotPolygon[0];
  const points = localRing(outer);
  if (points.length < 3) return null;
  const center = [
    outer.slice(0, -1).reduce((sum, point) => sum + point[0] / (outer.length - 1), 0),
    outer.slice(0, -1).reduce((sum, point) => sum + point[1] / (outer.length - 1), 0),
  ];
  let xx = 0; let yy = 0; let xy = 0;
  for (const point of points) { xx += point[0] * point[0]; yy += point[1] * point[1]; xy += point[0] * point[1]; }
  const angle = 0.5 * Math.atan2(2 * xy, xx - yy);
  const u = [Math.cos(angle), Math.sin(angle)]; const v = [-u[1], u[0]];
  const projected = points.map((point) => [point[0] * u[0] + point[1] * u[1], point[0] * v[0] + point[1] * v[1]]);
  const minU = Math.min(...projected.map((point) => point[0])); const maxU = Math.max(...projected.map((point) => point[0]));
  const minV = Math.min(...projected.map((point) => point[1])); const maxV = Math.max(...projected.map((point) => point[1]));
  const width = maxU - minU; const depth = maxV - minV;
  if (width < 0.1 || depth < 0.1) return null;
  const rotated = template.map((ring) => ring.map((point) => rotateMorphologyPoint(point, turns)));
  const templateArea = Math.abs(rotated.reduce((sum, ring) => sum + ring.reduce((area, point, i) => {
    const next = ring[(i + 1) % ring.length]; return area + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2, 0));
  const boxArea = width * depth;
  const lotArea = Math.abs(ringSignedAreaMeters(outer));
  const maxScale = Math.min(1, Math.sqrt((lotArea * occupancy) / Math.max(boxArea * templateArea, 0.01)));
  const originLat = center[1]; const cosLat = Math.cos((originLat * Math.PI) / 180);
  const centers = [0.3, 0.5, 0.7];
  for (let step = 0; step <= 16; step += 1) {
    const scale = maxScale * (1 - step * 0.045);
    if (scale < 0.25) break;
    for (const cu of centers) for (const cv of centers) {
      const centerU = minU + width * cu; const centerV = minV + depth * cv;
      const candidateRings = rotated.map((ring) => {
        const geoRing = ring.map(([x, y]) => {
          const localU = centerU + (x - 0.5) * width * scale;
          const localV = centerV + (y - 0.5) * depth * scale;
          const east = u[0] * localU + v[0] * localV;
          const north = u[1] * localU + v[1] * localV;
          return [center[0] + east / (111320 * cosLat), center[1] + north / 110540];
        });
        return geoRing;
      });
      if (candidateRings.every((ring) => ringFitsInsideParcel(ring, lotPolygon))) return candidateRings;
    }
  }
  return null;
}

function buildModelBaseFootprint(model, shapeOverride = null) {
  const shape = shapeOverride || state.modelShapes.get(String(model.values.lotId)) || { type: "lot", orientation: 0 };
  const occupancy = Math.max(0.05, 1 - model.values.freeArea / 100);
  if (!shape.type || shape.type === "lot") return scaleGeometry(model.feature.geometry, Math.sqrt(occupancy));
  const template = morphologyTemplate(shape.type, shape);
  if (!template) return scaleGeometry(model.feature.geometry, Math.sqrt(occupancy));
  const resultPolygons = [];
  for (const lotPolygon of polygonsFromGeometry(model.feature.geometry)) {
    const fitted = fitMorphologyToPolygon(lotPolygon, template, occupancy, clamp(Number(shape.orientation) || 0, 0, 3));
    if (!fitted) return null;
    if (shape.type === "blocks") resultPolygons.push(...fitted.map((ring) => [ring]));
    else resultPolygons.push(fitted);
  }
  if (!resultPolygons.length) return null;
  return resultPolygons.length === 1
    ? { type: "Polygon", coordinates: resultPolygons[0] }
    : { type: "MultiPolygon", coordinates: resultPolygons };
}

function getModelBaseFootprint(model) {
  return buildModelBaseFootprint(model) || scaleGeometry(model.feature.geometry, Math.sqrt(Math.max(0.05, 1 - model.values.freeArea / 100)));
}

function modelFaceContext(model, zoneIndex = 0) {
  const id = String(model.values.lotId);
  const zone = (state.shapeZones.get(id) || [])[zoneIndex - 1];
  return { id, zone, editKey: zone ? `${id}@${zone.id}` : id, base: zone ? buildModelBaseFootprint(model, zone) : getModelBaseFootprint(model) };
}

function modelZoneIndexForFloor(lotId, floor) {
  return (state.shapeZones.get(String(lotId)) || []).findIndex((zone) => floor >= zone.start && floor <= zone.end) + 1;
}

function modelFootprintForFloor(model, floor) {
  const id = String(model.values.lotId);
  const context = modelFaceContext(model, modelZoneIndexForFloor(id, floor));
  return applyWallOffsets(context.base || getModelBaseFootprint(model), state.wallEdits.get(context.editKey) || {});
}

function buildEditableFaceGroups(geometry) {
  const groups = [];
  polygonsFromGeometry(geometry).forEach((polygon, polygonIndex) => {
    const ring = polygon[0];
    if (!ring || ring.length < 4) return;
    const local = localRing(ring); const count = local.length;
    const edges = Array.from({ length: count }, (_, edgeIndex) => {
      const a = local[edgeIndex]; const b = local[(edgeIndex + 1) % count];
      const dx = b[0] - a[0]; const dy = b[1] - a[1]; const length = Math.hypot(dx, dy) || 1;
      return { polygonIndex, edgeIndex, key: `${polygonIndex}:${edgeIndex}`, direction: [dx / length, dy / length], length };
    });
    // Cadastral boundaries often contain several short GIS segments for what a
    // person sees as one side. Allow small changes in direction, while limiting
    // the total turn from the start of a face so real corners stay separate.
    const maxFaceTurn = Math.sin(25 * Math.PI / 180);
    const canMerge = (first, second) => first.length < 0.25 || second.length < 0.25
      || (Math.abs(cross2d(first.direction, second.direction)) <= maxFaceTurn && first.direction[0] * second.direction[0] + first.direction[1] * second.direction[1] > 0);
    const breaks = edges.map((edge, index) => !canMerge(edges[(index - 1 + count) % count], edge));
    // A densely sampled curved perimeter may have no sharp corner. Start at
    // its longest segment and split it as accumulated direction changes grow.
    const start = breaks.some(Boolean) ? breaks.findIndex(Boolean) : edges.reduce((best, edge, index) => edge.length > edges[best].length ? index : best, 0);
    let current = [];
    const flush = () => {
      if (!current.length) return;
      const firstEdge = current[0].edgeIndex;
      groups.push({ polygonIndex, key: `${polygonIndex}:face:${firstEdge}`, edges: current, length: current.reduce((sum, edge) => sum + edge.length, 0) });
      current = [];
    };
    for (let step = 0; step < count; step += 1) {
      const index = (start + step) % count;
      if (current.length && (!canMerge(current.at(-1), edges[index]) || !canMerge(current[0], edges[index]))) flush();
      current.push(edges[index]);
    }
    flush();
  });
  return groups;
}

function averageFaceOffset(offsets, face) {
  if (!face?.edges.length) return 0;
  return face.edges.reduce((sum, edge) => sum + (Number(offsets[edge.key]) || 0), 0) / face.edges.length;
}

function constrainWallFaceOffsets(model, baseGeometry, face, startOffsets, desiredValue) {
  const before = { ...startOffsets };
  const current = averageFaceOffset(before, face);
  const desired = clamp(Number(desiredValue) || 0, -25, 25);
  const delta = desired - current;
  const maxArea = featureArea({ geometry: baseGeometry, properties: { area_m2: 0 } });
  const at = (factor) => {
    const offsets = { ...before };
    for (const edge of face.edges) {
      const value = (Number(before[edge.key]) || 0) + delta * factor;
      if (Math.abs(value) < 0.005) delete offsets[edge.key]; else offsets[edge.key] = value;
    }
    const geometry = applyWallOffsets(baseGeometry, offsets);
    return footprintRespectsLotAndArea(geometry, model.feature.geometry, maxArea, baseGeometry) ? offsets : null;
  };
  let factor = 1; let offsets = at(factor);
  if (!offsets) {
    let low = 0; let high = 1;
    for (let i = 0; i < 16; i += 1) {
      const middle = (low + high) / 2;
      if (at(middle)) low = middle; else high = middle;
    }
    factor = low; offsets = at(factor) || before;
  }
  return { offsets, value: current + delta * factor };
}

function normalizeFaceOffsets(model, baseGeometry, sourceOffsets) {
  const source = { ...sourceOffsets }; const normalized = {};
  for (const face of buildEditableFaceGroups(baseGeometry)) {
    const hasEdits = face.edges.some((edge) => Object.hasOwn(source, edge.key));
    if (!hasEdits) continue;
    const value = averageFaceOffset(source, face);
    if (Math.abs(value) < 0.005) continue;
    const result = constrainWallFaceOffsets(model, baseGeometry, face, normalized, value);
    Object.assign(normalized, result.offsets);
  }
  return normalized;
}

function edgeNormalMeters(a, b, latitude, counterClockwise) {
  const dx = (b[0] - a[0]) * 111320 * Math.cos((latitude * Math.PI) / 180);
  const dy = (b[1] - a[1]) * 110540;
  const length = Math.hypot(dx, dy) || 1;
  return counterClockwise ? [dy / length, -dx / length] : [-dy / length, dx / length];
}

function ringSignedAreaMeters(ring) {
  const points = localRing(ring);
  let area = 0;
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i]; const next = points[(i + 1) % points.length];
    area += current[0] * next[1] - next[0] * current[1];
  }
  return area / 2;
}

function cross2d(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function pointOnSegment2d(point, a, b, epsilon = 1e-6) {
  const relative = [point[0] - a[0], point[1] - a[1]];
  const direction = [b[0] - a[0], b[1] - a[1]];
  if (Math.abs(cross2d(relative, direction)) > epsilon * Math.max(1, Math.hypot(...direction))) return false;
  const dot = relative[0] * direction[0] + relative[1] * direction[1];
  return dot >= -epsilon && dot <= direction[0] ** 2 + direction[1] ** 2 + epsilon;
}

function segmentsIntersect2d(a, b, c, d) {
  const ab = [b[0] - a[0], b[1] - a[1]];
  const cd = [d[0] - c[0], d[1] - c[1]];
  const o1 = cross2d(ab, [c[0] - a[0], c[1] - a[1]]);
  const o2 = cross2d(ab, [d[0] - a[0], d[1] - a[1]]);
  const o3 = cross2d(cd, [a[0] - c[0], a[1] - c[1]]);
  const o4 = cross2d(cd, [b[0] - c[0], b[1] - c[1]]);
  const epsilon = 1e-7;
  if (((o1 > epsilon && o2 < -epsilon) || (o1 < -epsilon && o2 > epsilon))
    && ((o3 > epsilon && o4 < -epsilon) || (o3 < -epsilon && o4 > epsilon))) return true;
  return (Math.abs(o1) <= epsilon && pointOnSegment2d(c, a, b))
    || (Math.abs(o2) <= epsilon && pointOnSegment2d(d, a, b))
    || (Math.abs(o3) <= epsilon && pointOnSegment2d(a, c, d))
    || (Math.abs(o4) <= epsilon && pointOnSegment2d(b, c, d));
}

function segmentsProperlyIntersect2d(a, b, c, d) {
  const orient = (p, q, r) => cross2d([q[0] - p[0], q[1] - p[1]], [r[0] - p[0], r[1] - p[1]]);
  const epsilon = 1e-7;
  const o1 = orient(a, b, c); const o2 = orient(a, b, d);
  const o3 = orient(c, d, a); const o4 = orient(c, d, b);
  return ((o1 > epsilon && o2 < -epsilon) || (o1 < -epsilon && o2 > epsilon))
    && ((o3 > epsilon && o4 < -epsilon) || (o3 < -epsilon && o4 > epsilon));
}

function ringIsSimple(ring) {
  if (!ring || ring.length < 4) return false;
  const points = localRing(ring);
  for (let i = 0; i < points.length; i += 1) {
    const nextI = (i + 1) % points.length;
    if (Math.hypot(points[nextI][0] - points[i][0], points[nextI][1] - points[i][1]) < 0.05) return false;
    for (let j = i + 1; j < points.length; j += 1) {
      const nextJ = (j + 1) % points.length;
      if (j === i || nextJ === i || nextI === j) continue;
      if (segmentsIntersect2d(points[i], points[nextI], points[j], points[nextJ])) return false;
    }
  }
  return true;
}

function applyWallOffsets(geometry, offsets = {}) {
  const transformRing = (ring, polygonIndex, isOuter) => {
    if (!isOuter || ring.length < 4) return ring.map((point) => [...point]);
    if (!Object.keys(offsets).some((key) => key.startsWith(`${polygonIndex}:`) && Math.abs(Number(offsets[key]) || 0) >= 0.005)) return ring.map((point) => [...point]);
    const points = ring.slice(0, -1);
    const local = localRing(ring);
    const origin = [
      points.reduce((sum, point) => sum + point[0] / points.length, 0),
      points.reduce((sum, point) => sum + point[1] / points.length, 0),
    ];
    const cosLat = Math.cos((origin[1] * Math.PI) / 180);
    const ccw = ringSignedAreaMeters(ring) > 0;
    const groups = buildEditableFaceGroups({ type: "Polygon", coordinates: [ring] });
    const groupByEdge = new Map();
    const lines = new Map();
    for (const group of groups) {
      const first = group.edges[0].edgeIndex;
      const last = (group.edges.at(-1).edgeIndex + 1) % points.length;
      const a = local[first]; const b = local[last];
      const length = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
      const direction = [(b[0] - a[0]) / length, (b[1] - a[1]) / length];
      const normal = ccw ? [direction[1], -direction[0]] : [-direction[1], direction[0]];
      const offset = averageFaceOffset(offsets, { edges: group.edges.map((edge) => ({ key: `${polygonIndex}:${edge.edgeIndex}` })) });
      lines.set(group.key, { a: [a[0] + normal[0] * offset, a[1] + normal[1] * offset], direction, offset, first, last });
      for (const edge of group.edges) groupByEdge.set(edge.edgeIndex, group.key);
    }
    const moved = points.map((point, vertexIndex) => {
      const prevIndex = (vertexIndex - 1 + points.length) % points.length;
      const previous = lines.get(groupByEdge.get(prevIndex));
      const next = lines.get(groupByEdge.get(vertexIndex));
      const current = local[vertexIndex];
      let result;
      if (previous === next) {
        if (Math.abs(next.offset) < 0.005) result = current;
        else {
          const along = (current[0] - next.a[0]) * next.direction[0] + (current[1] - next.a[1]) * next.direction[1];
          result = [next.a[0] + next.direction[0] * along, next.a[1] + next.direction[1] * along];
        }
      } else {
        const denominator = cross2d(previous.direction, next.direction);
        const delta = [next.a[0] - previous.a[0], next.a[1] - previous.a[1]];
        if (Math.abs(denominator) > 1e-7) {
          const distance = cross2d(delta, next.direction) / denominator;
          result = [previous.a[0] + previous.direction[0] * distance, previous.a[1] + previous.direction[1] * distance];
        } else result = [(previous.a[0] + next.a[0]) / 2, (previous.a[1] + next.a[1]) / 2];
        const maxMiter = Math.max(1.5, Math.max(Math.abs(previous.offset), Math.abs(next.offset)) * 4 + 0.5);
        if (Math.hypot(result[0] - current[0], result[1] - current[1]) > maxMiter) {
          const prevPoint = [current[0] + (previous.a[0] - local[previous.first][0]), current[1] + (previous.a[1] - local[previous.first][1])];
          const nextPoint = [current[0] + (next.a[0] - local[next.first][0]), current[1] + (next.a[1] - local[next.first][1])];
          result = [(prevPoint[0] + nextPoint[0]) / 2, (prevPoint[1] + nextPoint[1]) / 2];
        }
      }
      return [origin[0] + result[0] / (111320 * cosLat), origin[1] + result[1] / 110540];
    });
    return [...moved, [...moved[0]]];
  };
  const polygons = polygonsFromGeometry(geometry).map((polygon, polygonIndex) => polygon.map((ring, ringIndex) => transformRing(ring, polygonIndex, ringIndex === 0)));
  return geometry.type === "Polygon" ? { ...geometry, coordinates: polygons[0] } : { ...geometry, coordinates: polygons };
}

function pointInGeoRing(point, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i]; const b = ring[j];
    if ((a[1] > point[1]) !== (b[1] > point[1]) && point[0] < ((b[0] - a[0]) * (point[1] - a[1])) / (b[1] - a[1]) + a[0]) inside = !inside;
  }
  return inside;
}

function footprintRespectsLotAndArea(geometry, lotGeometry, maxArea, referenceGeometry = geometry) {
  const lotPolygons = polygonsFromGeometry(lotGeometry);
  const editedPolygons = polygonsFromGeometry(geometry);
  const referencePolygons = polygonsFromGeometry(referenceGeometry);
  if (editedPolygons.length !== referencePolygons.length) return false;
  for (let polygonIndex = 0; polygonIndex < editedPolygons.length; polygonIndex += 1) {
    const polygon = editedPolygons[polygonIndex];
    const ring = polygon[0];
    const referenceRing = referencePolygons[polygonIndex]?.[0];
    const lotPolygon = editedPolygons.length === lotPolygons.length ? lotPolygons[polygonIndex]
      : lotPolygons.find((candidate) => referenceRing && ringFitsInsideParcel(referenceRing, candidate));
    if (!ringIsSimple(ring) || !lotPolygon || !referenceRing || Math.sign(ringSignedAreaMeters(ring)) !== Math.sign(ringSignedAreaMeters(referenceRing))) return false;
    for (const hole of polygon.slice(1)) {
      if (!ringIsSimple(hole) || hole.slice(0, -1).some((point) => !pointInGeoRing(point, ring))) return false;
      for (let i = 0; i < hole.length - 1; i += 1) {
        const a = hole[i]; const b = hole[i + 1];
        for (let j = 0; j < ring.length - 1; j += 1) if (segmentsProperlyIntersect2d(a, b, ring[j], ring[j + 1])) return false;
      }
    }
    const origin = lotPolygon[0][0];
    const cosLat = Math.cos((origin[1] * Math.PI) / 180);
    const toLocal = (point) => [(point[0] - origin[0]) * 111320 * cosLat, (point[1] - origin[1]) * 110540];
    const edited = ring.map(toLocal);
    const boundaries = lotPolygon.map((lotRing) => lotRing.map(toLocal));
    for (let index = 0; index < ring.length - 1; index += 1) {
      const a = edited[index]; const b = edited[index + 1];
      for (let j = 0; j < boundaries[0].length - 1; j += 1) {
        if (segmentsProperlyIntersect2d(a, b, boundaries[0][j], boundaries[0][j + 1])) return false;
      }
      for (const hole of boundaries.slice(1)) {
        for (let j = 0; j < hole.length - 1; j += 1) {
          if (segmentsIntersect2d(a, b, hole[j], hole[j + 1])) return false;
        }
      }
      for (const t of [0, 0.25, 0.5, 0.75, 1]) {
        const sample = [ring[index][0] + (ring[index + 1][0] - ring[index][0]) * t, ring[index][1] + (ring[index + 1][1] - ring[index][1]) * t];
        const sampleLocal = toLocal(sample);
        const onOuter = boundaries[0].some((point, edgeIndex) => pointOnSegment2d(sampleLocal, point, boundaries[0][(edgeIndex + 1) % (boundaries[0].length - 1)]));
        if (!onOuter && !pointInGeoRing(sample, lotPolygon[0])) return false;
        if (lotPolygon.slice(1).some((hole) => pointInGeoRing(sample, hole))) return false;
      }
    }
    const editedArea = Math.abs(ringSignedAreaMeters(ring));
    const referenceArea = Math.abs(ringSignedAreaMeters(referenceRing));
    if (editedArea < Math.max(0.25, referenceArea * 0.03) || editedArea > referenceArea + 0.05) return false;
  }
  return featureArea({ geometry, properties: { area_m2: 0 } }) <= maxArea + 0.05;
}

function updateMapModel(models) {
  if (!state.ready || !map.getSource("cabida-model")) return;
  state.modelInputs = models;
  const floors = [];
  const epapFeatures = [];
  let activeModelMetrics = null;
  for (const { feature, values } of models) {
    const model = { feature, values };
    const baseFootprint = getModelBaseFootprint(model);
    const savedOffsets = state.wallEdits.get(values.lotId) || {};
    const finiteOffsets = Object.fromEntries(Object.entries(savedOffsets)
      .filter(([, offset]) => Number.isFinite(Number(offset)))
      .map(([key, offset]) => [key, Number(offset)]));
    const validOffsets = normalizeFaceOffsets(model, baseFootprint, finiteOffsets);
    if (Object.keys(validOffsets).length) state.wallEdits.set(values.lotId, validOffsets);
    else state.wallEdits.delete(values.lotId);
    for (let zoneIndex = 1; zoneIndex <= (state.shapeZones.get(values.lotId) || []).length; zoneIndex += 1) {
      const context = modelFaceContext(model, zoneIndex);
      if (!context.base) continue;
      const zoneOffsets = normalizeFaceOffsets(model, context.base, state.wallEdits.get(context.editKey) || {});
      if (Object.keys(zoneOffsets).length) state.wallEdits.set(context.editKey, zoneOffsets);
      else state.wallEdits.delete(context.editKey);
    }
    const footprint = applyWallOffsets(baseFootprint, validOffsets);
    const footprintArea = featureArea({ geometry: footprint, properties: { area_m2: 0 } });
    const normativeHeight = Number(values.height) || values.floors * values.floorHeight;
    const ceFloorLimit = Math.max(1, Math.floor((values.lotArea * values.authorizedCe) / Math.max(footprintArea, 0.01) + 1e-7));
    const regulatoryFloorLimit = Math.max(1, Math.floor(normativeHeight / values.floorHeight + 1e-7));
    const maxAllowedFloors = Math.min(ceFloorLimit, regulatoryFloorLimit);
    const maxAllowedHeight = Math.min(normativeHeight, maxAllowedFloors * values.floorHeight);
    const baseHeight = Math.min(maxAllowedHeight, values.floors * values.floorHeight);
    const requestedHeight = Number(state.modelEdits.get(values.lotId) ?? baseHeight);
    const requestedFloors = Math.max(1, Math.round(requestedHeight / values.floorHeight));
    const editedHeight = clamp(requestedFloors * values.floorHeight, 0.5, maxAllowedHeight);
    const requestedFloorCount = Math.ceil(editedHeight / values.floorHeight);
    const floorGeometries = [];
    let roofedArea = 0;
    for (let floor = 1; floor <= requestedFloorCount; floor += 1) {
      const geometry = modelFootprintForFloor(model, floor);
      const area = featureArea({ geometry, properties: { area_m2: 0 } });
      if (roofedArea + area > values.lotArea * values.authorizedCe + 0.05) break;
      roofedArea += area;
      floorGeometries.push({ geometry, area });
    }
    const floorCount = floorGeometries.length;
    const actualHeight = floorCount * values.floorHeight;
    if (String(state.selectedFeature?.properties.id) === values.lotId) {
      activeModelMetrics = { height: actualHeight, floors: floorCount, area: roofedArea, footprintArea: floorGeometries[0]?.area || footprintArea, freeArea: values.freeArea, authorizedCe: values.authorizedCe, ceMax: values.ceMax, ceBase: values.ceBase, edited: state.modelEdits.has(values.lotId), maxHeight: maxAllowedHeight, maxFloors: maxAllowedFloors };
    }
    for (let index = 0; index < floorCount; index += 1) {
      // Keep storeys flush: an artificial gap makes one continuous wall look
      // like several independent strips when a full face is pushed or pulled.
      const floorBase = index * values.floorHeight;
      const floorTop = (index + 1) * values.floorHeight;
      if (floorTop <= floorBase + 0.02) continue;
      const use = (state.floorUses.get(values.lotId) || {})[index + 1] || "residencial";
      const color = use === "comercial" ? "#cf6b39" : use === "equipamiento" ? "#5676bb" : "#16845f";
      floors.push({
        type: "Feature",
        properties: {
          lotId: values.lotId,
          editable: true,
          base: floorBase,
          height: floorTop,
          floor: index + 1,
          use,
          color,
        },
        geometry: floorGeometries[index].geometry,
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
  if (activeModelMetrics) {
    state.activeModelMetrics = activeModelMetrics;
    ui.modelHeight.textContent = nf1.format(activeModelMetrics.height);
    ui.modelFloors.textContent = nf1.format(activeModelMetrics.floors);
    ui.modelArea.textContent = nf0.format(activeModelMetrics.area);
    ui.modelDimension.textContent = state.modelDimension?.lotId === String(state.selectedFeature?.properties.id)
      ? nf1.format(state.modelDimension.value) : "—";
    ui.modelInteractionHint.textContent = state.pushPullMode
      ? `${activeModelMetrics.edited ? "Editado" : "Altura inicial"}: ${nf1.format(activeModelMetrics.height)} m · Tope ${nf1.format(activeModelMetrics.maxHeight)} m · Arrastre cara superior o pared`
      : "Arrastre con clic derecho para girar e inclinar · Rueda para acercar";
  }
  renderModelEditor();
}

function pointInScreenRing(point, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const a = ring[i]; const b = ring[j];
    if ((a.y > point.y) !== (b.y > point.y) && point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

function projectModelPoint(lngLat, altitude) {
  const ground = map.project(lngLat);
  const latitude = (lngLat[1] * Math.PI) / 180;
  const worldPixelsPerMeter = (512 * 2 ** map.getZoom()) / (2 * Math.PI * 6378137 * Math.max(0.01, Math.cos(latitude)));
  const verticalPixelsPerMeter = worldPixelsPerMeter * Math.sin((map.getPitch() * Math.PI) / 180);
  return { x: ground.x, y: ground.y - altitude * verticalPixelsPerMeter };
}

function raycastEditableWall(point) {
  const hits = map.queryRenderedFeatures(point, { layers: ["cabida-model"] });
  const selectedId = String(state.selectedFeature?.properties.id || "");
  for (const hit of hits) {
    if (!hit.properties?.editable || String(hit.properties.lotId) !== selectedId) continue;
    const model = state.modelInputs.find((item) => String(item.values.lotId) === selectedId);
    if (!model) continue;
    // Rendered tile geometry may be clipped or simplified. Use the canonical
    // floor footprint so picked edge indices match the editable face groups.
    const polygons = polygonsFromGeometry(modelFootprintForFloor(model, Number(hit.properties.floor) || 1));
    const base = Number(hit.properties.base) || 0; const height = Number(hit.properties.height) || 0;
    for (let polygonIndex = 0; polygonIndex < polygons.length; polygonIndex += 1) {
      const ring = polygons[polygonIndex][0];
      if (!ring || ring.length < 4) continue;
      const ccw = ringSignedAreaMeters(ring) > 0;
      for (let edgeIndex = 0; edgeIndex < ring.length - 1; edgeIndex += 1) {
        const a = ring[edgeIndex]; const b = ring[edgeIndex + 1];
        const quad = [
          projectModelPoint(a, base), projectModelPoint(b, base),
          projectModelPoint(b, height), projectModelPoint(a, height),
        ];
        if (!pointInScreenRing(point, [...quad, quad[0]])) continue;
        const middle = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        const normal = edgeNormalMeters(a, b, middle[1], ccw);
        const outside = [middle[0] + normal[0] / (111320 * Math.cos((middle[1] * Math.PI) / 180)), middle[1] + normal[1] / 110540];
        const edgeScreen = projectModelPoint(outside, (base + height) / 2);
        const centerScreen = projectModelPoint(middle, (base + height) / 2);
        const nx = edgeScreen.x - centerScreen.x; const ny = edgeScreen.y - centerScreen.y;
        const pxPerMeter = Math.hypot(nx, ny);
        if (pxPerMeter < 0.05) continue;
        const edgeLength = Math.hypot((b[0] - a[0]) * 111320 * Math.cos((middle[1] * Math.PI) / 180), (b[1] - a[1]) * 110540);
        return { hit, polygonIndex, edgeIndex, normalScreen: [nx / pxPerMeter, ny / pxPerMeter], pxPerMeter, edgeLength };
      }
    }
  }
  return null;
}

function projectFaceDragAxis(geometry, face, altitude) {
  const ring = polygonsFromGeometry(geometry)[face.polygonIndex]?.[0];
  if (!ring || !face.edges.length) return null;
  const ccw = ringSignedAreaMeters(ring) > 0;
  let normalX = 0; let normalY = 0; let centerX = 0; let centerY = 0; let totalLength = 0;
  for (const edge of face.edges) {
    const a = ring[edge.edgeIndex]; const b = ring[(edge.edgeIndex + 1) % (ring.length - 1)];
    if (!a || !b) continue;
    const middle = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const normal = edgeNormalMeters(a, b, middle[1], ccw);
    const weight = edge.length;
    normalX += normal[0] * weight; normalY += normal[1] * weight;
    centerX += middle[0] * weight; centerY += middle[1] * weight;
    totalLength += weight;
  }
  const normalLength = Math.hypot(normalX, normalY);
  if (normalLength < 1e-6 || totalLength <= 0) return null;
  const center = [centerX / totalLength, centerY / totalLength];
  const normal = [normalX / normalLength, normalY / normalLength];
  const outside = [center[0] + normal[0] / (111320 * Math.cos((center[1] * Math.PI) / 180)), center[1] + normal[1] / 110540];
  const a = projectModelPoint(center, altitude); const b = projectModelPoint(outside, altitude);
  const dx = b.x - a.x; const dy = b.y - a.y; const pxPerMeter = Math.hypot(dx, dy);
  if (pxPerMeter < 0.05) return null;
  return { normalScreen: [dx / pxPerMeter, dy / pxPerMeter], pxPerMeter };
}

function getModelFootprint(model, zoneIndex = 0) {
  const context = modelFaceContext(model, zoneIndex);
  return applyWallOffsets(context.base || getModelBaseFootprint(model), state.wallEdits.get(context.editKey) || {});
}

function setSelectedFaceOverlay() {
  const source = map.getSource("pushpull-face");
  if (!source) return;
  const selected = state.selectedWall;
  const model = selected && state.modelInputs.find((item) => String(item.values.lotId) === selected.lotId);
  if (!model) { source.setData(emptyCollection()); return; }
  const geometry = getModelFootprint(model, selected.zoneIndex || 0);
  const features = [];
  const polygons = polygonsFromGeometry(geometry);
  const group = buildEditableFaceGroups(modelFaceContext(model, selected.zoneIndex || 0).base).find((face) => face.key === selected.faceKey) || {
    edges: [{ polygonIndex: selected.polygonIndex, edgeIndex: selected.edgeIndex }],
  };
  for (const edge of group.edges) {
    const ring = polygons[edge.polygonIndex]?.[0];
    const a = ring?.[edge.edgeIndex]; const b = ring?.[(edge.edgeIndex + 1) % (ring?.length - 1 || 1)];
    if (!a || !b) continue;
    const ccw = ringSignedAreaMeters(ring) > 0;
    const normal = edgeNormalMeters(a, b, (a[1] + b[1]) / 2, ccw);
    const outside = (point) => [point[0] + normal[0] * 0.12 / (111320 * Math.cos((point[1] * Math.PI) / 180)), point[1] + normal[1] * 0.12 / 110540];
    features.push({ type: "Feature", properties: { base: 0, color: "#00b8ff" }, geometry: { type: "Polygon", coordinates: [[a, b, outside(b), outside(a), a]] } });
  }
  const modelHeight = modelCurrentHeight(model);
  const zone = (state.shapeZones.get(selected.lotId) || [])[selected.zoneIndex - 1];
  for (const feature of features) {
    feature.properties.base = zone ? (zone.start - 1) * model.values.floorHeight : 0;
    feature.properties.height = zone ? Math.min(modelHeight, zone.end * model.values.floorHeight) : modelHeight;
  }
  source.setData({ type: "FeatureCollection", features });
}

function modelMaximumHeight(model) {
  if (!model) return 0.5;
  const normativeHeight = Number(model.values.height) || Number(model.values.floors) * Number(model.values.floorHeight);
  const heightFloors = Math.max(1, Math.floor(normativeHeight / model.values.floorHeight + 1e-7));
  let roofed = 0; let count = 0;
  for (let floor = 1; floor <= heightFloors; floor += 1) {
    const area = featureArea({ geometry: modelFootprintForFloor(model, floor), properties: { area_m2: 0 } });
    if (roofed + area > model.values.lotArea * model.values.authorizedCe + 0.05) break;
    roofed += area; count += 1;
  }
  return Math.max(0.5, Math.min(normativeHeight, Math.max(1, count) * model.values.floorHeight));
}

function modelMaximumFloors(model) {
  return Math.max(1, Math.floor(modelMaximumHeight(model) / Number(model.values.floorHeight) + 1e-7));
}

function modelCurrentHeight(model) {
  const id = String(model?.values.lotId || "");
  const floorHeight = Number(model?.values.floorHeight) || 3;
  const baseline = Math.min(modelMaximumHeight(model), Number(model?.values.floors) * floorHeight);
  const height = Number(state.modelEdits.get(id) ?? baseline);
  return clamp(Math.round(height / floorHeight) * floorHeight, 0.5, modelMaximumHeight(model));
}

function beginHeightControlEdit() {
  const id = String(state.selectedFeature?.properties.id || "");
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  if (!model) return;
  state.pendingHeightControl = { id, before: modelCurrentHeight(model), beforeOverride: state.modelEdits.get(id) };
}

function applyHeightControlValue(value) {
  const id = String(state.selectedFeature?.properties.id || "");
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  if (!model) return;
  state.modelEdits.set(id, clamp(Number(value) || 0.5, 0.5, modelMaximumHeight(model)));
  updateCalculation();
}

function commitHeightControlEdit() {
  const pending = state.pendingHeightControl; state.pendingHeightControl = null;
  if (!pending) return;
  const model = state.modelInputs.find((item) => String(item.values.lotId) === pending.id);
  const after = model ? modelCurrentHeight(model) : pending.before;
  if (Math.abs(after - pending.before) < 0.02) return;
  state.modelEditUndo.push({ type: "height", id: pending.id, before: pending.beforeOverride, after: state.modelEdits.get(pending.id) });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons();
}

function setModelFloorCount(delta) {
  const model = state.modelInputs.find((item) => String(item.values.lotId) === String(state.selectedFeature?.properties.id || ""));
  if (!model) return;
  const current = Math.ceil(modelCurrentHeight(model) / model.values.floorHeight);
  const next = clamp(current + delta, 1, modelMaximumFloors(model));
  if (next === current) return;
  beginHeightControlEdit();
  applyHeightControlValue(next * model.values.floorHeight);
  commitHeightControlEdit();
}

function setModelPreviewActive(active) {
  if (active === state.modelPreviewActive) return;
  const mapShell = document.querySelector(".map-shell");
  if (active) {
    if (!state.ready || !ui.modelEditorPreview || !ui.mapCanvas) return;
    map.stop();
    state.modelPreviewCamera = { center: map.getCenter().toArray(), zoom: map.getZoom(), pitch: map.getPitch(), bearing: map.getBearing() };
    const backdrop = $("modelMapBackdrop");
    try {
      backdrop.src = map.getCanvas().toDataURL("image/png");
      backdrop.classList.remove("is-hidden");
    } catch (error) { console.warn("No se pudo conservar la vista del mapa.", error); }
    setDetailPanel(false);
    ui.layersPanel.classList.add("is-hidden");
    ui.layersButton.setAttribute("aria-expanded", "false");
    setOpacityPanel(false);
    ui.closeModelEditor.focus({ preventScroll: true });
    state.modelPreviewLayerVisibility = new Map();
    const previewLayers = new Set(["lot-selected-fill", "lot-selected-line", "cabida-model", "epap-model", "pushpull-face"]);
    for (const layer of map.getStyle()?.layers || []) {
      if (!map.getLayer(layer.id)) continue;
      state.modelPreviewLayerVisibility.set(layer.id, map.getLayoutProperty(layer.id, "visibility") || "visible");
      map.setLayoutProperty(layer.id, "visibility", previewLayers.has(layer.id) ? "visible" : "none");
    }
    ui.modelEditorPreview.append(ui.mapCanvas);
    mapShell.classList.add("is-model-preview");
    state.modelPreviewActive = true;
    requestAnimationFrame(() => {
      if (!state.modelPreviewActive) return;
      map.resize();
      if (state.selectedFeature) {
        const bounds = geometryBounds(state.selectedFeature.geometry);
        map.fitBounds([[bounds[0], bounds[1]], [bounds[2], bounds[3]]], {
          padding: { top: 34, bottom: 38, left: 70, right: 70 }, maxZoom: 19.2,
          pitch: 55, bearing: -18, duration: 550,
        });
      }
    });
    return;
  }

  if (ui.mapCanvas?.parentElement !== mapShell) mapShell.insertBefore(ui.mapCanvas, mapShell.firstElementChild);
  mapShell.classList.remove("is-model-preview");
  for (const [layerId, visibility] of state.modelPreviewLayerVisibility || []) {
    if (map.getLayer(layerId)) map.setLayoutProperty(layerId, "visibility", visibility);
  }
  state.modelPreviewLayerVisibility = null;
  state.modelPreviewActive = false;
  requestAnimationFrame(() => {
    map.resize();
    if (state.modelPreviewCamera) map.jumpTo(state.modelPreviewCamera);
    state.modelPreviewCamera = null;
    $("modelMapBackdrop").classList.add("is-hidden");
    $("modelMapBackdrop").removeAttribute("src");
    ui.togglePanel.focus({ preventScroll: true });
  });
}

function renderModelEditor() {
  if (!ui.modelEditor) return;
  const editorVisible = state.modelEditorOpen && state.selectedFeatures.length === 1;
  ui.modelEditor.classList.toggle("is-hidden", !editorVisible);
  ui.modelEditorBackdrop.classList.toggle("is-hidden", !editorVisible);
  setModelPreviewActive(editorVisible);
  const id = String(state.selectedFeature?.properties.id || "");
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  ui.modelEditorLot.textContent = state.selectedFeature
    ? `LOTE ${state.selectedFeature.properties.cod_lote || id}` : "Selecciona un lote";
  const maxHeight = model ? modelMaximumHeight(model) : 30;
  const height = model ? modelCurrentHeight(model) : 0.5;
  ui.modelEditorCurrentHeight.textContent = model ? nf1.format(height) : "—";
  ui.modelHeightLimit.textContent = `Tope ${nf1.format(maxHeight)} m`;
  const floorHeight = Number(model?.values.floorHeight) || 3;
  const currentFloors = model ? Math.ceil(height / floorHeight) : 0;
  const maxFloors = model ? modelMaximumFloors(model) : 0;
  ui.modelFloorCount.textContent = model ? String(currentFloors) : "—";
  ui.modelFloorDown.disabled = !model || currentFloors <= 1;
  ui.modelFloorUp.disabled = !model || currentFloors >= maxFloors;
  const footprintArea = model ? featureArea({ geometry: modelFootprintForFloor(model, 1), properties: { area_m2: 0 } }) : null;
  const roofedArea = model ? Array.from({ length: currentFloors }, (_, index) => featureArea({ geometry: modelFootprintForFloor(model, index + 1), properties: { area_m2: 0 } })).reduce((sum, area) => sum + area, 0) : null;
  ui.modelLotArea.textContent = model ? nf0.format(model.values.lotArea) : "—";
  ui.modelLotZone.textContent = model ? `Zona ${state.selectedFeature.properties.zona}` : "Zona —";
  const parcelFaces = state.selectedFeature ? buildEditableFaceGroups(state.selectedFeature.geometry) : [];
  const parcelSettings = state.parcelFaces.get(id) || {};
  ui.modelParcelFaces.innerHTML = parcelFaces.map((face, index) => {
    const active = parcelSettings[face.key]?.active;
    return `<button type="button" class="model-face-option${state.selectedParcelFace === face.key ? " is-selected" : ""}" data-parcel-face="${face.key}"><strong>Cara ${String(index + 1).padStart(2, "0")}${active ? " · Frente" : ""}</strong><span>${nf1.format(face.length)} m</span></button>`;
  }).join("");
  const parcelFace = parcelFaces.find((face) => face.key === state.selectedParcelFace);
  ui.modelParcelFaceControls.classList.toggle("is-hidden", !parcelFace);
  if (parcelFace) {
    const setting = parcelSettings[parcelFace.key] || {};
    ui.modelParcelActiveFront.checked = Boolean(setting.active);
    ui.modelParcelRoadWidth.value = String(setting.width ?? Number(ui.roadWidth.value) ?? 8);
    ui.modelParcelRetreat.value = String(setting.retreat ?? Number(ui.retreat.value) ?? 0);
  }
  ui.modelFootprintArea.textContent = footprintArea != null ? nf0.format(footprintArea) : "—";
  ui.modelRoofedArea.textContent = roofedArea != null ? nf0.format(roofedArea) : "—";
  ui.modelFreeArea.textContent = model ? `${nf1.format(model.values.freeArea)}% área libre mín.` : "—";
  ui.modelProgramFreeArea.textContent = model ? nf0.format(Math.max(0, model.values.lotArea - footprintArea)) : "—";
  ui.modelProgramRoofedArea.textContent = roofedArea != null ? nf0.format(roofedArea) : "—";
  ui.modelProgramCe.textContent = model && roofedArea != null ? nf1.format(roofedArea / Math.max(0.01, model.values.lotArea)) : "—";
  ui.modelProgramUse.value = state.currentUse;
  ui.modelProgramUse.disabled = ui.use.disabled;
  const zones = state.shapeZones.get(id) || [];
  state.selectedShapeZone = clamp(state.selectedShapeZone, 0, zones.length);
  ui.modelShapeZone.innerHTML = `<option value="0">Forma base · todos los pisos</option>${zones.map((zone, index) => `<option value="${index + 1}">Zona ${index + 1} · pisos ${zone.start}–${zone.end}</option>`).join("")}`;
  ui.modelShapeZone.value = String(state.selectedShapeZone);
  ui.modelRemoveShapeZone.disabled = !model || state.selectedShapeZone === 0;
  ui.modelAddShapeZone.disabled = !model || zones.length >= currentFloors;
  const selectedShape = state.selectedShapeZone ? zones[state.selectedShapeZone - 1] : state.modelShapes.get(id) || { type: "lot", orientation: 0 };
  ui.modelShapeStart.value = String(selectedShape?.start || 1);
  ui.modelShapeEnd.value = String(selectedShape?.end || currentFloors || 1);
  ui.modelShapeStart.max = String(currentFloors || 1);
  ui.modelShapeEnd.max = String(currentFloors || 1);
  ui.modelShapeStart.disabled = !model || state.selectedShapeZone === 0;
  ui.modelShapeEnd.disabled = !model || state.selectedShapeZone === 0;
  ui.modelShapeOrientation.value = String(selectedShape.orientation || 0);
  ui.modelShapeOrientation.disabled = !model || selectedShape.type === "lot";
  const shapeFields = {
    l: [["body", "Cuerpo (%)", 42], ["arm", "Brazo (%)", 42]],
    u: [["body", "Cuerpo (%)", 36], ["leftArm", "Brazo izquierdo (%)", 27], ["rightArm", "Brazo derecho (%)", 27]],
    patio: [["front", "Frente (%)", 25], ["back", "Fondo (%)", 25], ["leftArm", "Lado izquierdo (%)", 25], ["rightArm", "Lado derecho (%)", 25]],
    blocks: [["gap", "Separación (%)", 20]],
  }[selectedShape.type] || [];
  ui.modelShapeParams.innerHTML = shapeFields.map(([key, label, fallback]) => `<label>${label}<input type="number" data-shape-param="${key}" min="10" max="70" step="1" value="${selectedShape[key] ?? fallback}" /></label>`).join("");
  ui.modelShapeOptions.querySelectorAll("[data-model-shape]").forEach((button) => {
    const active = button.dataset.modelShape === selectedShape.type;
    button.classList.toggle("is-selected", active);
    button.setAttribute("aria-pressed", String(active));
  });
  ui.modelRulesSummary.textContent = model
    ? `Zona ${state.selectedFeature.properties.zona} · C.E. base ${nf1.format(model.values.ceBase)} · C.E. autorizable ${nf1.format(model.values.authorizedCe)} · C.E. máximo ${nf1.format(model.values.ceMax)} · altura calculada ${nf1.format(model.values.height)} m. Máximo operativo: ${maxFloors} pisos sobre la huella actual.`
    : "Este lote no tiene parámetros edificatorios disponibles.";
  ui.restoreLotModel.disabled = !model || (!state.modelEdits.has(id) && !Object.keys(state.wallEdits.get(id) || {}).length && ![...state.wallEdits.keys()].some((key) => key.startsWith(`${id}@`)) && !(state.modelShapes.get(id)?.type && state.modelShapes.get(id).type !== "lot") && !zones.length && !Object.keys(state.floorUses.get(id) || {}).length && !Object.keys(state.parcelFaces.get(id) || {}).length);
  const floorUses = state.floorUses.get(id) || {};
  const areaByUse = { residencial: 0, comercial: 0, equipamiento: 0 };
  ui.modelFloorUses.innerHTML = model ? Array.from({ length: currentFloors }, (_, index) => {
    const floor = index + 1;
    const use = Object.hasOwn(areaByUse, floorUses[floor]) ? floorUses[floor] : "residencial";
    return `<label>Piso ${floor}<select data-floor-use="${floor}"><option value="residencial"${use === "residencial" ? " selected" : ""}>Residencial</option><option value="comercial"${use === "comercial" ? " selected" : ""}>Comercial</option><option value="equipamiento"${use === "equipamiento" ? " selected" : ""}>Equipamiento</option></select></label>`;
  }).join("") : "";
  if (model) for (let floor = 1; floor <= currentFloors; floor += 1) {
    const use = Object.hasOwn(areaByUse, floorUses[floor]) ? floorUses[floor] : "residencial";
    areaByUse[use] += featureArea({ geometry: modelFootprintForFloor(model, floor), properties: { area_m2: 0 } });
  }
  ui.modelUseAreas.innerHTML = Object.entries(areaByUse).map(([use, area]) => `<span><b>${use[0].toUpperCase() + use.slice(1)}</b>${nf0.format(area)} m²</span>`).join("");
  const faceContext = model ? modelFaceContext(model, state.selectedShapeZone) : null;
  const faces = faceContext?.base ? buildEditableFaceGroups(faceContext.base) : [];
  ui.modelFaceCount.textContent = `${faces.length} caras completas · ${state.selectedShapeZone ? `zona ${state.selectedShapeZone}` : "forma base"}`;
  ui.modelFaceList.innerHTML = faces.map((face, index) => {
    const active = state.selectedWall?.lotId === id && state.selectedWall.zoneIndex === state.selectedShapeZone && state.selectedWall.faceKey === face.key;
    const offset = averageFaceOffset(state.wallEdits.get(faceContext.editKey) || {}, face);
    return `<button type="button" class="model-face-option${active ? " is-selected" : ""}" data-face-key="${face.key}" aria-pressed="${active}"><strong>${`Cara ${String(index + 1).padStart(2, "0")}`}</strong><span>${nf1.format(face.length)} m · ${offset >= 0 ? "+" : ""}${nf1.format(offset)} m</span></button>`;
  }).join("");
  ui.modelFaceList.querySelectorAll("[data-face-key]").forEach((button) => button.addEventListener("click", () => {
    const face = faces.find((item) => item.key === button.dataset.faceKey);
    const first = face?.edges[0];
    state.selectedWall = face ? { lotId: id, editKey: faceContext.editKey, zoneIndex: state.selectedShapeZone, faceKey: face.key, edgeKeys: face.edges.map((edge) => edge.key), polygonIndex: first.polygonIndex, edgeIndex: first.edgeIndex } : null;
    state.modelDimension = face ? { lotId: id, value: face.length } : null;
    renderModelEditor(); setSelectedFaceOverlay();
    if (face) ui.modelDimension.textContent = nf1.format(face.length);
  }));
  const selectedFace = faces.find((face) => state.selectedWall?.lotId === id && state.selectedWall.zoneIndex === state.selectedShapeZone && state.selectedWall.faceKey === face.key);
  ui.modelFaceControls.classList.toggle("is-hidden", !selectedFace);
  if (selectedFace) {
    const faceIndex = faces.indexOf(selectedFace);
    const offset = averageFaceOffset(state.wallEdits.get(faceContext.editKey) || {}, selectedFace);
    ui.modelSelectedFace.textContent = `Cara ${String(faceIndex + 1).padStart(2, "0")}`;
    ui.modelSelectedFaceLength.textContent = `${nf1.format(selectedFace.length)} m · lado completo`;
    ui.modelFaceOffset.value = String(offset); ui.modelFaceOffsetNumber.value = String(Number(offset.toFixed(1)));
    ui.modelFaceLimitHint.textContent = "El deslizador respeta el área ocupable y el contorno del lote.";
  }
  setSelectedFaceOverlay();
}

function applyWallOffsetEdit(id, desiredValue) {
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  if (!model) return null;
  const context = modelFaceContext(model, state.selectedWall?.zoneIndex || 0);
  const before = { ...(state.pendingWallControl?.editKey === context.editKey ? state.pendingWallControl.beforeOffsets : state.wallEdits.get(context.editKey) || {}) };
  const base = context.base;
  const face = buildEditableFaceGroups(base).find((item) => item.key === (state.pendingWallControl?.faceKey || state.selectedWall?.faceKey));
  if (!face) return null;
  const result = constrainWallFaceOffsets(model, base, face, before, desiredValue);
  const offsets = result.offsets;
  if (Object.keys(offsets).length) state.wallEdits.set(context.editKey, offsets); else state.wallEdits.delete(context.editKey);
  updateCalculation();
  return result.value;
}

function beginWallControlEdit() {
  if (!state.selectedWall) return;
  const offsets = state.wallEdits.get(state.selectedWall.editKey) || {};
  const model = state.modelInputs.find((item) => String(item.values.lotId) === state.selectedWall.lotId);
  const face = model && buildEditableFaceGroups(modelFaceContext(model, state.selectedWall.zoneIndex).base).find((item) => item.key === state.selectedWall.faceKey);
  if (!face) return;
  state.pendingWallControl = { ...state.selectedWall, beforeOffsets: { ...offsets }, before: averageFaceOffset(offsets, face) };
}

function changeWallControl(event) {
  if (!state.selectedWall) return;
  if (!state.pendingWallControl) beginWallControlEdit();
  const next = applyWallOffsetEdit(state.selectedWall.lotId, event.currentTarget.value);
  if (next != null) event.currentTarget.value = String(Number(next.toFixed(1)));
}

function commitWallControlEdit() {
  const pending = state.pendingWallControl; state.pendingWallControl = null;
  if (!pending) return;
  const model = state.modelInputs.find((item) => String(item.values.lotId) === pending.lotId);
  const face = model && buildEditableFaceGroups(modelFaceContext(model, pending.zoneIndex).base).find((item) => item.key === pending.faceKey);
  const afterOffsets = { ...(state.wallEdits.get(pending.editKey) || {}) };
  const after = face ? averageFaceOffset(afterOffsets, face) : pending.before;
  if (Math.abs(after - pending.before) < 0.02) return;
  state.modelEditUndo.push({ type: "wall-group", id: pending.lotId, editKey: pending.editKey, before: pending.beforeOffsets, after: afterOffsets });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons();
}

function changeNumericWallControl(event) {
  changeWallControl(event);
  commitWallControlEdit();
}

function syncModelEditHistoryButtons() {
  if (ui.undoModelEdit) ui.undoModelEdit.disabled = state.modelEditUndo.length === 0;
  if (ui.redoModelEdit) ui.redoModelEdit.disabled = state.modelEditRedo.length === 0;
}

function applyModelEdit(entry, direction) {
  const value = direction === "undo" ? entry.before : entry.after;
  if (entry.type === "lot-reset") {
    if (value?.height == null) state.modelEdits.delete(entry.id);
    else state.modelEdits.set(entry.id, value.height);
    if (value?.walls && Object.keys(value.walls).length) state.wallEdits.set(entry.id, { ...value.walls });
    else state.wallEdits.delete(entry.id);
    for (const key of [...state.wallEdits.keys()].filter((key) => key.startsWith(`${entry.id}@`))) state.wallEdits.delete(key);
    for (const [key, offsets] of Object.entries(value?.zoneWalls || {})) state.wallEdits.set(key, { ...offsets });
    if (value?.shape && value.shape.type !== "lot") state.modelShapes.set(entry.id, { ...value.shape }); else state.modelShapes.delete(entry.id);
    if (value?.zones?.length) state.shapeZones.set(entry.id, value.zones.map((zone) => ({ ...zone }))); else state.shapeZones.delete(entry.id);
    if (value?.uses && Object.keys(value.uses).length) state.floorUses.set(entry.id, { ...value.uses }); else state.floorUses.delete(entry.id);
    if (value?.parcel && Object.keys(value.parcel).length) state.parcelFaces.set(entry.id, { ...value.parcel }); else state.parcelFaces.delete(entry.id);
  } else if (entry.type === "shape-zones") {
    if (value?.length) state.shapeZones.set(entry.id, value.map((zone) => ({ ...zone }))); else state.shapeZones.delete(entry.id);
    if (entry.zoneWallKey) {
      const offsets = direction === "undo" ? entry.beforeWall : entry.afterWall;
      if (offsets && Object.keys(offsets).length) state.wallEdits.set(entry.zoneWallKey, { ...offsets });
      else state.wallEdits.delete(entry.zoneWallKey);
    }
  } else if (entry.type === "floor-use") {
    if (value && Object.keys(value).length) state.floorUses.set(entry.id, { ...value }); else state.floorUses.delete(entry.id);
  } else if (entry.type === "parcel-face") {
    if (value && Object.keys(value).length) state.parcelFaces.set(entry.id, structuredClone(value)); else state.parcelFaces.delete(entry.id);
    applyActiveParcelFront(entry.id);
  } else if (entry.type === "morphology") {
    if (value?.shape && value.shape.type !== "lot") state.modelShapes.set(entry.id, { ...value.shape }); else state.modelShapes.delete(entry.id);
    if (value?.walls && Object.keys(value.walls).length) state.wallEdits.set(entry.id, { ...value.walls }); else state.wallEdits.delete(entry.id);
  } else if (entry.type === "wall") {
    const offsets = { ...(state.wallEdits.get(entry.id) || {}) };
    if (value == null) delete offsets[entry.edgeKey]; else offsets[entry.edgeKey] = value;
    if (Object.keys(offsets).length) state.wallEdits.set(entry.id, offsets); else state.wallEdits.delete(entry.id);
  } else if (entry.type === "wall-group") {
    const editKey = entry.editKey || entry.id;
    if (value && Object.keys(value).length) state.wallEdits.set(editKey, { ...value }); else state.wallEdits.delete(editKey);
  } else if (value == null) state.modelEdits.delete(entry.id);
  else state.modelEdits.set(entry.id, value);
  updateMapModel(state.modelInputs);
}

function undoModelEdit() {
  const entry = state.modelEditUndo.pop();
  if (!entry) return;
  applyModelEdit(entry, "undo"); state.modelEditRedo.push(entry); persistModelEdits(); syncModelEditHistoryButtons();
}

function redoModelEdit() {
  const entry = state.modelEditRedo.pop();
  if (!entry) return;
  applyModelEdit(entry, "redo"); state.modelEditUndo.push(entry); persistModelEdits(); syncModelEditHistoryButtons();
}

function restoreSelectedLotModel() {
  const id = String(state.selectedFeature?.properties.id || "");
  if (!id) return;
  const before = {
    height: state.modelEdits.has(id) ? state.modelEdits.get(id) : null,
    walls: { ...(state.wallEdits.get(id) || {}) },
    zoneWalls: Object.fromEntries([...state.wallEdits].filter(([key]) => key.startsWith(`${id}@`)).map(([key, offsets]) => [key, { ...offsets }])),
    shape: state.modelShapes.has(id) ? { ...state.modelShapes.get(id) } : null,
    zones: (state.shapeZones.get(id) || []).map((zone) => ({ ...zone })),
    uses: { ...(state.floorUses.get(id) || {}) },
    parcel: structuredClone(state.parcelFaces.get(id) || {}),
  };
  if (before.height == null && !Object.keys(before.walls).length && !Object.keys(before.zoneWalls).length && !before.shape && !before.zones.length && !Object.keys(before.uses).length && !Object.keys(before.parcel).length) return;
  state.modelEdits.delete(id);
  state.wallEdits.delete(id);
  for (const key of Object.keys(before.zoneWalls)) state.wallEdits.delete(key);
  state.modelShapes.delete(id);
  state.shapeZones.delete(id);
  state.floorUses.delete(id);
  state.parcelFaces.delete(id);
  detectRoads(state.selectedFeature);
  state.selectedWall = null;
  state.modelDimension = null;
  updateCalculation();
  state.modelEditUndo.push({ type: "lot-reset", id, before, after: null });
  state.modelEditRedo = [];
  persistModelEdits();
  syncModelEditHistoryButtons();
}

function applyModelMorphology(type, orientation = null) {
  const id = String(state.selectedFeature?.properties.id || "");
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  if (!model) return;
  if (state.selectedShapeZone > 0) {
    const zones = (state.shapeZones.get(id) || []).map((zone) => ({ ...zone }));
    const index = state.selectedShapeZone - 1;
    const previous = zones[index];
    if (!previous) return;
    const nextZone = { ...previous, type, orientation: clamp(Number(orientation ?? previous.orientation) || 0, 0, 3) };
    const footprint = buildModelBaseFootprint(model, nextZone);
    const maxArea = model.values.lotArea * Math.max(0.05, 1 - model.values.freeArea / 100);
    if (!footprint || !footprintRespectsLotAndArea(footprint, model.feature.geometry, maxArea, footprint)) {
      ui.modelFaceLimitHint.textContent = "La forma no cabe dentro del lote seleccionado.";
      return;
    }
    const before = zones.map((zone) => ({ ...zone }));
    const zoneWallKey = `${id}@${previous.id}`;
    const beforeWall = { ...(state.wallEdits.get(zoneWallKey) || {}) };
    zones[index] = nextZone;
    state.shapeZones.set(id, zones);
    state.wallEdits.delete(zoneWallKey);
    state.modelEditUndo.push({ type: "shape-zones", id, before, after: zones.map((zone) => ({ ...zone })), zoneWallKey, beforeWall, afterWall: {} });
    state.modelEditRedo = [];
    persistModelEdits(); syncModelEditHistoryButtons(); updateCalculation();
    return;
  }
  const current = state.modelShapes.get(id) || { type: "lot", orientation: 0 };
  const hadShape = state.modelShapes.has(id);
  const next = { type, orientation: clamp(Number(orientation ?? current.orientation) || 0, 0, 3) };
  if (type !== "lot" && !morphologyTemplate(type)) return;
  if (type === current.type && next.orientation === current.orientation) return;
  const before = { shape: { ...current }, walls: { ...(state.wallEdits.get(id) || {}) } };
  state.modelShapes.set(id, next);
  if (type !== current.type || next.orientation !== current.orientation) state.wallEdits.delete(id);
  const base = buildModelBaseFootprint(model);
  const maxFootprintArea = model.values.lotArea * Math.max(0.05, 1 - model.values.freeArea / 100);
  if (!base || !footprintRespectsLotAndArea(base, model.feature.geometry, maxFootprintArea, base)) {
    if (hadShape) state.modelShapes.set(id, current); else state.modelShapes.delete(id);
    if (Object.keys(before.walls).length) state.wallEdits.set(id, before.walls); else state.wallEdits.delete(id);
    renderModelEditor();
    ui.modelFaceLimitHint.textContent = "Esta forma no cabe en el lote con la ocupación permitida. Prueba otra orientación o forma.";
    return;
  }
  state.selectedWall = null;
  state.modelDimension = null;
  updateCalculation();
  const after = { shape: { ...next }, walls: { ...(state.wallEdits.get(id) || {}) } };
  state.modelEditUndo.push({ type: "morphology", id, before, after });
  state.modelEditRedo = [];
  persistModelEdits(); syncModelEditHistoryButtons();
}

function editShapeZoneRange(field, rawValue) {
  const id = String(state.selectedFeature?.properties.id || "");
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  const zones = (state.shapeZones.get(id) || []).map((zone) => ({ ...zone }));
  const index = state.selectedShapeZone - 1;
  if (!model || !zones[index]) return;
  const before = zones.map((zone) => ({ ...zone }));
  const max = Math.ceil(modelCurrentHeight(model) / model.values.floorHeight);
  zones[index][field] = clamp(Math.round(Number(rawValue) || 1), 1, max);
  if (zones[index].start > zones[index].end || zones.some((zone, other) => other !== index && zone.start <= zones[index].end && zone.end >= zones[index].start)) {
    renderModelEditor(); return;
  }
  state.shapeZones.set(id, zones);
  state.modelEditUndo.push({ type: "shape-zones", id, before, after: zones.map((zone) => ({ ...zone })) });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons(); updateCalculation();
}

function applyModelShapeParameter(key, rawValue) {
  const id = String(state.selectedFeature?.properties.id || "");
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  if (!model) return;
  const zones = (state.shapeZones.get(id) || []).map((zone) => ({ ...zone }));
  const current = state.selectedShapeZone ? zones[state.selectedShapeZone - 1] : state.modelShapes.get(id) || { type: "lot", orientation: 0 };
  if (!current || current.type === "lot") return;
  const next = { ...current, [key]: clamp(Number(rawValue) || 10, 10, 70) };
  const footprint = buildModelBaseFootprint(model, next);
  const maxArea = model.values.lotArea * Math.max(0.05, 1 - model.values.freeArea / 100);
  if (!footprint || !footprintRespectsLotAndArea(footprint, model.feature.geometry, maxArea, footprint)) {
    renderModelEditor(); return;
  }
  if (state.selectedShapeZone) {
    const before = zones.map((zone) => ({ ...zone }));
    const zoneWallKey = `${id}@${current.id}`;
    const beforeWall = { ...(state.wallEdits.get(zoneWallKey) || {}) };
    zones[state.selectedShapeZone - 1] = next;
    state.shapeZones.set(id, zones);
    state.wallEdits.delete(zoneWallKey);
    state.modelEditUndo.push({ type: "shape-zones", id, before, after: zones.map((zone) => ({ ...zone })), zoneWallKey, beforeWall, afterWall: {} });
  } else {
    const before = { shape: { ...current }, walls: { ...(state.wallEdits.get(id) || {}) } };
    state.modelShapes.set(id, next);
    state.wallEdits.delete(id);
    state.modelEditUndo.push({ type: "morphology", id, before, after: { shape: { ...next }, walls: {} } });
  }
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons(); updateCalculation();
}

function applyActiveParcelFront(id) {
  if (String(state.selectedFeature?.properties.id || "") !== id) return;
  const front = Object.values(state.parcelFaces.get(id) || {}).find((entry) => entry.active);
  if (front) {
    ui.roadSelect.value = "manual";
    ui.roadWidth.readOnly = false;
    ui.roadWidth.value = front.width;
    ui.retreat.value = front.retreat;
    ui.roadSourceMeta.textContent = "Frente configurado por cara del predio en PREDIAL · Lote.";
  } else {
    ui.retreat.value = Number(state.selectedFeature.properties.retiro_frontal) > 0 ? Number(state.selectedFeature.properties.retiro_frontal) : 0;
    detectRoads(state.selectedFeature);
  }
  updateCalculation();
}

function saveParcelFaceSetting(changes) {
  const id = String(state.selectedFeature?.properties.id || "");
  const key = state.selectedParcelFace;
  if (!id || !key) return;
  const before = structuredClone(state.parcelFaces.get(id) || {});
  const after = structuredClone(before);
  if (changes.active) for (const setting of Object.values(after)) setting.active = false;
  after[key] = { width: clamp(Number(ui.modelParcelRoadWidth.value) || 8, 6, 80), retreat: clamp(Number(ui.modelParcelRetreat.value) || 0, 0, 30), ...(after[key] || {}), ...changes };
  state.parcelFaces.set(id, after);
  state.modelEditUndo.push({ type: "parcel-face", id, before, after });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons();
  applyActiveParcelFront(id);
}

function selectModelEditorTab(tab) {
  state.modelEditorTab = tab;
  document.querySelectorAll("[data-model-tab]").forEach((button) => {
    const active = button.dataset.modelTab === tab;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-model-panel]").forEach((panel) => panel.classList.toggle("is-hidden", panel.dataset.modelPanel !== tab));
}

function finishModelDrag() {
  const drag = state.activeModelDrag;
  if (!drag) return;
  state.activeModelDrag = null;
  if (drag.dragPanEnabled) map.dragPan.enable();
  if (drag.boxZoomEnabled) map.boxZoom.enable();
  if (drag.rotateEnabled) map.dragRotate.enable();
  if (drag.moved) {
    state.suppressNextMapClick = true;
    window.setTimeout(() => { state.suppressNextMapClick = false; }, 0);
  }
  const after = drag.type === "wall" ? averageFaceOffset(state.wallEdits.get(drag.editKey) || {}, drag.face) : state.modelEdits.get(drag.id);
  if (drag.type === "wall" && Math.abs(after - drag.startValue) >= 0.02) {
    state.modelEditUndo.push({ type: "wall-group", id: drag.id, editKey: drag.editKey, before: drag.startOffsets, after: { ...(state.wallEdits.get(drag.editKey) || {}) } });
    state.modelEditRedo = [];
  } else if (drag.type !== "wall" && Number.isFinite(after) && Math.abs(after - drag.startValue) >= 0.02) {
    state.modelEditUndo.push({ type: drag.type, id: drag.id, edgeKey: drag.edgeKey, before: drag.beforeOverride, after });
    state.modelEditRedo = [];
  } else if (drag.type === "wall") {
    const offsets = { ...(drag.startOffsets || {}) };
    if (Object.keys(offsets).length) state.wallEdits.set(drag.editKey, offsets); else state.wallEdits.delete(drag.editKey);
  } else if (drag.beforeOverride == null) {
    state.modelEdits.delete(drag.id);
  }
  persistModelEdits();
  syncModelEditHistoryButtons();
}

function clearMapModel() {
  if (!state.ready) return;
  map.getSource("cabida-model")?.setData(emptyCollection());
  map.getSource("epap-model")?.setData(emptyCollection());
  state.modelInputs = [];
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
    pitch: state.allLots3dActive ? 60 : 0,
    bearing: state.allLots3dActive ? -24 : 0,
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
    pitch: state.allLots3dActive ? 60 : 0, bearing: state.allLots3dActive ? -24 : 0, duration: animate ? 900 : 0,
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

function setDetailPanel(open) {
  ui.detailPanel.classList.toggle("is-open", open);
  ui.detailPanel.inert = !open;
  document.querySelector(".map-shell").classList.toggle("has-detail-open", open);
  ui.togglePanel.setAttribute("aria-expanded", String(open));
  if (open) { setOpacityPanel(false); ui.closeDetail.focus({ preventScroll: true }); }
}
function setOpacityPanel(open) {
  $("opacityPanel").classList.toggle("is-hidden", !open);
  $("opacityButton").setAttribute("aria-expanded", String(open));
}
$("opacityButton").addEventListener("click", () => {
  const open = $("opacityPanel").classList.contains("is-hidden");
  ui.layersPanel.classList.add("is-hidden");
  ui.layersButton.setAttribute("aria-expanded", "false");
  setOpacityPanel(open);
});
$("closeOpacity").addEventListener("click", () => setOpacityPanel(false));
ui.layersButton.addEventListener("click", () => {
  setOpacityPanel(false);
  const open = ui.layersPanel.classList.toggle("is-hidden") === false;
  ui.layersButton.setAttribute("aria-expanded", String(open));
});
ui.closeLayers.addEventListener("click", () => {
  ui.layersPanel.classList.add("is-hidden");
  ui.layersButton.setAttribute("aria-expanded", "false");
});
ui.togglePanel.addEventListener("click", () => {
  if (!ui.modelEditor.classList.contains("is-hidden")) return;
  setDetailPanel(!ui.detailPanel.classList.contains("is-open"));
});
ui.closeDetail.addEventListener("click", () => {
  setDetailPanel(false);
  ui.togglePanel.focus({ preventScroll: true });
});
ui.tilt3d.addEventListener("click", () => {
  const activate = !state.allLots3dActive;
  setAllLots3d(activate);
  if (!activate) {
    map.easeTo({ pitch: 0, bearing: 0, duration: 650 });
  } else if (state.selectedFeatures.length) {
    focusFeatures(state.selectedFeatures, true);
  } else {
    map.easeTo({ pitch: 60, bearing: -24, duration: 650 });
  }
});
ui.flat2d.addEventListener("click", () => {
  setAllLots3d(false);
  map.easeTo({ pitch: 0, bearing: 0, duration: 650 });
});
$("modifyPolygonButton").addEventListener("click", () => {
  if (!state.selectedFeature || state.selectedFeatures.length !== 1) return;
  selectModelEditorTab("lot");
  state.modelEditorOpen = true;
  renderModelEditor();
});
$("resetNorthButton").addEventListener("click", () => map.easeTo({ bearing: 0, duration: 420 }));
$("zoomInButton").addEventListener("click", () => map.zoomIn({ duration: 280 }));
$("zoomOutButton").addEventListener("click", () => map.zoomOut({ duration: 280 }));
map.on("moveend", () => {
  $("resetNorthButton").style.setProperty("--map-bearing", `${-map.getBearing()}deg`);
  const is3d = state.allLots3dActive;
  ui.tilt3d.classList.toggle("is-active", is3d);
  ui.flat2d.classList.toggle("is-active", !is3d);
  ui.tilt3d.setAttribute("aria-pressed", String(is3d));
  ui.flat2d.setAttribute("aria-pressed", String(!is3d));
});

function setAllLots3d(active) {
  state.allLots3dActive = Boolean(active);
  if (map.getLayer("lots-3d")) map.setLayoutProperty("lots-3d", "visibility", state.allLots3dActive ? "visible" : "none");
  if (map.getLayer("lots-3d-outline")) map.setLayoutProperty("lots-3d-outline", "visibility", state.allLots3dActive ? "visible" : "none");
  if (map.getLayer("lots-fill")) map.setLayoutProperty("lots-fill", "visibility", state.allLots3dActive ? "none" : "visible");
}

function closeLotEditor() {
  finishModelDrag();
  state.pushPullMode = false; state.selectedWall = null; state.modelDimension = null;
  ui.pushPull.classList.remove("is-active"); ui.pushPull.setAttribute("aria-pressed", "false");
  document.querySelector(".map-shell").classList.remove("push-pull-active");
  state.modelEditorOpen = false;
  ui.modelEditor.classList.add("is-hidden"); ui.modelEditorBackdrop.classList.add("is-hidden"); setSelectedFaceOverlay(); updateMapModel(state.modelInputs);
}
ui.closeModelEditor.addEventListener("click", closeLotEditor);
document.querySelectorAll("[data-model-tab]").forEach((button) => button.addEventListener("click", () => selectModelEditorTab(button.dataset.modelTab)));
ui.modelShapeOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-model-shape]");
  if (button) applyModelMorphology(button.dataset.modelShape);
});
ui.modelShapeOrientation.addEventListener("change", () => {
  const id = String(state.selectedFeature?.properties.id || "");
  const current = state.selectedShapeZone ? state.shapeZones.get(id)?.[state.selectedShapeZone - 1] : state.modelShapes.get(id) || { type: "lot", orientation: 0 };
  applyModelMorphology(current.type, ui.modelShapeOrientation.value);
});
ui.modelShapeZone.addEventListener("change", () => {
  state.selectedShapeZone = Number(ui.modelShapeZone.value) || 0;
  state.selectedWall = null;
  renderModelEditor();
});
ui.modelAddShapeZone.addEventListener("click", () => {
  const id = String(state.selectedFeature?.properties.id || "");
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  if (!model) return;
  const before = (state.shapeZones.get(id) || []).map((zone) => ({ ...zone }));
  const floorCount = Math.ceil(modelCurrentHeight(model) / model.values.floorHeight);
  const floor = Array.from({ length: floorCount }, (_, index) => floorCount - index).find((value) => !before.some((zone) => value >= zone.start && value <= zone.end));
  if (!floor) return;
  const after = [...before, { id: Date.now(), start: floor, end: floor, type: "lot", orientation: 0 }];
  state.shapeZones.set(id, after);
  state.selectedShapeZone = after.length;
  state.modelEditUndo.push({ type: "shape-zones", id, before, after: after.map((zone) => ({ ...zone })) });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons(); updateCalculation();
});
ui.modelRemoveShapeZone.addEventListener("click", () => {
  const id = String(state.selectedFeature?.properties.id || "");
  const before = (state.shapeZones.get(id) || []).map((zone) => ({ ...zone }));
  if (!state.selectedShapeZone || !before.length) return;
  const zoneWallKey = `${id}@${before[state.selectedShapeZone - 1].id}`;
  const beforeWall = { ...(state.wallEdits.get(zoneWallKey) || {}) };
  const after = before.filter((_, index) => index !== state.selectedShapeZone - 1);
  if (after.length) state.shapeZones.set(id, after); else state.shapeZones.delete(id);
  state.wallEdits.delete(zoneWallKey);
  state.selectedShapeZone = 0;
  state.modelEditUndo.push({ type: "shape-zones", id, before, after, zoneWallKey, beforeWall, afterWall: {} });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons(); updateCalculation();
});
ui.modelShapeStart.addEventListener("change", (event) => editShapeZoneRange("start", event.currentTarget.value));
ui.modelShapeEnd.addEventListener("change", (event) => editShapeZoneRange("end", event.currentTarget.value));
ui.modelShapeParams.addEventListener("change", (event) => {
  const input = event.target.closest("[data-shape-param]");
  if (input) applyModelShapeParameter(input.dataset.shapeParam, input.value);
});
ui.modelFloorUses.addEventListener("change", (event) => {
  const select = event.target.closest("[data-floor-use]");
  if (!select) return;
  const id = String(state.selectedFeature?.properties.id || "");
  const before = { ...(state.floorUses.get(id) || {}) };
  const after = { ...before };
  if (select.value === "residencial") delete after[select.dataset.floorUse];
  else after[select.dataset.floorUse] = select.value;
  if (Object.keys(after).length) state.floorUses.set(id, after); else state.floorUses.delete(id);
  state.modelEditUndo.push({ type: "floor-use", id, before, after });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons(); updateMapModel(state.modelInputs);
});
ui.modelParcelFaces.addEventListener("click", (event) => {
  const button = event.target.closest("[data-parcel-face]");
  if (!button) return;
  state.selectedParcelFace = button.dataset.parcelFace;
  renderModelEditor();
});
ui.modelParcelActiveFront.addEventListener("change", () => saveParcelFaceSetting({ active: ui.modelParcelActiveFront.checked }));
ui.modelParcelRoadWidth.addEventListener("change", () => saveParcelFaceSetting({ width: clamp(Number(ui.modelParcelRoadWidth.value) || 8, 6, 80) }));
ui.modelParcelRetreat.addEventListener("change", () => saveParcelFaceSetting({ retreat: clamp(Number(ui.modelParcelRetreat.value) || 0, 0, 30) }));
ui.modelProgramUse.addEventListener("change", () => {
  ui.use.value = ui.modelProgramUse.value;
  state.currentUse = ui.modelProgramUse.value;
  updateCalculation();
});
ui.modelFaceOffset.addEventListener("pointerdown", beginWallControlEdit);
ui.modelFaceOffset.addEventListener("focus", beginWallControlEdit);
ui.modelFaceOffsetNumber.addEventListener("focus", beginWallControlEdit);
ui.modelFaceOffset.addEventListener("input", changeWallControl);
ui.modelFaceOffset.addEventListener("change", commitWallControlEdit);
ui.modelFaceOffsetNumber.addEventListener("change", changeNumericWallControl);
ui.modelFloorDown.addEventListener("click", () => setModelFloorCount(-1));
ui.modelFloorUp.addEventListener("click", () => setModelFloorCount(1));
ui.restoreLotModel.addEventListener("click", restoreSelectedLotModel);

map.on("mousedown", (event) => {
  if (!state.pushPullMode || !state.selectedFeature || event.originalEvent?.button !== 0) return;
  const wall = raycastEditableWall(event.point);
  if (wall) {
    const id = String(wall.hit.properties.lotId);
    const wallFloor = Number(wall.hit.properties.floor) || 1;
    const zoneIndex = modelZoneIndexForFloor(id, wallFloor);
    const edgeKey = `${wall.polygonIndex}:${wall.edgeIndex}`;
    const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
    const context = model && modelFaceContext(model, zoneIndex);
    const base = context?.base;
    const face = base && buildEditableFaceGroups(base).find((item) => item.edges.some((edge) => edge.key === edgeKey));
    if (!face) return;
    const dragAxis = projectFaceDragAxis(base, face, ((Number(wall.hit.properties.base) || 0) + (Number(wall.hit.properties.height) || 0)) / 2) || wall;
    const offsets = state.wallEdits.get(context.editKey) || {};
    const currentValue = averageFaceOffset(offsets, face);
    state.selectedShapeZone = zoneIndex;
    selectModelEditorTab("shape");
    state.selectedWall = { lotId: id, editKey: context.editKey, zoneIndex, faceKey: face.key, edgeKeys: face.edges.map((edge) => edge.key), polygonIndex: face.edges[0].polygonIndex, edgeIndex: face.edges[0].edgeIndex };
    state.modelDimension = { lotId: id, value: face.length };
    state.activeModelDrag = {
      type: "wall", id, editKey: context.editKey, zoneIndex, face, faceKey: face.key, edgeKey, startX: event.point.x, startY: event.point.y,
      startValue: currentValue, beforeOverride: offsets[edgeKey], startOffsets: { ...offsets }, normalScreen: dragAxis.normalScreen,
      pxPerMeter: dragAxis.pxPerMeter, edgeLength: face.length, polygonIndex: wall.polygonIndex,
      dragPanEnabled: map.dragPan.isEnabled(), boxZoomEnabled: map.boxZoom.isEnabled(), rotateEnabled: map.dragRotate.isEnabled(), moved: false,
    };
    event.originalEvent.preventDefault();
    map.dragPan.disable(); map.boxZoom.disable(); map.dragRotate.disable();
    map.getCanvas().style.cursor = "move";
    renderModelEditor();
    return;
  }
});

map.on("mousemove", (event) => {
  const drag = state.activeModelDrag;
  if (!drag) return;
  const model = state.modelInputs.find((item) => String(item.values.lotId) === drag.id);
  if (!model) return;
  if (drag.type === "wall") {
    const dx = event.point.x - drag.startX; const dy = event.point.y - drag.startY;
    const deltaPixels = dx * drag.normalScreen[0] + dy * drag.normalScreen[1];
    if (Math.abs(deltaPixels) > 2) drag.moved = true;
    const baseFootprint = modelFaceContext(model, drag.zoneIndex).base;
    const desired = clamp(Math.round((drag.startValue + deltaPixels / drag.pxPerMeter) * 10) / 10, -25, 25);
    const { offsets } = constrainWallFaceOffsets(model, baseFootprint, drag.face, drag.startOffsets, desired);
    if (Object.keys(offsets).length) state.wallEdits.set(drag.editKey, offsets); else state.wallEdits.delete(drag.editKey);
    state.modelDimension = { lotId: drag.id, value: drag.edgeLength };
    updateCalculation();
    return;
  }
});

map.on("mouseup", finishModelDrag);
window.addEventListener("mouseup", finishModelDrag);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (state.modelEditorOpen) closeLotEditor();
    else {
      setDetailPanel(false);
      setOpacityPanel(false);
      ui.layersPanel.classList.add("is-hidden");
      ui.layersButton.setAttribute("aria-expanded", "false");
    }
  }
});

ui.satelliteOpacity.addEventListener("input", () => {
  state.satelliteOpacity = 1 - Number(ui.satelliteOpacity.value) / 100;
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
  if (ui.modelProgramUse) ui.modelProgramUse.value = state.currentUse;
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
