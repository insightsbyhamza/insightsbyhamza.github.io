/* Q / NOW STREAMING — "I turn your data into dashboards and your busywork into automation"
   Vanilla JS: studio (dashboards / tools / automations / process / about), search, career rail, trailer. */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     Environment
  ------------------------------------------------------------------ */
  var mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  var mqDesk = window.matchMedia("(min-width: 861px)");
  function reduced() { return mqReduce.matches; }

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  var EMAIL = "m_h2713@yahoo.com";

  /* ------------------------------------------------------------------
     Content (real facts only — from the brief / site content files)
  ------------------------------------------------------------------ */
  var PBI = {
    sales: "https://app.powerbi.com/view?r=eyJrIjoiZTE5NGVmMTktYTRmYy00MjlhLWJhM2ItNzgxZDE5MmU5MTE5IiwidCI6IjJhYWI5ZmQxLTI3NjctNGQ1MC04NTVlLThjMTQ0MWZkNjY2NiIsImMiOjl9",
    tekken: "https://app.powerbi.com/view?r=eyJrIjoiNTUzZDZmOGMtMmU1Mi00YThhLTg1Y2MtZWUzYzYwOGYxNGYxIiwidCI6IjJhYWI5ZmQxLTI3NjctNGQ1MC04NTVlLThjMTQ0MWZkNjY2NiIsImMiOjl9",
    amazon: "https://app.powerbi.com/view?r=eyJrIjoiMjkwZDVkYzMtYjA1My00YTk0LWFkMTEtYWFhZjA5M2QzYmY0IiwidCI6IjJhYWI5ZmQxLTI3NjctNGQ1MC04NTVlLThjMTQ0MWZkNjY2NiIsImMiOjl9",
    hr: "https://app.powerbi.com/view?r=eyJrIjoiOGM4OWI4NjItNGNmMy00OGQ4LTg4NTUtMzVmMGUwMzUxODA4IiwidCI6IjJhYWI5ZmQxLTI3NjctNGQ1MC04NTVlLThjMTQ0MWZkNjY2NiIsImMiOjl9"
  };
  var BI = ["Power BI", "DAX", "Power Query"];

  var TOP = [
    {
      id: "sales-supply-performance", kind: "dash", rank: 1, title: "Sales & Supply Performance",
      img: "projects/sales-supply-performance/dash-sales-supply.webp",
      kicker: "Fix shortages before they bite",
      fact: "A 5,821-unit shortfall flagged across SKUs in the 90-day demand-supply view.",
      summary: "Two databases, Sales and Purchasing, unified into one B2B operations view: YTD revenue, perfect-order rate, on-time delivery and the 90-day demand-supply gap by item.",
      facts: ["5,821-unit shortfall flagged", "YTD revenue", "Perfect-order rate", "On-time delivery", "90-day demand-supply gap"],
      note: "A finding in the analysed dataset, not a claim of financial savings.",
      tools: BI, genres: ["Sales", "Supply chain", "Inventory"], link: PBI.sales
    },
    {
      id: "hr-attrition-analytics", kind: "dash", rank: 2, title: "HR Analytics: Employee Attrition",
      img: "projects/hr-attrition-analytics/dash-hr-overview.webp",
      kicker: "Who leaves, and why",
      fact: "1,470 employees: overtime ≈3× and low income ≈5× attrition risk.",
      summary: "A 1,470-employee workforce analysed to find who leaves and why. DAX risk multipliers surface the strongest drivers, and a drill-through opens role-level detail for any segment.",
      facts: ["1,470 employees", "Overtime ≈3× attrition risk", "Low income ≈5× attrition risk", "Sales Reps: 39.8% attrition"],
      note: "Observations in the analysed dataset, not universal causes.",
      tools: BI, genres: ["HR", "Attrition", "Segmentation"], link: PBI.hr
    },
    {
      id: "amazon-product-analytics", kind: "dash", rank: 3, title: "Amazon Product Analytics",
      img: "projects/amazon-product-analytics/dash-amazon-sales.webp",
      kicker: "1,351 products, one clear picture",
      fact: "1,351 products and 23.8M reviews, with a 4.16 weighted rating.",
      summary: "1,351 products and 23.8M reviews turned into a performance picture: a GMV proxy, weighted ratings, category and price-tier views, and a drill-through for any single product.",
      facts: ["1,351 products", "23.8M reviews", "₹6,896 Cr GMV proxy (an estimate)", "4.16 weighted rating"],
      note: "GMV here is a proxy built from the dataset, not actual sales figures.",
      tools: BI, genres: ["E-commerce", "Pricing", "Reviews"], link: PBI.amazon
    },
    {
      id: "tekken-8-career-analytics", kind: "dash", rank: 4, title: "Arslan Ash: Tekken 8 Career",
      img: "projects/tekken-8-career-analytics/dash-arslan-ash.webp",
      kicker: "A pro esports career, in numbers",
      fact: "273 matches, 32 tournaments, 79.5% win rate in the analysed dataset.",
      summary: "A pro esports career tracked across 273 matches and 32 tournaments: matchups and opponents on a Career page, finishes and momentum over time on a Tournament page.",
      facts: ["273 matches", "32 tournaments", "79.5% win rate (analysed dataset)"],
      note: "",
      tools: BI, genres: ["Esports", "Performance analytics", "Time series"], link: PBI.tekken
    }
  ];

  var CONF_NOTE = "Confidential. The underlying records are not shown; details on request.";
  var CONF = [
    {
      id: "social-media-monitoring", kind: "conf", title: "Social Media Monitoring",
      img: "projects/social-media-monitoring/dash-social-media-monitoring.webp",
      kicker: "Where flagged content is concentrating",
      fact: "Flagged content by platform, category and district.",
      summary: "Flagged content broken down by platform, category and district, with a geo severity map and a region shape map so concentration is visible at a glance.",
      facts: ["Platform & category breakdowns", "District-level patterns", "Geo severity map", "Region shape map"],
      tools: BI, genres: ["Media monitoring", "Geo analysis"]
    },
    {
      id: "sentiment-analysis", kind: "conf", title: "Sentiment Analysis",
      img: "projects/sentiment-analysis/dash-sentiment-1.webp",
      kicker: "The mood behind the coverage",
      fact: "Each item labelled positive, negative or neutral via the DeepSeek API.",
      summary: "Python sends each item to the DeepSeek API for a positive, negative or neutral label; a four-page Power BI report shows the overall mood and a deep-dive for each side.",
      facts: ["Overall sentiment split", "Positive deep-dive", "Negative deep-dive", "Neutral deep-dive"],
      note: "Labels come from an LLM classifier. No accuracy figure was measured, so none is claimed.",
      tools: ["Power BI", "Python", "DeepSeek API"], genres: ["Sentiment", "LLM classification"]
    },
    {
      id: "content-risk-severity", kind: "conf", title: "Content Risk & Severity",
      img: "projects/content-risk-severity/dash-sensitivity.webp",
      kicker: "How dangerous, and exactly where",
      fact: "Posts scored by content sensitivity, severity mapped by district.",
      summary: "Not every flagged post carries the same risk. Each post is scored by content sensitivity, severity is mapped by district, and likely targets are surfaced.",
      facts: ["Sensitivity scoring", "Severity by district", "Likely targets"],
      tools: BI, genres: ["Risk scoring", "Geo analysis"]
    },
    {
      id: "media-workers-insurance", kind: "conf", title: "Media Workers Insurance",
      img: "projects/media-workers-insurance/dash-media-workers.webp",
      kicker: "A welfare scheme at a glance",
      fact: "Registered workers by province, city and news agency.",
      summary: "A view of a media workers' welfare scheme: the registered workforce by province, city and news agency, with filters so administrators can slice the numbers quickly.",
      facts: ["Workers by province", "By city", "By news agency", "Gender filter"],
      tools: BI, genres: ["Public sector", "Insurance", "Welfare"]
    }
  ];

  var RADAR = {
    id: "price-radar", kind: "app", title: "Price Radar",
    img: "projects/price-radar/pr-dashboard.webp",
    kicker: "Competitor price tracker for Shopify sellers",
    fact: "4,711 products from 3 stores in one check, re-checked every 6 hours.",
    summary: "Reads competitors' public Shopify product feeds, re-checks every store every 6 hours through GitHub Actions, and suggests a move for each matched product (hold, match, beat or raise) plus an AI pricing brief.",
    facts: ["4,711 products", "3 stores in one check", "Every 6 hours", "Hold / match / beat / raise", "AI pricing brief"],
    note: "Screenshots show the app's built-in sample data.",
    tools: ["Python", "Streamlit", "Supabase", "GitHub Actions", "DeepSeek API"],
    genres: ["E-commerce", "Pricing", "Automation"],
    link: "https://price-radar.streamlit.app/",
    screens: [
      { label: "Dashboard", src: "projects/price-radar/pr-dashboard.webp", cap: "The overview of the latest check across the tracked competitor stores." },
      { label: "Recommendations", src: "projects/price-radar/pr-recommendations.webp", cap: "A suggested move for each matched product: hold, match, beat or raise." },
      { label: "Money at risk", src: "projects/price-radar/pr-money-at-risk.webp", cap: "The estimated revenue at risk where a competitor undercuts you." },
      { label: "My prices", src: "projects/price-radar/pr-my-prices.webp", cap: "Your own products, matched against rival listings." }
    ]
  };

  var AUTO = [
    { id: "daily-media-monitoring", title: "Daily media monitoring pipeline", visual: "flow",
      runtime: "Daily", runLabel: "Word report, on schedule",
      kicker: "The morning report, written before anyone arrives.",
      problem: "Someone had to collect the day's coverage, judge its tone and type up a report every single morning.",
      summary: "A scheduled pipeline scrapes the day's coverage, runs each item through the DeepSeek API for sentiment, then assembles a Word report with headlines, sentiment breakdown and source mix.",
      tools: ["Python", "BeautifulSoup", "Selenium", "Apache Airflow", "DeepSeek API", "Word"],
      steps: ["Scheduled collection", "Data processing", "Sentiment classification", "Report generation", "Delivery"],
      input: "Daily news coverage", output: "Daily Word report" },
    { id: "urgent-case-alert", title: "Urgent-case alert pipeline", visual: "alert",
      runtime: "<5 min", runLabel: "from form to alert, as designed",
      kicker: "From a form to the response group, without a hand-off.",
      problem: "Urgent cases reported through a form had to be turned into a document and passed to the response team by hand.",
      summary: "A Google Form triggers an Apps Script that builds a PDF, emails stakeholders and drops the file in Drive. A Python watcher, scheduled every 5 minutes, posts it to the WhatsApp response group.",
      tools: ["Google Apps Script", "Python", "Selenium"],
      steps: ["Google Form", "PDF creation", "Email + Drive", "Python watcher", "WhatsApp alert"],
      input: "Google Form submission", output: "PDF alert in the response group" },
    { id: "brand24-monitoring", title: "Brand24 monitoring automation", visual: "flow",
      runtime: "End-to-end", runLabel: "no manual export steps",
      kicker: "Keywords in, the right PDF in the right group out.",
      problem: "Running the same Brand24 searches, exporting PDFs and sharing them was repetitive manual work.",
      summary: "A Tkinter form takes the keywords. Selenium runs the Brand24 search with region, language and date filters, downloads the PDF, renames it, sends it to the right WhatsApp group and archives it.",
      tools: ["Python", "Tkinter", "Selenium", "Brand24"],
      steps: ["Keyword input", "Monitoring filters", "PDF export", "File preparation", "WhatsApp delivery"],
      input: "Keywords from a desktop form", output: "Renamed PDF report in the right group" },
    { id: "facebook-instagram-scraper", title: "Facebook & Instagram post scraper", visual: "scrape",
      runtime: "1-click", runLabel: "public posts to CSV",
      kicker: "Public posts to a clean CSV in one click.",
      problem: "The social media team copied public post details from profiles into spreadsheets by hand.",
      summary: "Reads target handles from a sheet, opens each public profile in a headless browser, scrolls through posts and writes a clean CSV of captions, dates, engagement and links.",
      tools: ["Python", "Playwright", "Selenium"],
      steps: ["Target profiles", "Browser extraction", "Post metadata", "Structured CSV"],
      input: "Target handles from a sheet", output: "CSV: captions, dates, engagement, links" },
    { id: "newspaper-archive-scraper", title: "Newspaper archive scraper", visual: "archive",
      runtime: "29+ sources", runLabel: "news sources automated",
      kicker: "29+ archives read, scored and reported.",
      problem: "Collecting articles from dozens of newspaper archives, then reading each for tone, took hours.",
      summary: "Site-aware Python crawlers walk each paper's archive with pagination and date filters, pass items to the DeepSeek API for sentiment, and compile a ready-to-share PDF report.",
      tools: ["Python", "BeautifulSoup", "Selenium", "Playwright", "DeepSeek API"],
      steps: ["Source navigation", "Date filtering", "Article extraction", "Sentiment processing", "PDF reporting"],
      input: "29+ newspaper archives", output: "JSON/CSV dataset and PDF report" },
    { id: "fatwa-archive-scrapers", title: "Multi-language fatwa archive scrapers", visual: "multilang",
      runtime: "~300K rows", runLabel: "structured rows",
      kicker: "Many sites, many languages, one dataset.",
      problem: "Several archives in different languages and layouts had to become one analysable dataset.",
      summary: "Each website got its own scraper, because every site has a different layout and language. Each one outputs clean JSON and CSV, keeping the text in its source language.",
      tools: ["Python", "BeautifulSoup", "Playwright"],
      steps: ["Site-specific parsing", "Multilingual extraction", "Cleaning", "JSON/CSV export"],
      input: "Multi-language archive websites", output: "Clean JSON and CSV in the source language" },
    { id: "speech-to-text", title: "Speech-to-text transcription", visual: "wave",
      runtime: "Multi-language", runLabel: "audio to text",
      kicker: "Broadcast audio, searchable like print.",
      problem: "Broadcast clips could not be searched or analysed the way print coverage could.",
      summary: "A multi-language transcription system built on OpenAI Whisper converts audio and video coverage into searchable text, so spoken coverage can be monitored alongside print.",
      tools: ["OpenAI Whisper", "Python"],
      steps: ["Audio input", "Whisper transcription", "Searchable text"],
      input: "Audio and video coverage", output: "Searchable multi-language text" },
    { id: "youtube-sentiment-mcp", title: "YouTube sentiment via MCP server", visual: "hub",
      runtime: "On-demand", runLabel: "audience sentiment",
      kicker: "Ask about a video; the model reads the room.",
      problem: "Reading audience reaction meant exporting comments by hand before any analysis could start.",
      summary: "A language model connected to the YouTube API through the Model Context Protocol pulls a video's engagement and comments on request and reads audience sentiment, with no manual export.",
      tools: ["Python", "MCP Server", "YouTube API", "LLM"],
      steps: ["User request", "MCP tool call", "YouTube API", "Comment analysis", "Sentiment"],
      input: "A question about a video", output: "On-demand audience sentiment" }
  ];
  /* order for hiring managers: strongest business pipelines first, niche archive work last */
  var AUTO_ORDER = ["daily-media-monitoring", "urgent-case-alert", "facebook-instagram-scraper", "newspaper-archive-scraper", "youtube-sentiment-mcp", "brand24-monitoring", "speech-to-text", "fatwa-archive-scrapers"];
  AUTO.sort(function (x, y) { return AUTO_ORDER.indexOf(x.id) - AUTO_ORDER.indexOf(y.id); });
  AUTO.forEach(function (a, i) {
    a.kind = "auto";
    a.n = i + 1;
    a.code = "AUTO 0" + (i + 1);
    a.fact = a.kicker;
    a.genres = ["Automation"];
  });

  var SEASONS = [
    { n: 2, role: "E-Commerce Officer", org: "Izoc Solutions", dates: "Apr 2020 – Jun 2022",
      synopsis: "Monthly and annual sales reports, Excel and Power BI dashboards, and pricing analysis across online marketplaces.",
      eps: [
        { t: "Sales reporting", tag: "Excel, Power BI", d: "Built monthly and annual sales reports and dashboards in Excel and Power BI." },
        { t: "Marketplace PPC", tag: "Amazon, Walmart, eBay, Etsy", d: "Managed PPC campaigns across Amazon, Walmart, eBay and Etsy." },
        { t: "Pricing analysis", tag: "Research", d: "Ran product hunting and pricing analysis for competitive positioning." }
      ] },
    { n: 3, role: "E-Commerce Specialist (Team Lead)", org: "Vapes Direct", dates: "Aug 2022 – Dec 2022",
      synopsis: "Built Power BI sales and performance dashboards and ran A/B testing to support data-informed decisions.",
      eps: [
        { t: "Sales dashboards", tag: "Power BI", d: "Built Power BI dashboards for sales and performance metrics." },
        { t: "Leading the store", tag: "Team lead", d: "Led WordPress e-commerce operations: listings, inventory, conversion optimisation and A/B testing." },
        { t: "Stock & orders", tag: "ERP", d: "Managed the company ERP for stock levels and purchase orders." }
      ] },
    { n: 4, role: "Data Analyst", org: "Press Information Department", dates: "Apr 2023 – Jun 2026",
      synopsis: "Power BI dashboards, Python reporting automation, DeepSeek media monitoring, 29+ scrapers and alert pipelines.",
      eps: [
        { t: "Interactive dashboards", tag: "Power BI", d: "Designed interactive Power BI dashboards across multiple datasets." },
        { t: "Star schemas", tag: "Power Query", d: "Built star-schema data models in Power Query with fact and dimension tables." },
        { t: "Advanced DAX", tag: "DAX", d: "Wrote advanced DAX: time intelligence, weighted averages and ratio calculations." },
        { t: "Wired sources", tag: "Access, Excel, SQL Server", d: "Connected Power BI to Microsoft Access, Excel and SQL Server." },
        { t: "Reports on autopilot", tag: "Python, Airflow, DeepSeek", d: "Automated the daily reporting process in Python, including an Airflow + DeepSeek monitoring pipeline." },
        { t: "Scrapers & alerts", tag: "Python, Whisper, MCP", d: "Built scrapers for 29+ newspapers, a Brand24 automation tool, an urgent-case alert pipeline, Whisper transcription and an MCP-based YouTube sentiment tool." }
      ] }
  ];

  var CREW = [
    { role: "Analytics", sub: "BI & visualisation", tools: [["Power BI", "powerbi"], ["Tableau", "tableau"], ["Qlik Sense", "qlik"], ["Looker Studio", "looker"], ["Excel", "excel"]] },
    { role: "ETL", sub: "Pipelines & processing", tools: [["Python", "python"], ["Pandas", "pandas"], ["Apache Airflow", "apacheairflow"], ["BeautifulSoup"], ["Selenium", "selenium"]] },
    { role: "Web scraping", sub: "Data collection", tools: [["BeautifulSoup"], ["Playwright", "playwright"]] },
    { role: "Web automation", sub: "Browser tasks", tools: [["Selenium", "selenium"], ["Playwright", "playwright"]] },
    { role: "Workflow automation", sub: "CRM & no-code", tools: [["Apps Script", "googleappsscript"], ["n8n", "n8n"], ["Zapier", "zapier"], ["Landbot", "landbot"]] },
    { role: "AI", sub: "", tools: [["DeepSeek API", "deepseek"], ["OpenAI Whisper", "whisper"], ["MCP servers", "mcp"]] },
    { role: "Databases & languages", sub: "", tools: [["MySQL", "mysql"], ["Supabase", "supabase"], ["SQL", "sql"]] },
    { role: "Monitoring & research", sub: "", tools: [["Brand24", "brand24"], ["Synthesio", "synthesio"], ["SPSS", "spss"]] }
  ];

  /* ------------------------------------------------------------------
     Art generators
  ------------------------------------------------------------------ */
  function flowSVG(a) {
    var W = 320, H = 180, out = [];
    var ghost = '<text class="fl-ghost" x="326" y="168" text-anchor="end">' + ("0" + a.n).slice(-2) + "</text>";
    out.push(ghost);
    var steps = a.steps, n = steps.length;
    var v = a.visual;

    if (v === "flow" || v === "alert") {
      var pts = [];
      for (var i = 0; i < n; i++) pts.push([34 + i * (252 / (n - 1)), 86 + (i % 2 ? -18 : 14)]);
      var d = "M" + pts[0][0] + " " + pts[0][1];
      for (var j = 1; j < n; j++) {
        var mx = (pts[j - 1][0] + pts[j][0]) / 2;
        d += " C" + mx + " " + pts[j - 1][1] + " " + mx + " " + pts[j][1] + " " + pts[j][0] + " " + pts[j][1];
      }
      out.push('<path class="fl-path" d="' + d + '"/>');
      pts.forEach(function (p, k) {
        if (v === "alert" && k === n - 1) out.push('<circle class="fl-mini" cx="' + p[0] + '" cy="' + p[1] + '" r="15"/><circle class="fl-mini" cx="' + p[0] + '" cy="' + p[1] + '" r="22" opacity=".5"/>');
        out.push('<circle class="fl-node' + (k === 0 || (v === "alert" && k === n - 1) ? " fl-node--on" : "") + '" cx="' + p[0] + '" cy="' + p[1] + '" r="7"/>');
      });
    } else if (v === "archive" || v === "multilang" || v === "scrape") {
      var srcs = [], cx = 196, cy = 90;
      if (v === "archive") {
        for (var r = 0; r < 29; r++) srcs.push([22 + (r % 3) * 16, 22 + Math.floor(r / 3) * 14.5]);
        srcs.forEach(function (s) { out.push('<rect class="fl-mini" x="' + (s[0] - 4) + '" y="' + (s[1] - 4) + '" width="8" height="8"/>'); });
        [srcs[0], srcs[13], srcs[28]].forEach(function (s) {
          out.push('<path class="fl-path" d="M' + (s[0] + 6) + " " + s[1] + " C120 " + s[1] + " 130 " + cy + " " + cx + " " + cy + '"/>');
        });
      } else if (v === "multilang") {
        for (var m = 0; m < 4; m++) srcs.push([30, 34 + m * 36]);
        srcs.forEach(function (s) {
          out.push('<rect class="fl-mini" x="' + (s[0] - 12) + '" y="' + (s[1] - 9) + '" width="24" height="18"/>');
          out.push('<path class="fl-path" d="M' + (s[0] + 14) + " " + s[1] + " C120 " + s[1] + " 130 " + cy + " " + cx + " " + cy + '"/>');
        });
      } else {
        for (var q = 0; q < 5; q++) srcs.push([30, 26 + q * 32]);
        srcs.forEach(function (s) {
          out.push('<circle class="fl-mini" cx="' + s[0] + '" cy="' + s[1] + '" r="10"/>');
          out.push('<path class="fl-path" d="M' + (s[0] + 12) + " " + s[1] + " C120 " + s[1] + " 130 " + cy + " " + cx + " " + cy + '"/>');
        });
      }
      out.push('<circle class="fl-node fl-node--on" cx="' + cx + '" cy="' + cy + '" r="9"/>');
      out.push('<path class="fl-path" d="M' + (cx + 10) + " " + cy + ' L262 ' + cy + '"/>');
      out.push('<rect class="fl-mini" x="262" y="66" width="38" height="48"/>');
      for (var l = 0; l < 4; l++) out.push('<rect class="fl-bar" x="268" y="' + (76 + l * 9) + '" width="' + (26 - (l % 2) * 9) + '" height="3"/>');
    } else if (v === "wave") {
      for (var b = 0; b < 34; b++) {
        var h = 8 + Math.abs(Math.sin(b * 0.72) * 34 + Math.sin(b * 1.9) * 14);
        out.push('<rect class="fl-bar" x="' + (22 + b * 6.4) + '" y="' + (86 - h / 2) + '" width="3" height="' + h.toFixed(1) + '" rx="1.5" opacity="' + (b > 26 ? .35 : 1) + '"/>');
      }
      for (var t = 0; t < 3; t++) out.push('<rect class="fl-mini" x="250" y="' + (64 + t * 16) + '" width="' + (52 - t * 12) + '" height="6"/>');
    } else if (v === "hub") {
      var hx = 160, hy = 86, ang;
      for (var s2 = 0; s2 < n; s2++) {
        ang = -Math.PI / 2 + s2 * (2 * Math.PI / n);
        var x = hx + Math.cos(ang) * 92, y = hy + Math.sin(ang) * 56;
        out.push('<path class="fl-path" d="M' + hx + " " + hy + " L" + x.toFixed(1) + " " + y.toFixed(1) + '"/>');
        out.push('<circle class="fl-node" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="7"/>');
      }
      out.push('<circle class="fl-node fl-node--on" cx="' + hx + '" cy="' + hy + '" r="15"/>');
    }
    out.push('<text class="fl-label" x="16" y="168">' + esc(steps[0]) + " → " + esc(steps[n - 1]) + "</text>");
    return '<svg class="flow" viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">' + out.join("") + "</svg>";
  }

  /* ------------------------------------------------------------------
     Shared helpers (trailer focus trap, scroll lock)
  ------------------------------------------------------------------ */
  var focusQuiet = false;
  function quietFocus() { focusQuiet = true; setTimeout(function () { focusQuiet = false; }, 400); }
  function lockScroll(on) { document.documentElement.style.overflow = on ? "hidden" : ""; }
  function trapFocus(container, e) {
    if (e.key !== "Tab") return;
    var f = $$('a[href], button:not([disabled]), input, select, [tabindex]:not([tabindex="-1"])', container)
      .filter(function (el) { return el.offsetParent !== null || el === document.activeElement; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !container.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  }

  /* ------------------------------------------------------------------
     Studio: Dashboards · Tools · Automations · Process · About
     (Configurator layout: tab bar, stage left, list panel right)
  ------------------------------------------------------------------ */
  var NUM = {
    "sales-supply-performance": ["5,821", "unit shortfall flagged across SKUs"],
    "hr-attrition-analytics": ["1,470", "employees · overtime ≈3×, low income ≈5× attrition risk"],
    "amazon-product-analytics": ["23.8M", "reviews across 1,351 products"],
    "tekken-8-career-analytics": ["79.5%", "win rate across 273 matches"]
  };
  /* pages inside each dashboard (shown with a switcher, like the Price Radar screens) */
  var PAGES = {
    "social-media-monitoring": [
      { label: "Dashboard", src: "projects/social-media-monitoring/dash-social-media-monitoring.webp", cap: "Flagged content by platform and province, narrative types, the monthly trend and likely targets." },
      { label: "Severity map", src: "projects/social-media-monitoring/dash-social-media-severity.webp", cap: "Every item graded by severity, with district totals and a geo map of where it concentrates." },
      { label: "Shape map", src: "projects/social-media-monitoring/dash-social-media-shape.webp", cap: "Category counts beside a district shape map, with population and context figures for the selected area." }
    ],
    "sentiment-analysis": [
      { label: "Overview", src: "projects/sentiment-analysis/dash-sentiment-1.webp", cap: "The overall positive, negative and neutral split, mapped by district." },
      { label: "Positive", src: "projects/sentiment-analysis/dash-sentiment-2.webp", cap: "Drill-through to positive items only, filterable by province and district." },
      { label: "Negative", src: "projects/sentiment-analysis/dash-sentiment-3.webp", cap: "Drill-through to negative items only, with the map showing where they cluster." },
      { label: "Neutral", src: "projects/sentiment-analysis/dash-sentiment-4.webp", cap: "Drill-through to neutral items only, by province and district." }
    ],
    "hr-attrition-analytics": [
      { label: "Overview", src: "projects/hr-attrition-analytics/dash-hr-overview.webp", cap: "Company-wide attrition by department, role and the main risk factors." },
      { label: "Drill-through", src: "projects/hr-attrition-analytics/dash-hr-drillthrough.webp", cap: "Drill into one job role: attrition by marital status, age, overtime and salary band." }
    ],
    "amazon-product-analytics": [
      { label: "Overview", src: "projects/amazon-product-analytics/dash-amazon-sales.webp", cap: "Categories, price tiers, discounts and ratings across the whole catalogue." },
      { label: "Product drill-through", src: "projects/amazon-product-analytics/dash-amazon-drillthrough.webp", cap: "Drill into one product: price, discount, rating and reviews against its category average." }
    ],
    "tekken-8-career-analytics": [
      { label: "Career", src: "projects/tekken-8-career-analytics/dash-arslan-ash.webp", cap: "Career view: win rate by tournament, results by opponent country and head-to-head records." },
      { label: "Tournaments", src: "projects/tekken-8-career-analytics/dash-arslan-ash-2.webp", cap: "Tournament results, finish distribution and the season-by-season record." }
    ]
  };
  var ORDER = ["sales-supply-performance", "tekken-8-career-analytics", "amazon-product-analytics", "hr-attrition-analytics"];
  var LIVE = ORDER.map(function (id) { return TOP.filter(function (d) { return d.id === id; })[0]; });
  var DITEMS = CONF.map(function (c) {
    return {
      kind: "dash", sub: "internal", id: c.id, title: c.title, img: c.img, eye: "Power BI · Internal reporting",
      num: "", label: "", desc: c.summary, note: "", facts: c.facts,
      link: "mailto:" + EMAIL + "?subject=" + encodeURIComponent("About: " + c.title), linkText: "Ask for a walkthrough", ext: false,
      meta: c.genres.join(" · "), src: c, pages: PAGES[c.id] || [{ label: "Dashboard", src: c.img, cap: "" }]
    };
  }).concat(LIVE.map(function (d) {
    return {
      kind: "dash", sub: "live", id: d.id, title: d.title, img: d.img, eye: "Power BI · Public report",
      num: NUM[d.id][0], label: NUM[d.id][1], desc: d.kicker + ".",
      note: d.id === "amazon-product-analytics" ? "" : (d.note || (d.id === "tekken-8-career-analytics" ? "In the analysed dataset." : "")),
      link: d.link, linkText: "Open live", ext: true, meta: d.genres.join(" · "), src: d, pages: PAGES[d.id] || [{ label: "Dashboard", src: d.img, cap: "" }]
    };
  }));


  /* Tools he built himself (one today; add more objects here) */
  var TOOLS = [
    {
      id: RADAR.id, title: RADAR.title, img: RADAR.img, eye: "Own product · Web app",
      num: "4,711", label: "products from 3 stores in one check, re-checked every 6 hours",
      desc: RADAR.kicker + ": hold, match, beat or raise, plus an AI pricing brief.",
      note: RADAR.note, link: RADAR.link, linkText: "Open live app",
      tools: RADAR.tools, screens: RADAR.screens, src: RADAR
    }
  ];

  var PROC = [
    { t: "Understand the problem", d: "Identify the source data, the repetitive task, the output you need and the decision it supports." },
    { t: "Design the solution", d: "Map the data structure, automation steps, integrations and how people will use the result." },
    { t: "Build and validate", d: "Implement, clean, test and check the results against the source." },
    { t: "Handover and improve", d: "Provide documentation suited to the project and explain how it runs day to day." }
  ];

  var TABS = [
    { key: "dashboards", name: "Dashboards", items: DITEMS },
    { key: "tools", name: "Tools", items: TOOLS },
    { key: "automations", name: "Automations", items: AUTO },
    { key: "process", name: "Process", items: PROC }
  ];
  function tabIndex(key) { for (var k = 0; k < TABS.length; k++) if (TABS[k].key === key) return k; return -1; }
  function itemTitle(t, i) { var it = TABS[t].items[i]; return it.listTitle || it.title || it.t; }

  var studio = $("#studio");
  var S = { t: 0, sel: TABS.map(function () { return 0; }), ready: false };
  var T_TOOLS = tabIndex("tools"), T_AUTO = tabIndex("automations"), T_PROC = tabIndex("process");
  var stTabsEl = $("#stTabs", studio);
  var tabBtns = $$(".st-tab", studio);
  var panes = $$(".pane", studio);
  var layers = $$(".layer", studio);
  var ink = $(".studio__ink", studio);
  var stLive = $("#stLive"), stNum = $("#stNum"), stPos = $("#stPos");
  var stPrev = $("#stPrev"), stNext = $("#stNext"), stNextLabel = $("#stNextLabel");
  var panelBody = $("#stPanelBody");
  var LISTS = [$("#optsDashboards"), $("#optsTools"), $("#optsAutomations"), $("#optsProcess"), null];

  function swap(el) {
    if (!el || !S.ready || reduced()) return;
    el.classList.remove("is-swap"); void el.offsetWidth; el.classList.add("is-swap");
  }
  function setText(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; }

  /* ---- lists ---- */
  function optAttrs(t, i) {
    return ' role="option" id="st-opt-' + TABS[t].key + "-" + i + '" data-i="' + i + '" aria-selected="false" tabindex="-1"';
  }
  function buildLists() {
    var d = LISTS[0], html = "";
    function dOpt(it, i) {
      var thumb = it.kind === "conf"
        ? '<span class="opt__thumb is-conf" aria-hidden="true">' + CONF.map(function (c) { return '<img src="' + c.img + '" alt="" loading="lazy" decoding="async">'; }).join("") + "</span>"
        : '<span class="opt__thumb" aria-hidden="true"><img src="' + it.img + '" alt="" loading="lazy" decoding="async"></span>';
      return '<div class="opt"' + optAttrs(0, i) + ">" + thumb +
        '<span class="opt__txt"><b>' + esc(it.listTitle || it.title) + "</b><small>" + esc(it.meta) + "</small></span></div>";
    }
    html += '<div role="group" aria-labelledby="st-g-int"><p class="opts__g" id="st-g-int" role="presentation">Internal dashboards</p>';
    for (var i = 0; i < CONF.length; i++) html += dOpt(DITEMS[i], i);
    html += '</div><div role="group" aria-labelledby="st-g-live"><p class="opts__g" id="st-g-live" role="presentation">Live dashboards</p>';
    for (var k = CONF.length; k < DITEMS.length; k++) html += dOpt(DITEMS[k], k);
    html += "</div>";
    d.innerHTML = html;

    LISTS[T_TOOLS].innerHTML = TOOLS.map(function (it, k) {
      return '<div class="opt opt--tool"' + optAttrs(T_TOOLS, k) + '><span class="opt__thumb" aria-hidden="true"><img src="' + it.img + '" alt="" loading="lazy" decoding="async"></span>' +
        '<span class="opt__txt"><span class="opt__k">' + esc(it.eye) + "</span><b>" + esc(it.title) + "</b><small>" + esc(it.tools.join(" · ")) + "</small></span></div>";
    }).join("");

    LISTS[T_AUTO].innerHTML = AUTO.map(function (a, k) {
      return '<div class="opt opt--auto"' + optAttrs(T_AUTO, k) + '><span class="opt__n" aria-hidden="true">' + ("0" + a.n).slice(-2) + "</span>" +
        '<span class="opt__txt"><b>' + esc(a.title) + "</b><small>" + esc(a.tools.join(" · ")) + "</small></span></div>";
    }).join("");

    LISTS[T_PROC].innerHTML = PROC.map(function (p, k) {
      return '<div class="opt opt--step"' + optAttrs(T_PROC, k) + '><span class="opt__txt"><span class="opt__k">Step ' + (k + 1) + "</span><b>" + esc(p.t) + "</b><small>" + esc(p.d) + "</small></span></div>";
    }).join("");

    var cg = $("#dConf");
    cg.innerHTML = CONF.map(function (c) {
      return '<figure><img src="' + c.img + '" alt="" loading="lazy" decoding="async" draggable="false"><figcaption>' + esc(c.title) + "</figcaption></figure>";
    }).join("");
  }

  /* ---- stage renderers ---- */
  var shotToken = 0;
  function renderDash(i) {
    var it = DITEMS[i];
    var L = layers[0];
    setText("dEye", it.eye);
    setText("dTitle", it.title);
    setText("dNum", it.num);
    var numBox = $(".st-num", L); if (numBox) numBox.hidden = !it.num;
    setText("dNumLabel", it.label);
    setText("dDesc", it.desc);
    var fx = $("#dFacts"); fx.innerHTML = (it.facts || []).map(function (f) { return "<li><span>" + esc(f) + "</span></li>"; }).join(""); fx.hidden = !(it.facts && it.facts.length);
    var note = $("#dNote"); note.textContent = it.note || ""; note.hidden = !it.note;
    var link = $("#dLink");
    link.hidden = !it.ext;
    link.href = it.link;
    link.innerHTML = esc(it.linkText) + (it.ext ? ' <span aria-hidden="true">↗</span>' : "");
    if (it.ext) {
      link.target = "_blank"; link.rel = "noopener";
      link.setAttribute("aria-label", it.linkText + ": " + it.title + " (opens in a new tab)");
    } else {
      link.removeAttribute("target"); link.removeAttribute("rel"); link.removeAttribute("aria-label");
    }
    link.classList.toggle("st-link--ghost", !it.ext);

    var dSeg = $("#dSeg"), dCap = $("#dCap");
    dSeg.hidden = !it.pages;
    dSeg.setAttribute("aria-label", it.title + " pages");
    dSeg.innerHTML = (it.pages || []).map(function (pg, k) {
      return '<button class="seg__b" type="button" data-k="' + k + '" aria-pressed="' + (k === 0) + '">' + esc(pg.label) + "</button>";
    }).join("");
    dashPage = 0;
    dCap.hidden = true; setPageNote("d", it, it.pages ? it.pages[0].cap : "");
    var frames = $$(".frame", L), conf = $("#dConf");
    var on = frames.filter(function (f) { return f.classList.contains("is-on"); })[0];
    if (it.kind === "conf") {
      frames.forEach(function (f) { f.classList.remove("is-on"); f.setAttribute("aria-hidden", "true"); });
      conf.classList.add("is-on");
    } else {
      conf.classList.remove("is-on");
      var curImg = on ? $("img", on) : null;
      if (on && curImg.getAttribute("src") === it.img) { /* same picture */ }
      else {
        var next = on === frames[0] ? frames[1] : frames[0];
        var img = $("img", next);
        var tok = ++shotToken;
        img.alt = it.title + " screenshot";
        var show = function () {
          if (tok !== shotToken) return;
          frames.forEach(function (f) {
            var isNext = f === next;
            f.classList.toggle("is-on", isNext);
            if (isNext) f.removeAttribute("aria-hidden"); else f.setAttribute("aria-hidden", "true");
          });
        };
        if (img.getAttribute("src") !== it.img) {
          img.src = it.img;
          if (img.decode && S.ready) img.decode().then(show, show); else show();
        } else show();
      }
    }
    swap($(".lay__head", L)); swap($(".lay__meta", L));
  }

  /* crossfade between the two frames of a layer to a new picture */
  function showShot(L, src, alt) {
    var frames = $$(".frame", L);
    var on = frames.filter(function (f) { return f.classList.contains("is-on"); })[0];
    if (on && $("img", on).getAttribute("src") === src) return;
    var next = on === frames[0] ? frames[1] : frames[0];
    var img = $("img", next);
    var tok = L._tok = (L._tok || 0) + 1;
    img.alt = alt;
    var show = function () {
      if (tok !== L._tok) return;
      frames.forEach(function (f) {
        var isNext = f === next;
        f.classList.toggle("is-on", isNext);
        if (isNext) f.removeAttribute("aria-hidden"); else f.setAttribute("aria-hidden", "true");
      });
    };
    if (img.getAttribute("src") !== src) {
      img.src = src;
      if (img.decode && S.ready) img.decode().then(show, show); else show();
    } else show();
  }

  /* page captions sit under the picture (in the note line), never on top of it */
  function setPageNote(p, it, cap) {
    var n = $("#" + p + "Note"), txt = [cap, it.note].filter(Boolean).join(" ");
    n.textContent = txt; n.hidden = !txt;
  }

  var dashPage = 0;
  function setDashPage(k) {
    var it = DITEMS[S.sel[0]], L = layers[0];
    if (!it.pages) return;
    dashPage = k;
    var pg = it.pages[k];
    $$(".seg__b", $("#dSeg")).forEach(function (b, n) { b.setAttribute("aria-pressed", String(n === k)); });
    showShot(L, pg.src, it.title + ": " + pg.label + " page");
    setPageNote("d", it, pg.cap); swap($("#dNote"));
  }

  var toolScreen = 0;
  function setToolScreen(k) {
    var it = TOOLS[S.sel[T_TOOLS]], L = layers[T_TOOLS];
    if (!it.screens) return;
    toolScreen = k;
    var sc = it.screens[k];
    $$(".seg__b", $("#tSeg")).forEach(function (b, n) { b.setAttribute("aria-pressed", String(n === k)); });
    showShot(L, sc.src, it.title + ": " + sc.label + " screen");
    setPageNote("t", it, sc.cap); swap($("#tNote"));
  }
  function renderTool(i) {
    var it = TOOLS[i], L = layers[T_TOOLS];
    setText("tEye", it.eye);
    setText("tTitle", it.title);
    setText("tNum", it.num);
    setText("tNumLabel", it.label);
    setText("tDesc", it.desc);
    var note = $("#tNote"); note.textContent = it.note || ""; note.hidden = !it.note;
    var link = $("#tLink");
    link.href = it.link; link.target = "_blank"; link.rel = "noopener";
    link.innerHTML = esc(it.linkText) + ' <span aria-hidden="true">↗</span>';
    link.setAttribute("aria-label", it.linkText + ": " + it.title + " (opens in a new tab)");
    var seg = $("#tSeg");
    seg.setAttribute("aria-label", it.title + " screens");
    seg.hidden = !it.screens;
    seg.innerHTML = (it.screens || []).map(function (sc, k) {
      return '<button class="seg__b" type="button" data-k="' + k + '" aria-pressed="false">' + esc(sc.label) + "</button>";
    }).join("");
    if (it.screens) setToolScreen(0);
    else { showShot(L, it.img, it.title + " screenshot"); setText("tCap", ""); }
    swap($(".lay__head", L)); swap($(".lay__meta", L));
  }

  /* illustrations per automation (generated with Muse AI); missing ones fall back to the flow drawing */
  var AUTO_IMG = {
    "daily-media-monitoring": "images/auto/daily-media-monitoring.webp",
    "urgent-case-alert": "images/auto/urgent-case-alert.webp",
    "brand24-monitoring": "images/auto/brand24-monitoring.webp",
    "facebook-instagram-scraper": "images/auto/facebook-instagram-scraper.webp",
    "newspaper-archive-scraper": "images/auto/newspaper-archive-scraper.webp",
    "fatwa-archive-scrapers": "images/auto/fatwa-archive-scrapers.webp",
    "speech-to-text": "images/auto/speech-to-text.webp",
    "youtube-sentiment-mcp": "images/auto/youtube-sentiment-mcp.webp"
  };

  function renderAuto(i) {
    var a = AUTO[i], L = layers[T_AUTO];
    setText("aEye", a.tools.slice(0, 3).join(" · "));
    setText("aTitle", a.title);
    setText("aCode", a.code);
    setText("aNum", a.runtime);
    setText("aNumLabel", a.runLabel);
    setText("aDesc", a.summary);
    $("#aSteps").innerHTML = a.steps.map(function (s) { return "<li><span>" + esc(s) + "</span></li>"; }).join("");
    var pic = AUTO_IMG[a.id];
    $("#aFlow").innerHTML = pic
      ? "<img class=\"auto-pic\" src=\"" + pic + "\" alt=\"\" decoding=\"async\" draggable=\"false\">"
      : flowSVG(a);
    $("#aFlow").classList.toggle("has-pic", !!pic);
    swap($("#aFlow")); swap($(".lay__head", L)); swap($(".lay__meta", L));
  }

  function renderProc(i) {
    var p = PROC[i], L = layers[T_PROC];
    setText("pEye", "How I work · Step " + (i + 1) + " of " + PROC.length);
    setText("pTitle", p.t);
    setText("pDesc", p.d);
    var pic = $("#pPic"), src = "images/process/step-" + (i + 1) + ".webp";
    if (pic.getAttribute("src") !== src) pic.src = src;
    $("#pBar").style.width = ((i + 1) / PROC.length * 100) + "%";
    swap($(".lay__head", L)); swap($("#pDesc")); swap($(".proc-pic"));
    $$(".opt", LISTS[T_PROC]).forEach(function (o, k) { o.classList.toggle("is-done", k < i); });
  }

  var RENDER = [renderDash, renderTool, renderAuto, renderProc];

  /* ---- selection ---- */
  function moveInk() {
    var b = tabBtns[S.t];
    if (!b || !ink) return;
    ink.style.width = b.offsetWidth + "px";
    ink.style.transform = "translateX(" + b.offsetLeft + "px)";
    /* keep the active tab visible in the (mobile) scrolling tab strip, without scrolling the page */
    var box = stTabsEl;
    if (box.scrollWidth > box.clientWidth + 1) {
      var l = b.offsetLeft, r = l + b.offsetWidth;
      if (l < box.scrollLeft + 8) box.scrollLeft = Math.max(0, l - 16);
      else if (r > box.scrollLeft + box.clientWidth - 8) box.scrollLeft = r - box.clientWidth + 16;
    }
  }

  function keepInView(el) {
    if (!el || !panelBody || panelBody.scrollHeight <= panelBody.clientHeight + 1) return;
    var r = el.getBoundingClientRect(), b = panelBody.getBoundingClientRect();
    if (r.top < b.top + 6) panelBody.scrollTop -= (b.top - r.top) + 12;
    else if (r.bottom > b.bottom - 6) panelBody.scrollTop += (r.bottom - b.bottom) + 12;
  }

  function updateFoot() {
    var t = S.t, i = S.sel[t], n = TABS[t].items.length;
    stPrev.disabled = t === 0 && i === 0;
    var prevT = i > 0 ? t : t - 1;
    var prevI = i > 0 ? i - 1 : (t > 0 ? TABS[t - 1].items.length - 1 : 0);
    stPrev.setAttribute("aria-label", stPrev.disabled ? "Previous" : "Previous: " + (prevT !== t ? TABS[prevT].name + ", " : "") + itemTitle(prevT, prevI));
    if (i < n - 1) {
      stNextLabel.textContent = "Next";
      stNext.setAttribute("aria-label", "Next: " + itemTitle(t, i + 1));
    } else if (t < TABS.length - 1) {
      stNextLabel.textContent = "Next: " + TABS[t + 1].name;
      stNext.removeAttribute("aria-label");
    } else {
      stNextLabel.textContent = "Get in touch";
      stNext.removeAttribute("aria-label");
    }
    stPos.textContent = TABS[t].name + " · " + (i + 1) + " of " + n;
  }

  function select(t, i, opts) {
    opts = opts || {};
    var tabChanged = t !== S.t;
    var itemChanged = tabChanged || i !== S.sel[t];
    S.t = t; S.sel[t] = i;
    studio.setAttribute("data-tab", TABS[t].key);
    tabBtns.forEach(function (b, k) {
      b.setAttribute("aria-selected", String(k === t));
      b.tabIndex = k === t ? 0 : -1;
    });
    panes.forEach(function (p, k) { p.hidden = k !== t; });
    layers.forEach(function (l, k) {
      l.classList.toggle("is-on", k === t);
      if (k === t) l.removeAttribute("inert"); else l.setAttribute("inert", "");
    });
    stNum.textContent = String(t + 1);
    moveInk();

    var list = LISTS[t];
    if (list) {
      var cur = null;
      $$("[role=option]", list).forEach(function (o) {
        var on = +o.getAttribute("data-i") === i;
        o.setAttribute("aria-selected", String(on));
        o.tabIndex = on ? 0 : -1;
        if (on) cur = o;
      });
      if (cur) {
        if (opts.focus) { try { cur.focus({ preventScroll: true }); } catch (e) { cur.focus(); } }
        if (tabChanged) panelBody.scrollTop = 0;
        keepInView(cur);
      }
    } else if (tabChanged) panelBody.scrollTop = 0;

    if (itemChanged || !S.ready) RENDER[t](i);
    updateFoot();
    if (S.ready && itemChanged) stLive.textContent = TABS[t].name + ": " + itemTitle(t, i);
    if (S.ready) onScroll();
  }

  function step(dir) {
    var t = S.t, i = S.sel[t] + dir;
    if (i >= 0 && i < TABS[t].items.length) { select(t, i); return; }
    if (dir > 0) {
      if (t < TABS.length - 1) select(t + 1, 0);
      else scrollToId("contact");
    } else if (t > 0) {
      select(t - 1, TABS[t - 1].items.length - 1);
    }
  }

  function navOffset() { var n = $("#nav"); return n ? n.offsetHeight : 0; }
  function scrollToEl(el) {
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.scrollY - (el === studio ? navOffset() : 0);
    window.scrollTo({ top: Math.max(0, y), behavior: reduced() ? "auto" : "smooth" });
  }
  function scrollToId(id) { scrollToEl(document.getElementById(id)); }

  /* open a tab (and optionally an item) from anywhere: nav, footer, search, hash */
  function openStudio(key, i, focusWhat) {
    var t = typeof key === "number" ? key : tabIndex(key);
    if (t < 0) return;
    select(t, typeof i === "number" ? i : S.sel[t]);
    scrollToEl(studio);
    var target = focusWhat === "item" && LISTS[t] ? $('[aria-selected="true"]', LISTS[t]) : tabBtns[t];
    if (target) { try { target.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
  }

  function initStudio() {
    buildLists();
    for (var t = TABS.length - 1; t >= 0; t--) { S.t = t; RENDER[t](0); }
    S.t = 0;
    select(0, 0);
    S.ready = true;

    tabBtns.forEach(function (b, k) {
      b.addEventListener("click", function () { select(k, S.sel[k]); });
    });
    stTabsEl.addEventListener("keydown", function (e) {
      var k = tabBtns.indexOf(document.activeElement);
      if (k < 0) return;
      var n = null;
      if (e.key === "ArrowRight") n = (k + 1) % tabBtns.length;
      else if (e.key === "ArrowLeft") n = (k - 1 + tabBtns.length) % tabBtns.length;
      else if (e.key === "Home") n = 0;
      else if (e.key === "End") n = tabBtns.length - 1;
      if (n === null) return;
      e.preventDefault();
      select(n, S.sel[n]);
      tabBtns[n].focus();
    });

    LISTS.forEach(function (list, t) {
      if (!list) return;
      var count = TABS[t].items.length;
      list.addEventListener("click", function (e) {
        var o = e.target.closest("[role=option]");
        if (!o) return;
        select(t, +o.getAttribute("data-i"), { focus: true });
        /* on the stacked (mobile) layout, bring the stage into view */
        if (!mqDesk.matches) {
          var r = $(".st-stage", studio).getBoundingClientRect();
          if (r.bottom < navOffset() + 120) scrollToEl(studio);
        }
      });
      list.addEventListener("keydown", function (e) {
        var i = S.sel[t], n = null;
        if (e.key === "ArrowDown") n = Math.min(count - 1, i + 1);
        else if (e.key === "ArrowUp") n = Math.max(0, i - 1);
        else if (e.key === "Home") n = 0;
        else if (e.key === "End") n = count - 1;
        else if (e.key === "Enter" || e.key === " ") n = i;
        if (n === null) return;
        e.preventDefault();
        select(t, n, { focus: true });
      });
    });

    $("#dSeg").addEventListener("click", function (e) {
      var b = e.target.closest(".seg__b");
      if (!b) return;
      var k = +b.getAttribute("data-k");
      if (k !== dashPage) setDashPage(k);
    });

    $("#tSeg").addEventListener("click", function (e) {
      var b = e.target.closest(".seg__b");
      if (!b) return;
      var k = +b.getAttribute("data-k");
      if (k !== toolScreen) setToolScreen(k);
    });

    stPrev.addEventListener("click", function () { step(-1); });
    stNext.addEventListener("click", function () { step(1); });
    window.addEventListener("resize", moveInk);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInk);

    /* warm the dashboard screenshots once the section is near, so crossfades never show an empty frame */
    if ("IntersectionObserver" in window) {
      var wio = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        wio.disconnect();
        var warm = DITEMS.filter(function (d) { return d.kind !== "conf"; }).map(function (d) { return d.img; });
        TOOLS.forEach(function (it) { (it.screens || []).forEach(function (sc) { warm.push(sc.src); }); });
        DITEMS.forEach(function (it) { (it.pages || []).forEach(function (pg) { warm.push(pg.src); }); });
        warm.forEach(function (src) { var im = new Image(); im.decoding = "async"; im.src = src; });
      }, { rootMargin: "600px 0px" });
      wio.observe(studio);
    }
  }

  /* links anywhere with data-open="<tab>" open that tab of the studio */
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-open]");
    if (!a) return;
    var t = tabIndex(a.getAttribute("data-open"));
    if (t < 0) return;
    e.preventDefault();
    closeSearch(true);
    openStudio(t);
  });

  /* ------------------------------------------------------------------
     Search: finds studio items and opens the matching tab + item
  ------------------------------------------------------------------ */
  var SIDX = [];
  (function () {
    DITEMS.forEach(function (d, i) {
      var src = d.src;
      SIDX.push({ t: 0, i: i, title: d.title, where: d.sub === "live" ? "Dashboards · Live" : "Dashboards · Internal",
        text: [src.title, src.kicker, src.fact, (src.facts || []).join(" "), src.tools.join(" "), src.genres.join(" "),
          "dashboard public power bi live report"].join(" ") });
    });
    TOOLS.forEach(function (it, i) {
      var src = it.src || it;
      SIDX.push({ t: T_TOOLS, i: i, title: it.title, where: "Tools",
        text: [it.title, it.eye, src.kicker, src.fact, src.summary, (src.facts || []).join(" "), it.tools.join(" "), (src.genres || []).join(" "),
          (it.screens || []).map(function (sc) { return sc.label; }).join(" "), "tool product app web streamlit shopify built"].join(" ") });
    });
    AUTO.forEach(function (a, i) {
      SIDX.push({ t: T_AUTO, i: i, title: a.title, where: "Automations",
        text: [a.title, a.kicker, a.summary, a.tools.join(" "), a.steps.join(" "), a.runtime, a.runLabel, a.code, "automation system pipeline"].join(" ") });
    });
    PROC.forEach(function (p, i) {
      SIDX.push({ t: T_PROC, i: i, title: p.t, where: "Process", text: p.t + " " + p.d + " process how i work step" });
    });
    SIDX.forEach(function (s) { s.text = s.text.toLowerCase(); });
  })();

  var search = $("#search"), sInput = $("#searchInput"), sToggle = $("#searchToggle"), sClear = $("#searchClear");
  var sPop = $("#searchPop"), sStatus = $("#searchStatus"), sResults = $("#searchResults");

  function openSearch() {
    search.classList.add("is-open");
    sToggle.setAttribute("aria-expanded", "true");
    sInput.focus();
  }
  function closeSearch(clear) {
    if (clear) { sInput.value = ""; runSearch(); }
    sPop.hidden = true;
    search.classList.remove("is-open");
    sToggle.setAttribute("aria-expanded", "false");
  }
  function runSearch() {
    var raw = sInput.value.trim(), q = raw.toLowerCase();
    sClear.hidden = !q;
    if (!q) { sPop.hidden = true; sResults.innerHTML = ""; sStatus.textContent = ""; return; }
    var words = q.split(/\s+/);
    var hits = SIDX.filter(function (s) { return words.every(function (w) { return s.text.indexOf(w) !== -1; }); });
    sPop.hidden = false;
    sStatus.textContent = hits.length
      ? hits.length + (hits.length === 1 ? " title matches" : " titles match") + " “" + raw + "”"
      : "No titles match “" + raw + "”. Try Power BI, Python or scraper.";
    sResults.innerHTML = hits.slice(0, 8).map(function (s, k) {
      return '<li><button type="button" class="sres" data-k="' + SIDX.indexOf(s) + '"><b>' + esc(s.title) + "</b><span>" + esc(s.where) + "</span></button></li>";
    }).join("");
  }
  function chooseResult(btn) {
    var s = SIDX[+btn.getAttribute("data-k")];
    if (!s) return;
    closeSearch(true);
    openStudio(s.t, s.i, "item");
  }
  sToggle.addEventListener("click", function () {
    if (search.classList.contains("is-open") && !sInput.value) closeSearch(); else openSearch();
  });
  sInput.addEventListener("input", runSearch);
  sInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeSearch(true); sToggle.focus(); }
    else if (e.key === "ArrowDown") { var f = $(".sres", sResults); if (f) { e.preventDefault(); f.focus(); } }
    else if (e.key === "Enter") { var g = $(".sres", sResults); if (g) { e.preventDefault(); chooseResult(g); } }
  });
  sResults.addEventListener("click", function (e) { var b = e.target.closest(".sres"); if (b) chooseResult(b); });
  sResults.addEventListener("keydown", function (e) {
    var all = $$(".sres", sResults), k = all.indexOf(document.activeElement);
    if (k < 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); all[Math.min(all.length - 1, k + 1)].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (k === 0) sInput.focus(); else all[k - 1].focus(); }
    else if (e.key === "Escape") { e.preventDefault(); sInput.focus(); }
  });
  sInput.addEventListener("blur", function () {
    setTimeout(function () {
      if (!sInput.value && !search.contains(document.activeElement)) closeSearch();
    }, 120);
  });
  sClear.addEventListener("click", function () { sInput.value = ""; runSearch(); sInput.focus(); });
  document.addEventListener("click", function (e) { if (!search.contains(e.target)) sPop.hidden = true; });
  sInput.addEventListener("focus", function () { if (sInput.value.trim()) runSearch(); });

  /* ------------------------------------------------------------------
     Nav: solid on scroll + active tab
  ------------------------------------------------------------------ */
  var nav = $("#nav");
  var tabs = $$(".nav__tabs a");
  var STUDIO_NAV = { dashboards: "projects", tools: "tools", automations: "systems", process: "" };
  var navRaf = 0;
  function onScroll() {
    navRaf = 0;
    nav.classList.toggle("is-solid", window.scrollY > 40);
    var mark = window.innerHeight * 0.35, active = "home";
    [["#studio", null], ["#experience", "about"], ["#certs", "about"], ["#contact", "contact"]].forEach(function (t) {
      var el = $(t[0]);
      if (el && el.getBoundingClientRect().top <= mark) active = t[1] === null ? STUDIO_NAV[TABS[S.t].key] : t[1];
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = "contact";
    tabs.forEach(function (a) {
      if (a.getAttribute("data-tab") === active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", function () { if (!navRaf) navRaf = requestAnimationFrame(onScroll); }, { passive: true });


  /* ------------------------------------------------------------------
     Seasons
  ------------------------------------------------------------------ */
  var seasonSel = $("#seasonSelect"), seasonInfo = $("#seasonInfo"), epList = $("#episodeList");
  function renderSeason(i) {
    if (!seasonInfo || !epList) return;
    var s = SEASONS[i];
    seasonInfo.innerHTML = "<p><b>" + esc(s.role) + "</b>" + " · " + esc(s.org) + " · " + esc(s.dates) + " · " + s.eps.length + " highlights</p><p>" + esc(s.synopsis) + "</p>";
    epList.innerHTML = s.eps.map(function (e, k) {
      return '<li class="ep" style="animation-delay:' + (k * 60) + 'ms">' +
        '<span class="ep__n" aria-hidden="true">' + (k + 1) + "</span>" +
        '<span class="ep__thumb" aria-hidden="true"><span>' + ("0" + (k + 1)).slice(-2) + "</span><b>" + esc(e.t) + "</b></span>" +
        '<div class="ep__text"><p class="ep__title"><span><span class="sr-only">Highlight ' + (k + 1) + ": </span>" + esc(e.t) + "</span><small>" + esc(e.tag) + "</small></p>" +
        '<p class="ep__desc">' + esc(e.d) + "</p></div></li>";
    }).join("");
  }
  /* season cards on the rail (from Slot's maintenance log) */
  var cards = $$(".lt[data-season]");
  cards.forEach(function (c) {
    c.addEventListener("click", function () {
      cards.forEach(function (o) { o.setAttribute("aria-selected", o === c ? "true" : "false"); });
      renderSeason(+c.getAttribute("data-season"));
    });
  });
  var certV = (location.search.match(/cert=(ticket|reel|credits)/) || [0, "ticket"])[1];
  var certSec = $("#certs"); if (certSec) certSec.classList.add("certs--" + certV);
  var stkEl = $("#stickers");
  if (stkEl && !reduced() && "IntersectionObserver" in window) {
    stkEl.classList.add("is-wait");
    var sio = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { stkEl.classList.remove("is-wait"); stkEl.classList.add("is-in"); sio.disconnect(); }
    }, { threshold: 0.3 });
    sio.observe(stkEl);
  }
  var logEl = $("#log");
  if (logEl && !reduced() && "IntersectionObserver" in window) {
    logEl.classList.add("is-wait");
    var lio = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { logEl.classList.remove("is-wait"); logEl.classList.add("is-in"); lio.disconnect(); setTimeout(function () { logEl.classList.add("is-done"); }, 1500); }
    }, { threshold: 0.3 });
    lio.observe(logEl);
  }

  /* ------------------------------------------------------------------
     Crew (toolkit credits)
  ------------------------------------------------------------------ */
  function buildCrew() {
    var DARK = { whisper: 1, mcp: 1 };
    $("#crew").innerHTML =
      '<h3 class="crew__h">Toolkit</h3><p class="crew__sub">The tools I use to analyse, automate and report.</p>' +
      CREW.map(function (c) {
        return '<div class="rope' + (c.tools.length <= 3 && c.role !== "Monitoring & research" ? ' rope--half' : '') + '"><p class="rope__lab">' + esc(c.role) + (c.sub ? " <span>· " + esc(c.sub) + "</span>" : "") + '</p><ul class="rope__tags">' +
          c.tools.map(function (t, i) {
            var icon = t[1]
              ? '<img src="icons/tools/' + t[1] + '.svg" alt="" loading="lazy" width="40" height="40">'
              : '<b class="tag__txt" aria-hidden="true">' + esc(t[0].replace(/[^A-Z]/g, "").slice(0, 3) || t[0].slice(0, 2)) + "</b>";
            return '<li class="tag' + (t[1] && DARK[t[1]] ? " tag--dark" : "") + '" style="--i:' + i + '">' + icon + "<span>" + esc(t[0]) + (t[2] ? "<small class=\"tag__sub\">" + esc(t[2]) + "</small>" : "") + "</span></li>";
          }).join("") + "</ul></div>";
      }).join("");
  }

  /* ------------------------------------------------------------------
     Trailer
  ------------------------------------------------------------------ */
  var trailer = $("#trailer"), stage = $("#trailerStage"), bar = $("#trailerBar");
  var tSkip = $("#trailerSkip"), tNext = $("#trailerNext"), playBtn = $("#playTrailer");
  var DASH_COLLAGE = [
    "projects/sales-supply-performance/dash-sales-supply.webp",
    "projects/social-media-monitoring/dash-social-media-monitoring.webp",
    "projects/hr-attrition-analytics/dash-hr-overview.webp",
    "projects/sentiment-analysis/dash-sentiment-1.webp",
    "projects/amazon-product-analytics/dash-amazon-sales.webp",
    "projects/content-risk-severity/dash-sensitivity.webp",
    "projects/tekken-8-career-analytics/dash-arslan-ash.webp",
    "projects/media-workers-insurance/dash-media-workers.webp",
    "projects/social-media-monitoring/dash-social-media-severity.webp"
  ];
  var AUTO_COLLAGE = ["daily-media-monitoring", "urgent-case-alert", "facebook-instagram-scraper", "newspaper-archive-scraper",
    "youtube-sentiment-mcp", "brand24-monitoring", "speech-to-text", "fatwa-archive-scrapers"].map(function (id) { return "images/auto/" + id + ".webp"; });
  var DASH_STYLE = (location.search.match(/dash=(wall|cuts|ring|tunnel|laptop|highlight)/) || [0, "highlight"])[1];
  var SCENES = [
    { t: "mh", d: 1700 },
    { t: "big", d: 1800, big: "7<em>+</em>", line: "Years of experience" },
    { t: "box", d: 3800, imgs: DASH_COLLAGE },
    { t: "big", d: 1600, big: "8<em>+</em>", line: "Automations that run themselves" },
    { t: "montage", d: 4800, cap: "Automations" },
    { t: "words", d: 2500, big: "6<em>+</em>", line: "Industries", words: ["Media", "E-commerce", "Government", "HR", "Esports", "Insurance"] },
    { t: "logo", d: 2900, small: "Open to full-time roles & freelance projects." }
  ];
  SCENES = SCENES.filter(function (s) { return !s.skip; });
  var HL = [
    { src: "projects/sales-supply-performance/dash-sales-supply.webp", x: 96.6, y: 96.6, num: "5,821", label: "Unit shortfall flagged across SKUs", name: "Sales & Supply Performance" },
    { src: "projects/hr-attrition-analytics/dash-hr-overview.webp", x: 63.2, y: 30.4, num: "39.8%", label: "Sales Reps attrition, out of 1,470 employees", name: "HR Analytics: Employee Attrition" },
    { src: "projects/amazon-product-analytics/dash-amazon-sales.webp", x: 40.2, y: 12.2, num: "23.8M", label: "Reviews across 1,351 products", name: "Amazon Product Analytics" },
    { src: "projects/tekken-8-career-analytics/dash-arslan-ash.webp", x: 8.8, y: 41.4, num: "79.5%", label: "Win rate across 273 matches", name: "Arslan Ash: Tekken 8 Career" }
  ];
  if (DASH_STYLE === "highlight") {
    var hi = -1; SCENES.forEach(function (s, k) { if (s.t === "highlight") hi = k; });
    if (hi >= 0) SCENES.splice.apply(SCENES, [hi, 1].concat(HL.map(function (h) { return { t: "hl", d: 2300, h: h }; })));
  }
  var TOTAL = SCENES.reduce(function (a, s) { return a + s.d; }, 0);
  var tr = { i: 0, timer: 0, raf: 0, start: 0, manual: false, opener: null };

  var LOCKUP = '<span class="lockup" aria-hidden="true"><span class="lockup__top lockup__top--text">I turn your</span><span class="lockup__word lockup__word--eq">DATA INTO <i class="or">DASHBOARDS.</i></span><span class="lockup__word lockup__word--eq">BUSYWORK INTO <i class="or">AUTOMATION.</i></span></span>';

  function sceneHTML(s) {
    var st = ' style="--d:' + s.d + 'ms"';
    switch (s.t) {
      case "mh": return '<div class="sc"' + st + '><div><p class="sc__mh" aria-hidden="true">MH</p><p class="sc__kicker" style="margin-top:18px">Data Analyst · Automation</p></div></div>';
      case "text": return '<div class="sc"' + st + '><div><p class="sc__kicker">' + s.kicker + '</p><p class="sc__line">' + s.line + '</p><p class="sc__small">' + s.small + "</p></div></div>";
      case "big": return '<div class="sc"' + st + '><div><p class="sc__big">' + s.big + '</p><p class="sc__line">' + s.line + "</p></div></div>";
      case "wall":
        var rows = [0, 1, 2].map(function (r) {
          var set = s.imgs.slice(r * 3).concat(s.imgs.slice(0, r * 3));
          var cells = set.concat(set).map(function (src) { return '<span><img src="' + src + '" alt=""></span>'; }).join("");
          return '<div class="wall__row' + (r === 1 ? " is-rev" : "") + '">' + cells + "</div>";
        }).join("");
        return '<div class="sc sc--wall" style="--d:' + s.d + 'ms"><div class="wall"><div class="wall__plane">' + rows + '</div></div><p class="wall__cap">' + s.cap + "</p></div>";
      case "box":
        var nb = s.imgs.length;
        return '<div class="sc sc--box" style="--d:' + s.d + 'ms">' +
          '<div class="bx__cards">' + s.imgs.map(function (src, k) {
            var t = nb > 1 ? k / (nb - 1) : .5, ang = -62 + t * 124;
            var tx = Math.sin(ang * Math.PI / 180) * 34, ty = -Math.cos(ang * Math.PI / 180) * 30 - 8;
            return '<span style="--k:' + k + ';--tx:' + tx.toFixed(1) + 'vw;--ty:' + ty.toFixed(1) + 'vh;--r:' + (ang * .35).toFixed(1) + 'deg"><img src="' + src + '" alt=""></span>';
          }).join("") + "</div>" +
          '<div class="bx"><div class="bx__lid"></div><div class="bx__body"><b>15<em>+</em></b><span>Dashboards built</span></div></div></div>';
      case "hl":
        var h = s.h;
        return '<figure class="sc sc--hl" style="--d:' + s.d + 'ms;--x:' + h.x + '%;--y:' + h.y + '%"><div class="hl__frame"><img src="' + h.src + '" alt=""><span class="hl__ring"></span></div>' +
          '<figcaption><em>' + h.name + '</em><b>' + h.num + '</b><span>' + h.label + "</span></figcaption></figure>";
      case "laptop":
        var pl = (s.d - 600) / s.imgs.length;
        return '<div class="sc sc--lap" style="--d:' + s.d + 'ms;--per:' + pl + 'ms;--n:' + s.imgs.length + '">' +
          '<div class="lap__count" aria-hidden="true"><b class="lap__num" data-to="15">01</b><span>Dashboards built</span></div>' +
          '<div class="lap"><div class="lap__lid"><div class="lap__screen">' + s.imgs.map(function (src, k) {
            return '<img src="' + src + '" alt="" style="--k:' + k + '">';
          }).join("") + '<i class="lap__glare"></i></div></div><div class="lap__base"></div></div>' +
          '<p class="wall__cap">' + s.cap + "</p></div>";
      case "cuts":
        var pc = s.d / s.imgs.length;
        return '<div class="sc sc--cuts" style="--d:' + s.d + 'ms">' + s.imgs.map(function (src, k) {
          return '<figure class="cut" style="--k:' + k + ';--per:' + pc + 'ms;--rot:' + ((k % 2 ? 1 : -1) * (2 + (k % 3))) + 'deg"><img src="' + src + '" alt=""></figure>';
        }).join("") + '<p class="wall__cap">' + s.cap + "</p></div>";
      case "ring":
        var n = s.imgs.length;
        return '<div class="sc sc--ring" style="--d:' + s.d + 'ms;--n:' + n + '"><div class="ring3d"><div class="ring3d__spin">' + s.imgs.map(function (src, k) {
          return '<span style="--k:' + k + '"><img src="' + src + '" alt=""></span>';
        }).join("") + '</div></div><p class="wall__cap">' + s.cap + "</p></div>";
      case "tunnel":
        var tim = s.imgs.concat(s.imgs);
        return '<div class="sc sc--tunnel" style="--d:' + s.d + 'ms">' + tim.map(function (src, k) {
          var a = (k * 137.5) % 360;
          return '<span style="--k:' + k + ';--a:' + a + 'deg"><img src="' + src + '" alt=""></span>';
        }).join("") + '<p class="wall__cap">' + s.cap + "</p></div>";
      case "montage":
        var per = s.d / AUTO.length;
        return '<div class="sc sc--mont" style="--d:' + s.d + 'ms">' + AUTO.map(function (a, k) {
          return '<figure class="mont" style="--k:' + k + ';--per:' + per + 'ms"><img src="' + (AUTO_IMG[a.id] || "") + '" alt="">' +
            '<figcaption><b>' + a.runtime + '</b><span>' + a.title + "</span></figcaption></figure>";
        }).join("") + "</div>";
      case "collage": return '<div class="sc sc--collage" style="--d:' + s.d + 'ms;--cols:' + s.cols + '"><div class="clg">' +
        s.imgs.map(function (src, k) { return '<span style="--k:' + k + '"><img src="' + src + '" alt=""></span>'; }).join("") +
        '</div><p class="clg__cap">' + s.cap + "</p></div>";
      case "shot": return '<figure class="sc sc--shot" style="--d:' + s.d + 'ms;margin:0"><img src="' + s.src + '" alt=""><figcaption>' + s.cap + "</figcaption></figure>";
      case "words": return '<div class="sc"' + st + '><div><p class="sc__big">' + s.big + '</p><p class="sc__line">' + s.line + '</p><p class="sc__words">' +
        s.words.map(function (w, k) { return '<span style="animation-delay:' + (300 + k * 260) + 'ms">' + w + "</span>"; }).join("") + "</p></div></div>";
      default: return '<div class="sc"' + st + '><div>' + LOCKUP + '<p class="sc__small">' + s.small + "</p></div></div>";
    }
  }
  function plainText(s) {
    var tmp = document.createElement("div");
    if (["shot", "collage", "wall", "montage", "cuts", "ring", "tunnel", "laptop", "hl", "box"].indexOf(s.t) < 0) tmp.innerHTML = sceneHTML(s);
    if (s.t === "box") return "15+ Dashboards built";
    if (s.t === "hl") return s.h.name + ": " + s.h.num + " " + s.h.label;
    if (["collage", "wall", "cuts", "ring", "tunnel", "laptop"].indexOf(s.t) >= 0) return s.cap;
    if (s.t === "montage") return AUTO.map(function (a) { return a.title; }).join(", ");
    return s.t === "shot" ? s.cap : s.t === "logo" ? "I turn your data into dashboards and your busywork into automation. " + s.small : s.t === "mh" ? "MH. Data Analyst · Automation." : tmp.textContent.replace(/\s+/g, " ").trim();
  }

  var collageWarm = false;
  function warmCollages() {
    if (collageWarm) return; collageWarm = true;
    DASH_COLLAGE.concat(AUTO_COLLAGE, HL.map(function (h) { return h.src; })).forEach(function (src) { var im = new Image(); im.decoding = "async"; im.src = src; });
  }
  function showScene(i) {
    warmCollages();
    tr.i = i;
    var s = SCENES[i];
    stage.innerHTML = sceneHTML(s);
    var lapNum = $(".lap__num", stage);
    if (lapNum && !reduced()) {
      var to = +lapNum.getAttribute("data-to"), t0 = performance.now(), dur = s.d - 700;
      (function tick(now) {
        var p = Math.min(1, (now - t0) / dur), v = Math.max(1, Math.round(p * to));
        lapNum.textContent = (v < 10 ? "0" : "") + v + (p >= 1 ? "+" : "");
        if (p < 1 && lapNum.isConnected) requestAnimationFrame(tick);
      })(t0);
    } else if (lapNum) lapNum.textContent = "15+";
    var lapImgs = $$(".lap__screen img", stage);
    if (lapImgs.length) {
      var li = 0, per = (s.d - 600) / lapImgs.length;
      lapImgs[0].classList.add("is-on");
      if (!reduced()) (function step() {
        setTimeout(function () {
          if (!lapImgs[0].isConnected || li >= lapImgs.length - 1) return;
          lapImgs[li].classList.remove("is-on"); li++; lapImgs[li].classList.add("is-on"); step();
        }, per);
      })();
    }
    stage.setAttribute("aria-label", plainText(s));
    if (tr.manual) {
      bar.style.width = ((i + 1) / SCENES.length * 100) + "%";
      tNext.textContent = i === SCENES.length - 1 ? "Close" : "Next";
      return;
    }
    clearTimeout(tr.timer);
    tr.timer = setTimeout(function () {
      if (i + 1 < SCENES.length) showScene(i + 1); else endTrailer();
    }, s.d);
  }
  function tick() {
    var p = Math.min(1, (performance.now() - tr.start) / TOTAL);
    bar.style.width = (p * 100) + "%";
    if (p < 1 && !trailer.hidden) tr.raf = requestAnimationFrame(tick);
  }
  function playTrailer() {
    tr.opener = document.activeElement;
    tr.manual = reduced();
    trailer.classList.toggle("is-manual", tr.manual);
    trailer.hidden = false;
    trailer.classList.remove("is-out");
    trailer.classList.add("is-in");
    stage.setAttribute("role", "img");
    lockScroll(true);
    // restart background push animation
    var bgImg = $(".trailer__bg img", trailer);
    bgImg.style.animation = "none"; void bgImg.offsetWidth; bgImg.style.animation = "";
    tr.start = performance.now();
    showScene(0);
    if (!tr.manual) tr.raf = requestAnimationFrame(tick);
    (tr.manual ? tNext : tSkip).focus();
  }
  function endTrailer() {
    if (trailer.hidden) return;
    clearTimeout(tr.timer);
    cancelAnimationFrame(tr.raf);
    var finish = function () {
      trailer.hidden = true;
      trailer.classList.remove("is-out", "is-in");
      stage.innerHTML = "";
      bar.style.width = "0";
      lockScroll(false);
      quietFocus();
      var back = tr.opener && document.contains(tr.opener) ? tr.opener : playBtn;
      try { back.focus({ preventScroll: true }); } catch (e) { back.focus(); }
    };
    if (reduced()) { finish(); return; }
    trailer.classList.add("is-out");
    setTimeout(finish, 560);
  }
  playBtn.addEventListener("click", playTrailer);
  tSkip.addEventListener("click", endTrailer);
  /* popup: a click anywhere outside the frame closes the intro */
  trailer.addEventListener("click", function (e) { if (e.target === trailer) endTrailer(); });
  tNext.addEventListener("click", function () {
    if (tr.i + 1 < SCENES.length) showScene(tr.i + 1); else endTrailer();
  });
  trailer.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { e.preventDefault(); endTrailer(); return; }
    if (tr.manual && (e.key === "ArrowRight" || e.key === " ") && e.target !== tSkip) { e.preventDefault(); tNext.click(); }
    trapFocus(trailer, e);
  });

  /* ------------------------------------------------------------------
     Billboard parallax (desktop pointer only)
  ------------------------------------------------------------------ */
  var bill = $(".bill"), cast = $("#cast");
  bill.addEventListener("pointermove", function (e) {
    if (reduced() || !mqHover.matches || !mqDesk.matches) return;
    var r = bill.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    cast.style.transform = "translate3d(" + (x * -14).toFixed(1) + "px," + (y * -8).toFixed(1) + "px,0)";
  });
  bill.addEventListener("pointerleave", function () { if (mqDesk.matches) cast.style.transform = ""; });
  mqDesk.addEventListener && mqDesk.addEventListener("change", function () { cast.style.transform = ""; });

  /* ------------------------------------------------------------------
     Contact form + copy email
  ------------------------------------------------------------------ */
  $("#ctaForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var inp = $("#ctaInput"), v = inp.value.trim();
    if (!v) { inp.focus(); inp.placeholder = "First write what you need, e.g. a sales dashboard"; return; }
    /* mailto alone does nothing on computers without an email app, so offer webmail links too */
    var subj = "New project: " + v.slice(0, 60), body = v + "\n\n";
    $("#ctaGmail").href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(EMAIL) + "&su=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
    $("#ctaOutlook").href = "https://outlook.live.com/mail/0/deeplink/compose?to=" + encodeURIComponent(EMAIL) + "&subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
    $("#ctaApp").href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subj) + "&body=" + encodeURIComponent(body);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).catch(function () {});
    var box = $("#ctaSent"); box.hidden = false; box.classList.remove("is-in"); void box.offsetWidth; box.classList.add("is-in");
  });
  var copyBtn = $("#copyEmail"), copyTxt = $("#copyEmailTxt");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var done = function () {
      copyTxt.textContent = "Copied";
      copyBtn.setAttribute("aria-label", "Email address copied");
      setTimeout(function () { copyTxt.textContent = "Copy"; copyBtn.setAttribute("aria-label", "Copy email address"); }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, function () { window.location.href = "mailto:" + EMAIL; });
    } else { window.location.href = "mailto:" + EMAIL; }
  });

  /* ------------------------------------------------------------------
     Work-order printer (from Factory): prints when contact comes into view
  ------------------------------------------------------------------ */
  (function () {
    var tk = $("#ticket"), led = $("#prLed"), pr = $("#printer");
    if (!tk) return;
    function print() {
      if (reduced()) return;
      tk.classList.remove("is-print", "is-wait"); void tk.offsetWidth;
      tk.classList.add("is-print"); led.classList.add("is-on");
    }
    tk.addEventListener("animationend", function () { led.classList.remove("is-on"); });
    if (!reduced() && "IntersectionObserver" in window) {
      tk.classList.add("is-wait");
      var io = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { print(); io.disconnect(); }
      }, { threshold: 0.35 });
      io.observe(pr);
    }
    var c = $("#tkCopy");
    c.addEventListener("click", function () {
      var done = function () { c.textContent = "Copied"; setTimeout(function () { c.textContent = "Copy email"; }, 1600); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(EMAIL).then(done, function () { c.textContent = EMAIL; });
      else c.textContent = EMAIL;
    });
  })();

  /* ------------------------------------------------------------------
     Boot
  ------------------------------------------------------------------ */
  initStudio();
  buildCrew();
  onScroll();
  (function () {
    var H = { "#projects": "dashboards", "#dashboards": "dashboards", "#tools": "tools", "#price-radar": "tools", "#systems": "automations", "#automations": "automations", "#process": "process" };
    var k = H[location.hash];
    if (k) openStudio(k);
  })();

  /* play the intro automatically on a visitor's first visit (not on deep links, not with reduced motion) */
  (function () {
    var seen = false;
    try { seen = localStorage.getItem("mh-intro-seen") === "1"; } catch (e) {}
    var force = /[?&]intro=1/.test(location.search);
    if (!force && (seen || location.hash || reduced())) return;
    try { localStorage.setItem("mh-intro-seen", "1"); } catch (e) {}
    var go = function () { setTimeout(playTrailer, 350); };
    if (document.readyState === "complete") go(); else window.addEventListener("load", go, { once: true });
  })();
})();
