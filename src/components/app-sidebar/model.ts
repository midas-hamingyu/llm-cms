import {
  Briefcase,
  Building2,
  Download,
  PanelsTopLeft,
  Upload,
} from 'lucide-react';

export enum SIDEBAR_MENU {
  INDUSTRY = 'INDUSTRY',
  COMPANY = 'COMPANY',
  TEMPLATE = 'TEMPLATE',
  JSON_UPLOAD = 'JSON_UPLOAD',
  JSON_DOWNLOAD = 'JSON_DOWNLOAD',
}

export const groups = [
  {
    title: '데이터 관리',
    items: [
      {
        key: SIDEBAR_MENU.INDUSTRY,
        title: '업종 관리',
        icon: Briefcase,
      },
      {
        key: SIDEBAR_MENU.COMPANY,
        title: '회사 관리',
        icon: Building2,
      },
      {
        key: SIDEBAR_MENU.TEMPLATE,
        title: '템플릿 관리',
        icon: PanelsTopLeft,
      },
    ],
  },
  {
    title: 'json 관리',
    items: [
      {
        key: SIDEBAR_MENU.JSON_UPLOAD,
        title: '업로드',
        icon: Upload,
      },
      {
        key: SIDEBAR_MENU.JSON_DOWNLOAD,
        title: '다운로드',
        icon: Download,
      },
    ],
  },
];
