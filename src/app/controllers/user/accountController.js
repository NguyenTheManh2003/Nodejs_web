class Acount {
  showLogin(rep, res) {
    res.render('user/login')
  }
  showRegister(rep, res) {
    res.render('user/resgister')
  }
}

module.exports = new Acount();
