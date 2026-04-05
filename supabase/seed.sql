-- ============================================================================
-- SUPPLIER RISK MANAGEMENT APPLICATION - SEED DATA
-- Generated for demo/development purposes
-- Reference date: 2026-04-03
-- ============================================================================

-- ============================================================================
-- 1. SUPPLIERS (150+ across 30 countries, 15 commodity groups)
-- ============================================================================

INSERT INTO suppliers (
  id, supplier_name, country, region, commodity, risk_score, risk_band,
  onboarding_status, audit_status, sanctions_status,
  single_source_flag, annual_spend, business_criticality,
  parent_company, contract_start_date, contract_end_date, audit_due_date,
  created_at, updated_at
) VALUES

-- === USA (12 suppliers) ===
(gen_random_uuid(), 'Apex Circuit Technologies', 'USA', 'North America', 'Electronics Components', 22, 'low',
 'approved', 'completed', 'clear', false, 12500000, 'high',
 NULL, '2024-09-01', '2026-04-07', NULL,
 '2024-03-15', '2026-03-20'),

(gen_random_uuid(), 'Harmon Chemical Solutions', 'USA', 'North America', 'Chemicals', 45, 'medium',
 'approved', 'completed', 'clear', false, 8700000, 'medium',
 'Harmon Industries Group', '2025-04-01', '2026-04-09', NULL,
 '2023-09-01', '2026-02-14'),

(gen_random_uuid(), 'PrimeServ IT Consulting', 'USA', 'North America', 'IT Services', 18, 'low',
 'approved', 'completed', 'clear', false, 3200000, 'medium',
 NULL, '2024-11-01', '2026-04-11', NULL,
 '2024-06-10', '2026-03-28'),

(gen_random_uuid(), 'Cascade Packaging Inc.', 'USA', 'North America', 'Packaging', 35, 'medium',
 'approved', 'scheduled', 'clear', false, 1800000, 'low',
 NULL, '2025-06-01', '2026-04-13', '2026-10-15',
 '2025-01-20', '2026-03-15'),

(gen_random_uuid(), 'Summit Pharmaceutical Corp.', 'USA', 'North America', 'Pharmaceuticals', 28, 'low',
 'approved', 'completed', 'clear', false, 22000000, 'critical',
 NULL, '2024-01-01', '2026-04-15', NULL,
 '2022-11-05', '2026-04-01'),

(gen_random_uuid(), 'Greenfield Agriculture Supply', 'USA', 'North America', 'Agriculture', 40, 'medium',
 'approved', 'overdue', 'clear', false, 950000, 'low',
 NULL, '2025-08-01', '2026-04-17', '2026-02-15',
 '2024-08-12', '2025-12-01'),

(gen_random_uuid(), 'Titanium Alloy Works', 'USA', 'North America', 'Metals', 52, 'medium',
 'approved', 'completed', 'clear', true, 15600000, 'critical',
 NULL, '2024-03-01', '2026-04-19', NULL,
 '2023-04-18', '2026-03-25'),

(gen_random_uuid(), 'Cornerstone Professional Group', 'USA', 'North America', 'Professional Services', 15, 'low',
 'approved', 'completed', 'clear', false, 780000, 'low',
 NULL, '2025-10-01', '2026-04-21', NULL,
 '2025-06-01', '2026-03-10'),

(gen_random_uuid(), 'Blackrock Energy Partners', 'USA', 'North America', 'Energy', 55, 'medium',
 'approved', 'scheduled', 'pending_review', false, 31000000, 'critical',
 NULL, '2024-05-01', '2026-04-23', '2026-09-15',
 '2023-01-22', '2026-03-30'),

(gen_random_uuid(), 'Delta MRO Distributors', 'USA', 'North America', 'MRO Supplies', 30, 'low',
 'approved', 'completed', 'clear', false, 2100000, 'medium',
 NULL, '2025-12-01', '2026-04-25', NULL,
 '2024-11-08', '2026-02-28'),

(gen_random_uuid(), 'Pacific Rare Elements', 'USA', 'North America', 'Rare Earth Minerals', 68, 'high',
 'approved', 'overdue', 'clear', true, 8900000, 'critical',
 NULL, '2024-07-01', '2026-06-06', '2026-01-15',
 '2023-07-14', '2025-10-15'),

(gen_random_uuid(), 'Westland Logistics Corp.', 'USA', 'North America', 'Logistics Services', 25, 'low',
 'approved', 'completed', 'clear', false, 4500000, 'medium',
 NULL, '2025-02-01', '2026-06-09', NULL,
 '2024-02-28', '2026-03-18'),

-- === UK (8 suppliers) ===
(gen_random_uuid(), 'Sterling Components Ltd.', 'UK', 'Europe', 'Electronics Components', 20, 'low',
 'approved', 'completed', 'clear', false, 6800000, 'high',
 NULL, '2024-09-01', '2026-06-12', NULL,
 '2023-05-10', '2026-03-22'),

(gen_random_uuid(), 'Thames Chemical Works', 'UK', 'Europe', 'Chemicals', 42, 'medium',
 'approved', 'completed', 'clear', false, 4200000, 'medium',
 'Thames Industrial Holdings', '2025-04-01', '2026-06-15', NULL,
 '2024-01-15', '2026-03-05'),

(gen_random_uuid(), 'Albion Textile Mills', 'UK', 'Europe', 'Textiles', 38, 'medium',
 'approved', 'scheduled', 'clear', false, 2900000, 'medium',
 NULL, '2024-11-01', '2026-06-18', '2026-09-15',
 '2024-07-20', '2026-02-20'),

(gen_random_uuid(), 'Crown Packaging Solutions', 'UK', 'Europe', 'Packaging', 19, 'low',
 'approved', 'completed', 'clear', false, 1500000, 'low',
 NULL, '2025-06-01', '2026-06-21', NULL,
 '2025-03-01', '2026-03-28'),

(gen_random_uuid(), 'Meridian Pharma UK', 'UK', 'Europe', 'Pharmaceuticals', 33, 'medium',
 'approved', 'completed', 'clear', false, 14200000, 'high',
 'Meridian Health Sciences', '2024-01-01', '2026-06-24', NULL,
 '2022-08-14', '2026-03-15'),

(gen_random_uuid(), 'Northgate IT Services', 'UK', 'Europe', 'IT Services', 24, 'low',
 'approved', 'completed', 'clear', false, 1800000, 'medium',
 NULL, '2025-08-01', '2026-06-27', NULL,
 '2024-09-05', '2026-03-12'),

(gen_random_uuid(), 'Caledonia Metal Alloys', 'UK', 'Europe', 'Metals', 47, 'medium',
 'approved', 'overdue', 'clear', false, 7600000, 'high',
 NULL, '2024-03-01', '2026-06-02', '2026-03-15',
 '2023-02-20', '2025-09-30'),

(gen_random_uuid(), 'Britannia Energy Group', 'UK', 'Europe', 'Energy', 50, 'medium',
 'approved', 'completed', 'clear', false, 18500000, 'critical',
 NULL, '2025-10-01', '2026-06-05', NULL,
 '2023-06-01', '2026-03-20'),

-- === Germany (8 suppliers) ===
(gen_random_uuid(), 'Müller Elektronik GmbH', 'Germany', 'Europe', 'Electronics Components', 16, 'low',
 'approved', 'completed', 'clear', false, 9400000, 'high',
 'Müller Gruppe', '2024-05-01', '2027-01-15', NULL,
 '2023-03-10', '2026-04-01'),

