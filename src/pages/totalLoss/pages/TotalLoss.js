import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import TotalLossForm from '../components/TotalLossForm';

export default function TotalLossCreatePage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();
  const { pathname = '', state } = useLocation();

  const editView = useMemo(() => {
    if (id && /edit/i?.test(pathname)) {
      return {
        title: 'Total Loss: Edit | ODDS',
        heading: 'Edit Total Loss',
        user: state?.name ?? '',
        isEdit: true,
        isView: false,
      };
    }
    if (id && /view/i?.test(pathname)) {
      return {
        title: 'Total Loss: View | ODDS',
        heading: 'View Total Loss',
        user: state?.name ?? '',
        isEdit: false,
        isView: true,
      };
    }
    return {
      title: 'Total Loss: Create | ODDS',
      heading: 'Create Total Loss',
      user: 'New',
      isEdit: false,
      isView: false,
    };
  }, [pathname, id, state]);

  return (
    <>
      <Helmet>
        <title>{editView?.title ?? ''}</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={editView?.heading ?? ''}
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Total Loss',
              href: PATH_DASHBOARD.totalLoss.list,
            },
            { name: editView?.totalloss },
          ]}
        />
        <TotalLossForm
          isEdit={editView?.isEdit}
          isView={editView?.isView}
          currentTotalLoss={state ?? {}} />
      </Container>
    </>
  );
}
