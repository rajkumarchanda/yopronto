import React, { useEffect, useState } from 'react';
import { RichText } from 'prismic-reactjs';
import { PrismicLink, RichTextField } from '../prismic-elements';

/**
 * Image gallery slice component
 */
const EventListing = ({ slice }) => {
	const [ events, setEvents ] = useState(null); 
	
	useEffect(() => {
		const fetchPrismicData = async () => {
		  try {
				const eventsDoc = await fetch("https://8cwutw7uv3.execute-api.us-west-1.amazonaws.com/dev/get-events")
				.then(res => res.json().then(events => setEvents(events)));
					
			} catch (error) {
				console.error(error);
			}
		}

		fetchPrismicData();
	  }, []);
	if(events){
	 return (
		<section className="image-gallery content-section">
		  <div className="gallery">
			{events.map((item, index) => (
			  <GalleryItem item={item} key={index} />
			))}
		  </div>
		</section>
	  );
	}else{
		return (
			<h1>Loading</h1>
		);
	}
};

/**
 * Gallery item component
 */
const GalleryItem = ({ item }) => {
 return (
	<div className="card-content">
		<div className="card-img">
			<img src="https://smartexam-mum.s3.amazonaws.com/logo/makaut_logo1523089067.jpg" alt={item.short_title}/>
			<span><h4>{item.short_title}</h4></span>
		</div>
		<div className="card-desc">
			<h3>{item.short_title}</h3>
			<p>{item.title}</p>
			<a href="#" className="btn-card">Read</a>   
		</div>
	</div>
    
  );
};

export default EventListing;
