async function load({ fetch }) {
  const response = await fetch("api/content");
  const posts = await response.json();
  return { posts };
}
export {
  load
};
