import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import TotalWinForm from '../components/TotalWinForm';


export default function UserCreatePage() {
  const { themeStretch } = useSettingsContext();

  const { id } = useParams();
  const { pathname = '', state } = useLocation();

  const editView = useMemo(() => {
    if (id && /edit/i?.test(pathname)) {
      return {
        title: 'User: Edit | ODDS',
        heading: 'Edit User',
        user: state?.name ?? '',
        isEdit: true,
        isView: false,
      };
    }
    if (id && /view/i?.test(pathname)) {
      return {
        title: 'User: View | ODDS',
        heading: 'View User',
        user: state?.name ?? '',
        isEdit: false,
        isView: true,
      };
    }
    return {
      title: 'User: Create Total Win | ODDS',
      heading: 'Create Total Win',
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
              name: 'User',
              href: PATH_DASHBOARD.user.list,
            },
            { name: editView?.user },
          ]}
        />
        <TotalWinForm isEdit={editView?.isEdit} isView={editView?.isView} currentUser={state ?? {}}/>
      </Container>
    </>
  );
}
