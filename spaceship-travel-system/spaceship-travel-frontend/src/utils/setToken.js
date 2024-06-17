// Function to set the token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token); // Save the token to localStorage with the key 'token'
};

// Function to get the token from localStorage
export const getToken = () => {
  return localStorage.getItem('token'); // Retrieve the token from localStorage with the key 'token'
};
