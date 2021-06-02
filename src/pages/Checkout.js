import React, { useEffect, useState } from 'react';
import sha256 from 'crypto-js/sha256';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import Base64 from 'crypto-js/enc-base64';

const client_secret ="8c3ee268b7d9ff80820d3c65b10c4a68c32ef53dc403bf47fe36beb8bd9a7e7c";
const client_id="MjE1ODg2OTV8MTYyMTYwNDc2Ny45OTc2ODk1";

const Checkout = ({ match }) => {
	const eventid = match.params.eventid;
	const [ events, setEvents ] = useState(null); 
	const body="";
	const hmacDigest = Base64.stringify(hmacSHA1( client_secret,"POST" + "\n/" + match.url + "\n" + body));
	console.log(hmacDigest);
	useEffect(() => {
		const fetchPrismicData = async () => {
		  try {
				const eventsDoc = await fetch("https://api.seatgeek.com/2/listings/123456?event_id="+eventid,{
					method: 'POST',
					headers: {
						'Authorization': 'SG '+client_id+':'+hmacDigest,
						'Access-Control-Allow-Origin':'*'
					}
				})
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
		  {eventid} {events}
		  </div>
		</section>
	  );
	}else{
		return (
			<h1>Loading</h1>
		);
	}
}
export default Checkout