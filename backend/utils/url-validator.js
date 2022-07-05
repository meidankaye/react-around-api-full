const urlValidator = (value) => {
  const regex = /(https?:\/\/)(www\.)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+\.*[.\-A-Za-z0-9+&@#/%=~_|?#]/gm;
  return regex.test(value);
};

module.exports = urlValidator;