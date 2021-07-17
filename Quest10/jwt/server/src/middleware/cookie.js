export const deleteCookie = (req, res, next) => {
  res.clearCookie('sid', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.sendStatus(401);
};
