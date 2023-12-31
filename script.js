new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
                {
          name: "Elevated ",
          artist: "Shubh",
          cover: "Elevated.jpg",
          source: "Elevated (Official Audio) - Shubh.mp3",
          url: "https://youtu.be/I1nX5EuvwzE?si=kF_T0u3fQpgOrPdt",
          favorited: true
        },
        {
          name: "AREA-C",
          artist: "Bixu, Ynxiety",
          cover: "area-c.jpeg",
          source: "AREA - C (Official Video) - BIXU ft. YNXIETY.mp3",
          url: "https://youtu.be/kKg-pJvswj8?si=dD-MGY1we2aZqk3k",
          favorited: true
        },
        {
          name: "9:45",
          artist: "Prabh",
          cover: "945.jpg",
          source:"Prabh - 9_45 (Official Music Video) 0782023.mp3",
          url: "https://youtu.be/bzSn6AKLkMI?si=358FNnrgY6ctJV7Q",
          favorited: false
        },

        { 
          name: "One Love",
          artist: "Shubh",
          cover: "onelove.png",
          source: "Shubh - One Love (Official Audio).mp3",
          url: "https://youtu.be/0pWsCiBvLOk?si=SSTVcImwigGoNVpu",
          favorited: false
        },

        {
          name: "Time Traveller 🔥",
          artist: "M.I.A.",
          cover: "Timetraveller.jpg",
          source: "Time Traveller(MP3_160K).mp3",
          url: "https://youtu.be/Gd6lKtBelZs?si=Qmns_FFnpXZd7FYz",
          favorited: false
        },
        {
          name: "Haryana Hood",
          artist: "Ishad Khan",
          cover: "haryanahood.jpeg",
          source: "Haryana Hood _ Irshad Khan _ Ek Gedi Me Side Baitha Lya Teri Jaisi Sundra Ne _ Haryanvi Song 2023(MP3_160K).mp3",
          url: "https://youtu.be/qeVUGnke9ko?si=Jscu2mG2Ix7WBh9U",
          favorited: true
        },
        {
          name: "Rao Sahab Drill",
          artist: "Vkey, SDEE",
          cover: "raosahabdrill.jpeg",
          source: "Rao Sahab Drill(MP3_160K).mp3",
          url: "https://youtu.be/Fm9krnyIunE?si=wsEnoRRgonqD8kVO",
          favorited: false
        },
        {
          name: "Dior",
          artist: "Shubh",
          cover: "dior.jpeg",
          source: "Shubh - Dior (Official Music Video)(MP3_160K).mp3",
          url: "https://youtu.be/vyrPwLoIYkc?si=wULAS0DXgsoDPqET",
          favorited: true
        },
        {
          name: "We Rollin",
          artist: "Shubh",
          cover: "werollin.jpeg",
          source: "We Rollin (Official Audio) - Shubh(MP3_160K).mp3",
          url: "https://youtu.be/hV8EGTjzD2s?si=TVhqUwFZQZzRVS8G",
          favorited: false
        },
        {
          name: "Laado",
          artist: "MC SQUARE",
          cover: "laado.jpeg",
          source: "MC Square _ _mc_square7000  _ Laado _ Official Lyric Video _viralvideo  _trendingsong(MP3_160K).mp3",
          url: "https://youtu.be/tvznAuZ-5Qo?si=Hs1WVzaC0OKjrK7s",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});