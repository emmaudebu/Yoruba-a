let signInBtn = document.getElementById("signIn")
signInBtn.textContent="Sign In"

signInBtn.addEventListener("click",(event)=>{

    event.preventDefault()

    //getting values of the inputs

    const email =document.getElementById("email").value
    const password =document.getElementById("password").value

    signInBtn.textContent="Loading...."
    signInBtn.classList.add('pulse')

if (password==="" || email==="") {
    swal.fire({
        icon: "info",
        text: "All fields are required",
        confirmButtonText: "ok",
      });
      signInBtn.innerText = "Sign In";
      signInBtn.classList.remove("pulse");
    
} else {
    const signInData = new FormData();
    signInData.append('email', email)
    signInData.append('password', password)

    const signReg = {
        method: "POST",
        body: signInData,
      };
      const URL = "https://pluralcodesandbox.com/yorubalearning/api/admin_login";

    fetch(URL, signReg)
  
      .then((response) => response.json())

  
      .then((result) => {
        console.log(result, result.status);

    
        localStorage.setItem("adminObj", JSON.stringify(result));

    
        const getAdminObj = localStorage.getItem("adminObj");

    
        const adminObj = JSON.parse(getAdminObj);

    
        if (adminObj.hasOwnProperty("email")) {
          location.href = "dashboard.html";
        }
    
        else {
          Swal.fire({
            icon: "warning",
            title: "Login Unsuccessful",
            text: "Invalid email or password",
          });
        }

      
        signIn.textContent = "Sign In";
        signIn.classList.remove("pulse");
      })

    
      .catch((error) => {
        console.log("Error", error);
      });
  }
});