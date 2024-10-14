const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

exports.logout = (req, res) => {
    res.clearCookie('tokenId');
    res.send("cookie deletado")
}

exports.cookies = (req, res) => {
    const uid = req.body.uid
    res.cookie('tokenId', uid, {
      httpOnly: true,
      secure: true,
      sameSite: 'Lax',
      maxAge: 3600000, 
      path: '/' 
    });
  
    res.send('Cookie definido com sucesso!');
}