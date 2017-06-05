import React from 'react';
import {Link} from 'react-router-dom';
import '../css/about.css';


class About extends React.Component {

	render() {
		return (
		<div className="portfolio-con">
		<Link className="home-link" to="/">digi0ps</Link>
		<div className="portfolio">
			<div className="header center" id="top">
			<h1>About</h1>
			</div>
			<div className="toolazy center">
			Too lazy to read? Here's my Résumé - <a target="blank" href="https://drive.google.com/file/d/0B7z6-uPnrClMbkVnUG9VeXdEQ00/view?usp=sharing" className="resume-link">pdf</a>
			</div>
			<div className="body center">
			<h3>A brief introspection into my life.</h3>
			<p className="para center">
			Hey. I am Sriram. Hailing from one of the most culturaly rich places of India, <i>Madras</i> (Chennai), I was born on the 11th of July 1998 (18 years, yeah <span role="img" aria-label="I rock hand">🤘</span>). I have been in Chennai for my entire life. Kinda get's boring sometimes, but then Chennai is <span role="img" aria-label="blue heart">💙</span>.
			</p>
			<p className="para center">
			My passion for Computers started in 9th grade (2012). I got particularly interested in Web Development. I started learning HTML watching tutorials of this guy named Bucky Roberts. He was amazing and made every concept clear, I love him till now. HTML was followed by CSS and Javascript. By the end of 10th grade, I knew how to make static websites and I made this Rock Paper Scissors game using Javascript ( I found it in my GitHub -> <a href="https://github.com/digi0ps/web/tree/master/rps" target="blank">here</a>). It's a small game barely having a design but am still proud of it. :')
			</p>
			<p className="para center">
			I stopped learning Web Development after that. During my 11th and 12th grade I was occupied with Call Of Duty, Minecraft and C/C++ ( with a little bit of academics ).
			</p>
			<p className="para center">
			College was where my love for programming blossomed again. I was introduced to Python, the programming language, in my first semester. I fell in love with it instantly and started on my path to master Python. I soon started digging into various modules and exploring the awesomeness of Python. I did some web scraping projects using Beautiful Soup and Selenium ( which can be found -> <a href="https://github.com/digi0ps/PyBuilds" target="blank">here</a>). 
			</p>
			<p className="para center">
			After my first semester ended, I decided I need to start web development again. So I started brushing on my knowledge of HTML, CSS, JS. I learned Bootstrap and jQuery during this period and I built my first public site ever. Even thought it wasn't the best website, there was this immense pleasure in seeing a peice of your work online in this great, big internet. <span role="img" aria-label="leaves falling">🍃</span>
			</p>
			<p className="para center">
			As my Second Semester started, my journey towards becoming a full stack developer began. Django was my preffered choice of backend coming from an Pythonic background. So I learned it with my full enthusiasm. Django was really nice, it allowed you to almost do everything in a simple manner. After a month of fidgeting with Django, I created our university's online community along with my fellow developer Jeremy.  I have described about this in great in this article.
			</p>
			<p className="para center">
			Soon after that, I wanted to participate in Google Summer of Code (GSoC) to get a real taste of developing for the open source community. I started contributing to Zulip and tried my best. Even though I didn't get selected, it was a wonderful experience. I will be writing more about GSoC experience in detail soon.
			</p>
			<p className="para center">
			The thing I realized after GSoC was that, there is more to Javascript than just DOM and jQuery. I stumbled upon React and React Native. I decided to learn React in my Summer holidays. As soon as my finals got over, I started learning React along with all the other stuff related to it and oh boy, Javascript was so much bbetter when I first learned it. ES7, ES6, Babel, Polyfill and Webpack... Damn! It was so confusing learning everything. But it is amazing, React is great, I love it! 
			</p>
			<p className="para center">
			P.S this website is built using React. <span role="img" aria-label="full moon face">🌝</span>
			</p>
			<small>Last updated: June 2017</small>
			</div>
		</div>
		<div className="top right"><a href="#top">Back to top <span role="img" aria-label="pointing up finger">👆</span></a></div>
		</div>
		);
	}
}


export default About;
