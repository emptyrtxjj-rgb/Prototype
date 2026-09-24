import { apiRequest } from './api';

export interface EcoData {
  metrics: {
    paperSavedKg: number;
    digitalDocuments: number;
    unusedSheets: number;
    treesPreserved: number;
    waterSavedLiters: number;
    energySavedKwh: number;
  };
  monthlyImpact: {
    paperSavedPercent: number;
    digitalDocumentsPercent: number;
    energyEfficiencyPercent: number;
  };
  chartData: Array<{
    month: string;
    paperSaved: number;
    digitalDocs: number;
    trees: number;
  }>;
}

export const ecoService = {
  async getEcoData(): Promise<EcoData> {
    try {
      const res = await apiRequest<{ success: boolean; data: EcoData }>('/eco');
      return res.data;
    } catch {
      return {
        metrics: {
          paperSavedKg: 1284,
          digitalDocuments: 42800,
          unusedSheets: 12450,
          treesPreserved: 37,
          waterSavedLiters: 96200,
          energySavedKwh: 14200
        },
        monthlyImpact: {
          paperSavedPercent: 18,
          digitalDocumentsPercent: 24,
          energyEfficiencyPercent: 11
        },
        chartData: [
          { month: "Апр", paperSaved: 140, digitalDocs: 4200, trees: 4 },
          { month: "Май", paperSaved: 190, digitalDocs: 5800, trees: 6 },
          { month: "Июн", paperSaved: 220, digitalDocs: 6900, trees: 7 },
          { month: "Июл", paperSaved: 110, digitalDocs: 3400, trees: 3 },
          { month: "Авг", paperSaved: 260, digitalDocs: 8100, trees: 8 },
          { month: "Сен", paperSaved: 364, digitalDocs: 14400, trees: 9 }
        ]
      };
    }
  }
};

export const getEcoData = ecoService.getEcoData;
export const getEcoMetrics = async () => {
  const data = await ecoService.getEcoData();
  return {
    ...data.metrics,
    treesSaved: data.metrics.treesPreserved,
    digitalDocsIssued: data.metrics.digitalDocuments
  };
};
