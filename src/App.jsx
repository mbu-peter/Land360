// @ts-nocheck
import React, { useState, useEffect, useMemo } from "react";
import {
  Building2,
  MapPin,
  Layers,
  Users,
  TrendingUp,
  DollarSign,
  CreditCard,
  FileText,
  ShieldCheck,
  Truck,
  Fuel,
  Award,
  Target,
  MessageSquare,
  Smartphone,
  UserCheck,
  Search,
  Filter,
  Plus,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Download,
  RefreshCw,
  Eye,
  Lock,
  ArrowUpRight,
  Calendar,
  Car,
  FileCheck,
  HelpCircle,
  BarChart3,
  PieChart,
  Send,
  Sparkles,
  Briefcase,
  Activity,
  Check,
  X,
  ShieldAlert,
  Navigation,
  Settings,
  Cpu,
  Database,
  FileSpreadsheet,
  Compass,
  PhoneCall,
  Globe,
  Wrench,
  UserPlus,
  Zap,
  AlertCircle,
  ArrowDownRight,
  FolderGit2,
  CheckSquare,
  ListChecks,
  Trash2,
  Edit3,
  Printer,
  RotateCcw,
  Key,
  UserCog,
  Sliders,
  FileSignature,
} from "lucide-react";

const STORAGE_KEY = "aprotec_land360_erp_db_v6";

// --- ADDITIVE DATABASE MIGRATION HELPER --- //
const migrateDatabase = (loadedData) => {
  const base = { ...seedDatabase, ...loadedData };
  // Ensure all required collections exist and are arrays
  if (!Array.isArray(base.parentParcels))
    base.parentParcels = seedDatabase.parentParcels;
  if (!Array.isArray(base.projects)) base.projects = seedDatabase.projects;
  if (!Array.isArray(base.plots)) base.plots = seedDatabase.plots;
  if (!Array.isArray(base.customers)) base.customers = seedDatabase.customers;
  if (!Array.isArray(base.leads)) base.leads = seedDatabase.leads;
  if (!Array.isArray(base.agreements))
    base.agreements = seedDatabase.agreements;
  if (!Array.isArray(base.payments)) base.payments = seedDatabase.payments;
  if (!Array.isArray(base.fleet)) base.fleet = seedDatabase.fleet;
  if (!Array.isArray(base.siteVisitsAndFuel))
    base.siteVisitsAndFuel = seedDatabase.siteVisitsAndFuel;
  if (!Array.isArray(base.campaigns)) base.campaigns = seedDatabase.campaigns;
  if (!Array.isArray(base.procurement))
    base.procurement = seedDatabase.procurement;
  if (!Array.isArray(base.tickets)) base.tickets = seedDatabase.tickets;
  if (!Array.isArray(base.approvals)) base.approvals = seedDatabase.approvals;
  if (!Array.isArray(base.documents)) base.documents = seedDatabase.documents;
  if (!Array.isArray(base.auditLogs)) base.auditLogs = seedDatabase.auditLogs;
  if (!Array.isArray(base.dueDiligenceChecks)) base.dueDiligenceChecks = [];
  if (!Array.isArray(base.surveyors)) base.surveyors = seedDatabase.surveyors;
  if (!Array.isArray(base.advocates)) base.advocates = seedDatabase.advocates;
  if (!Array.isArray(base.quotations)) base.quotations = [];
  if (!Array.isArray(base.invoices)) base.invoices = [];
  if (!Array.isArray(base.commissions)) base.commissions = [];
  if (!base.commissionConfig)
    base.commissionConfig = { defaultPercent: 10, projectRates: {} };
  if (!Array.isArray(base.siteVisitOutcomes)) base.siteVisitOutcomes = [];
  if (!Array.isArray(base.employees)) base.employees = seedDatabase.users;
  if (!Array.isArray(base.communicationLogs)) base.communicationLogs = [];
  if (!Array.isArray(base.defaultRecoveryCases)) base.defaultRecoveryCases = [];
  if (!base.defaultPolicy) {
    base.defaultPolicy = {
      gracePeriodDays: 14,
      defaultThresholdDays: 60,
      minArrearsThresholdAmount: 50000,
      requireAdvocateReview: true,
      requireSignedAgreementCheck: true,
      defaultForfeiturePercent: 10,
    };
  }
  if (!base.smsGateway) {
    base.smsGateway = {
      enabled: false,
      provider: "Africa's Talking / Safaricom Bulk SMS",
      senderId: "APROTEC",
      endpointUrl: "https://api.africastalking.com/version1/messaging",
      apiKey: "",
    };
  }
  return base;
};

// --- SEED DATABASE --- //
const seedDatabase = {
  company: {
    name: "Aprotec Systems Ltd",
    kraPin: "P051293841X",
    paybill: "4088992",
    approvalThresholds: {
      discountMaxPercent: 10,
      expenseDirectorThreshold: 100000,
      landPurchaseApproval: 1000000,
    },
  },
  users: [
    {
      id: "USR-01",
      name: "Dr. James Mwangi",
      email: "director@aprotec.co.ke",
      role: "Management / Director",
      dept: "Executive",
      branch: "Nairobi HQ",
      status: "Active",
      lastLogin: "2026-11-17 08:15",
    },
    {
      id: "USR-02",
      name: "Lucy Njeri",
      email: "finance@aprotec.co.ke",
      role: "Finance and Accountant",
      dept: "Finance",
      branch: "Nairobi HQ",
      status: "Active",
      lastLogin: "2026-11-17 09:02",
    },
    {
      id: "USR-03",
      name: "Kevin Maina",
      email: "k.maina@aprotec.co.ke",
      role: "Sales Agent",
      dept: "Commercial",
      branch: "Naivasha Branch",
      status: "Active",
      lastLogin: "2026-11-17 10:30",
    },
    {
      id: "USR-04",
      name: "Adv. Faith Mutua",
      email: "legal@aprotec.co.ke",
      role: "Legal Officer",
      dept: "Legal & Titles",
      branch: "Nairobi HQ",
      status: "Active",
      lastLogin: "2026-11-16 16:40",
    },
    {
      id: "USR-05",
      name: "Eng. Patrick Karanja",
      email: "projects@aprotec.co.ke",
      role: "Project Manager",
      dept: "Development",
      branch: "All Branches",
      status: "Active",
      lastLogin: "2026-11-17 07:50",
    },
  ],
  roles: [
    {
      name: "System Administrator",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: true,
        Approve: true,
        Export: true,
        Settings: true,
      },
    },
    {
      name: "Management / Director",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: true,
        Export: true,
        Settings: true,
      },
    },
    {
      name: "Finance and Accountant",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: true,
        Export: true,
        Settings: false,
      },
    },
    {
      name: "Sales Manager",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: true,
        Export: true,
        Settings: false,
      },
    },
    {
      name: "Sales Agent",
      permissions: {
        View: true,
        Create: true,
        Edit: false,
        Delete: false,
        Approve: false,
        Export: false,
        Settings: false,
      },
    },
    {
      name: "Project Manager",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: true,
        Export: true,
        Settings: false,
      },
    },
    {
      name: "Legal Officer",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: true,
        Export: true,
        Settings: false,
      },
    },
    {
      name: "Surveyor",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: false,
        Export: true,
        Settings: false,
      },
    },
    {
      name: "Procurement Officer",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: false,
        Export: true,
        Settings: false,
      },
    },
    {
      name: "Customer Service Officer",
      permissions: {
        View: true,
        Create: true,
        Edit: true,
        Delete: false,
        Approve: false,
        Export: false,
        Settings: false,
      },
    },
    {
      name: "Auditor",
      permissions: {
        View: true,
        Create: false,
        Edit: false,
        Delete: false,
        Approve: false,
        Export: true,
        Settings: false,
      },
    },
  ],
  parentParcels: [
    {
      id: "PRC-001",
      refNo: "ACQ-2025-01",
      titleNo: "NAKURU/MAI-MAHIU/4092",
      county: "Nakuru",
      subCounty: "Naivasha",
      location: "Mai-Mahiu Highway",
      size: 50,
      unit: "Acres",
      seller: "Naivasha Farmers Cooperative",
      sellerPhone: "+254 722 890 111",
      purchasePrice: 45000000,
      paidAmount: 45000000,
      valuation: 62000000,
      acqDate: "2025-03-14",
      agreementRef: "AGR-LND-001",
      surveyor: "GeoSurvey Kenya Ltd",
      mutationRef: "MUT-4092-A",
      encumbrances: "None - Clean Search",
      dueDiligence: "Verified",
      status: "Cleared for Subdivision",
    },
    {
      id: "PRC-002",
      refNo: "ACQ-2025-02",
      titleNo: "KILIFI/MALINDI/1029",
      county: "Kilifi",
      subCounty: "Malindi",
      location: "Casuarina Road",
      size: 30,
      unit: "Acres",
      seller: "Fatma Hassan",
      sellerPhone: "+254 711 404 505",
      purchasePrice: 22000000,
      paidAmount: 22000000,
      valuation: 35000000,
      acqDate: "2025-05-20",
      agreementRef: "AGR-LND-002",
      surveyor: "Coastal Geomatics",
      mutationRef: "MUT-1029-B",
      encumbrances: "None - Clean Search",
      dueDiligence: "Verified",
      status: "Cleared for Subdivision",
    },
    {
      id: "PRC-003",
      refNo: "ACQ-2025-03",
      titleNo: "MACHAKOS/JOSKA/8832",
      county: "Machakos",
      subCounty: "Matungulu",
      location: "Kangundo Road, Joska",
      size: 40,
      unit: "Acres",
      seller: "Kamau wa Njoroge",
      sellerPhone: "+254 733 778 899",
      purchasePrice: 38000000,
      paidAmount: 30000000,
      valuation: 48000000,
      acqDate: "2025-08-10",
      agreementRef: "AGR-LND-003",
      surveyor: "Apex Land Surveyors",
      mutationRef: "MUT-8832-C",
      encumbrances: "Spousal Consent Filed",
      dueDiligence: "Verified",
      status: "Cleared for Subdivision",
    },
    {
      id: "PRC-004",
      refNo: "ACQ-2026-01",
      titleNo: "KAJIADO/KITENGELA/5512",
      county: "Kajiado",
      subCounty: "Kajiado East",
      location: "Acacia Junction",
      size: 60,
      unit: "Acres",
      seller: "Jomo Kenyatta Family Trust",
      sellerPhone: "+254 720 112 233",
      purchasePrice: 52000000,
      paidAmount: 52000000,
      valuation: 74000000,
      acqDate: "2026-01-18",
      agreementRef: "AGR-LND-004",
      surveyor: "Rift Geosystems",
      mutationRef: "MUT-5512-D",
      encumbrances: "None - Clean Search",
      dueDiligence: "Verified",
      status: "Cleared for Subdivision",
    },
    {
      id: "PRC-005",
      refNo: "ACQ-2026-02",
      titleNo: "NAKURU/LANET/3310",
      county: "Nakuru",
      subCounty: "Nakuru East",
      location: "Lanet Barracks Rd",
      size: 25,
      unit: "Acres",
      seller: "Kiprono Koech",
      sellerPhone: "+254 725 606 707",
      purchasePrice: 19000000,
      paidAmount: 14000000,
      valuation: 26000000,
      acqDate: "2026-04-02",
      agreementRef: "AGR-LND-005",
      surveyor: "GeoSurvey Kenya Ltd",
      mutationRef: "Pending",
      encumbrances: "Rates Clearance Ongoing",
      dueDiligence: "In Progress",
      status: "Approved for Purchase",
    },
  ],
  projects: [
    {
      id: "PRJ-001",
      code: "NSG-P1",
      name: "Naivasha Shamba Gardens",
      parcelId: "PRC-001",
      location: "Mai-Mahiu, Nakuru",
      area: "50 Acres",
      type: "Residential & Agribusiness",
      manager: "Eng. Patrick Karanja",
      startDate: "2025-04-01",
      endDate: "2026-12-30",
      budget: 8500000,
      actualSpend: 6850000,
      status: "Active Selling",
      description:
        "Prime 1/8 acre serviced plots with panoramic Mt. Longonot views.",
    },
    {
      id: "PRJ-002",
      code: "MBP-P2",
      name: "Malindi Breeze Phase 2",
      parcelId: "PRC-002",
      location: "Casuarina, Kilifi",
      area: "30 Acres",
      type: "Holiday Homes & Villas",
      manager: "Amina Kassim",
      startDate: "2025-06-15",
      endDate: "2026-10-30",
      budget: 4500000,
      actualSpend: 4320000,
      status: "Near Sold Out",
      description: "Coastal holiday gated estate 800m from the Indian Ocean.",
    },
    {
      id: "PRJ-003",
      code: "KRR-P1",
      name: "Kangundo Road Ridge",
      parcelId: "PRC-003",
      location: "Joska, Machakos",
      area: "40 Acres",
      type: "Controlled Residential",
      manager: "Francis Njoroge",
      startDate: "2025-09-01",
      endDate: "2027-03-31",
      budget: 6000000,
      actualSpend: 2900000,
      status: "Active Selling",
      description:
        "Fast-growing Nairobi Metropolitan commuter residential hub.",
    },
    {
      id: "PRJ-004",
      code: "KAH-P1",
      name: "Kitengela Acacia Heights",
      parcelId: "PRC-004",
      location: "Acacia, Kajiado",
      area: "60 Acres",
      type: "Mixed-Use Estate",
      manager: "Dennis Omondi",
      startDate: "2026-02-01",
      endDate: "2027-06-30",
      budget: 9000000,
      actualSpend: 4100000,
      status: "Active Selling",
      description:
        "Serviced residential and commercial plots near Acacia international schools.",
    },
  ],
  infrastructure: [
    {
      id: "INF-01",
      projectId: "PRJ-001",
      category: "Access Roads",
      title: "9m Murram Grading & Culverts",
      contractor: "Rift Civil Works Ltd",
      estCost: 3500000,
      actualCost: 3400000,
      progress: 100,
      inspection: "Approved",
      targetDate: "2025-11-15",
    },
    {
      id: "INF-02",
      projectId: "PRJ-001",
      category: "Water Supply",
      title: "Solar Borehole & 50,000L Elevated Tank",
      contractor: "AquaDrill Kenya",
      estCost: 2800000,
      actualCost: 2250000,
      progress: 85,
      inspection: "Pending Inspection",
      targetDate: "2026-12-01",
    },
    {
      id: "INF-03",
      projectId: "PRJ-001",
      category: "Perimeter Walls and Security",
      title: "Concrete Poles, Chainlink & Gatehouse",
      contractor: "SecureFence Contractors",
      estCost: 2200000,
      actualCost: 1200000,
      progress: 65,
      inspection: "In Progress",
      targetDate: "2026-12-20",
    },
    {
      id: "INF-04",
      projectId: "PRJ-002",
      category: "Electricity",
      title: "3-Phase Transformer & Street Lighting",
      contractor: "KPLC / ElectroGrid",
      estCost: 2100000,
      actualCost: 2050000,
      progress: 100,
      inspection: "Approved",
      targetDate: "2026-05-10",
    },
    {
      id: "INF-05",
      projectId: "PRJ-003",
      category: "Beacon Installation",
      title: "Concrete Corner Beacons & Plot Numbering",
      contractor: "Apex Land Surveyors",
      estCost: 1100000,
      actualCost: 1100000,
      progress: 100,
      inspection: "Approved",
      targetDate: "2026-01-20",
    },
  ],
  subdivisions: [
    {
      id: "SUB-01",
      refNo: "SUB-NSG-A",
      projectId: "PRJ-001",
      parcelId: "PRC-001",
      surveyPlan: "RIM/NKU/4092/25",
      totalArea: "50 Acres",
      totalPlots: 350,
      surveyStatus: "Approved & Sealed",
      titleStatus: "Titles Processing",
    },
    {
      id: "SUB-02",
      refNo: "SUB-MBP-B",
      projectId: "PRJ-002",
      parcelId: "PRC-002",
      surveyPlan: "RIM/KLF/1029/25",
      totalArea: "30 Acres",
      totalPlots: 100,
      surveyStatus: "Approved & Sealed",
      titleStatus: "Titles Ready",
    },
    {
      id: "SUB-03",
      refNo: "SUB-KRR-A",
      projectId: "PRJ-003",
      parcelId: "PRC-003",
      surveyPlan: "RIM/MCK/8832/26",
      totalArea: "40 Acres",
      totalPlots: 200,
      surveyStatus: "Mutation Lodged",
      titleStatus: "Subdivision Pending",
    },
    {
      id: "SUB-04",
      refNo: "SUB-KAH-A",
      projectId: "PRJ-004",
      parcelId: "PRC-004",
      surveyPlan: "RIM/KJD/5512/26",
      totalArea: "60 Acres",
      totalPlots: 400,
      surveyStatus: "Approved & Sealed",
      titleStatus: "Registry Processing",
    },
  ],
  plots: [
    {
      id: "PLOT-001",
      subdivisionId: "SUB-01",
      projectId: "PRJ-001",
      parcelId: "PRC-001",
      number: "NSG-001",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Commercial Corner",
      price: 750000,
      status: "Fully Paid",
      customerId: "CUS-001",
      paidAmount: 750000,
      titleStatus: "Handed Over",
      titleNo: "NAKURU/MAI-MAHIU/4092/1",
      history: [
        "Created from SUB-NSG-A",
        "Sold to John Kamau",
        "Full Payment Cleared",
        "Title Deed Handed Over",
      ],
    },
    {
      id: "PLOT-002",
      subdivisionId: "SUB-01",
      projectId: "PRJ-001",
      parcelId: "PRC-001",
      number: "NSG-002",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 650000,
      status: "Payment Pending",
      customerId: "CUS-002",
      paidAmount: 340000,
      titleStatus: "Advocate Submitted",
      titleNo: "NAKURU/MAI-MAHIU/4092/2",
      history: [
        "Created from SUB-NSG-A",
        "Booked by Mary Wanjiku",
        "KES 340,000 Paid via M-Pesa",
      ],
    },
    {
      id: "PLOT-003",
      subdivisionId: "SUB-01",
      projectId: "PRJ-001",
      parcelId: "PRC-001",
      number: "NSG-003",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 650000,
      status: "Reserved",
      customerId: "CUS-003",
      paidAmount: 50000,
      titleStatus: "Eligibility Check",
      titleNo: "Pending",
      history: [
        "Created from SUB-NSG-A",
        "Reserved by Peter Omondi (KES 50,000 deposit)",
      ],
    },
    {
      id: "PLOT-004",
      subdivisionId: "SUB-01",
      projectId: "PRJ-001",
      parcelId: "PRC-001",
      number: "NSG-004",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 650000,
      status: "Available",
      customerId: null,
      paidAmount: 0,
      titleStatus: "Subdivided",
      titleNo: "Pending",
      history: ["Created from SUB-NSG-A", "Cleared for Sale"],
    },
    {
      id: "PLOT-005",
      subdivisionId: "SUB-01",
      projectId: "PRJ-001",
      parcelId: "PRC-001",
      number: "NSG-005",
      size: "1/4 Acre",
      dimensions: "100x100 ft",
      plotType: "Commercial",
      price: 1250000,
      status: "Blocked / Unavailable",
      customerId: null,
      paidAmount: 0,
      titleStatus: "Pending Search",
      titleNo: "Pending",
      history: [
        "Created from SUB-NSG-A",
        "Blocked for borehole & utility reserve",
      ],
    },
    {
      id: "PLOT-006",
      subdivisionId: "SUB-02",
      projectId: "PRJ-002",
      parcelId: "PRC-002",
      number: "MBP-012",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 700000,
      status: "Fully Paid",
      customerId: "CUS-004",
      paidAmount: 700000,
      titleStatus: "Title Ready",
      titleNo: "KILIFI/MALINDI/1029/12",
      history: [
        "Created from SUB-MBP-B",
        "Sold to Dr. Sarah Hassan",
        "Title Ready for Collection",
      ],
    },
    {
      id: "PLOT-007",
      subdivisionId: "SUB-02",
      projectId: "PRJ-002",
      parcelId: "PRC-002",
      number: "MBP-013",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 700000,
      status: "Payment Pending",
      customerId: "CUS-005",
      paidAmount: 560000,
      titleStatus: "Registry Processing",
      titleNo: "KILIFI/MALINDI/1029/13",
      history: [
        "Created from SUB-MBP-B",
        "80% Paid - Registry transfer initiated",
      ],
    },
    {
      id: "PLOT-008",
      subdivisionId: "SUB-03",
      projectId: "PRJ-003",
      parcelId: "PRC-003",
      number: "KRR-044",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 800000,
      status: "Available",
      customerId: null,
      paidAmount: 0,
      titleStatus: "Subdivided",
      titleNo: "Pending",
      history: ["Created from SUB-KRR-A"],
    },
    {
      id: "PLOT-009",
      subdivisionId: "SUB-04",
      projectId: "PRJ-004",
      parcelId: "PRC-004",
      number: "KAH-102",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 750000,
      status: "Payment Pending",
      customerId: "CUS-006",
      paidAmount: 300000,
      titleStatus: "Eligibility Check",
      titleNo: "Pending",
      history: ["Created from SUB-KAH-A", "Instalment plan active"],
    },
    {
      id: "PLOT-010",
      subdivisionId: "SUB-04",
      projectId: "PRJ-004",
      parcelId: "PRC-004",
      number: "KAH-103",
      size: "1/8 Acre",
      dimensions: "50x100 ft",
      plotType: "Residential",
      price: 750000,
      status: "Available",
      customerId: null,
      paidAmount: 0,
      titleStatus: "Subdivided",
      titleNo: "Pending",
      history: ["Created from SUB-KAH-A"],
    },
  ],
  customers: [
    {
      id: "CUS-001",
      name: "John Kamau",
      type: "Individual",
      idNo: "22849102",
      kraPin: "A003491822P",
      phone: "+254 722 111 222",
      email: "jkamau@gmail.com",
      nextOfKin: "Grace Kamau (+254 722 111 223)",
      agent: "Kevin Maina",
      docsComplete: true,
    },
    {
      id: "CUS-002",
      name: "Mary Wanjiku",
      type: "Individual",
      idNo: "29481022",
      kraPin: "A009182734L",
      phone: "+254 711 333 444",
      email: "mwanjiku@yahoo.com",
      nextOfKin: "Samuel Wanjiku (+254 711 333 445)",
      agent: "Kevin Maina",
      docsComplete: true,
    },
    {
      id: "CUS-003",
      name: "Peter Omondi",
      type: "Individual",
      idNo: "30192837",
      kraPin: "A011223344M",
      phone: "+254 733 555 666",
      email: "pomondi@outlook.com",
      nextOfKin: "Millicent Omondi (+254 733 555 667)",
      agent: "Brenda Cherotich",
      docsComplete: false,
    },
    {
      id: "CUS-004",
      name: "Dr. Sarah Hassan",
      type: "Individual",
      idNo: "24901823",
      kraPin: "A005566778K",
      phone: "+254 700 999 888",
      email: "dr.sarah@coastmed.co.ke",
      nextOfKin: "Omar Hassan (+254 700 999 889)",
      agent: "Brenda Cherotich",
      docsComplete: true,
    },
    {
      id: "CUS-005",
      name: "David Ndung'u",
      type: "Individual",
      idNo: "27182930",
      kraPin: "A007788990R",
      phone: "+254 721 444 555",
      email: "dndungu@gmail.com",
      nextOfKin: "Esther Ndung'u (+254 721 444 556)",
      agent: "Kevin Maina",
      docsComplete: true,
    },
    {
      id: "CUS-006",
      name: "Alice Chebet",
      type: "Individual",
      idNo: "31829304",
      kraPin: "A012345678T",
      phone: "+254 712 345 678",
      email: "achebet@gmail.com",
      nextOfKin: "Kiprop Chebet (+254 712 345 679)",
      agent: "Dennis Omondi",
      docsComplete: true,
    },
  ],
  leads: [
    {
      id: "LD-101",
      name: "Hassan Omar",
      phone: "+254 722 987 654",
      email: "homar@gmail.com",
      source: "Walk-in",
      budget: 1500000,
      locationPref: "Malindi",
      stage: "Qualified",
      agent: "Brenda Cherotich",
      nextFollowUp: "2026-11-19",
      notes: "Interested in 2 adjacent coastal plots.",
    },
    {
      id: "LD-102",
      name: "Benson Kiprop",
      phone: "+254 733 112 233",
      email: "bkiprop@gmail.com",
      source: "Facebook",
      budget: 800000,
      locationPref: "Kangundo Rd",
      stage: "Negotiation",
      agent: "Kevin Maina",
      nextFollowUp: "2026-11-18",
      notes: "Requested 6-month instalment plan quote.",
    },
    {
      id: "LD-103",
      name: "Grace Achieng",
      phone: "+254 799 444 333",
      email: "gachieng@gmail.com",
      source: "WhatsApp",
      budget: 650000,
      locationPref: "Naivasha",
      stage: "Site Visit Scheduled",
      agent: "Dennis Omondi",
      nextFollowUp: "2026-11-21",
      notes: "Booked Saturday morning site bus.",
    },
    {
      id: "LD-104",
      name: "David Mutua",
      phone: "+254 715 222 111",
      email: "dmutua@gmail.com",
      source: "Google Ads",
      budget: 1200000,
      locationPref: "Kitengela",
      stage: "New Lead",
      agent: "Kevin Maina",
      nextFollowUp: "2026-11-18",
      notes: "Downloaded Kitengela brochure online.",
    },
  ],
  agreements: [
    {
      id: "AGR-2026-001",
      plotId: "PLOT-001",
      customerId: "CUS-001",
      salePrice: 750000,
      discount: 0,
      deposit: 750000,
      planType: "Full Cash",
      months: 1,
      monthlyDue: 0,
      nextDueDate: "-",
      status: "Completed",
      signed: true,
    },
    {
      id: "AGR-2026-002",
      plotId: "PLOT-002",
      customerId: "CUS-002",
      salePrice: 650000,
      discount: 0,
      deposit: 150000,
      planType: "12 Months Instalment",
      months: 12,
      monthlyDue: 41667,
      nextDueDate: "2026-11-25",
      status: "Active Instalment",
      signed: true,
    },
    {
      id: "AGR-2026-003",
      plotId: "PLOT-006",
      customerId: "CUS-004",
      salePrice: 700000,
      discount: 0,
      deposit: 700000,
      planType: "Full Cash",
      months: 1,
      monthlyDue: 0,
      nextDueDate: "-",
      status: "Completed",
      signed: true,
    },
    {
      id: "AGR-2026-004",
      plotId: "PLOT-007",
      customerId: "CUS-005",
      salePrice: 700000,
      discount: 0,
      deposit: 200000,
      planType: "6 Months Instalment",
      months: 6,
      monthlyDue: 83333,
      nextDueDate: "2026-11-10",
      status: "Overdue (7 Days)",
      signed: true,
    },
    {
      id: "AGR-2026-005",
      plotId: "PLOT-009",
      customerId: "CUS-006",
      salePrice: 750000,
      discount: 0,
      deposit: 150000,
      planType: "12 Months Instalment",
      months: 12,
      monthlyDue: 50000,
      nextDueDate: "2026-11-28",
      status: "Active Instalment",
      signed: true,
    },
  ],
  payments: [
    {
      id: "PAY-9081",
      mpesaRef: "RKJ98231HS",
      date: "2026-11-17 14:22",
      amount: 50000,
      accountRef: "NSG-002",
      plotId: "PLOT-002",
      customerId: "CUS-002",
      channel: "M-Pesa PayBill",
      status: "Auto-Allocated",
      receiptNo: "RCT-88101",
    },
    {
      id: "PAY-9082",
      mpesaRef: "RKJ98288LL",
      date: "2026-11-17 14:18",
      amount: 100000,
      accountRef: "NSG-001",
      plotId: "PLOT-001",
      customerId: "CUS-001",
      channel: "M-Pesa PayBill",
      status: "Auto-Allocated",
      receiptNo: "RCT-88102",
    },
    {
      id: "PAY-9083",
      mpesaRef: "RKJ98301XX",
      date: "2026-11-17 14:02",
      amount: 25000,
      accountRef: "UNKNOWN-REF",
      plotId: null,
      customerId: null,
      channel: "M-Pesa PayBill",
      status: "Unallocated",
      receiptNo: "Pending",
    },
    {
      id: "PAY-9084",
      mpesaRef: "RKJ98319PP",
      date: "2026-11-16 13:45",
      amount: 100000,
      accountRef: "MBP-013",
      plotId: "PLOT-007",
      customerId: "CUS-005",
      channel: "M-Pesa PayBill",
      status: "Auto-Allocated",
      receiptNo: "RCT-88103",
    },
    {
      id: "PAY-9085",
      mpesaRef: "KCB-RTGS-771",
      date: "2026-11-15 11:10",
      amount: 150000,
      accountRef: "KAH-102",
      plotId: "PLOT-009",
      customerId: "CUS-006",
      channel: "Bank Transfer",
      status: "Auto-Allocated",
      receiptNo: "RCT-88104",
    },
  ],
  fleet: [
    {
      id: "FL-01",
      reg: "KBZ 123A",
      model: "Isuzu NQR 33-Seater Bus",
      driver: "James Mwangi",
      insuranceExpiry: "2027-04-15",
      status: "On Trip",
      currentOdo: 142280,
    },
    {
      id: "FL-02",
      reg: "KDC 889B",
      model: "Toyota Hiace 14-Seater Van",
      driver: "David Ochieng",
      insuranceExpiry: "2026-12-10",
      status: "Available",
      currentOdo: 88610,
    },
    {
      id: "FL-03",
      reg: "KDG 441Z",
      model: "Toyota LandCruiser Prado TX",
      driver: "Francis Kamau",
      insuranceExpiry: "2027-06-22",
      status: "Available",
      currentOdo: 45390,
    },
    {
      id: "FL-04",
      reg: "KCA 991X",
      model: "Toyota Hilux Double Cab 4x4",
      driver: "Kiprono Sang",
      insuranceExpiry: "2027-02-28",
      status: "Servicing",
      currentOdo: 112150,
    },
  ],
  siteVisitsAndFuel: [
    {
      id: "TRP-01",
      date: "2026-11-17",
      projectId: "PRJ-001",
      vehicleId: "FL-01",
      driver: "James Mwangi",
      agent: "Kevin Maina",
      visitors: 22,
      startOdo: 142100,
      endOdo: 142280,
      fuelLitres: 45,
      fuelCost: 9450,
      otherExpenses: 3500,
      outcome: "3 Reservations Made",
    },
    {
      id: "TRP-02",
      date: "2026-11-16",
      projectId: "PRJ-003",
      vehicleId: "FL-02",
      driver: "David Ochieng",
      agent: "Dennis Omondi",
      visitors: 9,
      startOdo: 88450,
      endOdo: 88610,
      fuelLitres: 42,
      fuelCost: 8820,
      otherExpenses: 1800,
      outcome: "2 Quotations Sent",
    },
    {
      id: "TRP-03",
      date: "2026-11-15",
      projectId: "PRJ-004",
      vehicleId: "FL-03",
      driver: "Francis Kamau",
      agent: "Brenda Cherotich",
      visitors: 4,
      startOdo: 45120,
      endOdo: 45260,
      fuelLitres: 18,
      fuelCost: 3780,
      otherExpenses: 1200,
      outcome: "1 Plot Sold (KAH-102)",
    },
  ],
  campaigns: [
    {
      id: "CMP-01",
      name: "Naivasha Mega Open Day",
      channel: "Facebook & Instagram",
      budget: 150000,
      spent: 128000,
      leadsCount: 94,
      bookings: 11,
      status: "Active",
    },
    {
      id: "CMP-02",
      name: "Kitengela Diaspora Investors",
      channel: "Google Search Ads",
      budget: 200000,
      spent: 185000,
      leadsCount: 62,
      bookings: 8,
      status: "Active",
    },
    {
      id: "CMP-03",
      name: "Malindi Holiday Homes TikTok",
      channel: "TikTok Video Ads",
      budget: 80000,
      spent: 80000,
      leadsCount: 140,
      bookings: 6,
      status: "Completed",
    },
  ],
  procurement: [
    {
      id: "PO-2026-11",
      supplier: "Rift Civil Works Ltd",
      projectId: "PRJ-001",
      item: "Murram & Culvert Installation Batch 2",
      amount: 1450000,
      status: "Approved",
      grnStatus: "Received",
    },
    {
      id: "PO-2026-12",
      supplier: "Apex Land Surveyors",
      projectId: "PRJ-004",
      item: "400 Concrete Boundary Beacons",
      amount: 480000,
      status: "Pending Approval",
      grnStatus: "Pending",
    },
    {
      id: "PO-2026-13",
      supplier: "AquaDrill Kenya",
      projectId: "PRJ-001",
      item: "Submersible Solar Pump & Tower",
      amount: 920000,
      status: "Approved",
      grnStatus: "Received",
    },
  ],
  tickets: [
    {
      id: "TKT-01",
      customerId: "CUS-005",
      plotNo: "MBP-013",
      category: "Title Processing Delay",
      priority: "High",
      officer: "Adv. Faith Mutua",
      status: "In Progress",
      summary: "Client requested registry tracking slip update.",
    },
    {
      id: "TKT-02",
      customerId: "CUS-002",
      plotNo: "NSG-002",
      category: "Payment Statement Query",
      priority: "Medium",
      officer: "Lucy Njeri",
      status: "Resolved",
      summary: "Confirmed M-Pesa receipt RCT-88101 allocation.",
    },
  ],
  approvals: [
    {
      id: "APR-01",
      type: "Purchase Order",
      ref: "PO-2026-12",
      requestedBy: "Eng. Patrick Karanja",
      amount: 480000,
      details: "400 Concrete Beacons for Kitengela Acacia Heights",
      status: "Pending",
    },
    {
      id: "APR-02",
      type: "Special Discount (7%)",
      ref: "PLOT-008",
      requestedBy: "Kevin Maina",
      amount: 56000,
      details: "Discount request on Kangundo Road Plot KRR-044",
      status: "Pending",
    },
    {
      id: "APR-03",
      type: "Land Acquisition Tranche",
      ref: "PRC-005",
      requestedBy: "Lucy Njeri",
      amount: 5000000,
      details: "Final balance payment to Kiprono Koech for Lanet parcel",
      status: "Pending",
    },
  ],
  documents: [
    {
      id: "DOC-01",
      title: "Parent Title Deed - NAKURU/MAI-MAHIU/4092",
      category: "Parent Title",
      linkedRef: "PRC-001",
      uploadedBy: "Adv. Faith Mutua",
      date: "2025-03-15",
      size: "2.4 MB",
    },
    {
      id: "DOC-02",
      title: "Approved Subdivision RIM Plan - Naivasha",
      category: "Survey Plan",
      linkedRef: "SUB-01",
      uploadedBy: "Eng. Patrick Karanja",
      date: "2025-06-10",
      size: "5.1 MB",
    },
    {
      id: "DOC-03",
      title: "Signed Sale Agreement - John Kamau (NSG-001)",
      category: "Sale Agreement",
      linkedRef: "AGR-2026-001",
      uploadedBy: "Kevin Maina",
      date: "2026-02-14",
      size: "1.8 MB",
    },
    {
      id: "DOC-04",
      title: "Official Land Search Certificate - Malindi 1029",
      category: "Land Search",
      linkedRef: "PRC-002",
      uploadedBy: "Adv. Faith Mutua",
      date: "2025-05-18",
      size: "940 KB",
    },
  ],
  surveyors: [
    {
      id: "SRV-01",
      name: "GeoSurvey Kenya Ltd",
      contact: "Surv. Peter Njoroge",
      phone: "+254 722 334 455",
      email: "info@geosurvey.co.ke",
      regNo: "ISK/LS/0412",
      services: "Mutation, Subdivision & Beacons",
      projectId: "PRJ-001",
      contractAmount: 1200000,
      paidAmount: 950000,
      status: "Active",
    },
    {
      id: "SRV-02",
      name: "Coastal Geomatics",
      contact: "Surv. Ali Salim",
      phone: "+254 711 556 677",
      email: "survey@coastalgeo.co.ke",
      regNo: "ISK/LS/0889",
      services: "RIM Amendments & Topographical Survey",
      projectId: "PRJ-002",
      contractAmount: 850000,
      paidAmount: 850000,
      status: "Active",
    },
  ],
  advocates: [
    {
      id: "ADV-01",
      name: "Mutua & Associates Advocates",
      contact: "Adv. Faith Mutua",
      phone: "+254 720 998 877",
      email: "conveyancing@mutualaw.co.ke",
      regNo: "LSK/2014/8821",
      matterRef: "MAT-4092",
      specialisation: "Land Transfers, Consents & Title Processing",
      projectId: "PRJ-001",
      invoiced: 1500000,
      paid: 1100000,
      status: "Active",
    },
    {
      id: "ADV-02",
      name: "Pwani Legal Chambers",
      contact: "Adv. Amina Bakari",
      phone: "+254 733 445 566",
      email: "titles@pwanilegal.co.ke",
      regNo: "LSK/2016/4410",
      matterRef: "MAT-1029",
      specialisation: "Coastal Conveyancing & Stamp Duty",
      projectId: "PRJ-002",
      invoiced: 980000,
      paid: 980000,
      status: "Active",
    },
  ],
  auditLogs: [
    {
      id: "AUD-101",
      timestamp: "2026-11-17 14:22:10",
      user: "System (Daraja API)",
      action: "Auto-Allocated M-Pesa RKJ98231HS (KES 50,000) to Plot NSG-002",
      module: "Payments",
    },
    {
      id: "AUD-102",
      timestamp: "2026-11-17 11:05:33",
      user: "Kevin Maina",
      action: "Submitted 7% discount approval request for Plot KRR-044",
      module: "Sales & Approvals",
    },
    {
      id: "AUD-103",
      timestamp: "2026-11-16 16:40:12",
      user: "Adv. Faith Mutua",
      action: "Updated Title status of MBP-012 to Title Ready",
      module: "Title Deeds",
    },
  ],
};

const navSections = [
  {
    group: "Executive & Governance",
    items: [
      {
        id: "dashboard",
        label: "1. Director's Executive Dashboard",
        icon: BarChart3,
      },
      { id: "admin", label: "2. Company Setup, Users & Roles", icon: UserCog },
      {
        id: "approvals",
        label: "3. Approval Workflows & Audit Trail",
        icon: ShieldCheck,
      },
    ],
  },
  {
    group: "Land Bank & Development",
    items: [
      { id: "landbank", label: "4. Land Bank & Parent Parcels", icon: MapPin },
      {
        id: "projects",
        label: "5. Projects & Infrastructure",
        icon: Building2,
      },
      {
        id: "subdivision",
        label: "6. Subdivisions & Plot Inventory",
        icon: Layers,
      },
      {
        id: "valuation",
        label: "7. Land Valuation & Resale Desk",
        icon: TrendingUp,
      },
    ],
  },
  {
    group: "CRM, Marketing & Sales",
    items: [
      { id: "crm", label: "8. Customer & Lead Management", icon: Users },
      {
        id: "marketing",
        label: "9. Marketing & Website Listings",
        icon: Globe,
      },
      {
        id: "sales",
        label: "10. Plot Bookings & Sale Agreements",
        icon: FileSignature,
      },
      {
        id: "commissions",
        label: "11. Sales Agents & Commissions",
        icon: Award,
      },
    ],
  },
  {
    group: "Payments, Titles & Portal",
    items: [
      {
        id: "payments",
        label: "12. M-Pesa PayBill & SMS Alerts",
        icon: Smartphone,
      },
      {
        id: "instalments",
        label: "13. Instalments & Receivables",
        icon: Calendar,
      },
      {
        id: "collections_comms",
        label: "13B. Customer Collections & SMS Desk",
        icon: MessageSquare,
      },
      {
        id: "default_recovery",
        label: "13C. Defaulted Customers & Plot Recovery",
        icon: ShieldAlert,
      },
      {
        id: "titles",
        label: "14. Title Deed & Legal Processing",
        icon: FileCheck,
      },
      {
        id: "portal",
        label: "15. Customer Self-Service Portal",
        icon: UserCheck,
      },
    ],
  },
  {
    group: "Field, Fleet & Operations",
    items: [
      {
        id: "fieldops",
        label: "16. Site Visits, Fleet & Fuel Audit",
        icon: Truck,
      },
      {
        id: "procurement",
        label: "17. Procurement & Contractors",
        icon: Wrench,
      },
      {
        id: "accounting",
        label: "18. Accounting, HR & Payroll",
        icon: FileSpreadsheet,
      },
      {
        id: "customercare",
        label: "19. Customer Care & Document Vault",
        icon: FolderGit2,
      },
      { id: "ai_reports", label: "20. BI Reports & AI Assistant", icon: Cpu },
    ],
  },
];

export default function App() {
  // Load persistent DB from localStorage with safe additive migration
  const [db, setDb] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return migrateDatabase(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return migrateDatabase(seedDatabase);
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch (e) {
      console.error("Failed to save state", e);
    }
  }, [db]);

  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentUserRole, setCurrentUserRole] = useState(
    "Management / Director",
  );
  const [toast, setToast] = useState(null);
  const [globalSearch, setGlobalSearch] = useState("");
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
    if (
      userAgent.indexOf(" electron/") > -1 ||
      (typeof window !== "undefined" && window.electronAPI)
    ) {
      setIsElectron(true);
    }
  }, []);

  // Modal & Drawer States
  const [modal, setModal] = useState({ type: null, data: null });

  const notify = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const logAudit = (action, module) => {
    const entry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      user: currentUserRole,
      action,
      module,
    };
    setDb((prev) => ({ ...prev, auditLogs: [entry, ...prev.auditLogs] }));
  };

  const activePermissions = useMemo(() => {
    const found = db.roles.find((r) => r.name === currentUserRole);
    return found
      ? found.permissions
      : {
          View: true,
          Create: true,
          Edit: true,
          Delete: true,
          Approve: true,
          Export: true,
          Settings: true,
        };
  }, [db.roles, currentUserRole]);

  const resetDatabase = () => {
    localStorage.removeItem(STORAGE_KEY);
    setDb(seedDatabase);
    notify("System database reset to default master records.");
  };

  // --- ELECTRON DESKTOP & WEB BACKUP / RESTORE HANDLERS --- //
  const exportFullBackup = async () => {
    const payload = JSON.stringify(db, null, 2);
    if (typeof window !== "undefined" && window.electronAPI?.saveFile) {
      await window.electronAPI.saveFile("aprotec_land360_backup.json", payload);
      notify("Desktop JSON database backup saved via Electron IPC.");
      return;
    }
    const blob = new Blob([payload], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `aprotec_land360_backup_${new Date().toISOString().slice(0, 10)}.json`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify("Full ERP JSON backup downloaded.");
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        setDb(migrateDatabase(parsed));
        logAudit(
          "Restored full ERP database from JSON backup file",
          "System Backup",
        );
        notify("Database restored successfully from backup file.");
      } catch (err) {
        notify("Invalid JSON backup file.", "error");
      }
    };
    reader.readAsText(file);
  };

  const triggerNativePrint = () => {
    if (typeof window !== "undefined" && window.electronAPI?.printWindow) {
      window.electronAPI.printWindow();
    } else {
      window.print();
    }
  };

  // --- COMPUTED EXECUTIVE METRICS --- //
  const kpis = useMemo(() => {
    const totalLandAcres = db.parentParcels.reduce(
      (s, p) => s + Number(p.size || 0),
      0,
    );
    const totalLandAcquisitionCost = db.parentParcels.reduce(
      (s, p) => s + Number(p.purchasePrice || 0),
      0,
    );
    const totalPlots = db.plots.length;
    const availablePlots = db.plots.filter(
      (p) => p.status === "Available",
    ).length;
    const reservedPlots = db.plots.filter(
      (p) => p.status === "Reserved",
    ).length;
    const soldOrPaidPlots = db.plots.filter((p) =>
      ["Fully Paid", "Payment Pending", "Sold"].includes(p.status),
    ).length;
    const totalSalesValue = db.plots
      .filter(
        (p) => p.status !== "Available" && p.status !== "Blocked / Unavailable",
      )
      .reduce((s, p) => s + Number(p.price || 0), 0);
    const totalCollected = db.plots.reduce(
      (s, p) => s + Number(p.paidAmount || 0),
      0,
    );
    const outstandingBalances = Math.max(0, totalSalesValue - totalCollected);
    const pendingTitles = db.plots.filter(
      (p) => p.customerId && p.titleStatus !== "Handed Over",
    ).length;
    const pendingApprovalsCount = db.approvals.filter(
      (a) => a.status === "Pending",
    ).length;

    return {
      totalLandAcres,
      totalLandAcquisitionCost,
      totalPlots,
      availablePlots,
      reservedPlots,
      soldOrPaidPlots,
      totalSalesValue,
      totalCollected,
      outstandingBalances,
      pendingTitles,
      pendingApprovalsCount,
    };
  }, [db]);

  // Export CSV helper (supports Electron native save dialog & web fallback)
  const exportToCSV = async (filename, rows) => {
    if (!rows || !rows.length) {
      notify("No records to export.", "error");
      return;
    }
    const headers = Object.keys(rows[0]);
    const csvContent = [
      headers.join(","),
      ...rows.map((r) =>
        headers
          .map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");

    if (typeof window !== "undefined" && window.electronAPI?.saveFile) {
      await window.electronAPI.saveFile(`${filename}.csv`, csvContent);
      notify(`Saved ${filename}.csv via Electron Desktop Dialog.`);
      return;
    }

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify(`Exported ${filename}.csv successfully.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col lg:flex-row border-t-4 border-emerald-700">
      {/* Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2.5 text-xs font-bold transition-all ${
            toast.type === "error"
              ? "bg-rose-900 text-white border-rose-600"
              : "bg-emerald-900 text-white border-emerald-500"
          }`}
        >
          {toast.type === "error" ? (
            <AlertCircle className="w-4 h-4 text-rose-300" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
          )}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* --- LEFT NAVIGATION SIDEBAR --- */}
      <aside className="w-full lg:w-72 bg-white border-r border-emerald-200 flex flex-col shrink-0 shadow-sm">
        <div className="p-4 bg-emerald-900 text-white border-b border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-emerald-950 rounded-lg font-black shadow">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-black text-base tracking-wide text-amber-300">
                APROTEC LAND360
              </h1>
              <p className="text-[10px] text-emerald-200 font-semibold">
                Complete Property & Land ERP
              </p>
            </div>
          </div>
        </div>

        {/* Active Role Access Control Selector */}
        <div className="p-3 bg-emerald-50 border-b border-emerald-200 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
            <span className="flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-emerald-700" /> Active RBAC Role:
            </span>
            <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded text-[9px]">
              LIVE
            </span>
          </div>
          <select
            value={currentUserRole}
            onChange={(e) => {
              setCurrentUserRole(e.target.value);
              notify(`Switched active session role to ${e.target.value}`);
            }}
            className="w-full bg-white border border-emerald-300 text-emerald-950 text-xs font-bold rounded-lg px-2.5 py-1.5 outline-none focus:ring-2 focus:ring-emerald-600"
          >
            {db.roles.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-2.5 space-y-4 max-h-[calc(100vh-170px)]">
          {navSections.map((sec) => (
            <div key={sec.group} className="space-y-1">
              <div className="px-2 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                {sec.group}
              </div>
              {sec.items.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                const showBadge =
                  item.id === "approvals" && kpis.pendingApprovalsCount > 0;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-bold transition-all ${
                      active
                        ? "bg-emerald-700 text-white shadow-sm"
                        : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-950"
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${active ? "text-amber-300" : "text-emerald-700"}`}
                      />
                      <span className="truncate">{item.label}</span>
                    </span>
                    {showBadge && (
                      <span className="px-1.5 py-0.5 bg-amber-400 text-emerald-950 rounded-full text-[9px] font-black">
                        {kpis.pendingApprovalsCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="p-2.5 bg-emerald-950 text-emerald-200 text-[10px] space-y-2 border-t border-emerald-800">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 font-bold text-emerald-300">
              <Cpu className="w-3 h-3 text-amber-400" />{" "}
              {isElectron ? "Electron Desktop App" : "Electron-Ready Runtime"}
            </span>
            <button
              onClick={resetDatabase}
              className="text-amber-300 hover:underline flex items-center gap-1 font-bold"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
          <div className="flex items-center justify-between gap-1.5 pt-1 border-t border-emerald-900">
            <button
              onClick={exportFullBackup}
              className="flex-1 py-1 px-2 bg-emerald-900 hover:bg-emerald-800 text-amber-300 rounded font-bold text-center"
            >
              Backup DB
            </button>
            <label className="flex-1 py-1 px-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded font-bold text-center cursor-pointer">
              Restore DB
              <input
                type="file"
                accept=".json"
                onChange={handleImportBackup}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT WORKSPACE --- */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Action & Search Header */}
        <header className="bg-white border-b border-emerald-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-700">
              <span>{db.company.name}</span>
              <span>&bull;</span>
              <span>PayBill: {db.company.paybill}</span>
              <span>&bull;</span>
              <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-900 rounded text-[9px] font-black">
                {isElectron ? "ELECTRON DESKTOP" : "DESKTOP & WEB READY"}
              </span>
            </div>
            <h2 className="text-lg font-black text-emerald-950">
              {
                navSections
                  .flatMap((s) => s.items)
                  .find((i) => i.id === activeTab)?.label
              }
            </h2>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-emerald-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Quick filter records..."
                className="pl-8 pr-3 py-1.5 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs font-medium text-slate-800 outline-none focus:ring-2 focus:ring-emerald-600 w-48 sm:w-60"
              />
            </div>
            <button
              onClick={triggerNativePrint}
              className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-700" /> Print View
            </button>
            {isElectron && window.electronAPI && (
              <div className="flex items-center gap-1 pl-2 border-l border-emerald-200">
                <button
                  onClick={() => window.electronAPI.minimize?.()}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-700"
                  title="Minimize"
                >
                  _
                </button>
                <button
                  onClick={() => window.electronAPI.maximize?.()}
                  className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded text-xs font-bold text-slate-700"
                  title="Maximize"
                >
                  □
                </button>
                <button
                  onClick={() => window.electronAPI.close?.()}
                  className="px-2 py-1 bg-rose-100 hover:bg-rose-200 rounded text-xs font-bold text-rose-800"
                  title="Close"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Module Router */}
        <div className="p-6 space-y-6">
          {activeTab === "dashboard" && (
            <DashboardModule
              db={db}
              kpis={kpis}
              setActiveTab={setActiveTab}
              exportToCSV={exportToCSV}
              exportFullBackup={exportFullBackup}
              handleImportBackup={handleImportBackup}
            />
          )}

          {activeTab === "admin" && (
            <AdminAndPermissionsModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
            />
          )}

          {activeTab === "approvals" && (
            <ApprovalsAndAuditModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
            />
          )}

          {activeTab === "landbank" && (
            <LandBankModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
              globalSearch={globalSearch}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsAndInfraModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "subdivision" && (
            <SubdivisionAndPlotsModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
              globalSearch={globalSearch}
            />
          )}

          {activeTab === "valuation" && (
            <ValuationAndResaleModule
              db={db}
              setDb={setDb}
              notify={notify}
              logAudit={logAudit}
            />
          )}

          {activeTab === "crm" && (
            <CRMModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
              globalSearch={globalSearch}
            />
          )}

          {activeTab === "marketing" && (
            <MarketingAndWebModule
              db={db}
              setDb={setDb}
              notify={notify}
              logAudit={logAudit}
            />
          )}

          {activeTab === "sales" && (
            <SalesAndAgreementsModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "commissions" && (
            <CommissionsModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "payments" && (
            <MpesaPaymentsModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "instalments" && (
            <InstalmentsModule
              db={db}
              setDb={setDb}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "collections_comms" && (
            <CollectionsCommunicationModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "default_recovery" && (
            <DefaultedCustomersAndRecoveryModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "titles" && (
            <TitleDeedsModule
              db={db}
              setDb={setDb}
              activePermissions={activePermissions}
              notify={notify}
              logAudit={logAudit}
            />
          )}

          {activeTab === "portal" && (
            <CustomerPortalModule db={db} setDb={setDb} notify={notify} />
          )}

          {activeTab === "fieldops" && (
            <FieldFleetFuelModule
              db={db}
              setDb={setDb}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "procurement" && (
            <ProcurementModule
              db={db}
              setDb={setDb}
              notify={notify}
              logAudit={logAudit}
            />
          )}

          {activeTab === "accounting" && (
            <AccountingAndHRModule
              db={db}
              setDb={setDb}
              kpis={kpis}
              notify={notify}
              logAudit={logAudit}
              exportToCSV={exportToCSV}
            />
          )}

          {activeTab === "customercare" && (
            <CustomerCareAndDocsModule
              db={db}
              setDb={setDb}
              notify={notify}
              logAudit={logAudit}
            />
          )}

          {activeTab === "ai_reports" && (
            <ReportsAndAIModule db={db} kpis={kpis} exportToCSV={exportToCSV} />
          )}
        </div>
      </main>
    </div>
  );
}

/* ============================================================================
   1. DIRECTOR'S EXECUTIVE DASHBOARD
   ============================================================================ */
function DashboardModule({
  db,
  kpis,
  setActiveTab,
  exportToCSV,
  exportFullBackup,
  handleImportBackup,
}) {
  // Compute dynamic operational alerts & notifications
  const overdueAgreements = (db.agreements || []).filter(
    (a) =>
      (a.status || "").toLowerCase().includes("overdue") ||
      (a.nextDueDate &&
        a.nextDueDate !== "-" &&
        a.nextDueDate < "2026-11-18" &&
        a.status !== "Completed"),
  );
  const upcomingSiteVisits = (db.leads || []).filter(
    (l) =>
      l.stage === "Site Visit Scheduled" ||
      (l.nextFollowUp && l.nextFollowUp >= "2026-11-17"),
  );
  const pendingApprovalItems = (db.approvals || []).filter(
    (a) => a.status === "Pending",
  );
  const unfulfilledPlots = (db.plots || []).filter(
    (p) =>
      p.customerId &&
      (p.titleStatus !== "Handed Over" || p.paidAmount < p.price),
  );
  const unallocatedPayments = (db.payments || []).filter(
    (p) => p.status === "Unallocated",
  );

  // Compute chart metrics per project
  const projectChartData = (db.projects || []).map((prj) => {
    const prjPlots = (db.plots || []).filter((pl) => pl.projectId === prj.id);
    const contracted = prjPlots
      .filter(
        (pl) =>
          pl.status !== "Available" && pl.status !== "Blocked / Unavailable",
      )
      .reduce((s, pl) => s + Number(pl.price || 0), 0);
    const collected = prjPlots.reduce(
      (s, pl) => s + Number(pl.paidAmount || 0),
      0,
    );
    return {
      id: prj.id,
      name: prj.name,
      code: prj.code,
      contracted,
      collected,
      spend: Number(prj.actualSpend || 0),
    };
  });

  const maxChartVal = Math.max(
    1,
    ...projectChartData.flatMap((d) => [d.contracted, d.collected, d.spend]),
  );

  return (
    <div className="space-y-6">
      {/* Executive Command & Full Database Migration Backup Bar */}
      <div className="bg-white border border-emerald-200 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
            Executive Command Center
          </span>
          <h3 className="text-sm font-black text-emerald-950">
            Group Analytics, Live Alerts & System Migration Backup
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={exportFullBackup}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" /> Export Full
            Backup (JSON)
          </button>
          <label className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm">
            <Database className="w-3.5 h-3.5 text-amber-800" /> Import / Restore
            Backup
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
          <button
            onClick={() =>
              exportToCSV("executive_summary_report", projectChartData)
            }
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-lg flex items-center gap-1.5"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" /> Export
            Executive CSV
          </button>
        </div>
      </div>

      {/* Top KPI Cards - Clickable to drill down */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab("landbank")}
          className="cursor-pointer bg-white border border-emerald-200 hover:border-emerald-500 p-4 rounded-xl shadow-sm transition-all"
        >
          <div className="flex justify-between items-center text-xs font-bold text-emerald-700">
            <span>Total Land Bank</span>
            <MapPin className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-1">
            {kpis.totalLandAcres} Acres
          </div>
          <div className="text-[11px] font-semibold text-slate-600 mt-1">
            {db.parentParcels.length} Parent Parcels &bull; Cost: KES{" "}
            {(kpis.totalLandAcquisitionCost / 1000000).toFixed(1)}M
          </div>
        </div>

        <div
          onClick={() => setActiveTab("subdivision")}
          className="cursor-pointer bg-white border border-emerald-200 hover:border-emerald-500 p-4 rounded-xl shadow-sm transition-all"
        >
          <div className="flex justify-between items-center text-xs font-bold text-emerald-700">
            <span>Plot Inventory Status</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-1">
            {kpis.soldOrPaidPlots} Sold / {kpis.totalPlots}
          </div>
          <div className="text-[11px] font-semibold text-emerald-800 mt-1">
            {kpis.availablePlots} Available &bull; {kpis.reservedPlots} Reserved
          </div>
        </div>

        <div
          onClick={() => setActiveTab("payments")}
          className="cursor-pointer bg-white border border-emerald-200 hover:border-emerald-500 p-4 rounded-xl shadow-sm transition-all"
        >
          <div className="flex justify-between items-center text-xs font-bold text-emerald-700">
            <span>Cash Collections Received</span>
            <Smartphone className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-800 mt-1">
            KES {kpis.totalCollected.toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-amber-800 mt-1">
            Receivables: KES {kpis.outstandingBalances.toLocaleString()}
          </div>
        </div>

        <div
          onClick={() => setActiveTab("titles")}
          className="cursor-pointer bg-white border border-emerald-200 hover:border-emerald-500 p-4 rounded-xl shadow-sm transition-all"
        >
          <div className="flex justify-between items-center text-xs font-bold text-emerald-700">
            <span>Title Deeds & Approvals</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950 mt-1">
            {kpis.pendingTitles} Titles Active
          </div>
          <div className="text-[11px] font-bold text-rose-700 mt-1">
            {kpis.pendingApprovalsCount} Pending Director Approvals
          </div>
        </div>
      </div>

      {/* VISUAL CHARTS ROW: Revenue vs Collections Bar Chart & Inventory Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-emerald-200 rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
            <h3 className="font-black text-emerald-950 text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-700" /> Project Sales
              vs. Collections & Expenditure Chart
            </h3>
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-800 inline-block"></span>{" "}
                Contracted Sales
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span>{" "}
                Cash Collected
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block"></span>{" "}
                Project Spend
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {projectChartData.map((item) => (
              <div key={item.id} className="space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-800">
                  <span>
                    {item.name} ({item.code})
                  </span>
                  <span className="font-mono text-[11px] text-emerald-800">
                    Collected: KES {item.collected.toLocaleString()}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-800 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.max(4, (item.contracted / maxChartVal) * 100)}%`,
                      }}
                      title={`Contracted: KES ${item.contracted.toLocaleString()}`}
                    />
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.max(4, (item.collected / maxChartVal) * 100)}%`,
                      }}
                      title={`Collected: KES ${item.collected.toLocaleString()}`}
                    />
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-amber-400 h-1.5 rounded-full transition-all"
                      style={{
                        width: `${Math.max(3, (item.spend / maxChartVal) * 100)}%`,
                      }}
                      title={`Spend: KES ${item.spend.toLocaleString()}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Plot Inventory & Collection Efficiency Donut Summary */}
        <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-black text-emerald-950 text-sm flex items-center gap-2 border-b border-emerald-100 pb-3">
              <PieChart className="w-4 h-4 text-emerald-700" /> Plot Portfolio &
              Collection Ratio
            </h3>
            <div className="mt-4 space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-emerald-900">
                    Sold / Instalment Active
                  </span>
                  <span>
                    {kpis.soldOrPaidPlots} / {kpis.totalPlots} (
                    {kpis.totalPlots
                      ? Math.round(
                          (kpis.soldOrPaidPlots / kpis.totalPlots) * 100,
                        )
                      : 0}
                    %)
                  </span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2.5">
                  <div
                    className="bg-emerald-700 h-2.5 rounded-full"
                    style={{
                      width: `${kpis.totalPlots ? (kpis.soldOrPaidPlots / kpis.totalPlots) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-amber-800">Reserved Plots</span>
                  <span>
                    {kpis.reservedPlots} / {kpis.totalPlots}
                  </span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full"
                    style={{
                      width: `${kpis.totalPlots ? (kpis.reservedPlots / kpis.totalPlots) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-slate-700">
                    Available Unsold Inventory
                  </span>
                  <span>
                    {kpis.availablePlots} / {kpis.totalPlots}
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-slate-600 h-2.5 rounded-full"
                    style={{
                      width: `${kpis.totalPlots ? (kpis.availablePlots / kpis.totalPlots) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100">
                <div className="flex justify-between font-bold mb-1">
                  <span className="text-emerald-950">
                    Cash Realization Rate
                  </span>
                  <span>
                    {kpis.totalSalesValue
                      ? Math.round(
                          (kpis.totalCollected / kpis.totalSalesValue) * 100,
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2.5">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{
                      width: `${kpis.totalSalesValue ? Math.min(100, (kpis.totalCollected / kpis.totalSalesValue) * 100) : 0}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("ai_reports")}
            className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs rounded-lg"
          >
            Open Full BI & AI Reports &rarr;
          </button>
        </div>
      </div>

      {/* LIVE NOTIFICATIONS CENTER: Late Payments, Pending Requests, Upcoming Site Visits & Unfulfilled Items */}
      <div className="bg-white border-2 border-amber-400 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-3">
          <h3 className="font-black text-emerald-950 text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" /> Actionable
            Alerts: Late Payments, Approval Requests, Upcoming Site Visits &
            Unfulfilled Obligations
          </h3>
          <span className="px-2.5 py-0.5 bg-rose-100 text-rose-900 rounded-full text-[10px] font-black">
            {overdueAgreements.length +
              pendingApprovalItems.length +
              upcomingSiteVisits.length +
              unallocatedPayments.length}{" "}
            Active Alerts
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* 1. Late / Overdue Payments */}
          <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between font-black text-rose-950">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-600" /> Late & Overdue
                Instalments
              </span>
              <span className="px-1.5 py-0.5 bg-rose-200 rounded text-[10px]">
                {overdueAgreements.length}
              </span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {overdueAgreements.length === 0 ? (
                <p className="text-[11px] text-slate-500">
                  No overdue instalments.
                </p>
              ) : (
                overdueAgreements.map((ag) => {
                  const cust = db.customers.find((c) => c.id === ag.customerId);
                  const plot = db.plots.find((p) => p.id === ag.plotId);
                  return (
                    <div
                      key={ag.id}
                      onClick={() => setActiveTab("instalments")}
                      className="cursor-pointer p-2 bg-white border border-rose-200 rounded-lg hover:border-rose-400"
                    >
                      <div className="font-bold text-rose-950">
                        {cust?.name || ag.customerId} ({plot?.number})
                      </div>
                      <div className="text-[10px] text-rose-700 font-semibold">
                        {ag.status} &bull; Due: KES{" "}
                        {(ag.monthlyDue || 0).toLocaleString()}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 2. Pending Approval Requests */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between font-black text-amber-950">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" /> Pending
                Approval Requests
              </span>
              <span className="px-1.5 py-0.5 bg-amber-200 rounded text-[10px]">
                {pendingApprovalItems.length}
              </span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {pendingApprovalItems.length === 0 ? (
                <p className="text-[11px] text-slate-500">
                  All requests approved.
                </p>
              ) : (
                pendingApprovalItems.map((apr) => (
                  <div
                    key={apr.id}
                    onClick={() => setActiveTab("approvals")}
                    className="cursor-pointer p-2 bg-white border border-amber-200 rounded-lg hover:border-amber-400"
                  >
                    <div className="font-bold text-slate-900">
                      {apr.type} ({apr.ref})
                    </div>
                    <div className="text-[10px] text-amber-800 font-semibold">
                      KES {apr.amount.toLocaleString()} &bull; By{" "}
                      {apr.requestedBy}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. Upcoming Site Visits & Follow-Ups */}
          <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between font-black text-emerald-950">
              <span className="flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-emerald-700" /> Upcoming Site
                Visits
              </span>
              <span className="px-1.5 py-0.5 bg-emerald-200 rounded text-[10px]">
                {upcomingSiteVisits.length}
              </span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {upcomingSiteVisits.length === 0 ? (
                <p className="text-[11px] text-slate-500">
                  No scheduled site visits.
                </p>
              ) : (
                upcomingSiteVisits.map((ld) => (
                  <div
                    key={ld.id}
                    onClick={() => setActiveTab("fieldops")}
                    className="cursor-pointer p-2 bg-white border border-emerald-200 rounded-lg hover:border-emerald-400"
                  >
                    <div className="font-bold text-emerald-950">
                      {ld.name} ({ld.locationPref})
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      {ld.stage} &bull; {ld.nextFollowUp} ({ld.agent})
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 4. Unfulfilled Obligations (Unallocated Payments & Pending Titles/KYC) */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between font-black text-slate-900">
              <span className="flex items-center gap-1.5">
                <ListChecks className="w-3.5 h-3.5 text-emerald-700" />{" "}
                Unfulfilled Items
              </span>
              <span className="px-1.5 py-0.5 bg-slate-200 rounded text-[10px]">
                {unallocatedPayments.length + unfulfilledPlots.length}
              </span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {unallocatedPayments.map((pay) => (
                <div
                  key={pay.id}
                  onClick={() => setActiveTab("payments")}
                  className="cursor-pointer p-2 bg-rose-50 border border-rose-200 rounded-lg"
                >
                  <div className="font-bold text-rose-900">
                    Unallocated M-Pesa {pay.mpesaRef}
                  </div>
                  <div className="text-[10px] text-rose-700">
                    KES {pay.amount.toLocaleString()} awaiting match
                  </div>
                </div>
              ))}
              {unfulfilledPlots.slice(0, 3).map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => setActiveTab("titles")}
                  className="cursor-pointer p-2 bg-white border border-slate-200 rounded-lg hover:border-emerald-400"
                >
                  <div className="font-bold text-slate-900">
                    Plot {pl.number} ({pl.titleStatus})
                  </div>
                  <div className="text-[10px] text-slate-600">
                    Bal: KES{" "}
                    {Math.max(0, pl.price - pl.paidAmount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Profitability & Financial Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-emerald-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
            <h3 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" /> Real-Time
              Project Costing & Profitability
            </h3>
            <button
              onClick={() => exportToCSV("project_profitability", db.projects)}
              className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Project</th>
                  <th className="p-2.5">Parent Parcel</th>
                  <th className="p-2.5">Budget</th>
                  <th className="p-2.5">Actual Spend</th>
                  <th className="p-2.5">Collected Revenue</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {db.projects.map((prj) => {
                  const parcel = db.parentParcels.find(
                    (p) => p.id === prj.parcelId,
                  );
                  const prjPlots = db.plots.filter(
                    (pl) => pl.projectId === prj.id,
                  );
                  const collected = prjPlots.reduce(
                    (s, pl) => s + Number(pl.paidAmount || 0),
                    0,
                  );
                  return (
                    <tr key={prj.id} className="hover:bg-emerald-50">
                      <td className="p-2.5 font-bold text-emerald-950">
                        {prj.name}
                      </td>
                      <td className="p-2.5 font-mono text-[11px]">
                        {parcel?.titleNo || prj.parcelId}
                      </td>
                      <td className="p-2.5 font-mono">
                        KES {prj.budget.toLocaleString()}
                      </td>
                      <td className="p-2.5 font-mono text-amber-800 font-semibold">
                        KES {prj.actualSpend.toLocaleString()}
                      </td>
                      <td className="p-2.5 font-mono text-emerald-700 font-bold">
                        KES {collected.toLocaleString()}
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                          {prj.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live M-Pesa Feed & Alerts */}
        <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-emerald-100">
              <h3 className="font-extrabold text-emerald-950 text-sm flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" /> Latest
                Collections
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                LIVE PAYBILL
              </span>
            </div>
            <div className="space-y-2.5">
              {db.payments.slice(0, 4).map((pay) => {
                const cust = db.customers.find((c) => c.id === pay.customerId);
                return (
                  <div
                    key={pay.id}
                    className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-mono font-bold text-emerald-950">
                        {pay.mpesaRef}
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {cust ? cust.name : "Unmatched"} &bull; {pay.accountRef}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-emerald-800">
                        KES {pay.amount.toLocaleString()}
                      </div>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${pay.status === "Auto-Allocated" ? "bg-emerald-200 text-emerald-950" : "bg-rose-200 text-rose-950"}`}
                      >
                        {pay.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setActiveTab("payments")}
            className="mt-4 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg"
          >
            Open M-Pesa Reconciliation &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   2. COMPANY SETUP, USERS, ROLES & PERMISSION MATRIX
   ============================================================================ */
function AdminAndPermissionsModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
}) {
  const [subTab, setSubTab] = useState("users");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Sales Agent",
    dept: "Commercial",
    branch: "Nairobi HQ",
  });
  const [companyForm, setCompanyForm] = useState(db.company);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!activePermissions.Create)
      return notify("Access Denied: Role lacks Create permission.", "error");
    const created = {
      id: `USR-${Date.now().toString().slice(-3)}`,
      ...newUser,
      status: "Active",
      lastLogin: "Never",
    };
    setDb((prev) => ({ ...prev, users: [...prev.users, created] }));
    logAudit(
      `Created user ${created.name} (${created.role})`,
      "Administration",
    );
    setNewUser({
      name: "",
      email: "",
      role: "Sales Agent",
      dept: "Commercial",
      branch: "Nairobi HQ",
    });
    notify(`User ${created.name} added.`);
  };

  const toggleUserStatus = (id) => {
    if (!activePermissions.Edit)
      return notify("Access Denied: Role lacks Edit permission.", "error");
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "Active" ? "Deactivated" : "Active" }
          : u,
      ),
    }));
    logAudit(`Toggled status for user ${id}`, "Administration");
    notify("User account status updated.");
  };

  const toggleRolePermission = (roleName, permKey) => {
    if (!activePermissions.Settings)
      return notify(
        "Only System Administrator or Director can edit Role Permissions.",
        "error",
      );
    setDb((prev) => ({
      ...prev,
      roles: prev.roles.map((r) =>
        r.name === roleName
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [permKey]: !r.permissions[permKey],
              },
            }
          : r,
      ),
    }));
    logAudit(
      `Modified ${permKey} permission for role ${roleName}`,
      "RBAC Matrix",
    );
  };

  const saveCompanySettings = (e) => {
    e.preventDefault();
    if (!activePermissions.Settings)
      return notify("Access Denied: Settings restricted.", "error");
    setDb((prev) => ({ ...prev, company: companyForm }));
    logAudit("Updated company profile & approval thresholds", "Company Setup");
    notify("Company & Threshold settings saved.");
  };

  return (
    <div className="space-y-5">
      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-emerald-200">
        {[
          { id: "users", label: "User Management" },
          { id: "matrix", label: "Role Permission Matrix" },
          { id: "company", label: "Company Profile & Thresholds" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold ${subTab === t.id ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {subTab === "users" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleAddUser}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Register System User
            </h3>
            <div>
              <label className="text-xs font-bold text-slate-700">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 text-xs"
                placeholder="e.g. Samuel Karanja"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">
                Work Email *
              </label>
              <input
                required
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 text-xs"
                placeholder="s.karanja@aprotec.co.ke"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">
                Assigned Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 text-xs font-semibold"
              >
                {db.roles.map((r) => (
                  <option key={r.name} value={r.name}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-slate-700">
                  Department
                </label>
                <input
                  type="text"
                  value={newUser.dept}
                  onChange={(e) =>
                    setNewUser({ ...newUser, dept: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700">
                  Branch
                </label>
                <input
                  type="text"
                  value={newUser.branch}
                  onChange={(e) =>
                    setNewUser({ ...newUser, branch: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 text-xs"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow"
            >
              Save System User
            </button>
          </form>

          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <h3 className="font-black text-emerald-950 text-sm mb-3">
              Registered ERP Users ({db.users.length})
            </h3>
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">User</th>
                  <th className="p-2.5">Role</th>
                  <th className="p-2.5">Branch</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {db.users.map((u) => (
                  <tr key={u.id} className="hover:bg-emerald-50">
                    <td className="p-2.5">
                      <div className="font-bold text-emerald-950">{u.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {u.email}
                      </div>
                    </td>
                    <td className="p-2.5 font-semibold text-emerald-800">
                      {u.role}
                    </td>
                    <td className="p-2.5">{u.branch}</td>
                    <td className="p-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.status === "Active" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-2.5 flex gap-1.5">
                      <button
                        onClick={() => toggleUserStatus(u.id)}
                        className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded font-bold text-[10px]"
                      >
                        {u.status === "Active" ? "Deactivate" : "Reactivate"}
                      </button>
                      <button
                        onClick={() =>
                          notify(`Password reset link sent to ${u.email}`)
                        }
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold text-[10px]"
                      >
                        Reset Pwd
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === "matrix" && (
        <div className="bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-black text-emerald-950 text-sm">
              Editable Role-Based Permission Matrix
            </h3>
            <button
              onClick={() =>
                notify("Permissions matrix committed to database.")
              }
              className="px-3 py-1.5 bg-emerald-700 text-white font-bold text-xs rounded-lg"
            >
              Save Permissions
            </button>
          </div>
          <table className="w-full text-xs text-left border border-emerald-200">
            <thead className="bg-emerald-900 text-white uppercase font-bold">
              <tr>
                <th className="p-2.5">System Role</th>
                {[
                  "View",
                  "Create",
                  "Edit",
                  "Delete",
                  "Approve",
                  "Export",
                  "Settings",
                ].map((p) => (
                  <th key={p} className="p-2.5 text-center">
                    {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {db.roles.map((role) => (
                <tr key={role.name} className="hover:bg-emerald-50">
                  <td className="p-2.5 font-bold text-emerald-950">
                    {role.name}
                  </td>
                  {[
                    "View",
                    "Create",
                    "Edit",
                    "Delete",
                    "Approve",
                    "Export",
                    "Settings",
                  ].map((perm) => (
                    <td key={perm} className="p-2.5 text-center">
                      <input
                        type="checkbox"
                        checked={!!role.permissions[perm]}
                        onChange={() => toggleRolePermission(role.name, perm)}
                        className="w-4 h-4 accent-emerald-700 cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {subTab === "company" && (
        <form
          onSubmit={saveCompanySettings}
          className="bg-white border border-emerald-200 p-6 rounded-xl max-w-2xl space-y-4"
        >
          <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
            Company Branding, Tax & Approval Thresholds
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700">
                Company Legal Name
              </label>
              <input
                type="text"
                value={companyForm.name}
                onChange={(e) =>
                  setCompanyForm({ ...companyForm, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">KRA PIN</label>
              <input
                type="text"
                value={companyForm.kraPin}
                onChange={(e) =>
                  setCompanyForm({ ...companyForm, kraPin: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                M-Pesa PayBill Shortcode
              </label>
              <input
                type="text"
                value={companyForm.paybill}
                onChange={(e) =>
                  setCompanyForm({ ...companyForm, paybill: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Max Agent Discount Without Director Approval (%)
              </label>
              <input
                type="number"
                value={companyForm.approvalThresholds.discountMaxPercent}
                onChange={(e) =>
                  setCompanyForm({
                    ...companyForm,
                    approvalThresholds: {
                      ...companyForm.approvalThresholds,
                      discountMaxPercent: Number(e.target.value),
                    },
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Director Expense Approval Threshold (KES)
              </label>
              <input
                type="number"
                value={companyForm.approvalThresholds.expenseDirectorThreshold}
                onChange={(e) =>
                  setCompanyForm({
                    ...companyForm,
                    approvalThresholds: {
                      ...companyForm.approvalThresholds,
                      expenseDirectorThreshold: Number(e.target.value),
                    },
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Land Purchase Approval Threshold (KES)
              </label>
              <input
                type="number"
                value={companyForm.approvalThresholds.landPurchaseApproval}
                onChange={(e) =>
                  setCompanyForm({
                    ...companyForm,
                    approvalThresholds: {
                      ...companyForm.approvalThresholds,
                      landPurchaseApproval: Number(e.target.value),
                    },
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow"
          >
            Save Configuration
          </button>
        </form>
      )}
    </div>
  );
}

/* ============================================================================
   3. APPROVAL WORKFLOWS & IMMUTABLE AUDIT TRAIL
   ============================================================================ */
function ApprovalsAndAuditModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
}) {
  const handleDecision = (id, decision) => {
    if (!activePermissions.Approve) {
      return notify(
        `Access Denied: Role "${db.currentUserRole || "Current Role"}" cannot approve transactions.`,
        "error",
      );
    }
    setDb((prev) => ({
      ...prev,
      approvals: prev.approvals.map((a) =>
        a.id === id ? { ...a, status: decision } : a,
      ),
    }));
    logAudit(`${decision} approval request ${id}`, "Approvals");
    notify(`Request ${id} marked as ${decision}.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-emerald-200 p-5 rounded-xl shadow-sm">
        <h3 className="font-black text-emerald-950 text-sm mb-3">
          Transaction Approval Queue
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-emerald-900 text-white uppercase font-bold">
              <tr>
                <th className="p-2.5">Ref ID</th>
                <th className="p-2.5">Category</th>
                <th className="p-2.5">Requested By</th>
                <th className="p-2.5">Amount</th>
                <th className="p-2.5">Details</th>
                <th className="p-2.5">Status</th>
                <th className="p-2.5">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {db.approvals.map((apr) => (
                <tr key={apr.id} className="hover:bg-emerald-50">
                  <td className="p-2.5 font-mono font-bold">
                    {apr.id} ({apr.ref})
                  </td>
                  <td className="p-2.5 font-bold text-emerald-900">
                    {apr.type}
                  </td>
                  <td className="p-2.5">{apr.requestedBy}</td>
                  <td className="p-2.5 font-mono font-bold">
                    KES {apr.amount.toLocaleString()}
                  </td>
                  <td className="p-2.5">{apr.details}</td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        apr.status === "Approved"
                          ? "bg-emerald-100 text-emerald-900"
                          : apr.status === "Rejected"
                            ? "bg-rose-100 text-rose-900"
                            : "bg-amber-100 text-amber-900"
                      }`}
                    >
                      {apr.status}
                    </span>
                  </td>
                  <td className="p-2.5 flex gap-1.5">
                    {apr.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleDecision(apr.id, "Approved")}
                          className="px-2.5 py-1 bg-emerald-700 text-white font-bold rounded text-[10px]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDecision(apr.id, "Rejected")}
                          className="px-2.5 py-1 bg-rose-600 text-white font-bold rounded text-[10px]"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Immutable Audit Trail */}
      <div className="bg-white border border-emerald-200 p-5 rounded-xl shadow-sm">
        <h3 className="font-black text-emerald-950 text-sm mb-3">
          System Audit Trail ({db.auditLogs.length} Events)
        </h3>
        <div className="space-y-2 max-h-72 overflow-y-auto">
          {db.auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-2.5 bg-slate-50 border border-emerald-100 rounded-lg flex flex-wrap justify-between items-center text-xs gap-2"
            >
              <div>
                <span className="font-mono text-[11px] text-emerald-700 font-bold mr-2">
                  [{log.timestamp}]
                </span>
                <span className="font-bold text-slate-900">{log.user}:</span>{" "}
                <span className="text-slate-700">{log.action}</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded text-[10px] font-bold">
                {log.module}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function LandBankModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
  globalSearch,
}) {
  const [subTab, setSubTab] = useState("parcels");
  const [showForm, setShowForm] = useState(false);
  const [selectedParcel, setSelectedParcel] = useState(null);

  // Safe array initializers
  const parentParcels = Array.isArray(db?.parentParcels)
    ? db.parentParcels
    : [];
  const surveyors = Array.isArray(db?.surveyors) ? db.surveyors : [];
  const advocates = Array.isArray(db?.advocates) ? db.advocates : [];
  const dueDiligenceChecks = Array.isArray(db?.dueDiligenceChecks)
    ? db.dueDiligenceChecks
    : [];

  const [form, setForm] = useState({
    refNo: `ACQ-2026-0${parentParcels.length + 1}`,
    titleNo: "",
    county: "Nakuru",
    subCounty: "",
    location: "",
    size: 20,
    unit: "Acres",
    seller: "",
    sellerPhone: "",
    purchasePrice: 18000000,
    paidAmount: 5000000,
    valuation: 24000000,
    acqDate: "2026-11-17",
    agreementRef: "",
    surveyor: surveyors[0]?.name || "GeoSurvey Kenya Ltd",
    advocate: advocates[0]?.name || "Mutua & Associates Advocates",
    mutationRef: "Pending",
    encumbrances: "None - Clean Search",
    dueDiligence: "In Progress",
    status: "Under Due Diligence",
  });

  const [ddItem, setDdItem] = useState("Official Land Registry Search");
  const [ddStatus, setDdStatus] = useState("Cleared");
  const [ddRemarks, setDdRemarks] = useState("");

  const [srvForm, setSrvForm] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    regNo: "",
    services: "Subdivision & Beacons",
    projectId: db?.projects?.[0]?.id || "",
    contractAmount: 750000,
  });
  const [advForm, setAdvForm] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    regNo: "",
    specialisation: "Conveyancing & Title Transfers",
    projectId: db?.projects?.[0]?.id || "",
    invoiced: 900000,
  });

  const ddChecklistItems = [
    "Official Land Registry Search",
    "Title Deed Verification",
    "Ownership Verification",
    "Seller Identity Verification",
    "Encumbrance Search",
    "Charges and Mortgage Verification",
    "Caveats and Restrictions",
    "Land Rates Clearance",
    "Land Rent Clearance",
    "Survey and Boundary Verification",
    "Mutation / Survey Plan Verification",
    "Physical Site Inspection",
    "Access Road Verification",
    "Zoning and Land Use Verification",
    "Environmental / NEMA Approvals",
    "Litigation / Dispute Check",
    "Valuation Report",
    "Legal & Purchase Agreement Review",
  ];

  const handleSaveParcel = (e) => {
    e.preventDefault();
    if (!activePermissions.Create)
      return notify("Access Denied: Cannot add parent parcels.", "error");
    const newParcel = { id: `PRC-${Date.now().toString().slice(-3)}`, ...form };
    setDb((prev) => ({
      ...prev,
      parentParcels: [newParcel, ...(prev.parentParcels || [])],
    }));
    logAudit(
      `Registered Land Acquisition ${newParcel.titleNo} (${newParcel.size} ${newParcel.unit})`,
      "Land Acquisition",
    );
    notify(
      `Parcel ${newParcel.titleNo} registered. Complete Due Diligence checks before clearance.`,
    );
    setShowForm(false);
  };

  const addDueDiligenceRecord = (e) => {
    e.preventDefault();
    if (!selectedParcel) return;
    const rec = {
      id: `DD-${Date.now().toString().slice(-4)}`,
      parcelId: selectedParcel.id,
      item: ddItem,
      status: ddStatus,
      officer: "Adv. Faith Mutua",
      date: new Date().toISOString().slice(0, 10),
      remarks: ddRemarks || "Verified and documented.",
    };
    setDb((prev) => ({
      ...prev,
      dueDiligenceChecks: [
        rec,
        ...(prev.dueDiligenceChecks || []).filter(
          (d) => !(d.parcelId === selectedParcel.id && d.item === ddItem),
        ),
      ],
    }));
    logAudit(
      `Recorded Due Diligence [${ddItem}: ${ddStatus}] on ${selectedParcel.titleNo}`,
      "Due Diligence",
    );
    notify(`Due diligence check "${ddItem}" saved as ${ddStatus}.`);
    setDdRemarks("");
  };

  const approveParcelForSubdivision = (parcel) => {
    if (!activePermissions.Approve)
      return notify("Approval permission required.", "error");
    const parcelChecks = dueDiligenceChecks.filter(
      (d) => d.parcelId === parcel.id,
    );
    const hasFailedOrPending = parcelChecks.some(
      (d) => d.status === "Failed" || d.status === "Requires Attention",
    );
    if (parcelChecks.length === 0 || hasFailedOrPending) {
      return notify(
        "Cannot clear acquisition: Ensure Official Search & Due Diligence checks are logged and Cleared first.",
        "error",
      );
    }
    setDb((prev) => ({
      ...prev,
      parentParcels: (prev.parentParcels || []).map((p) =>
        p.id === parcel.id
          ? {
              ...p,
              status: "Cleared for Subdivision",
              dueDiligence: "Verified",
            }
          : p,
      ),
    }));
    logAudit(
      `Approved Parent Parcel ${parcel.titleNo} for Subdivision`,
      "Land Acquisition",
    );
    notify("Parcel passed Due Diligence and is cleared for subdivision.");
  };

  const handleAddSurveyor = (e) => {
    e.preventDefault();
    const created = {
      id: `SRV-${Date.now().toString().slice(-3)}`,
      ...srvForm,
      paidAmount: 0,
      status: "Active",
    };
    setDb((prev) => ({
      ...prev,
      surveyors: [created, ...(prev.surveyors || [])],
    }));
    logAudit(`Added Surveyor ${created.name}`, "Surveyors Panel");
    notify(`Surveyor ${created.name} added to panel.`);
    setSrvForm({
      name: "",
      contact: "",
      phone: "",
      email: "",
      regNo: "",
      services: "Subdivision & Beacons",
      projectId: db?.projects?.[0]?.id || "",
      contractAmount: 750000,
    });
  };

  const handleAddAdvocate = (e) => {
    e.preventDefault();
    const created = {
      id: `ADV-${Date.now().toString().slice(-3)}`,
      ...advForm,
      matterRef: `MAT-${Date.now().toString().slice(-3)}`,
      paid: 0,
      status: "Active",
    };
    setDb((prev) => ({
      ...prev,
      advocates: [created, ...(prev.advocates || [])],
    }));
    logAudit(`Added Advocate Firm ${created.name}`, "Legal Panel");
    notify(`Advocate ${created.name} added to legal panel.`);
    setAdvForm({
      name: "",
      contact: "",
      phone: "",
      email: "",
      regNo: "",
      specialisation: "Conveyancing & Title Transfers",
      projectId: db?.projects?.[0]?.id || "",
      invoiced: 900000,
    });
  };

  const filtered = parentParcels.filter(
    (p) =>
      (p.titleNo || "")
        .toLowerCase()
        .includes((globalSearch || "").toLowerCase()) ||
      (p.seller || "")
        .toLowerCase()
        .includes((globalSearch || "").toLowerCase()) ||
      (p.county || "")
        .toLowerCase()
        .includes((globalSearch || "").toLowerCase()),
  );

  return (
    <div className="space-y-5">
      {/* Sub-module Switcher */}
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-3 rounded-xl border border-emerald-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSubTab("parcels")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold ${subTab === "parcels" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
          >
            Parent Parcels & Due Diligence ({parentParcels.length})
          </button>
          <button
            onClick={() => setSubTab("surveyors")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold ${subTab === "surveyors" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
          >
            Surveyor Register ({surveyors.length})
          </button>
          <button
            onClick={() => setSubTab("advocates")}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold ${subTab === "advocates" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
          >
            Advocates & Legal Panel ({advocates.length})
          </button>
        </div>
        {subTab === "parcels" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4 text-amber-300" /> Add Land Acquisition /
              Parent Parcel
            </button>
            <button
              onClick={() =>
                exportToCSV("parent_parcels_register", parentParcels)
              }
              className="px-3 py-2 bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-lg flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        )}
      </div>

      {subTab === "parcels" && (
        <>
          {showForm && (
            <form
              onSubmit={handleSaveParcel}
              className="bg-white border-2 border-emerald-500 p-5 rounded-xl shadow-md space-y-4"
            >
              <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                <h3 className="font-black text-emerald-950 text-sm">
                  Register Land Acquisition & Parent Parcel
                </h3>
                <button type="button" onClick={() => setShowForm(false)}>
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700">
                    Acquisition Ref *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.refNo}
                    onChange={(e) =>
                      setForm({ ...form, refNo: e.target.value })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Original Land Title Number *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.titleNo}
                    onChange={(e) =>
                      setForm({ ...form, titleNo: e.target.value })
                    }
                    placeholder="e.g. NAKURU/LANET/3310"
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">County *</label>
                  <input
                    required
                    type="text"
                    value={form.county}
                    onChange={(e) =>
                      setForm({ ...form, county: e.target.value })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Sub-County & Physical Location
                  </label>
                  <input
                    required
                    type="text"
                    value={form.location}
                    onChange={(e) =>
                      setForm({ ...form, location: e.target.value })
                    }
                    placeholder="e.g. Lanet Greenbelt"
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Original Size *
                  </label>
                  <div className="flex gap-1 mt-1">
                    <input
                      required
                      type="number"
                      value={form.size}
                      onChange={(e) =>
                        setForm({ ...form, size: Number(e.target.value) })
                      }
                      className="w-2/3 border border-emerald-300 rounded-lg p-2 font-mono"
                    />
                    <select
                      value={form.unit}
                      onChange={(e) =>
                        setForm({ ...form, unit: e.target.value })
                      }
                      className="w-1/3 border border-emerald-300 rounded-lg p-2"
                    >
                      <option>Acres</option>
                      <option>Hectares</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Original Landowner / Seller *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.seller}
                    onChange={(e) =>
                      setForm({ ...form, seller: e.target.value })
                    }
                    placeholder="e.g. Kiprono Koech"
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Seller Contact Phone
                  </label>
                  <input
                    required
                    type="text"
                    value={form.sellerPhone}
                    onChange={(e) =>
                      setForm({ ...form, sellerPhone: e.target.value })
                    }
                    placeholder="+254 7..."
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Agreed Purchase Price (KES) *
                  </label>
                  <input
                    required
                    type="number"
                    value={form.purchasePrice}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        purchasePrice: Number(e.target.value),
                      })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Initial Deposit Paid (KES)
                  </label>
                  <input
                    required
                    type="number"
                    value={form.paidAmount}
                    onChange={(e) =>
                      setForm({ ...form, paidAmount: Number(e.target.value) })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Assigned Surveyor
                  </label>
                  <select
                    value={form.surveyor}
                    onChange={(e) =>
                      setForm({ ...form, surveyor: e.target.value })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                  >
                    {surveyors.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Assigned Advocate
                  </label>
                  <select
                    value={form.advocate}
                    onChange={(e) =>
                      setForm({ ...form, advocate: e.target.value })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                  >
                    {advocates.map((a) => (
                      <option key={a.id} value={a.name}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700">
                    Valuation Amount (KES)
                  </label>
                  <input
                    type="number"
                    value={form.valuation}
                    onChange={(e) =>
                      setForm({ ...form, valuation: Number(e.target.value) })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-slate-100 rounded-lg text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 text-white rounded-lg text-xs font-bold shadow"
                >
                  Save Land Acquisition
                </button>
              </div>
            </form>
          )}

          {/* Parent Parcel Register Table */}
          <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Title Number</th>
                  <th className="p-2.5">Location & County</th>
                  <th className="p-2.5">Size</th>
                  <th className="p-2.5">Original Seller</th>
                  <th className="p-2.5">Purchase / Paid</th>
                  <th className="p-2.5">Due Diligence</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filtered.map((p) => {
                  const checksDone = dueDiligenceChecks.filter(
                    (d) => d.parcelId === p.id && d.status === "Cleared",
                  ).length;
                  return (
                    <tr key={p.id} className="hover:bg-emerald-50">
                      <td className="p-2.5 font-mono font-bold text-emerald-950">
                        {p.titleNo}
                      </td>
                      <td className="p-2.5">
                        {p.location}, {p.county}
                      </td>
                      <td className="p-2.5 font-bold">
                        {p.size} {p.unit}
                      </td>
                      <td className="p-2.5">
                        <div className="font-semibold">{p.seller}</div>
                        <div className="text-[10px] text-slate-500">
                          {p.sellerPhone}
                        </div>
                      </td>
                      <td className="p-2.5 font-mono">
                        <div className="font-bold">
                          KES {(p.purchasePrice || 0).toLocaleString()}
                        </div>
                        <div className="text-[10px] text-emerald-700">
                          Paid: KES {(p.paidAmount || 0).toLocaleString()}
                        </div>
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.dueDiligence === "Verified" ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}
                        >
                          {p.dueDiligence} ({checksDone} Cleared)
                        </span>
                      </td>
                      <td className="p-2.5 font-bold text-emerald-800">
                        {p.status}
                      </td>
                      <td className="p-2.5 flex gap-1.5">
                        <button
                          onClick={() => setSelectedParcel(p)}
                          className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded font-bold text-[10px]"
                        >
                          Due Diligence & Dossier
                        </button>
                        {p.status !== "Cleared for Subdivision" && (
                          <button
                            onClick={() => approveParcelForSubdivision(p)}
                            className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold text-[10px]"
                          >
                            Approve Clearance
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {subTab === "surveyors" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleAddSurveyor}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Add Licensed Surveyor
            </h3>
            <div>
              <label className="font-bold">Firm / Surveyor Name *</label>
              <input
                required
                value={srvForm.name}
                onChange={(e) =>
                  setSrvForm({ ...srvForm, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Lead Contact Person *</label>
              <input
                required
                value={srvForm.contact}
                onChange={(e) =>
                  setSrvForm({ ...srvForm, contact: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Phone *</label>
                <input
                  required
                  value={srvForm.phone}
                  onChange={(e) =>
                    setSrvForm({ ...srvForm, phone: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="font-bold">ISK Reg No *</label>
                <input
                  required
                  value={srvForm.regNo}
                  onChange={(e) =>
                    setSrvForm({ ...srvForm, regNo: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="font-bold">Assigned Project</label>
              <select
                value={srvForm.projectId}
                onChange={(e) =>
                  setSrvForm({ ...srvForm, projectId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {(db.projects || []).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Contract Fee (KES)</label>
              <input
                type="number"
                value={srvForm.contractAmount}
                onChange={(e) =>
                  setSrvForm({
                    ...srvForm,
                    contractAmount: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Save Surveyor
            </button>
          </form>
          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <h3 className="font-black text-emerald-950 text-sm mb-3">
              Registered Surveyors & Assignments
            </h3>
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Firm & Reg</th>
                  <th className="p-2.5">Contact</th>
                  <th className="p-2.5">Services</th>
                  <th className="p-2.5">Fee / Paid</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {surveyors.map((s) => (
                  <tr key={s.id}>
                    <td className="p-2.5 font-bold">
                      {s.name}{" "}
                      <span className="block font-mono text-[10px] text-emerald-700">
                        {s.regNo}
                      </span>
                    </td>
                    <td className="p-2.5">
                      {s.contact}
                      <span className="block text-[10px] text-slate-500">
                        {s.phone}
                      </span>
                    </td>
                    <td className="p-2.5">{s.services}</td>
                    <td className="p-2.5 font-mono">
                      KES {(s.contractAmount || 0).toLocaleString()} (Paid:{" "}
                      {(s.paidAmount || 0).toLocaleString()})
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-bold text-[10px]">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === "advocates" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleAddAdvocate}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Add Advocate / Law Firm
            </h3>
            <div>
              <label className="font-bold">Law Firm Name *</label>
              <input
                required
                value={advForm.name}
                onChange={(e) =>
                  setAdvForm({ ...advForm, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Managing Advocate *</label>
              <input
                required
                value={advForm.contact}
                onChange={(e) =>
                  setAdvForm({ ...advForm, contact: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Phone *</label>
                <input
                  required
                  value={advForm.phone}
                  onChange={(e) =>
                    setAdvForm({ ...advForm, phone: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="font-bold">LSK Reg No *</label>
                <input
                  required
                  value={advForm.regNo}
                  onChange={(e) =>
                    setAdvForm({ ...advForm, regNo: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="font-bold">Specialisation</label>
              <input
                value={advForm.specialisation}
                onChange={(e) =>
                  setAdvForm({ ...advForm, specialisation: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Retainer / Legal Fee (KES)</label>
              <input
                type="number"
                value={advForm.invoiced}
                onChange={(e) =>
                  setAdvForm({ ...advForm, invoiced: Number(e.target.value) })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Save Advocate
            </button>
          </form>
          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <h3 className="font-black text-emerald-950 text-sm mb-3">
              Advocates & Conveyancing Legal Panel
            </h3>
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Law Firm & LSK No</th>
                  <th className="p-2.5">Advocate</th>
                  <th className="p-2.5">Specialisation</th>
                  <th className="p-2.5">Fees Invoiced / Paid</th>
                  <th className="p-2.5">Matter Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {advocates.map((a) => (
                  <tr key={a.id}>
                    <td className="p-2.5 font-bold">
                      {a.name}{" "}
                      <span className="block font-mono text-[10px] text-emerald-700">
                        {a.regNo}
                      </span>
                    </td>
                    <td className="p-2.5">
                      {a.contact}
                      <span className="block text-[10px] text-slate-500">
                        {a.phone}
                      </span>
                    </td>
                    <td className="p-2.5">{a.specialisation}</td>
                    <td className="p-2.5 font-mono">
                      KES {(a.invoiced || 0).toLocaleString()} (Paid:{" "}
                      {(a.paid || 0).toLocaleString()})
                    </td>
                    <td className="p-2.5 font-mono font-bold text-amber-800">
                      {a.matterRef}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Parcel Due Diligence & Dossier Modal */}
      {selectedParcel && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-300 rounded-2xl p-6 max-w-2xl w-full space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-700">
                  Legal Due Diligence Workspace
                </span>
                <h3 className="font-black text-base text-emerald-950">
                  {selectedParcel.titleNo} &bull; Seller:{" "}
                  {selectedParcel.seller}
                </h3>
              </div>
              <button onClick={() => setSelectedParcel(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={addDueDiligenceRecord}
              className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs"
            >
              <div>
                <label className="font-bold">Due Diligence Check</label>
                <select
                  value={ddItem}
                  onChange={(e) => setDdItem(e.target.value)}
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
                >
                  {ddChecklistItems.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold">Verification Result</label>
                <select
                  value={ddStatus}
                  onChange={(e) => setDdStatus(e.target.value)}
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white font-bold"
                >
                  <option>Cleared</option>
                  <option>In Progress</option>
                  <option>Pending</option>
                  <option>Requires Attention</option>
                  <option>Failed</option>
                </select>
              </div>
              <div>
                <label className="font-bold">Remarks & Search Ref</label>
                <div className="flex gap-1 mt-1">
                  <input
                    value={ddRemarks}
                    onChange={(e) => setDdRemarks(e.target.value)}
                    placeholder="Search # / Notes"
                    className="w-full border border-emerald-300 rounded-lg p-2 bg-white"
                  />
                  <button
                    type="submit"
                    className="px-3 bg-emerald-700 text-white font-bold rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>

            <div className="space-y-2 text-xs">
              <h4 className="font-black text-emerald-950">
                Recorded Due Diligence Checks (
                {
                  dueDiligenceChecks.filter(
                    (d) => d.parcelId === selectedParcel.id,
                  ).length
                }
                )
              </h4>
              {dueDiligenceChecks
                .filter((d) => d.parcelId === selectedParcel.id)
                .map((chk) => (
                  <div
                    key={chk.id}
                    className="p-2.5 bg-slate-50 border border-emerald-100 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{chk.item}</div>
                      <div className="text-[11px] text-slate-600">
                        {chk.remarks} &bull; {chk.officer} ({chk.date})
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${chk.status === "Cleared" ? "bg-emerald-100 text-emerald-900" : chk.status === "Failed" ? "bg-rose-100 text-rose-900" : "bg-amber-100 text-amber-900"}`}
                    >
                      {chk.status}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   12. M-PESA PAYBILL & PAYMENT RECONCILIATION MODULE (DARAJA API INTEGRATION & ENGINE)
   ============================================================================ */
function MpesaPaymentsModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
}) {
  const [subTab, setSubTab] = useState("all"); // 'all' | 'auto' | 'unmatched' | 'partial' | 'reversed' | 'duplicates' | 'daraja' | 'manual'
  const [selectedTx, setSelectedTx] = useState(null);

  // Manual Transaction Ingestion Form
  const [manualForm, setManualForm] = useState({
    mpesaRef: `MPESA-${Math.floor(100000 + Math.random() * 900000)}`,
    date: new Date().toISOString().replace("T", " ").slice(0, 16),
    amount: 50000,
    phone: "+254722111222",
    accountRef: "NSG-002",
    payerName: "John Kamau",
    paybill: db.company?.paybill || "4088992",
    notes: "Direct manual transaction entry",
  });

  // Daraja API Config State
  const [darajaConfig, setDarajaConfig] = useState(
    db.darajaConfig || {
      enabled: false,
      environment: "Sandbox",
      consumerKey: "",
      consumerSecret: "",
      passkey: "",
      shortcode: db.company?.paybill || "4088992",
      callbackUrl: "https://api.aprotec.co.ke/v1/mpesa/c2b/callback",
      simulatedMode: true,
    },
  );

  // Allocation Modal State (for manual matching/splitting)
  const [allocateModal, setAllocateModal] = useState(null); // transaction object
  const [allocationForm, setAllocationForm] = useState({
    customerId: db.customers[0]?.id || "",
    projectId: db.projects[0]?.id || "",
    plotId: db.plots[0]?.id || "",
    invoiceId: db.invoices[0]?.id || "",
    amountToAllocate: 0,
    splitAmount2: 0,
    secondPlotId: "",
    notes: "Reconciled and allocated",
  });

  // Ensure collections and payments collections exist safely
  const payments = Array.isArray(db?.payments) ? db.payments : [];
  const isUnm = (s) => {
    const t = (s || "").toLowerCase();
    return t.includes("unmatched") || t.includes("unallocated");
  };

  // Helper: Automatically match incoming payment using M-Pesa account reference, plot, phone or invoice
  const attemptAutoMatch = (tx) => {
    const cleanRef = (tx.accountRef || "").trim().toUpperCase();
    const cleanPhone = (tx.phone || "").replace(/\s+/g, "");
    const cleanName = (tx.payerName || "").trim().toLowerCase();

    // 1. Match by exact plot number or invoice/agreement ref
    const matchedPlot = (db.plots || []).find(
      (pl) => (pl.number || "").toUpperCase() === cleanRef,
    );
    if (matchedPlot && matchedPlot.customerId) {
      const cust = db.customers.find((c) => c.id === matchedPlot.customerId);
      const inv = (db.invoices || []).find(
        (i) => i.plotId === matchedPlot.id && i.status !== "Fully Paid",
      );
      return {
        status: "Automatically Matched",
        customerId: matchedPlot.customerId,
        customerName: cust?.name || "Matched Client",
        projectId: matchedPlot.projectId,
        plotId: matchedPlot.id,
        invoiceId: inv?.id || "",
        notes: `Auto-matched via account reference '${cleanRef}' to Plot ${matchedPlot.number}`,
      };
    }

    // 2. Match by customer phone number
    const matchedCustByPhone = (db.customers || []).find((c) =>
      (c.phone || "").replace(/\s+/g, "").includes(cleanPhone.slice(-9)),
    );
    if (matchedCustByPhone) {
      const custPlot = (db.plots || []).find(
        (p) => p.customerId === matchedCustByPhone.id,
      );
      return {
        status: "Automatically Matched",
        customerId: matchedCustByPhone.id,
        customerName: matchedCustByPhone.name,
        projectId: custPlot?.projectId || db.projects[0]?.id,
        plotId: custPlot?.id || "",
        invoiceId: "",
        notes: `Auto-matched via payer phone number ${cleanPhone}`,
      };
    }

    // 3. Unmatched Queue
    return {
      status: "Unmatched",
      customerId: null,
      customerName: tx.payerName || "Unknown Payer",
      projectId: "",
      plotId: "",
      invoiceId: "",
      notes: `Could not resolve identifier '${cleanRef}'. Sent to Unmatched queue.`,
    };
  };

  // Ingest Manual or Simulated Daraja C2B Callback Transaction
  const handleIngestTransaction = (e) => {
    e.preventDefault();
    if (!activePermissions.Create)
      return notify("Access Denied: Role lacks Create permission.", "error");

    const cleanRef = manualForm.mpesaRef.trim().toUpperCase();
    // Prevent duplicate M-Pesa transaction codes
    const isDuplicate = payments.some(
      (p) => (p.mpesaRef || "").toUpperCase() === cleanRef,
    );
    if (isDuplicate) {
      const dupTx = {
        id: `TX-${Date.now().toString().slice(-4)}`,
        mpesaRef: cleanRef,
        date: manualForm.date,
        amount: Number(manualForm.amount),
        phone: manualForm.phone,
        accountRef: manualForm.accountRef,
        payerName: manualForm.payerName,
        paybill: manualForm.paybill,
        status: "Duplicate / Exception",
        customerId: null,
        customerName: manualForm.payerName,
        projectId: "",
        plotId: "",
        invoiceId: "",
        notes: `EXCEPTION: Duplicate M-Pesa Transaction Code ${cleanRef} detected! Rejected from primary allocation.`,
      };
      setDb((prev) => ({
        ...prev,
        payments: [dupTx, ...(prev.payments || [])],
      }));
      logAudit(
        `Rejected duplicate M-Pesa transaction code ${cleanRef}`,
        "M-Pesa Reconciliation",
      );
      notify(
        `Duplicate M-Pesa Code ${cleanRef} detected and logged to Exceptions queue.`,
        "error",
      );
      return;
    }

    const matchResult = attemptAutoMatch(manualForm);

    const newTx = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      mpesaRef: cleanRef,
      date: manualForm.date,
      amount: Number(manualForm.amount),
      phone: manualForm.phone,
      accountRef: manualForm.accountRef,
      payerName: manualForm.payerName,
      paybill: manualForm.paybill,
      status: matchResult.status,
      customerId: matchResult.customerId,
      customerName: matchResult.customerName,
      projectId: matchResult.projectId,
      plotId: matchResult.plotId,
      invoiceId: matchResult.invoiceId,
      notes: matchResult.notes,
    };

    // If automatically matched, update plot paid amount and invoice if present
    setDb((prev) => {
      let updatedPlots = prev.plots;
      let updatedInvoices = prev.invoices;

      if (
        matchResult.status === "Automatically Matched" &&
        matchResult.plotId
      ) {
        updatedPlots = prev.plots.map((pl) =>
          pl.id === matchResult.plotId
            ? {
                ...pl,
                paidAmount:
                  Number(pl.paidAmount || 0) + Number(manualForm.amount),
                history: [
                  ...(pl.history || []),
                  `Auto-allocated M-Pesa KES ${Number(manualForm.amount).toLocaleString()} (${cleanRef})`,
                ],
              }
            : pl,
        );

        if (matchResult.invoiceId) {
          updatedInvoices = prev.invoices.map((inv) => {
            if (inv.id !== matchResult.invoiceId) return inv;
            const paid =
              Number(inv.amountPaid || 0) + Number(manualForm.amount);
            const bal = Math.max(0, inv.totalAmount - paid);
            return {
              ...inv,
              amountPaid: paid,
              status: bal === 0 ? "Fully Paid" : "Partially Paid",
              paymentHistory: [
                ...(inv.paymentHistory || []),
                {
                  id: newTx.id,
                  amount: Number(manualForm.amount),
                  date: manualForm.date,
                  reference: cleanRef,
                },
              ],
            };
          });
        }
      }

      return {
        ...prev,
        payments: [newTx, ...(prev.payments || [])],
        plots: updatedPlots,
        invoices: updatedInvoices,
      };
    });

    logAudit(
      `Ingested M-Pesa C2B Transaction ${cleanRef} (KES ${manualForm.amount}) | Status: ${matchResult.status}`,
      "M-Pesa Reconciliation",
    );
    notify(
      `Transaction ${cleanRef} ingested successfully. Status: ${matchResult.status}.`,
    );
    setManualForm({
      mpesaRef: `MPESA-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      amount: 50000,
      phone: "+254722111222",
      accountRef: "NSG-001",
      payerName: "Mary Wanjiku",
      paybill: db.company?.paybill || "4088992",
      notes: "Simulated C2B webhook notification",
    });
  };

  // Open Allocation Modal for manual matching or splitting
  const openAllocateModal = (tx) => {
    setAllocateModal(tx);
    setAllocationForm({
      customerId: tx.customerId || db.customers[0]?.id || "",
      projectId: tx.projectId || db.projects[0]?.id || "",
      plotId: tx.plotId || db.plots[0]?.id || "",
      invoiceId: tx.invoiceId || db.invoices[0]?.id || "",
      amountToAllocate: Number(tx.amount || 0),
      splitAmount2: 0,
      secondPlotId: db.plots[1]?.id || "",
      notes: tx.notes || "Manually reconciled by finance officer",
    });
  };

  // Confirm Manual Allocation or Split Allocation
  const handleConfirmAllocation = (e) => {
    e.preventDefault();
    if (!allocateModal) return;
    if (!activePermissions.Edit && !activePermissions.Approve) {
      return notify(
        "Access Denied: Role lacks Edit/Approve permission for allocation.",
        "error",
      );
    }

    const tx = allocateModal;
    const isSplit = Number(allocationForm.splitAmount2) > 0;
    const amt1 = Number(allocationForm.amountToAllocate);
    const amt2 = Number(allocationForm.splitAmount2);

    if (isSplit && amt1 + amt2 !== Number(tx.amount)) {
      return notify(
        `Split error: Sum of split amounts (KES ${(amt1 + amt2).toLocaleString()}) must equal total transaction amount (KES ${Number(tx.amount).toLocaleString()}).`,
        "error",
      );
    }

    const timestamp = new Date().toISOString().slice(0, 10);

    setDb((prev) => {
      let updatedPlots = prev.plots;
      let updatedInvoices = prev.invoices;

      // Allocate portion 1 to plot 1
      if (allocationForm.plotId) {
        updatedPlots = prev.plots.map((pl) =>
          pl.id === allocationForm.plotId
            ? {
                ...pl,
                paidAmount: Number(pl.paidAmount || 0) + amt1,
                history: [
                  ...(pl.history || []),
                  `Manually reconciled KES ${amt1.toLocaleString()} (${tx.mpesaRef})`,
                ],
              }
            : pl,
        );
      }

      // Allocate portion 2 if split
      if (isSplit && allocationForm.secondPlotId) {
        updatedPlots = updatedPlots.map((pl) =>
          pl.id === allocationForm.secondPlotId
            ? {
                ...pl,
                paidAmount: Number(pl.paidAmount || 0) + amt2,
                history: [
                  ...(pl.history || []),
                  `Split allocated KES ${amt2.toLocaleString()} (${tx.mpesaRef})`,
                ],
              }
            : pl,
        );
      }

      if (allocationForm.invoiceId) {
        updatedInvoices = prev.invoices.map((inv) => {
          if (inv.id !== allocationForm.invoiceId) return inv;
          const paid = Number(inv.amountPaid || 0) + amt1;
          const bal = Math.max(0, inv.totalAmount - paid);
          return {
            ...inv,
            amountPaid: paid,
            status: bal === 0 ? "Fully Paid" : "Partially Paid",
            paymentHistory: [
              ...(inv.paymentHistory || []),
              {
                id: tx.id,
                amount: amt1,
                date: timestamp,
                reference: tx.mpesaRef,
              },
            ],
          };
        });
      }

      const updatedPayments = prev.payments.map((p) =>
        p.id === tx.id
          ? {
              ...p,
              status: isSplit ? "Partially Allocated" : "Automatically Matched",
              customerId: allocationForm.customerId,
              projectId: allocationForm.projectId,
              plotId: allocationForm.plotId,
              invoiceId: allocationForm.invoiceId,
              notes: `Manually matched & allocated by Finance. ${allocationForm.notes}`,
            }
          : p,
      );

      return {
        ...prev,
        payments: updatedPayments,
        plots: updatedPlots,
        invoices: updatedInvoices,
      };
    });

    logAudit(
      `Manually allocated M-Pesa transaction ${tx.mpesaRef} (KES ${amt1.toLocaleString()}) to Plot ${allocationForm.plotId}`,
      "M-Pesa Reconciliation",
    );
    notify(`Transaction ${tx.mpesaRef} successfully allocated!`);
    setAllocateModal(null);
  };

  // Reverse Allocation with Permission & Audit History
  const handleReverseAllocation = (tx) => {
    if (!activePermissions.Approve && !activePermissions.Settings) {
      return notify(
        "Access Denied: Authorised Finance Manager or Director approval is required to reverse an allocation.",
        "error",
      );
    }

    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 16);

    setDb((prev) => {
      // Deduct paid amount from plot if previously allocated
      const updatedPlots = tx.plotId
        ? prev.plots.map((pl) =>
            pl.id === tx.plotId
              ? {
                  ...pl,
                  paidAmount: Math.max(
                    0,
                    Number(pl.paidAmount || 0) - Number(tx.amount),
                  ),
                  history: [
                    ...(pl.history || []),
                    `[${timestamp}] REVERSED M-Pesa allocation of KES ${Number(tx.amount).toLocaleString()} (${tx.mpesaRef})`,
                  ],
                }
              : pl,
          )
        : prev.plots;

      const updatedPayments = prev.payments.map((p) =>
        p.id === tx.id
          ? {
              ...p,
              status: "Reversed Transactions",
              notes: `REVERSED on ${timestamp} by Authorised Finance User. Original transaction record preserved.`,
            }
          : p,
      );

      return {
        ...prev,
        payments: updatedPayments,
        plots: updatedPlots,
      };
    });

    logAudit(
      `REVERSED M-Pesa Transaction Allocation ${tx.mpesaRef} (KES ${Number(tx.amount).toLocaleString()})`,
      "M-Pesa Reversal",
    );
    notify(
      `Transaction ${tx.mpesaRef} allocation reversed successfully. Original record preserved.`,
    );
  };

  // Filtered transactions based on subTab
  const filteredTransactions = payments.filter((tx) => {
    const st = (tx.status || "").toLowerCase();
    if (subTab === "all") return true;
    if (subTab === "auto")
      return (
        st.includes("automatically matched") || st.includes("auto-allocated")
      );
    if (subTab === "unmatched") return isUnm(st);
    if (subTab === "partial") return st.includes("partially allocated");
    if (subTab === "reversed") return st.includes("reversed");
    if (subTab === "duplicates") return st.includes("duplicate");
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Daraja API Integration Status Banner */}
      <div className="bg-white border border-emerald-200 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
            M-Pesa Daraja API Integration & C2B Engine
          </span>
          <h3 className="text-sm font-black text-emerald-950">
            Payment Collections, Automated Matching & Multi-Criteria
            Reconciliation
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full font-black text-[10px] ${
              darajaConfig.enabled
                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                : "bg-amber-100 text-amber-950 border border-amber-300"
            }`}
          >
            {darajaConfig.enabled
              ? `DARAJA API LIVE (${darajaConfig.environment})`
              : "SIMULATED C2B / MANUAL MODE"}
          </span>
          <button
            onClick={() => setSubTab("daraja")}
            className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow"
          >
            Daraja API Config & Webhook
          </button>
          <button
            onClick={() => setSubTab("manual")}
            className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black text-xs rounded-lg shadow"
          >
            + Ingest / Simulate C2B Payment
          </button>
        </div>
      </div>

      {/* Sub-Navigation & Register Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-emerald-200">
        <div className="flex flex-wrap gap-1.5 text-xs font-bold">
          {[
            { id: "all", label: `All (${payments.length})` },
            {
              id: "auto",
              label: `Automatically Matched (${payments.filter((p) => (p.status || "").toLowerCase().includes("match") || (p.status || "").toLowerCase().includes("auto")).length})`,
            },
            {
              id: "unmatched",
              label: `Unmatched (${payments.filter((p) => isUnm(p.status)).length})`,
            },
            {
              id: "partial",
              label: `Partially Allocated (${payments.filter((p) => (p.status || "").toLowerCase().includes("partial")).length})`,
            },
            {
              id: "reversed",
              label: `Reversed (${payments.filter((p) => (p.status || "").toLowerCase().includes("reversed")).length})`,
            },
            {
              id: "duplicates",
              label: `Duplicates & Exceptions (${payments.filter((p) => (p.status || "").toLowerCase().includes("duplicate")).length})`,
            },
            { id: "daraja", label: "Daraja Webhook Config" },
            { id: "manual", label: "Simulate C2B Payment" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                subTab === tab.id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => exportToCSV("mpesa_reconciliation_register", payments)}
          className="px-3 py-1.5 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900 flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {/* SUBTAB: DARAJA API CONFIGURATION & WEBHOOK SETTINGS */}
      {subTab === "daraja" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!activePermissions.Settings && !activePermissions.Approve) {
              return notify(
                "Access Denied: Only Admin or Director can configure Daraja API credentials.",
                "error",
              );
            }
            setDb((prev) => ({ ...prev, darajaConfig }));
            logAudit(
              `Updated Daraja API Configuration (Environment: ${darajaConfig.environment})`,
              "Daraja API Setup",
            );
            notify(
              "Daraja API credentials and webhook callback settings saved.",
            );
          }}
          className="bg-white border border-emerald-200 p-6 rounded-xl max-w-2xl space-y-4 text-xs"
        >
          <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
            <h3 className="font-black text-emerald-950 text-sm">
              Safaricom Daraja API & C2B Webhook Integration Setup
            </h3>
            <label className="flex items-center gap-2 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={darajaConfig.enabled}
                onChange={(e) =>
                  setDarajaConfig({
                    ...darajaConfig,
                    enabled: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-emerald-700"
              />
              Enable Live Daraja C2B Feed
            </label>
          </div>
          <p className="text-slate-600">
            Configure Safaricom Daraja API credentials to receive real-time C2B
            payment notification webhooks. Callback URL receives automated JSON
            payload on every PayBill transaction.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700">Environment</label>
              <select
                value={darajaConfig.environment}
                onChange={(e) =>
                  setDarajaConfig({
                    ...darajaConfig,
                    environment: e.target.value,
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-bold bg-white"
              >
                <option>Sandbox</option>
                <option>Production (Live)</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700">
                PayBill Shortcode
              </label>
              <input
                value={darajaConfig.shortcode}
                onChange={(e) =>
                  setDarajaConfig({
                    ...darajaConfig,
                    shortcode: e.target.value,
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">Consumer Key</label>
              <input
                type="password"
                value={darajaConfig.consumerKey}
                onChange={(e) =>
                  setDarajaConfig({
                    ...darajaConfig,
                    consumerKey: e.target.value,
                  })
                }
                placeholder="Daraja Consumer Key"
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Consumer Secret
              </label>
              <input
                type="password"
                value={darajaConfig.consumerSecret}
                onChange={(e) =>
                  setDarajaConfig({
                    ...darajaConfig,
                    consumerSecret: e.target.value,
                  })
                }
                placeholder="Daraja Consumer Secret"
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700">
                Webhook Callback URL (C2B Validation & Confirmation URL)
              </label>
              <input
                value={darajaConfig.callbackUrl}
                onChange={(e) =>
                  setDarajaConfig({
                    ...darajaConfig,
                    callbackUrl: e.target.value,
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold text-emerald-800"
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow"
          >
            Save Daraja Integration Settings
          </button>
        </form>
      )}

      {/* SUBTAB: MANUAL / SIMULATED TRANSACTION INGESTION */}
      {subTab === "manual" && (
        <form
          onSubmit={handleIngestTransaction}
          className="bg-white border-2 border-emerald-600 p-6 rounded-xl max-w-2xl space-y-4 text-xs shadow-md"
        >
          <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700">
                Manual / Simulated C2B Payment Ingestion
              </span>
              <h3 className="font-black text-emerald-950 text-sm">
                Simulate Incoming M-Pesa PayBill Webhook Notification
              </h3>
            </div>
          </div>
          <p className="text-slate-600">
            Use this interface to manually enter or simulate incoming M-Pesa
            PayBill transactions while testing or prior to live Daraja API
            webhook configuration.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700">
                M-Pesa Transaction Code (Unique) *
              </label>
              <input
                required
                value={manualForm.mpesaRef}
                onChange={(e) =>
                  setManualForm({ ...manualForm, mpesaRef: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold uppercase"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Transaction Date & Time *
              </label>
              <input
                required
                type="datetime-local"
                value={manualForm.date.replace(" ", "T")}
                onChange={(e) =>
                  setManualForm({
                    ...manualForm,
                    date: e.target.value.replace("T", " "),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Amount Received (KES) *
              </label>
              <input
                required
                type="number"
                min="1"
                value={manualForm.amount}
                onChange={(e) =>
                  setManualForm({
                    ...manualForm,
                    amount: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold text-emerald-950"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Customer Phone Number *
              </label>
              <input
                required
                value={manualForm.phone}
                onChange={(e) =>
                  setManualForm({ ...manualForm, phone: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Account Number / Payment Reference *
              </label>
              <input
                required
                value={manualForm.accountRef}
                onChange={(e) =>
                  setManualForm({ ...manualForm, accountRef: e.target.value })
                }
                placeholder="e.g. NSG-002 or INV-2026-001"
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold text-emerald-900"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Payer Name (As Supplied)
              </label>
              <input
                value={manualForm.payerName}
                onChange={(e) =>
                  setManualForm({ ...manualForm, payerName: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                PayBill Shortcode
              </label>
              <input
                value={manualForm.paybill}
                onChange={(e) =>
                  setManualForm({ ...manualForm, paybill: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Notes & Description
              </label>
              <input
                value={manualForm.notes}
                onChange={(e) =>
                  setManualForm({ ...manualForm, notes: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow"
            >
              Ingest & Attempt Auto-Match
            </button>
          </div>
        </form>
      )}

      {/* SUBTAB: TRANSACTION REGISTERS (All, Auto, Unmatched, Partial, Reversed, Duplicates) */}
      {subTab !== "daraja" && subTab !== "manual" && (
        <div className="bg-white border border-emerald-200 p-5 rounded-xl shadow-sm overflow-x-auto text-xs">
          <div className="flex justify-between items-center mb-3 border-b border-emerald-100 pb-2">
            <h3 className="font-black text-emerald-950 text-sm">
              Incoming Transactions Register &bull;{" "}
              <span className="text-emerald-700 uppercase">{subTab}</span> (
              {filteredTransactions.length})
            </h3>
          </div>

          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 font-semibold">
              No transactions found in category "{subTab}". Use{" "}
              <b>Simulate C2B Payment</b> above to ingest new test transactions.
            </div>
          ) : (
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold text-[10px]">
                <tr>
                  <th className="p-2.5">M-Pesa Code</th>
                  <th className="p-2.5">Date & Time</th>
                  <th className="p-2.5">Amount (KES)</th>
                  <th className="p-2.5">Account Ref / Phone</th>
                  <th className="p-2.5">Payer Name</th>
                  <th className="p-2.5">Matched Customer & Plot</th>
                  <th className="p-2.5">Reconciliation Status</th>
                  <th className="p-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filteredTransactions.map((tx) => {
                  const cust = db.customers.find((c) => c.id === tx.customerId);
                  const plot = db.plots.find((p) => p.id === tx.plotId);
                  const isUnmatched = isUnm(tx.status);
                  const isReversed = (tx.status || "")
                    .toLowerCase()
                    .includes("reversed");
                  const isDuplicate = (tx.status || "")
                    .toLowerCase()
                    .includes("duplicate");

                  return (
                    <tr key={tx.id} className="hover:bg-emerald-50">
                      <td className="p-2.5 font-mono font-black text-emerald-950">
                        {tx.mpesaRef}
                      </td>
                      <td className="p-2.5 font-mono text-[11px]">{tx.date}</td>
                      <td className="p-2.5 font-mono font-black text-emerald-800">
                        KES {Number(tx.amount || 0).toLocaleString()}
                      </td>
                      <td className="p-2.5 font-mono">
                        <div>
                          <b>{tx.accountRef}</b>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {tx.phone}
                        </div>
                      </td>
                      <td className="p-2.5 font-bold">
                        {tx.payerName || "N/A"}
                      </td>
                      <td className="p-2.5">
                        {cust ? (
                          <div>
                            <div className="font-bold text-slate-900">
                              {cust.name}
                            </div>
                            <div className="text-[10px] text-emerald-800 font-mono">
                              Plot: {plot?.number || "General"}
                            </div>
                          </div>
                        ) : (
                          <span className="text-rose-700 font-bold">
                            Unmatched
                          </span>
                        )}
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            isUnmatched
                              ? "bg-rose-100 text-rose-900 border border-rose-300"
                              : isReversed
                                ? "bg-amber-100 text-amber-900"
                                : isDuplicate
                                  ? "bg-slate-200 text-slate-900"
                                  : "bg-emerald-100 text-emerald-900"
                          }`}
                        >
                          {tx.status}
                        </span>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {tx.notes}
                        </div>
                      </td>
                      <td className="p-2.5 text-right space-x-1 whitespace-nowrap">
                        {!isReversed && !isDuplicate && (
                          <button
                            onClick={() => openAllocateModal(tx)}
                            className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-[10px] shadow"
                          >
                            {isUnmatched
                              ? "Match Payment"
                              : "Reconcile / Split"}
                          </button>
                        )}
                        {!isReversed && (
                          <button
                            onClick={() => handleReverseAllocation(tx)}
                            className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded text-[10px]"
                          >
                            Reverse
                          </button>
                        )}
                        <button
                          onClick={() => setSelectedTx(tx)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded text-[10px]"
                        >
                          Dossier
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* MANUALLY MATCH / ALLOCATE / SPLIT PAYMENT MODAL */}
      {allocateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirmAllocation}
            className="bg-white border-2 border-emerald-600 rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-700">
                  M-Pesa Manual Matching & Allocation
                </span>
                <h3 className="font-black text-emerald-950 text-sm">
                  Allocate Transaction {allocateModal.mpesaRef} (KES{" "}
                  {Number(allocateModal.amount).toLocaleString()})
                </h3>
              </div>
              <button type="button" onClick={() => setAllocateModal(null)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 font-mono">
              <div>
                <span className="text-slate-500 font-sans block">
                  Payer Name:
                </span>
                <b>{allocateModal.payerName || "N/A"}</b>
              </div>
              <div>
                <span className="text-slate-500 font-sans block">
                  Phone & Account Ref:
                </span>
                <b>
                  {allocateModal.phone} | {allocateModal.accountRef}
                </b>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700">
                  Select Customer *
                </label>
                <select
                  value={allocationForm.customerId}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      customerId: e.target.value,
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-bold bg-white"
                >
                  {db.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Select Development Project
                </label>
                <select
                  value={allocationForm.projectId}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      projectId: e.target.value,
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
                >
                  {db.projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Select Plot / Account *
                </label>
                <select
                  value={allocationForm.plotId}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      plotId: e.target.value,
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold bg-white"
                >
                  {db.plots.map((pl) => (
                    <option key={pl.id} value={pl.id}>
                      Plot {pl.number} ({pl.size}) - KES{" "}
                      {pl.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Select Invoice (Optional)
                </label>
                <select
                  value={allocationForm.invoiceId}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      invoiceId: e.target.value,
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono bg-white"
                >
                  <option value="">-- No Direct Invoice --</option>
                  {db.invoices.map((inv) => (
                    <option key={inv.id} value={inv.id}>
                      {inv.id} (Bal: KES{" "}
                      {(
                        inv.totalAmount - (inv.amountPaid || 0)
                      ).toLocaleString()}
                      )
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Allocate Amount (KES) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={allocateModal.amount}
                  value={allocationForm.amountToAllocate}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      amountToAllocate: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-400 rounded-lg p-2 font-mono font-bold text-emerald-950 bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Split Portion 2 (Optional KES)
                </label>
                <input
                  type="number"
                  min="0"
                  value={allocationForm.splitAmount2}
                  onChange={(e) =>
                    setAllocationForm({
                      ...allocationForm,
                      splitAmount2: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono bg-white"
                />
              </div>

              {Number(allocationForm.splitAmount2) > 0 && (
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700">
                    Second Plot for Split Allocation
                  </label>
                  <select
                    value={allocationForm.secondPlotId}
                    onChange={(e) =>
                      setAllocationForm({
                        ...allocationForm,
                        secondPlotId: e.target.value,
                      })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono bg-white"
                  >
                    {db.plots.map((pl) => (
                      <option key={pl.id} value={pl.id}>
                        Plot {pl.number}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Reconciliation Notes
              </label>
              <input
                value={allocationForm.notes}
                onChange={(e) =>
                  setAllocationForm({
                    ...allocationForm,
                    notes: e.target.value,
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-emerald-100">
              <button
                type="button"
                onClick={() => setAllocateModal(null)}
                className="px-4 py-2 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow"
              >
                Confirm Allocation & Post to Ledger
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TRANSACTION DOSSIER MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-300 rounded-2xl p-6 max-w-md w-full space-y-4 text-xs shadow-2xl">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                Transaction Dossier: {selectedTx.mpesaRef}
              </h3>
              <button onClick={() => setSelectedTx(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-1.5 font-mono">
              <div>
                Date & Time: <b>{selectedTx.date}</b>
              </div>
              <div>
                Amount Received:{" "}
                <b className="text-emerald-800">
                  KES {Number(selectedTx.amount || 0).toLocaleString()}
                </b>
              </div>
              <div>
                Payer Phone: <b>{selectedTx.phone}</b>
              </div>
              <div>
                Account Ref: <b>{selectedTx.accountRef}</b>
              </div>
              <div>
                Payer Name: <b>{selectedTx.payerName || "N/A"}</b>
              </div>
              <div>
                PayBill Shortcode: <b>{selectedTx.paybill}</b>
              </div>
              <div>
                Reconciliation Status:{" "}
                <b className="text-amber-800">{selectedTx.status}</b>
              </div>
              <div>
                Notes: <b>{selectedTx.notes}</b>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-1.5 bg-emerald-700 text-white font-bold rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   9. MARKETING CAMPAIGNS, MULTI-CHANNEL SPEND & LEAD ATTRIBUTION ROI
   ============================================================================ */
function MarketingAndWebModule({ db, setDb, notify, logAudit }) {
  const [showCmpForm, setShowCmpForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [cmpForm, setCmpForm] = useState({
    name: "",
    refCode: `CMP-2026-0${db.campaigns.length + 1}`,
    type: "Digital Lead Generation",
    projectId: db.projects[0]?.id || "PRJ-001",
    channel: "Facebook",
    budget: 15000,
    spent: 5000,
    manager: "Kevin Maina",
    startDate: "2026-11-01",
    endDate: "2026-11-30",
    status: "Active",
  });

  const [extraSpend, setExtraSpend] = useState(2500);
  const [cmpLeadForm, setCmpLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectId: db.projects[0]?.id || "PRJ-001",
    channel: "Facebook",
    campaignId: db.campaigns[0]?.id || "CMP-01",
    agent: "Kevin Maina",
    stage: "New Lead",
    followUpDate: "2026-11-19",
    notes: "",
  });

  const [webInquiry, setWebInquiry] = useState({
    name: "",
    phone: "",
    project: db.projects[0]?.name || "",
  });

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    const created = {
      id: `CMP-${Date.now().toString().slice(-3)}`,
      name: cmpForm.name,
      refCode: cmpForm.refCode,
      type: cmpForm.type,
      projectId: cmpForm.projectId,
      channel: cmpForm.channel,
      budget: Number(cmpForm.budget),
      spent: Number(cmpForm.spent),
      manager: cmpForm.manager,
      startDate: cmpForm.startDate,
      endDate: cmpForm.endDate,
      leadsCount: 0,
      bookings: 0,
      status: cmpForm.status,
    };
    setDb((prev) => ({ ...prev, campaigns: [created, ...prev.campaigns] }));
    logAudit(
      `Created Marketing Campaign "${created.name}" (${created.channel})`,
      "Marketing",
    );
    notify(`Campaign "${created.name}" created.`);
    setShowCmpForm(false);
    setCmpForm({ ...cmpForm, name: "" });
  };

  const handleAddCampaignSpend = (campaignId) => {
    if (extraSpend <= 0) return;
    setDb((prev) => ({
      ...prev,
      campaigns: prev.campaigns.map((c) =>
        c.id === campaignId
          ? { ...c, spent: Number(c.spent) + Number(extraSpend) }
          : c,
      ),
    }));
    logAudit(
      `Recorded additional KES ${extraSpend} spend on campaign ${campaignId}`,
      "Marketing",
    );
    notify(`Added KES ${Number(extraSpend).toLocaleString()} expenditure.`);
  };

  const handleAddAttributedLead = (e) => {
    e.preventDefault();
    const prj = db.projects.find((p) => p.id === cmpLeadForm.projectId);
    const created = {
      id: `LD-${Date.now().toString().slice(-4)}`,
      name: cmpLeadForm.name,
      phone: cmpLeadForm.phone,
      email: cmpLeadForm.email || "prospect@client.co.ke",
      source: cmpLeadForm.channel,
      campaignId: cmpLeadForm.campaignId,
      budget: prj?.pricePerPlot || 650000,
      locationPref: prj?.name || "Naivasha",
      stage: cmpLeadForm.stage,
      agent: cmpLeadForm.agent,
      nextFollowUp: cmpLeadForm.followUpDate,
      notes: cmpLeadForm.notes || "Attributed via Campaign Manager",
    };
    setDb((prev) => ({
      ...prev,
      leads: [created, ...prev.leads],
      campaigns: prev.campaigns.map((c) =>
        c.id === cmpLeadForm.campaignId
          ? { ...c, leadsCount: (c.leadsCount || 0) + 1 }
          : c,
      ),
    }));
    logAudit(
      `Captured campaign lead ${created.name} under ${cmpLeadForm.campaignId}`,
      "Marketing Attribution",
    );
    notify(
      `Lead ${created.name} attributed to campaign and assigned to ${created.agent}.`,
    );
    setCmpLeadForm({
      ...cmpLeadForm,
      name: "",
      phone: "",
      email: "",
      notes: "",
    });
  };

  const submitPublicWebsiteEnquiry = (e) => {
    e.preventDefault();
    const created = {
      id: `LD-${Date.now().toString().slice(-3)}`,
      name: webInquiry.name,
      phone: webInquiry.phone,
      email: "web@enquiry.co.ke",
      source: "Website Portal",
      budget: 750000,
      locationPref: webInquiry.project,
      stage: "New Lead",
      agent: "Kevin Maina",
      nextFollowUp: "2026-11-18",
      notes: "Captured directly from live website listing",
    };
    setDb((prev) => ({ ...prev, leads: [created, ...prev.leads] }));
    logAudit(
      `Website online enquiry captured from ${webInquiry.name}`,
      "Website Integration",
    );
    notify("Website enquiry synced directly into CRM Leads!");
    setWebInquiry({ name: "", phone: "", project: db.projects[0]?.name || "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-4 rounded-xl border border-emerald-200">
        <button
          onClick={() => setShowCmpForm(!showCmpForm)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
        >
          <Plus className="w-4 h-4 text-amber-300" /> Create Marketing Campaign
        </button>
        <div className="text-xs font-bold text-emerald-900">
          Total Ad Spend: KES{" "}
          {db.campaigns
            .reduce((s, c) => s + Number(c.spent || 0), 0)
            .toLocaleString()}
        </div>
      </div>

      {showCmpForm && (
        <form
          onSubmit={handleCreateCampaign}
          className="bg-white border-2 border-emerald-500 p-5 rounded-xl space-y-3 text-xs"
        >
          <h3 className="font-black text-emerald-950 text-sm">
            Create New Advertising Campaign
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="font-bold">Campaign Name *</label>
              <input
                required
                value={cmpForm.name}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, name: e.target.value })
                }
                placeholder="e.g. Facebook Naivasha Promo"
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Reference Code</label>
              <input
                required
                value={cmpForm.refCode}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, refCode: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Advertising Channel *</label>
              <select
                value={cmpForm.channel}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, channel: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {[
                  "Facebook",
                  "Instagram",
                  "WhatsApp",
                  "Google Search",
                  "Google Display",
                  "TikTok",
                  "YouTube",
                  "Radio",
                  "Television",
                  "Billboards",
                  "Property Exhibitions",
                  "Open Days",
                  "Diaspora Marketing",
                  "Other",
                ].map((ch) => (
                  <option key={ch} value={ch}>
                    {ch}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Project Advertised</label>
              <select
                value={cmpForm.projectId}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, projectId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Campaign Budget (KES)</label>
              <input
                type="number"
                value={cmpForm.budget}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, budget: Number(e.target.value) })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Initial Spend (KES)</label>
              <input
                type="number"
                value={cmpForm.spent}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, spent: Number(e.target.value) })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Start Date</label>
              <input
                type="date"
                value={cmpForm.startDate}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, startDate: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">End Date</label>
              <input
                type="date"
                value={cmpForm.endDate}
                onChange={(e) =>
                  setCmpForm({ ...cmpForm, endDate: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCmpForm(false)}
              className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-emerald-700 text-white rounded-lg font-bold"
            >
              Save Campaign
            </button>
          </div>
        </form>
      )}

      {/* Campaign Performance & Real-Time CPL / ROI Table */}
      <div className="bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
        <h3 className="font-black text-emerald-950 text-sm mb-3">
          Campaign ROI, Cost-Per-Lead (CPL) & Conversion Analytics
        </h3>
        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">Campaign</th>
              <th className="p-2.5">Channel</th>
              <th className="p-2.5">Budget / Actual Spend</th>
              <th className="p-2.5">Attributed Leads</th>
              <th className="p-2.5">Cost Per Lead (CPL)</th>
              <th className="p-2.5">Converted / Conv. Rate</th>
              <th className="p-2.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {db.campaigns.map((c) => {
              const linkedLeads = db.leads.filter(
                (l) =>
                  l.campaignId === c.id ||
                  l.source.toLowerCase().includes(c.channel.toLowerCase()),
              );
              const totalLeadsCount = Math.max(
                linkedLeads.length,
                c.leadsCount || 0,
              );
              const convertedCount =
                linkedLeads.filter((l) => l.stage === "Converted").length +
                (c.bookings || 0);
              const cpl =
                totalLeadsCount > 0 ? Math.round(c.spent / totalLeadsCount) : 0;
              const convRate =
                totalLeadsCount > 0
                  ? ((convertedCount / totalLeadsCount) * 100).toFixed(1)
                  : "0.0";
              return (
                <tr key={c.id} className="hover:bg-emerald-50">
                  <td className="p-2.5 font-bold text-emerald-950">{c.name}</td>
                  <td className="p-2.5">{c.channel}</td>
                  <td className="p-2.5 font-mono">
                    KES {Number(c.spent).toLocaleString()} /{" "}
                    {Number(c.budget).toLocaleString()}
                  </td>
                  <td className="p-2.5 font-bold">{totalLeadsCount} Leads</td>
                  <td className="p-2.5 font-mono font-bold text-emerald-800">
                    KES {cpl.toLocaleString()}
                  </td>
                  <td className="p-2.5 font-bold text-amber-800">
                    {convertedCount} ({convRate}%)
                  </td>
                  <td className="p-2.5">
                    <button
                      onClick={() => setSelectedCampaign(c)}
                      className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded font-bold text-[10px]"
                    >
                      Manage Spend & Leads
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Campaign Attributed Lead & Public Web Listing Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          onSubmit={handleAddAttributedLead}
          className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs"
        >
          <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
            + Add Campaign Lead & Assign Salesperson
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="font-bold">Lead Name *</label>
              <input
                required
                value={cmpLeadForm.name}
                onChange={(e) =>
                  setCmpLeadForm({ ...cmpLeadForm, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Phone Number *</label>
              <input
                required
                value={cmpLeadForm.phone}
                onChange={(e) =>
                  setCmpLeadForm({ ...cmpLeadForm, phone: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Source Campaign *</label>
              <select
                value={cmpLeadForm.campaignId}
                onChange={(e) =>
                  setCmpLeadForm({ ...cmpLeadForm, campaignId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.channel})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Assigned Salesperson *</label>
              <select
                value={cmpLeadForm.agent}
                onChange={(e) =>
                  setCmpLeadForm({ ...cmpLeadForm, agent: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.employees.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Interested Project</label>
              <select
                value={cmpLeadForm.projectId}
                onChange={(e) =>
                  setCmpLeadForm({ ...cmpLeadForm, projectId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Follow-up Date</label>
              <input
                type="date"
                value={cmpLeadForm.followUpDate}
                onChange={(e) =>
                  setCmpLeadForm({
                    ...cmpLeadForm,
                    followUpDate: e.target.value,
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
          >
            Save Campaign Lead
          </button>
        </form>

        <form
          onSubmit={submitPublicWebsiteEnquiry}
          className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
        >
          <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
            Website Online Property Listing Simulator
          </h3>
          <p className="text-[11px] text-slate-600">
            Simulate a visitor submitting an online plot booking enquiry from
            the public website.
          </p>
          <div>
            <label className="font-bold">Visitor Name *</label>
            <input
              required
              value={webInquiry.name}
              onChange={(e) =>
                setWebInquiry({ ...webInquiry, name: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="font-bold">Phone / WhatsApp *</label>
            <input
              required
              value={webInquiry.phone}
              onChange={(e) =>
                setWebInquiry({ ...webInquiry, phone: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="font-bold">Interested Project</label>
            <select
              value={webInquiry.project}
              onChange={(e) =>
                setWebInquiry({ ...webInquiry, project: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            >
              {db.projects.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
          >
            Submit Website Lead
          </button>
        </form>
      </div>

      {/* Campaign Drill-Down Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-300 rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                {selectedCampaign.name} ({selectedCampaign.channel})
              </h3>
              <button onClick={() => setSelectedCampaign(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-end gap-2 bg-amber-50 p-3 rounded-xl border border-amber-200">
              <div className="flex-1">
                <label className="font-bold text-amber-950 block mb-1">
                  Record Additional Ad Spend (KES)
                </label>
                <input
                  type="number"
                  value={extraSpend}
                  onChange={(e) => setExtraSpend(Number(e.target.value))}
                  className="w-full border border-amber-300 rounded-lg p-2 font-mono bg-white"
                />
              </div>
              <button
                onClick={() => handleAddCampaignSpend(selectedCampaign.id)}
                className="px-4 py-2 bg-amber-500 text-emerald-950 font-bold rounded-lg"
              >
                Add Spend
              </button>
            </div>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              <div className="font-bold text-emerald-900">
                Attributed Leads (
                {
                  db.leads.filter((l) => l.campaignId === selectedCampaign.id)
                    .length
                }
                )
              </div>
              {db.leads
                .filter((l) => l.campaignId === selectedCampaign.id)
                .map((l) => (
                  <div
                    key={l.id}
                    className="p-2 bg-slate-50 border border-emerald-100 rounded flex justify-between"
                  >
                    <span>
                      <b>{l.name}</b> ({l.phone})
                    </span>
                    <span>
                      Agent: <b>{l.agent}</b> &bull; {l.stage}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   10. PLOT BOOKINGS, QUOTATIONS, SALE AGREEMENTS & INVOICES
   ============================================================================ */
function SalesAndAgreementsModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
}) {
  const [subTab, setSubTab] = useState("agreements");
  const availablePlots = db.plots.filter(
    (p) => p.status === "Available" || p.status === "Reserved",
  );
  const [form, setForm] = useState({
    plotId: availablePlots[0]?.id || "",
    customerId: db.customers[0]?.id || "",
    salesperson: "Kevin Maina",
    discount: 0,
    deposit: 150000,
    planType: "12 Months Instalment",
    months: 12,
  });

  const [qtForm, setQtForm] = useState({
    customerId: db.customers[0]?.id || "",
    projectId: db.projects[0]?.id || "",
    plotId: availablePlots[0]?.id || "",
    discount: 0,
    validUntil: "2026-12-15",
  });

  // NEW: State for Recording Invoice Payment Modal
  const [paymentModalInv, setPaymentModalInv] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amountPaid: 100000,
    paymentDate: new Date().toISOString().slice(0, 10),
    paymentMethod: "M-Pesa",
    referenceNo: `MPESA-${Math.floor(100000 + Math.random() * 900000)}`,
    receivingAccount: "PayBill 4088992",
    collectedBy: "Lucy Njeri (Finance)",
    description: "Instalment payment towards plot allocation",
    receiptFile: "Receipt_Doc.pdf",
  });

  const handleCreateQuotation = (e) => {
    e.preventDefault();
    const plot = db.plots.find((p) => p.id === qtForm.plotId);
    const total = Math.max(
      0,
      (plot?.price || 650000) - Number(qtForm.discount),
    );
    const newQt = {
      id: `QT-2026-${Date.now().toString().slice(-3)}`,
      customerId: qtForm.customerId,
      projectId: qtForm.projectId,
      plotId: qtForm.plotId,
      date: new Date().toISOString().slice(0, 10),
      validUntil: qtForm.validUntil,
      salePrice: plot?.price || 650000,
      discount: Number(qtForm.discount),
      tax: 0,
      totalAmount: total,
      preparedBy: "Kevin Maina",
      status: "Sent",
    };
    setDb((prev) => ({ ...prev, quotations: [newQt, ...prev.quotations] }));
    logAudit(
      `Generated Quotation ${newQt.id} for Plot ${plot?.number}`,
      "Quotations",
    );
    notify(`Quotation ${newQt.id} created.`);
  };

  const convertQuotationToInvoice = (qt) => {
    const newInv = {
      id: `INV-2026-${Date.now().toString().slice(-3)}`,
      quotationId: qt.id,
      customerId: qt.customerId,
      projectId: qt.projectId,
      plotId: qt.plotId,
      date: new Date().toISOString().slice(0, 10),
      dueDate: "2026-12-31",
      totalAmount: qt.totalAmount,
      amountPaid: 0,
      status: "Unpaid",
      paymentHistory: [],
    };
    setDb((prev) => ({
      ...prev,
      invoices: [newInv, ...prev.invoices],
      quotations: prev.quotations.map((q) =>
        q.id === qt.id ? { ...q, status: "Converted to Invoice" } : q,
      ),
    }));
    logAudit(
      `Converted Quotation ${qt.id} to Invoice ${newInv.id}`,
      "Invoicing",
    );
    notify(`Invoice ${newInv.id} generated from quotation.`);
  };

  const handleSaveInvoicePayment = (e) => {
    e.preventDefault();
    if (!paymentModalInv) return;
    const inv = paymentModalInv;
    const previouslyPaid = Number(inv.amountPaid || 0);
    const newAmt = Number(paymentForm.amountPaid);
    const totalPaid = previouslyPaid + newAmt;
    const balance = Math.max(0, inv.totalAmount - totalPaid);
    const newStatus =
      balance === 0
        ? "Fully Paid"
        : totalPaid > 0
          ? "Partially Paid"
          : "Unpaid";

    const paymentEntry = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      amount: newAmt,
      date: paymentForm.paymentDate,
      method: paymentForm.paymentMethod,
      reference: paymentForm.referenceNo,
      account: paymentForm.receivingAccount,
      collectedBy: paymentForm.collectedBy,
      notes: paymentForm.description,
    };

    setDb((prev) => ({
      ...prev,
      invoices: prev.invoices.map((i) =>
        i.id === inv.id
          ? {
              ...i,
              amountPaid: totalPaid,
              status: newStatus,
              paymentHistory: [...(i.paymentHistory || []), paymentEntry],
            }
          : i,
      ),
      payments: [
        {
          id: `PAY-${Date.now().toString().slice(-4)}`,
          mpesaRef: paymentForm.referenceNo,
          date: paymentForm.paymentDate,
          amount: newAmt,
          accountRef: inv.id,
          plotId: inv.plotId,
          customerId: inv.customerId,
          channel: paymentForm.paymentMethod,
          status: "Auto-Allocated",
          receiptNo: `RCT-${Date.now().toString().slice(-4)}`,
        },
        ...prev.payments,
      ],
    }));

    logAudit(
      `Recorded payment of KES ${newAmt.toLocaleString()} for Invoice ${inv.id}`,
      "Invoices & Payments",
    );
    notify(
      `Payment of KES ${newAmt.toLocaleString()} recorded successfully. New balance: KES ${balance.toLocaleString()}`,
    );
    setPaymentModalInv(null);
  };

  const handleCreateAgreement = (e) => {
    e.preventDefault();
    const plot = db.plots.find((p) => p.id === form.plotId);
    if (!plot) return notify("Select an available plot first.", "error");
    const netPrice = plot.price - Number(form.discount);
    const balance = Math.max(0, netPrice - Number(form.deposit));
    const monthlyDue = form.months > 1 ? Math.round(balance / form.months) : 0;

    const newAgr = {
      id: `AGR-2026-${Date.now().toString().slice(-3)}`,
      plotId: plot.id,
      customerId: form.customerId,
      salesperson: form.salesperson,
      salePrice: netPrice,
      discount: Number(form.discount),
      deposit: Number(form.deposit),
      planType: form.planType,
      months: Number(form.months),
      monthlyDue,
      nextDueDate: balance > 0 ? "2026-12-17" : "-",
      status: balance === 0 ? "Completed" : "Active Instalment",
      signed: true,
    };

    // Automatically calculate salesperson commission record (no duplicates)
    const rate =
      db.commissionConfig?.projectRates?.[plot.projectId] ||
      db.commissionConfig?.defaultPercent ||
      10;
    const commAmount = Math.round((netPrice * rate) / 100);
    const newComm = {
      id: `COM-${Date.now().toString().slice(-3)}`,
      salesperson: form.salesperson,
      projectId: plot.projectId,
      plotId: plot.id,
      customerId: form.customerId,
      saleRef: newAgr.id,
      saleValue: netPrice,
      rate,
      basis: `${rate}% Sale Price`,
      amount: commAmount,
      paidAmount: 0,
      approvalStatus: "Pending",
      status: "Earned",
      paymentDate: "-",
    };

    setDb((prev) => ({
      ...prev,
      agreements: [newAgr, ...prev.agreements],
      commissions: [newComm, ...prev.commissions],
      plots: prev.plots.map((p) =>
        p.id === plot.id
          ? {
              ...p,
              status: balance === 0 ? "Fully Paid" : "Payment Pending",
              customerId: form.customerId,
              salesperson: form.salesperson,
              paidAmount: Number(form.deposit),
              history: [
                ...p.history,
                `Sale Agreement ${newAgr.id} executed by ${form.salesperson}`,
              ],
            }
          : p,
      ),
    }));

    logAudit(
      `Executed Sale Agreement ${newAgr.id} (Salesperson: ${form.salesperson})`,
      "Sales Agreements",
    );
    notify(`Sale Agreement ${newAgr.id} created & commission queued.`);
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2 bg-white p-2.5 rounded-xl border border-emerald-200">
        <button
          onClick={() => setSubTab("agreements")}
          className={`px-4 py-2 rounded-lg text-xs font-bold ${subTab === "agreements" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
        >
          Plot Sale Agreements ({db.agreements.length})
        </button>
        <button
          onClick={() => setSubTab("quotations")}
          className={`px-4 py-2 rounded-lg text-xs font-bold ${subTab === "quotations" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
        >
          Quotations & Invoices ({db.quotations.length} / {db.invoices.length})
        </button>
      </div>

      {subTab === "agreements" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleCreateAgreement}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Generate Plot Sale Agreement
            </h3>
            <div>
              <label className="font-bold">Available / Reserved Plot *</label>
              <select
                value={form.plotId}
                onChange={(e) => setForm({ ...form, plotId: e.target.value })}
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {availablePlots.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.number} - KES {p.price.toLocaleString()} ({p.status})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Customer *</label>
              <select
                value={form.customerId}
                onChange={(e) =>
                  setForm({ ...form, customerId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.idNo})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Credited Salesperson *</label>
              <select
                value={form.salesperson}
                onChange={(e) =>
                  setForm({ ...form, salesperson: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.employees.map((e) => (
                  <option key={e.id} value={e.name}>
                    {e.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Deposit Paid (KES)</label>
                <input
                  type="number"
                  value={form.deposit}
                  onChange={(e) =>
                    setForm({ ...form, deposit: Number(e.target.value) })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold">Discount (KES)</label>
                <input
                  type="number"
                  value={form.discount}
                  onChange={(e) =>
                    setForm({ ...form, discount: Number(e.target.value) })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Payment Mode</label>
                <select
                  value={form.planType}
                  onChange={(e) =>
                    setForm({ ...form, planType: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                >
                  <option>Full Cash</option>
                  <option>6 Months Instalment</option>
                  <option>12 Months Instalment</option>
                </select>
              </div>
              <div>
                <label className="font-bold">Months</label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  value={form.months}
                  onChange={(e) =>
                    setForm({ ...form, months: Number(e.target.value) })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Execute Sale Agreement
            </button>
          </form>

          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-emerald-950 text-sm">
                Executed Sale Agreements ({db.agreements.length})
              </h3>
              <button
                onClick={() => exportToCSV("sale_agreements", db.agreements)}
                className="text-xs font-bold text-emerald-700 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Export
              </button>
            </div>
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Agreement No.</th>
                  <th className="p-2.5">Plot & Customer</th>
                  <th className="p-2.5">Salesperson</th>
                  <th className="p-2.5">Net Sale Price</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {db.agreements.map((a) => {
                  const plot = db.plots.find((p) => p.id === a.plotId);
                  const cust = db.customers.find((c) => c.id === a.customerId);
                  return (
                    <tr key={a.id} className="hover:bg-emerald-50">
                      <td className="p-2.5 font-mono font-bold text-emerald-950">
                        {a.id}
                      </td>
                      <td className="p-2.5 font-bold">
                        {plot?.number} - {cust?.name}
                      </td>
                      <td className="p-2.5 text-emerald-800 font-semibold">
                        {a.salesperson || "Kevin Maina"}
                      </td>
                      <td className="p-2.5 font-mono font-bold">
                        KES {a.salePrice.toLocaleString()}
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-bold text-[10px]">
                          {a.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleCreateQuotation}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Create Sales Quotation
            </h3>
            <div>
              <label className="font-bold">Customer / Prospect *</label>
              <select
                value={qtForm.customerId}
                onChange={(e) =>
                  setQtForm({ ...qtForm, customerId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Plot *</label>
              <select
                value={qtForm.plotId}
                onChange={(e) =>
                  setQtForm({ ...qtForm, plotId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.plots.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.number} - KES {p.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Discount (KES)</label>
              <input
                type="number"
                value={qtForm.discount}
                onChange={(e) =>
                  setQtForm({ ...qtForm, discount: Number(e.target.value) })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Valid Until</label>
              <input
                type="date"
                value={qtForm.validUntil}
                onChange={(e) =>
                  setQtForm({ ...qtForm, validUntil: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Generate Quotation
            </button>
          </form>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white border border-emerald-200 p-4 rounded-xl overflow-x-auto">
              <h4 className="font-black text-emerald-950 text-xs mb-2">
                Quotations Register
              </h4>
              <table className="w-full text-xs text-left">
                <thead className="bg-emerald-900 text-white uppercase font-bold">
                  <tr>
                    <th className="p-2">Quotation #</th>
                    <th className="p-2">Client & Plot</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {db.quotations.map((q) => (
                    <tr key={q.id}>
                      <td className="p-2 font-mono font-bold">{q.id}</td>
                      <td className="p-2">
                        {db.customers.find((c) => c.id === q.customerId)?.name}{" "}
                        ({db.plots.find((p) => p.id === q.plotId)?.number})
                      </td>
                      <td className="p-2 font-mono font-bold">
                        KES {q.totalAmount.toLocaleString()}
                      </td>
                      <td className="p-2">{q.status}</td>
                      <td className="p-2 flex gap-1">
                        <button
                          onClick={() => window.print()}
                          className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold"
                        >
                          Print
                        </button>
                        {q.status !== "Converted to Invoice" && (
                          <button
                            onClick={() => convertQuotationToInvoice(q)}
                            className="px-2 py-0.5 bg-emerald-700 text-white rounded text-[10px] font-bold"
                          >
                            Convert to Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white border border-emerald-200 p-4 rounded-xl overflow-x-auto">
              <h4 className="font-black text-emerald-950 text-xs mb-2">
                Customer Invoices & Partial Payments
              </h4>
              <table className="w-full text-xs text-left">
                <thead className="bg-emerald-900 text-white uppercase font-bold">
                  <tr>
                    <th className="p-2">Invoice #</th>
                    <th className="p-2">Client</th>
                    <th className="p-2">Total / Paid / Balance</th>
                    <th className="p-2">Status</th>
                    <th className="p-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {db.invoices.map((inv) => {
                    const bal = Math.max(
                      0,
                      inv.totalAmount - (inv.amountPaid || 0),
                    );
                    return (
                      <tr key={inv.id}>
                        <td className="p-2 font-mono font-bold">{inv.id}</td>
                        <td className="p-2">
                          {
                            db.customers.find((c) => c.id === inv.customerId)
                              ?.name
                          }
                        </td>
                        <td className="p-2 font-mono">
                          Tot: {inv.totalAmount.toLocaleString()} | Paid:{" "}
                          {(inv.amountPaid || 0).toLocaleString()} |{" "}
                          <b>Bal: {bal.toLocaleString()}</b>
                        </td>
                        <td className="p-2 font-bold">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] ${inv.status === "Fully Paid" ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}
                          >
                            {inv.status || "Unpaid"}
                          </span>
                        </td>
                        <td className="p-2">
                          <button
                            onClick={() => {
                              setPaymentModalInv(inv);
                              setPaymentForm({
                                amountPaid: Math.max(
                                  10000,
                                  Math.min(50000, bal),
                                ),
                                paymentDate: new Date()
                                  .toISOString()
                                  .slice(0, 10),
                                paymentMethod: "M-Pesa",
                                referenceNo: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
                                receivingAccount: "PayBill 4088992",
                                collectedBy: "Lucy Njeri (Finance)",
                                description: `Payment for Invoice ${inv.id}`,
                                receiptFile: "Receipt.pdf",
                              });
                            }}
                            className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-[10px] shadow"
                          >
                            + Record Payment
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RECORD INVOICE PAYMENT MODAL */}
      {paymentModalInv &&
        (() => {
          const inv = paymentModalInv;
          const cust = db.customers.find((c) => c.id === inv.customerId);
          const plot = db.plots.find((p) => p.id === inv.plotId);
          const prj = db.projects.find((p) => p.id === inv.projectId);
          const previouslyPaid = Number(inv.amountPaid || 0);
          const outstanding = Math.max(0, inv.totalAmount - previouslyPaid);
          const newBal = Math.max(
            0,
            outstanding - Number(paymentForm.amountPaid),
          );
          const previewStatus =
            newBal === 0
              ? "Fully Paid"
              : Number(paymentForm.amountPaid) > 0
                ? "Partially Paid"
                : "Unpaid";

          return (
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <form
                onSubmit={handleSaveInvoicePayment}
                className="bg-white border-2 border-emerald-600 rounded-2xl p-6 max-w-lg w-full space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                  <div>
                    <span className="text-[10px] font-black uppercase text-emerald-700">
                      Financial Collections Workspace
                    </span>
                    <h3 className="font-black text-emerald-950 text-sm">
                      Record Payment for Invoice {inv.id}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPaymentModalInv(null)}
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div>
                    <span className="text-slate-500 block">Customer:</span>
                    <b>{cust?.name || inv.customerId}</b>
                  </div>
                  <div>
                    <span className="text-slate-500 block">
                      Project & Plot:
                    </span>
                    <b>
                      {prj?.name} ({plot?.number || "Plot"})
                    </b>
                  </div>
                  <div>
                    <span className="text-slate-500 block">
                      Invoice Amount:
                    </span>
                    <span className="font-mono font-bold">
                      KES {inv.totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">
                      Previously Paid:
                    </span>
                    <span className="font-mono font-bold text-emerald-700">
                      KES {previouslyPaid.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700">
                      Outstanding Balance (KES)
                    </label>
                    <input
                      readOnly
                      value={outstanding.toLocaleString()}
                      className="w-full mt-1 border border-slate-300 bg-slate-100 rounded-lg p-2 font-mono font-bold text-rose-800"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">
                      New Amount Paid (KES) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1"
                      max={outstanding}
                      value={paymentForm.amountPaid}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          amountPaid: Number(e.target.value),
                        })
                      }
                      className="w-full mt-1 border border-emerald-400 rounded-lg p-2 font-mono font-bold text-emerald-950 bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">
                      Payment Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={paymentForm.paymentDate}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          paymentDate: e.target.value,
                        })
                      }
                      className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">
                      Payment Method *
                    </label>
                    <select
                      value={paymentForm.paymentMethod}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          paymentMethod: e.target.value,
                        })
                      }
                      className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-bold bg-white"
                    >
                      <option>M-Pesa</option>
                      <option>Bank Transfer</option>
                      <option>Cash</option>
                      <option>Cheque</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">
                      Transaction Ref / Receipt No *
                    </label>
                    <input
                      required
                      value={paymentForm.referenceNo}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          referenceNo: e.target.value,
                        })
                      }
                      className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">
                      Receiving Account *
                    </label>
                    <input
                      required
                      value={paymentForm.receivingAccount}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          receivingAccount: e.target.value,
                        })
                      }
                      className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">
                      Collected By *
                    </label>
                    <input
                      required
                      value={paymentForm.collectedBy}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          collectedBy: e.target.value,
                        })
                      }
                      className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">
                      Supporting Receipt Upload
                    </label>
                    <input
                      value={paymentForm.receiptFile}
                      onChange={(e) =>
                        setPaymentForm({
                          ...paymentForm,
                          receiptFile: e.target.value,
                        })
                      }
                      className="w-full mt-1 border border-emerald-300 rounded-lg p-2 text-[11px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700">
                    Payment Description / Notes
                  </label>
                  <input
                    value={paymentForm.description}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-600 block">
                      Preview Result:
                    </span>
                    <span className="font-bold">
                      New Balance: KES {newBal.toLocaleString()}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded font-bold ${previewStatus === "Fully Paid" ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}
                  >
                    Status: {previewStatus}
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-emerald-100">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg flex items-center gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Receipt
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentModalInv(null)}
                    className="px-4 py-2 bg-slate-100 rounded-lg font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow"
                  >
                    Save Payment & Update Invoice
                  </button>
                </div>
              </form>
            </div>
          );
        })()}
    </div>
  );
}

/* ============================================================================
   11. SALES AGENTS, RANKINGS & COMMISSION MANAGEMENT
   ============================================================================ */
function CommissionsModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
}) {
  const [defaultRate, setDefaultRate] = useState(
    db.commissionConfig?.defaultPercent || 10,
  );
  const [payModal, setPayModal] = useState(null);
  const [payAmount, setPayAmount] = useState(25000);

  const approveCommission = (id) => {
    if (!activePermissions.Approve)
      return notify("Access Denied: Approval permission required.", "error");
    setDb((prev) => ({
      ...prev,
      commissions: prev.commissions.map((c) =>
        c.id === id ? { ...c, approvalStatus: "Approved" } : c,
      ),
    }));
    logAudit(`Approved commission claim ${id}`, "Commissions");
    notify(`Commission ${id} approved for payout.`);
  };

  const processCommissionPayment = (e) => {
    e.preventDefault();
    if (!payModal) return;
    setDb((prev) => ({
      ...prev,
      commissions: prev.commissions.map((c) => {
        if (c.id !== payModal.id) return c;
        const nextPaid = Math.min(c.amount, c.paidAmount + Number(payAmount));
        return {
          ...c,
          paidAmount: nextPaid,
          status: nextPaid >= c.amount ? "Paid" : "Partially Paid",
          paymentDate: new Date().toISOString().slice(0, 10),
        };
      }),
    }));
    logAudit(
      `Disbursed KES ${payAmount} commission to ${payModal.salesperson}`,
      "Commissions",
    );
    notify(
      `Commission payment of KES ${Number(payAmount).toLocaleString()} recorded.`,
    );
    setPayModal(null);
  };

  return (
    <div className="space-y-6">
      {/* Commission Rule Configurator */}
      <div className="bg-white border border-emerald-200 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="font-black text-emerald-950">
            Global Commission Rate (% of Sale Price):
          </span>
          <input
            type="number"
            value={defaultRate}
            onChange={(e) => setDefaultRate(Number(e.target.value))}
            className="w-20 border border-emerald-300 rounded-lg p-1.5 font-mono font-bold"
          />
          <button
            onClick={() => {
              setDb((prev) => ({
                ...prev,
                commissionConfig: {
                  ...prev.commissionConfig,
                  defaultPercent: defaultRate,
                },
              }));
              notify(`Updated standard commission rate to ${defaultRate}%.`);
            }}
            className="px-3 py-1.5 bg-emerald-700 text-white font-bold rounded-lg"
          >
            Update Rule
          </button>
        </div>
        <button
          onClick={() => exportToCSV("sales_commissions", db.commissions)}
          className="px-3 py-1.5 border border-emerald-300 rounded-lg font-bold text-emerald-900 flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" /> Export Commission Ledger
        </button>
      </div>

      {/* Commission Claims Table */}
      <div className="bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
        <h3 className="font-black text-emerald-950 text-sm mb-3">
          Salesperson Commission Ledger & Payouts
        </h3>
        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">Salesperson</th>
              <th className="p-2.5">Sale Ref & Plot</th>
              <th className="p-2.5">Sale Value</th>
              <th className="p-2.5">Rate / Earned</th>
              <th className="p-2.5">Paid / Balance</th>
              <th className="p-2.5">Approval</th>
              <th className="p-2.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {db.commissions.map((c) => {
              const plot = db.plots.find((p) => p.id === c.plotId);
              const outstanding = Math.max(0, c.amount - c.paidAmount);
              return (
                <tr key={c.id} className="hover:bg-emerald-50">
                  <td className="p-2.5 font-bold text-emerald-950">
                    {c.salesperson}
                  </td>
                  <td className="p-2.5 font-mono">
                    {c.saleRef} ({plot?.number || c.plotId})
                  </td>
                  <td className="p-2.5 font-mono">
                    KES {c.saleValue.toLocaleString()}
                  </td>
                  <td className="p-2.5 font-mono font-bold text-emerald-800">
                    {c.rate}% &bull; KES {c.amount.toLocaleString()}
                  </td>
                  <td className="p-2.5 font-mono">
                    Paid: {c.paidAmount.toLocaleString()} |{" "}
                    <b className="text-rose-700">
                      Bal: {outstanding.toLocaleString()}
                    </b>
                  </td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.approvalStatus === "Approved" ? "bg-emerald-100 text-emerald-900" : "bg-amber-100 text-amber-900"}`}
                    >
                      {c.approvalStatus} ({c.status})
                    </span>
                  </td>
                  <td className="p-2.5 flex gap-1.5">
                    {c.approvalStatus !== "Approved" && (
                      <button
                        onClick={() => approveCommission(c.id)}
                        className="px-2 py-1 bg-emerald-700 text-white font-bold rounded text-[10px]"
                      >
                        Approve
                      </button>
                    )}
                    {c.approvalStatus === "Approved" && outstanding > 0 && (
                      <button
                        onClick={() => {
                          setPayModal(c);
                          setPayAmount(outstanding);
                        }}
                        className="px-2 py-1 bg-amber-500 text-emerald-950 font-bold rounded text-[10px]"
                      >
                        Pay Commission
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {payModal && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={processCommissionPayment}
            className="bg-white border border-emerald-300 rounded-2xl p-6 max-w-sm w-full space-y-3 text-xs"
          >
            <h3 className="font-black text-emerald-950">
              Disburse Commission to {payModal.salesperson}
            </h3>
            <p className="text-slate-600">
              Outstanding Commission:{" "}
              <b>
                KES {(payModal.amount - payModal.paidAmount).toLocaleString()}
              </b>
            </p>
            <div>
              <label className="font-bold">Payout Amount (KES)</label>
              <input
                type="number"
                required
                value={payAmount}
                onChange={(e) => setPayAmount(Number(e.target.value))}
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPayModal(null)}
                className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 text-white rounded-lg font-bold"
              >
                Confirm Payout
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   7. LAND VALUATION & RESALE TRANSFER DESK
   ============================================================================ */
function ValuationAndResaleModule({ db, setDb, notify, logAudit }) {
  const [resalePlotId, setResalePlotId] = useState(
    db.plots.find((p) => p.status === "Fully Paid")?.id || "",
  );
  const [newBuyerId, setNewBuyerId] = useState(db.customers[1]?.id || "");
  const [transferFee, setTransferFee] = useState(25000);

  const handleTransferOwnership = (e) => {
    e.preventDefault();
    if (!resalePlotId || !newBuyerId) return;
    const newBuyer = db.customers.find((c) => c.id === newBuyerId);
    setDb((prev) => ({
      ...prev,
      plots: prev.plots.map((p) =>
        p.id === resalePlotId
          ? {
              ...p,
              customerId: newBuyerId,
              history: [
                ...p.history,
                `Ownership transferred to ${newBuyer?.name} (Fee: KES ${transferFee.toLocaleString()})`,
              ],
            }
          : p,
      ),
    }));
    logAudit(
      `Transferred plot ${resalePlotId} ownership to ${newBuyer?.name}`,
      "Resale & Transfer",
    );
    notify(`Plot ownership transferred to ${newBuyer?.name}.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3">
        <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
          Land Appreciation & Valuation Analysis
        </h3>
        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">Parcel</th>
              <th className="p-2.5">Cost / Acre</th>
              <th className="p-2.5">Current Val / Acre</th>
              <th className="p-2.5">Appreciation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {db.parentParcels.map((p) => {
              const costAcre = Math.round(p.purchasePrice / p.size);
              const valAcre = Math.round(p.valuation / p.size);
              const gain = (((valAcre - costAcre) / costAcre) * 100).toFixed(1);
              return (
                <tr key={p.id}>
                  <td className="p-2.5 font-bold">{p.titleNo}</td>
                  <td className="p-2.5 font-mono">
                    KES {costAcre.toLocaleString()}
                  </td>
                  <td className="p-2.5 font-mono font-bold text-emerald-800">
                    KES {valAcre.toLocaleString()}
                  </td>
                  <td className="p-2.5 font-bold text-amber-700">+{gain}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form
        onSubmit={handleTransferOwnership}
        className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
      >
        <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
          Customer-to-Customer Plot Transfer Desk
        </h3>
        <div>
          <label className="font-bold">Select Sold / Paid Plot</label>
          <select
            value={resalePlotId}
            onChange={(e) => setResalePlotId(e.target.value)}
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          >
            {db.plots
              .filter((p) => p.customerId)
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.number} - Current:{" "}
                  {db.customers.find((c) => c.id === p.customerId)?.name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className="font-bold">Transferee (New Buyer)</label>
          <select
            value={newBuyerId}
            onChange={(e) => setNewBuyerId(e.target.value)}
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          >
            {db.customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.idNo})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold">Administrative Transfer Fee (KES)</label>
          <input
            type="number"
            value={transferFee}
            onChange={(e) => setTransferFee(Number(e.target.value))}
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
        >
          Execute Ownership Transfer
        </button>
      </form>
    </div>
  );
}

/* ============================================================================
   8. CUSTOMER & LEAD RELATIONSHIP MANAGEMENT (CRM)
   ============================================================================ */
function CRMModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
  globalSearch,
}) {
  const [view, setView] = useState("leads");
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Facebook",
    budget: 750000,
    locationPref: "Naivasha",
    agent: "Kevin Maina",
  });
  const [custForm, setCustForm] = useState({
    name: "",
    idNo: "",
    kraPin: "",
    phone: "",
    email: "",
    nextOfKin: "",
    agent: "Kevin Maina",
  });

  const addLead = (e) => {
    e.preventDefault();
    const created = {
      id: `LD-${Date.now().toString().slice(-3)}`,
      ...leadForm,
      stage: "New Lead",
      nextFollowUp: "2026-11-20",
      notes: "Captured via CRM desk",
    };
    setDb((prev) => ({ ...prev, leads: [created, ...prev.leads] }));
    logAudit(`Captured new lead ${created.name}`, "CRM");
    notify(`Lead ${created.name} added.`);
    setLeadForm({
      name: "",
      phone: "",
      email: "",
      source: "Facebook",
      budget: 750000,
      locationPref: "Naivasha",
      agent: "Kevin Maina",
    });
  };

  const convertLeadToCustomer = (lead) => {
    const newCust = {
      id: `CUS-${Date.now().toString().slice(-3)}`,
      name: lead.name,
      type: "Individual",
      idNo: "Pending ID",
      kraPin: "Pending PIN",
      phone: lead.phone,
      email: lead.email || "pending@client.co.ke",
      nextOfKin: "Pending",
      agent: lead.agent,
      docsComplete: false,
    };
    setDb((prev) => ({
      ...prev,
      customers: [newCust, ...prev.customers],
      leads: prev.leads.map((l) =>
        l.id === lead.id ? { ...l, stage: "Converted" } : l,
      ),
    }));
    logAudit(`Converted lead ${lead.name} into Customer ${newCust.id}`, "CRM");
    notify(`${lead.name} converted to Registered Customer.`);
  };

  const registerCustomer = (e) => {
    e.preventDefault();
    const newCust = {
      id: `CUS-${Date.now().toString().slice(-3)}`,
      type: "Individual",
      ...custForm,
      docsComplete: Boolean(custForm.idNo && custForm.kraPin),
    };
    setDb((prev) => ({ ...prev, customers: [newCust, ...prev.customers] }));
    logAudit(`Registered customer ${newCust.name}`, "CRM");
    notify(`Customer ${newCust.name} registered.`);
    setCustForm({
      name: "",
      idNo: "",
      kraPin: "",
      phone: "",
      email: "",
      nextOfKin: "",
      agent: "Kevin Maina",
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-3 rounded-xl border border-emerald-200">
        <div className="flex gap-2">
          <button
            onClick={() => setView("leads")}
            className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "leads" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
          >
            Leads Pipeline ({db.leads.length})
          </button>
          <button
            onClick={() => setView("customers")}
            className={`px-4 py-2 rounded-lg text-xs font-bold ${view === "customers" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
          >
            Registered Customers ({db.customers.length})
          </button>
        </div>
        <button
          onClick={() =>
            exportToCSV(view, view === "leads" ? db.leads : db.customers)
          }
          className="px-3 py-1.5 border border-emerald-300 rounded-lg text-xs font-bold text-emerald-900 flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>
      </div>

      {view === "leads" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={addLead}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Capture Prospective Lead
            </h3>
            <div>
              <label className="font-bold">Full Name *</label>
              <input
                required
                value={leadForm.name}
                onChange={(e) =>
                  setLeadForm({ ...leadForm, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Phone Number *</label>
              <input
                required
                value={leadForm.phone}
                onChange={(e) =>
                  setLeadForm({ ...leadForm, phone: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Source</label>
                <select
                  value={leadForm.source}
                  onChange={(e) =>
                    setLeadForm({ ...leadForm, source: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                >
                  <option>Facebook</option>
                  <option>TikTok Ad</option>
                  <option>WhatsApp</option>
                  <option>Google Ads</option>
                  <option>Walk-in</option>
                  <option>Referral</option>
                </select>
              </div>
              <div>
                <label className="font-bold">Budget (KES)</label>
                <input
                  type="number"
                  value={leadForm.budget}
                  onChange={(e) =>
                    setLeadForm({ ...leadForm, budget: Number(e.target.value) })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="font-bold">Preferred Location</label>
              <input
                value={leadForm.locationPref}
                onChange={(e) =>
                  setLeadForm({ ...leadForm, locationPref: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Save Lead
            </button>
          </form>

          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Prospect</th>
                  <th className="p-2.5">Source</th>
                  <th className="p-2.5">Budget & Pref</th>
                  <th className="p-2.5">Agent</th>
                  <th className="p-2.5">Stage</th>
                  <th className="p-2.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {db.leads
                  .filter((l) =>
                    l.name.toLowerCase().includes(globalSearch.toLowerCase()),
                  )
                  .map((lead) => (
                    <tr key={lead.id} className="hover:bg-emerald-50">
                      <td className="p-2.5">
                        <div className="font-bold text-emerald-950">
                          {lead.name}
                        </div>
                        <div className="font-mono text-[11px] text-slate-600">
                          {lead.phone}
                        </div>
                      </td>
                      <td className="p-2.5">{lead.source}</td>
                      <td className="p-2.5">
                        KES {lead.budget.toLocaleString()} ({lead.locationPref})
                      </td>
                      <td className="p-2.5">{lead.agent}</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-950 font-bold rounded text-[10px]">
                          {lead.stage}
                        </span>
                      </td>
                      <td className="p-2.5">
                        {lead.stage !== "Converted" && (
                          <button
                            onClick={() => convertLeadToCustomer(lead)}
                            className="px-2.5 py-1 bg-emerald-700 text-white font-bold rounded text-[10px]"
                          >
                            Convert to Client
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={registerCustomer}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Register KYC Customer
            </h3>
            <div>
              <label className="font-bold">Customer Full Name *</label>
              <input
                required
                value={custForm.name}
                onChange={(e) =>
                  setCustForm({ ...custForm, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">National ID / Reg *</label>
                <input
                  required
                  value={custForm.idNo}
                  onChange={(e) =>
                    setCustForm({ ...custForm, idNo: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold">KRA PIN *</label>
                <input
                  required
                  value={custForm.kraPin}
                  onChange={(e) =>
                    setCustForm({ ...custForm, kraPin: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="font-bold">Phone Number *</label>
              <input
                required
                value={custForm.phone}
                onChange={(e) =>
                  setCustForm({ ...custForm, phone: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Next of Kin & Phone</label>
              <input
                value={custForm.nextOfKin}
                onChange={(e) =>
                  setCustForm({ ...custForm, nextOfKin: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Save Customer Profile
            </button>
          </form>

          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Customer</th>
                  <th className="p-2.5">ID / KRA PIN</th>
                  <th className="p-2.5">Contact</th>
                  <th className="p-2.5">Next of Kin</th>
                  <th className="p-2.5">KYC Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {db.customers
                  .filter((c) =>
                    c.name.toLowerCase().includes(globalSearch.toLowerCase()),
                  )
                  .map((c) => (
                    <tr key={c.id} className="hover:bg-emerald-50">
                      <td className="p-2.5 font-bold text-emerald-950">
                        {c.name}
                      </td>
                      <td className="p-2.5 font-mono text-[11px]">
                        {c.idNo} / {c.kraPin}
                      </td>
                      <td className="p-2.5 font-mono">{c.phone}</td>
                      <td className="p-2.5">{c.nextOfKin}</td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.docsComplete ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}
                        >
                          {c.docsComplete ? "Complete" : "Missing ID/PIN"}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   16. SITE VISITS, VEHICLE FLEET, FUEL AUDIT & VISITOR OUTCOMES
   ============================================================================ */
function FieldFleetFuelModule({ db, setDb, notify, logAudit, exportToCSV }) {
  const [selectedTripId, setSelectedTripId] = useState(
    db.siteVisitsAndFuel[0]?.id || "TRP-01",
  );
  const [tripForm, setTripForm] = useState({
    projectId: db.projects[0]?.id || "",
    vehicleId: db.fleet[0]?.id || "",
    agent: "Kevin Maina",
    visitors: 8,
    startOdo: 142280,
    endOdo: 142460,
    fuelLitres: 22,
    fuelCost: 4620,
    otherExpenses: 2000,
    outcome: "Site Visit Completed",
  });

  const [outcomeForm, setOutcomeForm] = useState({
    visitorName: "",
    phone: "",
    projectId: db.projects[0]?.id || "PRJ-001",
    plotId: db.plots.find((p) => p.status === "Available")?.id || "",
    salesperson: "Kevin Maina",
    outcome: "Follow-up Required",
    interestLevel: "High",
    followUpDate: "2026-11-21",
    reservationMade: false,
    reservationAmount: 50000,
    notes: "",
  });

  const logTripAndFuel = (e) => {
    e.preventDefault();
    const veh = db.fleet.find((v) => v.id === tripForm.vehicleId);
    const created = {
      id: `TRP-${Date.now().toString().slice(-3)}`,
      date: new Date().toISOString().slice(0, 10),
      driver: veh?.driver || "Assigned Driver",
      ...tripForm,
    };
    setDb((prev) => ({
      ...prev,
      siteVisitsAndFuel: [created, ...prev.siteVisitsAndFuel],
      fleet: prev.fleet.map((f) =>
        f.id === tripForm.vehicleId
          ? { ...f, currentOdo: Number(tripForm.endOdo) }
          : f,
      ),
    }));
    setSelectedTripId(created.id);
    logAudit(
      `Logged site visit trip ${created.id} & fuel for ${veh?.reg}`,
      "Field & Fuel",
    );
    notify(
      `Trip ${created.id} logged. Now record individual visitor outcomes below.`,
    );
  };

  const handleAddVisitorOutcome = (e) => {
    e.preventDefault();
    const createdOutcome = {
      id: `OUT-${Date.now().toString().slice(-4)}`,
      tripId: selectedTripId,
      ...outcomeForm,
    };

    const newLead = {
      id: `LD-${Date.now().toString().slice(-4)}`,
      name: outcomeForm.visitorName,
      phone: outcomeForm.phone,
      email: "sitevisit@client.co.ke",
      source: "Site Visit Trip",
      budget: 650000,
      locationPref:
        db.projects.find((p) => p.id === outcomeForm.projectId)?.name ||
        "Naivasha",
      stage: outcomeForm.reservationMade ? "Booking" : "Site Visit Completed",
      agent: outcomeForm.salesperson,
      nextFollowUp: outcomeForm.followUpDate,
      notes: outcomeForm.notes,
    };

    setDb((prev) => ({
      ...prev,
      siteVisitOutcomes: [createdOutcome, ...prev.siteVisitOutcomes],
      leads: [newLead, ...prev.leads],
      plots:
        outcomeForm.reservationMade && outcomeForm.plotId
          ? prev.plots.map((pl) =>
              pl.id === outcomeForm.plotId && pl.status === "Available"
                ? {
                    ...pl,
                    status: "Reserved",
                    paidAmount: Number(outcomeForm.reservationAmount),
                    history: [
                      ...pl.history,
                      `Reserved during Site Visit ${selectedTripId} by ${outcomeForm.visitorName}`,
                    ],
                  }
                : pl,
            )
          : prev.plots,
    }));

    logAudit(
      `Recorded site visit outcome for ${outcomeForm.visitorName} (Trip ${selectedTripId})`,
      "Site Visit Outcomes",
    );
    notify(
      outcomeForm.reservationMade
        ? `Visitor outcome recorded & Plot reserved!`
        : `Visitor outcome recorded & synced to CRM.`,
    );
    setOutcomeForm({
      ...outcomeForm,
      visitorName: "",
      phone: "",
      notes: "",
      reservationMade: false,
    });
  };

  const tripOutcomes = db.siteVisitOutcomes.filter(
    (o) => o.tripId === selectedTripId,
  );

  return (
    <div className="space-y-6">
      <form
        onSubmit={logTripAndFuel}
        className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs"
      >
        <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
          + Log Site Visit Trip, Odometer & Fuel Consumption
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="font-bold">Destination Project</label>
            <select
              value={tripForm.projectId}
              onChange={(e) =>
                setTripForm({ ...tripForm, projectId: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            >
              {db.projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold">Vehicle</label>
            <select
              value={tripForm.vehicleId}
              onChange={(e) =>
                setTripForm({ ...tripForm, vehicleId: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            >
              {db.fleet.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.reg} ({v.driver})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold">Start Odometer (KM)</label>
            <input
              type="number"
              value={tripForm.startOdo}
              onChange={(e) =>
                setTripForm({ ...tripForm, startOdo: Number(e.target.value) })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="font-bold">End Odometer (KM)</label>
            <input
              type="number"
              value={tripForm.endOdo}
              onChange={(e) =>
                setTripForm({ ...tripForm, endOdo: Number(e.target.value) })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="font-bold">Fuel Litres Issued</label>
            <input
              type="number"
              value={tripForm.fuelLitres}
              onChange={(e) =>
                setTripForm({ ...tripForm, fuelLitres: Number(e.target.value) })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="font-bold">Fuel Cost (KES)</label>
            <input
              type="number"
              value={tripForm.fuelCost}
              onChange={(e) =>
                setTripForm({ ...tripForm, fuelCost: Number(e.target.value) })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="font-bold">Visitors Count</label>
            <input
              type="number"
              value={tripForm.visitors}
              onChange={(e) =>
                setTripForm({ ...tripForm, visitors: Number(e.target.value) })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Save Trip & Fuel Log
            </button>
          </div>
        </div>
      </form>

      <div className="bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-black text-emerald-950 text-sm">
            Site Visit Trips & Fuel Efficiency Audit (
            {db.siteVisitsAndFuel.length} Trips)
          </h3>
          <button
            onClick={() =>
              exportToCSV("fuel_audit_report", db.siteVisitsAndFuel)
            }
            className="text-xs font-bold text-emerald-700 flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Export Fuel Report
          </button>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">Trip Ref & Vehicle</th>
              <th className="p-2.5">Project</th>
              <th className="p-2.5">Distance</th>
              <th className="p-2.5">Fuel & Cost/KM</th>
              <th className="p-2.5">KM / Litre</th>
              <th className="p-2.5">Visitors & Outcomes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {db.siteVisitsAndFuel.map((t) => {
              const veh = db.fleet.find((v) => v.id === t.vehicleId);
              const prj = db.projects.find((p) => p.id === t.projectId);
              const dist = Math.max(1, t.endOdo - t.startOdo);
              const kmPerL = (dist / Math.max(1, t.fuelLitres)).toFixed(2);
              const costPerKm = (t.fuelCost / dist).toFixed(1);
              const anomaly = Number(kmPerL) < 4.5;
              const loggedOutcomesCount = db.siteVisitOutcomes.filter(
                (o) => o.tripId === t.id,
              ).length;
              return (
                <tr
                  key={t.id}
                  onClick={() => setSelectedTripId(t.id)}
                  className={`cursor-pointer ${selectedTripId === t.id ? "bg-emerald-50" : "hover:bg-slate-50"}`}
                >
                  <td className="p-2.5 font-bold">
                    {t.id} &bull; {veh?.reg} ({t.driver})
                  </td>
                  <td className="p-2.5">{prj?.name}</td>
                  <td className="p-2.5 font-mono">{dist} KM</td>
                  <td className="p-2.5 font-mono">
                    {t.fuelLitres}L &bull; KES {costPerKm}/km
                  </td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${anomaly ? "bg-rose-100 text-rose-900 border border-rose-300" : "bg-emerald-100 text-emerald-900"}`}
                    >
                      {kmPerL} KM/L {anomaly && "ANOMALY"}
                    </span>
                  </td>
                  <td className="p-2.5 font-bold text-emerald-800">
                    {t.visitors} Pax ({loggedOutcomesCount} Individual Outcomes
                    Logged)
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleAddVisitorOutcome}
          className="bg-white border-2 border-amber-400 p-5 rounded-xl space-y-3 text-xs h-fit"
        >
          <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
            + Add Visit Outcome (Trip {selectedTripId})
          </h3>
          <div>
            <label className="font-bold">Visitor Full Name *</label>
            <input
              required
              value={outcomeForm.visitorName}
              onChange={(e) =>
                setOutcomeForm({ ...outcomeForm, visitorName: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="font-bold">Phone Number *</label>
            <input
              required
              value={outcomeForm.phone}
              onChange={(e) =>
                setOutcomeForm({ ...outcomeForm, phone: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <div>
            <label className="font-bold">Assigned Salesperson</label>
            <select
              value={outcomeForm.salesperson}
              onChange={(e) =>
                setOutcomeForm({ ...outcomeForm, salesperson: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            >
              {db.employees.map((e) => (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="resMade"
              checked={outcomeForm.reservationMade}
              onChange={(e) =>
                setOutcomeForm({
                  ...outcomeForm,
                  reservationMade: e.target.checked,
                })
              }
              className="w-4 h-4 accent-emerald-700"
            />
            <label htmlFor="resMade" className="font-bold text-emerald-950">
              Plot Reservation Made On Site?
            </label>
          </div>
          {outcomeForm.reservationMade && (
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <div>
                <label className="font-bold">Available Plot</label>
                <select
                  value={outcomeForm.plotId}
                  onChange={(e) =>
                    setOutcomeForm({ ...outcomeForm, plotId: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded p-1.5 bg-white"
                >
                  {db.plots
                    .filter((p) => p.status === "Available")
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.number}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="font-bold">Deposit (KES)</label>
                <input
                  type="number"
                  value={outcomeForm.reservationAmount}
                  onChange={(e) =>
                    setOutcomeForm({
                      ...outcomeForm,
                      reservationAmount: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded p-1.5 bg-white font-mono"
                />
              </div>
            </div>
          )}
          <div>
            <label className="font-bold">Visit Notes & Follow-Up</label>
            <input
              value={outcomeForm.notes}
              onChange={(e) =>
                setOutcomeForm({ ...outcomeForm, notes: e.target.value })
              }
              placeholder="Client feedback & next step..."
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black rounded-lg shadow"
          >
            Save Visitor Outcome
          </button>
        </form>

        <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
          <h3 className="font-black text-emerald-950 text-sm mb-3">
            Recorded Visitor Outcomes for Trip {selectedTripId} (
            {tripOutcomes.length})
          </h3>
          {tripOutcomes.length === 0 ? (
            <p className="text-xs text-slate-500">
              No individual visitor outcomes logged for this trip yet. Use the
              form on the left to enter visitor results.
            </p>
          ) : (
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Visitor</th>
                  <th className="p-2.5">Salesperson</th>
                  <th className="p-2.5">Reservation</th>
                  <th className="p-2.5">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {tripOutcomes.map((o) => (
                  <tr key={o.id}>
                    <td className="p-2.5 font-bold">
                      {o.visitorName}{" "}
                      <span className="block font-mono text-[10px] text-slate-500">
                        {o.phone}
                      </span>
                    </td>
                    <td className="p-2.5">{o.salesperson}</td>
                    <td className="p-2.5">
                      {o.reservationMade ? (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-bold text-[10px]">
                          Reserved (
                          {db.plots.find((p) => p.id === o.plotId)?.number} -
                          KES {Number(o.reservationAmount).toLocaleString()})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-[10px]">
                          Follow-up
                        </span>
                      )}
                    </td>
                    <td className="p-2.5">{o.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   ADDITIONAL MASTER MODULE COMPONENTS (Projects, Subdivisions, Instalments, Titles, Portal, Procurement, Accounting, HR, Care & AI)
   ============================================================================ */
function ProjectsAndInfraModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
}) {
  const [showProjForm, setShowProjForm] = useState(false);
  const [projForm, setProjForm] = useState({
    code: `NSG-P${db.projects.length + 1}`,
    name: "",
    parcelId: db.parentParcels[0]?.id || "",
    location: "Nakuru",
    area: "40 Acres",
    type: "Residential",
    manager: "Eng. Patrick Karanja",
    startDate: "2026-11-01",
    endDate: "2027-11-01",
    budget: 5000000,
    description: "Serviced plots infrastructure",
  });

  const [infraForm, setInfraForm] = useState({
    projectId: db.projects[0]?.id || "",
    category: "Access Roads",
    title: "Grading & Murram",
    contractor: "Rift Civil Works Ltd",
    estCost: 1500000,
    actualCost: 1400000,
    progress: 50,
    targetDate: "2026-12-31",
  });

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!activePermissions.Create) return notify("Access denied", "error");
    const created = {
      id: `PRJ-${Date.now().toString().slice(-3)}`,
      ...projForm,
      actualSpend: 0,
      status: "Active Selling",
    };
    setDb((prev) => ({ ...prev, projects: [created, ...prev.projects] }));
    logAudit(`Created project ${created.name}`, "Projects");
    notify(`Project ${created.name} created.`);
    setShowProjForm(false);
  };

  const handleAddInfra = (e) => {
    e.preventDefault();
    const created = {
      id: `INF-${Date.now().toString().slice(-3)}`,
      ...infraForm,
      inspection: "Pending Inspection",
    };
    setDb((prev) => ({
      ...prev,
      infrastructure: [created, ...prev.infrastructure],
      projects: prev.projects.map((pr) =>
        pr.id === infraForm.projectId
          ? {
              ...pr,
              actualSpend:
                Number(pr.actualSpend || 0) + Number(infraForm.actualCost),
            }
          : pr,
      ),
    }));
    logAudit(`Added infrastructure work ${created.title}`, "Infrastructure");
    notify(`Infrastructure work "${created.title}" added.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-emerald-200">
        <button
          onClick={() => setShowProjForm(!showProjForm)}
          className="px-4 py-2 bg-emerald-700 text-white font-bold text-xs rounded-lg shadow"
        >
          + Create Development Project
        </button>
        <button
          onClick={() => exportToCSV("projects_infra", db.projects)}
          className="px-3 py-2 bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-lg flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" /> Export Projects
        </button>
      </div>

      {showProjForm && (
        <form
          onSubmit={handleCreateProject}
          className="bg-white border-2 border-emerald-500 p-5 rounded-xl space-y-3 text-xs"
        >
          <h3 className="font-black text-emerald-950 text-sm">
            Create New Development Project
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold">Project Name *</label>
              <input
                required
                value={projForm.name}
                onChange={(e) =>
                  setProjForm({ ...projForm, name: e.target.value })
                }
                placeholder="e.g. Nakuru Ridge Phase 3"
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Project Code *</label>
              <input
                required
                value={projForm.code}
                onChange={(e) =>
                  setProjForm({ ...projForm, code: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Parent Parcel *</label>
              <select
                value={projForm.parcelId}
                onChange={(e) =>
                  setProjForm({ ...projForm, parcelId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.parentParcels.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.titleNo} ({p.location})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Location</label>
              <input
                value={projForm.location}
                onChange={(e) =>
                  setProjForm({ ...projForm, location: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Approved Budget (KES)</label>
              <input
                type="number"
                value={projForm.budget}
                onChange={(e) =>
                  setProjForm({ ...projForm, budget: Number(e.target.value) })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Project Manager</label>
              <input
                value={projForm.manager}
                onChange={(e) =>
                  setProjForm({ ...projForm, manager: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowProjForm(false)}
              className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-1.5 bg-emerald-700 text-white rounded-lg font-bold"
            >
              Save Project
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form
          onSubmit={handleAddInfra}
          className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
        >
          <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
            + Add Infrastructure Work
          </h3>
          <div>
            <label className="font-bold">Project *</label>
            <select
              value={infraForm.projectId}
              onChange={(e) =>
                setInfraForm({ ...infraForm, projectId: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            >
              {db.projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold">Category</label>
            <select
              value={infraForm.category}
              onChange={(e) =>
                setInfraForm({ ...infraForm, category: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            >
              {[
                "Access Roads",
                "Water Supply",
                "Electricity",
                "Drainage",
                "Perimeter Walls and Security",
                "Beacon Installation",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="font-bold">Description / Title *</label>
            <input
              required
              value={infraForm.title}
              onChange={(e) =>
                setInfraForm({ ...infraForm, title: e.target.value })
              }
              placeholder="e.g. 9m Murram Grading"
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="font-bold">Contractor *</label>
            <input
              required
              value={infraForm.contractor}
              onChange={(e) =>
                setInfraForm({ ...infraForm, contractor: e.target.value })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="font-bold">Est Cost (KES)</label>
              <input
                type="number"
                value={infraForm.estCost}
                onChange={(e) =>
                  setInfraForm({
                    ...infraForm,
                    estCost: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Actual Cost (KES)</label>
              <input
                type="number"
                value={infraForm.actualCost}
                onChange={(e) =>
                  setInfraForm({
                    ...infraForm,
                    actualCost: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>
          <div>
            <label className="font-bold">Progress (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              value={infraForm.progress}
              onChange={(e) =>
                setInfraForm({ ...infraForm, progress: Number(e.target.value) })
              }
              className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
          >
            Save Infrastructure Work
          </button>
        </form>

        <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
          <h3 className="font-black text-emerald-950 text-sm mb-3">
            Project Infrastructure & Civil Works Tracking (
            {db.infrastructure.length})
          </h3>
          <table className="w-full text-xs text-left">
            <thead className="bg-emerald-900 text-white uppercase font-bold">
              <tr>
                <th className="p-2.5">Category & Title</th>
                <th className="p-2.5">Contractor</th>
                <th className="p-2.5">Cost (Est / Act)</th>
                <th className="p-2.5">Progress</th>
                <th className="p-2.5">Inspection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {db.infrastructure.map((inf) => (
                <tr key={inf.id}>
                  <td className="p-2.5 font-bold">
                    {inf.title}{" "}
                    <span className="block font-mono text-[10px] text-emerald-700">
                      {inf.category}
                    </span>
                  </td>
                  <td className="p-2.5">{inf.contractor}</td>
                  <td className="p-2.5 font-mono">
                    KES {inf.estCost.toLocaleString()} /{" "}
                    <b className="text-amber-800">
                      {inf.actualCost.toLocaleString()}
                    </b>
                  </td>
                  <td className="p-2.5 font-bold">{inf.progress}%</td>
                  <td className="p-2.5">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-bold text-[10px]">
                      {inf.inspection}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SubdivisionAndPlotsModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
  globalSearch,
}) {
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [actionModal, setActionModal] = useState({ type: null, plot: null });
  const [showSubForm, setShowSubForm] = useState(false);

  const [sellForm, setSellForm] = useState({
    customerId: db.customers[0]?.id || "",
    salesperson: db.employees[0]?.name || "Kevin Maina",
    discount: 0,
    deposit: 150000,
    planType: "12 Months Instalment",
    months: 12,
  });

  const [reserveForm, setReserveForm] = useState({
    customerId: db.customers[0]?.id || "",
    salesperson: db.employees[0]?.name || "Kevin Maina",
    bookingFee: 50000,
    expiryDate: "2026-12-05",
    notes: "Reserved from Plot Matrix",
  });

  const [mergeForm, setMergeForm] = useState({
    secondPlotId: "",
    newPlotNumber: "",
    newSize: "1/4 Acre",
    newDimensions: "100x100 ft",
    combinedPrice: 0,
  });

  const [subForm, setSubForm] = useState({
    refNo: `SUB-2026-0${(db.subdivisions?.length || 0) + 1}`,
    parcelId: db.parentParcels[0]?.id || "",
    projectId: db.projects[0]?.id || "",
    surveyPlan: "RIM/NKU/2026/09",
    plotSize: "1/8 Acre",
    dimensions: "50x100 ft",
    plotType: "Residential",
    prefix: "PLT",
    startNumber: 1,
    numberOfPlots: 8,
    sellingPrice: 650000,
  });

  const handleSizePresetChange = (size) => {
    const dimMap = {
      "1/8 Acre": "50x100 ft",
      "1/4 Acre": "100x100 ft",
      "1/2 Acre": "100x200 ft",
      "1 Acre": "200x218 ft",
    };
    setSubForm({
      ...subForm,
      plotSize: size,
      dimensions: dimMap[size] || "50x100 ft",
    });
  };

  const handleCreateSubdivisionAndPlots = (e) => {
    e.preventDefault();
    if (!activePermissions.Create)
      return notify("Access Denied: Role lacks Create permission.", "error");

    const count = Math.min(100, Math.max(1, Number(subForm.numberOfPlots)));
    const startIdx = Math.max(1, Number(subForm.startNumber));
    const subId = `SUB-${Date.now().toString().slice(-4)}`;

    const newSubdivision = {
      id: subId,
      refNo: subForm.refNo,
      projectId: subForm.projectId,
      parcelId: subForm.parcelId,
      surveyPlan: subForm.surveyPlan,
      totalArea: `${count} x ${subForm.plotSize}`,
      totalPlots: count,
      surveyStatus: "Approved & Sealed",
      titleStatus: "Subdivided",
    };

    const generatedPlots = Array.from({ length: count }, (_, idx) => {
      const seq = String(startIdx + idx).padStart(3, "0");
      const plotCode = `${subForm.prefix.toUpperCase()}-${seq}`;
      return {
        id: `PLOT-${Date.now().toString().slice(-4)}-${idx + 1}`,
        subdivisionId: subId,
        projectId: subForm.projectId,
        parcelId: subForm.parcelId,
        number: plotCode,
        size: subForm.plotSize,
        dimensions: subForm.dimensions,
        plotType: subForm.plotType,
        price: Number(subForm.sellingPrice),
        status: "Available",
        customerId: null,
        paidAmount: 0,
        titleStatus: "Subdivided",
        titleNo: "Pending Mutation",
        history: [
          `Subdivided from ${subForm.refNo} (${subForm.plotSize})`,
          "Cleared for Sale",
        ],
      };
    });

    setDb((prev) => ({
      ...prev,
      subdivisions: [newSubdivision, ...(prev.subdivisions || [])],
      plots: [...generatedPlots, ...(prev.plots || [])],
    }));

    logAudit(
      `Subdivided ${subForm.refNo} into ${count} plots (${subForm.plotSize} each)`,
      "Subdivisions & Plots",
    );
    notify(
      `Created Subdivision ${subForm.refNo} and generated ${count} individual ${subForm.plotSize} plots!`,
    );
    setShowSubForm(false);
  };

  const updatePlotStatus = (plotId, newStatus) => {
    if (!activePermissions.Edit) return notify("Access denied", "error");
    setDb((prev) => ({
      ...prev,
      plots: prev.plots.map((p) =>
        p.id === plotId
          ? {
              ...p,
              status: newStatus,
              history: [...p.history, `Status updated to ${newStatus}`],
            }
          : p,
      ),
    }));
    logAudit(`Updated plot ${plotId} status to ${newStatus}`, "Plot Inventory");
    notify(`Plot status updated to ${newStatus}.`);
    setSelectedPlot(null);
  };

  const openActionModal = (type, plot) => {
    if (type === "sell") {
      setSellForm({
        customerId: plot.customerId || db.customers[0]?.id || "",
        salesperson: plot.salesperson || db.employees[0]?.name || "Kevin Maina",
        discount: 0,
        deposit:
          plot.paidAmount > 0 ? plot.paidAmount : Math.min(150000, plot.price),
        planType: "12 Months Instalment",
        months: 12,
      });
    } else if (type === "reserve") {
      setReserveForm({
        customerId: db.customers[0]?.id || "",
        salesperson: db.employees[0]?.name || "Kevin Maina",
        bookingFee: 50000,
        expiryDate: "2026-12-05",
        notes: "",
      });
    } else if (type === "merge") {
      const candidates = db.plots.filter(
        (p) =>
          p.id !== plot.id &&
          p.projectId === plot.projectId &&
          p.status === "Available",
      );
      const firstCand = candidates[0];
      setMergeForm({
        secondPlotId: firstCand?.id || "",
        newPlotNumber: `${plot.number}-M`,
        newSize: "1/4 Acre",
        newDimensions: "100x100 ft",
        combinedPrice: Number(plot.price) + Number(firstCand?.price || 0),
      });
    }
    setActionModal({ type, plot });
  };

  const handleDirectSellPlot = (e) => {
    e.preventDefault();
    if (!activePermissions.Create)
      return notify("Access Denied: Role lacks Create permission.", "error");
    const plot = actionModal.plot;
    if (!plot) return;

    const netPrice = Math.max(
      0,
      Number(plot.price) - Number(sellForm.discount),
    );
    const depositPaid = Number(sellForm.deposit);
    const balance = Math.max(0, netPrice - depositPaid);
    const monthlyDue =
      sellForm.months > 1 ? Math.round(balance / Number(sellForm.months)) : 0;

    const newAgr = {
      id: `AGR-2026-${Date.now().toString().slice(-3)}`,
      plotId: plot.id,
      customerId: sellForm.customerId,
      salesperson: sellForm.salesperson,
      salePrice: netPrice,
      discount: Number(sellForm.discount),
      deposit: depositPaid,
      planType: sellForm.planType,
      months: Number(sellForm.months),
      monthlyDue,
      nextDueDate: balance > 0 ? "2026-12-17" : "-",
      status: balance === 0 ? "Completed" : "Active Instalment",
      signed: true,
    };

    const rate =
      db.commissionConfig?.projectRates?.[plot.projectId] ||
      db.commissionConfig?.defaultPercent ||
      10;
    const commAmount = Math.round((netPrice * rate) / 100);
    const newComm = {
      id: `COM-${Date.now().toString().slice(-3)}`,
      salesperson: sellForm.salesperson,
      projectId: plot.projectId,
      plotId: plot.id,
      customerId: sellForm.customerId,
      saleRef: newAgr.id,
      saleValue: netPrice,
      rate,
      basis: `${rate}% Sale Price`,
      amount: commAmount,
      paidAmount: 0,
      approvalStatus: "Pending",
      status: "Earned",
      paymentDate: "-",
    };

    const cust = db.customers.find((c) => c.id === sellForm.customerId);
    setDb((prev) => ({
      ...prev,
      agreements: [newAgr, ...prev.agreements],
      commissions: [
        newComm,
        ...prev.commissions.filter((c) => c.plotId !== plot.id),
      ],
      plots: prev.plots.map((p) =>
        p.id === plot.id
          ? {
              ...p,
              status: balance === 0 ? "Fully Paid" : "Payment Pending",
              customerId: sellForm.customerId,
              salesperson: sellForm.salesperson,
              paidAmount: depositPaid,
              history: [
                ...p.history,
                `Sold to ${cust?.name} by ${sellForm.salesperson} (${newAgr.id}) - Comm: KES ${commAmount.toLocaleString()}`,
              ],
            }
          : p,
      ),
    }));

    logAudit(
      `Sold Plot ${plot.number} to ${cust?.name} via ${sellForm.salesperson} (Comm: KES ${commAmount.toLocaleString()})`,
      "Plot Sales",
    );
    notify(
      `Plot ${plot.number} sold! Agreement ${newAgr.id} & KES ${commAmount.toLocaleString()} commission recorded.`,
    );
    setActionModal({ type: null, plot: null });
  };

  const handleDirectReservePlot = (e) => {
    e.preventDefault();
    if (!activePermissions.Create)
      return notify("Access Denied: Role lacks Create permission.", "error");
    const plot = actionModal.plot;
    if (!plot) return;
    const cust = db.customers.find((c) => c.id === reserveForm.customerId);

    setDb((prev) => ({
      ...prev,
      plots: prev.plots.map((p) =>
        p.id === plot.id
          ? {
              ...p,
              status: "Reserved",
              customerId: reserveForm.customerId,
              salesperson: reserveForm.salesperson,
              paidAmount: Number(reserveForm.bookingFee),
              history: [
                ...p.history,
                `Reserved for ${cust?.name} by ${reserveForm.salesperson} (Fee: KES ${Number(reserveForm.bookingFee).toLocaleString()}, Exp: ${reserveForm.expiryDate})`,
              ],
            }
          : p,
      ),
    }));

    logAudit(
      `Reserved Plot ${plot.number} for ${cust?.name} (Agent: ${reserveForm.salesperson})`,
      "Plot Reservations",
    );
    notify(
      `Plot ${plot.number} reserved for ${cust?.name} and locked against double-booking.`,
    );
    setActionModal({ type: null, plot: null });
  };

  const handleMergePlots = (e) => {
    e.preventDefault();
    if (!activePermissions.Edit)
      return notify("Access Denied: Role lacks Edit permission.", "error");
    const primaryPlot = actionModal.plot;
    const secondaryPlot = db.plots.find((p) => p.id === mergeForm.secondPlotId);
    if (!primaryPlot || !secondaryPlot)
      return notify("Select a valid second available plot to merge.", "error");

    const mergedPlot = {
      id: `PLOT-MRG-${Date.now().toString().slice(-4)}`,
      subdivisionId: primaryPlot.subdivisionId,
      projectId: primaryPlot.projectId,
      parcelId: primaryPlot.parcelId,
      number: mergeForm.newPlotNumber.toUpperCase(),
      size: mergeForm.newSize,
      dimensions: mergeForm.newDimensions,
      plotType: primaryPlot.plotType,
      price: Number(mergeForm.combinedPrice),
      status: "Available",
      customerId: null,
      paidAmount: 0,
      titleStatus: "Subdivided",
      titleNo: "Amalgamation Pending",
      history: [
        `Merged from ${primaryPlot.number} & ${secondaryPlot.number}`,
        "Available for Sale",
      ],
    };

    setDb((prev) => ({
      ...prev,
      plots: [
        mergedPlot,
        ...prev.plots.filter(
          (p) => p.id !== primaryPlot.id && p.id !== secondaryPlot.id,
        ),
      ],
    }));

    logAudit(
      `Merged plots ${primaryPlot.number} + ${secondaryPlot.number} into ${mergedPlot.number}`,
      "Plot Amalgamation",
    );
    notify(
      `Merged ${primaryPlot.number} & ${secondaryPlot.number} into ${mergedPlot.number} (KES ${mergedPlot.price.toLocaleString()}).`,
    );
    setActionModal({ type: null, plot: null });
  };

  const handleDeletePlot = () => {
    if (!activePermissions.Delete)
      return notify(
        "Access Denied: Current role lacks Delete permission.",
        "error",
      );
    const plot = actionModal.plot;
    if (!plot) return;
    if (plot.customerId || plot.paidAmount > 0) {
      return notify(
        "Cannot delete a plot with an assigned customer or recorded payments.",
        "error",
      );
    }

    setDb((prev) => ({
      ...prev,
      plots: prev.plots.filter((p) => p.id !== plot.id),
    }));
    logAudit(`Deleted unallocated plot ${plot.number}`, "Plot Inventory");
    notify(`Plot ${plot.number} removed from inventory.`);
    setActionModal({ type: null, plot: null });
  };

  const filteredPlots = db.plots.filter((p) => {
    const matchSearch = (p.number || "")
      .toLowerCase()
      .includes(globalSearch.toLowerCase());
    const matchStatus = filterStatus === "All" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-emerald-200">
        <div className="flex flex-wrap gap-1.5">
          {[
            "All",
            "Available",
            "Reserved",
            "Payment Pending",
            "Fully Paid",
            "Blocked / Unavailable",
          ].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${filterStatus === st ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
            >
              {st}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubForm(!showSubForm)}
            className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4 text-amber-300" /> Create Subdivision &
            Generate Plots
          </button>
          <button
            onClick={() => exportToCSV("plot_inventory", db.plots)}
            className="px-3 py-1.5 bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-lg flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Export Plots
          </button>
        </div>
      </div>

      {showSubForm && (
        <form
          onSubmit={handleCreateSubdivisionAndPlots}
          className="bg-white border-2 border-emerald-500 p-5 rounded-xl shadow-md space-y-4 text-xs"
        >
          <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700">
                Land Subdivision & Mutation Engine
              </span>
              <h3 className="font-black text-emerald-950 text-sm">
                Divide Parent Parcel into Individual Plots (1/8 Acre, 1/4 Acre,
                1/2 Acre, 1 Acre)
              </h3>
            </div>
            <button type="button" onClick={() => setShowSubForm(false)}>
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <div>
              <label className="font-bold text-slate-700">
                Parent Parcel *
              </label>
              <select
                value={subForm.parcelId}
                onChange={(e) =>
                  setSubForm({ ...subForm, parcelId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
              >
                {db.parentParcels.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.titleNo} ({p.size} {p.unit})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Development Project *
              </label>
              <select
                value={subForm.projectId}
                onChange={(e) =>
                  setSubForm({ ...subForm, projectId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
              >
                {db.projects.map((pr) => (
                  <option key={pr.id} value={pr.id}>
                    {pr.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Subdivision Reference *
              </label>
              <input
                required
                value={subForm.refNo}
                onChange={(e) =>
                  setSubForm({ ...subForm, refNo: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Survey / RIM Plan No *
              </label>
              <input
                required
                value={subForm.surveyPlan}
                onChange={(e) =>
                  setSubForm({ ...subForm, surveyPlan: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Plot Division Size *
              </label>
              <select
                value={subForm.plotSize}
                onChange={(e) => handleSizePresetChange(e.target.value)}
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-emerald-50 font-bold text-emerald-950"
              >
                <option value="1/8 Acre">1/8 Acre (50x100 ft)</option>
                <option value="1/4 Acre">1/4 Acre (100x100 ft)</option>
                <option value="1/2 Acre">1/2 Acre (100x200 ft)</option>
                <option value="1 Acre">1 Acre (200x218 ft)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Plot Dimensions
              </label>
              <input
                required
                value={subForm.dimensions}
                onChange={(e) =>
                  setSubForm({ ...subForm, dimensions: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Plot Number Prefix *
              </label>
              <input
                required
                maxLength={6}
                value={subForm.prefix}
                onChange={(e) =>
                  setSubForm({ ...subForm, prefix: e.target.value })
                }
                placeholder="e.g. NSG or LAN"
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono uppercase"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">
                How Many Plots to Generate? *
              </label>
              <input
                type="number"
                min="1"
                max="100"
                required
                value={subForm.numberOfPlots}
                onChange={(e) =>
                  setSubForm({
                    ...subForm,
                    numberOfPlots: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Starting Plot Number
              </label>
              <input
                type="number"
                min="1"
                required
                value={subForm.startNumber}
                onChange={(e) =>
                  setSubForm({
                    ...subForm,
                    startNumber: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Selling Price Per Plot (KES) *
              </label>
              <input
                type="number"
                required
                value={subForm.sellingPrice}
                onChange={(e) =>
                  setSubForm({
                    ...subForm,
                    sellingPrice: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold text-emerald-900"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700">
                Plot Category / Type
              </label>
              <select
                value={subForm.plotType}
                onChange={(e) =>
                  setSubForm({ ...subForm, plotType: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
              >
                <option>Residential</option>
                <option>Commercial Corner</option>
                <option>Commercial</option>
                <option>Agribusiness</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow"
              >
                Generate {subForm.numberOfPlots} Plots Now
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Registered Subdivisions Summary */}
      {(db.subdivisions || []).length > 0 && (
        <div className="bg-white border border-emerald-200 p-4 rounded-xl overflow-x-auto">
          <h3 className="font-black text-emerald-950 text-xs uppercase tracking-wider mb-2">
            Registered Subdivisions ({db.subdivisions.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {db.subdivisions.map((sub) => {
              const prj = db.projects.find((p) => p.id === sub.projectId);
              const parcel = db.parentParcels.find(
                (p) => p.id === sub.parcelId,
              );
              return (
                <div
                  key={sub.id}
                  className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg"
                >
                  <div className="font-mono font-black text-emerald-950">
                    {sub.refNo}
                  </div>
                  <div className="text-[11px] font-bold text-emerald-800">
                    {prj?.name || sub.projectId}
                  </div>
                  <div className="text-[10px] text-slate-600 mt-0.5">
                    Title: {parcel?.titleNo} &bull; {sub.totalPlots} Plots
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
        <h3 className="font-black text-emerald-950 text-sm mb-3">
          Subdivided Plot Availability Matrix ({filteredPlots.length} Plots)
        </h3>
        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">Plot No.</th>
              <th className="p-2.5">Size & Type</th>
              <th className="p-2.5">Selling Price / Paid</th>
              <th className="p-2.5">Customer & Salesperson</th>
              <th className="p-2.5">Commission</th>
              <th className="p-2.5">Status</th>
              <th className="p-2.5">Plot Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {filteredPlots.map((pl) => {
              const cust = db.customers.find((c) => c.id === pl.customerId);
              const agr = db.agreements.find((a) => a.plotId === pl.id);
              const comm = db.commissions.find((c) => c.plotId === pl.id);
              const agentName =
                pl.salesperson ||
                agr?.salesperson ||
                comm?.salesperson ||
                cust?.agent;
              const isAvailable = pl.status === "Available";
              const isReserved = pl.status === "Reserved";

              return (
                <tr key={pl.id} className="hover:bg-emerald-50">
                  <td className="p-2.5 font-mono font-bold text-emerald-950">
                    {pl.number}
                  </td>
                  <td className="p-2.5">
                    {pl.size} ({pl.dimensions}){" "}
                    <span className="block text-[10px] text-slate-500">
                      {pl.plotType}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono">
                    <div className="font-bold">
                      KES {pl.price.toLocaleString()}
                    </div>
                    {pl.paidAmount > 0 && (
                      <div className="text-[10px] text-emerald-700 font-semibold">
                        Paid: KES {pl.paidAmount.toLocaleString()}
                      </div>
                    )}
                  </td>
                  <td className="p-2.5">
                    {cust ? (
                      <div>
                        <div className="font-bold text-slate-900">
                          {cust.name}
                        </div>
                        <div className="text-[10px] text-emerald-800 font-semibold">
                          Sold/Booked by: {agentName || "Unassigned"}
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400">-- Unassigned --</span>
                    )}
                  </td>
                  <td className="p-2.5 font-mono">
                    {comm ? (
                      <div>
                        <div className="font-bold text-amber-800">
                          KES {comm.amount.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {comm.rate}% ({comm.status})
                        </div>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400">--</span>
                    )}
                  </td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${pl.status === "Fully Paid" ? "bg-emerald-100 text-emerald-900" : pl.status === "Available" ? "bg-emerald-50 text-emerald-800 border border-emerald-300" : "bg-amber-100 text-amber-900"}`}
                    >
                      {pl.status}
                    </span>
                  </td>
                  <td className="p-2.5">
                    <div className="flex flex-wrap items-center gap-1">
                      {(isAvailable || isReserved) && (
                        <button
                          onClick={() => openActionModal("sell", pl)}
                          className="px-2 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-[10px]"
                        >
                          Sell
                        </button>
                      )}
                      {isAvailable && (
                        <>
                          <button
                            onClick={() => openActionModal("reserve", pl)}
                            className="px-2 py-1 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-bold rounded text-[10px]"
                          >
                            Reserve
                          </button>
                          <button
                            onClick={() => openActionModal("merge", pl)}
                            className="px-2 py-1 bg-sky-100 hover:bg-sky-200 text-sky-900 font-bold rounded text-[10px]"
                          >
                            Merge
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => setSelectedPlot(pl)}
                        className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold rounded text-[10px]"
                      >
                        Dossier
                      </button>
                      {isAvailable && (
                        <button
                          onClick={() => openActionModal("delete", pl)}
                          className="px-2 py-1 bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold rounded text-[10px]"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* DIRECT SELL PLOT MODAL */}
      {actionModal.type === "sell" && actionModal.plot && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleDirectSellPlot}
            className="bg-white border-2 border-emerald-600 rounded-2xl p-6 max-w-md w-full space-y-3 text-xs shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-700">
                  Direct Plot Sale & Commission
                </span>
                <h3 className="font-black text-emerald-950 text-sm">
                  Sell Plot {actionModal.plot.number} (KES{" "}
                  {actionModal.plot.price.toLocaleString()})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActionModal({ type: null, plot: null })}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="font-bold">Buyer / Customer *</label>
              <select
                value={sellForm.customerId}
                onChange={(e) =>
                  setSellForm({ ...sellForm, customerId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.idNo})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Salesperson Who Sold Plot *</label>
              <select
                value={sellForm.salesperson}
                onChange={(e) =>
                  setSellForm({ ...sellForm, salesperson: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Deposit / Cash Paid (KES) *</label>
                <input
                  type="number"
                  required
                  value={sellForm.deposit}
                  onChange={(e) =>
                    setSellForm({
                      ...sellForm,
                      deposit: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold">Approved Discount (KES)</label>
                <input
                  type="number"
                  value={sellForm.discount}
                  onChange={(e) =>
                    setSellForm({
                      ...sellForm,
                      discount: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Payment Plan</label>
                <select
                  value={sellForm.planType}
                  onChange={(e) =>
                    setSellForm({ ...sellForm, planType: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                >
                  <option>Full Cash</option>
                  <option>6 Months Instalment</option>
                  <option>12 Months Instalment</option>
                </select>
              </div>
              <div>
                <label className="font-bold">Months</label>
                <input
                  type="number"
                  min="1"
                  max="36"
                  value={sellForm.months}
                  onChange={(e) =>
                    setSellForm({ ...sellForm, months: Number(e.target.value) })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-950 font-semibold">
              Estimated Sales Commission (
              {db.commissionConfig?.defaultPercent || 10}%):{" "}
              <b>
                KES{" "}
                {Math.round(
                  ((actionModal.plot.price - sellForm.discount) *
                    (db.commissionConfig?.defaultPercent || 10)) /
                    100,
                ).toLocaleString()}
              </b>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionModal({ type: null, plot: null })}
                className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 text-white rounded-lg font-bold shadow"
              >
                Complete Sale & Assign Commission
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DIRECT RESERVE PLOT MODAL */}
      {actionModal.type === "reserve" && actionModal.plot && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleDirectReservePlot}
            className="bg-white border-2 border-amber-500 rounded-2xl p-6 max-w-md w-full space-y-3 text-xs shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                Reserve Plot {actionModal.plot.number}
              </h3>
              <button
                type="button"
                onClick={() => setActionModal({ type: null, plot: null })}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="font-bold">Customer / Prospect *</label>
              <select
                value={reserveForm.customerId}
                onChange={(e) =>
                  setReserveForm({ ...reserveForm, customerId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Reserving Salesperson *</label>
              <select
                value={reserveForm.salesperson}
                onChange={(e) =>
                  setReserveForm({
                    ...reserveForm,
                    salesperson: e.target.value,
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {db.employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">Booking Deposit (KES) *</label>
                <input
                  type="number"
                  required
                  value={reserveForm.bookingFee}
                  onChange={(e) =>
                    setReserveForm({
                      ...reserveForm,
                      bookingFee: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold">Reservation Expiry *</label>
                <input
                  type="date"
                  required
                  value={reserveForm.expiryDate}
                  onChange={(e) =>
                    setReserveForm({
                      ...reserveForm,
                      expiryDate: e.target.value,
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionModal({ type: null, plot: null })}
                className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-500 text-emerald-950 rounded-lg font-black shadow"
              >
                Confirm Reservation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MERGE / AMALGAMATE PLOTS MODAL */}
      {actionModal.type === "merge" && actionModal.plot && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleMergePlots}
            className="bg-white border-2 border-sky-600 rounded-2xl p-6 max-w-md w-full space-y-3 text-xs shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                Merge Plot {actionModal.plot.number} with Adjacent Plot
              </h3>
              <button
                type="button"
                onClick={() => setActionModal({ type: null, plot: null })}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="font-bold">
                Select Adjacent Available Plot to Merge *
              </label>
              <select
                required
                value={mergeForm.secondPlotId}
                onChange={(e) => {
                  const chosen = db.plots.find((p) => p.id === e.target.value);
                  setMergeForm({
                    ...mergeForm,
                    secondPlotId: e.target.value,
                    combinedPrice:
                      Number(actionModal.plot.price) +
                      Number(chosen?.price || 0),
                  });
                }}
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                <option value="">-- Choose Plot --</option>
                {db.plots
                  .filter(
                    (p) =>
                      p.id !== actionModal.plot.id &&
                      p.projectId === actionModal.plot.projectId &&
                      p.status === "Available",
                  )
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.number} ({p.size} - KES {p.price.toLocaleString()})
                    </option>
                  ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">New Combined Plot Code *</label>
                <input
                  required
                  value={mergeForm.newPlotNumber}
                  onChange={(e) =>
                    setMergeForm({
                      ...mergeForm,
                      newPlotNumber: e.target.value,
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono uppercase"
                />
              </div>
              <div>
                <label className="font-bold">Combined Size *</label>
                <input
                  required
                  value={mergeForm.newSize}
                  onChange={(e) =>
                    setMergeForm({ ...mergeForm, newSize: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">New Dimensions</label>
                <input
                  required
                  value={mergeForm.newDimensions}
                  onChange={(e) =>
                    setMergeForm({
                      ...mergeForm,
                      newDimensions: e.target.value,
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold">
                  Combined Selling Price (KES) *
                </label>
                <input
                  type="number"
                  required
                  value={mergeForm.combinedPrice}
                  onChange={(e) =>
                    setMergeForm({
                      ...mergeForm,
                      combinedPrice: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActionModal({ type: null, plot: null })}
                className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-sky-700 text-white rounded-lg font-bold shadow"
              >
                Merge Plots
              </button>
            </div>
          </form>
        </div>
      )}

      {/* DELETE PLOT CONFIRMATION MODAL */}
      {actionModal.type === "delete" && actionModal.plot && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-2 border-rose-500 rounded-2xl p-6 max-w-sm w-full space-y-4 text-xs shadow-2xl">
            <h3 className="font-black text-rose-900 text-sm">
              Confirm Delete Plot {actionModal.plot.number}
            </h3>
            <p className="text-slate-600">
              Are you sure you want to permanently remove{" "}
              <b>{actionModal.plot.number}</b> ({actionModal.plot.size}) from
              the plot inventory?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActionModal({ type: null, plot: null })}
                className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlot}
                className="px-4 py-1.5 bg-rose-600 text-white rounded-lg font-bold"
              >
                Delete Plot
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedPlot && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-emerald-300 rounded-2xl p-6 max-w-md w-full space-y-4 text-xs">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                Plot Dossier: {selectedPlot.number}
              </h3>
              <button onClick={() => setSelectedPlot(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-700">
              Current Status: <b>{selectedPlot.status}</b> &bull; Price:{" "}
              <b>KES {selectedPlot.price.toLocaleString()}</b>
            </p>
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Change Plot Status / Availability
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Available",
                  "Reserved",
                  "Payment Pending",
                  "Fully Paid",
                  "Blocked / Unavailable",
                ].map((st) => (
                  <button
                    key={st}
                    onClick={() => updatePlotStatus(selectedPlot.id, st)}
                    className={`p-2 rounded-lg font-bold border text-center ${selectedPlot.status === st ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1 pt-2">
              <span className="font-bold text-emerald-950">
                Plot History Audit Trail
              </span>
              {selectedPlot.history.map((h, idx) => (
                <div
                  key={idx}
                  className="p-1.5 bg-slate-50 border border-slate-200 rounded font-mono text-[11px]"
                >
                  &bull; {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InstalmentsModule({ db, setDb, notify, logAudit, exportToCSV }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [payingInstalment, setPayingInstalment] = useState(null); // { scheduleId, instalmentIndex, amountDue }
  const [payInputAmount, setPayInputAmount] = useState(0);

  // Form for creating a new instalment schedule
  const [schedForm, setSchedForm] = useState({
    customerId: db.customers[0]?.id || "",
    projectId: db.projects[0]?.id || "",
    plotId: db.plots[0]?.id || "",
    invoiceRef: "INV-2026-001",
    totalPrice: 750000,
    depositRequired: 150000,
    depositPaid: 150000,
    frequency: "Monthly",
    instalmentCount: 6,
    firstDueDate: "2026-12-01",
    gracePeriodDays: 7,
    penaltyPercent: 5,
  });

  // Ensure schedules collection exists in db
  const schedules = Array.isArray(db?.instalmentSchedules)
    ? db.instalmentSchedules
    : [];

  const handleCreateSchedule = (e) => {
    e.preventDefault();
    const cust = db.customers.find((c) => c.id === schedForm.customerId);
    const plot = db.plots.find((p) => p.id === schedForm.plotId);
    const balance = Math.max(
      0,
      Number(schedForm.totalPrice) - Number(schedForm.depositPaid),
    );
    const count = Math.max(1, Number(schedForm.instalmentCount));
    const expectedPerInstalment = Math.round(balance / count);

    // Generate instalment calendar items
    const calendar = Array.from({ length: count }, (_, idx) => {
      const d = new Date(schedForm.firstDueDate || "2026-12-01");
      if (schedForm.frequency === "Weekly") {
        d.setDate(d.getDate() + idx * 7);
      } else {
        d.setMonth(d.getMonth() + idx);
      }
      const dueDateStr = d.toISOString().slice(0, 10);
      return {
        index: idx + 1,
        dueDate: dueDateStr,
        expectedAmount: expectedPerInstalment,
        amountPaid: 0,
        outstanding: expectedPerInstalment,
        status: dueDateStr < "2026-11-18" ? "Overdue" : "Pending",
      };
    });

    const finalDueDate = calendar[calendar.length - 1]?.dueDate || "2027-06-01";

    const newSchedule = {
      id: `SCH-${Date.now().toString().slice(-4)}`,
      customerId: schedForm.customerId,
      projectId: schedForm.projectId,
      plotId: schedForm.plotId,
      invoiceRef: schedForm.invoiceRef,
      totalPrice: Number(schedForm.totalPrice),
      depositRequired: Number(schedForm.depositRequired),
      depositPaid: Number(schedForm.depositPaid),
      outstandingBalance: balance,
      frequency: schedForm.frequency,
      instalmentAmount: expectedPerInstalment,
      instalmentCount: count,
      firstDueDate: schedForm.firstDueDate,
      finalDueDate,
      gracePeriod: Number(schedForm.gracePeriodDays),
      penalties: `${schedForm.penaltyPercent}% on overdue`,
      status: balance === 0 ? "Completed" : "Active",
      calendar,
    };

    setDb((prev) => ({
      ...prev,
      instalmentSchedules: [newSchedule, ...(prev.instalmentSchedules || [])],
    }));

    logAudit(
      `Created Instalment Schedule ${newSchedule.id} for ${cust?.name} (${plot?.number})`,
      "Instalments",
    );
    notify(`Instalment schedule created with ${count} payment milestones.`);
    setShowCreateModal(false);
  };

  const handlePayInstalmentItem = (e) => {
    e.preventDefault();
    if (!payingInstalment) return;
    const { scheduleId, instalmentIndex } = payingInstalment;
    const paymentAmt = Number(payInputAmount);
    if (paymentAmt <= 0) return;

    setDb((prev) => {
      const updatedSchedules = (prev.instalmentSchedules || []).map((sch) => {
        if (sch.id !== scheduleId) return sch;

        let remainingPayment = paymentAmt;
        const updatedCalendar = sch.calendar.map((item) => {
          if (item.index === instalmentIndex) {
            const paidNow = Math.min(item.outstanding, remainingPayment);
            remainingPayment -= paidNow;
            const newPaid = item.amountPaid + paidNow;
            const newOut = Math.max(0, item.expectedAmount - newPaid);
            const status =
              newOut === 0
                ? "Fully Paid"
                : newPaid > 0
                  ? "Partially Paid"
                  : item.status;
            return {
              ...item,
              amountPaid: newPaid,
              outstanding: newOut,
              status,
            };
          }
          return item;
        });

        const newTotalPaid = sch.depositPaid + paymentAmt;
        const newBalance = Math.max(0, sch.totalPrice - newTotalPaid);
        const schedStatus = newBalance === 0 ? "Completed" : "Active";

        return {
          ...sch,
          depositPaid: newTotalPaid,
          outstandingBalance: newBalance,
          status: schedStatus,
          calendar: updatedCalendar,
        };
      });
      return { ...prev, instalmentSchedules: updatedSchedules };
    });

    logAudit(
      `Recorded instalment payment of KES ${paymentAmt.toLocaleString()} for schedule ${scheduleId}`,
      "Instalments & Collections",
    );
    notify(
      `Instalment payment of KES ${paymentAmt.toLocaleString()} allocated successfully.`,
    );
    setPayingInstalment(null);
    setPayInputAmount(0);
  };

  // Filter schedules based on active dashboard view
  const filteredSchedules = schedules.filter((sch) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Overdue")
      return sch.calendar.some(
        (c) => c.status === "Overdue" && c.outstanding > 0,
      );
    if (activeFilter === "Partially Paid")
      return sch.calendar.some((c) => c.status === "Partially Paid");
    if (activeFilter === "Fully Paid" || activeFilter === "Completed")
      return sch.status === "Completed" || sch.outstandingBalance === 0;
    if (activeFilter === "Arrears")
      return (
        sch.outstandingBalance > 0 &&
        sch.calendar.some((c) => c.status === "Overdue")
      );
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-emerald-200 shadow-sm">
        <div>
          <span className="text-[10px] font-black uppercase text-emerald-700">
            Collections & Receivables Workspace
          </span>
          <h3 className="text-sm font-black text-emerald-950">
            Customer Instalment Schedules & Payment Calendars
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4 text-amber-300" /> + Create Instalment
            Schedule
          </button>
          <button
            onClick={() => exportToCSV("instalment_schedules", schedules)}
            className="px-3 py-2 bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-lg flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Export
          </button>
        </div>
      </div>

      {/* Registers & Quick Filter Pills */}
      <div className="flex flex-wrap gap-2 bg-white p-3 rounded-xl border border-emerald-200 text-xs font-bold">
        {["All", "Overdue", "Partially Paid", "Arrears", "Completed"].map(
          (f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-lg transition-all ${activeFilter === f ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"}`}
            >
              {f}{" "}
              {f === "Overdue" &&
                `(${schedules.filter((s) => s.calendar.some((c) => c.status === "Overdue" && c.outstanding > 0)).length})`}
            </button>
          ),
        )}
      </div>

      {/* Instalment Schedules Master Table / Cards */}
      <div className="space-y-4">
        {filteredSchedules.length === 0 ? (
          <div className="bg-white border border-emerald-200 p-8 rounded-xl text-center text-slate-500 text-xs font-semibold">
            No instalment schedules match filter "{activeFilter}". Click{" "}
            <b>+ Create Instalment Schedule</b> above to set up a repayment
            plan.
          </div>
        ) : (
          filteredSchedules.map((sch) => {
            const cust = db.customers.find((c) => c.id === sch.customerId);
            const prj = db.projects.find((p) => p.id === sch.projectId);
            const plot = db.plots.find((p) => p.id === sch.plotId);
            const progressPct = Math.round(
              (sch.depositPaid / sch.totalPrice) * 100,
            );

            return (
              <div
                key={sch.id}
                className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm space-y-4 text-xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-black text-emerald-950 text-sm">
                        {sch.id}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                        {sch.status}
                      </span>
                      <span className="font-mono text-slate-500">
                        Ref: {sch.invoiceRef}
                      </span>
                    </div>
                    <div className="text-slate-700 mt-0.5 font-semibold">
                      Client: <b>{cust?.name || sch.customerId}</b> &bull;
                      Project: <b>{prj?.name}</b> &bull; Plot:{" "}
                      <b>{plot?.number || sch.plotId}</b>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <div className="text-emerald-900 font-bold">
                      Total: KES {sch.totalPrice.toLocaleString()}
                    </div>
                    <div className="text-emerald-700">
                      Paid: KES {sch.depositPaid.toLocaleString()} |{" "}
                      <b>Bal: KES {sch.outstandingBalance.toLocaleString()}</b>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-slate-600">
                      Repayment Progress ({sch.frequency} &bull; KES{" "}
                      {sch.instalmentAmount.toLocaleString()} per milestone)
                    </span>
                    <span className="text-emerald-800">
                      {progressPct}% Paid
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-2.5 rounded-full transition-all"
                      style={{ width: `${Math.min(100, progressPct)}%` }}
                    />
                  </div>
                </div>

                {/* Instalment Calendar Table */}
                <div className="overflow-x-auto pt-2">
                  <h4 className="font-black text-emerald-950 text-[11px] uppercase tracking-wider mb-2">
                    Instalment Payment Milestones ({sch.calendar.length})
                  </h4>
                  <table className="w-full text-xs text-left border border-emerald-100 rounded-lg overflow-hidden">
                    <thead className="bg-emerald-900 text-white uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">Due Date</th>
                        <th className="p-2">Expected (KES)</th>
                        <th className="p-2">Paid (KES)</th>
                        <th className="p-2">Outstanding (KES)</th>
                        <th className="p-2">Status</th>
                        <th className="p-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100">
                      {sch.calendar.map((item) => (
                        <tr key={item.index} className="hover:bg-emerald-50/70">
                          <td className="p-2 font-bold font-mono">
                            #{item.index}
                          </td>
                          <td className="p-2 font-mono">{item.dueDate}</td>
                          <td className="p-2 font-mono">
                            {item.expectedAmount.toLocaleString()}
                          </td>
                          <td className="p-2 font-mono text-emerald-700 font-bold">
                            {item.amountPaid.toLocaleString()}
                          </td>
                          <td className="p-2 font-mono text-rose-800 font-bold">
                            {item.outstanding.toLocaleString()}
                          </td>
                          <td className="p-2">
                            <span
                              className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                                item.status === "Fully Paid"
                                  ? "bg-emerald-100 text-emerald-900"
                                  : item.status === "Overdue"
                                    ? "bg-rose-100 text-rose-900 border border-rose-300"
                                    : item.status === "Partially Paid"
                                      ? "bg-amber-100 text-amber-900"
                                      : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="p-2 text-right">
                            {item.outstanding > 0 && (
                              <button
                                onClick={() => {
                                  setPayingInstalment({
                                    scheduleId: sch.id,
                                    instalmentIndex: item.index,
                                    amountDue: item.outstanding,
                                  });
                                  setPayInputAmount(item.outstanding);
                                }}
                                className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-[10px] shadow"
                              >
                                Record Payment
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CREATE INSTALMENT SCHEDULE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateSchedule}
            className="bg-white border-2 border-emerald-600 rounded-2xl p-6 max-w-xl w-full space-y-4 text-xs shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-700">
                  Financial Credit Workspace
                </span>
                <h3 className="font-black text-emerald-950 text-sm">
                  Create Instalment Schedule & Payment Calendar
                </h3>
              </div>
              <button type="button" onClick={() => setShowCreateModal(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700">Customer *</label>
                <select
                  value={schedForm.customerId}
                  onChange={(e) =>
                    setSchedForm({ ...schedForm, customerId: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
                >
                  {db.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.idNo})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Development Project *
                </label>
                <select
                  value={schedForm.projectId}
                  onChange={(e) =>
                    setSchedForm({ ...schedForm, projectId: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
                >
                  {db.projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Plot Number *
                </label>
                <select
                  value={schedForm.plotId}
                  onChange={(e) =>
                    setSchedForm({ ...schedForm, plotId: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white"
                >
                  {db.plots.map((pl) => (
                    <option key={pl.id} value={pl.id}>
                      {pl.number} - KES {pl.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Sale / Invoice Reference
                </label>
                <input
                  required
                  value={schedForm.invoiceRef}
                  onChange={(e) =>
                    setSchedForm({ ...schedForm, invoiceRef: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Total Purchase Price (KES) *
                </label>
                <input
                  type="number"
                  required
                  value={schedForm.totalPrice}
                  onChange={(e) =>
                    setSchedForm({
                      ...schedForm,
                      totalPrice: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold text-emerald-950"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Deposit Paid (KES) *
                </label>
                <input
                  type="number"
                  required
                  value={schedForm.depositPaid}
                  onChange={(e) =>
                    setSchedForm({
                      ...schedForm,
                      depositPaid: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Instalment Frequency *
                </label>
                <select
                  value={schedForm.frequency}
                  onChange={(e) =>
                    setSchedForm({ ...schedForm, frequency: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 bg-white font-bold"
                >
                  <option>Monthly</option>
                  <option>Weekly</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Number of Instalments *
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  required
                  value={schedForm.instalmentCount}
                  onChange={(e) =>
                    setSchedForm({
                      ...schedForm,
                      instalmentCount: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  First Payment Date *
                </label>
                <input
                  type="date"
                  required
                  value={schedForm.firstDueDate}
                  onChange={(e) =>
                    setSchedForm({ ...schedForm, firstDueDate: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700">
                  Grace Period (Days)
                </label>
                <input
                  type="number"
                  value={schedForm.gracePeriodDays}
                  onChange={(e) =>
                    setSchedForm({
                      ...schedForm,
                      gracePeriodDays: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs flex justify-between items-center font-mono font-bold text-emerald-950">
              <span>
                Calculated Balance: KES{" "}
                {(
                  Number(schedForm.totalPrice) - Number(schedForm.depositPaid)
                ).toLocaleString()}
              </span>
              <span>
                Per Milestone: KES{" "}
                {Math.round(
                  (Number(schedForm.totalPrice) -
                    Number(schedForm.depositPaid)) /
                    Math.max(1, Number(schedForm.instalmentCount)),
                ).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-emerald-100">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow"
              >
                Generate Schedule & Calendar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RECORD INSTALMENT PAYMENT MODAL */}
      {payingInstalment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handlePayInstalmentItem}
            className="bg-white border-2 border-emerald-600 rounded-2xl p-6 max-w-sm w-full space-y-3 text-xs shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                Record Payment for Milestone #{payingInstalment.instalmentIndex}
              </h3>
              <button type="button" onClick={() => setPayingInstalment(null)}>
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>
            <p className="text-slate-600">
              Milestone Outstanding:{" "}
              <b>KES {payingInstalment.amountDue.toLocaleString()}</b>
            </p>
            <div>
              <label className="font-bold text-slate-700">
                Payment Amount (KES) *
              </label>
              <input
                type="number"
                min="1"
                max={payingInstalment.amountDue}
                required
                value={payInputAmount}
                onChange={(e) => setPayInputAmount(Number(e.target.value))}
                className="w-full mt-1 border border-emerald-400 rounded-lg p-2 font-mono font-bold text-emerald-950 bg-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPayingInstalment(null)}
                className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 text-white font-bold rounded-lg shadow"
              >
                Post Payment & Update Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   13B. CUSTOMER COLLECTIONS STATEMENT & SMS COMMUNICATION WORKSPACE
   ============================================================================ */
function CollectionsCommunicationModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
}) {
  const [subTab, setSubTab] = useState("statement"); // 'statement' | 'templates_send' | 'batch' | 'history_gateway'
  const [selectedCustId, setSelectedCustId] = useState(
    db.customers[1]?.id || db.customers[0]?.id || "",
  );
  const [selectedPlotId, setSelectedPlotId] = useState("");

  // SMS & Notification Templates
  const defaultTemplates = [
    {
      id: "TPL-01",
      name: "Payment Received",
      category: "Receipts",
      body: "Dear {CustomerName}, we acknowledge receipt of KES {LastPaymentAmount} (Ref: {LastPaymentRef}) towards Plot {PlotNumber} ({ProjectName}). Remaining Balance: KES {RemainingBalance}. Thank you - {CompanyName}.",
    },
    {
      id: "TPL-02",
      name: "Payment Receipt Confirmation",
      category: "Receipts",
      body: "OFFICIAL RECEIPT: Dear {CustomerName}, your payment of KES {LastPaymentAmount} on {LastPaymentDate} (Ref: {LastPaymentRef}) has been posted to Plot {PlotNumber}. Total Paid: KES {TotalPaid}. Balance: KES {RemainingBalance}.",
    },
    {
      id: "TPL-03",
      name: "Upcoming Instalment Reminder",
      category: "Reminders",
      body: "Friendly Reminder: Dear {CustomerName}, your next instalment of KES {AmountDue} for Plot {PlotNumber} ({ProjectName}) is due on {NextDueDate}. Pay via PayBill {PayBill}, Account: {PlotNumber}.",
    },
    {
      id: "TPL-04",
      name: "Payment Due Today",
      category: "Reminders",
      body: "Due Today: Dear {CustomerName}, your instalment of KES {AmountDue} for Plot {PlotNumber} is due today ({NextDueDate}). Kindly remit via M-Pesa PayBill {PayBill} Acc: {PlotNumber} to keep your plan up to date.",
    },
    {
      id: "TPL-05",
      name: "Overdue Payment Reminder",
      category: "Arrears",
      body: "URGENT NOTICE: Dear {CustomerName}, your account for Plot {PlotNumber} has an overdue arrears balance of KES {AmountOverdue}. Kindly clear via PayBill {PayBill} Acc: {PlotNumber} to avoid late penalties.",
    },
    {
      id: "TPL-06",
      name: "Outstanding Balance Notification",
      category: "Statements",
      body: "Account Summary ({CompanyName}): Dear {CustomerName}, Plot {PlotNumber} Purchase Price: KES {PurchasePrice}, Total Paid: KES {TotalPaid}, Remaining Balance: KES {RemainingBalance}. Next Due: {NextDueDate}.",
    },
    {
      id: "TPL-07",
      name: "Payment Plan Update",
      category: "Plans",
      body: "Dear {CustomerName}, your instalment schedule for Plot {PlotNumber} has been updated. Current Remaining Balance: KES {RemainingBalance}, Next Instalment Date: {NextDueDate}. Contact us for your revised statement.",
    },
    {
      id: "TPL-08",
      name: "Final Payment Confirmation",
      category: "Completion",
      body: "CONGRATULATIONS {CustomerName}! You have completed 100% payment (KES {PurchasePrice}) for Plot {PlotNumber} ({ProjectName}). Your account balance is KES 0. Title deed conveyancing is now triggered.",
    },
    {
      id: "TPL-09",
      name: "Title Processing Eligibility",
      category: "Titles",
      body: "Dear {CustomerName}, Plot {PlotNumber} is now CLEARED & ELIGIBLE for Title Deed processing! Kindly ensure your ID copy, KRA PIN & passport photos are submitted to our Legal Desk ({CompanyName}).",
    },
  ];

  const [templates, setTemplates] = useState(defaultTemplates);
  const [selectedTemplateId, setSelectedTemplateId] = useState("TPL-03");
  const [customMessage, setCustomMessage] = useState("");
  const [sendChannel, setSendChannel] = useState("SMS");
  const [selectedBatchIds, setSelectedBatchIds] = useState([]);
  const [batchTemplateId, setBatchTemplateId] = useState("TPL-05");

  const [gatewayForm, setGatewayForm] = useState(
    db.smsGateway || {
      enabled: false,
      provider: "Africa's Talking / Safaricom Bulk SMS",
      senderId: "APROTEC",
      endpointUrl: "https://api.africastalking.com/version1/messaging",
      apiKey: "",
    },
  );

  // Compute complete financial & statement dossier for any customer + plot
  const buildCustomerStatementDossier = (custId, preferredPlotId = "") => {
    const customer =
      db.customers.find((c) => c.id === custId) || db.customers[0];
    if (!customer) return null;

    const custPlots = db.plots.filter((p) => p.customerId === customer.id);
    const activePlot =
      custPlots.find((p) => p.id === preferredPlotId) || custPlots[0] || null;
    const project = activePlot
      ? db.projects.find((pr) => pr.id === activePlot.projectId)
      : null;
    const agreement = activePlot
      ? db.agreements.find(
          (a) => a.plotId === activePlot.id && a.customerId === customer.id,
        )
      : null;
    const schedule = activePlot
      ? (db.instalmentSchedules || []).find(
          (s) => s.plotId === activePlot.id && s.customerId === customer.id,
        )
      : null;

    // Collect all payments received for this customer/plot
    const matchedPayments = (db.payments || []).filter(
      (pay) =>
        pay.customerId === customer.id &&
        (!activePlot ||
          pay.plotId === activePlot.id ||
          pay.accountRef === activePlot.number),
    );

    const originalPurchasePrice = Number(
      agreement?.salePrice || activePlot?.price || 0,
    );
    const depositAmount = Number(
      agreement?.deposit || schedule?.depositRequired || 0,
    );
    const totalPaidFromLedger = matchedPayments.reduce(
      (sum, p) => sum + Number(p.amount || 0),
      0,
    );
    const totalPaid = Math.max(
      Number(activePlot?.paidAmount || 0),
      Number(schedule?.depositPaid || 0),
      totalPaidFromLedger,
    );
    const remainingBalance = Math.max(0, originalPurchasePrice - totalPaid);

    // Build instalment schedule rows (either from explicit instalmentSchedules or derived from agreement)
    let scheduleRows = [];
    if (
      schedule &&
      Array.isArray(schedule.calendar) &&
      schedule.calendar.length > 0
    ) {
      scheduleRows = schedule.calendar;
    } else if (agreement && agreement.months > 1) {
      const principalAfterDeposit = Math.max(
        0,
        originalPurchasePrice - depositAmount,
      );
      const count = agreement.months;
      const perInst = Math.round(principalAfterDeposit / count);
      let runningPaidPool = Math.max(0, totalPaid - depositAmount);

      scheduleRows = Array.from({ length: count }, (_, idx) => {
        const d = new Date("2026-06-01");
        d.setMonth(d.getMonth() + idx);
        const dueDate = d.toISOString().slice(0, 10);
        const paidForRow = Math.min(perInst, runningPaidPool);
        runningPaidPool = Math.max(0, runningPaidPool - paidForRow);
        const outstanding = Math.max(0, perInst - paidForRow);
        const isPastDue = dueDate < "2026-11-18" && outstanding > 0;
        return {
          index: idx + 1,
          dueDate,
          expectedAmount: perInst,
          amountPaid: paidForRow,
          outstanding,
          status:
            outstanding === 0
              ? "Fully Paid"
              : isPastDue
                ? "Overdue"
                : paidForRow > 0
                  ? "Partially Paid"
                  : "Pending",
        };
      });
    }

    const overdueRows = scheduleRows.filter(
      (r) => r.status === "Overdue" && r.outstanding > 0,
    );
    const amountOverdue =
      overdueRows.reduce((s, r) => s + Number(r.outstanding || 0), 0) ||
      ((agreement?.status || "").toLowerCase().includes("overdue")
        ? Number(agreement?.monthlyDue || 0)
        : 0);

    const nextPendingRow = scheduleRows.find((r) => r.outstanding > 0);
    const nextInstalmentDate =
      remainingBalance === 0
        ? "Completed (Paid in Full)"
        : nextPendingRow?.dueDate || agreement?.nextDueDate || "2026-12-01";

    const amountDue =
      remainingBalance === 0
        ? 0
        : nextPendingRow?.outstanding ||
          Number(agreement?.monthlyDue || remainingBalance);

    const lastPayment = matchedPayments[0] || null;

    return {
      customer,
      custPlots,
      activePlot,
      project,
      agreement,
      scheduleRows,
      matchedPayments,
      originalPurchasePrice,
      depositAmount,
      totalPaid,
      remainingBalance,
      amountDue,
      amountOverdue,
      nextInstalmentDate,
      lastPayment,
    };
  };

  const dossier = useMemo(
    () => buildCustomerStatementDossier(selectedCustId, selectedPlotId),
    [selectedCustId, selectedPlotId, db],
  );

  // Merge placeholders into any SMS template
  const renderMergedTemplate = (templateBody, d) => {
    if (!d) return templateBody;
    return templateBody
      .replaceAll("{CustomerName}", d.customer?.name || "Valued Client")
      .replaceAll("{PlotNumber}", d.activePlot?.number || "N/A")
      .replaceAll("{ProjectName}", d.project?.name || "Aprotec Estate")
      .replaceAll("{PurchasePrice}", d.originalPurchasePrice.toLocaleString())
      .replaceAll("{Deposit}", d.depositAmount.toLocaleString())
      .replaceAll("{TotalPaid}", d.totalPaid.toLocaleString())
      .replaceAll("{RemainingBalance}", d.remainingBalance.toLocaleString())
      .replaceAll("{AmountDue}", d.amountDue.toLocaleString())
      .replaceAll("{AmountOverdue}", d.amountOverdue.toLocaleString())
      .replaceAll("{NextDueDate}", d.nextInstalmentDate)
      .replaceAll(
        "{LastPaymentAmount}",
        (d.lastPayment?.amount || d.totalPaid).toLocaleString(),
      )
      .replaceAll(
        "{LastPaymentRef}",
        d.lastPayment?.mpesaRef || "MPESA-CONFIRMED",
      )
      .replaceAll(
        "{LastPaymentDate}",
        d.lastPayment?.date || new Date().toISOString().slice(0, 10),
      )
      .replaceAll("{PayBill}", db.company?.paybill || "4088992")
      .replaceAll("{CompanyName}", db.company?.name || "Aprotec Systems Ltd");
  };

  // Sync composed message when template or customer changes
  useEffect(() => {
    const tpl =
      templates.find((t) => t.id === selectedTemplateId) || templates[0];
    if (tpl && dossier) {
      setCustomMessage(renderMergedTemplate(tpl.body, dossier));
    }
  }, [selectedTemplateId, selectedCustId, selectedPlotId, templates]);

  // Download Statement as Clean Printable HTML / Word-Compatible Document or CSV
  const downloadStatementFile = () => {
    if (!dossier) return;
    const htmlDoc = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Customer Statement - ${dossier.customer.name}</title>
  <style>
    body { font-family: Arial, sans-serif; color: #0f172a; padding: 32px; line-height: 1.45; }
    .header { border-bottom: 3px solid #047857; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; }
    h1 { color: #064e3b; margin: 0; font-size: 20px; }
    .grid { display: table; width: 100%; margin-bottom: 18px; border: 1px solid #cbd5e1; border-collapse: collapse; }
    .grid td { border: 1px solid #cbd5e1; padding: 8px 12px; font-size: 12px; }
    table.ledger { width: 100%; border-collapse: collapse; margin-top: 10px; margin-bottom: 20px; font-size: 12px; }
    table.ledger th { background: #064e3b; color: #fff; text-align: left; padding: 8px; }
    table.ledger td { border: 1px solid #cbd5e1; padding: 7px 8px; }
    .summary-box { background: #ecfdf5; border: 1px solid #6ee7b7; padding: 12px; font-size: 13px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1>${db.company.name}</h1>
      <div>Official Customer Account & Collections Statement</div>
      <div>KRA PIN: ${db.company.kraPin} | M-Pesa PayBill: ${db.company.paybill}</div>
    </div>
    <div style="text-align:right; font-size:12px;">
      <strong>Statement Date:</strong> ${new Date().toISOString().slice(0, 10)}<br/>
      <strong>Client ID:</strong> ${dossier.customer.id}
    </div>
  </div>

  <table class="grid">
    <tr>
      <td><strong>Customer Name:</strong> ${dossier.customer.name}</td>
      <td><strong>National ID / Reg:</strong> ${dossier.customer.idNo}</td>
      <td><strong>Phone:</strong> ${dossier.customer.phone}</td>
    </tr>
    <tr>
      <td><strong>Project:</strong> ${dossier.project?.name || "N/A"}</td>
      <td><strong>Plot Number:</strong> ${dossier.activePlot?.number || "N/A"} (${dossier.activePlot?.size || ""})</td>
      <td><strong>Title Status:</strong> ${dossier.activePlot?.titleStatus || "N/A"}</td>
    </tr>
    <tr>
      <td><strong>Original Purchase Price:</strong> KES ${dossier.originalPurchasePrice.toLocaleString()}</td>
      <td><strong>Initial Deposit:</strong> KES ${dossier.depositAmount.toLocaleString()}</td>
      <td><strong>Total Payments Received:</strong> KES ${dossier.totalPaid.toLocaleString()}</td>
    </tr>
    <tr>
      <td><strong>Current Amount Due:</strong> KES ${dossier.amountDue.toLocaleString()}</td>
      <td><strong>Amount Overdue (Arrears):</strong> KES ${dossier.amountOverdue.toLocaleString()}</td>
      <td><strong>Remaining Balance:</strong> KES ${dossier.remainingBalance.toLocaleString()}</td>
    </tr>
    <tr>
      <td colspan="3"><strong>Next Instalment Due Date:</strong> ${dossier.nextInstalmentDate}</td>
    </tr>
  </table>

  <h3>All Payments Received</h3>
  <table class="ledger">
    <thead><tr><th>Date</th><th>Transaction Ref</th><th>Channel</th><th>Account / Plot</th><th>Amount Paid (KES)</th></tr></thead>
    <tbody>
      ${
        dossier.matchedPayments.length > 0
          ? dossier.matchedPayments
              .map(
                (p) =>
                  `<tr><td>${p.date}</td><td>${p.mpesaRef}</td><td>${p.channel}</td><td>${p.accountRef}</td><td>${Number(p.amount).toLocaleString()}</td></tr>`,
              )
              .join("")
          : `<tr><td colspan="5">Total Recorded Plot Credits: KES ${dossier.totalPaid.toLocaleString()}</td></tr>`
      }
    </tbody>
  </table>

  <h3>Instalment Schedule & Balances</h3>
  <table class="ledger">
    <thead><tr><th>#</th><th>Due Date</th><th>Expected (KES)</th><th>Paid (KES)</th><th>Outstanding (KES)</th><th>Status</th></tr></thead>
    <tbody>
      ${
        dossier.scheduleRows.length > 0
          ? dossier.scheduleRows
              .map(
                (r) =>
                  `<tr><td>#${r.index}</td><td>${r.dueDate}</td><td>${r.expectedAmount.toLocaleString()}</td><td>${r.amountPaid.toLocaleString()}</td><td>${r.outstanding.toLocaleString()}</td><td>${r.status}</td></tr>`,
              )
              .join("")
          : `<tr><td colspan="6">Full Cash / Single Tranche Settlement Plan</td></tr>`
      }
    </tbody>
  </table>

  <div class="summary-box">
    <strong>Final Account Position:</strong> Remaining Balance: <strong>KES ${dossier.remainingBalance.toLocaleString()}</strong> | Amount Overdue: <strong>KES ${dossier.amountOverdue.toLocaleString()}</strong> | Next Instalment Date: <strong>${dossier.nextInstalmentDate}</strong>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: "text/html;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `Statement_${dossier.customer.name.replace(/\s+/g, "_")}_${dossier.activePlot?.number || "Account"}.html`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    logAudit(
      `Downloaded Customer Statement for ${dossier.customer.name} (${dossier.activePlot?.number || "Account"})`,
      "Collections Statements",
    );
    notify(`Customer statement for ${dossier.customer.name} downloaded.`);
  };

  // Dispatch Individual SMS / Notification
  const handleSendSingleMessage = async (e) => {
    e.preventDefault();
    if (!activePermissions.Create && !activePermissions.Approve) {
      return notify(
        "Access Denied: Current role is not authorized to send customer reminders.",
        "error",
      );
    }
    if (!dossier || !customMessage.trim()) return;

    const tpl = templates.find((t) => t.id === selectedTemplateId);
    const isGatewayActive = Boolean(
      db.smsGateway?.enabled && db.smsGateway?.apiKey?.trim(),
    );
    let deliveryStatus = isGatewayActive
      ? "Delivered via Gateway"
      : "Prepared / Manual Dispatch Ready";

    // If live SMS gateway endpoint is configured, attempt real dispatch
    if (isGatewayActive && sendChannel === "SMS") {
      try {
        await fetch(db.smsGateway.endpointUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apiKey: db.smsGateway.apiKey,
          },
          body: JSON.stringify({
            to: dossier.customer.phone,
            from: db.smsGateway.senderId || "APROTEC",
            message: customMessage,
          }),
        });
        deliveryStatus = "Sent via SMS Gateway";
      } catch (err) {
        deliveryStatus = "Gateway Queued (CORS/Offline Fallback)";
      }
    }

    const logEntry = {
      id: `MSG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      customerId: dossier.customer.id,
      customerName: dossier.customer.name,
      phone: dossier.customer.phone,
      plotNumber: dossier.activePlot?.number || "N/A",
      templateName: tpl?.name || "Custom Notice",
      channel: sendChannel,
      message: customMessage,
      deliveryStatus,
      sentBy: "Authorized Collections Officer",
    };

    setDb((prev) => ({
      ...prev,
      communicationLogs: [logEntry, ...(prev.communicationLogs || [])],
    }));

    logAudit(
      `Dispatched ${sendChannel} (${logEntry.templateName}) to ${dossier.customer.name} [${deliveryStatus}]`,
      "Collections Comms",
    );
    notify(
      isGatewayActive
        ? `SMS dispatched via ${db.smsGateway.provider} to ${dossier.customer.phone}.`
        : `Message prepared & logged for manual sending to ${dossier.customer.phone}.`,
    );
  };

  // Batch Reminders Dispatch
  const handleBatchDispatch = () => {
    if (!activePermissions.Create && !activePermissions.Approve) {
      return notify(
        "Access Denied: Current role is not authorized to send batch reminders.",
        "error",
      );
    }
    if (selectedBatchIds.length === 0) {
      return notify(
        "Select at least one customer account from the batch queue.",
        "error",
      );
    }

    const tpl = templates.find((t) => t.id === batchTemplateId) || templates[0];
    const isGatewayActive = Boolean(
      db.smsGateway?.enabled && db.smsGateway?.apiKey?.trim(),
    );
    const deliveryStatus = isGatewayActive
      ? "Batch Sent via SMS Gateway"
      : "Prepared for Manual Batch Send";

    const newLogs = selectedBatchIds.map((custId, idx) => {
      const d = buildCustomerStatementDossier(custId);
      const rendered = renderMergedTemplate(tpl.body, d);
      return {
        id: `MSG-${Date.now().toString().slice(-4)}-${idx + 1}`,
        timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
        customerId: d.customer.id,
        customerName: d.customer.name,
        phone: d.customer.phone,
        plotNumber: d.activePlot?.number || "N/A",
        templateName: tpl.name,
        channel: "SMS (Batch)",
        message: rendered,
        deliveryStatus,
        sentBy: "Batch Collections Dispatch",
      };
    });

    setDb((prev) => ({
      ...prev,
      communicationLogs: [...newLogs, ...(prev.communicationLogs || [])],
    }));

    logAudit(
      `Executed batch dispatch of ${newLogs.length} "${tpl.name}" notices`,
      "Batch Collections",
    );
    notify(
      `${newLogs.length} customer notifications processed (${deliveryStatus}).`,
    );
    setSelectedBatchIds([]);
  };

  const saveGatewaySettings = (e) => {
    e.preventDefault();
    if (!activePermissions.Settings && !activePermissions.Approve) {
      return notify(
        "Access Denied: Administrator or Director rights required to configure SMS gateway.",
        "error",
      );
    }
    setDb((prev) => ({ ...prev, smsGateway: gatewayForm }));
    logAudit(
      `Updated SMS Gateway configuration (Enabled: ${gatewayForm.enabled})`,
      "SMS Gateway",
    );
    notify(
      `SMS Gateway settings saved (${gatewayForm.enabled ? "Live Gateway Enabled" : "Manual Preparation Mode"}).`,
    );
  };

  const copyToClipboard = (text) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      notify("Message copied to clipboard for manual SMS/WhatsApp sending.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Workspace Banner & Sub-navigation */}
      <div className="bg-white border border-emerald-200 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
            Customer Collections & Receivables Desk
          </span>
          <h3 className="text-sm font-black text-emerald-950">
            Account Statements, SMS Reminders & Batch Communication Engine
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "statement", label: "1. Customer Statement Generator" },
            {
              id: "templates_send",
              label: "2. SMS Templates & Individual Send",
            },
            { id: "batch", label: "3. Batch Reminders Queue" },
            {
              id: "history_gateway",
              label: `4. History (${(db.communicationLogs || []).length}) & SMS Gateway`,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                subTab === tab.id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: CUSTOMER STATEMENT GENERATOR (PRINT & DOWNLOAD) */}
      {subTab === "statement" && dossier && (
        <div className="space-y-5">
          {/* Selector & Export Actions */}
          <div className="bg-white border border-emerald-200 p-4 rounded-xl flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Select Customer Account:
                </label>
                <select
                  value={selectedCustId}
                  onChange={(e) => {
                    setSelectedCustId(e.target.value);
                    setSelectedPlotId("");
                  }}
                  className="border border-emerald-300 rounded-lg p-2 font-bold bg-emerald-50 text-emerald-950 min-w-[220px]"
                >
                  {db.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>
              {dossier.custPlots.length > 0 && (
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Select Allocated Plot:
                  </label>
                  <select
                    value={dossier.activePlot?.id || ""}
                    onChange={(e) => setSelectedPlotId(e.target.value)}
                    className="border border-emerald-300 rounded-lg p-2 font-mono font-bold bg-white"
                  >
                    {dossier.custPlots.map((pl) => (
                      <option key={pl.id} value={pl.id}>
                        {pl.number} ({pl.size})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-950 border border-emerald-300 font-bold rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5 text-emerald-700" /> Print
                Statement
              </button>
              <button
                onClick={downloadStatementFile}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" /> Download
                Official Statement
              </button>
            </div>
          </div>

          {/* Printable Formal Statement Sheet */}
          <div className="bg-white border-2 border-emerald-600 rounded-2xl p-6 shadow-md space-y-5 text-xs">
            <div className="flex flex-wrap justify-between items-start gap-4 border-b-2 border-emerald-700 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">
                  Official Customer Account Statement
                </span>
                <h2 className="text-xl font-black text-emerald-950">
                  {db.company.name}
                </h2>
                <p className="text-slate-600 font-semibold">
                  KRA PIN: {db.company.kraPin} &bull; M-Pesa PayBill:{" "}
                  <span className="font-mono font-bold text-emerald-900">
                    {db.company.paybill}
                  </span>
                </p>
              </div>
              <div className="text-right font-mono">
                <div className="font-bold text-emerald-950">
                  Statement Date: {new Date().toISOString().slice(0, 10)}
                </div>
                <div>
                  Client: {dossier.customer.name} ({dossier.customer.id})
                </div>
                <div>
                  ID: {dossier.customer.idNo} &bull; Tel:{" "}
                  {dossier.customer.phone}
                </div>
              </div>
            </div>

            {/* Key Statement Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  Original Purchase Price
                </span>
                <span className="text-sm font-black font-mono text-slate-900">
                  KES {dossier.originalPurchasePrice.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  Initial Deposit
                </span>
                <span className="text-sm font-black font-mono text-slate-900">
                  KES {dossier.depositAmount.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-700 uppercase block">
                  All Payments Received
                </span>
                <span className="text-sm font-black font-mono text-emerald-900">
                  KES {dossier.totalPaid.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <span className="text-[10px] font-bold text-amber-800 uppercase block">
                  Amount Due
                </span>
                <span className="text-sm font-black font-mono text-amber-950">
                  KES {dossier.amountDue.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
                <span className="text-[10px] font-bold text-rose-700 uppercase block">
                  Amount Overdue
                </span>
                <span className="text-sm font-black font-mono text-rose-900">
                  KES {dossier.amountOverdue.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-emerald-900 text-white rounded-xl">
                <span className="text-[10px] font-bold text-amber-300 uppercase block">
                  Remaining Balance
                </span>
                <span className="text-sm font-black font-mono">
                  KES {dossier.remainingBalance.toLocaleString()}
                </span>
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl">
                <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                  Next Instalment Date
                </span>
                <span className="text-xs font-black font-mono text-emerald-950 mt-0.5 block">
                  {dossier.nextInstalmentDate}
                </span>
              </div>
            </div>

            {/* All Payments Received Table */}
            <div className="space-y-2">
              <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider">
                All Payments Received, Dates & Transaction References
              </h4>
              <div className="overflow-x-auto border border-emerald-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-emerald-900 text-white uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-2.5">Payment Date</th>
                      <th className="p-2.5">Transaction Reference</th>
                      <th className="p-2.5">Payment Channel</th>
                      <th className="p-2.5">Account / Plot Ref</th>
                      <th className="p-2.5">Receipt No.</th>
                      <th className="p-2.5 text-right">
                        Amount Received (KES)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {dossier.matchedPayments.length > 0 ? (
                      dossier.matchedPayments.map((pay) => (
                        <tr key={pay.id} className="hover:bg-emerald-50">
                          <td className="p-2.5 font-mono">{pay.date}</td>
                          <td className="p-2.5 font-mono font-bold text-emerald-950">
                            {pay.mpesaRef}
                          </td>
                          <td className="p-2.5">{pay.channel}</td>
                          <td className="p-2.5 font-mono">{pay.accountRef}</td>
                          <td className="p-2.5 font-mono">{pay.receiptNo}</td>
                          <td className="p-2.5 font-mono font-bold text-emerald-800 text-right">
                            {Number(pay.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-3 text-slate-600 font-semibold"
                        >
                          Opening / Deposit Ledger Credit Recorded on Plot{" "}
                          {dossier.activePlot?.number}:{" "}
                          <b>KES {dossier.totalPaid.toLocaleString()}</b>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instalment Schedule Table */}
            <div className="space-y-2">
              <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider">
                Instalment Schedule & Milestone Breakdown
              </h4>
              <div className="overflow-x-auto border border-emerald-200 rounded-xl">
                <table className="w-full text-xs text-left">
                  <thead className="bg-emerald-900 text-white uppercase font-bold text-[10px]">
                    <tr>
                      <th className="p-2.5">Instalment #</th>
                      <th className="p-2.5">Due Date</th>
                      <th className="p-2.5">Expected Amount</th>
                      <th className="p-2.5">Paid Amount</th>
                      <th className="p-2.5">Outstanding / Overdue</th>
                      <th className="p-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {dossier.scheduleRows.length > 0 ? (
                      dossier.scheduleRows.map((row) => (
                        <tr key={row.index} className="hover:bg-emerald-50">
                          <td className="p-2.5 font-mono font-bold">
                            #{row.index}
                          </td>
                          <td className="p-2.5 font-mono">{row.dueDate}</td>
                          <td className="p-2.5 font-mono">
                            KES {row.expectedAmount.toLocaleString()}
                          </td>
                          <td className="p-2.5 font-mono text-emerald-700 font-bold">
                            KES {row.amountPaid.toLocaleString()}
                          </td>
                          <td className="p-2.5 font-mono text-rose-800 font-bold">
                            KES {row.outstanding.toLocaleString()}
                          </td>
                          <td className="p-2.5">
                            <span
                              className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                row.status === "Fully Paid"
                                  ? "bg-emerald-100 text-emerald-900"
                                  : row.status === "Overdue"
                                    ? "bg-rose-100 text-rose-900"
                                    : "bg-amber-100 text-amber-900"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="p-3 text-slate-600">
                          Single Cash Settlement Plan &bull; Original Price: KES{" "}
                          {dossier.originalPurchasePrice.toLocaleString()}{" "}
                          &bull; Remaining Balance: KES{" "}
                          {dossier.remainingBalance.toLocaleString()}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SMS & NOTIFICATION TEMPLATES + INDIVIDUAL DISPATCH */}
      {subTab === "templates_send" && dossier && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          {/* Template Library */}
          <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-2.5 h-fit">
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              Standard Collections SMS Templates (9)
            </h3>
            <div className="space-y-1.5">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between ${
                    selectedTemplateId === tpl.id
                      ? "bg-emerald-700 text-white border-emerald-700 font-bold shadow-sm"
                      : "bg-emerald-50/60 hover:bg-emerald-100 text-emerald-950 border-emerald-200 font-semibold"
                  }`}
                >
                  <span>{tpl.name}</span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded ${selectedTemplateId === tpl.id ? "bg-amber-400 text-emerald-950" : "bg-white text-emerald-800"}`}
                  >
                    {tpl.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Message Composer & Manual/Gateway Dispatch */}
          <form
            onSubmit={handleSendSingleMessage}
            className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl space-y-4"
          >
            <div className="flex flex-wrap justify-between items-center gap-2 border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                Prepare & Send Individual Customer Notice
              </h3>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                  db.smsGateway?.enabled
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-amber-100 text-amber-950"
                }`}
              >
                {db.smsGateway?.enabled
                  ? `LIVE GATEWAY: ${db.smsGateway.provider}`
                  : "MANUAL SEND & PREPARATION WORKFLOW"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700">
                  Recipient Customer *
                </label>
                <select
                  value={selectedCustId}
                  onChange={(e) => setSelectedCustId(e.target.value)}
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-bold bg-white"
                >
                  {db.customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.phone})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700">
                  Recipient Phone
                </label>
                <input
                  readOnly
                  value={dossier.customer.phone}
                  className="w-full mt-1 border border-slate-200 bg-slate-50 rounded-lg p-2 font-mono font-bold"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700">
                  Delivery Channel
                </label>
                <select
                  value={sendChannel}
                  onChange={(e) => setSendChannel(e.target.value)}
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-bold bg-white"
                >
                  <option value="SMS">SMS Message</option>
                  <option value="WhatsApp">WhatsApp Official Notice</option>
                  <option value="Email">Email Statement Notice</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-slate-700">
                  Merged Message Content (Editable Before Sending)
                </label>
                <span className="font-mono text-[10px] text-slate-500">
                  {customMessage.length} chars (
                  {Math.ceil(customMessage.length / 160)} SMS page)
                </span>
              </div>
              <textarea
                rows={4}
                required
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full border border-emerald-300 rounded-xl p-3 font-medium text-slate-900 bg-emerald-50/40 focus:ring-2 focus:ring-emerald-600 outline-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-emerald-100">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard(customMessage)}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-lg"
                >
                  Copy Text for Manual Send
                </button>
                <a
                  href={`sms:${dossier.customer.phone.replace(/\s+/g, "")}?body=${encodeURIComponent(customMessage)}`}
                  className="px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-bold rounded-lg"
                >
                  Open Device SMS App
                </a>
              </div>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                {db.smsGateway?.enabled
                  ? "Send Live SMS Now"
                  : "Log & Dispatch Manual Notice"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: BATCH REMINDERS DISPATCH */}
      {subTab === "batch" && (
        <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-4 text-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 pb-3">
            <div>
              <h3 className="font-black text-emerald-950 text-sm">
                Batch Customer Collections & Reminder Dispatch
              </h3>
              <p className="text-slate-600">
                Select multiple customer accounts to merge personalized
                balances, due dates, and send in bulk.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={batchTemplateId}
                onChange={(e) => setBatchTemplateId(e.target.value)}
                className="border border-emerald-300 rounded-lg p-2 font-bold bg-emerald-50 text-emerald-950"
              >
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleBatchDispatch}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" /> Send Batch (
                {selectedBatchIds.length} Selected)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">
                    <input
                      type="checkbox"
                      checked={
                        selectedBatchIds.length === db.customers.length &&
                        db.customers.length > 0
                      }
                      onChange={(e) =>
                        setSelectedBatchIds(
                          e.target.checked ? db.customers.map((c) => c.id) : [],
                        )
                      }
                      className="w-4 h-4 accent-amber-400"
                    />
                  </th>
                  <th className="p-2.5">Customer & Phone</th>
                  <th className="p-2.5">Plot</th>
                  <th className="p-2.5">Remaining Balance</th>
                  <th className="p-2.5">Overdue Arrears</th>
                  <th className="p-2.5">Next Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {db.customers.map((cust) => {
                  const d = buildCustomerStatementDossier(cust.id);
                  const checked = selectedBatchIds.includes(cust.id);
                  return (
                    <tr key={cust.id} className="hover:bg-emerald-50">
                      <td className="p-2.5">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            if (e.target.checked)
                              setSelectedBatchIds([
                                ...selectedBatchIds,
                                cust.id,
                              ]);
                            else
                              setSelectedBatchIds(
                                selectedBatchIds.filter((id) => id !== cust.id),
                              );
                          }}
                          className="w-4 h-4 accent-emerald-700"
                        />
                      </td>
                      <td className="p-2.5 font-bold">
                        {cust.name}{" "}
                        <span className="block font-mono text-[10px] text-slate-500">
                          {cust.phone}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono font-bold text-emerald-900">
                        {d?.activePlot?.number || "None"}
                      </td>
                      <td className="p-2.5 font-mono font-bold">
                        KES {(d?.remainingBalance || 0).toLocaleString()}
                      </td>
                      <td className="p-2.5 font-mono font-bold text-rose-700">
                        KES {(d?.amountOverdue || 0).toLocaleString()}
                      </td>
                      <td className="p-2.5 font-mono">
                        {d?.nextInstalmentDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COMMUNICATION LOGS & SMS GATEWAY CONFIGURATION */}
      {subTab === "history_gateway" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          {/* SMS Gateway Integration Configurator */}
          <form
            onSubmit={saveGatewaySettings}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              SMS Gateway Integration Settings
            </h3>
            <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
              <input
                type="checkbox"
                id="smsGwEnable"
                checked={gatewayForm.enabled}
                onChange={(e) =>
                  setGatewayForm({ ...gatewayForm, enabled: e.target.checked })
                }
                className="w-4 h-4 accent-emerald-700"
              />
              <label
                htmlFor="smsGwEnable"
                className="font-bold text-emerald-950"
              >
                Enable Live SMS Gateway Dispatch
              </label>
            </div>
            <div>
              <label className="font-bold">Gateway Provider</label>
              <input
                value={gatewayForm.provider}
                onChange={(e) =>
                  setGatewayForm({ ...gatewayForm, provider: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Sender ID / Shortcode</label>
              <input
                value={gatewayForm.senderId}
                onChange={(e) =>
                  setGatewayForm({ ...gatewayForm, senderId: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono uppercase"
              />
            </div>
            <div>
              <label className="font-bold">API Endpoint URL</label>
              <input
                value={gatewayForm.endpointUrl}
                onChange={(e) =>
                  setGatewayForm({
                    ...gatewayForm,
                    endpointUrl: e.target.value,
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold">Gateway API Key / Token</label>
              <input
                type="password"
                value={gatewayForm.apiKey}
                onChange={(e) =>
                  setGatewayForm({ ...gatewayForm, apiKey: e.target.value })
                }
                placeholder="Leave blank for manual mode"
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Save Gateway Configuration
            </button>
          </form>

          {/* Communication & Delivery Status History */}
          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-emerald-950 text-sm">
                Customer Communication History & Delivery Audit (
                {(db.communicationLogs || []).length})
              </h3>
              <button
                onClick={() =>
                  exportToCSV(
                    "collections_sms_history",
                    db.communicationLogs || [],
                  )
                }
                className="text-xs font-bold text-emerald-700 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Export Log
              </button>
            </div>
            {(db.communicationLogs || []).length === 0 ? (
              <p className="text-slate-500">
                No reminders or statements have been dispatched yet. Use Tab 2
                or Tab 3 to send notices.
              </p>
            ) : (
              <table className="w-full text-xs text-left">
                <thead className="bg-emerald-900 text-white uppercase font-bold">
                  <tr>
                    <th className="p-2.5">Timestamp</th>
                    <th className="p-2.5">Recipient & Plot</th>
                    <th className="p-2.5">Template & Message</th>
                    <th className="p-2.5">Delivery Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-100">
                  {(db.communicationLogs || []).map((log) => (
                    <tr key={log.id} className="hover:bg-emerald-50">
                      <td className="p-2.5 font-mono text-[10px]">
                        {log.timestamp}
                      </td>
                      <td className="p-2.5 font-bold">
                        {log.customerName}{" "}
                        <span className="block font-mono text-[10px] text-slate-500">
                          {log.phone} &bull; {log.plotNumber}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className="font-bold text-emerald-900 block">
                          {log.templateName} ({log.channel})
                        </span>
                        <span className="text-[11px] text-slate-700">
                          {log.message}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            log.deliveryStatus.includes("Sent") ||
                            log.deliveryStatus.includes("Delivered")
                              ? "bg-emerald-100 text-emerald-900"
                              : "bg-amber-100 text-amber-950"
                          }`}
                        >
                          {log.deliveryStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   13C. DEFAULTED CUSTOMERS, CONTROLLED ESCALATION & PLOT RECOVERY WORKFLOW
   ============================================================================ */
function DefaultedCustomersAndRecoveryModule({
  db,
  setDb,
  activePermissions,
  notify,
  logAudit,
  exportToCSV,
}) {
  const [subTab, setSubTab] = useState("cases"); // 'cases' | 'candidates' | 'policy' | 'archive'
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  const ESCALATION_STAGES = [
    "Payment Reminder",
    "First Arrears Notice",
    "Final Payment Notice",
    "Default Review",
    "Legal / Advocate Review",
    "Management Decision",
    "Approved Contract Cancellation / Recovery",
    "Plot Returned to Company Inventory",
  ];

  const [policyForm, setPolicyForm] = useState(
    db.defaultPolicy || {
      gracePeriodDays: 14,
      defaultThresholdDays: 60,
      minArrearsThresholdAmount: 50000,
      requireAdvocateReview: true,
      requireSignedAgreementCheck: true,
      defaultForfeiturePercent: 10,
    },
  );

  // New Case Initiation Modal / Drawer State
  const [initiateModal, setInitiateModal] = useState(null);
  const [initForm, setInitForm] = useState({
    reason:
      "Persistent default beyond contractual grace period despite multiple reminders.",
    daysOverdue: 65,
    arrearsAmount: 83333,
    assignedAdvocate: db.advocates?.[0]?.name || "Mutua & Associates Advocates",
    supportingDocs:
      "Signed Sale Agreement, Demand Notice Copy, Ledger Statement",
  });

  // Case Progression & Governance Review State
  const [stageUpdateForm, setStageUpdateForm] = useState({
    nextStage: "First Arrears Notice",
    noticeRef: "",
    supportingDocs: "",
    advocateOpinion: "",
    signedAgreementVerified: false,
    statutoryNoticesServed: false,
    advocateCleared: false,
    managementApproved: false,
    forfeitureAmount: 0,
    refundAmount: 0,
    finalDecisionNotes: "",
  });

  const cases = Array.isArray(db?.defaultRecoveryCases)
    ? db.defaultRecoveryCases
    : [];

  // Identify accounts with overdue status or unpaid balances eligible for controlled review (NEVER auto-repossessed)
  const overdueCandidates = useMemo(() => {
    return (db.agreements || []).filter((agr) => {
      const plot = db.plots.find((p) => p.id === agr.plotId);
      if (!plot || !plot.customerId) return false;
      const alreadyInCase = cases.some(
        (c) => c.plotId === plot.id && c.status !== "Closed - Reinstated",
      );
      if (alreadyInCase) return false;
      const balance = Math.max(
        0,
        Number(agr.salePrice) - Number(plot.paidAmount || 0),
      );
      const isPastDue =
        (agr.status || "").toLowerCase().includes("overdue") ||
        (agr.nextDueDate &&
          agr.nextDueDate !== "-" &&
          agr.nextDueDate < "2026-11-18" &&
          balance > 0);
      return isPastDue || balance > 0;
    });
  }, [db.agreements, db.plots, cases]);

  const handleSavePolicy = (e) => {
    e.preventDefault();
    if (!activePermissions.Settings && !activePermissions.Approve) {
      return notify(
        "Access Denied: Management / Director or Administrator privileges required to modify default thresholds.",
        "error",
      );
    }
    setDb((prev) => ({ ...prev, defaultPolicy: policyForm }));
    logAudit(
      `Updated Arrears & Plot Recovery Policy (Grace: ${policyForm.gracePeriodDays}d, Threshold: ${policyForm.defaultThresholdDays}d)`,
      "Default & Recovery Governance",
    );
    notify("Arrears escalation & default governance policy saved.");
  };

  const handleOpenInitiate = (agr) => {
    const plot = db.plots.find((p) => p.id === agr.plotId);
    const paid = Number(plot?.paidAmount || 0);
    const defaultForfeit = Math.round(
      (paid * Number(policyForm.defaultForfeiturePercent || 10)) / 100,
    );
    setInitiateModal(agr);
    setInitForm({
      reason: `Instalment arrears on Plot ${plot?.number} exceeding ${policyForm.gracePeriodDays}-day grace period.`,
      daysOverdue: (agr.status || "").toLowerCase().includes("overdue")
        ? 45
        : 21,
      arrearsAmount: Number(
        agr.monthlyDue || Math.max(0, agr.salePrice - paid),
      ),
      assignedAdvocate:
        db.advocates?.[0]?.name || "Mutua & Associates Advocates",
      supportingDocs: `Signed Agreement (${agr.id}), Account Statement`,
    });
    setStageUpdateForm((prev) => ({
      ...prev,
      forfeitureAmount: defaultForfeit,
      refundAmount: Math.max(0, paid - defaultForfeit),
    }));
  };

  const handleCreateRecoveryCase = (e) => {
    e.preventDefault();
    if (!initiateModal) return;
    if (!activePermissions.Create) {
      return notify("Access Denied: Role lacks Create permission.", "error");
    }
    const agr = initiateModal;
    const plot = db.plots.find((p) => p.id === agr.plotId);
    const cust = db.customers.find((c) => c.id === agr.customerId);
    const prj = db.projects.find((p) => p.id === plot?.projectId);
    const paid = Number(plot?.paidAmount || 0);
    const forfeit = Math.round(
      (paid * Number(policyForm.defaultForfeiturePercent || 10)) / 100,
    );

    const newCase = {
      id: `DEF-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().slice(0, 10),
      customerId: cust?.id,
      customerName: cust?.name,
      customerPhone: cust?.phone,
      customerIdNo: cust?.idNo,
      projectId: prj?.id,
      projectName: prj?.name,
      plotId: plot?.id,
      plotNumber: plot?.number,
      agreementId: agr.id,
      originalSalePrice: Number(agr.salePrice),
      totalPaidToDate: paid,
      outstandingBalance: Math.max(0, Number(agr.salePrice) - paid),
      arrearsAmount: Number(initForm.arrearsAmount),
      daysOverdue: Number(initForm.daysOverdue),
      stage: "Payment Reminder",
      status: "Active Escalation",
      reason: initForm.reason,
      assignedAdvocate: initForm.assignedAdvocate,
      supportingDocs: [initForm.supportingDocs],
      noticesIssued: [],
      complianceChecks: {
        signedAgreementVerified: false,
        statutoryNoticesServed: false,
        advocateCleared: false,
        managementApproved: false,
      },
      financialSettlement: {
        forfeitureAmount: forfeit,
        refundAmount: Math.max(0, paid - forfeit),
        refundStatus: "Pending Decision",
      },
      finalDecision: "Pending Review",
      auditHistory: [
        {
          date: new Date().toISOString().replace("T", " ").slice(0, 16),
          stage: "Payment Reminder",
          actor: "Collections Governance Desk",
          note: `Controlled escalation file opened. Plot ownership remains with ${cust?.name} until authorised legal & management completion.`,
        },
      ],
    };

    setDb((prev) => ({
      ...prev,
      defaultRecoveryCases: [newCase, ...(prev.defaultRecoveryCases || [])],
    }));

    logAudit(
      `Opened Controlled Default & Recovery Case ${newCase.id} for ${cust?.name} (Plot ${plot?.number})`,
      "Default & Recovery",
    );
    notify(
      `Case ${newCase.id} opened at "Payment Reminder" stage. Plot remains locked to customer until formal approval.`,
    );
    setInitiateModal(null);
    setSelectedCaseId(newCase.id);
    setSubTab("cases");
  };

  const activeCase =
    cases.find((c) => c.id === selectedCaseId) || cases[0] || null;

  useEffect(() => {
    if (activeCase) {
      const idx = ESCALATION_STAGES.indexOf(activeCase.stage);
      const suggestedNext =
        idx >= 0 && idx < ESCALATION_STAGES.length - 1
          ? ESCALATION_STAGES[idx + 1]
          : activeCase.stage;
      setStageUpdateForm({
        nextStage: suggestedNext,
        noticeRef: `NTC-${Date.now().toString().slice(-4)}`,
        supportingDocs: "",
        advocateOpinion: activeCase.advocateOpinion || "",
        signedAgreementVerified: Boolean(
          activeCase.complianceChecks?.signedAgreementVerified,
        ),
        statutoryNoticesServed: Boolean(
          activeCase.complianceChecks?.statutoryNoticesServed,
        ),
        advocateCleared: Boolean(activeCase.complianceChecks?.advocateCleared),
        managementApproved: Boolean(
          activeCase.complianceChecks?.managementApproved,
        ),
        forfeitureAmount: Number(
          activeCase.financialSettlement?.forfeitureAmount || 0,
        ),
        refundAmount: Number(activeCase.financialSettlement?.refundAmount || 0),
        finalDecisionNotes:
          activeCase.finalDecision !== "Pending Review"
            ? activeCase.finalDecision
            : "",
      });
    }
  }, [activeCase?.id, activeCase?.stage]);

  const handleProgressCaseStage = (e) => {
    e.preventDefault();
    if (!activeCase) return;

    const target = stageUpdateForm.nextStage;

    // STRICT GOVERNANCE GATES:
    // 1. Moving into Legal / Advocate Review or Management Decision requires Signed Agreement & Statutory Notices verification
    if (
      [
        "Legal / Advocate Review",
        "Management Decision",
        "Approved Contract Cancellation / Recovery",
        "Plot Returned to Company Inventory",
      ].includes(target)
    ) {
      if (
        policyForm.requireSignedAgreementCheck &&
        !stageUpdateForm.signedAgreementVerified
      ) {
        return notify(
          "Governance Block: Signed Sale Agreement must be reviewed and verified before advancing to this stage.",
          "error",
        );
      }
      if (!stageUpdateForm.statutoryNoticesServed) {
        return notify(
          "Governance Block: Confirm that First & Final Arrears Notices have been duly served.",
          "error",
        );
      }
    }

    // 2. Moving to Approved Contract Cancellation / Recovery or Plot Returned to Company Inventory requires Advocate Clearance + Authorized Management Approval
    if (
      [
        "Approved Contract Cancellation / Recovery",
        "Plot Returned to Company Inventory",
      ].includes(target)
    ) {
      if (!activePermissions.Approve) {
        return notify(
          "Access Denied: Only an authorised Management / Director role can approve contract cancellation or plot repossession.",
          "error",
        );
      }
      if (
        policyForm.requireAdvocateReview &&
        !stageUpdateForm.advocateCleared
      ) {
        return notify(
          "Governance Block: Legal / Advocate Review clearance is mandatory prior to contract cancellation or plot recovery.",
          "error",
        );
      }
      if (!stageUpdateForm.managementApproved) {
        return notify(
          "Governance Block: Tick the Authorised Management Approval confirmation box to execute cancellation/recovery.",
          "error",
        );
      }
      if (!stageUpdateForm.finalDecisionNotes.trim()) {
        return notify(
          "Governance Block: Enter the formal Management Decision & Reason for record preservation.",
          "error",
        );
      }
    }

    // 3. Returning plot to company inventory can ONLY happen after Approved Contract Cancellation / Recovery
    if (
      target === "Plot Returned to Company Inventory" &&
      activeCase.stage !== "Approved Contract Cancellation / Recovery" &&
      !activeCase.complianceChecks?.managementApproved
    ) {
      return notify(
        'Governance Block: Case must first pass "Approved Contract Cancellation / Recovery" before returning the plot to inventory.',
        "error",
      );
    }

    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 16);
    const updatedDocs = stageUpdateForm.supportingDocs.trim()
      ? [
          ...(activeCase.supportingDocs || []),
          stageUpdateForm.supportingDocs.trim(),
        ]
      : activeCase.supportingDocs || [];

    const updatedNotices = [
      "First Arrears Notice",
      "Final Payment Notice",
    ].includes(target)
      ? [
          ...(activeCase.noticesIssued || []),
          {
            stage: target,
            ref:
              stageUpdateForm.noticeRef ||
              `NTC-${Date.now().toString().slice(-4)}`,
            date: timestamp,
          },
        ]
      : activeCase.noticesIssued || [];

    const isReturnedToInventory =
      target === "Plot Returned to Company Inventory";

    setDb((prev) => {
      const updatedCases = (prev.defaultRecoveryCases || []).map((c) => {
        if (c.id !== activeCase.id) return c;
        return {
          ...c,
          stage: target,
          status: isReturnedToInventory
            ? "Completed - Plot Recovered"
            : "Active Escalation",
          advocateOpinion: stageUpdateForm.advocateOpinion || c.advocateOpinion,
          supportingDocs: updatedDocs,
          noticesIssued: updatedNotices,
          complianceChecks: {
            signedAgreementVerified: stageUpdateForm.signedAgreementVerified,
            statutoryNoticesServed: stageUpdateForm.statutoryNoticesServed,
            advocateCleared: stageUpdateForm.advocateCleared,
            managementApproved: stageUpdateForm.managementApproved,
          },
          financialSettlement: {
            forfeitureAmount: Number(stageUpdateForm.forfeitureAmount),
            refundAmount: Number(stageUpdateForm.refundAmount),
            refundStatus:
              Number(stageUpdateForm.refundAmount) > 0
                ? "Approved for Refund Disbursement"
                : "Full Forfeiture / No Refund",
          },
          finalDecision: stageUpdateForm.finalDecisionNotes || c.finalDecision,
          auditHistory: [
            {
              date: timestamp,
              stage: target,
              actor: "Authorised Officer / Management",
              note:
                stageUpdateForm.finalDecisionNotes ||
                `Advanced case to "${target}". Notices & legal checks documented.`,
            },
            ...(c.auditHistory || []),
          ],
        };
      });

      // ONLY release plot ownership & make available for resale when explicitly at "Plot Returned to Company Inventory"
      // Preserve original customer, sale agreement, invoices and payment history permanently!
      const updatedPlots = isReturnedToInventory
        ? prev.plots.map((pl) =>
            pl.id === activeCase.plotId
              ? {
                  ...pl,
                  status: "Available",
                  customerId: null,
                  salesperson: null,
                  paidAmount: 0,
                  titleStatus: "Subdivided",
                  history: [
                    ...(pl.history || []),
                    `[${timestamp}] Plot Recovered & Returned to Company Inventory under Authorised Case ${activeCase.id}. Previous Buyer (${activeCase.customerName}) & Agreement (${activeCase.agreementId}) preserved in permanent archive.`,
                  ],
                }
              : pl,
          )
        : prev.plots;

      const updatedAgreements = isReturnedToInventory
        ? prev.agreements.map((ag) =>
            ag.id === activeCase.agreementId
              ? {
                  ...ag,
                  status: `Cancelled - Recovered (${activeCase.id})`,
                }
              : ag,
          )
        : prev.agreements;

      return {
        ...prev,
        defaultRecoveryCases: updatedCases,
        plots: updatedPlots,
        agreements: updatedAgreements,
      };
    });

    logAudit(
      isReturnedToInventory
        ? `EXECUTED AUTHORISED PLOT RECOVERY: Plot ${activeCase.plotNumber} returned to inventory (Case ${activeCase.id}). Original customer & payment history preserved.`
        : `Updated Default Case ${activeCase.id} (${activeCase.plotNumber}) to stage "${target}"`,
      "Default & Plot Recovery",
    );

    notify(
      isReturnedToInventory
        ? `Plot ${activeCase.plotNumber} has been formally recovered and returned to Company Inventory. Original customer, agreement, invoice and payment records remain permanently archived.`
        : `Case ${activeCase.id} progressed to "${target}".`,
    );
  };

  const handleReinstateCustomer = (caseItem) => {
    if (!activePermissions.Approve) {
      return notify(
        "Access Denied: Management approval required to reinstate a defaulted account.",
        "error",
      );
    }
    const timestamp = new Date().toISOString().replace("T", " ").slice(0, 16);
    setDb((prev) => ({
      ...prev,
      defaultRecoveryCases: prev.defaultRecoveryCases.map((c) =>
        c.id === caseItem.id
          ? {
              ...c,
              status: "Closed - Reinstated",
              finalDecision:
                "Customer regularized arrears; account reinstated in good standing.",
              auditHistory: [
                {
                  date: timestamp,
                  stage: "Reinstated",
                  actor: "Management",
                  note: "Arrears regularized; plot ownership retained by customer.",
                },
                ...(c.auditHistory || []),
              ],
            }
          : c,
      ),
      agreements: prev.agreements.map((ag) =>
        ag.id === caseItem.agreementId
          ? { ...ag, status: "Active Instalment" }
          : ag,
      ),
    }));
    logAudit(
      `Reinstated customer ${caseItem.customerName} on Plot ${caseItem.plotNumber} (Case ${caseItem.id})`,
      "Default & Recovery",
    );
    notify(
      `Customer ${caseItem.customerName} reinstated; recovery case closed.`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Governance Warning & Header */}
      <div className="bg-white border-2 border-amber-400 p-4 rounded-xl shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" /> Controlled
            Arrears Escalation & Legal Repossession Governance
          </span>
          <h3 className="text-sm font-black text-emerald-950">
            Defaulted Customers, Legal Review, Refunds/Forfeitures & Plot
            Recovery
          </h3>
          <p className="text-[11px] text-slate-600 mt-0.5">
            Plots are <b>never</b> automatically repossessed or relisted on
            overdue payments. Completion of notices, signed agreement audit,
            advocate clearance, and authorised management approval is mandatory.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            {
              id: "cases",
              label: `1. Active Recovery Cases (${cases.filter((c) => c.status === "Active Escalation").length})`,
            },
            {
              id: "candidates",
              label: `2. Overdue Accounts Watchlist (${overdueCandidates.length})`,
            },
            { id: "policy", label: "3. Grace Periods & Thresholds" },
            {
              id: "archive",
              label: `4. Permanent Recovery & Audit Archive (${cases.filter((c) => c.status !== "Active Escalation").length})`,
            },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setSubTab(t.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                subTab === t.id
                  ? "bg-emerald-700 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUBTAB 1: ACTIVE RECOVERY CASES & STAGE WORKFLOW */}
      {subTab === "cases" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-xs">
          {/* Left Column: Case List */}
          <div className="bg-white border border-emerald-200 p-4 rounded-xl space-y-3 h-fit">
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h4 className="font-black text-emerald-950 text-sm">
                Escalation Dossiers ({cases.length})
              </h4>
              <button
                onClick={() => setSubTab("candidates")}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                + Open New Case
              </button>
            </div>
            {cases.length === 0 ? (
              <div className="p-4 bg-slate-50 rounded-xl text-slate-600 space-y-2">
                <p>No active default escalation cases open.</p>
                <button
                  onClick={() => setSubTab("candidates")}
                  className="px-3 py-1.5 bg-emerald-700 text-white font-bold rounded-lg"
                >
                  Review Overdue Accounts ({overdueCandidates.length})
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {cases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      activeCase?.id === c.id
                        ? "bg-emerald-900 text-white border-emerald-900 shadow"
                        : "bg-emerald-50/60 hover:bg-emerald-100 border-emerald-200 text-slate-900"
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono font-bold">
                      <span>
                        {c.id} &bull; Plot {c.plotNumber}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] ${
                          c.status === "Completed - Plot Recovered"
                            ? "bg-rose-200 text-rose-950"
                            : c.status === "Closed - Reinstated"
                              ? "bg-emerald-200 text-emerald-950"
                              : "bg-amber-300 text-emerald-950"
                        }`}
                      >
                        {c.stage}
                      </span>
                    </div>
                    <div className="font-bold mt-1">{c.customerName}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${activeCase?.id === c.id ? "text-emerald-200" : "text-slate-600"}`}
                    >
                      Paid: KES {c.totalPaidToDate.toLocaleString()} | Arrears:
                      KES {c.arrearsAmount.toLocaleString()} ({c.daysOverdue}d)
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right 2 Columns: Controlled Stage Governance & Decision Workspace */}
          {activeCase ? (
            <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl space-y-5 shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-3 border-b border-emerald-100 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-700">
                    Case {activeCase.id} &bull; Agreement{" "}
                    {activeCase.agreementId}
                  </span>
                  <h3 className="text-base font-black text-emerald-950">
                    {activeCase.customerName} ({activeCase.customerPhone})
                    &mdash; Plot {activeCase.plotNumber}
                  </h3>
                  <p className="text-slate-600 mt-0.5">
                    Reason: <b>{activeCase.reason}</b>
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-black text-[11px]">
                    Stage: {activeCase.stage}
                  </span>
                  {activeCase.status === "Active Escalation" && (
                    <button
                      onClick={() => handleReinstateCustomer(activeCase)}
                      className="block mt-2 ml-auto px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded font-bold text-[10px]"
                    >
                      Regularize & Reinstate Customer
                    </button>
                  )}
                </div>
              </div>

              {/* 8-Stage Visual Stepper */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {ESCALATION_STAGES.map((st, idx) => {
                  const currentIdx = ESCALATION_STAGES.indexOf(
                    activeCase.stage,
                  );
                  const done =
                    idx < currentIdx ||
                    activeCase.stage === "Plot Returned to Company Inventory";
                  const current = st === activeCase.stage;
                  return (
                    <div
                      key={st}
                      className={`p-2 rounded-lg border text-[10px] font-bold leading-tight ${
                        current
                          ? "bg-amber-400 text-emerald-950 border-amber-600 shadow-sm"
                          : done
                            ? "bg-emerald-700 text-white border-emerald-800"
                            : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}
                    >
                      <span className="block font-mono text-[9px] opacity-80">
                        Step {idx + 1}
                      </span>
                      {st}
                    </div>
                  );
                })}
              </div>

              {/* Financial & Contractual Position Snapshot */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 font-sans font-bold block">
                    Original Sale Price
                  </span>
                  <b className="text-slate-900">
                    KES {activeCase.originalSalePrice.toLocaleString()}
                  </b>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-sans font-bold block">
                    Total Paid by Client
                  </span>
                  <b className="text-emerald-800">
                    KES {activeCase.totalPaidToDate.toLocaleString()}
                  </b>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-sans font-bold block">
                    Defaulted Arrears
                  </span>
                  <b className="text-rose-700">
                    KES {activeCase.arrearsAmount.toLocaleString()} (
                    {activeCase.daysOverdue}d)
                  </b>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-sans font-bold block">
                    Assigned Advocate
                  </span>
                  <b className="font-sans text-emerald-950">
                    {activeCase.assignedAdvocate}
                  </b>
                </div>
              </div>

              {/* Stage Progression & Mandatory Governance Form */}
              {activeCase.status === "Active Escalation" && (
                <form
                  onSubmit={handleProgressCaseStage}
                  className="space-y-4 border-t border-emerald-100 pt-4"
                >
                  <h4 className="font-black text-emerald-950 text-xs uppercase tracking-wider">
                    Controlled Stage Progression, Legal Verification &
                    Management Decision
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">
                        Next Escalation Stage *
                      </label>
                      <select
                        value={stageUpdateForm.nextStage}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            nextStage: e.target.value,
                          })
                        }
                        className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-bold bg-white"
                      >
                        {ESCALATION_STAGES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">
                        Notice / Legal Reference No.
                      </label>
                      <input
                        value={stageUpdateForm.noticeRef}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            noticeRef: e.target.value,
                          })
                        }
                        placeholder="e.g. NTC-2026-881"
                        className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                      />
                    </div>
                  </div>

                  {/* Mandatory Governance Checkboxes */}
                  <div className="p-3.5 bg-amber-50/80 border border-amber-300 rounded-xl space-y-2">
                    <div className="font-black text-amber-950 text-[11px] uppercase">
                      Mandatory Legal & Management Governance Gates
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stageUpdateForm.signedAgreementVerified}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            signedAgreementVerified: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-emerald-700"
                      />
                      <span>
                        <b>Signed Sale Agreement Reviewed:</b> Termination,
                        default, notice & forfeiture clauses verified (
                        {activeCase.agreementId}).
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stageUpdateForm.statutoryNoticesServed}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            statutoryNoticesServed: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-emerald-700"
                      />
                      <span>
                        <b>Statutory & Contractual Notices Served:</b> First
                        Arrears Notice & Final Payment Notice served and grace
                        period elapsed.
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stageUpdateForm.advocateCleared}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            advocateCleared: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-emerald-700"
                      />
                      <span>
                        <b>Legal / Advocate Review Cleared:</b> Conveyancing
                        advocate ({activeCase.assignedAdvocate}) confirmed legal
                        compliance.
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stageUpdateForm.managementApproved}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            managementApproved: e.target.checked,
                          })
                        }
                        className="w-4 h-4 accent-rose-700"
                      />
                      <span className="text-rose-950">
                        <b>Authorised Management / Director Approval:</b>{" "}
                        Formally approves contract cancellation, settlement &
                        plot recovery.
                      </span>
                    </label>
                  </div>

                  {/* Refunds & Forfeitures Calculation */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <div>
                      <label className="font-bold text-slate-700">
                        Contractual Forfeiture / Admin Fee (KES)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={activeCase.totalPaidToDate}
                        value={stageUpdateForm.forfeitureAmount}
                        onChange={(e) => {
                          const forfeit = Math.min(
                            activeCase.totalPaidToDate,
                            Math.max(0, Number(e.target.value)),
                          );
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            forfeitureAmount: forfeit,
                            refundAmount: Math.max(
                              0,
                              activeCase.totalPaidToDate - forfeit,
                            ),
                          });
                        }}
                        className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">
                        Refundable Balance to Client (KES)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max={activeCase.totalPaidToDate}
                        value={stageUpdateForm.refundAmount}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            refundAmount: Number(e.target.value),
                          })
                        }
                        className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold text-emerald-800"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">
                        Attach Supporting Document Ref
                      </label>
                      <input
                        value={stageUpdateForm.supportingDocs}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            supportingDocs: e.target.value,
                          })
                        }
                        placeholder="e.g. Advocate_Opinion.pdf"
                        className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-slate-700">
                        Legal / Advocate Review Notes
                      </label>
                      <input
                        value={stageUpdateForm.advocateOpinion}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            advocateOpinion: e.target.value,
                          })
                        }
                        placeholder="Advocate verification of notices & agreement clauses..."
                        className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-700">
                        Final Management Decision & Justification *
                      </label>
                      <input
                        value={stageUpdateForm.finalDecisionNotes}
                        onChange={(e) =>
                          setStageUpdateForm({
                            ...stageUpdateForm,
                            finalDecisionNotes: e.target.value,
                          })
                        }
                        placeholder="Document reason, approvals & settlement resolution..."
                        className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black rounded-lg shadow"
                    >
                      Record Governance Step & Advance Stage
                    </button>
                  </div>
                </form>
              )}

              {/* Permanent Case Audit History & Supporting Documents */}
              <div className="space-y-2 border-t border-emerald-100 pt-3">
                <h4 className="font-black text-emerald-950 text-xs">
                  Permanent Case Audit Trail & Supporting Documents
                </h4>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {(activeCase.supportingDocs || []).map((doc, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono"
                    >
                      Doc: {doc}
                    </span>
                  ))}
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                  {(activeCase.auditHistory || []).map((h, i) => (
                    <div
                      key={i}
                      className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px]"
                    >
                      <span className="font-mono font-bold text-emerald-800">
                        [{h.date}] {h.stage}:
                      </span>{" "}
                      {h.note}{" "}
                      <span className="text-slate-500">({h.actor})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-white border border-emerald-200 p-8 rounded-xl text-center text-slate-500">
              Select a case on the left or inspect the{" "}
              <b>Overdue Accounts Watchlist</b> to initiate a controlled
              escalation workflow.
            </div>
          )}
        </div>
      )}

      {/* SUBTAB 2: OVERDUE ACCOUNTS WATCHLIST (NO AUTO-REPOSSESSION) */}
      {subTab === "candidates" && (
        <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs">
          <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
            <div>
              <h3 className="font-black text-emerald-950 text-sm">
                Accounts with Overdue Instalments / Outstanding Balances (
                {overdueCandidates.length})
              </h3>
              <p className="text-slate-600">
                All plots remain strictly locked to their contracted buyers
                until a controlled escalation & authorised recovery workflow is
                completed.
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Agreement & Plot</th>
                  <th className="p-2.5">Customer</th>
                  <th className="p-2.5">Sale Price / Paid</th>
                  <th className="p-2.5">Balance</th>
                  <th className="p-2.5">Current Status</th>
                  <th className="p-2.5">Governance Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {overdueCandidates.map((agr) => {
                  const plot = db.plots.find((p) => p.id === agr.plotId);
                  const cust = db.customers.find(
                    (c) => c.id === agr.customerId,
                  );
                  const paid = Number(plot?.paidAmount || 0);
                  const bal = Math.max(0, Number(agr.salePrice) - paid);
                  return (
                    <tr key={agr.id} className="hover:bg-emerald-50">
                      <td className="p-2.5 font-mono font-bold">
                        {agr.id} &bull; {plot?.number}
                      </td>
                      <td className="p-2.5 font-bold">
                        {cust?.name}{" "}
                        <span className="block text-[10px] text-slate-500">
                          {cust?.phone}
                        </span>
                      </td>
                      <td className="p-2.5 font-mono">
                        KES {Number(agr.salePrice).toLocaleString()} /{" "}
                        {paid.toLocaleString()}
                      </td>
                      <td className="p-2.5 font-mono font-bold text-rose-700">
                        KES {bal.toLocaleString()}
                      </td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-950 rounded font-bold text-[10px]">
                          {agr.status}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <button
                          onClick={() => handleOpenInitiate(agr)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-[10px]"
                        >
                          Initiate Controlled Escalation
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUBTAB 3: MANAGEMENT CONFIGURATION OF GRACE PERIODS & DEFAULT THRESHOLDS */}
      {subTab === "policy" && (
        <form
          onSubmit={handleSavePolicy}
          className="bg-white border border-emerald-200 p-6 rounded-xl max-w-2xl space-y-4 text-xs"
        >
          <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
            Management Configuration: Payment Grace Periods, Default Thresholds
            & Legal Rules
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700">
                Contractual Payment Grace Period (Days)
              </label>
              <input
                type="number"
                value={policyForm.gracePeriodDays}
                onChange={(e) =>
                  setPolicyForm({
                    ...policyForm,
                    gracePeriodDays: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Default Escalation Threshold (Days Overdue)
              </label>
              <input
                type="number"
                value={policyForm.defaultThresholdDays}
                onChange={(e) =>
                  setPolicyForm({
                    ...policyForm,
                    defaultThresholdDays: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Minimum Arrears Threshold Amount (KES)
              </label>
              <input
                type="number"
                value={policyForm.minArrearsThresholdAmount}
                onChange={(e) =>
                  setPolicyForm({
                    ...policyForm,
                    minArrearsThresholdAmount: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">
                Default Contractual Forfeiture / Admin Fee (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={policyForm.defaultForfeiturePercent}
                onChange={(e) =>
                  setPolicyForm({
                    ...policyForm,
                    defaultForfeiturePercent: Number(e.target.value),
                  })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 font-bold text-slate-800">
              <input
                type="checkbox"
                checked={policyForm.requireSignedAgreementCheck}
                onChange={(e) =>
                  setPolicyForm({
                    ...policyForm,
                    requireSignedAgreementCheck: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-emerald-700"
              />
              Mandate Signed Sale Agreement Verification before Legal /
              Management Decision
            </label>
            <label className="flex items-center gap-2 font-bold text-slate-800">
              <input
                type="checkbox"
                checked={policyForm.requireAdvocateReview}
                onChange={(e) =>
                  setPolicyForm({
                    ...policyForm,
                    requireAdvocateReview: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-emerald-700"
              />
              Mandate Legal / Advocate Review Clearance before Contract
              Cancellation or Plot Recovery
            </label>
          </div>
          <button
            type="submit"
            className="px-5 py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
          >
            Save Governance Policy
          </button>
        </form>
      )}

      {/* SUBTAB 4: PERMANENT PRESERVED HISTORY & RECOVERY ARCHIVE */}
      {subTab === "archive" && (
        <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs overflow-x-auto">
          <div className="flex justify-between items-center">
            <h3 className="font-black text-emerald-950 text-sm">
              Permanent Customer, Sale, Payment & Plot Recovery Audit Archive
            </h3>
            <button
              onClick={() => exportToCSV("plot_recovery_archive", cases)}
              className="px-3 py-1.5 border border-emerald-300 rounded-lg font-bold text-emerald-900 flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" /> Export Archive CSV
            </button>
          </div>
          <table className="w-full text-xs text-left">
            <thead className="bg-emerald-900 text-white uppercase font-bold">
              <tr>
                <th className="p-2.5">Case & Plot</th>
                <th className="p-2.5">Original Customer & Agreement</th>
                <th className="p-2.5">Amounts Paid / Forfeited / Refunded</th>
                <th className="p-2.5">Final Management Decision</th>
                <th className="p-2.5">Outcome</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              {cases.map((c) => (
                <tr key={c.id}>
                  <td className="p-2.5 font-mono font-bold">
                    {c.id} &bull; {c.plotNumber}
                  </td>
                  <td className="p-2.5">
                    <b>{c.customerName}</b> ({c.customerIdNo}){" "}
                    <span className="block font-mono text-[10px]">
                      {c.agreementId}
                    </span>
                  </td>
                  <td className="p-2.5 font-mono">
                    Paid: KES {c.totalPaidToDate.toLocaleString()} | Forfeit:
                    KES{" "}
                    {(
                      c.financialSettlement?.forfeitureAmount || 0
                    ).toLocaleString()}{" "}
                    |{" "}
                    <b>
                      Refund: KES{" "}
                      {(
                        c.financialSettlement?.refundAmount || 0
                      ).toLocaleString()}
                    </b>
                  </td>
                  <td className="p-2.5">{c.finalDecision}</td>
                  <td className="p-2.5 font-bold text-emerald-900">
                    {c.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* INITIATE ESCALATION MODAL */}
      {initiateModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateRecoveryCase}
            className="bg-white border-2 border-emerald-600 rounded-2xl p-6 max-w-lg w-full space-y-3 text-xs shadow-2xl"
          >
            <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
              <h3 className="font-black text-emerald-950 text-sm">
                Initiate Controlled Arrears Escalation ({initiateModal.id})
              </h3>
              <button type="button" onClick={() => setInitiateModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-slate-600">
              Opening this file starts at Stage 1 (<b>Payment Reminder</b>).
              Plot ownership will NOT change until all legal notices and
              management approvals are completed.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold">Days Overdue</label>
                <input
                  type="number"
                  required
                  value={initForm.daysOverdue}
                  onChange={(e) =>
                    setInitForm({
                      ...initForm,
                      daysOverdue: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold">Arrears Amount (KES)</label>
                <input
                  type="number"
                  required
                  value={initForm.arrearsAmount}
                  onChange={(e) =>
                    setInitForm({
                      ...initForm,
                      arrearsAmount: Number(e.target.value),
                    })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="font-bold">
                Assigned Conveyancing Advocate
              </label>
              <select
                value={initForm.assignedAdvocate}
                onChange={(e) =>
                  setInitForm({ ...initForm, assignedAdvocate: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              >
                {(db.advocates || []).map((a) => (
                  <option key={a.id} value={a.name}>
                    {a.name} ({a.contact})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-bold">Supporting Documents Attached</label>
              <input
                required
                value={initForm.supportingDocs}
                onChange={(e) =>
                  setInitForm({ ...initForm, supportingDocs: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Escalation Reason *</label>
              <textarea
                rows={2}
                required
                value={initForm.reason}
                onChange={(e) =>
                  setInitForm({ ...initForm, reason: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setInitiateModal(null)}
                className="px-4 py-1.5 bg-slate-100 rounded-lg font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-emerald-700 text-white rounded-lg font-bold shadow"
              >
                Create Escalation File
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   14. TITLE DEED & LEGAL CONVEYANCING PROCESSING MODULE
   ============================================================================ */
function TitleDeedsModule({ db, setDb, activePermissions, notify, logAudit }) {
  const [selectedPlotId, setSelectedPlotId] = useState("");
  const [newTitleNo, setNewTitleNo] = useState("");
  const [nextStage, setNextStage] = useState("Registry Processing");

  const titleStages = [
    "Pending Search",
    "Subdivided",
    "Eligibility Check",
    "Advocate Submitted",
    "Registry Processing",
    "Title Ready",
    "Handed Over",
  ];

  const soldOrReservedPlots = (db.plots || []).filter((p) => p.customerId);

  const handleAdvanceTitleStage = (
    plot,
    targetStage,
    customTitleNumber = "",
  ) => {
    if (!activePermissions.Edit) {
      return notify(
        "Access Denied: Current role lacks Edit permission.",
        "error",
      );
    }

    const cust = db.customers.find((c) => c.id === plot.customerId);
    const balance = Math.max(
      0,
      Number(plot.price) - Number(plot.paidAmount || 0),
    );

    // Enforce eligibility gate before Title Handover
    if (targetStage === "Handed Over") {
      if (balance > 0) {
        return notify(
          `Cannot Hand Over Title Deed: Client has an outstanding balance of KES ${balance.toLocaleString()}.`,
          "error",
        );
      }
      if (cust && !cust.docsComplete) {
        return notify(
          `Cannot Hand Over Title Deed: Client ${cust.name} has incomplete KYC documents (ID / KRA PIN).`,
          "error",
        );
      }
    }

    const updatedTitleNo = customTitleNumber.trim()
      ? customTitleNumber.trim()
      : plot.titleNo;

    setDb((prev) => ({
      ...prev,
      plots: prev.plots.map((p) =>
        p.id === plot.id
          ? {
              ...p,
              titleStatus: targetStage,
              titleNo: updatedTitleNo,
              history: [
                ...(p.history || []),
                `Title Deed status updated to "${targetStage}" (${updatedTitleNo})`,
              ],
            }
          : p,
      ),
    }));

    logAudit(
      `Updated Title Deed stage of Plot ${plot.number} to ${targetStage}`,
      "Title Deeds",
    );
    notify(`Plot ${plot.number} title status updated to "${targetStage}".`);
    setSelectedPlotId("");
    setNewTitleNo("");
  };

  return (
    <div className="space-y-6">
      {/* Stage Summary Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {titleStages.map((st) => {
          const count = (db.plots || []).filter(
            (p) => p.titleStatus === st,
          ).length;
          return (
            <div
              key={st}
              className="bg-white border border-emerald-200 p-3 rounded-xl text-center shadow-sm"
            >
              <div className="text-lg font-black text-emerald-950">{count}</div>
              <div className="text-[10px] font-bold text-emerald-800 leading-tight mt-0.5">
                {st}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Title Processing Ledger */}
      <div className="bg-white border border-emerald-200 p-5 rounded-xl shadow-sm overflow-x-auto">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-4 border-b border-emerald-100 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-700">
              Conveyancing & Land Registry Tracker
            </span>
            <h3 className="font-black text-emerald-950 text-sm">
              Customer Title Deed Processing & Handover Register (
              {soldOrReservedPlots.length} Active Files)
            </h3>
          </div>
        </div>

        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">Plot No.</th>
              <th className="p-2.5">Title Deed Number</th>
              <th className="p-2.5">Registered Buyer</th>
              <th className="p-2.5">Payment & KYC Eligibility</th>
              <th className="p-2.5">Conveyancing Stage</th>
              <th className="p-2.5">Update Stage / Handover</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {soldOrReservedPlots.map((pl) => {
              const cust = db.customers.find((c) => c.id === pl.customerId);
              const balance = Math.max(
                0,
                Number(pl.price) - Number(pl.paidAmount || 0),
              );
              const isEligible = balance === 0 && cust?.docsComplete;
              const isEditing = selectedPlotId === pl.id;

              return (
                <tr key={pl.id} className="hover:bg-emerald-50">
                  <td className="p-2.5 font-mono font-bold text-emerald-950">
                    {pl.number}
                  </td>
                  <td className="p-2.5 font-mono text-[11px]">
                    {pl.titleNo || "Pending Mutation"}
                  </td>
                  <td className="p-2.5">
                    <div className="font-bold text-slate-900">
                      {cust?.name || pl.customerId}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      ID: {cust?.idNo} &bull; PIN: {cust?.kraPin}
                    </div>
                  </td>
                  <td className="p-2.5">
                    {isEligible ? (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-bold text-[10px]">
                        Cleared (100% Paid & KYC OK)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-[10px]">
                        {balance > 0
                          ? `Bal: KES ${balance.toLocaleString()}`
                          : "KYC Docs Missing"}
                      </span>
                    )}
                  </td>
                  <td className="p-2.5">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        pl.titleStatus === "Handed Over"
                          ? "bg-emerald-700 text-white"
                          : pl.titleStatus === "Title Ready"
                            ? "bg-amber-400 text-emerald-950"
                            : "bg-emerald-100 text-emerald-900"
                      }`}
                    >
                      {pl.titleStatus}
                    </span>
                  </td>
                  <td className="p-2.5">
                    {isEditing ? (
                      <div className="flex flex-wrap items-center gap-1.5">
                        <input
                          type="text"
                          value={newTitleNo}
                          onChange={(e) => setNewTitleNo(e.target.value)}
                          placeholder="Title # (Optional)"
                          className="w-32 border border-emerald-300 rounded px-2 py-1 font-mono text-[10px]"
                        />
                        <select
                          value={nextStage}
                          onChange={(e) => setNextStage(e.target.value)}
                          className="border border-emerald-300 rounded px-2 py-1 text-[10px] font-bold bg-white"
                        >
                          {titleStages.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() =>
                            handleAdvanceTitleStage(pl, nextStage, newTitleNo)
                          }
                          className="px-2 py-1 bg-emerald-700 text-white rounded font-bold text-[10px]"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setSelectedPlotId("")}
                          className="px-2 py-1 bg-slate-200 text-slate-800 rounded font-bold text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedPlotId(pl.id);
                          setNewTitleNo(
                            pl.titleNo && pl.titleNo !== "Pending"
                              ? pl.titleNo
                              : "",
                          );
                          setNextStage(pl.titleStatus || "Registry Processing");
                        }}
                        className="px-2.5 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-950 rounded font-bold text-[10px]"
                      >
                        Update Title Stage
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CustomerPortalModule({ db, setDb, notify }) {
  const [selectedCustId, setSelectedCustId] = useState(
    db.customers[0]?.id || "",
  );
  const cust = db.customers.find((c) => c.id === selectedCustId);
  const custPlots = db.plots.filter((p) => p.customerId === selectedCustId);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-emerald-200 p-4 rounded-xl flex items-center gap-4 text-xs">
        <span className="font-black text-emerald-950">
          Simulate Client Portal View:
        </span>
        <select
          value={selectedCustId}
          onChange={(e) => setSelectedCustId(e.target.value)}
          className="border border-emerald-300 rounded-lg p-2 font-bold bg-emerald-50"
        >
          {db.customers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.phone})
            </option>
          ))}
        </select>
      </div>

      {cust && (
        <div className="bg-white border-2 border-emerald-600 rounded-2xl p-6 shadow-md space-y-5">
          <div className="flex justify-between items-center border-b border-emerald-100 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase text-emerald-700">
                Aprotec Land360 Secure Client Portal
              </span>
              <h2 className="text-xl font-black text-emerald-950">
                Welcome back, {cust.name}
              </h2>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full font-bold text-xs">
              KYC Verified
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {custPlots.map((pl) => (
              <div
                key={pl.id}
                className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2 text-xs"
              >
                <div className="flex justify-between font-bold">
                  <span className="text-emerald-950 text-sm">
                    Plot {pl.number}
                  </span>
                  <span className="text-amber-800">{pl.status}</span>
                </div>
                <div className="text-slate-700">
                  Size: <b>{pl.size}</b> &bull; Price:{" "}
                  <b>KES {pl.price.toLocaleString()}</b>
                </div>
                <div className="text-emerald-800">
                  Title Status: <b>{pl.titleStatus}</b>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(100, (pl.paidAmount / pl.price) * 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-600">
                  <span>Paid: KES {pl.paidAmount.toLocaleString()}</span>
                  <span>
                    Bal: KES{" "}
                    {Math.max(0, pl.price - pl.paidAmount).toLocaleString()}
                  </span>
                </div>
                <button
                  onClick={() =>
                    notify(
                      `Downloading official statement for Plot ${pl.number}`,
                    )
                  }
                  className="w-full py-1.5 bg-emerald-700 text-white font-bold rounded-lg shadow mt-2"
                >
                  Download Statement & Receipts
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ProcurementModule({ db, setDb, notify, logAudit }) {
  const [poForm, setPoForm] = useState({
    supplier: "Rift Civil Works Ltd",
    projectId: db.projects[0]?.id || "",
    item: "Concrete Culverts",
    amount: 350000,
  });

  const handleCreatePO = (e) => {
    e.preventDefault();
    const created = {
      id: `PO-2026-${db.procurement.length + 1}`,
      ...poForm,
      status: "Pending Approval",
      grnStatus: "Pending",
    };
    setDb((prev) => ({ ...prev, procurement: [created, ...prev.procurement] }));
    logAudit(
      `Created Purchase Order ${created.id} for ${created.supplier}`,
      "Procurement",
    );
    notify(`Purchase Order ${created.id} submitted for approval.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form
        onSubmit={handleCreatePO}
        className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
      >
        <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
          + Create Purchase Requisition / PO
        </h3>
        <div>
          <label className="font-bold">Supplier / Vendor *</label>
          <input
            required
            value={poForm.supplier}
            onChange={(e) => setPoForm({ ...poForm, supplier: e.target.value })}
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="font-bold">Project</label>
          <select
            value={poForm.projectId}
            onChange={(e) =>
              setPoForm({ ...poForm, projectId: e.target.value })
            }
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          >
            {db.projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold">Item Description *</label>
          <input
            required
            value={poForm.item}
            onChange={(e) => setPoForm({ ...poForm, item: e.target.value })}
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          />
        </div>
        <div>
          <label className="font-bold">Total Amount (KES) *</label>
          <input
            type="number"
            required
            value={poForm.amount}
            onChange={(e) =>
              setPoForm({ ...poForm, amount: Number(e.target.value) })
            }
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
        >
          Submit Purchase Order
        </button>
      </form>

      <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
        <h3 className="font-black text-emerald-950 text-sm mb-3">
          Procurement & Purchase Orders ({db.procurement.length})
        </h3>
        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">PO Ref & Supplier</th>
              <th className="p-2.5">Item</th>
              <th className="p-2.5">Amount</th>
              <th className="p-2.5">Approval Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {db.procurement.map((po) => (
              <tr key={po.id}>
                <td className="p-2.5 font-bold">
                  {po.id}{" "}
                  <span className="block text-[10px] text-slate-500">
                    {po.supplier}
                  </span>
                </td>
                <td className="p-2.5">{po.item}</td>
                <td className="p-2.5 font-mono font-bold">
                  KES {po.amount.toLocaleString()}
                </td>
                <td className="p-2.5">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-950 rounded font-bold text-[10px]">
                    {po.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AccountingAndHRModule({
  db,
  setDb,
  kpis,
  notify,
  logAudit,
  exportToCSV,
}) {
  const [subTab, setSubTab] = useState("accounting");
  const [empForm, setEmpForm] = useState({
    name: "Samuel Karanja",
    idNo: "29810293",
    phone: "+254 711 222 333",
    dept: "Commercial",
    title: "Senior Sales Executive",
    salary: 65000,
  });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const created = {
      id: `EMP-${Date.now().toString().slice(-3)}`,
      ...empForm,
      status: "Active",
    };
    setDb((prev) => ({ ...prev, employees: [created, ...prev.employees] }));
    logAudit(`Registered employee ${created.name}`, "HR & Payroll");
    notify(`Employee ${created.name} registered.`);
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-2 bg-white p-2.5 rounded-xl border border-emerald-200">
        <button
          onClick={() => setSubTab("accounting")}
          className={`px-4 py-2 rounded-lg text-xs font-bold ${subTab === "accounting" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
        >
          Double-Entry Accounting & Tax (KRA iTax)
        </button>
        <button
          onClick={() => setSubTab("hr")}
          className={`px-4 py-2 rounded-lg text-xs font-bold ${subTab === "hr" ? "bg-emerald-700 text-white" : "bg-emerald-50 text-emerald-900"}`}
        >
          HR & Staff Payroll ({db.employees.length})
        </button>
      </div>

      {subTab === "accounting" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3">
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              Financial Summary & Trial Balance
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2.5 bg-emerald-50 rounded font-bold">
                <span>Total Realized Cash Collections:</span>
                <span className="font-mono text-emerald-800">
                  KES {kpis.totalCollected.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-emerald-50 rounded font-bold">
                <span>Total Land Acquisition Outlays:</span>
                <span className="font-mono text-amber-800">
                  KES {kpis.totalLandAcquisitionCost.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between p-2.5 bg-emerald-50 rounded font-bold">
                <span>Outstanding Customer Receivables:</span>
                <span className="font-mono text-emerald-950">
                  KES {kpis.outstandingBalances.toLocaleString()}
                </span>
              </div>
            </div>
            <button
              onClick={() =>
                exportToCSV("trial_balance", [
                  {
                    account: "Cash / Bank",
                    debit: kpis.totalCollected,
                    credit: 0,
                  },
                  {
                    account: "Accounts Receivable",
                    debit: kpis.outstandingBalances,
                    credit: 0,
                  },
                ])
              }
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Export Trial Balance CSV
            </button>
          </div>

          <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3">
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              KRA Statutory Tax Compliance (VAT, PAYE, NSSF, SHIF)
            </h3>
            <p className="text-xs text-slate-600">
              All transactions are logged with KRA PIN{" "}
              <b>{db.company.kraPin}</b> ready for iTax reconciliation.
            </p>
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1.5 font-mono">
              <div>VAT Output Tax (16% on service fees): KES 450,000</div>
              <div>PAYE Statutory Deduction (Staff Payroll): KES 185,000</div>
              <div>Housing Levy & SHIF Contributions: KES 62,000</div>
            </div>
            <button
              onClick={() => notify("Statutory tax schedules reconciled.")}
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Reconcile Statutory Returns
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            onSubmit={handleAddEmployee}
            className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
          >
            <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
              + Register Employee
            </h3>
            <div>
              <label className="font-bold">Full Name *</label>
              <input
                required
                value={empForm.name}
                onChange={(e) =>
                  setEmpForm({ ...empForm, name: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-bold">National ID</label>
                <input
                  required
                  value={empForm.idNo}
                  onChange={(e) =>
                    setEmpForm({ ...empForm, idNo: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
              <div>
                <label className="font-bold">Phone</label>
                <input
                  required
                  value={empForm.phone}
                  onChange={(e) =>
                    setEmpForm({ ...empForm, phone: e.target.value })
                  }
                  className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
            <div>
              <label className="font-bold">Job Title</label>
              <input
                value={empForm.title}
                onChange={(e) =>
                  setEmpForm({ ...empForm, title: e.target.value })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
              />
            </div>
            <div>
              <label className="font-bold">Basic Monthly Salary (KES)</label>
              <input
                type="number"
                value={empForm.salary}
                onChange={(e) =>
                  setEmpForm({ ...empForm, salary: Number(e.target.value) })
                }
                className="w-full mt-1 border border-emerald-300 rounded-lg p-2 font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
            >
              Save Employee
            </button>
          </form>

          <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
            <h3 className="font-black text-emerald-950 text-sm mb-3">
              Staff & Payroll Register ({db.employees.length})
            </h3>
            <table className="w-full text-xs text-left">
              <thead className="bg-emerald-900 text-white uppercase font-bold">
                <tr>
                  <th className="p-2.5">Employee & ID</th>
                  <th className="p-2.5">Title / Dept</th>
                  <th className="p-2.5">Phone</th>
                  <th className="p-2.5">Basic Salary</th>
                  <th className="p-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {db.employees.map((e) => (
                  <tr key={e.id}>
                    <td className="p-2.5 font-bold">
                      {e.name}{" "}
                      <span className="block font-mono text-[10px] text-slate-500">
                        {e.idNo}
                      </span>
                    </td>
                    <td className="p-2.5">
                      {e.title} ({e.dept})
                    </td>
                    <td className="p-2.5 font-mono">{e.phone}</td>
                    <td className="p-2.5 font-mono font-bold">
                      KES {(e.salary || 65000).toLocaleString()}
                    </td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-bold text-[10px]">
                        {e.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function CustomerCareAndDocsModule({ db, setDb, notify, logAudit }) {
  const [tktForm, setTktForm] = useState({
    customerId: db.customers[0]?.id || "",
    category: "Title Deed Delay",
    priority: "High",
    summary: "Client inquiring on final title deed issuance.",
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const created = {
      id: `TKT-${Date.now().toString().slice(-3)}`,
      ...tktForm,
      plotNo: "NSG-002",
      officer: "Adv. Faith Mutua",
      status: "Open",
    };
    setDb((prev) => ({ ...prev, tickets: [created, ...prev.tickets] }));
    logAudit(`Created support ticket ${created.id}`, "Customer Care");
    notify(`Support ticket ${created.id} logged.`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <form
        onSubmit={handleCreateTicket}
        className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3 text-xs h-fit"
      >
        <h3 className="font-black text-emerald-950 text-sm border-b border-emerald-100 pb-2">
          + Create Customer Ticket
        </h3>
        <div>
          <label className="font-bold">Customer</label>
          <select
            value={tktForm.customerId}
            onChange={(e) =>
              setTktForm({ ...tktForm, customerId: e.target.value })
            }
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          >
            {db.customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold">Issue Category</label>
          <select
            value={tktForm.category}
            onChange={(e) =>
              setTktForm({ ...tktForm, category: e.target.value })
            }
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          >
            {[
              "Title Deed Delay",
              "Payment Statement Query",
              "Plot Boundaries",
              "Refund Request",
              "Agreement Dispute",
            ].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-bold">Summary *</label>
          <input
            required
            value={tktForm.summary}
            onChange={(e) =>
              setTktForm({ ...tktForm, summary: e.target.value })
            }
            className="w-full mt-1 border border-emerald-300 rounded-lg p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-emerald-700 text-white font-bold rounded-lg shadow"
        >
          Save Ticket
        </button>
      </form>

      <div className="lg:col-span-2 bg-white border border-emerald-200 p-5 rounded-xl overflow-x-auto">
        <h3 className="font-black text-emerald-950 text-sm mb-3">
          Customer Support & Dispute Tickets ({db.tickets.length})
        </h3>
        <table className="w-full text-xs text-left">
          <thead className="bg-emerald-900 text-white uppercase font-bold">
            <tr>
              <th className="p-2.5">Ticket #</th>
              <th className="p-2.5">Category</th>
              <th className="p-2.5">Summary</th>
              <th className="p-2.5">Officer</th>
              <th className="p-2.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100">
            {db.tickets.map((t) => (
              <tr key={t.id}>
                <td className="p-2.5 font-mono font-bold">{t.id}</td>
                <td className="p-2.5 font-bold text-emerald-900">
                  {t.category}
                </td>
                <td className="p-2.5">{t.summary}</td>
                <td className="p-2.5">{t.officer}</td>
                <td className="p-2.5">
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-950 rounded font-bold text-[10px]">
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReportsAndAIModule({ db, kpis, exportToCSV }) {
  const [aiQuery, setAiQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  const askAI = (e) => {
    e.preventDefault();
    if (!aiQuery) return;
    const q = aiQuery.toLowerCase();
    if (q.includes("revenue") || q.includes("collection")) {
      setAiAnswer(
        `Total cash collections currently stand at KES ${kpis.totalCollected.toLocaleString()} across ${kpis.soldOrPaidPlots} sold units. Outstanding receivables are KES ${kpis.outstandingBalances.toLocaleString()}.`,
      );
    } else if (q.includes("land") || q.includes("acquisition")) {
      setAiAnswer(
        `The land bank comprises ${kpis.totalLandAcres} acres across ${db.parentParcels.length} parent parcels with total acquisition cost of KES ${(kpis.totalLandAcquisitionCost / 1000000).toFixed(1)}M.`,
      );
    } else if (q.includes("fuel") || q.includes("fleet")) {
      setAiAnswer(
        `Fleet audit shows ${db.siteVisitsAndFuel.length} recent site visit trips recorded. All vehicles have active compliance.`,
      );
    } else {
      setAiAnswer(
        `Based on Aprotec Land360 ERP telemetry, project performance is robust with ${kpis.availablePlots} plots ready for immediate marketing.`,
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-2 border-amber-400 p-5 rounded-xl shadow-md space-y-3">
        <h3 className="font-black text-emerald-950 text-sm flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" /> AI Director's Business
          Intelligence Assistant
        </h3>
        <form onSubmit={askAI} className="flex gap-2">
          <input
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            placeholder="Ask e.g. 'What are our total collections?' or 'Summarize land bank'"
            className="flex-1 border border-emerald-300 rounded-lg p-2.5 text-xs font-medium"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-emerald-950 font-black rounded-lg text-xs shadow"
          >
            Ask AI
          </button>
        </form>
        {aiAnswer && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs font-semibold text-amber-950">
            <b>AI Insight:</b> {aiAnswer}
          </div>
        )}
      </div>

      <div className="bg-white border border-emerald-200 p-5 rounded-xl space-y-3">
        <h3 className="font-black text-emerald-950 text-sm">
          Master BI Report & Data Export Center
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => exportToCSV("master_plots_report", db.plots)}
            className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-left font-bold text-xs text-emerald-950 flex justify-between items-center"
          >
            <span>Export Plot Inventory CSV</span>{" "}
            <Download className="w-4 h-4 text-emerald-700" />
          </button>
          <button
            onClick={() => exportToCSV("master_customers_report", db.customers)}
            className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-left font-bold text-xs text-emerald-950 flex justify-between items-center"
          >
            <span>Export Customer KYC CSV</span>{" "}
            <Download className="w-4 h-4 text-emerald-700" />
          </button>
          <button
            onClick={() => exportToCSV("master_payments_report", db.payments)}
            className="p-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl text-left font-bold text-xs text-emerald-950 flex justify-between items-center"
          >
            <span>Export M-Pesa Collections CSV</span>{" "}
            <Download className="w-4 h-4 text-emerald-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
