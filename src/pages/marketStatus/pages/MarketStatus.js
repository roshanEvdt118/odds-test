import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import MarketStatusForm from '../component/MarketStatusForm';

export default function MarketStatus() {
  const { themeStretch } = useSettingsContext();


  return (
    <>
      <Helmet>
        <title>Market Status</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='Market Status'
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Market Status',
            },
          ]}
        />
        <MarketStatusForm />
      </Container>
    </>
  );
}