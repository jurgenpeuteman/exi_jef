module.exports = {
  map: (value, istart, istop, ostart, ostop) => ostart + (ostop - ostart) * ((value - istart) / (istop - istart)),
  random: (min, max) => Math.floor((Math.random() * max) + min)
};