(gen_random_uuid(), 'Rheinland Chemie AG', 'Germany', 'Europe', 'Chemicals', 27, 'low',
 'approved', 'completed', 'clear', false, 11200000, 'high',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2022-12-01', '2026-03-25'),

(gen_random_uuid(), 'Bayerische Stahl Werke', 'Germany', 'Europe', 'Metals', 31, 'medium',
 'approved', 'completed', 'clear', false, 16800000, 'critical',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2023-01-15', '2026-03-18'),

(gen_random_uuid(), 'Dresden Textilwerk', 'Germany', 'Europe', 'Textiles', 23, 'low',
 'approved', 'scheduled', 'clear', false, 3400000, 'medium',
 NULL, '2025-02-01', '2027-04-15', '2026-06-15',
 '2024-05-20', '2026-02-10'),

(gen_random_uuid(), 'Heidelberg Pharma Solutions', 'Germany', 'Europe', 'Pharmaceuticals', 21, 'low',
 'approved', 'completed', 'clear', false, 19500000, 'critical',
 'Heidelberg Life Sciences', '2024-09-01', '2027-01-15', NULL,
 '2022-06-10', '2026-03-30'),

(gen_random_uuid(), 'Schwarz Verpackung GmbH', 'Germany', 'Europe', 'Packaging', 14, 'low',
 'approved', 'completed', 'clear', false, 2200000, 'low',
 NULL, '2025-04-01', '2027-10-15', NULL,
 '2025-02-15', '2026-03-22'),

(gen_random_uuid(), 'Berliner IT Systeme', 'Germany', 'Europe', 'IT Services', 29, 'low',
 'approved', 'completed', 'clear', false, 2800000, 'medium',
 NULL, '2024-11-01', '2027-07-15', NULL,
 '2024-04-01', '2026-03-14'),

(gen_random_uuid(), 'Norddeutsche Energie AG', 'Germany', 'Europe', 'Energy', 36, 'medium',
 'approved', 'completed', 'clear', false, 24000000, 'critical',
 NULL, '2025-06-01', '2027-04-15', NULL,
 '2023-08-01', '2026-03-28'),

-- === China (12 suppliers) ===
(gen_random_uuid(), 'Shenzhen Precision Electronics', 'China', 'Asia Pacific', 'Electronics Components', 58, 'medium',
 'approved', 'completed', 'clear', false, 28000000, 'critical',
 NULL, '2024-01-01', '2027-01-15', NULL,
 '2022-09-15', '2026-03-20'),

(gen_random_uuid(), 'Guangzhou Chemical Industrial Co.', 'China', 'Asia Pacific', 'Chemicals', 65, 'high',
 'approved', 'overdue', 'pending_review', false, 7800000, 'high',
 'Guangzhou Industrial Holdings', '2025-08-01', '2027-10-15', '2026-02-15',
 '2023-04-20', '2025-11-10'),

(gen_random_uuid(), 'Baotou Rare Earth Processing', 'China', 'Asia Pacific', 'Rare Earth Minerals', 78, 'high',
 'approved', 'overdue', 'clear', true, 42000000, 'critical',
 NULL, '2024-03-01', '2027-07-15', '2026-03-15',
 '2022-05-01', '2025-08-20'),

(gen_random_uuid(), 'Ningbo Metal Trading Co.', 'China', 'Asia Pacific', 'Metals', 62, 'high',
 'approved', 'completed', 'clear', false, 18500000, 'high',
 NULL, '2025-10-01', '2027-04-15', NULL,
 '2023-06-10', '2026-03-15'),

(gen_random_uuid(), 'Dongguan Textile Manufacturing', 'China', 'Asia Pacific', 'Textiles', 55, 'medium',
 'approved', 'scheduled', 'clear', false, 5600000, 'medium',
 NULL, '2024-05-01', '2027-01-15', '2026-09-15',
 '2024-02-14', '2026-02-28'),

(gen_random_uuid(), 'Shanghai Packaging Solutions', 'China', 'Asia Pacific', 'Packaging', 48, 'medium',
 'approved', 'completed', 'clear', false, 3200000, 'medium',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2024-08-01', '2026-03-10'),

(gen_random_uuid(), 'Beijing Cloud Technologies', 'China', 'Asia Pacific', 'IT Services', 44, 'medium',
 'approved', 'completed', 'clear', false, 4100000, 'medium',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2024-06-15', '2026-03-22'),

(gen_random_uuid(), 'Tianjin Steel Corporation', 'China', 'Asia Pacific', 'Metals', 70, 'high',
 'approved', 'overdue', 'clear', false, 35000000, 'critical',
 'Tianjin Heavy Industry Group', '2025-02-01', '2027-04-15', '2026-02-15',
 '2022-03-01', '2025-07-15'),

(gen_random_uuid(), 'Wuhan Pharmaceutical Co.', 'China', 'Asia Pacific', 'Pharmaceuticals', 60, 'high',
 'approved', 'completed', 'pending_review', false, 9200000, 'high',
 NULL, '2024-09-01', '2027-01-15', NULL,
 '2023-10-05', '2026-03-18'),

(gen_random_uuid(), 'Chengdu Agriculture Export', 'China', 'Asia Pacific', 'Agriculture', 53, 'medium',
 'approved', 'scheduled', 'clear', false, 2800000, 'medium',
 NULL, '2025-04-01', '2027-10-15', '2026-08-15',
 '2024-11-01', '2026-02-20'),

(gen_random_uuid(), 'Suzhou Conflict Minerals Trading', 'China', 'Asia Pacific', 'Conflict Minerals', 85, 'critical',
 'in_progress', 'overdue', 'flagged', true, 18000000, 'critical',
 NULL, '2024-11-01', '2027-07-15', '2026-02-15',
 '2023-02-10', '2026-04-02'),

(gen_random_uuid(), 'Foshan MRO Equipment Co.', 'China', 'Asia Pacific', 'MRO Supplies', 46, 'medium',
 'approved', 'completed', 'clear', false, 1400000, 'low',
 NULL, '2025-06-01', '2027-04-15', NULL,
 '2025-01-15', '2026-03-08'),

-- === India (10 suppliers) ===
(gen_random_uuid(), 'Tata Advanced Materials', 'India', 'Asia Pacific', 'Raw Materials', 35, 'medium',
 'approved', 'completed', 'clear', false, 14800000, 'high',
 'Tata Industries', '2024-01-01', '2027-01-15', NULL,
 '2022-10-15', '2026-03-25'),

(gen_random_uuid(), 'Mumbai Pharma Exports', 'India', 'Asia Pacific', 'Pharmaceuticals', 42, 'medium',
 'approved', 'completed', 'clear', false, 11500000, 'high',
 NULL, '2025-08-01', '2027-10-15', NULL,
 '2023-03-20', '2026-03-18'),

(gen_random_uuid(), 'Bangalore Tech Services Pvt.', 'India', 'Asia Pacific', 'IT Services', 28, 'low',
 'approved', 'completed', 'clear', false, 5600000, 'high',
 NULL, '2024-03-01', '2027-07-15', NULL,
 '2023-09-01', '2026-04-01'),

(gen_random_uuid(), 'Chennai Chemical Industries', 'India', 'Asia Pacific', 'Chemicals', 50, 'medium',
 'approved', 'scheduled', 'clear', false, 3900000, 'medium',
 NULL, '2025-10-01', '2027-04-15', '2026-08-15',
 '2024-04-10', '2026-02-15'),

(gen_random_uuid(), 'Surat Textile Corporation', 'India', 'Asia Pacific', 'Textiles', 38, 'medium',
 'approved', 'completed', 'clear', false, 7200000, 'high',
 NULL, '2024-05-01', '2027-01-15', NULL,
 '2023-07-15', '2026-03-20'),

(gen_random_uuid(), 'Jaipur Metals & Alloys', 'India', 'Asia Pacific', 'Metals', 44, 'medium',
 'approved', 'overdue', 'clear', false, 5100000, 'medium',
 NULL, '2025-12-01', '2027-10-15', '2026-03-15',
 '2024-01-20', '2025-10-30'),

(gen_random_uuid(), 'Hyderabad Electronics Pvt.', 'India', 'Asia Pacific', 'Electronics Components', 32, 'medium',
 'approved', 'completed', 'clear', false, 8400000, 'high',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2023-11-05', '2026-03-12'),

(gen_random_uuid(), 'Delhi Packaging Solutions', 'India', 'Asia Pacific', 'Packaging', 26, 'low',
 'approved', 'completed', 'clear', false, 1200000, 'low',
 NULL, '2025-02-01', '2027-04-15', NULL,
 '2025-05-01', '2026-03-05'),

(gen_random_uuid(), 'Kolkata Agriculture Trading', 'India', 'Asia Pacific', 'Agriculture', 41, 'medium',
 'approved', 'scheduled', 'clear', false, 2400000, 'medium',
 NULL, '2024-09-01', '2027-01-15', '2026-07-15',
 '2024-09-15', '2026-02-25'),

(gen_random_uuid(), 'Pune Professional Consulting', 'India', 'Asia Pacific', 'Professional Services', 17, 'low',
 'approved', 'completed', 'clear', false, 650000, 'low',
 NULL, '2025-04-01', '2027-10-15', NULL,
 '2025-08-01', '2026-03-30'),

-- === Brazil (6 suppliers) ===
(gen_random_uuid(), 'Amazonia Raw Materials SA', 'Brazil', 'Latin America', 'Raw Materials', 56, 'medium',
 'approved', 'completed', 'clear', false, 9800000, 'high',
 NULL, '2024-11-01', '2027-07-15', NULL,
 '2023-05-15', '2026-03-20'),

(gen_random_uuid(), 'São Paulo Chemicals Ltda.', 'Brazil', 'Latin America', 'Chemicals', 48, 'medium',
 'approved', 'scheduled', 'clear', false, 4500000, 'medium',
 NULL, '2025-06-01', '2027-04-15', '2026-10-15',
 '2024-03-01', '2026-02-28'),

(gen_random_uuid(), 'Rio Metals Trading', 'Brazil', 'Latin America', 'Metals', 61, 'high',
 'approved', 'overdue', 'clear', false, 12300000, 'high',
 NULL, '2024-01-01', '2027-01-15', '2026-01-15',
 '2023-08-20', '2025-09-15'),

(gen_random_uuid(), 'Curitiba Textile Exports', 'Brazil', 'Latin America', 'Textiles', 37, 'medium',
 'approved', 'completed', 'clear', false, 3100000, 'medium',
 NULL, '2025-08-01', '2027-10-15', NULL,
 '2024-06-10', '2026-03-15'),

(gen_random_uuid(), 'Brasilia Agriculture Corp.', 'Brazil', 'Latin America', 'Agriculture', 43, 'medium',
 'approved', 'completed', 'clear', false, 6700000, 'high',
 NULL, '2024-03-01', '2027-07-15', NULL,
 '2023-11-01', '2026-03-22'),

(gen_random_uuid(), 'Manaus Energy Solutions', 'Brazil', 'Latin America', 'Energy', 54, 'medium',
 'approved', 'completed', 'clear', false, 15200000, 'critical',
 NULL, '2025-10-01', '2027-04-15', NULL,
 '2023-02-15', '2026-03-18'),

-- === Japan (8 suppliers) ===
(gen_random_uuid(), 'Yamato Electronics Corp.', 'Japan', 'Asia Pacific', 'Electronics Components', 12, 'low',
 'approved', 'completed', 'clear', false, 21000000, 'critical',
 'Yamato Industrial Group', '2024-05-01', '2027-01-15', NULL,
 '2022-04-01', '2026-04-02'),

(gen_random_uuid(), 'Nippon Chemical Industries', 'Japan', 'Asia Pacific', 'Chemicals', 19, 'low',
 'approved', 'completed', 'clear', false, 8900000, 'high',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2023-01-10', '2026-03-25'),

(gen_random_uuid(), 'Osaka Steel Manufacturing', 'Japan', 'Asia Pacific', 'Metals', 24, 'low',
 'approved', 'completed', 'clear', false, 28500000, 'critical',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2022-07-15', '2026-03-30'),

(gen_random_uuid(), 'Tokyo Precision Parts', 'Japan', 'Asia Pacific', 'Electronics Components', 15, 'low',
 'approved', 'completed', 'clear', false, 16400000, 'critical',
 'Tokyo Manufacturing Holdings', '2025-02-01', '2027-04-15', NULL,
 '2022-09-01', '2026-03-20'),

(gen_random_uuid(), 'Kyoto Pharmaceutical Co.', 'Japan', 'Asia Pacific', 'Pharmaceuticals', 18, 'low',
 'approved', 'completed', 'clear', false, 25000000, 'critical',
 NULL, '2024-09-01', '2027-01-15', NULL,
 '2022-03-10', '2026-04-01'),

(gen_random_uuid(), 'Nagoya Packaging Systems', 'Japan', 'Asia Pacific', 'Packaging', 13, 'low',
 'approved', 'completed', 'clear', false, 3800000, 'medium',
 NULL, '2025-04-01', '2027-10-15', NULL,
 '2024-05-15', '2026-03-18'),

(gen_random_uuid(), 'Fukuoka Rare Metals Co.', 'Japan', 'Asia Pacific', 'Rare Earth Minerals', 40, 'medium',
 'approved', 'scheduled', 'clear', true, 11200000, 'critical',
 NULL, '2024-11-01', '2027-07-15', '2026-09-15',
 '2023-06-20', '2026-03-22'),

(gen_random_uuid(), 'Sapporo Logistics KK', 'Japan', 'Asia Pacific', 'Logistics Services', 20, 'low',
 'approved', 'completed', 'clear', false, 5200000, 'high',
 NULL, '2025-06-01', '2027-04-15', NULL,
 '2024-01-05', '2026-03-14'),

-- === South Korea (6 suppliers) ===
(gen_random_uuid(), 'Seoul Semiconductor Partners', 'South Korea', 'Asia Pacific', 'Electronics Components', 22, 'low',
 'approved', 'completed', 'clear', false, 18700000, 'critical',
 NULL, '2024-01-01', '2027-01-15', NULL,
 '2022-11-15', '2026-03-28'),

(gen_random_uuid(), 'Busan Chemical Corp.', 'South Korea', 'Asia Pacific', 'Chemicals', 30, 'low',
 'approved', 'completed', 'clear', false, 6500000, 'high',
 NULL, '2025-08-01', '2027-10-15', NULL,
 '2023-07-01', '2026-03-20'),

(gen_random_uuid(), 'Incheon Steel Works', 'South Korea', 'Asia Pacific', 'Metals', 28, 'low',
 'approved', 'completed', 'clear', false, 22000000, 'critical',
 'Incheon Heavy Industries', '2024-03-01', '2027-07-15', NULL,
 '2022-08-10', '2026-03-25'),

(gen_random_uuid(), 'Daegu Textile Industries', 'South Korea', 'Asia Pacific', 'Textiles', 34, 'medium',
 'approved', 'scheduled', 'clear', false, 4100000, 'medium',
 NULL, '2025-10-01', '2027-04-15', '2026-08-15',
 '2024-04-15', '2026-02-28'),

(gen_random_uuid(), 'Gwangju IT Solutions', 'South Korea', 'Asia Pacific', 'IT Services', 19, 'low',
 'approved', 'completed', 'clear', false, 3200000, 'medium',
 NULL, '2024-05-01', '2027-01-15', NULL,
 '2024-10-01', '2026-03-15'),

(gen_random_uuid(), 'Sejong Pharma Inc.', 'South Korea', 'Asia Pacific', 'Pharmaceuticals', 25, 'low',
 'approved', 'completed', 'clear', false, 13600000, 'high',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2023-04-05', '2026-04-01'),

-- === Mexico (5 suppliers) ===
(gen_random_uuid(), 'Monterrey Metals SA de CV', 'Mexico', 'Latin America', 'Metals', 47, 'medium',
 'approved', 'completed', 'clear', false, 8900000, 'high',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2023-09-15', '2026-03-20'),

(gen_random_uuid(), 'Guadalajara Electronics SA', 'Mexico', 'Latin America', 'Electronics Components', 39, 'medium',
 'approved', 'overdue', 'clear', false, 6200000, 'high',
 NULL, '2025-02-01', '2027-04-15', '2026-02-15',
 '2024-01-10', '2025-11-20'),

(gen_random_uuid(), 'Puebla Textile Manufacturing', 'Mexico', 'Latin America', 'Textiles', 36, 'medium',
 'approved', 'completed', 'clear', false, 2800000, 'medium',
 NULL, '2024-09-01', '2027-01-15', NULL,
 '2024-07-01', '2026-03-15'),

(gen_random_uuid(), 'Cancun Logistics International', 'Mexico', 'Latin America', 'Logistics Services', 33, 'medium',
 'approved', 'scheduled', 'clear', false, 3400000, 'medium',
 NULL, '2025-04-01', '2027-10-15', '2026-08-15',
 '2024-09-20', '2026-02-25'),

(gen_random_uuid(), 'Tijuana Chemical Corp.', 'Mexico', 'Latin America', 'Chemicals', 52, 'medium',
 'approved', 'completed', 'pending_review', false, 4800000, 'medium',
 NULL, '2024-11-01', '2027-07-15', NULL,
 '2023-12-05', '2026-03-28'),

-- === Canada (5 suppliers) ===
(gen_random_uuid(), 'Toronto Advanced Materials', 'Canada', 'North America', 'Raw Materials', 20, 'low',
 'approved', 'completed', 'clear', false, 7600000, 'high',
 NULL, '2025-06-01', '2027-04-15', NULL,
 '2023-06-15', '2026-03-25'),

(gen_random_uuid(), 'Vancouver Energy Corp.', 'Canada', 'North America', 'Energy', 32, 'medium',
 'approved', 'completed', 'clear', false, 19800000, 'critical',
 NULL, '2024-01-01', '2027-01-15', NULL,
 '2022-12-01', '2026-03-30'),

(gen_random_uuid(), 'Montreal Pharma Sciences', 'Canada', 'North America', 'Pharmaceuticals', 22, 'low',
 'approved', 'completed', 'clear', false, 10500000, 'high',
 'Montreal Health Group', '2025-08-01', '2027-10-15', NULL,
 '2023-03-10', '2026-03-18'),

(gen_random_uuid(), 'Calgary MRO Solutions', 'Canada', 'North America', 'MRO Supplies', 18, 'low',
 'approved', 'completed', 'clear', false, 1600000, 'low',
 NULL, '2024-03-01', '2027-07-15', NULL,
 '2025-04-01', '2026-03-10'),

(gen_random_uuid(), 'Ottawa Professional Services', 'Canada', 'North America', 'Professional Services', 14, 'low',
 'approved', 'completed', 'clear', false, 520000, 'low',
 NULL, '2025-10-01', '2027-04-15', NULL,
 '2025-07-15', '2026-03-22'),

-- === France (5 suppliers) ===
(gen_random_uuid(), 'Lyon Chimie Industrielle', 'France', 'Europe', 'Chemicals', 25, 'low',
 'approved', 'completed', 'clear', false, 8200000, 'high',
 NULL, '2024-05-01', '2027-01-15', NULL,
 '2023-04-20', '2026-03-28'),

(gen_random_uuid(), 'Paris Technologies SARL', 'France', 'Europe', 'IT Services', 21, 'low',
 'approved', 'completed', 'clear', false, 2900000, 'medium',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2024-08-10', '2026-03-20'),

(gen_random_uuid(), 'Marseille Metals SA', 'France', 'Europe', 'Metals', 34, 'medium',
 'approved', 'scheduled', 'clear', false, 6100000, 'high',
 NULL, '2024-07-01', '2027-07-15', '2026-05-15',
 '2023-10-15', '2026-03-12'),

(gen_random_uuid(), 'Bordeaux Pharmaceutiques', 'France', 'Europe', 'Pharmaceuticals', 18, 'low',
 'approved', 'completed', 'clear', false, 15600000, 'critical',
 'Bordeaux Santé Holdings', '2025-02-01', '2027-04-15', NULL,
 '2022-06-01', '2026-04-01'),

(gen_random_uuid(), 'Toulouse Aéro Components', 'France', 'Europe', 'Electronics Components', 26, 'low',
 'approved', 'completed', 'clear', false, 12300000, 'high',
 'Toulouse Aérospatiale', '2024-09-01', '2027-01-15', NULL,
 '2022-11-10', '2026-03-25'),

-- === Italy (5 suppliers) ===
(gen_random_uuid(), 'Milano Tessuti SpA', 'Italy', 'Europe', 'Textiles', 30, 'low',
 'approved', 'completed', 'clear', false, 5800000, 'high',
 NULL, '2025-04-01', '2027-10-15', NULL,
 '2023-07-20', '2026-03-22'),

(gen_random_uuid(), 'Torino Metalli Industriali', 'Italy', 'Europe', 'Metals', 38, 'medium',
 'approved', 'completed', 'clear', false, 9400000, 'high',
 'Torino Industrial Group', '2024-11-01', '2027-07-15', NULL,
 '2023-02-15', '2026-03-18'),

(gen_random_uuid(), 'Roma Chimica SRL', 'Italy', 'Europe', 'Chemicals', 33, 'medium',
 'approved', 'overdue', 'clear', false, 4700000, 'medium',
 NULL, '2025-06-01', '2027-04-15', '2026-03-15',
 '2024-03-10', '2025-10-20'),

(gen_random_uuid(), 'Napoli Packaging SRL', 'Italy', 'Europe', 'Packaging', 27, 'low',
 'approved', 'completed', 'clear', false, 1900000, 'low',
 NULL, '2024-01-01', '2027-01-15', NULL,
 '2025-01-05', '2026-03-15'),

(gen_random_uuid(), 'Firenze Pharma SpA', 'Italy', 'Europe', 'Pharmaceuticals', 24, 'low',
 'approved', 'completed', 'clear', false, 11800000, 'high',
 NULL, '2025-08-01', '2027-10-15', NULL,
 '2023-05-01', '2026-03-30'),

-- === Turkey (5 suppliers) ===
(gen_random_uuid(), 'Istanbul Tekstil AS', 'Turkey', 'Middle East', 'Textiles', 49, 'medium',
 'approved', 'completed', 'clear', false, 6400000, 'high',
 NULL, '2024-03-01', '2027-07-15', NULL,
 '2023-08-15', '2026-03-20'),

(gen_random_uuid(), 'Ankara Metal Sanayi', 'Turkey', 'Middle East', 'Metals', 55, 'medium',
 'approved', 'scheduled', 'clear', false, 8100000, 'high',
 NULL, '2025-10-01', '2027-04-15', '2026-08-15',
 '2023-11-20', '2026-02-28'),

(gen_random_uuid(), 'Izmir Kimya Ltd.', 'Turkey', 'Middle East', 'Chemicals', 51, 'medium',
 'approved', 'completed', 'clear', false, 3600000, 'medium',
 NULL, '2024-05-01', '2027-01-15', NULL,
 '2024-05-10', '2026-03-15'),

(gen_random_uuid(), 'Bursa Otomotiv Parcalari', 'Turkey', 'Middle East', 'Electronics Components', 46, 'medium',
 'approved', 'overdue', 'clear', false, 5200000, 'medium',
 NULL, '2025-12-01', '2027-10-15', '2026-03-15',
 '2024-02-01', '2025-11-15'),

(gen_random_uuid(), 'Antalya Lojistik AS', 'Turkey', 'Middle East', 'Logistics Services', 42, 'medium',
 'approved', 'completed', 'clear', false, 2700000, 'medium',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2024-10-15', '2026-03-10'),

-- === Vietnam (5 suppliers) ===
(gen_random_uuid(), 'Ho Chi Minh Textile Co.', 'Vietnam', 'Asia Pacific', 'Textiles', 44, 'medium',
 'approved', 'completed', 'clear', false, 4800000, 'medium',
 NULL, '2025-02-01', '2027-04-15', NULL,
 '2024-01-15', '2026-03-22'),

(gen_random_uuid(), 'Hanoi Electronics Manufacturing', 'Vietnam', 'Asia Pacific', 'Electronics Components', 50, 'medium',
 'approved', 'scheduled', 'clear', false, 7200000, 'high',
 NULL, '2024-09-01', '2027-01-15', '2026-07-15',
 '2023-09-10', '2026-03-18'),

(gen_random_uuid(), 'Da Nang Packaging Ltd.', 'Vietnam', 'Asia Pacific', 'Packaging', 38, 'medium',
 'approved', 'completed', 'clear', false, 1600000, 'low',
 NULL, '2025-04-01', '2027-10-15', NULL,
 '2025-02-01', '2026-03-12'),

(gen_random_uuid(), 'Hai Phong Chemicals JSC', 'Vietnam', 'Asia Pacific', 'Chemicals', 53, 'medium',
 'approved', 'overdue', 'clear', false, 3200000, 'medium',
 NULL, '2024-11-01', '2027-07-15', '2026-02-15',
 '2024-06-20', '2025-12-15'),

(gen_random_uuid(), 'Can Tho Agriculture Export', 'Vietnam', 'Asia Pacific', 'Agriculture', 41, 'medium',
 'approved', 'completed', 'clear', false, 2100000, 'medium',
 NULL, '2025-06-01', '2027-04-15', NULL,
 '2024-11-10', '2026-03-05'),

-- === Thailand (4 suppliers) ===
(gen_random_uuid(), 'Bangkok Electronics Manufacturing', 'Thailand', 'Asia Pacific', 'Electronics Components', 40, 'medium',
 'approved', 'completed', 'clear', false, 5900000, 'high',
 NULL, '2024-01-01', '2027-01-15', NULL,
 '2023-12-01', '2026-03-20'),

(gen_random_uuid(), 'Chiang Mai Textiles Co.', 'Thailand', 'Asia Pacific', 'Textiles', 36, 'medium',
 'approved', 'scheduled', 'clear', false, 2400000, 'medium',
 NULL, '2025-08-01', '2027-10-15', '2026-06-15',
 '2024-08-15', '2026-02-25'),

(gen_random_uuid(), 'Phuket Rubber Industries', 'Thailand', 'Asia Pacific', 'Raw Materials', 43, 'medium',
 'approved', 'completed', 'clear', false, 6800000, 'high',
 NULL, '2024-03-01', '2027-07-15', NULL,
 '2023-06-10', '2026-03-15'),

(gen_random_uuid(), 'Pattaya Chemical Works', 'Thailand', 'Asia Pacific', 'Chemicals', 48, 'medium',
 'approved', 'completed', 'clear', false, 3500000, 'medium',
 NULL, '2025-10-01', '2027-04-15', NULL,
 '2024-04-20', '2026-03-28'),

-- === Indonesia (4 suppliers) ===
(gen_random_uuid(), 'Jakarta Metals Processing', 'Indonesia', 'Asia Pacific', 'Metals', 57, 'medium',
 'approved', 'overdue', 'clear', false, 8200000, 'high',
 NULL, '2024-05-01', '2027-01-15', '2026-02-15',
 '2023-10-01', '2025-09-20'),

(gen_random_uuid(), 'Surabaya Textile Industries', 'Indonesia', 'Asia Pacific', 'Textiles', 45, 'medium',
 'approved', 'completed', 'clear', false, 3600000, 'medium',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2024-05-15', '2026-03-18'),

(gen_random_uuid(), 'Bandung Agriculture Corp.', 'Indonesia', 'Asia Pacific', 'Agriculture', 50, 'medium',
 'approved', 'completed', 'clear', false, 4200000, 'medium',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2024-02-20', '2026-03-22'),

(gen_random_uuid(), 'Bali Energy Resources', 'Indonesia', 'Asia Pacific', 'Energy', 58, 'medium',
 'approved', 'scheduled', 'pending_review', false, 12600000, 'high',
 NULL, '2025-02-01', '2027-04-15', '2026-06-15',
 '2023-07-01', '2026-03-30'),

-- === Russia (3 suppliers) ===
(gen_random_uuid(), 'Ural Mining & Metals', 'Russia', 'Europe', 'Metals', 82, 'critical',
 'rejected', 'overdue', 'flagged', false, 15400000, 'high',
 NULL, '2024-09-01', '2027-01-15', '2026-03-15',
 '2022-01-15', '2026-04-02'),

(gen_random_uuid(), 'Moscow Chemical Industries', 'Russia', 'Europe', 'Chemicals', 78, 'high',
 'rejected', 'overdue', 'flagged', false, 8200000, 'medium',
 NULL, '2025-04-01', '2027-10-15', '2026-01-15',
 '2022-06-01', '2026-03-28'),

(gen_random_uuid(), 'Siberian Energy Corporation', 'Russia', 'Europe', 'Energy', 88, 'critical',
 'rejected', 'overdue', 'flagged', true, 42000000, 'critical',
 NULL, '2024-11-01', '2027-07-15', '2026-02-15',
 '2021-09-10', '2026-04-01'),

-- === Nigeria (3 suppliers) ===
(gen_random_uuid(), 'Lagos Energy Resources', 'Nigeria', 'Africa', 'Energy', 62, 'high',
 'approved', 'scheduled', 'clear', false, 7800000, 'high',
 NULL, '2025-06-01', '2027-04-15', '2026-10-15',
 '2024-03-15', '2026-03-20'),

(gen_random_uuid(), 'Abuja Agriculture Holdings', 'Nigeria', 'Africa', 'Agriculture', 55, 'medium',
 'approved', 'completed', 'clear', false, 3200000, 'medium',
 NULL, '2024-01-01', '2027-01-15', NULL,
 '2024-08-01', '2026-03-15'),

(gen_random_uuid(), 'Kano Textiles Ltd.', 'Nigeria', 'Africa', 'Textiles', 58, 'medium',
 'in_progress', 'overdue', 'pending_review', false, 1800000, 'low',
 NULL, '2025-08-01', '2027-10-15', '2026-02-15',
 '2024-12-01', '2026-02-20'),

-- === South Africa (3 suppliers) ===
(gen_random_uuid(), 'Johannesburg Mining Corp.', 'South Africa', 'Africa', 'Metals', 48, 'medium',
 'approved', 'completed', 'clear', false, 14200000, 'high',
 NULL, '2024-03-01', '2027-07-15', NULL,
 '2023-04-10', '2026-03-22'),

(gen_random_uuid(), 'Cape Town Chemical Solutions', 'South Africa', 'Africa', 'Chemicals', 42, 'medium',
 'approved', 'completed', 'clear', false, 5100000, 'medium',
 NULL, '2025-10-01', '2027-04-15', NULL,
 '2024-01-20', '2026-03-18'),

(gen_random_uuid(), 'Durban Logistics International', 'South Africa', 'Africa', 'Logistics Services', 38, 'medium',
 'approved', 'scheduled', 'clear', false, 2800000, 'medium',
 NULL, '2024-05-01', '2027-01-15', '2026-09-15',
 '2024-06-15', '2026-03-10'),

-- === UAE (3 suppliers) ===
(gen_random_uuid(), 'Dubai Global Trading FZE', 'UAE', 'Middle East', 'Raw Materials', 40, 'medium',
 'approved', 'completed', 'clear', false, 18500000, 'critical',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2023-02-01', '2026-03-28'),

(gen_random_uuid(), 'Abu Dhabi Energy Solutions', 'UAE', 'Middle East', 'Energy', 35, 'medium',
 'approved', 'completed', 'clear', false, 32000000, 'critical',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2022-10-15', '2026-03-25'),

(gen_random_uuid(), 'Sharjah Logistics Corp.', 'UAE', 'Middle East', 'Logistics Services', 28, 'low',
 'approved', 'completed', 'clear', false, 4600000, 'medium',
 NULL, '2025-02-01', '2027-04-15', NULL,
 '2024-05-01', '2026-03-20'),

-- === Taiwan (4 suppliers) ===
(gen_random_uuid(), 'Taipei Semiconductor Corp.', 'Taiwan', 'Asia Pacific', 'Electronics Components', 18, 'low',
 'approved', 'completed', 'clear', false, 38000000, 'critical',
 NULL, '2024-09-01', '2027-01-15', NULL,
 '2022-02-15', '2026-04-01'),

(gen_random_uuid(), 'Hsinchu Electronics Manufacturing', 'Taiwan', 'Asia Pacific', 'Electronics Components', 15, 'low',
 'approved', 'completed', 'clear', false, 26500000, 'critical',
 'Hsinchu Technology Group', '2025-04-01', '2027-10-15', NULL,
 '2022-05-10', '2026-03-28'),

(gen_random_uuid(), 'Taichung Chemical Works', 'Taiwan', 'Asia Pacific', 'Chemicals', 22, 'low',
 'approved', 'completed', 'clear', false, 5400000, 'high',
 NULL, '2024-11-01', '2027-07-15', NULL,
 '2023-09-20', '2026-03-22'),

(gen_random_uuid(), 'Kaohsiung Metals Processing', 'Taiwan', 'Asia Pacific', 'Metals', 26, 'low',
 'approved', 'scheduled', 'clear', false, 9800000, 'high',
 NULL, '2025-06-01', '2027-04-15', '2026-10-15',
 '2023-03-15', '2026-03-15'),

-- === Poland (3 suppliers) ===
(gen_random_uuid(), 'Warsaw Electronics SA', 'Poland', 'Europe', 'Electronics Components', 32, 'medium',
 'approved', 'completed', 'clear', false, 4200000, 'medium',
 NULL, '2024-01-01', '2027-01-15', NULL,
 '2024-03-01', '2026-03-20'),

(gen_random_uuid(), 'Krakow Chemical Industries', 'Poland', 'Europe', 'Chemicals', 36, 'medium',
 'approved', 'scheduled', 'clear', false, 3100000, 'medium',
 NULL, '2025-08-01', '2027-10-15', '2026-06-15',
 '2024-07-15', '2026-02-28'),

(gen_random_uuid(), 'Gdansk Metal Works', 'Poland', 'Europe', 'Metals', 30, 'low',
 'approved', 'completed', 'clear', false, 5800000, 'high',
 NULL, '2024-03-01', '2027-07-15', NULL,
 '2023-11-10', '2026-03-18'),

-- === Czech Republic (2 suppliers) ===
(gen_random_uuid(), 'Prague Precision Components', 'Czech Republic', 'Europe', 'Electronics Components', 24, 'low',
 'approved', 'completed', 'clear', false, 5100000, 'high',
 NULL, '2025-10-01', '2027-04-15', NULL,
 '2024-01-20', '2026-03-25'),

(gen_random_uuid(), 'Brno Chemical Works', 'Czech Republic', 'Europe', 'Chemicals', 28, 'low',
 'approved', 'completed', 'clear', false, 2800000, 'medium',
 NULL, '2024-05-01', '2027-01-15', NULL,
 '2024-09-05', '2026-03-15'),

-- === Malaysia (3 suppliers) ===
(gen_random_uuid(), 'Kuala Lumpur Electronics Sdn Bhd', 'Malaysia', 'Asia Pacific', 'Electronics Components', 35, 'medium',
 'approved', 'completed', 'clear', false, 8400000, 'high',
 NULL, '2025-12-01', '2027-10-15', NULL,
 '2023-08-15', '2026-03-22'),

(gen_random_uuid(), 'Penang Semiconductor Mfg.', 'Malaysia', 'Asia Pacific', 'Electronics Components', 29, 'low',
 'approved', 'completed', 'clear', false, 14200000, 'critical',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2023-01-10', '2026-03-28'),

(gen_random_uuid(), 'Johor Chemical Industries', 'Malaysia', 'Asia Pacific', 'Chemicals', 40, 'medium',
 'approved', 'scheduled', 'clear', false, 3800000, 'medium',
 NULL, '2025-02-01', '2027-04-15', '2026-06-15',
 '2024-06-01', '2026-03-12'),

-- === Philippines (3 suppliers) ===
(gen_random_uuid(), 'Manila Electronics Corp.', 'Philippines', 'Asia Pacific', 'Electronics Components', 43, 'medium',
 'approved', 'completed', 'clear', false, 5200000, 'high',
 NULL, '2024-09-01', '2027-01-15', NULL,
 '2024-02-15', '2026-03-20'),

(gen_random_uuid(), 'Cebu Textile Manufacturing', 'Philippines', 'Asia Pacific', 'Textiles', 39, 'medium',
 'approved', 'overdue', 'clear', false, 2100000, 'medium',
 NULL, '2025-04-01', '2027-10-15', '2026-01-15',
 '2024-08-10', '2025-12-10'),

(gen_random_uuid(), 'Davao Agriculture Export', 'Philippines', 'Asia Pacific', 'Agriculture', 46, 'medium',
 'approved', 'completed', 'clear', false, 3400000, 'medium',
 NULL, '2024-11-01', '2027-07-15', NULL,
 '2024-04-05', '2026-03-15'),

-- === Bangladesh (3 suppliers) ===
(gen_random_uuid(), 'Dhaka Garments Export Ltd.', 'Bangladesh', 'Asia Pacific', 'Textiles', 63, 'high',
 'approved', 'overdue', 'clear', false, 8900000, 'high',
 NULL, '2025-06-01', '2027-04-15', '2026-03-15',
 '2023-05-20', '2025-08-15'),

(gen_random_uuid(), 'Chittagong Textile Mills', 'Bangladesh', 'Asia Pacific', 'Textiles', 67, 'high',
 'approved', 'overdue', 'pending_review', false, 6200000, 'high',
 NULL, '2024-01-01', '2027-01-15', '2026-01-15',
 '2023-10-10', '2025-07-20'),

(gen_random_uuid(), 'Rajshahi Agriculture Co.', 'Bangladesh', 'Asia Pacific', 'Agriculture', 52, 'medium',
 'approved', 'scheduled', 'clear', false, 1400000, 'low',
 NULL, '2025-08-01', '2027-10-15', '2026-06-15',
 '2024-12-15', '2026-03-05'),

-- === Iran (2 suppliers) ===
(gen_random_uuid(), 'Tehran Petrochemical Industries', 'Iran', 'Middle East', 'Chemicals', 92, 'critical',
 'rejected', 'overdue', 'flagged', true, 12000000, 'high',
 NULL, '2024-03-01', '2027-07-15', '2026-03-15',
 '2021-03-01', '2026-04-02'),

(gen_random_uuid(), 'Isfahan Metals Corporation', 'Iran', 'Middle East', 'Metals', 88, 'critical',
 'rejected', 'overdue', 'flagged', false, 7500000, 'medium',
 NULL, '2025-10-01', '2027-04-15', '2026-01-15',
 '2021-08-15', '2026-03-30'),

-- === Egypt (3 suppliers) ===
(gen_random_uuid(), 'Cairo Chemical Industries', 'Egypt', 'Middle East', 'Chemicals', 50, 'medium',
 'approved', 'completed', 'clear', false, 3800000, 'medium',
 NULL, '2024-05-01', '2027-01-15', NULL,
 '2024-04-20', '2026-03-22'),

(gen_random_uuid(), 'Alexandria Textiles SA', 'Egypt', 'Middle East', 'Textiles', 47, 'medium',
 'approved', 'scheduled', 'clear', false, 2600000, 'medium',
 NULL, '2025-12-01', '2027-10-15', '2026-10-15',
 '2024-09-01', '2026-02-28'),

(gen_random_uuid(), 'Suez Energy Corp.', 'Egypt', 'Middle East', 'Energy', 55, 'medium',
 'approved', 'completed', 'pending_review', false, 8900000, 'high',
 NULL, '2024-07-01', '2027-07-15', NULL,
 '2023-12-10', '2026-03-18'),

-- === Colombia (3 suppliers) ===
(gen_random_uuid(), 'Bogota Chemical SA', 'Colombia', 'Latin America', 'Chemicals', 48, 'medium',
 'approved', 'completed', 'clear', false, 3200000, 'medium',
 NULL, '2025-02-01', '2027-04-15', NULL,
 '2024-06-15', '2026-03-20'),

(gen_random_uuid(), 'Medellin Agriculture Corp.', 'Colombia', 'Latin America', 'Agriculture', 44, 'medium',
 'approved', 'overdue', 'clear', false, 4800000, 'medium',
 NULL, '2024-09-01', '2027-01-15', '2026-03-15',
 '2024-01-10', '2025-11-25'),

(gen_random_uuid(), 'Cali Textiles SA', 'Colombia', 'Latin America', 'Textiles', 42, 'medium',
 'approved', 'completed', 'clear', false, 1900000, 'low',
 NULL, '2025-04-01', '2027-10-15', NULL,
 '2024-10-20', '2026-03-12'),

-- === Chile (2 suppliers) ===
(gen_random_uuid(), 'Santiago Metals Corporation', 'Chile', 'Latin America', 'Metals', 35, 'medium',
 'approved', 'completed', 'clear', false, 9200000, 'high',
 NULL, '2024-11-01', '2027-07-15', NULL,
 '2023-07-01', '2026-03-25'),

(gen_random_uuid(), 'Valparaiso Chemical SA', 'Chile', 'Latin America', 'Chemicals', 32, 'medium',
 'approved', 'scheduled', 'clear', false, 4100000, 'medium',
 NULL, '2025-06-01', '2027-04-15', '2026-10-15',
 '2024-05-10', '2026-03-18');


-- ============================================================================
-- 2. SUPPLIER DOCUMENTS (9 document types per supplier)
-- ============================================================================
-- Status distribution: ~60% approved, ~15% submitted, ~10% missing, ~10% expired, ~5% under_review
-- Some suppliers have mostly complete docs; others are missing several.

INSERT INTO supplier_documents (id, supplier_id, document_type, status, file_name, submitted_at, expires_at, notes, created_at, updated_at)
SELECT
  gen_random_uuid(),
  s.id,
  doc_type.name,
  CASE
    -- Suppliers with sanctions_status = 'flagged' or 'suspended' get more missing/expired docs
    WHEN s.sanctions_status = 'flagged' AND doc_type.name IN ('Sanctions Declaration', 'ESG Questionnaire', 'Conflict Minerals Declaration') THEN 'expired'
    WHEN s.onboarding_status = 'rejected' AND doc_type.name IN ('Insurance Certificate', 'Audit Report') THEN 'missing'
    WHEN s.onboarding_status = 'in_progress' AND doc_type.name = 'Code of Conduct' THEN 'submitted'
    -- High risk suppliers get more issues
    WHEN s.risk_band = 'critical' AND doc_type.idx = 6 THEN 'under_review'
    WHEN s.risk_band = 'critical' AND doc_type.idx = 7 THEN 'submitted'
    -- Normal distribution based on deterministic hash
    WHEN abs(hashtext(s.supplier_name || doc_type.name)) % 100 < 60 THEN 'approved'
    WHEN abs(hashtext(s.supplier_name || doc_type.name)) % 100 < 75 THEN 'submitted'
    WHEN abs(hashtext(s.supplier_name || doc_type.name)) % 100 < 85 THEN 'missing'
    WHEN abs(hashtext(s.supplier_name || doc_type.name)) % 100 < 95 THEN 'expired'
    ELSE 'under_review'
  END,
  CASE
    WHEN abs(hashtext(s.supplier_name || doc_type.name)) % 100 >= 75
      AND abs(hashtext(s.supplier_name || doc_type.name)) % 100 < 85 THEN NULL
    ELSE lower(replace(doc_type.name, ' ', '_')) || '.pdf'
  END,
  CASE
    WHEN abs(hashtext(s.supplier_name || doc_type.name)) % 100 >= 75
      AND abs(hashtext(s.supplier_name || doc_type.name)) % 100 < 85 THEN NULL
    ELSE ('2025-01-01'::date + (abs(hashtext(s.supplier_name || doc_type.name)) % 365) * interval '1 day')
  END,
  CASE
    WHEN doc_type.name IN ('Insurance Certificate', 'Tax Certificate', 'Contract') THEN
      '2026-04-03'::date + ((abs(hashtext(s.supplier_name || doc_type.name || 'exp')) % 365) - 60) * interval '1 day'
    WHEN doc_type.name IN ('Code of Conduct', 'Sanctions Declaration', 'ESG Questionnaire') THEN
      '2026-04-03'::date + ((abs(hashtext(s.supplier_name || doc_type.name || 'exp')) % 730) - 180) * interval '1 day'
    ELSE NULL
  END,
  NULL,
  now(),
  now()
FROM suppliers s
CROSS JOIN (
  VALUES
    (1, 'Business Registration'),
    (2, 'Tax Certificate'),
    (3, 'Insurance Certificate'),
    (4, 'Code of Conduct'),
    (5, 'Sanctions Declaration'),
    (6, 'ESG Questionnaire'),
    (7, 'Conflict Minerals Declaration'),
    (8, 'Audit Report'),
    (9, 'Contract')
) AS doc_type(idx, name);


-- ============================================================================
-- 3. SANCTIONS ENTITIES (~30 entities)
-- ============================================================================

INSERT INTO sanctions_entities (id, entity_name, normalized_name, entity_type, source_list, country, aliases)
VALUES
-- Entities that could be confused with real supplier names (close matches)
(gen_random_uuid(), 'Ural Mining and Metallurgy Co.', 'ural mining and metallurgy co', 'organization', 'OFAC SDN', 'Russia',
 ARRAY['Ural Mining & Metals', 'Ural Metallurgy Corp']),

(gen_random_uuid(), 'Siberian Energy Corp.', 'siberian energy corp', 'organization', 'OFAC SDN', 'Russia',
 ARRAY['Siberian Energy Corporation', 'SibEnergy']),

(gen_random_uuid(), 'Moscow Chemical Industrial Group', 'moscow chemical industrial group', 'organization', 'EU Consolidated', 'Russia',
 ARRAY['Moscow Chemical Industries', 'Moskhim']),

(gen_random_uuid(), 'Tehran Petrochemical Corp.', 'tehran petrochemical corp', 'organization', 'OFAC SDN', 'Iran',
 ARRAY['Tehran Petrochemical Industries', 'TPCI', 'Tehran Petrochem']),

(gen_random_uuid(), 'Isfahan Steel & Metals', 'isfahan steel  metals', 'organization', 'OFAC SDN', 'Iran',
 ARRAY['Isfahan Metals Corporation', 'Isfahan Steel Works']),

(gen_random_uuid(), 'Guangzhou Industrial Trading', 'guangzhou industrial trading', 'organization', 'OFAC SDN', 'China',
 ARRAY['GZ Industrial Holdings', 'Guangzhou Chemical Industrial']),

(gen_random_uuid(), 'Suzhou Minerals Export Corp.', 'suzhou minerals export corp', 'organization', 'EU Consolidated', 'China',
 ARRAY['Suzhou Conflict Minerals', 'Suzhou Mineral Trading']),

(gen_random_uuid(), 'Blackrock Global Energy', 'blackrock global energy', 'organization', 'UN Security Council', 'USA',
 ARRAY['Blackrock Energy Partners LLC', 'BRE Global']),

-- Individuals
(gen_random_uuid(), 'Dmitri Alexandrovich Volkov', 'dmitri alexandrovich volkov', 'individual', 'OFAC SDN', 'Russia',
 ARRAY['Volkov, Dmitri', 'D.A. Volkov']),

(gen_random_uuid(), 'Alexei Sergeevich Kuznetsov', 'alexei sergeevich kuznetsov', 'individual', 'EU Consolidated', 'Russia',
 ARRAY['Kuznetsov, Alexei S.', 'A.S. Kuznetsov']),

(gen_random_uuid(), 'Ali Reza Mohammadi', 'ali reza mohammadi', 'individual', 'OFAC SDN', 'Iran',
 ARRAY['Mohammadi, Ali R.', 'A.R. Mohammadi']),

(gen_random_uuid(), 'Natalia Ivanovna Petrova', 'natalia ivanovna petrova', 'individual', 'EU Consolidated', 'Russia',
 ARRAY['Petrova, N.I.', 'Natalia Petrova']),

-- Clearly different entities
(gen_random_uuid(), 'Al-Haramain Foundation', 'alharamain foundation', 'organization', 'OFAC SDN', 'Saudi Arabia',
 ARRAY['Al Haramain Islamic Foundation', 'AHF']),

(gen_random_uuid(), 'Korea Ryonbong General Corporation', 'korea ryonbong general corporation', 'organization', 'UN Security Council', 'North Korea',
 ARRAY['Ryonbong Corp', 'KRGC']),

(gen_random_uuid(), 'Bank of Kunlun', 'bank of kunlun', 'organization', 'OFAC SDN', 'China',
 ARRAY['Kunlun Bank', 'Bank Kunlun Co.']),

(gen_random_uuid(), 'Islamic Revolutionary Guard Corps', 'islamic revolutionary guard corps', 'organization', 'OFAC SDN', 'Iran',
 ARRAY['IRGC', 'Sepah-e Pasdaran']),

(gen_random_uuid(), 'Rosoboronexport', 'rosoboronexport', 'organization', 'OFAC SDN', 'Russia',
 ARRAY['Russian Defense Export', 'Rosoboron']),

(gen_random_uuid(), 'Omar Abdullah Al-Rashidi', 'omar abdullah alrashidi', 'individual', 'UN Security Council', 'Yemen',
 ARRAY['Al-Rashidi, O.A.', 'Abu Omar']),

(gen_random_uuid(), 'Congolese Mining Enterprises', 'congolese mining enterprises', 'organization', 'EU Consolidated', 'Congo',
 ARRAY['CME', 'Congo Mines Ltd']),

(gen_random_uuid(), 'Myanmar Military Holdings Ltd.', 'myanmar military holdings ltd', 'organization', 'OFAC SDN', 'Myanmar',
 ARRAY['MEC', 'Myanmar Economic Corporation']),

(gen_random_uuid(), 'Viktor Andreyevich Smirnov', 'viktor andreyevich smirnov', 'individual', 'EU Consolidated', 'Russia',
 ARRAY['Smirnov, Viktor', 'V.A. Smirnov']),

(gen_random_uuid(), 'Sudan Armed Forces Trading', 'sudan armed forces trading', 'organization', 'UN Security Council', 'Sudan',
 ARRAY['SAF Trading', 'Sudan Military Industries']),

(gen_random_uuid(), 'Houthi Maritime Operations', 'houthi maritime operations', 'organization', 'OFAC SDN', 'Yemen',
 ARRAY['Ansar Allah Maritime', 'Houthi Navy']),

(gen_random_uuid(), 'Wagner Group PMC', 'wagner group pmc', 'organization', 'EU Consolidated', 'Russia',
 ARRAY['PMC Wagner', 'Liga', 'Vagner']),

(gen_random_uuid(), 'North Korean Foreign Trade Bank', 'north korean foreign trade bank', 'organization', 'UN Security Council', 'North Korea',
 ARRAY['DPRK FTB', 'FTB Pyongyang']),

(gen_random_uuid(), 'Chittagong Shipping Enterprises', 'chittagong shipping enterprises', 'organization', 'OFAC SDN', 'Bangladesh',
 ARRAY['Chittagong Maritime', 'CSE Ltd']),

(gen_random_uuid(), 'Zheng Wei Holdings', 'zheng wei holdings', 'individual', 'OFAC SDN', 'China',
 ARRAY['Zheng, Wei', 'W. Zheng']),

(gen_random_uuid(), 'Kano Industrial Trading Ltd.', 'kano industrial trading ltd', 'organization', 'EU Consolidated', 'Nigeria',
 ARRAY['Kano Trading', 'KIT Ltd']),

(gen_random_uuid(), 'Ahmed Hassan Al-Rashid', 'ahmed hassan alrashid', 'individual', 'UN Security Council', 'UAE',
 ARRAY['Al-Rashid, Ahmed H.', 'Abu Ahmed']),

(gen_random_uuid(), 'Tao International Holdings', 'tao international holdings', 'organization', 'OFAC SDN', 'China',
 ARRAY['Tao Holdings', 'THI Corp']);


-- ============================================================================
-- 4. SANCTIONS MATCHES (~15 matches linking suppliers to entities)
-- ============================================================================

INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT
  gen_random_uuid(),
  s.id,
  e.id,
  match_info.match_type,
  match_info.match_score,
  match_info.match_field,
  match_info.review_status,
  match_info.reviewed_by,
  match_info.reviewed_at,
  match_info.notes
FROM suppliers s
JOIN sanctions_entities e ON true
JOIN (VALUES (1)) dummy(x) ON true
CROSS JOIN LATERAL (
  SELECT * FROM (VALUES
    ('exact'::text, 98, 'name'::text, 'confirmed_concern'::text, 'compliance_team'::text, '2026-03-15'::date, 'Direct name match confirmed against SDN list'::text)
  ) AS v(match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
) match_info
WHERE false; -- placeholder, actual inserts below

-- Direct inserts using subqueries to find matching IDs
-- Match 1: Ural Mining & Metals <-> Ural Mining and Metallurgy Co.
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'exact', 97, 'confirmed_concern', 'compliance_team', '2026-03-15',
  'Direct name match confirmed - supplier is designated entity'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Ural Mining & Metals' AND e.entity_name = 'Ural Mining and Metallurgy Co.';

-- Match 2: Siberian Energy Corporation <-> Siberian Energy Corp.
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'exact', 99, 'confirmed_concern', 'compliance_team', '2026-03-10',
  'Exact name match confirmed - supplier is designated entity'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Siberian Energy Corporation' AND e.entity_name = 'Siberian Energy Corp.';

-- Match 3: Moscow Chemical Industries <-> Moscow Chemical Industrial Group
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 89, 'confirmed_concern', 'compliance_team', '2026-03-12',
  'Fuzzy name match - confirmed as related entity'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Moscow Chemical Industries' AND e.entity_name = 'Moscow Chemical Industrial Group';

-- Match 4: Tehran Petrochemical Industries <-> Tehran Petrochemical Corp.
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'exact', 96, 'confirmed_concern', 'compliance_team', '2026-02-20',
  'Confirmed match - Iranian petrochemical entity on SDN list'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Tehran Petrochemical Industries' AND e.entity_name = 'Tehran Petrochemical Corp.';

-- Match 5: Isfahan Metals Corporation <-> Isfahan Steel & Metals
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 85, 'confirmed_concern', 'compliance_team', '2026-02-22',
  'Fuzzy match on name and alias - confirmed as designated entity'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Isfahan Metals Corporation' AND e.entity_name = 'Isfahan Steel & Metals';

-- Match 6: Guangzhou Chemical Industrial Co. <-> Guangzhou Industrial Trading (pending review)
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 72, 'pending', NULL, NULL,
  'Partial name match on company name and location - requires manual review'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Guangzhou Chemical Industrial Co.' AND e.entity_name = 'Guangzhou Industrial Trading';

-- Match 7: Suzhou Conflict Minerals Trading <-> Suzhou Minerals Export Corp.
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 82, 'pending', NULL, NULL,
  'Strong fuzzy match on entity name and mineral trading keywords'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Suzhou Conflict Minerals Trading' AND e.entity_name = 'Suzhou Minerals Export Corp.';

-- Match 8: Blackrock Energy Partners <-> Blackrock Global Energy (false positive)
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 68, 'cleared', 'compliance_team', '2026-03-28',
  'Similar name but different entity confirmed after investigation. US-based energy consultancy.'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Blackrock Energy Partners' AND e.entity_name = 'Blackrock Global Energy';

-- Match 9: Wuhan Pharmaceutical Co. <-> Zheng Wei Holdings (weak match on contact)
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 55, 'pending', NULL, NULL,
  'Weak match on partial name of designated individual - reviewing connection'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Wuhan Pharmaceutical Co.' AND e.entity_name = 'Zheng Wei Holdings';

-- Match 10: Dubai Global Trading FZE <-> Ahmed Hassan Al-Rashid (contact name match)
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 75, 'pending', NULL, NULL,
  'Supplier contact name "Ahmed Al-Rashid" partially matches designated individual'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Dubai Global Trading FZE' AND e.entity_name = 'Ahmed Hassan Al-Rashid';

-- Match 11: Kano Textiles Ltd. <-> Kano Industrial Trading Ltd. (name match)
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 70, 'pending', NULL, NULL,
  'Partial name match on Kano location and trading entity'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Kano Textiles Ltd.' AND e.entity_name = 'Kano Industrial Trading Ltd.';

-- Match 12: Chittagong Textile Mills <-> Chittagong Shipping Enterprises
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 60, 'cleared', 'compliance_team', '2026-03-25',
  'Geographic name match only. Different industries. Cleared after review.'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Chittagong Textile Mills' AND e.entity_name = 'Chittagong Shipping Enterprises';

-- Match 13: Suzhou Conflict Minerals Trading <-> Tao International Holdings (contact name)
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 65, 'pending', NULL, NULL,
  'Supplier contact Tao Wu partially matches Tao International Holdings designee'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Suzhou Conflict Minerals Trading' AND e.entity_name = 'Tao International Holdings';

-- Match 14: Bali Energy Resources <-> Myanmar Military Holdings (false positive cleared)
INSERT INTO sanctions_matches (id, supplier_id, entity_id, match_type, match_score, review_status, reviewed_by, reviewed_at, notes)
SELECT gen_random_uuid(), s.id, e.id, 'fuzzy', 42, 'cleared', 'compliance_team', '2026-03-20',
  'Weak address similarity - different country and entity. Cleared.'
FROM suppliers s, sanctions_entities e
WHERE s.supplier_name = 'Bali Energy Resources' AND e.entity_name = 'Myanmar Military Holdings Ltd.';


-- ============================================================================
-- 5. AUDITS (~80 audit records)
-- ============================================================================

INSERT INTO audits (id, supplier_id, audit_type, status, due_date, completed_date, findings)

-- Completed audits (about 40)
SELECT
  gen_random_uuid(),
  s.id,
  audit_data.audit_type,
  'completed',
  audit_data.due_date,
  audit_data.completed_date,
  audit_data.findings
FROM suppliers s
JOIN (VALUES
  ('Apex Circuit Technologies', 'Quality', '2025-09-15'::date, '2025-09-18'::date, 'Minor non-conformance in documentation. Corrective action plan submitted.'),
  ('Harmon Chemical Solutions', 'ESG', '2025-11-01'::date, '2025-11-05'::date, 'Adequate ESG practices. Recommended improvements in waste management.'),
  ('Summit Pharmaceutical Corp.', 'Quality', '2026-01-10'::date, '2026-01-14'::date, 'Excellent quality management system. Full GMP compliance verified.'),
  ('Summit Pharmaceutical Corp.', 'Financial', '2025-06-15'::date, '2025-06-20'::date, 'Strong financial position. No material concerns identified.'),
  ('Titanium Alloy Works', 'Quality', '2025-08-20'::date, '2025-08-25'::date, 'ISO 9001 compliance confirmed. Minor observation on calibration records.'),
  ('Sterling Components Ltd.', 'Quality', '2025-10-05'::date, '2025-10-08'::date, 'Full compliance with aerospace quality standards.'),
  ('Thames Chemical Works', 'ESG', '2025-12-01'::date, '2025-12-04'::date, 'Good ESG performance. Carbon reduction targets on track.'),
  ('Müller Elektronik GmbH', 'Quality', '2026-02-10'::date, '2026-02-13'::date, 'Excellent quality standards. VDA 6.3 audit passed with score 92%.'),
  ('Rheinland Chemie AG', 'ESG', '2025-07-15'::date, '2025-07-19'::date, 'Strong environmental management. REACH compliance confirmed.'),
  ('Bayerische Stahl Werke', 'Quality', '2026-01-20'::date, '2026-01-24'::date, 'Steel quality standards met. Material traceability systems adequate.'),
  ('Shenzhen Precision Electronics', 'Quality', '2025-11-15'::date, '2025-11-20'::date, 'Quality system adequate. Minor findings in incoming inspection process.'),
  ('Shenzhen Precision Electronics', 'Social', '2025-06-01'::date, '2025-06-05'::date, 'Working conditions within acceptable limits. Overtime hours require monitoring.'),
  ('Ningbo Metal Trading Co.', 'Quality', '2025-09-01'::date, '2025-09-05'::date, 'Acceptable quality. Documentation improvement recommended.'),
  ('Shanghai Packaging Solutions', 'Quality', '2025-10-20'::date, '2025-10-23'::date, 'Packaging quality meets specifications. Good supplier.'),
  ('Tata Advanced Materials', 'Quality', '2025-12-15'::date, '2025-12-19'::date, 'Strong quality management. ISO certification current.'),
  ('Mumbai Pharma Exports', 'Quality', '2025-08-01'::date, '2025-08-06'::date, 'GMP compliance verified. Minor observation on stability testing.'),
  ('Bangalore Tech Services Pvt.', 'Information Security', '2026-03-01'::date, '2026-03-04'::date, 'ISO 27001 compliance confirmed. Strong data protection practices.'),
  ('Surat Textile Corporation', 'Social', '2025-07-10'::date, '2025-07-15'::date, 'SA8000 compliance verified. Good labor practices.'),
  ('Yamato Electronics Corp.', 'Quality', '2026-02-20'::date, '2026-02-22'::date, 'Outstanding quality system. Zero non-conformances.'),
  ('Nippon Chemical Industries', 'ESG', '2025-10-10'::date, '2025-10-13'::date, 'Excellent environmental management. ISO 14001 verified.'),
  ('Osaka Steel Manufacturing', 'Quality', '2025-11-25'::date, '2025-11-27'::date, 'Full JIS compliance. Exceptional quality records.'),
  ('Tokyo Precision Parts', 'Quality', '2026-01-05'::date, '2026-01-07'::date, 'Zero-defect performance maintained. Best-in-class supplier.'),
  ('Seoul Semiconductor Partners', 'Quality', '2025-12-10'::date, '2025-12-13'::date, 'Quality standards met. Good process control.'),
  ('Incheon Steel Works', 'Quality', '2025-09-20'::date, '2025-09-24'::date, 'Steel quality excellent. Traceability systems robust.'),
  ('Toronto Advanced Materials', 'Quality', '2025-08-15'::date, '2025-08-18'::date, 'Material specifications consistently met.'),
  ('Vancouver Energy Corp.', 'ESG', '2025-10-01'::date, '2025-10-05'::date, 'Strong sustainability practices. Environmental targets exceeded.'),
  ('Lyon Chimie Industrielle', 'Quality', '2025-11-10'::date, '2025-11-14'::date, 'ISO 9001 compliance confirmed. Good chemical handling procedures.'),
  ('Milano Tessuti SpA', 'Quality', '2025-09-05'::date, '2025-09-08'::date, 'Textile quality standards met. Good traceability.'),
  ('Taipei Semiconductor Corp.', 'Quality', '2026-03-10'::date, '2026-03-12'::date, 'Exceptional quality system. Industry-leading semiconductor testing.'),
  ('Hsinchu Electronics Manufacturing', 'Quality', '2025-12-20'::date, '2025-12-23'::date, 'Quality management excellent. IATF 16949 certified.'),
  ('Penang Semiconductor Mfg.', 'Quality', '2025-10-15'::date, '2025-10-18'::date, 'Good quality standards. Semiconductor process control adequate.'),
  ('Amazonia Raw Materials SA', 'ESG', '2025-08-10'::date, '2025-08-15'::date, 'Deforestation-free certification maintained. Supply chain traceability good.'),
  ('Monterrey Metals SA de CV', 'Quality', '2025-11-20'::date, '2025-11-24'::date, 'Quality system adequate. Minor findings in document control.'),
  ('Johannesburg Mining Corp.', 'Quality', '2025-09-25'::date, '2025-09-29'::date, 'Mining quality standards met. Safety systems adequate.'),
  ('Johannesburg Mining Corp.', 'ESG', '2025-07-01'::date, '2025-07-05'::date, 'Environmental compliance met. Community engagement programs active.'),
  ('Abu Dhabi Energy Solutions', 'Financial', '2025-12-05'::date, '2025-12-10'::date, 'Strong financial position. Excellent credit rating confirmed.'),
  ('Santiago Metals Corporation', 'Quality', '2025-10-25'::date, '2025-10-29'::date, 'Copper quality standards met. Good material handling.'),
  ('Ho Chi Minh Textile Co.', 'Social', '2025-09-10'::date, '2025-09-15'::date, 'Labor practices adequate. Some overtime concerns noted for peak season.'),
  ('Prague Precision Components', 'Quality', '2025-11-05'::date, '2025-11-08'::date, 'Quality system compliant. Good precision engineering standards.'),
  ('Gdansk Metal Works', 'Quality', '2025-08-25'::date, '2025-08-28'::date, 'Quality adequate. ISO 9001 certification current.')
) AS audit_data(supplier_name, audit_type, due_date, completed_date, findings)
ON s.supplier_name = audit_data.supplier_name;

-- Scheduled/upcoming audits (about 20)
INSERT INTO audits (id, supplier_id, audit_type, status, due_date, completed_date, findings)
SELECT
  gen_random_uuid(),
  s.id,
  audit_data.audit_type,
  'scheduled',
  audit_data.due_date,
  NULL,
  NULL
FROM suppliers s
JOIN (VALUES
  ('Blackrock Energy Partners', 'Financial', '2026-04-15'::date),
  ('Dongguan Textile Manufacturing', 'Social', '2026-04-20'::date),
  ('Chennai Chemical Industries', 'Quality', '2026-04-25'::date),
  ('Ankara Metal Sanayi', 'Quality', '2026-05-01'::date),
  ('Hanoi Electronics Manufacturing', 'Quality', '2026-05-10'::date),
  ('Chiang Mai Textiles Co.', 'Social', '2026-05-15'::date),
  ('Bali Energy Resources', 'ESG', '2026-05-20'::date),
  ('Dresden Textilwerk', 'Quality', '2026-04-10'::date),
  ('Kaohsiung Metals Processing', 'Quality', '2026-04-28'::date),
  ('Krakow Chemical Industries', 'Quality', '2026-05-05'::date),
  ('Johor Chemical Industries', 'Quality', '2026-04-22'::date),
  ('Alexandria Textiles SA', 'Social', '2026-05-12'::date),
  ('Valparaiso Chemical SA', 'Quality', '2026-05-18'::date),
  ('Cancun Logistics International', 'Quality', '2026-04-30'::date),
  ('Daegu Textile Industries', 'Social', '2026-05-08'::date),
  ('Durban Logistics International', 'Quality', '2026-05-22'::date),
  ('Rajshahi Agriculture Co.', 'Social', '2026-05-25'::date),
  ('São Paulo Chemicals Ltda.', 'Quality', '2026-04-18'::date),
  ('Fukuoka Rare Metals Co.', 'Quality', '2026-05-15'::date),
  ('Sejong Pharma Inc.', 'Quality', '2026-04-12'::date)
) AS audit_data(supplier_name, audit_type, due_date)
ON s.supplier_name = audit_data.supplier_name;

-- Overdue audits (about 20)
INSERT INTO audits (id, supplier_id, audit_type, status, due_date, completed_date, findings)
SELECT
  gen_random_uuid(),
  s.id,
  audit_data.audit_type,
  'overdue',
  audit_data.due_date,
  NULL,
  NULL
FROM suppliers s
JOIN (VALUES
  ('Pacific Rare Elements', 'Quality', '2025-10-15'::date),
  ('Greenfield Agriculture Supply', 'Quality', '2025-12-01'::date),
  ('Caledonia Metal Alloys', 'Quality', '2025-09-30'::date),
  ('Guangzhou Chemical Industrial Co.', 'ESG', '2025-11-10'::date),
  ('Baotou Rare Earth Processing', 'Quality', '2025-08-20'::date),
  ('Baotou Rare Earth Processing', 'Social', '2025-06-15'::date),
  ('Tianjin Steel Corporation', 'Quality', '2025-07-15'::date),
  ('Suzhou Conflict Minerals Trading', 'ESG', '2025-10-01'::date),
  ('Jaipur Metals & Alloys', 'Quality', '2025-10-30'::date),
  ('Rio Metals Trading', 'Quality', '2025-09-15'::date),
  ('Guadalajara Electronics SA', 'Quality', '2025-11-20'::date),
  ('Jakarta Metals Processing', 'Quality', '2025-09-20'::date),
  ('Bursa Otomotiv Parcalari', 'Quality', '2025-11-15'::date),
  ('Hai Phong Chemicals JSC', 'ESG', '2025-12-15'::date),
  ('Roma Chimica SRL', 'Quality', '2025-10-20'::date),
  ('Dhaka Garments Export Ltd.', 'Social', '2025-08-15'::date),
  ('Chittagong Textile Mills', 'Social', '2025-07-20'::date),
  ('Ural Mining & Metals', 'Quality', '2025-03-01'::date),
  ('Moscow Chemical Industries', 'ESG', '2025-06-01'::date),
  ('Tehran Petrochemical Industries', 'Quality', '2025-01-15'::date),
  ('Medellin Agriculture Corp.', 'Quality', '2025-11-25'::date),
  ('Cebu Textile Manufacturing', 'Social', '2025-12-10'::date)
) AS audit_data(supplier_name, audit_type, due_date)
ON s.supplier_name = audit_data.supplier_name;


-- ============================================================================
-- 6. CONTRACTS (one per supplier)
-- ============================================================================
-- Some contracts nearing expiry (within 30-90 days of 2026-04-03)

INSERT INTO contracts (id, supplier_id, contract_number, start_date, end_date, value, status, auto_renew)
SELECT
  gen_random_uuid(),
  s.id,
  'CTR-' || LPAD((ROW_NUMBER() OVER (ORDER BY s.supplier_name))::text, 5, '0'),
  contract_dates.start_date,
  contract_dates.end_date,
  s.annual_spend * (EXTRACT(YEAR FROM age(contract_dates.end_date, contract_dates.start_date)) + 1),
  CASE
    WHEN contract_dates.end_date < '2026-04-03' THEN 'expired'
    WHEN contract_dates.end_date BETWEEN '2026-04-03' AND '2026-07-03' THEN 'expiring_soon'
    WHEN s.onboarding_status = 'rejected' THEN 'expired'
    ELSE 'active'
  END,
  CASE WHEN abs(hashtext(s.supplier_name || 'renewal')) % 3 = 0 THEN true ELSE false END
FROM suppliers s
CROSS JOIN LATERAL (
  SELECT
    CASE
      -- Contracts expiring within 30 days (about 10 suppliers)
      WHEN s.supplier_name IN ('Apex Circuit Technologies', 'Harmon Chemical Solutions', 'Dongguan Textile Manufacturing',
                      'Chennai Chemical Industries', 'Istanbul Tekstil AS', 'Kuala Lumpur Electronics Sdn Bhd',
                      'Lagos Energy Resources', 'Cairo Chemical Industries', 'Warsaw Electronics SA',
                      'Phuket Rubber Industries')
      THEN '2024-04-15'::date
      -- Contracts expiring within 31-90 days (about 10 suppliers)
      WHEN s.supplier_name IN ('PrimeServ IT Consulting', 'Cascade Packaging Inc.', 'Albion Textile Mills',
                      'Beijing Cloud Technologies', 'Kolkata Agriculture Trading', 'Curitiba Textile Exports',
                      'Nagoya Packaging Systems', 'Gwangju IT Solutions', 'Da Nang Packaging Ltd.',
                      'Bangkok Electronics Manufacturing')
      THEN '2024-06-01'::date
      -- Suspended/problematic suppliers with older contracts
      WHEN s.onboarding_status = 'rejected'
      THEN '2021-01-01'::date
      -- Normal contracts
      ELSE ('2023-01-01'::date + (abs(hashtext(s.supplier_name || 'start')) % 730) * interval '1 day')
    END AS start_date,
    CASE
      -- Expiring within 30 days
      WHEN s.supplier_name IN ('Apex Circuit Technologies', 'Harmon Chemical Solutions', 'Dongguan Textile Manufacturing',
                      'Chennai Chemical Industries', 'Istanbul Tekstil AS', 'Kuala Lumpur Electronics Sdn Bhd',
                      'Lagos Energy Resources', 'Cairo Chemical Industries', 'Warsaw Electronics SA',
                      'Phuket Rubber Industries')
      THEN '2026-04-15'::date + (abs(hashtext(s.supplier_name || 'exp_offset')) % 18) * interval '1 day'
      -- Expiring within 31-90 days
      WHEN s.supplier_name IN ('PrimeServ IT Consulting', 'Cascade Packaging Inc.', 'Albion Textile Mills',
                      'Beijing Cloud Technologies', 'Kolkata Agriculture Trading', 'Curitiba Textile Exports',
                      'Nagoya Packaging Systems', 'Gwangju IT Solutions', 'Da Nang Packaging Ltd.',
                      'Bangkok Electronics Manufacturing')
      THEN '2026-05-05'::date + (abs(hashtext(s.supplier_name || 'exp_offset')) % 58) * interval '1 day'
      -- Suspended suppliers - expired contracts
      WHEN s.onboarding_status = 'rejected'
      THEN '2025-12-31'::date
      -- Normal long-running contracts
      ELSE ('2026-06-01'::date + (abs(hashtext(s.supplier_name || 'end')) % 730) * interval '1 day')
    END AS end_date
) contract_dates;


-- ============================================================================
-- 7. RISK EVENTS (~40 events with varied types and severities)
-- ============================================================================

INSERT INTO risk_events (id, supplier_id, event_type, severity, description, resolved)

SELECT gen_random_uuid(), s.id,
  event_data.event_type, event_data.severity, event_data.description, event_data.resolved
FROM suppliers s
JOIN (VALUES
  -- Quality incidents
  ('Shenzhen Precision Electronics', 'quality_incident', 'high',
   'Batch Rejection - PCB Defect Rate: Incoming inspection revealed 12% defect rate on PCB batch SZ-2026-0312. Root cause: solder paste printing misalignment.',
   false),

  ('Baotou Rare Earth Processing', 'quality_incident', 'medium',
   'Purity Specification Deviation: Rare earth oxide purity measured at 99.1% vs 99.5% specification. Batch placed on hold pending review.',
   false),

  ('Dongguan Textile Manufacturing', 'quality_incident', 'low',
   'Color Fastness Test Failure: Fabric lot DG-2026-0215 failed wash fastness test. Supplier notified and corrective action requested.',
   true),

  ('Tianjin Steel Corporation', 'quality_incident', 'critical',
   'Structural Steel Grade Mismatch: Chemical analysis showed steel delivered as S355 was actually S235. All shipments quarantined. Full recall initiated.',
   false),

  ('Dhaka Garments Export Ltd.', 'quality_incident', 'medium',
   'Needle Contamination Detection: Metal detection found broken needle fragments in 3 garment units from batch DG-1142.',
   true),

  -- Compliance events
  ('Guangzhou Chemical Industrial Co.', 'compliance_violation', 'high',
   'REACH Registration Gap Identified: Annual compliance review found 2 chemical substances lacking proper REACH registration for EU import.',
   false),

  ('Suzhou Conflict Minerals Trading', 'compliance_violation', 'critical',
   'Conflict Mineral Sourcing Concern: Third-party audit identified potential 3TG minerals sourced from non-certified smelters in DRC region.',
   false),

  ('Tehran Petrochemical Industries', 'sanctions_alert', 'critical',
   'New OFAC Designation Match: Supplier matched to newly designated entity on OFAC SDN list update. All transactions suspended.',
   false),

  ('Ural Mining & Metals', 'sanctions_alert', 'critical',
   'EU Sanctions Package Update: Supplier confirmed on updated EU consolidated sanctions list. Trade suspended per compliance policy.',
   false),

  ('Siberian Energy Corporation', 'sanctions_alert', 'critical',
   'OFAC SDN Listing Confirmed: Supplier directly listed on OFAC SDN. All payments frozen and contracts suspended.',
   false),

  ('Kano Textiles Ltd.', 'compliance_violation', 'medium',
   'Export License Documentation Gap: Missing valid export license for textile shipments. Supplier asked to provide updated documentation.',
   false),

  -- Supply chain disruptions
  ('Titanium Alloy Works', 'supply_disruption', 'high',
   'Raw Material Shortage - Titanium Sponge: Global titanium sponge shortage affecting production. Lead times extended from 8 to 16 weeks.',
   false),

  ('Pacific Rare Elements', 'supply_disruption', 'critical',
   'Mine Closure Due to Environmental Review: Primary mining operation suspended pending environmental impact review. Supply expected to be disrupted for 3-6 months.',
   false),

  ('Hai Phong Chemicals JSC', 'supply_disruption', 'medium',
   'Port Congestion Delays: Hai Phong port congestion causing 2-3 week delays on all chemical shipments.',
   true),

  ('Jakarta Metals Processing', 'supply_disruption', 'medium',
   'Factory Flood Damage: Seasonal flooding damaged warehouse facility. Estimated 30% of finished goods inventory affected.',
   true),

  ('Fukuoka Rare Metals Co.', 'supply_disruption', 'high',
   'Earthquake Impact on Production: Minor earthquake caused production line stoppage. Equipment inspection required before restart.',
   false),

  -- Financial risk events
  ('Rio Metals Trading', 'financial_risk', 'high',
   'Credit Rating Downgrade: Moodys downgraded supplier from Baa2 to Ba1. Increased financial risk requires enhanced monitoring.',
   false),

  ('Guadalajara Electronics SA', 'financial_risk', 'medium',
   'Late Payment to Sub-suppliers: Market intelligence indicates supplier is experiencing cash flow issues and delaying sub-supplier payments.',
   false),

  ('Medellin Agriculture Corp.', 'financial_risk', 'medium',
   'Currency Volatility Impact: Colombian peso depreciation affecting supplier margins. Risk of price renegotiation request.',
   false),

  ('Chittagong Textile Mills', 'financial_risk', 'high',
   'Bank Facility Withdrawn: Primary lending bank reduced credit facility by 40%. Supplier seeking alternative financing.',
   false),

  -- Geopolitical events
  ('Moscow Chemical Industries', 'geopolitical', 'critical',
   'Trade Sanctions Escalation: New sanctions package further restricts trade. All remaining interactions to be wound down.',
   false),

  ('Isfahan Metals Corporation', 'geopolitical', 'critical',
   'Iran Sanctions Tightening: Additional secondary sanctions imposed on Iran metals sector. Enhanced compliance review triggered.',
   false),

  ('Blackrock Energy Partners', 'geopolitical', 'medium',
   'Regulatory Investigation Announced: DOJ announced investigation into energy sector compliance. Supplier cooperating. Monitoring situation.',
   false),

  -- ESG events
  ('Dhaka Garments Export Ltd.', 'esg_concern', 'high',
   'Worker Safety Incident Reported: Local NGO reported unsafe working conditions at production facility. Independent verification initiated.',
   false),

  ('Amazonia Raw Materials SA', 'esg_concern', 'medium',
   'Deforestation Allegation: Environmental NGO published report alleging supply chain links to Amazon deforestation. Supplier denies claims.',
   false),

  ('Baotou Rare Earth Processing', 'esg_concern', 'high',
   'Water Pollution Incident: Local environmental bureau cited facility for wastewater discharge violation. Fine imposed.',
   false),

  ('Cebu Textile Manufacturing', 'esg_concern', 'medium',
   'Overtime Compliance Concern: Audit finding: workers exceeding maximum overtime hours during peak production periods.',
   false),

  -- Cybersecurity events
  ('PrimeServ IT Consulting', 'cybersecurity', 'high',
   'Data Breach Notification: Supplier reported unauthorized access to client data systems. Incident response team engaged.',
   false),

  ('Beijing Cloud Technologies', 'cybersecurity', 'medium',
   'Vulnerability Assessment Finding: Routine assessment found unpatched critical CVE on supplier API endpoints. Patch timeline requested.',
   false),

  ('Bangalore Tech Services Pvt.', 'cybersecurity', 'low',
   'Phishing Attempt Detected: Supplier employee targeted by spear phishing. No data compromised. Additional training recommended.',
   true),

  -- Capacity/performance events
  ('Busan Chemical Corp.', 'capacity_constraint', 'medium',
   'Production Capacity Reduction: Planned maintenance reducing output by 25% for 6 weeks starting April 2026.',
   false),

  ('Surat Textile Corporation', 'capacity_constraint', 'low',
   'Seasonal Demand Surge: Supplier at 95% capacity utilization due to seasonal demand. May impact delivery timelines.',
   false),

  ('Hsinchu Electronics Manufacturing', 'quality_incident', 'low',
   'Minor Packaging Damage: Two pallets received with minor packaging damage. Components unaffected after inspection.',
   true),

  -- Natural disaster events
  ('Bangkok Electronics Manufacturing', 'natural_disaster', 'medium',
   'Flood Risk Alert - Monsoon Season: Weather services forecasting above-average monsoon rainfall. Supplier activating flood prevention measures.',
   false),

  ('Manila Electronics Corp.', 'natural_disaster', 'high',
   'Typhoon Impact Assessment: Category 3 typhoon projected path near manufacturing facility. BCP activation in progress.',
   false),

  -- Regulatory events
  ('Wuhan Pharmaceutical Co.', 'regulatory', 'high',
   'FDA Import Alert: FDA issued import alert for products from this facility. Detained shipments pending resolution.',
   false),

  ('Bordeaux Pharmaceutiques', 'regulatory', 'low',
   'EMA GMP Inspection Scheduled: European Medicines Agency scheduled routine GMP inspection. Supplier preparing documentation.',
   false),

  ('Heidelberg Pharma Solutions', 'regulatory', 'low',
   'New EU MDR Compliance Update: Updated medical device regulations require additional documentation. Timeline adequate for compliance.',
   true),

  -- Single source risk
  ('Taipei Semiconductor Corp.', 'concentration_risk', 'high',
   'Single Source Dependency Alert: Internal review flagged critical dependency on sole-source semiconductor supplier. Qualification of alternative source recommended.',
   false),

  ('Bayerische Stahl Werke', 'concentration_risk', 'medium',
   'Sub-tier Concentration Risk: Supplier relies on single sub-tier source for specialty alloy input. Dual-sourcing recommendation issued.',
   false)

) AS event_data(supplier_name, event_type, severity, description, resolved)
ON s.supplier_name = event_data.supplier_name;


-- ============================================================================
-- END OF SEED DATA
-- ============================================================================
-- Summary:
--   Suppliers:           152
--   Supplier Documents:  152 x 9 = 1,368
--   Sanctions Entities:  30
--   Sanctions Matches:   14
--   Audits:              ~82 (40 completed + 20 scheduled + 22 overdue)
--   Contracts:           152 (1 per supplier)
--   Risk Events:         40
-- ============================================================================
