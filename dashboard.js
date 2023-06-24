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

      // STEP 15 - Write an if statement that checks if the length of the result is equal to zero. Write a notification to the users if (result.length === 0){ getBestStudents.innerHTML = "No Information Found";}
      if (result.length === 0) {
        getBestStudents.innerHTML = "No Information Found";
      } else {
        // STEP 16 - Use the map method on the result. When looping through the result, create a div that dynamically displays the necessary contents. Remember resultData, which is the array literal created above, we're simply just pushing items into it off the result of mapping through the result.
        resultData = result.map(
          (item) => `
            <div class="search-card">
           
              <div class="card">
                <pclass="name">Name:</pclass=>
                <p>${item.name}</p>
              </div>
            </div>
          `
        );
        console.table(resultData);

        // Append the resultData to the getBestStudents div
        getBestStudents.innerHTML = resultData.join("");
      }
    })
    .catch((error) => console.log("error", error));
});
