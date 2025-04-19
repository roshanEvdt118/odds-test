import Iconify from '@components/iconify';
import { Button, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';

UserTableToolbar.propTypes = {
  isFiltered: PropTypes.bool,
  filterName: PropTypes.string,
  filterRole: PropTypes.string,
  onFilterName: PropTypes.func,
  onFilterRole: PropTypes.func,
  onResetFilter: PropTypes.func,
  optionsRole: PropTypes.arrayOf(PropTypes.string),
  onSearchFilter: PropTypes.func,
};

export default function UserTableToolbar({
  isFiltered,
  filterName,
  filterRole,
  optionsRole,
  onFilterName,
  onFilterRole,
  onResetFilter,
  onSearchFilter,
}) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ px: 2, py: 3 }}
    >

      <TextField
        fullWidth
        size="small"
        value={filterName}
        onChange={onFilterName}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {/* {isFiltered && ( */}
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ height: 40 }}
        onClick={onSearchFilter}
      >
        Search
      </Button>
      <Button
        size="small"
        variant="contained"
        color="error"
        sx={{ height: 40 }}
        onClick={onResetFilter}
      >
        Reset
      </Button>
      {/* )} */}
    </Stack>
  );
}
