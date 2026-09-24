import { EcoMetrics } from '../types';

export const initialEcoMetrics: EcoMetrics = {
  treesSaved: 142,
  kwhSaved: 18450,
  waterLitersSaved: 89400,
  paperSheetsSaved: 486200,
  totalDigitizedCertificates: 12480,
  co2KgReduced: 7290,
  monthlyGrowthPercent: 24.8,
};

export const ecoImpactEquivalents = {
  paperPerCertificate: 4, // 4 sheets of paper saved per digital request/certificate
  waterLitersPerSheet: 0.18, // 180ml of water saved per sheet of paper
  co2KgPerTree: 22, // 22 kg CO2 absorbed per tree per year
  kwhPerPaperReam: 15.2, // kWh of energy saved
};
