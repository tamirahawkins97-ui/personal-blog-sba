// Form Submit Listener
blogForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    // Reset error messages
    titleError.textContent = "";
    blogTextError.textContent = "";
    
    // Grab values
    const titleValue = titleInput.value.trim();
    const blogTextValue = blogText.value.trim();
    let isValid = true;

    // Validate title
    if (titleValue === "") {
        titleError.textContent = "Title is required!";
        isValid = false;
    }

    // Validate content
    if (blogTextValue === "") {
        blogTextError.textContent = "Blog content cannot be empty!";
        isValid = false;
    }

    // Stop if invalid
    if (!isValid) {
        console.warn("Form validation failed!");
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

    // Save post
    posts.push(newPost);
    localStorage.setItem(
        BLOG_POSTS_KEY,
        JSON.stringify(posts)
    );

    // Console logs for debugging
    console.log("Saved post to array:", newPost);
    console.log("Updated Local Storage:", JSON.parse(localStorage.getItem(BLOG_POSTS_KEY)));

    // Display immediately
    renderPost(newPost);

    // Clear form
    titleInput.value = "";
    blogText.value = "";
});