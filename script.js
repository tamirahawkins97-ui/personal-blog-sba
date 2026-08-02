const blogForm = document.getElementById("blogForm");
const titleInput = document.getElementById("title");
const titleError = document.getElementById("titleError");
const blogTextError = document.getElementById("blogTextError");
const submitBtn = document.querySelector("button");
const blogList = document.getElementById("blogList");
const blogText = document.getElementById("blogText");
const posts = [];

const BLOG_POSTS_KEY = "saved_blog_posts";

const getSavedPosts = () => {
    if(typeof window !== "undefined") {
    const savedData = localStorage.getItem(BLOG_POSTS_KEY);

    return savedData ? JSON.parse(savedData) : [];
    }
    return [];
};

 const initialPosts = getSavedPosts();
 console.log(getSavedPosts());

initialPosts.forEach((post) => {
    const li = document.createElement("li");
    li.textContent = `${post.title}: ${post.content}`; 
    
    const editButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    editButton.classList.add("edit-btn");
    deleteButton.classList.add("delete-btn");

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    blogList.appendChild(li);

});

submitBtn.addEventListener("submit", (event)=>{
   event.preventDefault();

    titleError.textContent = "";
    blogTextError.textContent = "";

    const titleValue = titleInput.value.trim();
    const textValue = blogText.value.trim();

    if (blogTextValue === "") {
        blogTextError.textContent = "Blog content cannot be empty!";
        isValid = false;
    }
    if (!isValid) {
        return;
    }
});