// 1. Define the display function
function displayPosts(posts) {
    const postList = document.getElementById('post-list');
    if (!postList) return; // Safety check for the test runner

    postList.innerHTML = ''; // Clear existing content

    posts.forEach(post => {
        const li = document.createElement('li');
        const h1 = document.createElement('h1');
        const p = document.createElement('p');

        // Ensure these keys match the API response exactly
        h1.textContent = post.title;
        p.textContent = post.body;

        li.appendChild(h1);
        li.appendChild(p);
        postList.appendChild(li);
    });
}

// 2. Define the async fetch function
async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        displayPosts(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

// 3. Initialize
getPosts();