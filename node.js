// 1. Function to Display Posts
function displayPosts(posts) {
    const ul = document.getElementById('post-list');
    ul.innerHTML = ''; // Clear the list first

    posts.forEach(post => {
        const li = document.createElement('li');
        
        const h1 = document.createElement('h1');
        h1.textContent = post.title;

        const p = document.createElement('p');
        p.textContent = post.body;

        li.appendChild(h1);
        li.appendChild(p);
        ul.appendChild(li);
    });
}

// 2. Async Function to Fetch Data
async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const data = await response.json();
        
        // 3. Call display function
        displayPosts(data);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Initialize the app
fetchPosts();