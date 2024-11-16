const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20");
passport.use(
    new GoogleStrategy({
        clintID:process.env.GOOGLE_CLINT_ID,
        clintSecret:process.env.GOOGLE_CLINT_SECRET,
        callbackUri:process.env.GOOGLE_CALLBACK_URI
    },
    function(accessToken,refreshToken,profile,done){
        console.log(profile)
        done(null,profile);
    }
)
)
console.log("huihui")
