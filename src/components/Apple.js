import * as jwt from 'jsonwebtoken'

try {
   const clientSecretJwt = jwt.sign(
      {
         iss: 'YOUR_APPLE_ISSUER_ID',
         iat: Math.floor(Date.now() / 1000),
         exp: Math.floor(Date.now() / 1000) + 12000,
         aud: 'https://appleid.apple.com',
         sub: 'com.example.app',
      },
      config.apple.clientSecretP8,
      {
         algorithm: 'ES256',
         header: {
            alg: 'ES256',
            kid: 'ABCDEFG1', // Key ID from apple sign in key
         },
      },
   )
   res.apiSuccess({
      message: 'Client secret for apple generated',
      data: clientSecretJwt,
   })
} catch (error) {
   return res.apiFail({
      message: 'Failed generating token for revoking apple token',
      error,
   })
}