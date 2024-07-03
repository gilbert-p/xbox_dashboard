export interface DashboardDataItem {
    source: string;
    id: number;
    title: string;
    description: string;
    category: string;
}

export interface OrganizedData {
    [category: string]: DashboardDataItem[];
  }