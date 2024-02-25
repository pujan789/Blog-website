// This is a test File. Make sure to delete it

// app.post('/register', function(req, res) {
//   const newUser = new User({ username: req.body.username, email: req.body.email });
//   User.register(newUser, req.body.password, function(err, user) {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: err });
//     }
//     res.json({ success: true, message: 'Registration successful!' });
//   });
// });

// app.post('/login', passport.authenticate('local'), (req, res) => {
//   User.findOne({email:req.body.email})
//   res.json({ success: true, message: 'Logged in successfully' });
// });



// app.post('/login', passport.authenticate('local'), (req, res) => {
//   User.findOne({email:req.body.email})
//   res.json({ success: true, message: 'Logged in successfully' });
// });


// app.get('/profile', isLoggedIn, (req, res) => {
//     res.json({ 
//       message: "This is the profile page",
//       user: req.user // Send user information
//     });
//   });
  
//   app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/login');
//   });
  
//   function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) return next();
//     res.status(401).json({ success: false, message: 'Not authenticated' });
//   }
  