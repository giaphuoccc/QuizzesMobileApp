const express = require("express");
const mongoose = require('mongoose');
const User = require('../models/user');
const app = express();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cors = require('cors');

const {create} = require('react-test-renderer');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/register', (req, res) => {
  const {name, email, password, image} = req.body;
  const newUser = new User({name, email, password, image});
  newUser
    .save()
    .then(() => {
      res.status(200).json({message: 'User registered successfully!'});
    })
    .catch(err => {
      console.log('Error registering user!!!', err);

      res.status(400).json({message: 'Error registered the user!'});
    });
});
const createToken = userId => {
  const payload = {
    userId: userId,
  };
  const token = jwt.sign(payload, 'Q$r2K6W8n!jCW%Zk', {expiresIn: '1h'});
  return token;
};

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res
      .status(404)
      .json({message: 'Email and the password are required'});
  }

  User.findOne({email})
    .then(user => {
      if (!user) {
        return res.status(404).json({message: 'User not found'});
      }
      if (user.password !== password) {
        return res.status(404).json({message: 'Invalid Password'});
      }
      const token = createToken(user._id);
      res.status(200).json({token});
    })
    .catch(err => {
      console.log('Error in finding the user', err);
      res.status(500).json({message: 'Internal server Error!'});
    });
});

//findOnebyID
// app.get("/:userId", (req, res) => {
//   const userId = req.params.userId; // Lấy userId từ request params
//   User.findById(userId) // Tìm người dùng bằng ID
//     .then(user => {
//       if (!user) {
//         return res.status(404).json({message: "User not found"});
//       }
//       res.status(200).json(user); // Trả về thông tin của người dùng
//     })
//     .catch(err => {
//       console.log("Error retrieving user", err);
//       res.status(500).json({message: "Error retrieving user"});
//     });
// });

//findall
app.get('/:userId', (req, res) => {
  const loggedInUserId = req.params.userId;
  User.find({_id: {$ne: loggedInUserId}})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log('Error retrieving users', err);
      res.status(500).json({message: 'Error retrieving users'});
    });
});

//endpoit to send a request to a user
app.post('/friend-request', async (req, res) => {
  const {currentUserId, selectedUserId} = req.body;
  try {
    await User.findByIdAndUpdate(selectedUserId, {
      $push: {friendRequests: currentUserId},
    });

    //update the sender's sentFriendRequest
    await User.findByIdAndUpdate(currentUserId, {
      $push: {sentFriendRequests: selectedUserId},
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

// // endpoint to show all the friend-request of a particular user
// app.get('/friend-request/:userId', async (req, res) => {
//   try {
//     const {userId} = req.params;
//     //fetch the user document based on the User id
//     const user = await User.findById(userId)
//       .populate('friendRequests', 'name email image')
//       .lean();
//     res.json(user.friendRequests); // Thay friendRequests thành user.friendRequests
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({message: 'Internal Server Error'});
//   }
// });

// //endpoint to accept a friend-request of a particular person
// app.post("/friend-request/accept", async (req, res) => {
//   try {
//     const { senderId, recepientId } = req.body;

//     //retrieve the documents of sender and the recipient
//     const sender = await User.findById(senderId);
//     const recepient = await User.findById(recepientId);

//     sender.friends.push(recepientId);
//     recepient.friends.push(senderId);

//     recepient.friendRequests = recepient.friendRequests.filter(
//       (request) => request.toString() !== senderId.toString()
//     );

//     sender.sentFriendRequests = sender.sentFriendRequests.filter(
//       (request) => request.toString() !== recepientId.toString()
//     );

//     await sender.save();
//     await recepient.save();

//     res.status(200).json({ message: "Friend Request accepted successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// //endpoint to access all the friends of the logged in user!
// app.get("/accepted-friends/:userId", async(req, res) => {
//   try{
//     const {userId} = req.params;
//     const user =  await User.findById(userId).populate("friends", "name email image")
//     const acceptedFriends = user.friends;
//     res.status(200).json(acceptedFriends)
//   }catch(err){
//     console.log(err);
//     res.status(500).json({massage: "Internal Sever Err"})
//   }
// })



module.exports = app;