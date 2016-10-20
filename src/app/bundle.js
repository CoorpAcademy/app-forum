import createApp from '.';

const container = document.getElementById('forum');
createApp({
  container,
  ...window.forumOptions
});
