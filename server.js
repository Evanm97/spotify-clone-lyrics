require("dotenv").config();
const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const lyricsFinder = require("lyrics-finder");

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

app.post("/login", (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch(() => {
      res.sendStatus(400);
    });
});

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});

// This middleware informs the express application to serve our compiled React files
// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//   app.use(express.static(path.join(__dirname, 'client/build')));

//   app.get('*', function (req, res) {
//       res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// };

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));