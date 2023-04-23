import { Box } from '@mui/material';

export default function Profile(): JSX.Element {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <h1>Display User Profile</h1>
      <h2>
        Give ability to change acounts details (first name, last name, password)
      </h2>
    </Box>
  );
}
