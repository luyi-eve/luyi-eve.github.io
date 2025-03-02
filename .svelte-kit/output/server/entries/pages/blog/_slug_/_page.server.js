async function load({ params }) {
  const { slug } = params;
  const res = await fetch(`https://your-backend.com/posts/${slug}`);
  const post = await res.json();
  if (res.ok) {
    return { props: { post } };
  } else {
    return {
      status: 404,
      error: new Error("Post not found")
    };
  }
}
export {
  load
};
