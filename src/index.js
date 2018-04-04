import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import logo from './youtubeicon.gif';

class Testing extends React.Component {

	constructor(){
		super();
		this.state = {
			pictureurl : [],
		}
	}

	componentWillMount(){
		fetch('https://www.googleapis.com/youtube/v3/videos?fields=items(id,snippet(channelId,title,categoryId,thumbnails),statistics)&part=snippet,statistics&chart=mostPopular&regionCode=US&maxResults=15&key=AIzaSyDkoOxRISpfNN6oDvKERkmY56MTRRThiUQ')
		.then(results => {
			return results.json();
		}).then(data => {
			let pictures = data.items.map((pic) => {
				console.log(pic.id)
				return(
					<div key= {pic.id} className="movieContainer">
						<div className="imageurl">
							<img src={pic.snippet.thumbnails.medium.url} />
							<div className="movieInfo">
			                  <ul>
			                  	<li>View Count: {pic.statistics.viewCount}</li>
			                  	<li>Like Count: {pic.statistics.likeCount}</li>
			                  	<li>Dislike Count: {pic.statistics.dislikeCount}</li>
			                  	<li>Fav Count: {pic.statistics.favoriteCount}</li>
			                  	<li>Comment Count: {pic.statistics.commentCount}</li>
			                  </ul>
			                </div>
						</div>
						<br />

						
					</div>
				)
			});
			this.setState({pictureurl: pictures});
   		})
	}

	render(){
		return(
			<div>
				<div className="header">
					<img src={logo} className="logostyle" />
					<h1>Youtube Popular Videos</h1>
				</div>
				<div>{this.state.pictureurl}</div>
			</div>
		);
	}
}

ReactDOM.render(<Testing />, document.getElementById('root'));
registerServiceWorker();
