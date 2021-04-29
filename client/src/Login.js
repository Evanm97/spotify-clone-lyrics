import React from "react";
import { Container } from "react-bootstrap";
import GitHubCorners from "@uiw/react-github-corners";

const REDIRECT_URI = window.location.origin;
const AUTH_URL =
  `https://accounts.spotify.com/authorize?client_id=bf628795576b4bad9b71cde40e4aae48&response_type=code&redirect_uri=${REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>

      <GitHubCorners
        bgColor="#1cb954"
        color="#000000"
        href="https://github.com/Evanm97/spotify-clone-lyrics"
        target="_blank"
      />
    </Container>
  );
}
