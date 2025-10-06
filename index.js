const express = require("express");
const app = express();
let port =3000;
const path = require("path");
const methodOverride=require("method-override");


const { v4: uuidv4 } = require("uuid");



app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname, "public")));


let posts =[
    {

        id:uuidv4(),
        username:"sanskarkolte",
        content: "I am going to make it big",

    },

    {
        id:uuidv4(),
        username:"tonystark",
        content:"Bhai mera iron man ban he betha hai",
    },

    {
        id:uuidv4(),
        username:"SteveRogers",
        content:"whatever it takes ",
    },

];

   

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
    
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});


app.post("/posts",(req,res)=>{
 
    let {username,content} = req.body;
    let id =uuidv4();

    posts.push({id,username,content});
    res.redirect("/posts");         //basically main page pe he redirect hona chanhiye 
                                     //matlab index.ejs wale page pe 
    

});


app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => id===p.id);       //array find func see info.txt file
    //  console.log(post);
     res.render("singlepost.ejs",{post});

    });

app.patch("/posts/:id",(req,res)=>{                //  ok so can i underdtand and remember it as whenever i am using put or patchthen for adding new content like to edit content i have to let newcontent =req.body.content and then post.content=newcontent
    let {id} = req.params;
    console.log(id);
    let newcontent=req.body.content;     //content ko alag karr liya
    let post = posts.find(p => id===p.id); 
    post.content=newcontent;
    res.redirect("/posts");

})


app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(p => id===p.id); 
    res.render("edit.ejs",{post});


});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter(p => p.id !== id);   // keep only posts that don’t match id
  res.redirect("/posts");                   // go back to the posts page
});





app.listen(port,()=>{
    console.log("listening on port 3000");

});
 
