const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents } = require("/opt/homebrew/lib/node_modules/docx");

const BLUE = "1F4E79";
const ACCENT = "2E75B6";
const GREEN = "2E7D32";
const RED = "C62828";
const ORANGE = "E65100";
const DARK_GRAY = "333333";
const MEDIUM_GRAY = "666666";
const LIGHT_GRAY = "F2F2F2";
const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };
const boxMargins = { top: 100, bottom: 100, left: 140, right: 140 };

function h1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text, bold: true, size: 32, font: "Calibri", color: BLUE })] });
}
function h2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 }, children: [new TextRun({ text, bold: true, size: 26, font: "Calibri", color: BLUE })] });
}
function p(text, opts = {}) {
  return new Paragraph({ spacing: { after: opts.after || 120 }, alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: [new TextRun({ text, size: opts.size || 22, font: "Calibri", color: opts.color || DARK_GRAY, bold: !!opts.bold, italics: !!opts.italics })] });
}
function pMulti(runs, opts = {}) {
  return new Paragraph({ spacing: { after: opts.after || 120 }, alignment: opts.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: runs.map(r => new TextRun({ text: r.text, size: r.size || 22, font: "Calibri", color: r.color || DARK_GRAY, bold: !!r.bold, italics: !!r.italics })) });
}
function bull(text, prefix = null) {
  const c = [];
  if (prefix) { c.push(new TextRun({ text: prefix, size: 22, font: "Calibri", bold: true, color: DARK_GRAY })); }
  c.push(new TextRun({ text: prefix ? text : text, size: 22, font: "Calibri", color: DARK_GRAY }));
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children: c });
}
function bull2(text) {
  return new Paragraph({ numbering: { reference: "bullets2", level: 0 }, spacing: { after: 60 }, children: [new TextRun({ text, size: 20, font: "Calibri", color: MEDIUM_GRAY })] });
}
function num(text, prefix = null) {
  const c = [];
  if (prefix) { c.push(new TextRun({ text: prefix, size: 22, font: "Calibri", bold: true, color: DARK_GRAY })); }
  c.push(new TextRun({ text: prefix ? text : text, size: 22, font: "Calibri", color: DARK_GRAY }));
  return new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 80 }, children: c });
}
function spacer(h = 120) { return new Paragraph({ spacing: { after: h }, children: [] }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }

function makeTable(headers, rows, colWidths) {
  const tw = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: tw, type: WidthType.DXA }, columnWidths: colWidths,
    rows: [
      new TableRow({ children: headers.map((h, i) => new TableCell({ borders, width: { size: colWidths[i], type: WidthType.DXA }, margins: cellMargins,
        shading: { fill: BLUE, type: ShadingType.CLEAR },
        children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: "Calibri", color: "FFFFFF" })] })] })) }),
      ...rows.map(row => new TableRow({ children: row.map((cell, i) => new TableCell({ borders, width: { size: colWidths[i], type: WidthType.DXA }, margins: cellMargins,
        children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20, font: "Calibri", color: DARK_GRAY })] })] })) }))
    ]
  });
}

// Scope indicator table: colored left border box
function scopeTable(items) {
  const tw = 9360;
  return new Table({
    width: { size: tw, type: WidthType.DXA }, columnWidths: [tw],
    rows: items.map(item => {
      const inScope = item.scope;
      const leftBorder = { style: BorderStyle.SINGLE, size: 12, color: inScope ? GREEN : ORANGE };
      return new TableRow({ children: [new TableCell({
        borders: { top: border, bottom: border, right: border, left: leftBorder },
        width: { size: tw, type: WidthType.DXA }, margins: boxMargins,
        shading: { fill: inScope ? "E8F5E9" : "FFF3E0", type: ShadingType.CLEAR },
        children: [
          new Paragraph({ spacing: { after: 40 }, children: [
            new TextRun({ text: (inScope ? "\u2713 IN SCOPE" : "\u2717 OUT OF SCOPE") + "  \u2014  ", size: 18, bold: true, font: "Calibri", color: inScope ? GREEN : ORANGE }),
            new TextRun({ text: item.title, size: 22, bold: true, font: "Calibri", color: DARK_GRAY }),
          ]}),
          new Paragraph({ children: [new TextRun({ text: item.desc, size: 20, font: "Calibri", color: MEDIUM_GRAY })] }),
        ]
      })] });
    })
  });
}

