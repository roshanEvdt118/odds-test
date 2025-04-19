import CustomBreadcrumbs from '@components/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '@routes/paths';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router';
import MatchWinnerForm from '../component/MatchWinnerForm';


export default function MatchWinner() {
  const { themeStretch } = useSettingsContext();


  return (
    <>
      <Helmet>
        <title>Match Winner</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading='Match Winner'
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Match Winner',
            },
          ]}
        />
        <MatchWinnerForm />
      </Container>
    </>
  );
}
