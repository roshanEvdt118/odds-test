import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import AdminForm from '../components/AdminForm';

export default function AdminCreatePage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();
  const { pathname = '', state } = useLocation();

  const editView = useMemo(() => {
    if (id && /edit/i?.test(pathname)) {
      return {
        title: 'Admin: Edit | ODDS',
        heading: 'Edit Admin',
        user: state?.name ?? '',
        isEdit: true,
        isView: false,
      };
    }
    if (id && /view/i?.test(pathname)) {
      return {
        title: 'Admin: View | ODDS',
        heading: 'View Admin',
        user: state?.name ?? '',
        isEdit: false,
        isView: true,
      };
    }
    return {
      title: 'Admin: Create | ODDS',
      heading: 'Create Admin',
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
              name: 'Admin List',
              href: PATH_DASHBOARD.admin.list,
            },
            {
              name: 'New',
            },
            // { name: editView?.admin },
          ]}
        />
        <AdminForm
          isEdit={editView?.isEdit}
          isView={editView?.isView}
          currentAdmin={state ?? {}} />
      </Container>
    </>
  );
}