// Architecture diagram as a structured table
function archDiagram() {
  const tw = 9360;
  const c3 = [3120, 3120, 3120];
  const headerBorder = { style: BorderStyle.SINGLE, size: 1, color: ACCENT };
  const headerBorders = { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder };

  function boxCell(title, items, color, width) {
    return new TableCell({
      borders: headerBorders, width: { size: width, type: WidthType.DXA },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      shading: { fill: color, type: ShadingType.CLEAR },
      children: [
        new Paragraph({ spacing: { after: 60 }, alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: title, size: 20, bold: true, font: "Calibri", color: BLUE })
        ]}),
        ...items.map(t => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 30 }, children: [
          new TextRun({ text: t, size: 18, font: "Calibri", color: DARK_GRAY })
        ]}))
      ]
    });
  }

  return new Table({
    width: { size: tw, type: WidthType.DXA }, columnWidths: c3,
    rows: [
      // Row 1: External inputs
      new TableRow({ children: [
        boxCell("EXTERNAL DATA SOURCES", ["Sanctions Lists (OFAC/EU/UN)", "Country Risk Indices", "Regulatory Updates"], "E3F2FD", 3120),
        boxCell("USER INTERFACES", ["Web Dashboard", "Search & Filters", "AI Analysis Panel"], "E8F5E9", 3120),
        boxCell("INTEGRATIONS", ["Google OAuth (SSO)", "CSV Import/Export", "Webhook-Ready API"], "FFF3E0", 3120),
      ]}),
      // Row 2: Arrow row
      new TableRow({ children: [new TableCell({ borders: noBorders, width: { size: tw, type: WidthType.DXA }, columnSpan: 3,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [
          new TextRun({ text: "\u2193          \u2193          \u2193", size: 28, font: "Calibri", color: ACCENT, bold: true })
        ]})] })] }),
      // Row 3: Core platform
      new TableRow({ children: [new TableCell({ borders: headerBorders, width: { size: tw, type: WidthType.DXA }, columnSpan: 3,
        margins: { top: 100, bottom: 100, left: 140, right: 140 },
        shading: { fill: "E8EAF6", type: ShadingType.CLEAR },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
            new TextRun({ text: "SUPPLYGUARD CORE PLATFORM", size: 24, bold: true, font: "Calibri", color: BLUE })
          ]}),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [
            new TextRun({ text: "Next.js 16 App Router  |  TypeScript  |  Tailwind CSS + shadcn/ui  |  Recharts", size: 18, font: "Calibri", color: DARK_GRAY })
          ]}),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [
            new TextRun({ text: "Server-Side API Routes  |  Risk Scoring Engine (8 factors, 100pts)  |  Real-Time Notifications", size: 18, font: "Calibri", color: DARK_GRAY })
          ]}),
        ]
      })] }),
      // Row 4: Arrow row
      new TableRow({ children: [new TableCell({ borders: noBorders, width: { size: tw, type: WidthType.DXA }, columnSpan: 3,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 }, children: [
          new TextRun({ text: "\u2193          \u2193          \u2193", size: 28, font: "Calibri", color: ACCENT, bold: true })
        ]})] })] }),
      // Row 5: Backend services
      new TableRow({ children: [
        boxCell("SUPABASE (PostgreSQL)", ["7 Tables with RLS", "Realtime Subscriptions", "Auth + Row-Level Security"], "E3F2FD", 3120),
        boxCell("OpenAI GPT-4o-mini", ["Supplier Risk Assessment", "Portfolio Insights", "Prompt Engineering"], "F3E5F5", 3120),
        boxCell("VERCEL (Deployment)", ["Edge Network CDN", "Auto CI/CD from GitHub", "Serverless Functions"], "E8F5E9", 3120),
      ]}),
    ]
  });
}

