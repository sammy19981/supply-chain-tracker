const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel, BorderStyle,
  WidthType, ShadingType, PageNumber, PageBreak, TableOfContents } = require("/opt/homebrew/lib/node_modules/docx");

const BLUE = "1F4E79";
const LIGHT_BLUE = "D6E4F0";
const DARK_GRAY = "333333";
const MEDIUM_GRAY = "666666";
const border = { style: BorderStyle.SINGLE, size: 1, color: "BBBBBB" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 60, bottom: 60, left: 100, right: 100 };

function heading1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 360, after: 200 }, children: [new TextRun({ text, bold: true, size: 32, font: "Calibri", color: BLUE })] });
}

function heading2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 160 }, children: [new TextRun({ text, bold: true, size: 26, font: "Calibri", color: BLUE })] });
}

function para(text, opts = {}) {
  return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text, size: 22, font: "Calibri", color: opts.color || DARK_GRAY, bold: opts.bold || false, italics: opts.italics || false })] });
}

function paraMulti(runs) {
  return new Paragraph({ spacing: { after: 120 }, children: runs.map(r => new TextRun({ text: r.text, size: 22, font: "Calibri", color: r.color || DARK_GRAY, bold: r.bold || false, italics: r.italics || false })) });
}

function bullet(text, bold_prefix = null) {
  const children = [];
  if (bold_prefix) {
    children.push(new TextRun({ text: bold_prefix, size: 22, font: "Calibri", bold: true, color: DARK_GRAY }));
    children.push(new TextRun({ text, size: 22, font: "Calibri", color: DARK_GRAY }));
  } else {
    children.push(new TextRun({ text, size: 22, font: "Calibri", color: DARK_GRAY }));
  }
  return new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 80 }, children });
}

function numberedItem(text, bold_prefix = null) {
  const children = [];
  if (bold_prefix) {
    children.push(new TextRun({ text: bold_prefix, size: 22, font: "Calibri", bold: true, color: DARK_GRAY }));
    children.push(new TextRun({ text, size: 22, font: "Calibri", color: DARK_GRAY }));
  } else {
    children.push(new TextRun({ text, size: 22, font: "Calibri", color: DARK_GRAY }));
  }
  return new Paragraph({ numbering: { reference: "numbers", level: 0 }, spacing: { after: 80 }, children });
}

function makeTable(headers, rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  const headerRow = new TableRow({
    children: headers.map((h, i) => new TableCell({
      borders, width: { size: colWidths[i], type: WidthType.DXA }, margins: cellMargins,
      shading: { fill: BLUE, type: ShadingType.CLEAR },
      children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: "Calibri", color: "FFFFFF" })] })]
    }))
  });
  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      borders, width: { size: colWidths[i], type: WidthType.DXA }, margins: cellMargins,
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20, font: "Calibri", color: DARK_GRAY })] })]
    }))
  }));
  return new Table({ width: { size: totalWidth, type: WidthType.DXA }, columnWidths: colWidths, rows: [headerRow, ...dataRows] });
}

// TITLE PAGE
const titlePage = {
  properties: {
    page: {
      size: { width: 12240, height: 15840 },
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
    }
  },
  children: [
    new Paragraph({ spacing: { before: 3600 }, alignment: AlignmentType.CENTER, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [
      new TextRun({ text: "SupplyGuard", size: 72, bold: true, font: "Calibri", color: BLUE })
    ]}),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
      new TextRun({ text: "AI-Powered Supplier Risk & Due Diligence Tracker", size: 32, font: "Calibri", color: MEDIUM_GRAY })
    ]}),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 600 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 } }, children: [] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
      new TextRun({ text: "A Full-Stack Enterprise Web Application", size: 26, font: "Calibri", color: DARK_GRAY })
    ]}),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [
      new TextRun({ text: "for Procurement & Compliance Teams", size: 26, font: "Calibri", color: DARK_GRAY })
    ]}),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
      new TextRun({ text: "Sameer Saxena", size: 28, bold: true, font: "Calibri", color: DARK_GRAY })
    ]}),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 }, children: [
      new TextRun({ text: "University of Maryland", size: 24, font: "Calibri", color: MEDIUM_GRAY })
    ]}),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "April 2026", size: 24, font: "Calibri", color: MEDIUM_GRAY })
    ]}),
  ]
};

