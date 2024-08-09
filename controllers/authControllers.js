module.exports.signupGet =(req, res) => {
    res.render('signup');
}

module.exports.loginGet =(req, res) => {
    res.render('login')
}

module.exports.signupPost =(req, res) => {
    res.send('new signup')
}

module.exports.loginPost =(req, res) => {
    res.send('user login')
}