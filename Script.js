function Main() {
  let Songs = [
    {
      href: "Songs/abhi%20jinda%20hu%20to.mp3",
      title: "abhi jinda hu to",
    },
    {
      href: "Songs/Ata%20Thambaycha%20Naay.mp3",
      title: "Ata Thambaycha Naay",
    },
    {
      href: "Songs/Gaddi%20Pichhe%20Naa.mp3",
      title: "Gaddi Pichhe Naa",
    },
    {
      href: "Songs/Gau%20Nako%20Kisna.mp3",
      title: "Gau Nako Kisna",
    },
    {
      href: "Songs/Yek%20Number%20%20Tu%20Abhaal.mp3",
      title: "Yek Number  Tu Abhaal",
    },
    {
      href: "Songs/shigi-shigi.mp3",
      title: "shigi-shigi",
    },
    {
      href: "Songs/KRUSHNA%20MURARI.mp3",
      title: "KRUSHNA MURARI",
    },
    {
      href: "Songs/Ha%20Rang%20Chadhu%20De.mp3",
      title: "Ha Rang Chadhu De",
    },
  ];

  return Songs;
}
// Global Song Object
let currentSong = new Audio();

// secound To Minite function
function formatTime(inputSeconds) {
  const seconds = Number(inputSeconds);

  if (isNaN(seconds) || seconds < 0) {
    return "0:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const songs = Main();
  const ul = document.querySelector("#ul");

  songs.forEach((song) => {
    const li = document.createElement("li");
    li.style.textTransform = "capitalize";
    li.innerHTML = `<div class="songIcon">
                  <i class="bi bi-music-note-beamed"></i>
                </div>
                <div class="songInfo">
                  <div class="songname">${song.title}<span class="hidden">${song.href}<span/></div>
                  <div class="songArtist">Vaibhav Rokade</div>
                </div>
                <div class="songPlayBtn">
                  <i class="bi bi-play-circle"> </i>
                </div>`;
    ul.appendChild(li);
  });

  // playMusic Function
  const playMusic = (src, pause = false) => {
    if (!pause) {
      currentSong.play();
    }
    currentSong.src = src;
    let musicName = src.split("/", 2)[1].replaceAll("%20", " ");

    document.querySelector(".sName").innerHTML = musicName;
    document.querySelector(".sTime").innerHTML = "";
  };

  // to set Defoult Music
  playMusic(songs[0].href, true);

  // attach eventlisner on each song
  Array.from(ul.getElementsByTagName("li")).forEach((e) => {
    let playBtn = e.querySelector(".songPlayBtn");
    let songSRC = e.querySelector(".hidden").innerText;

    playBtn.addEventListener("click", (e) => {
      console.log(songSRC);
      playMusic(songSRC);
    });
  });

  // Attach an event Listner to play
  playM.addEventListener("click", (e) => {
    if (currentSong.paused) {
      e.target.classList = "bi bi-pause-circle";
      currentSong.play();
    } else {
      e.target.classList = "bi bi-play-circle";
      currentSong.pause();
    }
  });

  // Song Current Time Update
  currentSong.addEventListener("timeupdate", () => {
    document.querySelector(".sTime").innerHTML = `${
      formatTime(currentSong.currentTime) ?? "00:00 / 00:00"
    } / ${formatTime(currentSong.duration)}`;

    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  // Add seeker listener
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let persent = e.offsetX / e.target.getBoundingClientRect().width;

    document.querySelector(".circle").style.left = persent * 100 + "%";

    currentSong.currentTime = currentSong.duration * persent;
  });
});
