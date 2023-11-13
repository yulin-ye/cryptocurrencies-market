import CoinsTable from './CoinsTable';
import Container from '@mui/material/Container';

export default function MainPage() {
  return (
      <Container sx={{
        width: {
          xs: '350px',
          sm: '600px',
          md: '900px',
        },
      }}>
        <CoinsTable/>
      </Container>
    )
}

