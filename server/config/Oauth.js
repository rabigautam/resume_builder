module.exports = {
    tokenExpireTime: 360000,
    isOauthConfig: { isGoogleAuth: true, isFacebookAuth: true, },
    oauthConfig: {
      googleAuth: {
        client_id: '1064416853684-flsjn12d9lv98866aj7jp83bor0ru2od.apps.googleusercontent.com',
        client_secret: 'NXLfMsYNkKvEQvZnGLMC92q0',
      },
      facebookAuth: {
        FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
        FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
      }
    }
}