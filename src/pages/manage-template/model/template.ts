export interface Page {
  pageSn: number;
  pageName: string;
  typeKeywords: string[];
  feelingKeywords: string[];
}

export interface Template {
  templateSn: number;
  companyName: string;
  typeKeywords: string[];
  feelingKeywords: string[];
  pages: Page[];
}
