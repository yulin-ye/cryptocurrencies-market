async function sendRequest(method, endpoint, data) {
  try {
    const params = new URLSearchParams({
      ...data
    });
    const response = await fetch(`https://api.coingecko.com/api/v3${endpoint}?${params.toString()}`, {
      method,
      mode: 'cors',
      headers: {
        'x-cg-demo-api-key': process.env.REACT_APP_API_KEY,
      },
    });

    return response.json();
  } catch (error) {
    console.error("Error:", error);
  }
}

export {
  sendRequest,
}