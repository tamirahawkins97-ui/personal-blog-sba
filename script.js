const blogForm = document.getElementById("blogForm");
const titleInput = document.getElementById("title");
const titleError = document.getElementById("titleError");
const blogTextError = document.getElementById("blogTextError");
const blogList = document.getElementById("blogList");
const blogText = document.getElementById("blogText");

const BLOG_POSTS_KEY = "saved_blog_posts";

// Getter: safely checks localStorage and parses JSON or returns []
const getSavedPosts = () => {
    if (typeof window !== "undefined") {
        const savedData = localStorage.getItem(BLOG_POSTS_KEY);
        return savedData ? JSON.parse(savedData) : [];
    }
    return [];
};

// 1. Initialize posts array with existing stored data
const posts = getSavedPosts();

// Reusable Helper Function: Creates post elements, attaches button listeners, and appends to DOM
const renderPost = (post) => {
    const li = document.createElement("li");

    // Creating HTML content for CSS Styling
    li.innerHTML = `<h3>${post.title}</h3>
    <p class="content">${post.content}</p>
    <p class="timestamp">Posted: ${post.timestamp}</p>`;
    
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.classList.add("edit-btn");
    deleteButton.classList.add("delete-btn");

    // DELETE BUTTON LISTENER
    deleteButton.addEventListener("click", () => {
        // Remove from the page UI
        li.remove();

        // Find the post index in the array by its unique ID and remove it
        const index = posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
            posts.splice(index, 1);
        }

        // Save updated posts array to localStorage
        localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
    });

    // EDIT BUTTON LISTENER
    editButton.addEventListener("click", () => {
        const updatedTitle = prompt("Edit Title:", post.title);
        const updatedContent = prompt("Edit Content:", post.content);

        if (updatedTitle !== null && updatedContent !== null) {
            // Update the post object properties
            post.title = updatedTitle.trim();
            post.content = updatedContent.trim();

            // Save changes to localStorage and refresh page to show updated text
            localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
            location.reload();
        }
    });

    // Attach buttons inside the <li>
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Append <li> to the main <ul> list
    blogList.appendChild(li);
};

// 2. Render existing stored posts on page load
posts.forEach((post) => {
    renderPost(post);
});

// 3. Form Submit Listener with Validation & Immediate DOM Rendering
blogForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Reset error messages
    titleError.textContent = "";
    blogTextError.textContent = "";

    // Grab input values
    const titleValue = titleInput.value.trim();
    const blogTextValue = blogText.value.trim();

    let isValid = true;

    // Safety checks
    if (titleValue === "") {
        titleError.textContent = "Title is required!";
        isValid = false;
    }

    if (blogTextValue === "") {
        blogTextError.textContent = "Blog content cannot be empty!";
        isValid = false;
    }

    // Stop early if invalid
    if (!isValid) {
        return;
    }

    // Create new post object
    const newPost = {
        id: Date.now(),
        title: titleValue,
        content: blogTextValue,
       timestamp: new Date().toLocaleString("en-US", {
       month: "short",
       day: "numeric",
       year: "numeric",
       hour: "numeric",
       minute: "2-digit"
    })
    };

    // Save to array and update localStorage
    posts.push(newPost);
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));

    // Render the newly created post directly to the DOM
    renderPost(newPost);

    // Clear input fields
    titleInput.value = "";
    blogText.value = "";
});