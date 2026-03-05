import jwt from 'jsonwebtoken'

export function authenticate(req, res, next) {
  const auth = req.headers.authorization || ''
  console.log('autenticando: ', auth)
  
  if (!auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token ausente ou mal formatado' })
  }
  const token = auth.slice(7).trim()

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
