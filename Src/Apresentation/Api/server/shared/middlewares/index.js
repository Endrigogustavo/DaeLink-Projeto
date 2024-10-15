const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

exports.logout = (req, res) => {
    res.clearCookie('tokenId');
    res.send("cookie deletado")
}

exports.getCookie = (req, res) => {
  const token = req.cookies.tokenId
  try {
    if(!token.empty) return res.status(200).json(cookies)
  } catch (error) {
    res.send(error)
  }
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

{/*
      const token = jwt.sign({ id: user.id }, SECRET_KEY, {
        expiresIn: '1h', // Expira em 1 hora
    });
  */}