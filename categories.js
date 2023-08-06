//add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

function activeLink(params) {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}
list.forEach((item) => item.addEventListener("mouseover", activeLink));

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function (params) {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
// ===================================================functionalities=================================================

// STEP 1 - Create a function declaration.
function fetchData() {
  // STEP 2 - Get the pageModal and add a style of flex to it, remember that the style of the pageModal is none before now.
  const pageModal = document.getElementById("pageModal");
  pageModal.style.display = "flex";

  // STEP 3 - Create a variable and assign the token you stored in the local storage to it.
  const authToken = localStorage.getItem("adminObj");
  // STEP 4 - Convert the variable you created above to an object using the JSON.parse method.
  const tokenAcquired = JSON.parse(authToken);
  // STEP 5 - Take this parsed token and get the token value e.g const token = tokenAcquired.token;.
  const token = tokenAcquired.token;

  // STEP 6 - Create a new Headers constructor and assign it to a variable.
  const headers = new Headers();
  // STEP 7 - To the Headers() constructor above append the authorization and bearer token to it.
  headers.append("Authorization", `Bearer ${token}`);

  // STEP 8 - Create a request object and add the method and headers key-value pair to it.
  const request = {
    method: "GET",
    headers: headers,
  };

  // STEP 9 - Create a URL variable and then assign the API link to it.
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/admin_dashboardapi";

  // STEP 10 - Use the fetch api and add the URL and request object created to it as a parameter.
  fetch(url, request)
    .then((response) => response.json())
    .then((result) => {
      // STEP 11 - Then get the response and use the json() function on it

      // STEP 12 - Then get the result and do the following to the result from the endpoint...
      // STEP 13 - get the ID of the cards on the dashboard.html file namely category, learningMaterials, subCategories, totalQuiz, totalStudents, and adminUsername, remember, the last one is the Username situated at the navbar. E.g const getCategory = document.getElementById("category");
      const getCategory = document.getElementById("category");
      const getLearningMaterials = document.getElementById("learningMaterials");
      const getSubCategories = document.getElementById("subCategories");
      const getTotalQuiz = document.getElementById("totalQuiz");
      const getTotalStudents = document.getElementById("totalStudents");
      const getAdminUsername = document.getElementById("adminUsername");

      // STEP 14 - Now, to each of them, add the corresponding result to their innerHTML e.g getCategory.innerHTML = `${result.total_number_of_categories}`;, check the documentation for the remaining values you're displaying.
      getCategory.innerHTML = `${result.total_number_of_categories}`;
      getLearningMaterials.innerHTML = `${result.total_number_of_learningmaterial}`;
      getSubCategories.innerHTML = `${result.total_number_of_subcategories}`;
      getTotalQuiz.innerHTML = `${result.total_number_of_quize}`;
      getTotalStudents.innerHTML = `${result.total_number_of_students}`;
      getAdminUsername.innerHTML = `${result.admin_name}`;

      // STEP 15 - Change the style of the pageModal to none.
      pageModal.style.display = "none";
    })
    .catch((error) => console.log("error", error));
}

// STEP 16 - Call the function you just created from step 1.
fetchData();

// To get top three students
// STEP 1 - Get the top three student button from the dashboard.html
const topThreeStudentButton = document.getElementById("topThreeStudentButton");

// STEP 2 - To this button, add an event listener with a click event and a callback function that has an event params passed to it.
topThreeStudentButton.addEventListener("click", function (event) {
  // STEP 3 - Prevent the default behavior of buttons using the normal process.
  event.preventDefault();

  // STEP 4 - Get the studentModal and then add style block to it.
  const studentModal = document.getElementById("studentModal");
  const btn3 = document.getElementById("btn3");
  studentModal.style.display = "flex";

  // STEP 5 - Get the token stored on your local storage, convert it to an object and then get the actual token from the object e.g const authToken = localStorage.getItem("adminObj");const tokenAcquired = JSON.parse(authToken);const token = tokenAcquired.token;
  const authToken = localStorage.getItem("adminObj");
  const tokenAcquired = JSON.parse(authToken);
  const token = tokenAcquired.token;

  // STEP 6 - Create a new Header constructor and assign that to a variable
  const headers = new Headers();
  // STEP 7 - Append this "Authorization", Bearer ${token} to the variable you created above.
  headers.append("Authorization", `Bearer ${token}`);

  // STEP 8 - Create a request object and add the method and headers key-value pair to it.
  const request = {
    method: "GET",
    headers: headers,
  };

  // STEP 9 - Create a URL variable and then assign the API link to it.
  const url =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/top_three_students";

  // STEP 10 - Initialize an array. I.e create an empty array literal, name it resultData.
  let resultData = [];

  // STEP 11 - Use the fetch api and add the URL and request object created to it as a parameter.
  fetch(url, request)
    .then((response) => response.json())
    .then((result) => {
      // STEP 12 - Then get the response and use the json() function on it

      // STEP 13 - Then get the result and do the following to the result from the endpoint...
      // STEP 14 - Get the div that will contain the dynamically created top 3 students information from your HTML, you can name it getBestStudents
      const getBestStudents = document.getElementById("getBestStudents");

      btn3.addEventListener("click", () => {
        studentModal.style.display = "none";
      });
      studentModal.addEventListener("click", () => {
        studentModal.style.display = "none";
      });

      // STEP 15 - Write an if statement that checks if the length of the result is equal to zero. Write a notification to the users if (result.length === 0){ getBestStudents.innerHTML = "No Information Found";}
      if (result.length === 0) {
        getBestStudents.innerHTML = "No Information Found";
      } else {
        // STEP 16 - Use the map method on the result. When looping through the result, create a div that dynamically displays the necessary contents. Remember resultData, which is the array literal created above, we're simply just pushing items into it off the result of mapping through the result.
        resultData = result.map(
          (item) => `
            <div class="search-card">
           
              <div class="card">
                <p>Name: </p>
                <p>${item.name}</p>
              </div>
              <div class="card">
                <p>Email: </p>
                <p>${item.email}</p>
              </div>
              <div class="card">
                <span>Phone: </span>
                <span>${item.phone_number}</span>
              </div>
              <div class="card">
                <p>Position: </p>
                <p>${item.position}</p>
              </div>
              <div class="card">
                <p>Score: </p>
                <p>${item.total_score}</p>
              </div>
            </div>
          `
        );

        getBestStudents.innerHTML = resultData.join("");
      }
    })
    .catch((error) => console.log("error", error));
});

// category

// // STEP 1: Function to create categories
// function createCategory() {
//   // STEP 2: Get the name, image input, and button
//   const nameInput = document.getElementById("Category-name");
//   const imageInput = document.getElementById("image");
//   const createButton = document.getElementById("createBtn");

//   // STEP 3: Add the pulse class to the button and change the label/text
//   createButton.classList.add("pulse");
//   createButton.innerText = "Sending";

//   // STEP 4a: Check if inputs are empty
//   if (!nameInput.value || !imageInput.value) {
//     alert("All fields are required.");
//     // STEP 4b: Reset the button state and return early
//     resetButton();
//     return;
//   }

//   // STEP 5: Get the token from local storage
//   const authToken = localStorage.getItem("adminObj");
//   const tokenAcquired = JSON.parse(authToken);
//   const token = tokenAcquired.token;

//   // STEP 6: Create a new Headers object with Authorization
//   const headers = new Headers();
//   headers.append("Authorization", `Bearer ${token}`);

//   // STEP 7: Create a new FormData object and append inputs
//   const formData = new FormData();
//   formData.append("name", nameInput.value);
//   formData.append("image", imageInput.value);

//   // STEP 8: Create the category request object
//   const categoryRequest = {
//     method: "POST",
//     headers: headers,
//     body: formData,
//   };

//   // STEP 9: Define the endpoint
//   const endpoint =
//     "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

//   // STEP 10: Use fetch API to make the request
//   fetch(endpoint, categoryRequest)
//     .then((response) => response.json())
//     .then((result) => handleResponse(result))
//     .catch((error) => handleError(error));
// }

// // STEP 11: Handle the response
// function handleResponse(result) {
//   // STEP 12: Console log the result
//   console.log(result);

//   // STEP 13: Check the status of the response
//   if (result.status === "success") {
//     // Show success notification and redirect
//     showNotification("Category successfully created.");
//     setTimeout(() => {
//       resetButton();
//       window.location.href = "category.html";
//     }, 5000);
//   } else {
//     // Show error notification
//     showNotification("Category not created.");
//     resetButton();
//   }
// }

// // STEP 14: Show notification function
// function showNotification(message) {
//   // Show your notification message to the user
//   alert(message);
// }

// // STEP 15: Catch the error
// function handleError(error) {
//   console.error("Error:", error);
//   showNotification("An error occurred. Please try again later.");
//   resetButton();
// }

// // Utility function to reset the button state
// function resetButton() {
//   const createButton = document.getElementById("createBtn");
//   createButton.classList.remove("pulse");
//   createButton.innerText = "Create category";
// }

// // Attach the event listener to the form submission
// const form = document.querySelector("form");
// form.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the form from submitting normally
//   createCategory(); // Call the createCategory function
// });

const categoryNameInput = document.getElementById("Category-name");
const categoryImageInput = document.getElementById("image");
const createCategoryBtn = document.getElementById("createBtn");

createCategoryBtn.addEventListener("click", createCategory);

function createCategory(event) {
  event.preventDefault();
  // STEP 3
  createCategoryBtn.classList.add("pulse");
  createCategoryBtn.textContent = "Sending...";

  // STEP 4a
  const categoryName = categoryNameInput.value;
  const categoryImage = categoryImageInput.files[0];

  if (categoryName === "" || categoryImage === "") {
    alert("All fields are required");
    // STEP 4b
    createCategoryBtn.classList.remove("pulse");
    createCategoryBtn.textContent = "Create Category";
    // return;
  }

  // STEP 5
  const authToken = localStorage.getItem("adminObj");
  const tokenAcquired = JSON.parse(authToken);
  const token = tokenAcquired.token;

  // STEP 6
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  // STEP 7
  const formData = new FormData();
  formData.append("name", categoryName);
  formData.append("image", categoryImage);

  // STEP 8
  const categoryRequest = {
    method: "POST",
    headers: headers,
    body: formData,
  };

  // STEP 9
  const URL =
    "https://pluralcodesandbox.com/yorubalearning/api/admin/create_category";

  // STEP 10
  fetch(URL, categoryRequest)
    // STEP 11
    .then((response) => response.json())
    // STEP 12
    .then((result) => {
      console.log(result.message);
      // STEP 13
      if (result.status === "success") {
        alert("Category successfully created");
        setTimeout(() => {
          location.href = "category.html";
        }, 5000);
      } else {
        // STEP 14
        alert("Category not created");
      }
      // STEP 15
      createCategoryBtn.classList.remove("pulse");
      createCategoryBtn.textContent = "Create Category";
    })
    // STEP 15
    .catch((error) => {
      console.log("Error:", error);
    });
}
