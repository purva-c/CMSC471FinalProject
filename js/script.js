/* ═══════════════════════════════════════════════════
   MICHELIN GUIDE — THE GEOGRAPHY OF TASTE
   main.js  —  Scrollama + D3 choropleth + beeswarm
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ────────────────────────────────────────────────
  // STATIC DATA
  // ────────────────────────────────────────────────

  const COUNTRY_DATA = [
    { country: 'France',           iso: 'FRA', total: 3050, stars3: 30, stars2: 81,  stars1: 548, pop: 68,   continent: 'Europe',   launched: 1900 },
    { country: 'Italy',            iso: 'ITA', total: 1969, stars3: 15, stars2: 38,  stars1: 333, pop: 59,   continent: 'Europe',   launched: 1956 },
    { country: 'USA',              iso: 'USA', total: 1762, stars3: 14, stars2: 40,  stars1: 221, pop: 335,  continent: 'Americas', launched: 2005 },
    { country: 'Spain',            iso: 'ESP', total: 1292, stars3: 16, stars2: 37,  stars1: 249, pop: 47,   continent: 'Europe',   launched: 2010 },
    { country: 'Germany',          iso: 'DEU', total: 1237, stars3: 11, stars2: 45,  stars1: 272, pop: 84,   continent: 'Europe',   launched: 1966 },
    { country: 'United Kingdom',   iso: 'GBR', total: 1122, stars3: 10, stars2: 23,  stars1: 171, pop: 67,   continent: 'Europe',   launched: 2005 },
    { country: 'Japan',            iso: 'JPN', total: 1088, stars3: 20, stars2: 61,  stars1: 279, pop: 125,  continent: 'Asia',     launched: 2007 },
    { country: 'Chinese Mainland', iso: 'CHN', total: 783,  stars3: 3,  stars2: 25,  stars1: 122, pop: 1400, continent: 'Asia',     launched: 2016 },
    { country: 'Belgium',          iso: 'BEL', total: 745,  stars3: 2,  stars2: 18,  stars1: 103, pop: 11,   continent: 'Europe',   launched: 1966 },
    { country: 'Switzerland',      iso: 'CHE', total: 527,  stars3: 4,  stars2: 26,  stars1: 104, pop: 9,    continent: 'Europe',   launched: 1994 },
    { country: 'Netherlands',      iso: 'NLD', total: 499,  stars3: 1,  stars2: 19,  stars1: 96,  pop: 18,   continent: 'Europe',   launched: 2017 },
    { country: 'Thailand',         iso: 'THA', total: 475,  stars3: 2,  stars2: 8,   stars1: 33,  pop: 70,   continent: 'Asia',     launched: 2017 },
    { country: 'Taiwan',           iso: 'TWN', total: 431,  stars3: 3,  stars2: 7,   stars1: 43,  pop: 23,   continent: 'Asia',     launched: 2018 },
    { country: 'Austria',          iso: 'AUT', total: 419,  stars3: 2,  stars2: 19,  stars1: 79,  pop: 9,    continent: 'Europe',   launched: 2009 },
    { country: 'Singapore',        iso: 'SGP', total: 287,  stars3: 3,  stars2: 7,   stars1: 28,  pop: 5.5,  continent: 'Asia',     launched: 2016 },
    { country: 'Canada',           iso: 'CAN', total: 278,  stars3: 0,  stars2: 2,   stars1: 36,  pop: 38,   continent: 'Americas', launched: 2019 },
    { country: 'South Korea',      iso: 'KOR', total: 232,  stars3: 1,  stars2: 10,  stars1: 35,  pop: 52,   continent: 'Asia',     launched: 2016 },
    { country: 'Hong Kong SAR',    iso: 'HKG', total: 219,  stars3: 7,  stars2: 13,  stars1: 57,  pop: 7.4,  continent: 'Asia',     launched: 2009 },
    { country: 'Portugal',         iso: 'PRT', total: 206,  stars3: 0,  stars2: 9,   stars1: 44,  pop: 10,   continent: 'Europe',   launched: 2011 },
    { country: 'Mexico',           iso: 'MEX', total: 178,  stars3: 0,  stars2: 2,   stars1: 21,  pop: 128,  continent: 'Americas', launched: 2020 },
    { country: 'Brazil',           iso: 'BRA', total: 149,  stars3: 2,  stars2: 3,   stars1: 19,  pop: 215,  continent: 'Americas', launched: 2015 },
    { country: 'Vietnam',          iso: 'VNM', total: 177,  stars3: 0,  stars2: 0,   stars1: 9,   pop: 98,   continent: 'Asia',     launched: 2018 },
    { country: 'Malaysia',         iso: 'MYS', total: 149,  stars3: 0,  stars2: 1,   stars1: 8,   pop: 33,   continent: 'Asia',     launched: 2019 },
    { country: 'Türkiye',          iso: 'TUR', total: 168,  stars3: 0,  stars2: 2,   stars1: 15,  pop: 85,   continent: 'Europe',   launched: 2022 },
    // Additional European countries with Michelin coverage
    { country: 'Denmark',          iso: 'DNK', total: 143,  stars3: 2,  stars2: 7,   stars1: 28,  pop: 6,    continent: 'Europe',   launched: 1990 },
    { country: 'Sweden',           iso: 'SWE', total: 118,  stars3: 1,  stars2: 6,   stars1: 28,  pop: 10,   continent: 'Europe',   launched: 2005 },
    { country: 'Norway',           iso: 'NOR', total: 87,   stars3: 0,  stars2: 4,   stars1: 15,  pop: 5,    continent: 'Europe',   launched: 2016 },
    { country: 'Ireland',          iso: 'IRL', total: 212,  stars3: 0,  stars2: 2,   stars1: 19,  pop: 5,    continent: 'Europe',   launched: 1974 },
    { country: 'Greece',           iso: 'GRC', total: 123,  stars3: 0,  stars2: 2,   stars1: 11,  pop: 11,   continent: 'Europe',   launched: 2023 },
    { country: 'Czech Republic',   iso: 'CZE', total: 18,   stars3: 0,  stars2: 0,   stars1: 5,   pop: 11,   continent: 'Europe',   launched: 2021 },
    { country: 'Poland',           iso: 'POL', total: 14,   stars3: 0,  stars2: 0,   stars1: 4,   pop: 38,   continent: 'Europe',   launched: 2022 },
    { country: 'Luxembourg',       iso: 'LUX', total: 64,   stars3: 1,  stars2: 5,   stars1: 15,  pop: 0.65, continent: 'Europe',   launched: 1910 },
    // Middle East
    { country: 'UAE',              iso: 'ARE', total: 179,  stars3: 0,  stars2: 3,   stars1: 14,  pop: 10,   continent: 'Other',    launched: 2022 },
    { country: 'Israel',           iso: 'ISR', total: 93,   stars3: 0,  stars2: 1,   stars1: 9,   pop: 9,    continent: 'Other',    launched: 2023 },
    // Americas
    { country: 'Colombia',         iso: 'COL', total: 28,   stars3: 0,  stars2: 0,   stars1: 2,   pop: 51,   continent: 'Americas', launched: 2023 },
    { country: 'Peru',             iso: 'PER', total: 14,   stars3: 0,  stars2: 0,   stars1: 1,   pop: 33,   continent: 'Americas', launched: 2023 },
    { country: 'Croatia',          iso: 'HRV', total: 31,   stars3: 0,  stars2: 1,   stars1: 6,   pop: 4,    continent: 'Europe',   launched: 2022 },
    { country: 'Hungary',          iso: 'HUN', total: 24,   stars3: 0,  stars2: 1,   stars1: 5,   pop: 10,   continent: 'Europe',   launched: 2022 },
    { country: 'Romania',          iso: 'ROU', total: 8,    stars3: 0,  stars2: 0,   stars1: 2,   pop: 19,   continent: 'Europe',   launched: 2023 },
    { country: 'Finland',          iso: 'FIN', total: 42,   stars3: 0,  stars2: 3,   stars1: 10,  pop: 5.5,  continent: 'Europe',   launched: 2018 },
    { country: 'Slovakia',         iso: 'SVK', total: 6,    stars3: 0,  stars2: 0,   stars1: 1,   pop: 5.5,  continent: 'Europe',   launched: 2023 },
    { country: 'Slovenia',         iso: 'SVN', total: 14,   stars3: 0,  stars2: 1,   stars1: 3,   pop: 2,    continent: 'Europe',   launched: 2020 },
  ];

  COUNTRY_DATA.forEach(d => {
    d.starTotal = d.stars3 + d.stars2 + d.stars1;
    d.perMillion = +(d.starTotal / d.pop).toFixed(2);
  });

  const BLANK_SPOTS = [
    { region: 'Sub-Saharan Africa',        total: 0,   note: 'Zero coverage across 48+ countries',         color: '#6B8F5E' },
    { region: 'Central Asia',              total: 0,   note: 'Zero coverage',                              color: '#6B8F5E' },
    { region: 'Middle East (most)',         total: 23,  note: 'Only Dubai, Abu Dhabi, Tel Aviv covered',   color: '#D4A843' },
    { region: 'South Asia',                total: 18,  note: 'Only Mumbai & New Delhi, India',            color: '#D4A843' },
    { region: 'Southeast Asia (partial)',   total: 177, note: 'Vietnam, Thailand, Singapore only',         color: '#82BCEE' },
    { region: 'Latin America (most)',       total: 178, note: 'Only Mexico, Brazil, Colombia, Peru',       color: '#E07080' },
    { region: 'Eastern Europe',            total: 12,  note: 'Only Warsaw, Prague',                       color: '#9EA8B3' },
    { region: 'Oceania',                   total: 24,  note: 'Only Sydney & Melbourne',                   color: '#9EA8B3' },
  ];

  // ISO → country data lookup
  const ISO_MAP = {};
  COUNTRY_DATA.forEach(d => { ISO_MAP[d.iso] = d; });

  // Continent → color
  const CONTINENT_COLOR = {
    'Europe':   '#C9A84C',
    'Asia':     '#82BCEE',
    'Americas': '#E07080',
    'Other':    '#9EA8B3',
  };

  // Award marker config
  const AWARD_CONFIG = {
    '3 Stars':              { color: '#FFD700', size: 10, z: 1000 },
    '2 Stars':              { color: '#D4A843', size: 8,  z: 900  },
    '1 Star':               { color: '#C0394A', size: 7,  z: 800  },
    'Bib Gourmand':         { color: '#5096DC', size: 5,  z: 700  },
    'Selected Restaurants': { color: '#9EA8B3', size: 4,  z: 600  },
  };

  // ────────────────────────────────────────────────
  // STATE
  // ────────────────────────────────────────────────
  const activeFilters = new Set(['3 Stars', '2 Stars', '1 Star', 'Bib Gourmand', 'Selected Restaurants']);
  let allData = [];
  let mapInstance = null;
  let clusterLayer = null;
  let choroplethStep = -1;
  let beeswarmStep = -1;

  // ────────────────────────────────────────────────
  // UTILS
  // ────────────────────────────────────────────────
  function escHtml(s) {
    return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function parseCSVLine(line) {
    const result = []; let cur = ''; let inQ = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { if (inQ && line[i+1] === '"') { cur += '"'; i++; } else { inQ = !inQ; } }
      else if (ch === ',' && !inQ) { result.push(cur); cur = ''; }
      else { cur += ch; }
    }
    result.push(cur);
    return result;
  }

  function showTip(el, html, e) {
    el.innerHTML = html;
    el.style.display = 'block';
    moveTip(el, e);
  }
  function moveTip(el, e) {
    const x = e.clientX, y = e.clientY;
    el.style.left = (x + 14) + 'px';
    el.style.top  = (y - 10) + 'px';
  }
  function hideTip(el) { el.style.display = 'none'; }

  // Map a price symbol string to a 1–4 tier
  function priceToTier(price) {
    if (!price) return null;
    const count = price.length;
    if (count >= 1 && count <= 4) return count;
    return null;
  }

  // ────────────────────────────────────────────────
  // NAV
  // ────────────────────────────────────────────────
  const nav = document.getElementById('nav');
  const navObs = new IntersectionObserver(
    ([e]) => nav.classList.toggle('visible', !e.isIntersecting),
    { threshold: 0.1 }
  );
  navObs.observe(document.getElementById('hero'));

  document.querySelectorAll('.nav-link[data-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById(btn.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ────────────────────────────────────────────────
  // FADE-IN OBSERVER
  // ────────────────────────────────────────────────
  const fadeObs = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.15 }
  );
  document.querySelectorAll('.fade-in-up').forEach(el => fadeObs.observe(el));

  // ────────────────────────────────────────────────
  // LEAFLET MAP
  // ────────────────────────────────────────────────
  function initMap() {
    mapInstance = L.map('map', { center: [30, 15], zoom: 2, minZoom: 2, maxZoom: 18, zoomControl: false });
    L.control.zoom({ position: 'bottomright' }).addTo(mapInstance);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '© OpenStreetMap © CARTO', subdomains: 'abcd', maxZoom: 19
    }).addTo(mapInstance);

    clusterLayer = L.markerClusterGroup({
      maxClusterRadius: 55, spiderfyOnMaxZoom: true,
      showCoverageOnHover: false, zoomToBoundsOnClick: true,
      iconCreateFunction(c) {
        const n = c.getChildCount();
        const sz = n > 1000 ? 40 : n > 100 ? 34 : 28;
        return L.divIcon({
          html: `<div class="marker-cluster" style="width:${sz}px;height:${sz}px;font-size:${n>999?10:11}px;display:flex;align-items:center;justify-content:center;line-height:1;">${n>999?Math.round(n/1000)+'k':n}</div>`,
          className: '', iconSize: [sz, sz],
        });
      },
    });
    mapInstance.addLayer(clusterLayer);
  }

  const hoverCard = document.getElementById('map-hover-card');

  function showHoverCard(d, e) {
    const cfg = AWARD_CONFIG[d.award] || AWARD_CONFIG['Selected Restaurants'];
    const stars = d.award === '3 Stars' ? '★★★' : d.award === '2 Stars' ? '★★' : d.award === '1 Star' ? '★' : '';
    const priceHtml = d.price ? `<span class="hc-price">${escHtml(d.price)}</span>` : '';
    const cuisineHtml = d.cuisine ? `<div class="hc-cuisine">${escHtml(d.cuisine.split(',').slice(0,3).join(', '))}</div>` : '';
    const linkHtml = d.url
      ? `<a class="hc-link" href="${escHtml(d.url)}" target="_blank" rel="noopener">View on Michelin Guide ↗</a>`
      : '';
    hoverCard.innerHTML = `
      <div class="hc-award" style="color:${cfg.color}">
        ${stars ? `<span class="hc-stars">${stars}</span>` : ''}
        <span class="hc-award-label">${escHtml(d.award)}</span>
        ${priceHtml}
      </div>
      <div class="hc-name">${escHtml(d.name)}</div>
      <div class="hc-location">${escHtml(d.location)}</div>
      ${cuisineHtml}
      ${linkHtml}
    `;
    hoverCard.classList.add('visible');
    if (e) positionHoverCard(e);
  }

  function positionHoverCard(e) {
    const W = hoverCard.offsetWidth || 260;
    const H = hoverCard.offsetHeight || 120;
    let x = e.clientX + 12;
    let y = e.clientY - H - 12;
    if (x + W > window.innerWidth - 8) x = e.clientX - W - 12;
    if (y < 8) y = e.clientY + 16;
    hoverCard.style.left = x + 'px';
    hoverCard.style.top  = y + 'px';
  }

  function hideHoverCard() {
    hoverCard.classList.remove('visible');
  }

  function makeMarker(d) {
    const cfg = AWARD_CONFIG[d.award] || AWARD_CONFIG['Selected Restaurants'];
    const icon = L.divIcon({
      className: '',
      html: `<div class="custom-dot" style="width:${cfg.size}px;height:${cfg.size}px;background:${cfg.color};box-shadow:0 0 ${cfg.size}px ${cfg.color}55;border-radius:50%;"></div>`,
      iconSize: [cfg.size, cfg.size], iconAnchor: [cfg.size/2, cfg.size/2],
    });
    const marker = L.marker([+d.lat, +d.lng], { icon, zIndexOffset: cfg.z });
    marker.on('mouseover', (e) => showHoverCard(d, e.originalEvent));
    marker.on('mousemove', (e) => positionHoverCard(e.originalEvent));
    marker.on('mouseout',  () => hideHoverCard());
    if (d.url) {
      marker.on('click', () => window.open(d.url, '_blank', 'noopener'));
    }
    return marker;
  }

  function renderMap() {
    if (!clusterLayer) return;
    clusterLayer.clearLayers();
    const visible = allData.filter(d => activeFilters.has(d.award));
    clusterLayer.addLayers(visible.map(d => makeMarker(d)));
  }

  document.querySelectorAll('.map-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const award = pill.dataset.award;
      if (activeFilters.has(award)) { activeFilters.delete(award); pill.classList.replace('active','inactive'); }
      else { activeFilters.add(award); pill.classList.replace('inactive','active'); }
      renderMap();
    });
  });

  // ────────────────────────────────────────────────
  // D3 CHOROPLETH
  // ────────────────────────────────────────────────
  let choroplethReady = false;
  let worldGeo = null;

  async function initChoropleth() {
    const svgEl = document.getElementById('choropleth-svg');
    const wrap  = document.getElementById('choropleth-wrap');
    const W = wrap.clientWidth || 460;
    const H = Math.round(W * 0.52);

    const svg = d3.select(svgEl)
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('width', W).attr('height', H);

    // Fetch world TopoJSON
    try {
      const topo = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      worldGeo = topojson.feature(topo, topo.objects.countries);
    } catch(e) {
      console.warn('TopoJSON fetch failed', e);
      return;
    }

    const projection = d3.geoNaturalEarth1()
      .fitSize([W, H], worldGeo);

    const path = d3.geoPath().projection(projection);
    const tip  = document.getElementById('choropleth-tooltip');

    // Draw base countries
    svg.append('g').attr('class', 'countries')
      .selectAll('path')
      .data(worldGeo.features)
      .enter().append('path')
        .attr('class', 'country-path')
        .attr('d', path)
        .attr('fill', '#2a1e0a')
        .attr('stroke', '#1a1208')
        .attr('stroke-width', 0.5)
        .on('mousemove', function(event, d) {
          const iso3 = getISO3(d.id);
          const cData = ISO_MAP[iso3];
          if (!cData) return;
          const val = choroplethStep === 1 ? `${cData.perMillion} per million` : `${cData.total.toLocaleString()} restaurants`;
          showTip(tip, `<strong>${cData.country}</strong><span class="tip-sub">${val}</span><span class="tip-sub">Starred: ${cData.starTotal} · Launched: ${cData.launched}</span>`, event);
        })
        .on('mouseleave', () => hideTip(tip));

    // Graticule
    svg.append('path')
      .datum(d3.geoGraticule()())
      .attr('d', path)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(201,168,76,0.07)')
      .attr('stroke-width', 0.5);

    choroplethReady = true;
    updateChoropleth(0);
  }

  // Numeric ISO 3166-1 → ISO3 — only countries present in COUNTRY_DATA
  const NUMERIC_TO_ISO3 = {
    '250':'FRA','380':'ITA','840':'USA','724':'ESP','276':'DEU','826':'GBR',
    '392':'JPN','156':'CHN','56':'BEL','756':'CHE','528':'NLD','764':'THA',
    '158':'TWN','40':'AUT','702':'SGP','124':'CAN','410':'KOR','344':'HKG',
    '620':'PRT','484':'MEX','76':'BRA','704':'VNM','458':'MYS','792':'TUR',
    '208':'DNK','752':'SWE','578':'NOR','372':'IRL','300':'GRC',
    '203':'CZE','616':'POL','442':'LUX',
    '784':'ARE','376':'ISR',
    '170':'COL','604':'PER',
    '191':'HRV','348':'HUN','642':'ROU','246':'FIN','703':'SVK','705':'SVN',
    '56':'BEL','528':'NLD','756':'CHE',
  };

  function getISO3(numericId) {
    // Parse as base-10 integer to strip any leading zeros, then look up
    const key = String(parseInt(numericId, 10));
    return NUMERIC_TO_ISO3[key] || null;
  }

  function updateChoropleth(step) {
    if (!choroplethReady) return;
    choroplethStep = step;

    const svgEl = document.getElementById('choropleth-svg');
    const svg   = d3.select(svgEl);
    const label = document.getElementById('choropleth-mode-label');
    const legendEl = document.getElementById('choropleth-legend');

    // ── Step 2: interactive slider ──────────────────
    if (step === 2) {
      if (window._timelineTimer) { clearInterval(window._timelineTimer); window._timelineTimer = null; }
      const minY = 1900, maxY = 2022;

      label.textContent = 'When Michelin first arrived';
      legendEl.innerHTML = `
        <div class="legend-track">
          <div class="timeline-year-display">
            <span class="timeline-year-num" id="timeline-year-num">1900</span>
            <span class="timeline-year-label" id="timeline-year-label">drag to explore</span>
          </div>
          <input type="range" id="timeline-slider" min="${minY}" max="${maxY}" step="10" value="${minY}"
            style="width:100%;margin:8px 0;accent-color:var(--gold);cursor:pointer;">
          <div style="display:flex;justify-content:space-between;font-family:'Courier Prime',monospace;font-size:9px;color:var(--silver-dim);letter-spacing:0.1em;">
            <span>1900</span><span>2022</span>
          </div>
          <div style="margin-top:8px;font-family:'Courier Prime',monospace;font-size:9px;color:var(--silver-dim);letter-spacing:0.1em;font-style:italic;">
            * launch years are approximate
          </div>
        </div>
      `;

      svg.selectAll('.country-path').attr('fill', '#2a1e0a');

      function renderYear(year) {
        document.getElementById('timeline-year-num').textContent = year;
        document.getElementById('timeline-year-label').textContent =
          year >= maxY ? 'all covered countries shown' : 'drag to explore';
        svg.selectAll('.country-path')
          .transition().duration(150).ease(d3.easeCubicOut)
          .attr('fill', function(d) {
            const cData = ISO_MAP[getISO3(d.id)];
            return (cData && cData.launched <= year) ? '#FFFFFF' : '#2a1e0a';
          });
      }

      renderYear(minY);
      setTimeout(() => {
        const slider = document.getElementById('timeline-slider');
        if (slider) slider.addEventListener('input', () => renderYear(+slider.value));
      }, 50);
      return;
    }

    // ── Steps 0 & 1: choropleth with labeled legend ──
    let colorScale, getValue, labelText, legendConfig;

    if (step === 0) {
      const cap = 3000;
      colorScale = d3.scaleSequential(d3.interpolate('#2a1e0a', '#FFFFFF')).domain([0, cap]);
      getValue = d => Math.min(d.total, cap);
      labelText = 'Total Michelin listings by country';
      legendConfig = {
        stops: ['#2a1e0a', '#7A6030', '#C9A84C', '#FFFFFF'],
        min: '0', mid: '1,500', max: '3,000+',
        unit: 'number of restaurants  (lighter = more)',
      };
    } else {
      const vals = COUNTRY_DATA.map(d => d.perMillion).sort((a, b) => a - b);
      const cap  = vals[Math.floor(vals.length * 0.90)];
      colorScale = d3.scaleSequential(d3.interpolate('#2a1e0a', '#FFB0C0')).domain([0, cap]);
      getValue = d => Math.min(d.perMillion, cap);
      labelText = 'Starred restaurants per million people';
      legendConfig = {
        stops: ['#2a1e0a', '#7B2535', '#D05068', '#FFB0C0'],
        min: '0', mid: (cap / 2).toFixed(1), max: cap.toFixed(1) + '+',
        unit: 'starred restaurants per million people  (lighter = more)',
      };
    }

    label.textContent = labelText;

    svg.selectAll('.country-path')
      .transition().duration(700).ease(d3.easeCubicInOut)
      .attr('fill', function(d) {
        const cData = ISO_MAP[getISO3(d.id)];
        if (!cData) return '#2a1e0a';
        return colorScale(getValue(cData));
      });

    const gradientId = `choro-grad-${step}`;
    legendEl.innerHTML = `
      <div class="legend-track">
        <svg class="legend-gradient-svg" width="100%" height="10">
          <defs>
            <linearGradient id="${gradientId}" x1="0%" y1="0%" x2="100%" y2="0%">
              ${legendConfig.stops.map((c, i) =>
                `<stop offset="${(i / (legendConfig.stops.length - 1) * 100).toFixed(0)}%" stop-color="${c}"/>`
              ).join('')}
            </linearGradient>
          </defs>
          <rect width="100%" height="10" rx="3" fill="url(#${gradientId})"/>
        </svg>
        <div class="legend-ticks">
          <span>${legendConfig.min}</span>
          <span>${legendConfig.mid}</span>
          <span>${legendConfig.max}</span>
        </div>
        <div class="legend-unit">${legendConfig.unit}</div>
      </div>
    `;
  }

  // ────────────────────────────────────────────────
  // D3 BEESWARM
  // ────────────────────────────────────────────────
  let beeswarmReady = false;
  let beeswarmDots = null;

  function initBeeswarm() {
    const svgEl  = document.getElementById('beeswarm-svg');
    const wrap   = document.getElementById('beeswarm-wrap');
    const W = wrap.clientWidth || 460;
    const H = 400;
    const MARGIN = { top: 50, right: 20, bottom: 50, left: 20 };
    const iW = W - MARGIN.left - MARGIN.right;
    const iH = H - MARGIN.top  - MARGIN.bottom;

    const tip = document.getElementById('beeswarm-tooltip');

    const svg = d3.select(svgEl)
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('width', W).attr('height', H);

    const g = svg.append('g').attr('transform', `translate(${MARGIN.left},${MARGIN.top})`);

    // Awards (y axis)
    const AWARD_TIERS = ['3 Stars', '2 Stars', '1 Star', 'Bib Gourmand'];
    const AWARD_COLORS = { '3 Stars': '#FFD700', '2 Stars': '#D4A843', '1 Star': '#C0394A', 'Bib Gourmand': '#5096DC' };

    const yScale = d3.scaleBand()
      .domain(AWARD_TIERS)
      .range([0, iH])
      .padding(0.3);

    // Price tier x axis (1–4)
    const xScale = d3.scaleLinear().domain([0.5, 4.5]).range([0, iW]);

    // Build beeswarm data from allData
    // We'll use a subset capped at 800 dots for perf, stratified
    const BEESWARM_DATA = buildBeeswarmData();

    // Simulation for collision
    const simulation = d3.forceSimulation(BEESWARM_DATA)
      .force('x', d3.forceX(d => xScale(d.tier)).strength(1))
      .force('y', d3.forceY(d => yScale(d.award) + yScale.bandwidth() / 2).strength(1))
      .force('collide', d3.forceCollide(4).strength(0.8))
      .stop();

    // Run sim offline
    for (let i = 0; i < 120; i++) simulation.tick();

    // X axis labels
    const tierLabels = ['', '$ cheapest', '$$', '$$$', '$$$$ priciest'];
    g.append('g').attr('class', 'x-axis')
      .selectAll('text')
      .data([1,2,3,4]).enter()
      .append('text')
        .attr('x', d => xScale(d))
        .attr('y', iH + 30)
        .attr('text-anchor', 'middle')
        .attr('font-family', "'Courier Prime', monospace")
        .attr('font-size', 10)
        .attr('fill', '#5A6470')
        .attr('letter-spacing', '0.1em')
        .text(d => tierLabels[d]);

    // Y axis labels (award names)
    g.append('g').attr('class', 'y-axis')
      .selectAll('text')
      .data(AWARD_TIERS).enter()
      .append('text')
        .attr('x', -8)
        .attr('y', d => yScale(d) + yScale.bandwidth() / 2)
        .attr('text-anchor', 'end')
        .attr('dominant-baseline', 'middle')
        .attr('font-family', "'Courier Prime', monospace")
        .attr('font-size', 9)
        .attr('fill', d => AWARD_COLORS[d])
        .attr('letter-spacing', '0.05em')
        .text(d => d.toUpperCase());

    // Horizontal band backgrounds
    AWARD_TIERS.forEach((a, i) => {
      g.append('rect')
        .attr('x', 0).attr('y', yScale(a))
        .attr('width', iW).attr('height', yScale.bandwidth())
        .attr('fill', i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent');
    });

    // Dots
    beeswarmDots = g.selectAll('.bee-dot')
      .data(BEESWARM_DATA).enter()
      .append('circle')
        .attr('class', 'bee-dot')
        .attr('cx', d => Math.max(0, Math.min(iW, d.x)))
        .attr('cy', d => Math.max(0, Math.min(iH, d.y)))
        .attr('r', 3)
        .attr('fill', d => getRegionColor(d.region))
        .attr('fill-opacity', 0.75)
        .attr('stroke', 'none')
        .on('mousemove', function(event, d) {
          showTip(tip,
            `<strong>${escHtml(d.name)}</strong>
             <span class="tip-sub">${d.award} · ${d.priceRaw}</span>
             <span class="tip-sub">${escHtml(d.location)}</span>`,
            event);
        })
        .on('mouseleave', () => hideTip(tip));

    beeswarmReady = true;
    updateBeeswarm(0);
  }

  function buildBeeswarmData() {
    const TARGETS = { '3 Stars': 100, '2 Stars': 120, '1 Star': 300, 'Bib Gourmand': 280 };
    const buckets = { '3 Stars': [], '2 Stars': [], '1 Star': [], 'Bib Gourmand': [] };

    allData.forEach(d => {
      if (!buckets[d.award]) return;
      const tier = priceToTier(d.price);
      if (!tier) return;
      buckets[d.award].push(d);
    });

    const result = [];
    Object.entries(buckets).forEach(([award, rows]) => {
      const target = TARGETS[award];
      // Shuffle and take target
      const shuffled = rows.sort(() => Math.random() - 0.5).slice(0, target);
      shuffled.forEach(d => {
        result.push({
          award,
          tier: priceToTier(d.price),
          priceRaw: d.price,
          name: d.name,
          location: d.location,
          region: getRegionFromLocation(d.location),
          x: 0, y: 0, // will be set by simulation
        });
      });
    });
    return result;
  }

  function getRegionFromLocation(location) {
    if (!location) return 'Other';
    const l = location.toLowerCase();
    const ASIA_KEYWORDS = ['japan','china','korea','singapore','hong kong','taiwan','thailand','vietnam','malaysia','macau','philippines','indonesia'];
    const EUR_KEYWORDS  = ['france','italy','spain','germany','uk','united kingdom','belgium','switzerland','netherlands','austria','portugal','denmark','sweden','norway','finland','ireland'];
    const AME_KEYWORDS  = ['usa','united states','mexico','brazil','canada','colombia','peru','argentina','chile'];
    if (ASIA_KEYWORDS.some(k => l.includes(k))) return 'Asia';
    if (EUR_KEYWORDS.some(k => l.includes(k)))  return 'Europe';
    if (AME_KEYWORDS.some(k => l.includes(k)))  return 'Americas';
    return 'Other';
  }

  function getRegionColor(region) {
    return { Asia: '#82BCEE', Europe: '#C9A84C', Americas: '#E07080', Other: '#9EA8B3' }[region] || '#9EA8B3';
  }

  function updateBeeswarm(step) {
    if (!beeswarmReady || !beeswarmDots) return;
    beeswarmStep = step;

    beeswarmDots
      .transition().duration(500).ease(d3.easeCubicInOut)
      .attr('fill', d => {
        if (step === 0) return getRegionColor(d.region);
        if (step === 1) {
          // Highlight starred, grey out Bib
          const isStarred = d.award === '3 Stars' || d.award === '2 Stars' || d.award === '1 Star';
          return isStarred ? { '3 Stars':'#FFD700','2 Stars':'#D4A843','1 Star':'#C0394A' }[d.award] : 'rgba(90,100,112,0.25)';
        }
        if (step === 2) {
          // Highlight Asia, grey out rest
          return d.region === 'Asia' ? '#82BCEE' : 'rgba(90,100,112,0.2)';
        }
        return getRegionColor(d.region);
      })
      .attr('fill-opacity', d => {
        if (step === 0) return 0.75;
        if (step === 1) return (d.award !== 'Bib Gourmand') ? 0.85 : 0.15;
        if (step === 2) return d.region === 'Asia' ? 0.9 : 0.12;
        return 0.75;
      })
      .attr('r', d => {
        if (step === 1 && d.award === '3 Stars') return 4.5;
        return 3;
      });
  }

  // ────────────────────────────────────────────────
  // BLANK SPOTS
  // ────────────────────────────────────────────────
  function buildBlankChart() {
    const container = document.getElementById('blank-chart-rows');
    if (!container) return;
    const maxVal = 200;

    container.innerHTML = BLANK_SPOTS.map(d => {
      const pct = d.total === 0 ? 0 : Math.max(2, (d.total / maxVal) * 100);
      const countLabel = d.total === 0
        ? `<span style="color:#6B8F5E;font-family:'Courier Prime',monospace;font-size:10px;letter-spacing:0.15em">ZERO</span>`
        : d.total;
      return `
        <div class="blank-region-row" style="transition-delay:${BLANK_SPOTS.indexOf(d) * 80}ms">
          <span class="blank-region-name">${d.region}</span>
          <div class="blank-bar-wrap">
            <div class="blank-bar-bg">
              <div class="blank-bar-fill" style="background:${d.color}" data-target-width="${pct}"></div>
            </div>
            <div class="blank-bar-note">${d.note}</div>
          </div>
          <span class="blank-bar-count">${countLabel}</span>
        </div>`;
    }).join('');

    const blankObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.querySelectorAll('.blank-bar-fill').forEach(bar => {
            bar.style.width = bar.dataset.targetWidth + '%';
          });
        }
      });
    }, { threshold: 0.2 });

    container.querySelectorAll('.blank-region-row').forEach(row => blankObs.observe(row));
  }

  // ────────────────────────────────────────────────
  // SCROLLAMA
  // ────────────────────────────────────────────────
  function initScrollama() {
    // Choropleth scroller
    const choroScroller = scrollama();
    choroScroller
      .setup({ step: '#section-choropleth .scroll-step', offset: 0.55, debug: false })
      .onStepEnter(({ element, index }) => {
        document.querySelectorAll('#section-choropleth .scroll-step').forEach(el => el.classList.remove('is-active'));
        element.classList.add('is-active');
        if (index !== 2 && window._timelineTimer) {
          clearInterval(window._timelineTimer);
          window._timelineTimer = null;
        }
        if (index !== 2 && window._timelineScrollHandler) {
          window.removeEventListener('scroll', window._timelineScrollHandler);
          window._timelineScrollHandler = null;
          window._timelineDecade = 0;
        }
        updateChoropleth(index);
      });

    // Beeswarm scroller
    const beeScroller = scrollama();
    beeScroller
      .setup({ step: '#section-beeswarm .scroll-step', offset: 0.55, debug: false })
      .onStepEnter(({ element, index }) => {
        document.querySelectorAll('#section-beeswarm .scroll-step').forEach(el => el.classList.remove('is-active'));
        element.classList.add('is-active');
        updateBeeswarm(index);
      });

    window.addEventListener('resize', () => {
      choroScroller.resize();
      beeScroller.resize();
    });
  }

  // ────────────────────────────────────────────────
  // DATA LOAD
  // ────────────────────────────────────────────────
  async function loadData() {
    const progress = document.getElementById('loading-progress');
    try {
      const resp = await fetch('data/michelin_my_maps.csv');
      const text = await resp.text();
      if (progress) progress.style.width = '60%';

      const lines = text.trim().split('\n');
      const headers = parseCSVLine(lines[0]);
      allData = [];

      for (let i = 1; i < lines.length; i++) {
        const vals = parseCSVLine(lines[i]);
        if (vals.length < 6) continue;
        const row = {};
        headers.forEach((h, idx) => { row[h] = vals[idx] || ''; });
        const lat = parseFloat(row['Latitude']);
        const lng = parseFloat(row['Longitude']);
        if (isNaN(lat) || isNaN(lng)) continue;
        allData.push({
          name:     row['Name'],
          location: row['Location'],
          cuisine:  row['Cuisine'],
          price:    row['Price'],
          award:    row['Award'],
          url:      row['Url'] || row['WebsiteUrl'] || '',
          lat, lng,
        });
      }

      if (progress) progress.style.width = '85%';
      renderMap();

      // Build beeswarm now that data is loaded
      initBeeswarm();

      if (progress) progress.style.width = '100%';
      setTimeout(hideLoading, 400);
    } catch(e) {
      console.error('CSV load error:', e);
      hideLoading();
    }
  }

  function hideLoading() {
    const el = document.getElementById('loading-overlay');
    if (el) { el.style.opacity = '0'; setTimeout(() => el.remove(), 500); }
  }

  // ────────────────────────────────────────────────
  // INIT
  // ────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', async () => {
    initMap();
    buildBlankChart();
    document.querySelectorAll('.fade-in-up').forEach(el => fadeObs.observe(el));

    // Load choropleth first (independent of CSV)
    await initChoropleth();

    // Load CSV data (triggers map + beeswarm)
    await loadData();

    // Start Scrollama after everything is ready
    initScrollama();

    // Activate first step of each scrolly section
    const firstChoro = document.querySelector('#section-choropleth .scroll-step');
    const firstBee   = document.querySelector('#section-beeswarm .scroll-step');
    if (firstChoro) firstChoro.classList.add('is-active');
    if (firstBee)   firstBee.classList.add('is-active');
  });

})();