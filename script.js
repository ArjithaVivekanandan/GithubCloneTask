//Declaration to read value from input text box
var search_str;

//Append text for buttons
document.getElementById("searchusers_submit").innerHTML = "Search By Users";
document.getElementById("searchrepo_submit").innerHTML = "Search By Repository";


//Handling keyboard enter for API call
document.getElementById("search_text").addEventListener("keypress", function (event) {

  if (event.key === "Enter") {
    alert("Please click on the button by which Search needs to be done");

  }
});

//Error Message Div 
var error_me = document.createElement("div");
error_me.setAttribute("class", "alert alert-danger h5");
error_me.setAttribute("role", "alert");



//Get user list    
async function userApiCall() {

  content.innerHTML = "";
  search_str = document.getElementById("search_text").value;
  if (search_str != "") {
    search_str = search_str.split(" ").join("");
    var userData = await (await fetch("https://api.github.com/search/users?q=" + search_str + "+in:user")).json();

    if (userData.total_count > 0) {

      return handleResponse(userData);
    }
    else {
      error_me.innerHTML = "Oooops..No Records Found!!!";
      document.getElementById("content").innerHTML = error_me.outerHTML;
    }
  }
  else {
    error_me.innerHTML = "Please Enter Username or Repository ]to Search!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }
}

//Parse user data and append to html tags
function handleResponse(response) {

  try {

    response.items.forEach(element => {

      var item = element.login;

      var cardgroup = document.createElement("div");
      cardgroup.setAttribute("class", "col sm-12 md-6 lg-4 mb-4");

      var card = document.createElement("div");
      card.setAttribute("style", "width:20rem");
      card.setAttribute("class", "shadow-lg bg-light rounded");

      var image_div = document.createElement("img");
      image_div.setAttribute("class", "card-img-top");
      image_div.setAttribute("src", element.avatar_url);

      var card_body_div = document.createElement("div");
      card_body_div.setAttribute("class", "card-body");

      var title_div = document.createElement("h5");
      title_div.setAttribute("class", "text-dark");
      title_div.innerHTML = item;

      var repo_link = document.createElement("button");
      repo_link.setAttribute("class", "btn btn-primary");

      repo_link.onclick = function () { ViewRepository(element.repos_url) };

      repo_link.innerHTML = "View Repositories";

      card_body_div.append(title_div, repo_link);
      card.append(image_div, card_body_div);
      cardgroup.append(card);

      document.getElementById("content").append(cardgroup);


    });

  }
  catch {
    error_me.innerHTML = "Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }
}


//Obtain Repository list of user
async function ViewRepository(repoApi) {

  content.innerHTML = "";

  var repoRequest = await (await fetch(repoApi)).json();
  if (repoRequest.length > 0)
    return handleRepo(repoRequest);
  else {
    error_me.innerHTML = "Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }

}

//Parse and append Repository list to html tags
function handleRepo(repoResponse) {

  try {

    var Repopage_div = document.createElement("div");
    Repopage_div.setAttribute("class", "container text-justify");

    var repoPageTitle = document.createElement("h5");
    repoPageTitle.setAttribute("class", "row mb-1 p-1 text-dark");
    repoPageTitle.innerHTML = "Click on Repository Name to view files";

    Repopage_div.append(repoPageTitle);


    repoResponse.forEach(RespElement => {
      var repoitem = RespElement.name;

      var Repo_div = document.createElement("div");
      Repo_div.setAttribute("class", "row text-justify");

      var repo_title_div = document.createElement("u");
      repo_title_div.setAttribute("class", "row p-4 text-primary");


      repo_title_div.onclick = function () { ViewRepositoryFiles(RespElement.full_name) };

      repo_title_div.innerHTML = repoitem;

      Repo_div.append(repo_title_div);
      Repopage_div.append(Repo_div);

    })
    document.getElementById("content").append(Repopage_div);

  }
  catch {
    error_me.innerHTML = "Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }

}


//Get Repository files list
async function ViewRepositoryFiles(repofullName) {
  console.log(repofullName);
  content.innerHTML = "";
  var repofilesApi = "https://api.github.com/repos/" + repofullName + "/contents";
  var repofilesRequest = await (await fetch(repofilesApi)).json();
  if (repofilesRequest.length > 0) {
    return handleRepofiles(repofilesRequest);
  }
  else {
    error_me.innerHTML = "Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }
}


//Obtain Repository file name and append to html tags
function handleRepofiles(repofilesResponse) {
  console.log(repofilesResponse);

  try {
    var Repofiles_div = document.createElement("div");
    Repofiles_div.setAttribute("class", "container text-justify");

    var filePageTitle = document.createElement("h5");
    filePageTitle.setAttribute("class", "row mb-1 p-1 text-dark");
    filePageTitle.innerHTML = "Click to view each file";


    Repofiles_div.append(filePageTitle);

    repofilesResponse.forEach(fileElement => {

      var repofileitem = fileElement.name;

      var repofiles_title_div = document.createElement("a");
      repofiles_title_div.setAttribute("class", "row p-4 text-primary");
      repofiles_title_div.setAttribute("href", fileElement.html_url);
      repofiles_title_div.setAttribute("target", "_blank");


      repofiles_title_div.innerHTML += repofileitem;



      Repofiles_div.innerHTML += repofiles_title_div.outerHTML;

    });
    document.getElementById("content").append(Repofiles_div);

  }
  catch {
    error_me.innerHTML = "Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }

}

//Search by Repository Name

async function ViewRepositoryApiCall() {

  content.innerHTML = "";
  search_str = document.getElementById("search_text").value;
  if (search_str != "") {
    search_str = search_str.split(" ").join("");
    var repoData = await (await fetch("https://api.github.com/search/repositories?q=" + search_str + "in:name")).json();
    if (repoData.total_count > 0) {

      return handleViewRepoResponse(repoData);
    }
    else {
      document.getElementById("content").innerHTML = error_me.outerHTML;
    }
  }
  else {
    error_me.innerHTML = "Please Enter Username or Repository ]to Search!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }
}

//Obtain Repository names of matching users and append to html tags
function handleViewRepoResponse(viewResponse) {
  try {

    var viewRepo_div = document.createElement("div");
    viewRepo_div.setAttribute("class", "container text-justify");

    var viewRepo_divTitle = document.createElement("h5");
    viewRepo_divTitle.setAttribute("class", "row mb-1 p-1 text-dark");
    viewRepo_divTitle.innerHTML = "Click to view files in Repositories";



    viewRepo_div.append(viewRepo_divTitle);

    viewResponse.items.forEach(viewElement => {

      var viewRepoitem = viewElement.full_name;

      var viewRepolist_div = document.createElement("div");
      viewRepolist_div.setAttribute("class", "row text-justify");

      var viewrepo_title_div = document.createElement("u");
      viewrepo_title_div.setAttribute("class", "row p-4 text-primary");

      viewrepo_title_div.onclick = function () { ViewRepositoryFiles(viewRepoitem) };

      viewrepo_title_div.innerHTML = viewRepoitem;

      viewRepolist_div.append(viewrepo_title_div);
      viewRepo_div.append(viewRepolist_div);

    })
    document.getElementById("content").append(viewRepo_div);

  }
  catch {
    error_me.innerHTML = "Oooops..No Records Found!!!";
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }

}