// Data flow diagram
function dataFlowDiagram() {
  const tw = 9360;
  const headerBorder = { style: BorderStyle.SINGLE, size: 1, color: ACCENT };
  const headerBorders = { top: headerBorder, bottom: headerBorder, left: headerBorder, right: headerBorder };

  function stepCell(num, title, desc, color, width) {
    return new TableCell({
      borders: headerBorders, width: { size: width, type: WidthType.DXA },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      shading: { fill: color, type: ShadingType.CLEAR },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [
          new TextRun({ text: num, size: 28, bold: true, font: "Calibri", color: ACCENT })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [
          new TextRun({ text: title, size: 20, bold: true, font: "Calibri", color: DARK_GRAY })
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, children: [
          new TextRun({ text: desc, size: 18, font: "Calibri", color: MEDIUM_GRAY })
        ]}),
      ]
    });
  }

  return new Table({
    width: { size: tw, type: WidthType.DXA }, columnWidths: [2340, 2340, 2340, 2340],
    rows: [new TableRow({ children: [
      stepCell("\u2460", "DATA INGESTION", "Supplier data from Supabase or demo seed", "E3F2FD", 2340),
      stepCell("\u2461", "RISK SCORING", "8-factor algorithm calculates 0-100 score", "E8F5E9", 2340),
      stepCell("\u2462", "AI ANALYSIS", "GPT-4o-mini generates insights from scored data", "F3E5F5", 2340),
      stepCell("\u2463", "REAL-TIME ALERTS", "Supabase Realtime pushes changes to UI", "FFF3E0", 2340),
    ]})]
  });
}

// Lifecycle diagram
function lifecycleDiagram() {
  const tw = 9360;
  const c3 = [3120, 3120, 3120];
  const hb = { style: BorderStyle.SINGLE, size: 2, color: ACCENT };
  const hbs = { top: hb, bottom: hb, left: hb, right: hb };

  function stageCell(num, title, subtitle, focus, items, color, width) {
    return new TableCell({
      borders: { top: { style: BorderStyle.SINGLE, size: 6, color }, bottom: hb, left: hb, right: hb },
      width: { size: width, type: WidthType.DXA },
      margins: { top: 100, bottom: 100, left: 100, right: 100 },
      shading: { fill: "FAFAFA", type: ShadingType.CLEAR },
      children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 40 }, children: [
          new TextRun({ text: `STAGE ${num}`, size: 16, bold: true, font: "Calibri", color }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [
          new TextRun({ text: title, size: 22, bold: true, font: "Calibri", color: DARK_GRAY }),
        ]}),
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 }, children: [
          new TextRun({ text: `(${subtitle})`, size: 18, font: "Calibri", color: MEDIUM_GRAY }),
        ]}),
        new Paragraph({ spacing: { after: 60 }, children: [
          new TextRun({ text: "Focus: ", size: 18, bold: true, font: "Calibri", color: DARK_GRAY }),
          new TextRun({ text: focus, size: 18, font: "Calibri", color: MEDIUM_GRAY }),
        ]}),
        ...items.map(item => new Paragraph({ spacing: { after: 30 }, children: [
          new TextRun({ text: `\u2022 ${item}`, size: 18, font: "Calibri", color: DARK_GRAY }),
        ]})),
      ]
    });
  }

  return new Table({
    width: { size: tw, type: WidthType.DXA }, columnWidths: c3,
    rows: [
      new TableRow({ children: [
        stageCell("1", "VENDOR REGISTRATION", "Onboarding", "Data Capture & Document Baseline",
          ["Profile Creation (Name, Location, Commodity)", "Document Upload (9 Types)", "Compliance: Document Collection"], "2E75B6", 3120),
        stageCell("2", "VENDOR VERIFICATION", "Diligence", "Risk Analysis & Sanctions Matching",
          ["8-Factor Risk Scoring Algorithm", "Sanctions Screening (30+ Lists)", "AI Deep-Dive Assessment", "Compliance: Sanctions Exposure Check"], "2E7D32", 3120),
        stageCell("3", "CONTINUOUS AUDIT", "Monitoring", "Proactive Monitoring & Actionable Intel",
          ["Real-Time Alerts (Toast Notifications)", "Document Lifecycle Tracking", "AI Portfolio Insights (Weekly)", "Periodic Audit Scheduling", "Compliance: Live Status"], "7B1FA2", 3120),
      ]}),
    ]
  });
}

// ====== DOCUMENT ======
const titleSection = {
  properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
  children: [
    spacer(3600),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: "SupplyGuard", size: 72, bold: true, font: "Calibri", color: BLUE })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [new TextRun({ text: "AI-Powered Supplier Risk & Due Diligence Tracker", size: 32, font: "Calibri", color: MEDIUM_GRAY })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 } }, children: [] }),
    p("A Full-Stack Enterprise Web Application", { center: true, size: 26 }),
    p("for Procurement & Compliance Teams", { center: true, size: 26, after: 400 }),
    p("Sameer Saxena", { center: true, size: 28, bold: true }),
    p("University of Maryland", { center: true, size: 24, color: MEDIUM_GRAY }),
    p("April 2026", { center: true, size: 24, color: MEDIUM_GRAY }),
  ]
};