// TOC PAGE
const tocPage = {
  properties: {
    page: {
      size: { width: 12240, height: 15840 },
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
    }
  },
  headers: {
    default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [
      new TextRun({ text: "SupplyGuard \u2014 Project Report", size: 18, font: "Calibri", color: MEDIUM_GRAY, italics: true })
    ]})] })
  },
  footers: {
    default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "Page ", size: 18, font: "Calibri", color: MEDIUM_GRAY }),
      new TextRun({ children: [PageNumber.CURRENT], size: 18, font: "Calibri", color: MEDIUM_GRAY })
    ]})] })
  },
  children: [
    new Paragraph({ spacing: { after: 400 }, children: [new TextRun({ text: "Table of Contents", size: 36, bold: true, font: "Calibri", color: BLUE })] }),
    new TableOfContents("Table of Contents", { hyperlink: true, headingStyleRange: "1-2" }),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 1
    heading1("1. Executive Summary"),
    para("In today\u2019s global supply chains, procurement and compliance teams face overwhelming complexity \u2014 managing hundreds of suppliers across geographies, tracking regulatory compliance, monitoring sanctions lists, and assessing risk in real time. Traditional approaches rely on manual spreadsheets, periodic audits, and reactive decision-making."),
    para("SupplyGuard is an AI-powered enterprise web application that transforms supplier risk management from a reactive, manual process into a proactive, intelligent system. Built with modern web technologies and integrated with Generative AI, it provides real-time risk scoring, automated document tracking, sanctions screening, and AI-generated risk assessments \u2014 enabling procurement teams to make faster, data-driven decisions."),
    para("The application manages 150+ suppliers across 40+ countries, tracks 1,350+ compliance documents, monitors sanctions matches, and uses OpenAI\u2019s GPT-4o-mini model to generate actionable risk intelligence on demand."),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 2
    heading1("2. Problem Statement"),
    heading2("2.1 The Business Problem"),
    para("Global enterprises manage complex supplier networks spanning multiple countries, commodities, and regulatory jurisdictions. Key challenges include:"),
    bullet(" No centralized view of supplier risk across the portfolio. Risk data lives in spreadsheets, emails, and disparate systems.", "Risk Visibility Gap:"),
    bullet(" Tracking expiring documents (ISO certifications, insurance certificates, sanctions declarations) across hundreds of suppliers is error-prone and labor-intensive.", "Compliance Burden:"),
    bullet(" Failure to screen suppliers against sanctions lists (OFAC, EU, UN) can result in severe legal penalties and reputational damage.", "Sanctions Exposure:"),
    bullet(" Teams discover problems (overdue audits, expired contracts, sanctions flags) after they become crises rather than preventing them.", "Reactive Decision-Making:"),
    bullet(" Manual risk assessments are time-consuming, inconsistent, and don\u2019t scale.", "Audit Fatigue:"),

    heading2("2.2 The Cost of Inaction"),
    bullet("Average cost of a supply chain disruption: $184 million (Interos, 2023)"),
    bullet("73% of companies experienced supply chain disruptions in the past year"),
    bullet("Sanctions violations can result in fines up to $20 million per violation (OFAC)"),
    bullet("Manual compliance processes consume 40+ hours per week for mid-size procurement teams"),

    heading2("2.3 What\u2019s Missing in Current Tools"),
    bullet("Most existing tools are either too expensive (SAP Ariba, Coupa) or too basic (spreadsheets)"),
    bullet("No affordable solution integrates AI-powered analysis with real-time monitoring"),
    bullet("Small and mid-size teams need an intelligent, modern tool that doesn\u2019t require months of implementation"),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 3
    heading1("3. Solution Overview"),
    heading2("3.1 What is SupplyGuard?"),
    para("SupplyGuard is a full-stack web application that serves as a centralized command center for supplier risk management. It combines:"),
    bullet("Automated risk scoring using a weighted 8-factor algorithm"),
    bullet("Real-time data monitoring with live notifications"),
    bullet("AI-powered analysis using Generative AI (OpenAI GPT-4o-mini)"),
    bullet("Document lifecycle tracking for compliance"),
    bullet("Sanctions screening workflow"),
    bullet("Audit and contract renewal management"),

    heading2("3.2 Key Features"),
    makeTable(["Feature", "Description"], [
      ["AI Risk Assessment", "Generative AI analyzes individual supplier profiles and generates detailed risk summaries, key concerns, recommendations, and risk outlooks"],
      ["AI Portfolio Insights", "AI provides executive-level analysis of the entire supplier portfolio with prioritized action items and strategic recommendations"],
      ["Real-Time Dashboard", "KPI cards, risk distribution charts, spend-by-region visualization, and action queue showing items needing attention"],
      ["Automated Risk Scoring", "8-factor weighted algorithm (100-point scale) calculating risk bands: Low (0-24), Medium (25-44), High (45-69), Critical (70-100)"],
      ["Document Tracking", "Tracks 9 document types per supplier with status monitoring (valid, expired, missing, pending review)"],
      ["Sanctions Screening", "Matches suppliers against sanctions entities with review workflow (Clear, Escalate, Confirm Match)"],
      ["Real-Time Notifications", "Live alerts via Supabase Realtime when suppliers are added, risk scores change, sanctions status updates, or audits become overdue"],
      ["Google OAuth", "Secure sign-in with university/organization Google accounts"],
      ["CSV Data Export", "Export supplier data, risk reports, and audit status for compliance documentation"],
      ["Responsive Search", "Global search across supplier names, countries, and commodities"],
    ], [2800, 6560]),

    new Paragraph({ spacing: { after: 200 }, children: [] }),
    heading2("3.3 Risk Scoring Algorithm"),
    para("The risk score is calculated using 8 weighted factors totaling 100 points:"),
    makeTable(["Factor", "Max Points", "Description"], [
      ["Country Risk", "20", "Based on geographic risk (conflict zones, weak rule of law, sanctions-heavy regions)"],
      ["Business Criticality", "15", "How critical the supplier is to operations (critical, high, medium, low)"],
      ["Missing Documents", "15", "Percentage of required compliance documents that are missing or expired"],
      ["Commodity Risk", "15", "Inherent risk of the commodity category (chemicals, electronics, minerals)"],
      ["Overdue Audit", "10", "Whether the supplier\u2019s audit is overdue"],
      ["Contract Expiry", "10", "How close the contract is to expiration (within 30/60/90 days)"],
      ["Sanctions Status", "10", "Whether the supplier has sanctions flags (flagged, pending review, confirmed match)"],
      ["Single Source", "5", "Whether the supplier is the sole source for a commodity"],
    ], [2400, 1200, 5760]),

    new Paragraph({ spacing: { after: 120 }, children: [] }),
    paraMulti([
      { text: "Risk Bands: ", bold: true },
      { text: "Low (0-24) | Medium (25-44) | High (45-69) | Critical (70-100)" }
    ]),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 4
    heading1("4. Technology Architecture"),
    heading2("4.1 Tech Stack"),
    makeTable(["Layer", "Technology", "Purpose"], [
      ["Frontend", "Next.js 16 (App Router)", "Server-side rendering, file-based routing, API routes"],
      ["Language", "TypeScript (Strict Mode)", "Type safety across the entire codebase"],
      ["Styling", "Tailwind CSS + shadcn/ui", "Utility-first CSS with accessible, composable components"],
      ["Database", "Supabase (PostgreSQL)", "Managed Postgres with RLS, Realtime subscriptions"],
      ["Authentication", "Supabase Auth + Google OAuth", "Secure SSO with Google accounts"],
      ["AI/GenAI", "OpenAI API (GPT-4o-mini)", "Generative AI for risk analysis and portfolio insights"],
      ["Visualization", "Recharts", "Interactive pie charts and bar charts"],
      ["Deployment", "Vercel", "Edge deployment with automatic CI/CD from GitHub"],
      ["Version Control", "GitHub", "Source code management"],
    ], [2000, 3000, 4360]),

    new Paragraph({ spacing: { after: 200 }, children: [] }),
    heading2("4.2 Architecture"),
    para("The application follows a three-tier architecture:"),
    bullet(" Next.js React components with Tailwind CSS, running on Vercel\u2019s edge network", "Presentation Layer:"),
    bullet(" Next.js API routes (server-side) handling AI calls to OpenAI, auth callbacks, and business logic", "Application Layer:"),
    bullet(" Supabase PostgreSQL database with Realtime subscriptions for live data updates", "Data Layer:"),
    para("The AI integration is server-side only \u2014 the OpenAI API key never reaches the browser. API routes act as a secure proxy between the frontend and OpenAI."),

    heading2("4.3 Database Schema"),
    para("7 tables with relationships:"),
    makeTable(["Table", "Records", "Description"], [
      ["suppliers", "150", "Core supplier profiles with risk scores"],
      ["supplier_documents", "1,350", "9 document types per supplier"],
      ["sanctions_entities", "30", "Known sanctions list entries"],
      ["sanctions_matches", "14", "Supplier-to-sanctions entity matches"],
      ["audits", "82", "Audit schedules and results"],
      ["contracts", "152", "Contract lifecycle data"],
      ["risk_events", "40", "Historical risk event log"],
    ], [3000, 1200, 5160]),

    new Paragraph({ spacing: { after: 200 }, children: [] }),
    heading2("4.4 Graceful Degradation"),
    para("The application is designed to work in three modes:"),
    bullet(" Supabase + OpenAI both connected \u2014 all features active", "Full Mode:"),
    bullet(" Supabase connected, no OpenAI \u2014 all features except AI analysis", "Database Only:"),
    bullet(" No external services \u2014 falls back to 150 deterministic demo suppliers generated with a seeded random algorithm", "Demo Mode:"),
    para("This ensures the application always renders meaningful data, even without external dependencies."),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 5
    heading1("5. AI & Generative AI Integration"),
    heading2("5.1 Why Generative AI?"),
    para("Traditional risk scoring produces a number (e.g., 72/100). But procurement managers need to understand:"),
    bullet("WHY is this supplier risky?"),
    bullet("WHAT specific actions should I take?"),
    bullet("HOW will the risk trajectory change?"),
    bullet("WHAT are the portfolio-level patterns I\u2019m missing?"),
    para("Generative AI bridges the gap between raw data and actionable intelligence. Instead of staring at numbers, users get natural language analysis that reads like a senior analyst\u2019s report."),

    heading2("5.2 How GenAI is Used"),
    paraMulti([{ text: "Feature 1: AI Supplier Risk Assessment", bold: true }]),
    bullet(" User clicks \u201CGenerate AI Assessment\u201D on any supplier\u2019s detail page", "Trigger:"),
    bullet(" Supplier profile data, risk score breakdown (all 8 factors with scores and explanations), and document status (9 documents with current status)", "Input:"),
    bullet(" The data is sent to OpenAI\u2019s GPT-4o-mini model via a server-side API route with a carefully engineered prompt", "AI Processing:"),
    bullet(" Four sections \u2014 Risk Summary (2-3 sentences), Key Concerns (bullet list), Recommendations (3-5 actionable steps), and Risk Outlook (trajectory prediction)", "Output:"),
    bullet(" Transforms a risk score of \u201C72\u201D into a detailed analysis explaining that the score is driven by the supplier\u2019s location in a sanctions-heavy region, 6 missing compliance documents, and an overdue audit \u2014 with specific recommendations", "Value:"),

    new Paragraph({ spacing: { after: 120 }, children: [] }),
    paraMulti([{ text: "Feature 2: AI Portfolio Insights", bold: true }]),
    bullet(" User clicks \u201CGenerate Portfolio Insights\u201D on the dashboard", "Trigger:"),
    bullet(" Portfolio-wide statistics, top 10 highest-risk suppliers with details, active sanctions cases count", "Input:"),
    bullet(" Sent to GPT-4o-mini with a prompt requesting executive-level analysis", "AI Processing:"),
    bullet(" Executive Summary, Top 3 Priorities This Week, Risk Trends, and Strategic Recommendation", "Output:"),
    bullet(" Provides a weekly executive briefing that would normally require a senior analyst spending hours compiling data. Now generated in seconds.", "Value:"),

    heading2("5.3 Prompt Engineering"),
    para("The prompts are carefully engineered to:"),
    bullet("Set the AI\u2019s persona (senior supply chain risk analyst/advisor)"),
    bullet("Provide structured data in a clear format"),
    bullet("Request output in a specific, consistent format with section headers"),
    bullet("Instruct the AI to be specific (reference actual data points, not generic advice)"),
    bullet("Use professional procurement/compliance language"),
    bullet("Keep responses concise and actionable"),

    heading2("5.4 Technical Implementation"),
    bullet("Server-side only: API key never exposed to the browser"),
    bullet("API routes at /api/ai/supplier-assessment and /api/ai/portfolio-insights"),
    bullet("Model: GPT-4o-mini (cost-effective, fast, high quality for structured analysis)"),
    bullet("Max tokens: 1,024 per request"),
    bullet("Error handling: Graceful fallback with user-friendly error messages"),
    bullet("Health check endpoint: /api/ai/health for settings page integration status"),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 6
    heading1("6. Real-Time Features"),
    heading2("6.1 Supabase Realtime Subscriptions"),
    para("The application uses Supabase\u2019s PostgreSQL Realtime feature to listen for database changes. When any of the following occur, users receive instant notifications WITHOUT refreshing the page:"),
    bullet("New supplier added \u2192 \u201CNew supplier added: [Name]\u201D"),
    bullet("Risk score changed \u2192 \u201CRisk score increased/decreased for [Name]: 45 \u2192 82\u201D"),
    bullet("Sanctions status changed \u2192 \u201CSanctions status changed for [Name]: clear \u2192 flagged\u201D"),
    bullet("Audit status updated \u2192 \u201CAudit status updated for [Name]: overdue\u201D"),
    bullet("Supplier removed \u2192 \u201CSupplier removed: [Name]\u201D"),
    bullet("New document uploaded"),
    bullet("New sanctions match detected"),

    heading2("6.2 Notification System"),
    bullet(" Slide-in alerts at the bottom-right of the screen", "Toast notifications:"),
    bullet(" Persistent notification center with new/read states, urgent indicators, and clear-all functionality", "Bell dropdown:"),
    bullet(" Real-time count on the bell icon", "Unread badge:"),

    heading2("6.3 Demo Impact"),
    para("In a live demo, you can:"),
    numberedItem("Open the app on one screen"),
    numberedItem("Make a change in Supabase Table Editor on another screen"),
    numberedItem("Watch the notification appear instantly in the app \u2014 no page refresh"),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 7
    heading1("7. How It Solves the Business Problem"),
    makeTable(["Problem", "How SupplyGuard Solves It"], [
      ["No centralized risk visibility", "Single dashboard with KPI cards, risk distribution charts, and portfolio-wide statistics"],
      ["Manual, inconsistent risk assessment", "Automated 8-factor algorithm produces consistent, objective scores for all 150+ suppliers"],
      ["Time-consuming analysis", "AI generates detailed risk assessments in seconds instead of hours"],
      ["Reactive decision-making", "Real-time notifications alert teams to changes as they happen"],
      ["Document tracking chaos", "Centralized document tracker with status monitoring across 9 document types"],
      ["Sanctions screening gaps", "Automated matching with review workflow (Clear, Escalate, Confirm)"],
      ["No portfolio-level patterns", "AI Portfolio Insights identifies trends, concentrations, and strategic recommendations"],
      ["Expensive enterprise tools", "Built with open-source technologies \u2014 fraction of the cost of SAP Ariba or Coupa"],
      ["Slow onboarding", "Google OAuth SSO \u2014 sign in with your organization account in one click"],
    ], [3400, 5960]),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 8
    heading1("8. What Makes This Different in the AI Era"),
    heading2("8.1 Before AI (Traditional Approach)"),
    bullet("Risk analysts manually review each supplier quarterly"),
    bullet("Risk scores are subjective and vary between analysts"),
    bullet("Portfolio insights require days of data compilation"),
    bullet("Sanctions screening is periodic, not continuous"),
    bullet("Reports are static PDFs that are outdated by the time they\u2019re read"),

    heading2("8.2 With SupplyGuard (AI-Powered Approach)"),
    bullet("AI analyzes any supplier on demand in seconds"),
    bullet("Risk scores are algorithmic, consistent, and objective"),
    bullet("Portfolio insights are generated instantly with specific action items"),
    bullet("Real-time monitoring with instant notifications"),
    bullet("Dynamic, interactive dashboards that reflect live data"),

    heading2("8.3 The Competitive Edge"),
    bullet(" SupplyGuard doesn\u2019t just display data \u2014 it interprets it using Generative AI", "Not just a dashboard:"),
    bullet(" The AI doesn\u2019t give generic advice \u2014 it references the actual supplier\u2019s data points, scores, and documents", "Contextual intelligence:"),
    bullet(" A junior procurement analyst gets insights comparable to a senior risk advisor", "Democratized expertise:"),
    bullet(" What took a senior analyst 4-6 hours per supplier now takes 10 seconds", "Speed:"),
    bullet(" Built entirely with open-source and affordable APIs \u2014 no enterprise licensing fees", "Cost:"),
    bullet(" Clean, responsive interface that feels like a modern SaaS product, not a legacy enterprise tool", "Modern UX:"),

    heading2("8.4 Future AI Enhancements (Roadmap)"),
    bullet(" Use historical risk events to predict which suppliers are likely to become high-risk", "Predictive Risk Scoring:"),
    bullet(" Use AI to extract and validate information from uploaded compliance documents (OCR + NLP)", "Automated Document Processing:"),
    bullet(" \u201CShow me all critical-risk suppliers in Asia with expiring contracts\u201D \u2014 conversational search", "Natural Language Queries:"),
    bullet(" Flag unusual changes in supplier behavior patterns", "Anomaly Detection:"),
    bullet(" Generate board-ready compliance reports with AI", "Automated Compliance Reports:"),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 9
    heading1("9. Technical Highlights"),
    bullet("TypeScript strict mode across the entire codebase with Database generics for Supabase"),
    bullet("Server-side API routes for AI calls \u2014 API keys never reach the client"),
    bullet("Graceful degradation: Supabase \u2192 demo data fallback ensures the app always works"),
    bullet("Seeded random number generator for deterministic demo data (same data on every load)"),
    bullet("Supabase Row Level Security (RLS) policies for data protection"),
    bullet("Real-time subscriptions using PostgreSQL\u2019s logical replication"),
    bullet("OAuth 2.0 flow with PKCE for secure Google authentication"),
    bullet("Responsive design with Tailwind CSS utility classes"),
    bullet("Component composition with shadcn/ui (accessible, unstyled primitives)"),
    bullet("Edge deployment on Vercel with automatic CI/CD from GitHub"),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 10
    heading1("10. Conclusion"),
    para("SupplyGuard demonstrates how modern web technologies combined with Generative AI can transform a traditional business process. By replacing manual spreadsheets and periodic reviews with an intelligent, real-time platform, procurement and compliance teams can:"),
    bullet("Reduce risk assessment time from hours to seconds"),
    bullet("Catch compliance issues before they become crises"),
    bullet("Make data-driven decisions backed by AI analysis"),
    bullet("Monitor their entire supplier portfolio from a single dashboard"),
    para("The project showcases full-stack engineering skills (Next.js, TypeScript, PostgreSQL, OAuth), AI integration (prompt engineering, API architecture), and product thinking (solving a real business problem with a polished, user-friendly interface)."),
    para("In the era of AI, the organizations that win are not those with the most data \u2014 but those that can turn data into actionable intelligence fastest. SupplyGuard is built for that future.", { italics: true }),
    new Paragraph({ children: [new PageBreak()] }),

    // SECTION 11
    heading1("11. Links & References"),
    makeTable(["Item", "Details"], [
      ["Live Application", "https://supply-chain-tracker-azure.vercel.app"],
      ["GitHub Repository", "https://github.com/saxenasameer98-1858s/supply-chain-tracker"],
      ["Tech Stack", "Next.js 16, TypeScript, Tailwind CSS, Supabase, OpenAI API, Vercel"],
      ["AI Model", "OpenAI GPT-4o-mini"],
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
      { reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: "numbers",
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    ]
  },
  sections: [titlePage, tocPage]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("/Users/samsa/Desktop/Supply Chain Project/SupplyGuard_Project_Report.docx", buffer);
  console.log("Report generated successfully!");
});
