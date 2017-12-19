const storedList = 'currencyList';

const getListFromStorage = (object, cb) => {
  cb(JSON.parse(localStorage.getItem(object)));
};

const setLocalStorageItem = (item, value) => {
  localStorage.setItem(item, value);
};

const parseList = (list) => {
  const arr = [];
  Object.keys(list).map((item) => {
    arr.push({
      label: list[item].FullName,
      value: list[item].Symbol,
      image: list[item].ImageUrl,
    });
    return item;
  });
  return arr.sort((a, b) => {
    if (a.FullName > b.FullName) return 1;
    return -1;
  });
};

const getCryptoList = () => fetch('https://min-api.cryptocompare.com/data/all/coinlist')
  .then(response => response.json())
  .then((list) => {
    setLocalStorageItem(storedList, JSON.stringify(parseList(list.Data)));
    return parseList(list.Data);
  });

export default {
  getCryptoList,
  getListFromStorage,
};
