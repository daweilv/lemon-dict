import axios from 'axios';

export const fetchDocument = async url => {
  const res = await axios.request({
    url:'https://cors-anywhere.herokuapp.com/'+url,
    responseType: 'document',
    withCredentials: false,
  });
  return res.data
};

// fetchDOM('https://dictionary.cambridge.org/dictionary/english-chinese-simplified/check')
