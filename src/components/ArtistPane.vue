<template>
  <div class="pane">
    <div
      class="art-window"
      :style="{backgroundImage: `url(${artist.images[0] && artist.images[0].url || ''})`}"
    />
    <div class="artist-name">{{artist.name}}</div>
  </div>
</template>

<script>
export default {
  props: ["artist"],
  methods: {},
  data() {
    return {
      lowRes: { width: 0, url: "" },
      highRes: { width: 0, url: "" }
    };
  },
  created() {
    let images = this.artist.images;
    for (let image in images) {
      image = images[image];
      if (!this.lowRes || (this.lowRes && this.lowRes.width > image.width)) {
        this.lowRes = image;
      }
      if (!this.highRes || (this.highRes && this.highRes.width < image.width)) {
        this.highRes = image;
      }
    }
  }
};
</script>

<style scoped>
.pane {
  font-size: 16px;
  width: 6em;
  max-width: 6em;
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0.5em;
}
.art-window {
  height: 6em;
  width: calc(6em - 2px);
  border: 1px solid #43a2fd;
  outline: 0 solid #43a2fd;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  box-shadow: 0 0 0 0 rgba(8, 112, 184, 0.7);
  transition: box-shadow 0.2s linear;
}
.art-window:hover {
  box-shadow: 0 0 8px 1px rgba(8, 112, 184, 0.7);
  outline: 1px solid #43a2fd;
}
.artist-name {
  padding: 3px 0 10px;
  font-size: 12px;
  line-height: 12px;
  max-height: 2em;
  height: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
