import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import Model from '../Models/Model';


passport.serializeUser((user,done)=>{
   done(null,user.id);
});

passport.use(
	new GoogleStrategy(
		{
			clientID: '',
			clientSecret: '',
			callbackURL: '/signIn/google/redirect',
		},
		async function(token, tokenSecret, profile, done) {
             
          const user =await Model.UserModel().findOne({googleId:profile.googleId});
          if(user){
              console.log('Current User is',user);
              done(null,user);
          }else{
             const newUser=new Model.UserModel({
                     name:profile.displayName,
                     googleId:profile.googleId
                });
                newUser.save()   
        
          }


           
        },
	),
);



