import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import MatchStatusForm from '../components/MatchStatusForm';

export default function MatchStatus() {
  const { themeStretch } = useSettingsContext();


  return (
    <>
      <Helmet>
        <title>Match Status</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='Match Status'
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Match Status',
            },
          ]}
        />
        <MatchStatusForm />
      </Container>
    </>
  );
}