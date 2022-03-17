import {ClientForm} from '../components/forms/client-form';
import {Box} from '@mui/material';

export default function ProfilePage() {

  return (
    <Box sx={{maxWidth: 1000, mx: 'auto'}}>
      <ClientForm/>
    </Box>
  );
}
