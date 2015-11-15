<h1>Review Genie Frontend</h1>
<h2>Overview</h2>
<p>
Review genie is an user-based single-page web application that can search and summarize Amazon product reviews to help people quickly make purchase decisions.This is the frontend of the app. Backend repo can be found in <a href="https://github.com/kuramameng/reviewgenie_backend">here</a>.
<h2>User Stories</h2>
As an user, I want to:
<ul>
  <li>register/login account</li>
  <li>create/edit my personal profile</li>
  <li>add/delete my own wishlists</li>
  <li>add/delete multiple products in every wishlist</li>
  <li>search products from Amazon and add them to my wishlist</li>
  <li>get the summaries of Amazon product reviews by counting how many times each keyword appeared in the reviews</li>
</ul>
<h2>Project planning</h2>
Project can be broken down into a number of phases:<br>
1) Find and populate bootstrap template according to the wireframe design<br>
2) Create backend database according to the database structure design<br>
3) Add seed data in database and set up models and controllers<br>
4) Test various requests through curl and write AJAX methods accordingly<br>
5) Populate frontend using jQuery/handlebars with the data returned <br>from the server
6) Deploy frontend on gh-pages and backend on Heroku<br>
<h2>Wireframe</h2>
The initial wireframe and database structure design can be found in <a href="https://github.com/kuramameng/reviewgenie_frontend/blob/master/assets/etc/project2-wireframe.pdf">HERE</a>

<h2>Live demo</h2>
A live demo of this app can be found <a href="http://kuramameng.github.io/reviewgenie_frontend/">HERE</a>

<h2>To-do</h2>
<ul>
  <li>Incorporate Amazon API to the search function</li>
  <li>Work on algorithm for extracting keywords from product reviews</li>
</ul>

<h2>Credits</h2>
 Bootstrap template <a href="http://www.gettemplate.com/demo/progressus/">Progressus</a> developed by <a href="http://pozhilov.com">Sergey Pozhilov</a> is used in this project. </p>
