 // JavaScript code to handle the functionality
        const songs = [
            { id: 1, name: "Levitating", artist: "Dua Lipa", img: "./images/levitating.jpeg", genre: "Pop", source: "./sound/Free_Test_Data_1MB_MP3.mp3" },
            { id: 2, name: "Blinding Lights", artist: "The Weeknd", img: "./images/blinding_lights.jpeg", genre: "Pop", source: "./sound/Free_Test_Data_1OMB_MP3.mp3" },
            { id: 3, name: "Stairway to Heaven", artist: "Led Zeppelin", img: "./images/stairway_to_heaven.jpeg", genre: "Rock", source: "./sound/Free_Test_Data_2MB_MP3.mp3" },
            { id: 4, name: "Bohemian Rhapsody", artist: "Queen", img: "./images/bohemian.jpeg", genre: "Rock", source: "./sound/Free_Test_Data_5MB_MP3.mp3" },
            { id: 5, name: "Clair de Lune", artist: "Claude Debussy", img: "./images/clair_de_dune.jpeg", genre: "Classical", source: "./sound/Free_Test_Data_100KB_MP3.mp3" },
            { id: 6, name: "Symphony No. 9", artist: "Beethoven", img: "./images/symphony_9.jpeg", genre: "Classical", source: "./sound/Free_Test_Data_500KB_MP3.mp3" },
            { id: 7, name: "Juicy", artist: "The Notorious B.I.G", img: "./images/juicy.jpeg", genre: "Hip-Hop", source: "./sound/sample-12s.mp3" },
            { id: 8, name: "Lose Yourself", artist: "Eminem", img: "./images/lose_yourself.jpeg", genre: "Hip-Hop", source: "./sound/sample-15s.mp3" },
        ];
        const playlists = [];
        let current_playlist="";
        let currentSongIndex = 0;


        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
        }

        function showSongs() {
            const genre = document.getElementById('genreFilter').value;
            // const searchQuery = document.getElementById('searchSongs').value.toLowerCase();
            const filteredSongs = songs.filter(song =>
                (genre === '' || song.genre === genre) 
                // && (song.name.toLowerCase().includes(searchQuery) || song.artist.toLowerCase().includes(searchQuery))
            );
            const songsList = document.getElementById('songsList');
            songsList.innerHTML = '';
            filteredSongs.forEach(song => {
                const li = document.createElement('li');
                li.id = song.id;
                li.textContent = `${song.name} - ${song.artist}`;
                li.addEventListener('click', () => selectSong(song));
                songsList.appendChild(li);
            });
        }

        function selectSong(song) {
            currentSongIndex = songs.findIndex(s => s.id === song.id);
            renderCurrentSong();
        }

        function renderCurrentSong() {
            const song = songs[currentSongIndex];
            document.getElementById('songImage').src = song.img;
            document.getElementById('songName').textContent = song.name;
            document.getElementById('artistName').textContent = song.artist;
            document.getElementById('song_audio').src = song.source;
        }

        function playPreviousSong() {
            if (currentSongIndex > 0) {
                currentSongIndex--;
                renderCurrentSong();
            }
        }

        function playCurrentSong() {
            const song = songs[currentSongIndex];
            document.getElementById('song_audio').src = song.source;
        }

        function playNextSong() {
            if (currentSongIndex < songs.length - 1) {
                currentSongIndex++;
                renderCurrentSong();
            }
        }

        function addToPlaylist() {
            console.log(currentSongIndex);
            const playlistName = current_playlist;
            if (playlistName) {
                let playlist = playlists.find(p => p.name === playlistName);
                if (!playlist) {
                    playlist = { name: playlistName, songs: [] };
                    playlists.push(playlist);
                   
                }
                playlist.songs.push(songs[currentSongIndex]);
                renderPlaylistSongs(playlist);
            } else {
                alert("Please select a playist");
                return false;
            }
        }

        function createPlaylist() {
            if(document.getElementById('playlist_name').value !=""){
                playlistName=document.getElementById('playlist_name').value;
                const playlist = { name: playlistName, songs: [] };
                playlists.push(playlist);
                document.getElementById('playlist_name').value="";
                showPlaylists();
            } else {
                alert('Enter the playlist name');
                return false;
            }
        }

        function showPlaylists() {
            // const searchQuery = document.getElementById('searchPlaylists').value.toLowerCase();
            // const filteredPlaylists = playlists.filter(playlist =>
            //     playlist.name.toLowerCase().includes(searchQuery)
            // );
            const playlistsList = document.getElementById('playlistsList');
            playlistsList.innerHTML = '';
            playlists.forEach(playlist => {
                const li = document.createElement('li');
                li.textContent = playlist.name;
                li.addEventListener('click', () => renderPlaylistSongs(playlist));
                playlistsList.appendChild(li);
            });
        }

        function renderPlaylistSongs(playlist) {
            console.log(playlist);
            console.log(playlist.name);
            const playlistSongsDiv = document.getElementById('playlistSongsDiv');
            current_playlist = playlist.name;
            playlistSongsDiv.innerHTML = '';
            playlist.songs.forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.name} - ${song.artist}`;
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'X';
                removeBtn.addEventListener('click', () => removeSongFromPlaylist(playlist, song));
                li.appendChild(removeBtn);
                playlistSongsDiv.appendChild(li);
            });
        }

        function removeSongFromPlaylist(playlist, song) {
            playlist.songs = playlist.songs.filter(s => s.id !== song.id);
            renderPlaylistSongs(playlist);
        }
        function handleToggleChange() {
            const toggleSwitch = document.getElementById('toggleSwitch');
            const sliderSpan = document.getElementById('slider-text');
            if (toggleSwitch.checked) {                
                sliderSpan.textContent = "Light";
                document.body.setAttribute('data-theme', "dark");
            } else {
                sliderSpan.textContent = "Dark";
                document.body.setAttribute('data-theme', "light");
            }
            
        }
        // Initialize the app by showing all songs and playlists
        showSongs();
        showPlaylists();