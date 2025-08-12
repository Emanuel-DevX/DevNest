function currentPeriodUTC(d = new Date()) {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}
module.exports = async function ensureAiQuota(req, res, next) {
  const userId = req.user.id;
  const period = currentPeriodUTC(); // "YYYY-MM"

  // 1) lazy reset if month changed
  await User.updateOne(
    { _id: userId, "token.period": { $ne: period } },
    { $set: { "token.period": period, "token.usage": 0 } }
  );

  // 2) check quota
  const { token } = await User.findById(userId).select("token").lean();
  const remaining = token.cap - token.usage;
  if (remaining <= 0) {
    return res
      .status(403)
      .json({ message: "AI token cap reached", remaining: 0, cap: token.cap });
  }

  // pass some context to downstream handlers
  res.locals.aiQuota = { cap: token.cap, used: token.usage, remaining, period };
  next();
};
