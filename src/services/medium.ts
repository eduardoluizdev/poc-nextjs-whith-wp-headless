import axios from 'axios';

export const getMediumData = async () => { 
  try {
    return await axios.post('/api/medium');
  } catch (error) {
    return error;
  }
};
