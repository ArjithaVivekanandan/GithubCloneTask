document.getElementById("search_submit").innerHTML="Search";

//Handling keyboard enter for API call
document.getElementById("search_text").addEventListener("keypress", function(event) {
  
  if (event.key === "Enter") {
    
    userApiCall();
  }
});

//Error Message Div 
    var error_me=document.createElement("div");
    error_me.setAttribute("class","text-danger h2");
    error_me.innerHTML="Oooops..No Records Found!!!";

//Get user list    
async function userApiCall()
 {
  content.innerHTML="";
  var search_str=document.getElementById("search_text").value;

  var userData= await (await fetch("https://api.github.com/search/users?q="+search_str+"+in:user")).json();
 
    if(userData.total_count>0){
      
    return handleResponse(userData);  
    }
    else
    {
        document.getElementById("content").innerHTML = error_me.outerHTML;
    }
  }

  //Parse user data and append to html tags
function handleResponse(response) {
  
    try{
        
      response.items.forEach(element => {
          
        var item = element.login;

        var cardgroup=document.createElement("div");
        cardgroup.setAttribute("class","col sm-12 md-6 lg-4 mb-4");

        var card=document.createElement("div");
        card.setAttribute("style","border:2px solid beige;width:20rem");
        
        var image_div =document.createElement("img");
        image_div.setAttribute("class","card-img-top");
        image_div.setAttribute("src",element.avatar_url); 

        var card_body_div = document.createElement("div");
        card_body_div.setAttribute("class","card-body");

        var title_div = document.createElement("h6");
        title_div.setAttribute("class","text-danger");
        title_div.innerHTML=item;

       var repo_link=document.createElement("a");
       repo_link.setAttribute("class","btn btn-warning");
       
       repo_link.onclick=function() { ViewRepository(element.repos_url) };
       
       repo_link.innerHTML="View Repositories";

        card_body_div.append(title_div,repo_link);
        card.append(image_div,card_body_div);
        cardgroup.append(card);
        
        document.getElementById("content").append(cardgroup);
      
  
      }); 

    }
    catch{
     
      document.getElementById("content").innerHTML = error_me.outerHTML;
    }
  }


  //Obtain Repository list of user
 async function ViewRepository(repoApi){
    content.innerHTML="";  
  
    var repoRequest= await (await fetch(repoApi)).json();
    if(repoRequest.length>0)
    return handleRepo(repoRequest);
    else
    document.getElementById("content").innerHTML = error_me.outerHTML;
   
  }

  //Parse and append Repository list to html tags
  function handleRepo(repoResponse){
    console.log(repoResponse);
    try{
      var repo_title_div = document.createElement("a");
        repo_title_div.setAttribute("class","text-primary h4");

      for (var i = 0; i < repoResponse.length; i++) 
      {
        var repoitem = repoResponse[i].name;

        
        
         
        repo_title_div.innerHTML+= "<br>"+repoitem+"<br>";

        
     
    }
    
    document.getElementById("content").append(repo_title_div);
  }
  catch{
    
    document.getElementById("content").innerHTML = error_me.outerHTML;
  }

  }

  
  