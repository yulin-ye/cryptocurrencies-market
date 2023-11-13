import { useEffect, useState } from 'react';
import { sendRequest } from '../utils/helper';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';

export default function CoinsTable() {
  const navigate = useNavigate();

  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    sendRequest('GET', '/coins/markets', { vs_currency: 'aud' })
      .then((data) => {
        setCoinsData(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const columns = [
    {
      field: 'market_cap_rank',
      headerName: '#',
      type: 'number',
      flex: 1,
    },
    {
      field: 'coin',
      headerName: 'Coin',
      flex: 3,
      renderCell: ({ row }) => {
        return (
          <>
            <Avatar
              sx={{ width: 20, height: 20, margin: 1 }}
              alt={row.name}
              src={row.image}
            />
            {row.name}
          </>
        );
      },
    },
    {
      field: 'current_price',
      headerName: 'Price',
      type: 'number',
      flex: 3,
      valueFormatter: ({ value }) => {
        return `$${value.toLocaleString()}`;
      },
    },
    {
      field: 'price_change_percentage_24h',
      headerName: '24h',
      type: 'number',
      flex: 3,
      renderCell: ({ row }) => {
        return (
          <Typography
            color={row.price_change_percentage_24h > 0 ? 'green' : 'red'}
          >
            {`${row.price_change_percentage_24h}%`}
          </Typography>
        );
      },
    },
    {
      field: 'market_cap',
      headerName: 'Mkt Cap',
      type: 'number',
      flex: 3,
      valueFormatter: ({ value }) => {
        return `$${value.toLocaleString()}`;
      },
    },
  ];

  return (
    <>
      {coinsData.length > 0 ? (
        <Box>
          <Grid container rowSpacing={1}>
            <Grid item xs={12} md={12}>
              <Typography variant="h4">Cryptocurrencies Market</Typography>
            </Grid>
            <Grid item xs={12} md={12}>
              <DataGrid
                hover
                rows={coinsData}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: 10 },
                  },
                }}
                pageSizeOptions={[10, 20]}
                onRowSelectionModelChange={(row) => {
                  navigate(`/coins/${row[0]}`);
                }}
                sx={{
                  cursor: 'pointer',
                }}
                data-testid='data-grid'
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Backdrop sx={{ color: '#ffffff' }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </>
  );
}
