const jwt = require('jsonwebtoken');
let User = require("../../models/User.model");
let serverUrl = "http://192.168.0.108:4000";
async function authCheckBasic(req, res, next) {
  const token = req.cookies['token'];
  if (!token) {
    res.user=null
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    let user = await User.findOne({ _id: decoded.user_id });
    if (!user) return res.status(401).json({ err: "Invalid Token" });
    decoded['Username'] = user.Username;
    decoded['FullName'] = user.FullName;
    decoded['ProfilePicture'] = serverUrl+user.ProfilePicture;
    req.user = decoded;
  } catch (err) {
    res.user=null
  }
  return next();
}
module.exports = authCheckBasic;