export async function load({ params }) {
    // 'params.slug' captures the dynamic part of the URL
    const { slug } = params;
    
    // Fetch the blog post data from your backend or a static file
    const res = await fetch(`https://your-backend.com/posts/${slug}`);
    const post = await res.json();
    
    // Check if the post exists
    if (res.ok) {
        return { props: { post } };
    } else {
        return {
            status: 404,
            error: new Error('Post not found')
        };
    }
}
