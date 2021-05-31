import React from 'react';
import { RichText } from 'prismic-reactjs';
import { PrismicLink, RichTextField } from '../prismic-elements';

/**
 * Image gallery slice component
 */
const EventListing = ({ slice }) => {
	const [prismicData, setPrismicData] = useState({ eventsDoc: null});
	seEffect(() => {
		const fetchData = async () => {
		  try {
			const data = await fetch("https://8cwutw7uv3.execute-api.us-west-1.amazonaws.com/dev/get-events");
			if (data) {
			  setPrismicData({ data});
			} else {
			  console.warn('EventPage document was not found. Make sure it exists in your Prismic repository.');
			  toggleNotFound(true);
			}
		  } catch (error) {
			console.error(error);
			toggleNotFound(true);
		  }
		}
		fetchData();
	}, []);
  return (
    <section className="image-gallery content-section">
      <RichTextField field={slice.primary.gallery_title} />
      <div className="gallery">
        {slice.items.map((item, index) => (
          <GalleryItem item={item} key={index} />
        ))}
      </div>
    </section>
  );
};

/**
 * Gallery item component
 */
const GalleryItem = ({ item }) => {
  return (
    <div className="events-item">
      <img src={item.image.url} alt={item.image.alt} />
      <RichTextField field={item.image_description} />
      <p className="gallery-link">
        <PrismicLink link={item.link}>
          {RichText.asText(item.link_label)}
        </PrismicLink>
      </p>
    </div>
  );
};

export default ImageGallery;
