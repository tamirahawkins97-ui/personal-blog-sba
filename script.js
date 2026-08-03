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

// Initialize posts array with existing stored data
const posts = getSavedPosts();

// Creates post elements, attaches button listeners, and appends to DOM
const renderPost = (post) => {
    const li = document.createElement("li");

    // Creating HTML content for CSS styling
    li.innerHTML = `
        <h3>${post.title}</h3>
        <p class="content">${post.content}</p>
        <p class="timestamp">Posted: ${post.timestamp}</p>
    `;

    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";
    editButton.classList.add("edit-btn");
    deleteButton.classList.add("delete-btn");

    // DELETE BUTTON LISTENER
    deleteButton.addEventListener("click", () => {
        li.remove();

        const index = posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
            posts.splice(index, 1);
        }

        localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
    });

    // EDIT BUTTON LISTENER
    editButton.addEventListener("click", () => {
        const updatedTitle = prompt("Edit Title:", post.title);
        const updatedContent = prompt("Edit Content:", post.content);

        if (
            updatedTitle !== null &&
            updatedContent !== null &&
            updatedTitle.trim() !== "" &&
            updatedContent.trim() !== ""
        ) {
            post.title = updatedTitle.trim();
            post.content = updatedContent.trim();

            localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));
            location.reload();
        } else {
            alert("Title and content cannot be empty!");
        }
    });

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    blogList.appendChild(li);
};

// Render saved posts when page loads
posts.forEach((post) => {
    renderPost(post);
});

// Form Submit Listener
blogForm.addEventListener("submit", (event) => {
    event.preventDefault();

    titleError.textContent = "";
    blogTextError.textContent = "";

    const titleValue = titleInput.value.trim();
    const blogTextValue = blogText.value.trim();
    let isValid = true;

    if (titleValue === "") {
        titleError.textContent = "Title is required!";
        isValid = false;
    }

    if (blogTextValue === "") {
        blogTextError.textContent = "Blog content cannot be empty!";
        isValid = false;
    }

    if (!isValid) {
        return;
    }

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

    posts.push(newPost);
    localStorage.setItem(BLOG_POSTS_KEY, JSON.stringify(posts));

    renderPost(newPost);

    titleInput.value = "";
    blogText.value = "";
});