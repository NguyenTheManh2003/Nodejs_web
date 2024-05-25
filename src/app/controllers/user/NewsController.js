class Newscontroller {
  // [get] /news
  index(rep, res) {
    res.render('news');
  }

  // [get]/ news/:slug
  shows(rep, res) {
    res.send('news 2');
  }
}

module.exports = new Newscontroller();
