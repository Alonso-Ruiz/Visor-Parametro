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
  fillOpacity: 0.82,
  satelliteOpacity: 0.5,
  currentUse: "multifamiliar",
  lastModel: null,
  pushPullMode: false,
  modelEditorOpen: false,
  modelPreviewActive: false,
  modelPreviewLayerVisibility: null,
  modelEdits: loadSavedModelEdits(),
  wallEdits: loadSavedWallEdits(),
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
  map.addSource("pushpull-face", { type: "geojson", data: emptyCollection() });
  map.addLayer({ id: "pushpull-face", type: "fill-extrusion", source: "pushpull-face", paint: { "fill-extrusion-color": ["get", "color"], "fill-extrusion-base": ["get", "base"], "fill-extrusion-height": ["get", "height"], "fill-extrusion-opacity": 0.82 } });
  if (typeof map.setLight === "function") map.setLight({ anchor: "map", color: "#ffffff", intensity: 0.58, position: [1.2, 205, 38] });

  const popup = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 12, className: "lot-popup" });
  map.on("mousemove", (event) => {
    const lotFeature = map.queryRenderedFeatures(event.point, { layers: ["lots-fill"] })[0];
    map.getCanvas().style.cursor = state.activeModelDrag ? (state.activeModelDrag.type === "wall" ? "move" : "ns-resize") : (state.pushPullMode ? "crosshair" : (lotFeature ? "pointer" : ""));
    if (!lotFeature) {
      popup.remove();
      return;
    }
    const lot = state.featureById.get(String(lotFeature.properties.id));
    if (lot) popup.setLngLat(event.lngLat).setHTML(`<b>Lote ${escapeHtml(lot.properties.cod_lote || lot.properties.id)}</b><br>${escapeHtml(lot.properties.zona)} · ${nf0.format(featureArea(lot))} m²`).addTo(map);
  });
  map.on("click", (event) => {
    if (state.suppressNextMapClick) { state.suppressNextMapClick = false; return; }
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

function persistModelEdits() {
  try { localStorage.setItem("sanborja-model-edits-v1", JSON.stringify([...state.modelEdits])); }
  catch (error) { console.warn("No se pudo guardar el modelo editado en este navegador.", error); }
  try { localStorage.setItem("sanborja-wall-edits-v1", JSON.stringify([...state.wallEdits])); }
  catch (error) { console.warn("No se pudieron guardar las paredes editadas en este navegador.", error); }
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
    ui.detailPanel.classList.remove("is-open");
    ui.detailEmpty.classList.remove("is-hidden");
    ui.detailContent.classList.add("is-hidden");
    clearMapModel();
    resetRoadHighlight();
    return;
  }

  state.selectedFeature = state.selectedFeatures.includes(feature) ? feature : state.selectedFeatures.at(-1);
  state.modelEditorOpen = state.selectedFeatures.length === 1;
  state.pushPullMode = state.selectedFeatures.length === 1;
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
  ui.pushPull.classList.toggle("is-active", state.pushPullMode);
  ui.pushPull.setAttribute("aria-pressed", String(state.pushPullMode));
  document.querySelector(".map-shell").classList.toggle("push-pull-active", state.pushPullMode);
  ui.detailEmpty.classList.add("is-hidden");
  ui.detailContent.classList.remove("is-hidden");
  if (window.matchMedia("(max-width: 760px)").matches) ui.detailPanel.classList.remove("is-open");
  else ui.detailPanel.classList.add("is-open");
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

function edgeNormalMeters(a, b, latitude, counterClockwise) {
  const dx = (b[0] - a[0]) * 111320 * Math.cos((latitude * Math.PI) / 180);
  const dy = (b[1] - a[1]) * 110540;
  const length = Math.hypot(dx, dy) || 1;
  return counterClockwise ? [dy / length, -dx / length] : [-dy / length, dx / length];
}

function ringSignedAreaMeters(ring) {
  const center = ring.reduce((sum, point) => [sum[0] + point[0] / ring.length, sum[1] + point[1] / ring.length], [0, 0]);
  const cosLat = Math.cos((center[1] * Math.PI) / 180);
  let area = 0;
  for (let i = 0; i < ring.length - 1; i += 1) {
    const ax = ring[i][0] * 111320 * cosLat; const ay = ring[i][1] * 110540;
    const bx = ring[i + 1][0] * 111320 * cosLat; const by = ring[i + 1][1] * 110540;
    area += ax * by - bx * ay;
  }
  return area / 2;
}

function applyWallOffsets(geometry, offsets = {}) {
  const transformRing = (ring, polygonIndex, isOuter) => {
    if (!isOuter || ring.length < 4) return ring.map((point) => [...point]);
    const points = ring.slice(0, -1); const ccw = ringSignedAreaMeters(ring) > 0;
    const moved = points.map((point, vertexIndex) => {
      const prevIndex = (vertexIndex - 1 + points.length) % points.length;
      const prevOffset = Number(offsets[`${polygonIndex}:${prevIndex}`]) || 0;
      const nextOffset = Number(offsets[`${polygonIndex}:${vertexIndex}`]) || 0;
      const prevNormal = edgeNormalMeters(points[prevIndex], point, point[1], ccw);
      const nextNormal = edgeNormalMeters(point, points[(vertexIndex + 1) % points.length], point[1], ccw);
      const count = (Math.abs(prevOffset) > 1e-8 ? 1 : 0) + (Math.abs(nextOffset) > 1e-8 ? 1 : 0);
      const divisor = count || 1;
      const dx = (prevNormal[0] * prevOffset + nextNormal[0] * nextOffset) / divisor;
      const dy = (prevNormal[1] * prevOffset + nextNormal[1] * nextOffset) / divisor;
      return [point[0] + dx / (111320 * Math.cos((point[1] * Math.PI) / 180)), point[1] + dy / 110540];
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

function footprintRespectsLotAndArea(geometry, lotGeometry, maxArea) {
  const lotPolygons = polygonsFromGeometry(lotGeometry);
  for (const polygon of polygonsFromGeometry(geometry)) {
    const ring = polygon[0];
    for (let index = 0; index < ring.length - 1; index += 1) {
      if (!lotPolygons.some((lotPolygon) => pointInGeoRing(ring[index], lotPolygon[0]))) return false;
    }
  }
  return featureArea({ geometry, properties: { area_m2: 0 } }) <= maxArea + 0.05;
}

function constrainWallOffset(model, baseGeometry, edgeKey, currentValue, desiredValue, offsets) {
  const maxArea = featureArea({ geometry: baseGeometry, properties: { area_m2: 0 } });
  const valid = (candidate) => {
    const next = { ...offsets, [edgeKey]: candidate };
    return footprintRespectsLotAndArea(applyWallOffsets(baseGeometry, next), model.feature.geometry, maxArea);
  };
  if (valid(desiredValue)) return desiredValue;
  let low = 0; let high = 1;
  for (let i = 0; i < 16; i += 1) {
    const mid = (low + high) / 2;
    if (valid(currentValue + (desiredValue - currentValue) * mid)) low = mid;
    else high = mid;
  }
  return currentValue + (desiredValue - currentValue) * low;
}

function updateMapModel(models) {
  if (!state.ready || !map.getSource("cabida-model")) return;
  state.modelInputs = models;
  const floors = [];
  const epapFeatures = [];
  let activeModelMetrics = null;
  for (const { feature, values } of models) {
    const footprintRatio = Math.max(0.05, 1 - values.freeArea / 100);
    const baseFootprint = scaleGeometry(feature.geometry, Math.sqrt(footprintRatio));
    const savedOffsets = state.wallEdits.get(values.lotId) || {};
    const validOffsets = {};
    for (const [edgeKey, rawOffset] of Object.entries(savedOffsets)) {
      const offset = Number(rawOffset);
      if (!Number.isFinite(offset)) continue;
      validOffsets[edgeKey] = constrainWallOffset({ feature, values }, baseFootprint, edgeKey, 0, offset, validOffsets);
    }
    if (Object.keys(validOffsets).length) state.wallEdits.set(values.lotId, validOffsets);
    else state.wallEdits.delete(values.lotId);
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
    const floorCount = Math.ceil(editedHeight / values.floorHeight);
    if (String(state.selectedFeature?.properties.id) === values.lotId) {
      const measuredFloors = Math.ceil(editedHeight / values.floorHeight);
      activeModelMetrics = { height: editedHeight, floors: measuredFloors, area: footprintArea * measuredFloors, footprintArea, freeArea: values.freeArea, authorizedCe: values.authorizedCe, ceMax: values.ceMax, ceBase: values.ceBase, edited: state.modelEdits.has(values.lotId), maxHeight: maxAllowedHeight, maxFloors: maxAllowedFloors };
    }
    for (let index = 0; index < floorCount; index += 1) {
      const gap = index ? 0.08 : 0;
      const floorBase = index * values.floorHeight + gap;
      const floorTop = Math.min((index + 1) * values.floorHeight, editedHeight);
      if (floorTop <= floorBase + 0.02) continue;
      floors.push({
        type: "Feature",
        properties: {
          lotId: values.lotId,
          editable: true,
          base: floorBase,
          height: floorTop,
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
  if (activeModelMetrics) {
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
    const polygons = hit.geometry?.type === "Polygon" ? [hit.geometry.coordinates]
      : hit.geometry?.type === "MultiPolygon" ? hit.geometry.coordinates : [];
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

function getModelFootprint(model) {
  const ratio = Math.max(0.05, 1 - model.values.freeArea / 100);
  const base = scaleGeometry(model.feature.geometry, Math.sqrt(ratio));
  return applyWallOffsets(base, state.wallEdits.get(model.values.lotId) || {});
}

function setSelectedFaceOverlay() {
  const source = map.getSource("pushpull-face");
  if (!source) return;
  const selected = state.selectedWall;
  const model = selected && state.modelInputs.find((item) => String(item.values.lotId) === selected.lotId);
  if (!model) { source.setData(emptyCollection()); return; }
  const geometry = getModelFootprint(model);
  const polygon = polygonsFromGeometry(geometry)[selected.polygonIndex];
  const ring = polygon?.[0];
  const a = ring?.[selected.edgeIndex]; const b = ring?.[selected.edgeIndex + 1];
  if (!a || !b) { source.setData(emptyCollection()); return; }
  const ccw = ringSignedAreaMeters(ring) > 0;
  const middleLat = (a[1] + b[1]) / 2;
  const normal = edgeNormalMeters(a, b, middleLat, ccw);
  const outside = (point) => [point[0] + normal[0] * 0.12 / (111320 * Math.cos((point[1] * Math.PI) / 180)), point[1] + normal[1] * 0.12 / 110540];
  const modelHeight = Number(state.modelEdits.get(selected.lotId) ?? Math.min(model.values.height, model.values.floors * model.values.floorHeight));
  source.setData({ type: "FeatureCollection", features: [{
    type: "Feature", properties: { base: 0, height: modelHeight, color: "#00b8ff" },
    geometry: { type: "Polygon", coordinates: [[a, b, outside(b), outside(a), a]] },
  }] });
}

function modelMaximumHeight(model) {
  if (!model) return 0.5;
  const normativeHeight = Number(model.values.height) || Number(model.values.floors) * Number(model.values.floorHeight);
  const footprintArea = featureArea({ geometry: getModelFootprint(model), properties: { area_m2: 0 } });
  const ceFloors = Math.floor((model.values.lotArea * model.values.authorizedCe) / Math.max(footprintArea, 0.01) + 1e-7);
  const heightFloors = Math.floor(normativeHeight / model.values.floorHeight + 1e-7);
  return Math.max(0.5, Math.min(normativeHeight, Math.max(1, Math.min(ceFloors, heightFloors)) * model.values.floorHeight));
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
  requestAnimationFrame(() => map.resize());
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
  const footprintArea = model ? featureArea({ geometry: getModelFootprint(model), properties: { area_m2: 0 } }) : null;
  ui.modelFootprintArea.textContent = footprintArea != null ? nf0.format(footprintArea) : "—";
  ui.modelRoofedArea.textContent = footprintArea != null ? nf0.format(footprintArea * currentFloors) : "—";
  ui.modelFreeArea.textContent = model ? nf1.format(model.values.freeArea) : "—";
  ui.modelRulesSummary.textContent = model
    ? `Zona ${state.selectedFeature.properties.zona} · C.E. base ${nf1.format(model.values.ceBase)} · C.E. autorizable ${nf1.format(model.values.authorizedCe)} · C.E. máximo ${nf1.format(model.values.ceMax)} · altura calculada ${nf1.format(model.values.height)} m. Máximo operativo: ${maxFloors} pisos sobre la huella actual.`
    : "Este lote no tiene parámetros edificatorios disponibles.";
  ui.restoreLotModel.disabled = !model || (!state.modelEdits.has(id) && !Object.keys(state.wallEdits.get(id) || {}).length);
  const edges = [];
  if (model) {
    const geometry = getModelFootprint(model);
    polygonsFromGeometry(geometry).forEach((polygon, polygonIndex) => {
      const ring = polygon[0];
      for (let edgeIndex = 0; ring && edgeIndex < ring.length - 1; edgeIndex += 1) {
        const a = ring[edgeIndex]; const b = ring[edgeIndex + 1];
        const midLat = (a[1] + b[1]) / 2;
        const length = Math.hypot((b[0] - a[0]) * 111320 * Math.cos((midLat * Math.PI) / 180), (b[1] - a[1]) * 110540);
        edges.push({ polygonIndex, edgeIndex, key: `${polygonIndex}:${edgeIndex}`, length });
      }
    });
  }
  ui.modelFaceCount.textContent = `${edges.length} caras`;
  ui.modelFaceList.innerHTML = edges.map((edge, index) => {
    const active = state.selectedWall?.lotId === id && state.selectedWall.edgeKey === edge.key;
    const offset = Number(state.wallEdits.get(id)?.[edge.key]) || 0;
    return `<button type="button" class="model-face-option${active ? " is-selected" : ""}" data-face-key="${edge.key}" aria-pressed="${active}"><strong>${`Cara ${String(index + 1).padStart(2, "0")}`}</strong><span>${nf1.format(edge.length)} m · ${offset >= 0 ? "+" : ""}${nf1.format(offset)} m</span></button>`;
  }).join("");
  ui.modelFaceList.querySelectorAll("[data-face-key]").forEach((button) => button.addEventListener("click", () => {
    const [polygonIndex, edgeIndex] = button.dataset.faceKey.split(":").map(Number);
    const edge = edges.find((item) => item.key === button.dataset.faceKey);
    state.selectedWall = { lotId: id, edgeKey: button.dataset.faceKey, polygonIndex, edgeIndex };
    state.modelDimension = edge ? { lotId: id, value: edge.length } : null;
    renderModelEditor(); setSelectedFaceOverlay();
    if (edge) ui.modelDimension.textContent = nf1.format(edge.length);
  }));
  const selectedEdge = edges.find((edge) => state.selectedWall?.lotId === id && state.selectedWall.edgeKey === edge.key);
  ui.modelFaceControls.classList.toggle("is-hidden", !selectedEdge);
  if (selectedEdge) {
    const offset = Number(state.wallEdits.get(id)?.[selectedEdge.key]) || 0;
    ui.modelSelectedFace.textContent = `Cara ${String(edges.indexOf(selectedEdge) + 1).padStart(2, "0")}`;
    ui.modelSelectedFaceLength.textContent = `${nf1.format(selectedEdge.length)} m`;
    ui.modelFaceOffset.value = String(offset); ui.modelFaceOffsetNumber.value = String(Number(offset.toFixed(1)));
    ui.modelFaceLimitHint.textContent = "El deslizador respeta el área ocupable y el contorno del lote.";
  }
  setSelectedFaceOverlay();
}

function applyWallOffsetEdit(id, edgeKey, desiredValue) {
  const model = state.modelInputs.find((item) => String(item.values.lotId) === id);
  if (!model) return null;
  const offsets = { ...(state.wallEdits.get(id) || {}) };
  const currentValue = Number(offsets[edgeKey]) || 0;
  const ratio = Math.max(0.05, 1 - model.values.freeArea / 100);
  const base = scaleGeometry(model.feature.geometry, Math.sqrt(ratio));
  const desired = clamp(Number(desiredValue) || 0, -25, 25);
  const next = constrainWallOffset(model, base, edgeKey, currentValue, desired, offsets);
  if (Math.abs(next) < 0.005) delete offsets[edgeKey]; else offsets[edgeKey] = next;
  if (Object.keys(offsets).length) state.wallEdits.set(id, offsets); else state.wallEdits.delete(id);
  updateCalculation();
  return next;
}

function beginWallControlEdit() {
  if (!state.selectedWall) return;
  const offsets = state.wallEdits.get(state.selectedWall.lotId) || {};
  state.pendingWallControl = { ...state.selectedWall, before: Number(offsets[state.selectedWall.edgeKey]) || 0 };
}

function changeWallControl(event) {
  if (!state.selectedWall) return;
  if (!state.pendingWallControl) beginWallControlEdit();
  const next = applyWallOffsetEdit(state.selectedWall.lotId, state.selectedWall.edgeKey, event.currentTarget.value);
  if (next != null) event.currentTarget.value = String(Number(next.toFixed(1)));
}

function commitWallControlEdit() {
  const pending = state.pendingWallControl; state.pendingWallControl = null;
  if (!pending) return;
  const after = Number(state.wallEdits.get(pending.lotId)?.[pending.edgeKey]) || 0;
  if (Math.abs(after - pending.before) < 0.02) return;
  state.modelEditUndo.push({ type: "wall", id: pending.lotId, edgeKey: pending.edgeKey, before: pending.before || null, after });
  state.modelEditRedo = []; persistModelEdits(); syncModelEditHistoryButtons();
}

function changeNumericWallControl(event) {
  changeWallControl(event);
  commitWallControlEdit();
}

function syncModelEditHistoryButtons() {
  ui.undoModelEdit.disabled = state.modelEditUndo.length === 0;
  ui.redoModelEdit.disabled = state.modelEditRedo.length === 0;
}

function applyModelEdit(entry, direction) {
  const value = direction === "undo" ? entry.before : entry.after;
  if (entry.type === "lot-reset") {
    if (value?.height == null) state.modelEdits.delete(entry.id);
    else state.modelEdits.set(entry.id, value.height);
    if (value?.walls && Object.keys(value.walls).length) state.wallEdits.set(entry.id, { ...value.walls });
    else state.wallEdits.delete(entry.id);
  } else if (entry.type === "wall") {
    const offsets = { ...(state.wallEdits.get(entry.id) || {}) };
    if (value == null) delete offsets[entry.edgeKey]; else offsets[entry.edgeKey] = value;
    if (Object.keys(offsets).length) state.wallEdits.set(entry.id, offsets); else state.wallEdits.delete(entry.id);
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
  };
  if (before.height == null && !Object.keys(before.walls).length) return;
  state.modelEdits.delete(id);
  state.wallEdits.delete(id);
  state.selectedWall = null;
  state.modelDimension = null;
  updateCalculation();
  state.modelEditUndo.push({ type: "lot-reset", id, before, after: null });
  state.modelEditRedo = [];
  persistModelEdits();
  syncModelEditHistoryButtons();
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
  const after = drag.type === "wall" ? Number(state.wallEdits.get(drag.id)?.[drag.edgeKey] || 0) : state.modelEdits.get(drag.id);
  if (Number.isFinite(after) && Math.abs(after - drag.startValue) >= 0.02) {
    state.modelEditUndo.push({ type: drag.type, id: drag.id, edgeKey: drag.edgeKey, before: drag.beforeOverride, after });
    state.modelEditRedo = [];
  } else if (drag.beforeOverride == null) {
    if (drag.type === "wall") {
      const offsets = { ...(state.wallEdits.get(drag.id) || {}) }; delete offsets[drag.edgeKey];
      if (Object.keys(offsets).length) state.wallEdits.set(drag.id, offsets); else state.wallEdits.delete(drag.id);
    } else state.modelEdits.delete(drag.id);
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

ui.pushPull.addEventListener("click", () => {
  if (!state.selectedFeature) {
    ui.modelInteractionHint.textContent = "Seleccione un lote antes de activar Push/Pull.";
    ui.mapModelHud.classList.remove("is-hidden");
    return;
  }
  state.pushPullMode = !state.pushPullMode;
  state.modelEditorOpen = state.pushPullMode && state.selectedFeatures.length === 1;
  ui.pushPull.classList.toggle("is-active", state.pushPullMode);
  ui.pushPull.setAttribute("aria-pressed", String(state.pushPullMode));
  document.querySelector(".map-shell").classList.toggle("push-pull-active", state.pushPullMode);
  if (state.pushPullMode) {
    map.easeTo({ pitch: Math.max(map.getPitch(), 55), duration: 450 });
    ui.modelInteractionHint.textContent = "Elija una cara en el panel y ajuste su cota, o arrástrela directamente.";
  }
  updateMapModel(state.modelInputs);
});
ui.closeModelEditor.addEventListener("click", () => {
  state.pushPullMode = false; state.selectedWall = null; state.modelDimension = null;
  ui.pushPull.classList.remove("is-active"); ui.pushPull.setAttribute("aria-pressed", "false");
  document.querySelector(".map-shell").classList.remove("push-pull-active");
  state.modelEditorOpen = false;
  ui.modelEditor.classList.add("is-hidden"); ui.modelEditorBackdrop.classList.add("is-hidden"); setSelectedFaceOverlay(); updateMapModel(state.modelInputs);
});
ui.undoModelEdit.addEventListener("click", undoModelEdit);
ui.redoModelEdit.addEventListener("click", redoModelEdit);
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
    const edgeKey = `${wall.polygonIndex}:${wall.edgeIndex}`;
    const offsets = state.wallEdits.get(id) || {};
    const currentValue = Number(offsets[edgeKey]) || 0;
    state.modelDimension = { lotId: id, value: wall.edgeLength };
    state.selectedWall = { lotId: id, edgeKey, polygonIndex: wall.polygonIndex, edgeIndex: wall.edgeIndex };
    state.activeModelDrag = {
      type: "wall", id, edgeKey, startX: event.point.x, startY: event.point.y,
      startValue: currentValue, beforeOverride: offsets[edgeKey], normalScreen: wall.normalScreen,
      pxPerMeter: wall.pxPerMeter, edgeLength: wall.edgeLength, polygonIndex: wall.polygonIndex,
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
    const footprintRatio = Math.max(0.05, 1 - model.values.freeArea / 100);
    const baseFootprint = scaleGeometry(model.feature.geometry, Math.sqrt(footprintRatio));
    const offsets = { ...(state.wallEdits.get(drag.id) || {}) };
    const desired = clamp(Math.round((drag.startValue + deltaPixels / drag.pxPerMeter) * 10) / 10, -25, 25);
    const nextValue = constrainWallOffset(model, baseFootprint, drag.edgeKey, drag.startValue, desired, offsets);
    offsets[drag.edgeKey] = nextValue;
    state.wallEdits.set(drag.id, offsets);
    state.modelDimension = { lotId: drag.id, value: drag.edgeLength };
    updateCalculation();
    return;
  }
});

map.on("mouseup", finishModelDrag);
window.addEventListener("mouseup", finishModelDrag);
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.pushPullMode) {
    finishModelDrag();
    state.pushPullMode = false;
    state.modelEditorOpen = false;
    ui.pushPull.classList.remove("is-active");
    ui.pushPull.setAttribute("aria-pressed", "false");
    document.querySelector(".map-shell").classList.remove("push-pull-active");
    ui.modelEditor.classList.add("is-hidden"); ui.modelEditorBackdrop.classList.add("is-hidden"); state.selectedWall = null; state.modelDimension = null; setSelectedFaceOverlay();
    updateMapModel(state.modelInputs);
    return;
  }
  if (!(event.ctrlKey || event.metaKey) || event.altKey) return;
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
  if (event.key.toLowerCase() === "z") {
    event.preventDefault(); event.shiftKey ? redoModelEdit() : undoModelEdit();
  } else if (event.key.toLowerCase() === "y") {
    event.preventDefault(); redoModelEdit();
  }
});

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
