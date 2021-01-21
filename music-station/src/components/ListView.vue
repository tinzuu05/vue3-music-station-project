<template>
    <div v-for="playlist in playlists" :key="playlist.id">
        <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id }}">
            <div class="single">
                <div class="thumbnail">
                    <img :src="playlist.coverUrl">
                </div>
                <div class="info">
                    <h3>{{ playlist.title }}</h3>
                    <p>Created by {{ playlist.userName }}</p>
                </div>
                <div class="song-number">
                    <p>{{ playlist.songs.length }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['playlists']
}
</script>

<style scoped>
    .single {
        display: flex;
        align-items: center;
        margin: 16px 0;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        transition: all ease .2s;
    }

    .single:hover {
        box-shadow: 1px 2px 3px rgba(50, 50, 50, .05);
        transform: scale(1.02);
        transition: all ease .2s;
    }

    .thumbnail {
        max-width: 100px;
        max-height: 100px;
        overflow: hidden;
        border-radius: 10px;
    }

    img {
        max-width: 100%;
        max-height: 100%;
        display: block;
    }

    .info {
        margin: 0 30px;
    }

    .song-number {
        margin-left: auto;
    }
</style>