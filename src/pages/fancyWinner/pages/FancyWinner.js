import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import FancyWinnerForm from '../component/FancyWinnerForm';


export default function FancyWinner() {
  const { themeStretch } = useSettingsContext();


  return (
    <>
      <Helmet>
        <title>Fancy Winner</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='Fancy Winner'
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Fancy Winner',
            },
          ]}
        />
        <FancyWinnerForm />
      </Container>
    </>
  );
}
