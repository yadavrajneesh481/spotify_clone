// import { useState, useEffect } from "react";
// import SingleSongCard from "../components/shared/SingleSongCard";
// import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
// import LoggedInContainer from "../containers/loggedincontainer";

// const MyMusic = () => {
//   const [songData, setSongData] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
//         console.log("Response:", response); // Log the response for debugging

//         if (response.status === 200) {
//           setSongData(response.data);
//         } else {
//           console.error("Request was not successful:", response.statusText);
//           // Handle the error case appropriately, e.g., show an error message to the user
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle other errors, such as network errors
//       }
//     };
//     getData();
//   }, []);

//   return (
//     <LoggedInContainer curActiveScreen="myMusic">
//       <div className="text-white text-xl font-semibold pb-4 pl-2 pt-8">
//         My Songs
//       </div>
//       <div className="space-y-3 overflow-auto">
//         {songData.map((item) => {
//           return <SingleSongCard info={item} playSound={() => {}} />;
//         })}
//       </div>
//     </LoggedInContainer>
//   );
// };

// export default MyMusic;

import { Icon } from "@iconify/react";
import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../components/shared/Icon_Text";
import TextWithHover from "../components/shared/Textwith_hover";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useState, useEffect } from "react";
import { Howl, Howler } from "howler";

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [soundPlayed, setSoundPlayed] = useState(null);

  const playSound = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });

    sound.play();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
        console.log("Response:", response); // Log the response for debugging
        setSongData(response.data);
      } catch (error) {
        // console.error("Error fetching data:", error);
      }
    };
    getData();
  }, []);
  return (
    <div className="h-full w-full flex">
      {/* This first div will be the left panel */}
      <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
        <div>
          {/* This div is for logo */}
          <div className="logoDiv p-6">
            <img src={spotify_logo} alt="spotify logo" width={125} />
          </div>
          <div className="py-5">
            <IconText iconName={"material-symbols:home"} displayText={"Home"} />
            <IconText
              iconName={"material-symbols:search-rounded"}
              displayText={"Search"}
            />
            <IconText iconName={"icomoon-free:books"} displayText={"Library"} />
            <IconText
              iconName={"material-symbols:library-music-sharp"}
              displayText={"My Music"}
              active
            />
          </div>
          <div className="pt-5">
            <IconText
              iconName={"material-symbols:add-box"}
              displayText={"Create Playlist"}
            />
            <IconText
              iconName={"mdi:cards-heart"}
              displayText={"Liked Songs"}
            />
          </div>
        </div>
        <div className="px-5">
          <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
            <Icon icon="carbon:earth-europe-africa" />
            <div className="ml-2 text-sm font-semibold">English</div>
          </div>
        </div>
      </div>
      {/* This second div will be the right part(main content) */}
      <div className="h-full w-4/5 bg-app-black overflow-auto">
        <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
          <div className="w-1/2 flex h-full">
            <div className="w-2/3 flex justify-around items-center">
              <TextWithHover displayText={"Premium"} />
              <TextWithHover displayText={"Support"} />
              <TextWithHover displayText={"Download"} />
              <div className="h-1/2 border-r border-white"></div>
            </div>
            <div className="w-1/3 flex justify-around h-full items-center">
              <TextWithHover displayText={"Upload Song"} />
              <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                AC
              </div>
            </div>
          </div>
        </div>
        <div className="content p-8 overflow-auto">
          <div className="text-white pb-4 font-semibold text-xl pl-2">
            My Songs
          </div>
          <div className="overflow-auto space-y-3">
            {songData.map((item, index) => {
              return (
                <SingleSongCard info={item} playSound={playSound} key={index} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyMusic;
