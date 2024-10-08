const apiService = async (url, method = 'GET', options = {}) => {
  const defaultHeaders = {};

  if (!(options.body instanceof FormData)) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  if (options.replace) {
    Object.keys(options.replace).forEach((key) => {
      url = url.replace(`{${key}}`, options.replace[key]);
    });
  }

  const config = {
    method,
    headers: {
      ...defaultHeaders,
    },
    body: options.body,
  };

  try {
   
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export default apiService;
