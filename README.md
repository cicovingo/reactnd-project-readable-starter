# Readable

## Getting Started

* Install and start the API server
    - `cd api-server`
    - `npm install`
    - `node server`
* In another terminal window, install and start the frontend's codebase 
    - `cd frontend`
    - `npm install`
    - `npm install --save reactstrap`
    - `npm start`

* Then, access http://localhost:3000 to run the frontend application.

* Frontend has 8 component
	* src
		* App
			- App.js => main js file
			- AppBar.js => it has application bar
			- AppPost.js => it has general post properties
			- AppPostComment.js => it has general comment properties
		* Create
			- CreateComment.js => it has comment form
			- CreatePost.js => it has post form
		- Root.js => it is home page
		- Detail.js => it has detail of comment and post
		- Page404.js => it is 404 page file