const mainSection = {
  properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
  headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
    new TextRun({ text: "SupplyGuard \u2014 Project Report", size: 18, font: "Calibri", color: MEDIUM_GRAY, italics: true })
  ]})] }) },
  footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
    new TextRun({ text: "Page ", size: 18, font: "Calibri", color: MEDIUM_GRAY }),
    new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Calibri", color: MEDIUM_GRAY })
  ]})] }) },
  children: [
    new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
    pb(),

    // =========== SECTION 1: THE PROBLEM ===========
    h1("1. The Supply Chain Problem"),
    p("Global supply chains are under unprecedented pressure. Procurement and compliance teams manage hundreds of suppliers across geographies, tracking regulatory compliance, monitoring sanctions, and assessing risk \u2014 often with spreadsheets and manual processes."),
    spacer(60),
    p("The four key problem areas in supply chain management:", { bold: true }),
    spacer(60),
    scopeTable([
      { scope: true, title: "Compliance & Due Diligence", desc: "Tracking expiring documents (ISO certifications, insurance, sanctions declarations), audit schedules, and regulatory requirements across 150+ suppliers. Manual processes are error-prone, inconsistent, and don\u2019t scale." },
      { scope: false, title: "Real-Time Traceability", desc: "Tracking materials from source to destination in transit \u2014 disruptions from natural calamities, war, trade barriers, and geopolitical events. Requires IoT/GPS integration beyond current scope." },
      { scope: false, title: "Business Impact on Customer Orders", desc: "Production challenges, order delays, and cascading effects when suppliers fail. Requires ERP integration and demand forecasting models." },
      { scope: true, title: "Risk Assessment & Mitigation", desc: "Identifying which suppliers pose the highest risk and why, generating actionable intelligence, and providing AI-powered recommendations for risk mitigation. SupplyGuard automates this with an 8-factor algorithm + Generative AI." },
    ]),
    spacer(120),
    pMulti([{ text: "SupplyGuard focuses on problems #1 and #4 ", bold: true }, { text: "\u2014 the compliance and risk assessment layers where AI can have the most immediate impact. Problems #2 and #3 require hardware/IoT and ERP integrations that represent future roadmap items." }]),

    h2("1.1 Why This Matters"),
    bull("Average cost of a supply chain disruption: $184 million (Interos, 2023)"),
    bull("73% of companies experienced supply chain disruptions in the past year"),
    bull("Sanctions violations can result in fines up to $20 million per violation (OFAC)"),
    bull("Manual compliance processes consume 40+ hours/week for mid-size procurement teams"),

    h2("1.2 The Market Gap"),
    p("Current tools fall into two extremes:"),
    makeTable(["Category", "Examples", "Problem"], [
      ["Enterprise Platforms", "SAP Ariba, Coupa, TrusTrace, Sourcemap", "Expensive ($100K+/year), months to implement, complex onboarding"],
      ["Manual Tools", "Excel, Google Sheets, Email", "No automation, no AI, inconsistent, doesn\u2019t scale"],
      ["SupplyGuard", "This project", "Open-source stack, AI-powered, deploys in minutes, fraction of the cost"],
    ], [2400, 2800, 4160]),
    spacer(60),
    p("Industry reference: TrusTrace (trustrace.com) offers supply chain traceability for material compliance \u2014 SupplyGuard addresses a complementary but different layer: supplier risk scoring and AI-driven due diligence.", { italics: true, color: MEDIUM_GRAY }),
    pb(),

    // =========== SECTION 2: SOLUTION OVERVIEW ===========
    h1("2. Solution: SupplyGuard at a Glance"),
    p("SupplyGuard is a centralized command center for supplier risk management that combines automated scoring, real-time monitoring, and Generative AI analysis."),
    spacer(60),

    // Key metrics boxes
    makeTable(["150+", "1,350+", "8 Factors", "10 sec"], [
      ["Suppliers tracked across 40+ countries", "Compliance documents monitored", "Weighted risk algorithm (100-point scale)", "AI assessment time (vs. 4-6 hours manual)"],
    ], [2340, 2340, 2340, 2340]),
    spacer(200),

    h2("2.1 What AI Does vs. What the Platform Does"),
    makeTable(["Capability", "Platform (Automated)", "AI (Generative)"], [
      ["Risk Scoring", "8-factor algorithm calculates score 0-100", "Explains WHY the score is what it is"],
      ["Document Tracking", "Monitors 9 doc types per supplier", "N/A (future: OCR extraction)"],
      ["Sanctions Screening", "Matches against entity lists", "N/A (future: NLP entity resolution)"],
      ["Portfolio Analysis", "Dashboard with charts and KPIs", "Executive briefing with priorities"],
      ["Recommendations", "N/A", "3-5 specific actions per supplier"],
      ["Notifications", "Real-time via Supabase Realtime", "N/A"],
    ], [2200, 3580, 3580]),
    pb(),

    // =========== SECTION 3: COMPLIANCE LIFECYCLE ===========
    h1("3. Supplier Compliance Lifecycle"),
    p("SupplyGuard manages suppliers through a 3-stage compliance lifecycle \u2014 from initial onboarding through continuous monitoring. Each stage has a clear compliance focus and integrates both internal and external systems."),
    spacer(60),
    lifecycleDiagram(),
    spacer(200),

    h2("3.1 Stage Details"),
    pMulti([{ text: "Stage 1 \u2014 Vendor Registration (Onboarding): ", bold: true }, { text: "New suppliers are onboarded with profile creation (name, location, commodity, criticality) and baseline document collection across 9 standard types (ISO 9001, ISO 14001, Insurance Certificate, Financial Statements, Sanctions Declaration, ESG Questionnaire, Code of Conduct, Business Continuity Plan, Tax Compliance). Internal systems: Supabase Auth (Google OAuth) + PostgreSQL. External: Supplier data portal." }]),
    pMulti([{ text: "Stage 2 \u2014 Vendor Verification (Diligence): ", bold: true }, { text: "The 8-factor risk scoring algorithm calculates an initial risk score (0-100). Sanctions screening matches suppliers against 30+ global lists (OFAC, EU, UN). OpenAI GPT-4o-mini generates deep-dive AI assessments with specific recommendations. Internal: Risk Scoring Engine. External: OpenAI API + Global Sanctions Lists." }]),
    pMulti([{ text: "Stage 3 \u2014 Continuous Audit (Monitoring): ", bold: true }, { text: "Real-time alerts via Supabase Realtime notify teams instantly when risk scores change, sanctions flags appear, or documents expire. AI portfolio insights provide weekly executive briefings. Audit scheduling tracks overdue and upcoming audits. Internal: Supabase Realtime + Recharts Dashboard. External: OpenAI API + Sanctions Databases." }]),
    spacer(60),

    h2("3.2 Internal vs External System Integration"),
    makeTable(["Stage", "Internal Systems", "External Systems"], [
      ["1. Registration", "Supabase Auth/OAuth, PostgreSQL Database", "Supplier Data Portal"],
      ["2. Verification", "Risk Scoring Engine (8 factors)", "OpenAI API (GPT-4o-mini), Global Sanctions Lists"],
      ["3. Monitoring", "Supabase Realtime, Recharts Dashboard", "OpenAI API (Portfolio Analysis), Sanctions DBs"],
    ], [2000, 3680, 3680]),
    spacer(60),
    p("The Application Layer (Next.js/TypeScript, deployed on Vercel) coordinates between the Internal Data Layer (Supabase, PostgreSQL) and the External Intelligence Layer (OpenAI, Sanctions APIs).", { bold: true }),
    pb(),

    // =========== SECTION 4: ARCHITECTURE ===========
    h1("4. System Architecture"),
    h2("4.1 How SupplyGuard Integrates"),
    p("The diagram below shows how SupplyGuard connects external data sources, user interfaces, and backend services:"),
    spacer(60),
    archDiagram(),
    spacer(200),

    h2("4.2 Data Flow: From Raw Data to AI Insight"),
    p("Every supplier goes through a four-stage pipeline:"),
    spacer(60),
    dataFlowDiagram(),
    spacer(200),

    h2("4.3 Tech Stack"),
    makeTable(["Layer", "Technology", "Purpose"], [
      ["Frontend", "Next.js 16 (App Router)", "Server-side rendering, file-based routing, API routes"],
      ["Language", "TypeScript (Strict Mode)", "Type safety across the entire codebase"],
      ["Styling", "Tailwind CSS + shadcn/ui", "Utility-first CSS with accessible components"],
      ["Database", "Supabase (PostgreSQL)", "Managed Postgres with RLS, Realtime subscriptions"],
      ["Auth", "Supabase Auth + Google OAuth", "Secure SSO with Google accounts"],
      ["AI/GenAI", "OpenAI API (GPT-4o-mini)", "Risk analysis and portfolio insights"],
      ["Charts", "Recharts", "Interactive pie charts and bar charts"],
      ["Deployment", "Vercel", "Edge CDN with auto CI/CD from GitHub"],
    ], [2000, 3000, 4360]),
    spacer(60),

    h2("4.4 Database: 7 Tables"),
    makeTable(["Table", "Records", "Description"], [
      ["suppliers", "150", "Core profiles with risk scores, country, commodity, spend"],
      ["supplier_documents", "1,350", "9 document types per supplier with expiry tracking"],
      ["sanctions_entities", "30", "Known sanctions list entries (OFAC/EU/UN)"],
      ["sanctions_matches", "14", "Supplier-to-entity matches requiring review"],
      ["audits", "82", "Audit schedules, results, and overdue tracking"],
      ["contracts", "152", "Contract lifecycle with expiry alerts"],
      ["risk_events", "40", "Historical risk event log"],
    ], [3000, 1200, 5160]),
    spacer(60),

    h2("4.5 Graceful Degradation"),
    p("The app works in three modes \u2014 it never shows a blank screen:"),
    bull(" Supabase + OpenAI connected = all features active", "Full Mode:"),
    bull(" Supabase only = everything except AI analysis", "Database Only:"),
    bull(" No external services = 150 deterministic demo suppliers via seeded random", "Demo Mode:"),
    pb(),

    // =========== SECTION 5: AI DEEP DIVE ===========
    h1("5. AI & Generative AI: How and Why"),
    h2("5.1 The Gap AI Fills"),
    p("Traditional tools give you a number. AI gives you understanding:"),
    makeTable(["Question", "Without AI", "With SupplyGuard AI"], [
      ["Why is this supplier risky?", "Score: 72/100 (no explanation)", "Detailed analysis: sanctions flag + 6 missing docs + overdue audit in high-risk region"],
      ["What should I do?", "Figure it out yourself", "3-5 specific, actionable recommendations referencing actual data"],
      ["What\u2019s the risk trajectory?", "Unknown", "AI predicts whether risk will increase/decrease and why"],
      ["Portfolio patterns?", "Days of manual analysis", "Executive briefing in 10 seconds with named suppliers"],
    ], [2200, 2400, 4760]),
    spacer(120),

    h2("5.2 AI Feature 1: Supplier Risk Assessment"),
    bull(" User clicks \u201CGenerate AI Assessment\u201D on any supplier detail page", "Trigger:"),
    bull(" Supplier profile + risk breakdown (8 factors with scores) + 9 document statuses", "Input:"),
    bull(" GPT-4o-mini via server-side API route with engineered prompt", "Model:"),
    bull(" Risk Summary, Key Concerns, Recommendations, Risk Outlook", "Output:"),
    spacer(60),

    h2("5.3 AI Feature 2: Portfolio Insights"),
    bull(" User clicks \u201CGenerate Portfolio Insights\u201D on the dashboard", "Trigger:"),
    bull(" Portfolio stats, risk distribution, top 10 risky suppliers, sanctions count", "Input:"),
    bull(" Executive Summary, Top 3 Priorities This Week, Risk Trends, Strategic Recommendation", "Output:"),
    spacer(60),

    h2("5.4 Prompt Engineering"),
    p("The prompts are carefully engineered to:"),
    bull("Set the AI\u2019s persona (senior supply chain risk analyst)"),
    bull("Provide structured data so the AI has full context"),
    bull("Request output in a consistent, parseable format"),
    bull("Instruct specificity: reference actual data points, not generic advice"),
    bull("Enforce professional procurement/compliance language"),
    spacer(60),

    h2("5.5 Security"),
    bull("OpenAI API key is server-side only \u2014 never reaches the browser"),
    bull("API routes act as secure proxy between frontend and AI"),
    bull("Health check endpoint for integration status monitoring"),
    pb(),

    // =========== SECTION 5: REAL-TIME ===========
    h1("6. Real-Time Monitoring"),
    p("SupplyGuard uses Supabase\u2019s PostgreSQL Realtime feature for instant notifications:"),
    spacer(60),
    makeTable(["Event", "Notification", "Urgency"], [
      ["New supplier added", "\u201CNew supplier added: [Name]\u201D", "High"],
      ["Risk score changed", "\u201CRisk score increased for [Name]: 45 \u2192 82\u201D", "Critical if \u226570"],
      ["Sanctions status changed", "\u201CSanctions status changed: clear \u2192 flagged\u201D", "High"],
      ["Audit overdue", "\u201CAudit status updated: overdue\u201D", "High"],
      ["Supplier removed", "\u201CSupplier removed: [Name]\u201D", "High"],
      ["New document uploaded", "\u201CNew document uploaded\u201D", "Normal"],
      ["Sanctions match detected", "\u201CNew sanctions match \u2014 review required\u201D", "Critical"],
    ], [2800, 4360, 2200]),
    spacer(120),
    p("Demo impact: Open the app on one screen and Supabase Table Editor on another. Make a change \u2014 the toast notification appears instantly in the app without refreshing the page.", { bold: true }),
    pb(),

    // =========== SECTION 6: BUSINESS IMPACT ===========
    h1("7. Business Impact"),
    makeTable(["Problem", "How SupplyGuard Solves It", "Impact"], [
      ["No risk visibility", "Single dashboard with KPIs and charts", "100% portfolio visibility"],
      ["Inconsistent scoring", "Automated 8-factor algorithm", "Objective, repeatable scores"],
      ["Slow analysis", "AI generates assessments in 10 seconds", "240x faster than manual"],
      ["Reactive approach", "Real-time notifications on every change", "Zero-delay awareness"],
      ["Document chaos", "Centralized tracker for 9 doc types", "No missed expirations"],
      ["Sanctions risk", "Automated screening with workflow", "Reduced legal exposure"],
      ["No portfolio view", "AI executive briefing on demand", "Strategic decision support"],
      ["Expensive tools", "Open-source + affordable APIs", "90%+ cost reduction"],
    ], [2200, 4160, 3000]),
    pb(),

    // =========== SECTION 7: DIFFERENTIATION ===========
    h1("8. What Makes This Different in the AI Era"),
    h2("8.1 Before vs. After"),
    makeTable(["Dimension", "Before AI", "With SupplyGuard"], [
      ["Assessment speed", "4-6 hours per supplier", "10 seconds"],
      ["Consistency", "Varies by analyst", "Algorithmic + AI"],
      ["Portfolio view", "Days of compilation", "Instant executive briefing"],
      ["Monitoring", "Periodic/quarterly", "Real-time, continuous"],
      ["Reports", "Static PDFs", "Dynamic, interactive dashboards"],
      ["Cost", "$100K+/year enterprise tools", "Open-source + API costs"],
      ["Onboarding", "Months of implementation", "Google SSO, deploy in minutes"],
    ], [2200, 3580, 3580]),
    spacer(120),

    h2("8.2 The Competitive Edge"),
    bull(" SupplyGuard interprets data using GenAI, not just displays it", "Intelligence, not dashboards:"),
    bull(" AI references actual supplier data points, not generic templates", "Contextual analysis:"),
    bull(" Junior analysts get senior-level insights", "Democratized expertise:"),
    bull(" From hours to seconds", "Speed:"),
    bull(" Open-source stack, no licensing fees", "Cost:"),
    bull(" Feels like modern SaaS, not legacy enterprise", "Modern UX:"),
    spacer(60),

    h2("8.3 Future Roadmap"),
    makeTable(["Enhancement", "Description", "AI Technology"], [
      ["Predictive Risk Scoring", "Predict which suppliers will become high-risk", "Time-series ML models"],
      ["Document Processing", "Extract and validate info from uploaded docs", "OCR + NLP"],
      ["Natural Language Search", "\u201CShow critical suppliers in Asia with expiring contracts\u201D", "LLM-powered query parsing"],
      ["Anomaly Detection", "Flag unusual changes in supplier behavior", "Statistical anomaly models"],
      ["Auto Compliance Reports", "Generate board-ready reports with AI", "Document generation LLM"],
      ["Blockchain Audit Trail", "Immutable compliance records shared across customers, banks, suppliers, and agencies", "Distributed ledger (experimental)"],
      ["Real-Time Traceability", "Track materials in transit (IoT integration)", "Sensor data + ML"],
      ["ERP Integration", "Connect to SAP/Oracle for order impact analysis", "API connectors"],
    ], [2800, 3360, 3200]),
    pb(),

    // =========== SECTION 8: TECHNICAL ===========
    h2("8.4 Emerging Technologies in SCM Compliance"),
    p("Beyond AI, several emerging technologies are reshaping supply chain compliance:"),
    makeTable(["Technology", "Status", "Application in Compliance"], [
      ["Generative AI", "Active in SupplyGuard", "Risk assessments, portfolio insights, natural language analysis of supplier data"],
      ["Blockchain", "Experimental (industry-wide)", "Immutable audit trails where customers, banks, suppliers, and agencies collaborate on shared compliance records. Enables trustless verification across multi-tier supply chains."],
      ["IoT / Real-Time Traceability", "Future roadmap", "GPS/sensor tracking of materials from source to destination. Monitoring disruptions from natural calamities, war, and trade barriers."],
      ["Computer Vision / OCR", "Future roadmap", "Automated extraction and validation of compliance documents (certificates, declarations, audit reports)"],
    ], [2400, 2200, 4760]),
    spacer(60),
    p("SupplyGuard is positioned to integrate these technologies as they mature \u2014 the modular architecture and API-first design make it straightforward to add new data sources and intelligence layers.", { italics: true }),
    pb(),

    h1("9. Technical Highlights"),
    bull("TypeScript strict mode with Database generics for Supabase"),
    bull("Server-side API routes \u2014 API keys never reach the client"),
    bull("Graceful degradation: Supabase \u2192 demo data fallback"),
    bull("Seeded random number generator for deterministic demo data"),
    bull("Row Level Security (RLS) policies on all tables"),
    bull("Real-time subscriptions via PostgreSQL logical replication"),
    bull("OAuth 2.0 with PKCE for secure Google authentication"),
    bull("Responsive design with Tailwind CSS"),
    bull("Accessible component primitives via shadcn/ui"),
    bull("Edge deployment on Vercel with auto CI/CD"),
    pb(),

    // =========== SECTION 9: CONCLUSION ===========
    h1("10. Conclusion"),
    p("SupplyGuard demonstrates how modern web technologies combined with Generative AI can transform supplier risk management from a reactive, manual process into a proactive, intelligent system."),
    spacer(60),
    p("By addressing the compliance and risk assessment layers of supply chain management, the platform enables procurement teams to:"),
    bull("Reduce risk assessment time from hours to seconds"),
    bull("Catch compliance issues before they become crises"),
    bull("Make data-driven decisions backed by AI analysis"),
    bull("Monitor their entire supplier portfolio in real time"),
    spacer(60),
    p("The project showcases full-stack engineering (Next.js, TypeScript, PostgreSQL, OAuth), AI integration (prompt engineering, API architecture), and product thinking (solving a real business problem with a polished interface)."),
    spacer(60),
    p("In the era of AI, the organizations that win are not those with the most data \u2014 but those that can turn data into actionable intelligence fastest. SupplyGuard is built for that future.", { italics: true, bold: true }),
    pb(),

    // =========== SECTION 10: LINKS ===========
    h1("11. Links & References"),
    makeTable(["Item", "Details"], [
      ["Live Application", "https://supply-chain-tracker-azure.vercel.app"],
      ["GitHub Repository", "https://github.com/saxenasameer98-1858s/supply-chain-tracker"],
      ["Tech Stack", "Next.js 16, TypeScript, Tailwind CSS, Supabase, OpenAI API, Vercel"],
      ["AI Model", "OpenAI GPT-4o-mini"],
      ["Industry Reference", "TrusTrace (trustrace.com) \u2014 supply chain traceability"],
      ["Industry Reference", "Sourcemap (sourcemap.com) \u2014 supply chain transparency & due diligence"],
      ["Author", "Sameer Saxena, University of Maryland"],
    ], [2800, 6560]),
  ]
};

const doc = new Document({
  styles: {
    default: { document: { run: { font: "Calibri", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Calibri", color: BLUE },
        paragraph: { spacing: { before: 360, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Calibri", color: BLUE },
        paragraph: { spacing: { before: 280, after: 160 }, outlineLevel: 1 } },
    ]
  },
  numbering: {
    config: [
      { reference: "bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "bullets2", levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2013", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 1080, hanging: 360 } } } }] },
      { reference: "numbers", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [titleSection, mainSection]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/samsa/Desktop/Supply Chain Project/SupplyGuard_Project_Report.docx", buffer);
  console.log("Report v2 generated successfully!");
});
