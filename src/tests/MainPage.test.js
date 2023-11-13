import { render, screen } from '@testing-library/react';
import MainPage from '../components/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

describe('test coins table', () => {
  it('renders coins table', async () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}></Route>
        </Routes>
      </BrowserRouter>
    );
    expect(await screen.findByText('Cryptocurrencies Market')).toBeVisible();
    expect(await screen.findByTestId('data-grid')).toBeVisible();
  });
});
