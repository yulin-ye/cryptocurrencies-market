import { useEffect, useState } from 'react';
import { sendRequest } from '../utils/helper';
import { useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import '../styles/CoinDetails.scss';
import parse from 'html-react-parser';

export default function CoinDetails() {
  const [coinDetails, setCoinDetails] = useState(null);
  const params = useParams();

  useEffect(() => {
    sendRequest('GET', `/coins/${params.id}`).then((data) => {
      const { market_data } = data;
      setCoinDetails({
        name: data.name,
        symbol: data.symbol,
        icon: data.image?.small,
        currentPrice: market_data.current_price?.aud,
        changePercentage: market_data.price_change_percentage_24h,
        mktCap: market_data.market_cap?.aud,
        fullyDilutedValuation: market_data.fully_diluted_valuation?.aud,
        circulatinSupply: market_data.circulating_supply,
        totalSupply: market_data.total_supply,
        maxSupply: market_data.max_supply,
        description: data.description?.en,
      });
    });
  }, []);

  return coinDetails ? (
    <Container
      sx={{
        width: {
          xs: '350px',
          sm: '600px',
          md: '900px',
        },
      }}
    >
      <Box>
        <Grid container>
          <Grid item xs={12}>
            <div className="coin-header__item">
              <Avatar
                sx={{ width: 50, height: 50, margin: 1 }}
                alt={params.id}
                src={coinDetails.icon}
              />
              <h2 data-testid="coin-name">
                {coinDetails.name}{' '}
                <span className="grey-colour">
                  {coinDetails.symbol?.toUpperCase()}
                </span>
              </h2>
            </div>
            <div className="coin-header__item">
              <Typography variant="h4">
                {coinDetails.currentPrice
                  ? `$${coinDetails.currentPrice.toLocaleString()}`
                  : ''}
              </Typography>
              {coinDetails.changePercentage > 0 ? (
                <ArrowDropUp htmlColor="green" sx={{ width: 40, height: 40 }} />
              ) : (
                <ArrowDropDown htmlColor="red" sx={{ width: 40, height: 40 }} />
              )}
              <Typography
                color={coinDetails.changePercentage > 0 ? 'green' : 'red'}
                variant="h5"
                sx={{ marginTop: 1 }}
              >
                {`${coinDetails.changePercentage}%`}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid
              container
              rowSpacing={1}
            >
              <Grid item xs={6} md={4}>
                <span className="grey-colour">Market Cap</span>
              </Grid>
              <Grid item xs={6} md={8} sx={{ textAlign: 'right' }}>
                {coinDetails.mktCap
                  ? `$${coinDetails.mktCap?.toLocaleString()}`
                  : 'N/A'}
              </Grid>
              <Grid item xs={6} md={4}>
                <span className="grey-colour">Fully Diluted Supply</span>
              </Grid>
              <Grid item xs={6} md={8} sx={{ textAlign: 'right' }}>
                {coinDetails.fullyDilutedValuation
                  ? `$${coinDetails.fullyDilutedValuation?.toLocaleString()}`
                  : 'N/A'}
              </Grid>
              <Grid item xs={6} md={4}>
                <span className="grey-colour">Circulating Supply</span>
              </Grid>
              <Grid item xs={6} md={8} sx={{ textAlign: 'right' }}>
                {coinDetails.circulatinSupply
                  ? `${coinDetails.circulatinSupply?.toLocaleString()}`
                  : 'N/A'}
              </Grid>
              <Grid item xs={6} md={4}>
                <span className="grey-colour">Total Supply</span>
              </Grid>
              <Grid item xs={6} md={8} sx={{ textAlign: 'right' }}>
                {coinDetails.totalSupply
                  ? `${coinDetails.totalSupply?.toLocaleString()}`
                  : 'N/A'}
              </Grid>
              <Grid item xs={6} md={4}>
                <span className="grey-colour">Max Supply</span>
              </Grid>
              <Grid item xs={6} md={8} sx={{ textAlign: 'right' }}>
                {coinDetails.maxSupply
                  ? `${coinDetails.maxSupply?.toLocaleString()}`
                  : 'N/A'}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <h2>About {coinDetails?.name}</h2>
            {coinDetails.description ? parse(coinDetails.description) : null}
          </Grid>
        </Grid>
      </Box>
    </Container>
  ) : (
    <Backdrop sx={{ color: 'white' }} open="true">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
