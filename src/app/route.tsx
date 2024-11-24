import { useCurrentMenu } from '@/components/app-sidebar/model/menu.store.ts';
import { SIDEBAR_MENU } from '@/components/app-sidebar/model/menu.constant.ts';
import { ManageIndustryPage } from '@/pages/manage-industry';
import { ManageCompanyPage } from '@/pages/manage-company';
import { ManageTemplatePage } from '@/pages/manage-template';
import { UploadJSONPage } from '@/pages/json-upload';
import { DownloadJSONPage } from '@/pages/json-download';

export function Route() {
  const currentMenu = useCurrentMenu();

  switch (currentMenu) {
    case SIDEBAR_MENU.INDUSTRY:
      return <ManageIndustryPage />;
    case SIDEBAR_MENU.COMPANY:
      return <ManageCompanyPage />;
    case SIDEBAR_MENU.TEMPLATE:
      return <ManageTemplatePage />;
    case SIDEBAR_MENU.JSON_UPLOAD:
      return <UploadJSONPage />;
    case SIDEBAR_MENU.JSON_DOWNLOAD:
      return <DownloadJSONPage />;
    default:
      throw new Error('not-ready');
  }
}
