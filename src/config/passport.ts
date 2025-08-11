import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../models/user.model';
import { config } from './index';

passport.use(
    new GoogleStrategy.Strategy(
        {
            clientID: config.google.clientId,
            clientSecret: config.google.clientSecret,
            callbackURL: `${config.appUrl}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ googleId: profile.id });
                if (!user) {
                    user = await User.create({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails?.[0].value,
                        isVerified: true,
                    });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);