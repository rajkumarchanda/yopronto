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
		<section className="event-listing">
		  <div className="row row-cols-1 row-cols-md-3 g-4">
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
	<div className="col">
	<div className="card h-100">
		<img className='card-img-top' src="https://smartexam-mum.s3.amazonaws.com/logo/makaut_logo1523089067.jpg" alt={item.short_title}/>
		<div className="card-body">
		  <h5 className="card-title">{item.short_title}</h5>
		  <p className="card-text">{item.title}</p>
		  <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
		</div>
	</div>	
	</div>	
	
  );
};

export default EventListing;
