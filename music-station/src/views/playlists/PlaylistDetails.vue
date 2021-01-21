<template>
  <div v-if="error" class="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">

    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <div class="description">{{ playlist.description }}</div>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to this playlist yet.</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleClick(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist" />
    </div>
  </div>
</template>

<script>
import AddSong from '@/components/AddSong.vue'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
    props: ['id'],
    components: { AddSong },
    setup(props) {
      const { document: playlist, error } = getDocument('playlists', props.id)
      const { user } = getUser()
      const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
      const { deleteImage } = useStorage()
      const router = useRouter()

      const ownership = computed(() => {
        return playlist.value && user.value && user.value.uid == playlist.value.userId
      })

      const handleDelete = async () => {
        await deleteImage(playlist.value.filePath)
        await deleteDoc()
        router.push({ name: 'Home' })
      }

      const handleClick = async (id) => {
        const songs = playlist.value.songs.filter(song => song.id != id)
        await updateDoc({ songs })
      }

      return { playlist, error, ownership, handleDelete, handleClick }
    }
}
</script>

<style>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }

  .cover {
    position: relative;
    padding: 160px;
    overflow: hidden;
    border-radius: 20px;
  }

  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 110%;
    max-height: 110%;
  }

  .playlist-info {
    text-align: center;
  }

  .playlist-info h2 {
    margin-top: 20px;
    text-transform: capitalize;
    font-size: 28px;
  }

  .playlist-info p {
    margin-bottom: 20px;
  }

  .username {
    color: #999;
  }

  .description {
    text-align: left;
  }

  .single-song {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px dashed var(--secondary);
  }
</style>