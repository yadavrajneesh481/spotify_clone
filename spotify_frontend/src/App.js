import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./output.css";
import LoginComponent from "./routes/login";
import SignupComponent from "./routes/signup";
import LoginHomeComponent from "./routes/loginhome";
import HomeComponent from "./routes/home";
import Uploadsong from "./routes/uploadsong";
import MyMusic from "./routes/MyMusic";
import { useCookies } from "react-cookie";
import songContext from "./contexts/songContexts";
import { useState } from "react";
function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // logged in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              <Route path="/" element={<HelloComponent />} />
              <Route path="/home" element={<LoginHomeComponent />} />
              <Route path="/uploadSong" element={<Uploadsong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              {/* <Route path="/search" element={<SearchPage />} />
                          <Route path="/library" element={<Library />} />
                          <Route
                              path="/playlist/:playlistId"
                              element={<SinglePlaylistView />}
                          /> */}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          // logged out routes
          <Routes>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

const HelloComponent = () => {
  return <div>This is hello from component</div>;
};

export default App;
