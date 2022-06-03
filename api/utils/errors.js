export const createError = (stat, msg) => {
  const err = new Error()
  err.stat = stat
  err.msg = msg
  return err
}
