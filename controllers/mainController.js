module.exports.home = (req, res) => {
  res.render('index.html', {
    pageTitle: 'Main'
  });
};

module.exports.about = (req, res) => {
  res.render('about.html');
};