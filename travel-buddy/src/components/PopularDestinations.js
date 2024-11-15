/* 
import React from 'react';
import { Link } from 'react-router-dom';
import './PopularDestinations.css';

import IskconImage from '../images/iskcon-temple.jpg';
import LalbaghImage from '../images/lalbagh.jpg';

const destinations = [
  {
    id: 1,
    name: 'ISKCON Temple',
    location: 'Rajajinagar',
    rating: 4.2,
    image: IskconImage,
  },
  {
    id: 2,
    name: 'Lalbagh Botanical Garden',
    location: 'Bangalore',
    rating: 4.6,
    image: LalbaghImage,
  },
  
];

function PopularDestinations() {
  return (
    <div className="component-container">
      <h2>POPULAR DESTINATIONS</h2>
      {destinations.map((destination) => (
        <Link to={`/destinations/${destination.id}`} key={destination.id} className="destination">
          <div
            className="image-placeholder"
            style={{ backgroundImage: `url(${destination.image})` }}
          ></div>
          <div className="destination-info">
            <h3>{destination.name}</h3>
            <p>{destination.location}</p>
            <div className="rating">{destination.rating} ⭐</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PopularDestinations;
 */

import React, { useState, useEffect } from 'react';
import './PopularDestinations.css';
import { FaHeart } from 'react-icons/fa';
import iskconTemple from '../images/iskon temple.jpg';
import banglorePalace from '../images/bangalore-palace.jpg';
import lalBagh from '../images/lalbagh1.jpg';
import bannerghatta from '../images/bannergatta.webp';
import wonderla from '../images/Wonderla.jpg';

function PopularDestinations() {
  const initialFavorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const [favorites, setFavorites] = useState(initialFavorites);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (index) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [index]: !prevFavorites[index],
    }));
  };

  const destinations = [
    { 
      name: 'ISKCON TEMPLE', 
      location: 'Rajajinagar', 
      imgUrl: iskconTemple,
      description: "Located in Rajajinagar, the ISKCON Temple is one of the largest temples dedicated to Lord Krishna in the world. Built by the International Society for Krishna Consciousness, this temple is not only a place of worship but also a hub for spiritual education and cultural heritage. The architecture of the temple is a blend of traditional and modern design, featuring intricate stone carvings, majestic domes, and expansive halls for prayer and meditation. The temple offers a tranquil environment for visitors to engage in self-reflection, meditation, and chanting sessions. Additionally, the temple complex includes a Vedic museum, a cultural education center, and a delightful restaurant serving traditional vegetarian meals. The spiritual ambiance here draws devotees and tourists alike, providing a unique experience in the heart of Bangalore.",
      rating: 4.5
    },
    { 
      name: 'BANGALORE PALACE', 
      location: 'Bangalore', 
      imgUrl: banglorePalace,
      description: "Stepping into Bangalore Palace feels like stepping back in time to the era of the Wodeyar kings. Built in 1878 by King Chamaraja Wodeyar, this palace reflects Tudor-style architecture, reminiscent of medieval castles in Normandy and Windsor. The palace is adorned with vintage furniture, paintings, and artifacts from bygone eras. As you wander through its corridors, you’ll find beautiful stained glass windows, ornate ceilings, and decorative chandeliers. The sprawling grounds surrounding the palace are equally enchanting, often used for music concerts and cultural events. Visitors can explore the rich heritage of the Wodeyar dynasty and learn about their contributions to the state of Karnataka. The palace is a cultural icon that continues to inspire and attract history buffs and architecture enthusiasts from around the world.",
      rating: 4.2
    },
    { 
      name: 'LAL BAGH BOTANICAL GARDEN', 
      location: 'Bangalore',  
      imgUrl: lalBagh,
      description: "A horticultural delight, Lal Bagh Botanical Garden was commissioned by Hyder Ali and later completed by his son, Tipu Sultan, in the 18th century. Covering over 240 acres, this garden is home to thousands of species of tropical plants, including a few rare ones that are over 100 years old. At the heart of Lal Bagh is the iconic glasshouse, built in the 19th century and modeled after London’s Crystal Palace, which hosts annual flower shows showcasing stunning displays of floral art. Lal Bagh also boasts a picturesque lake, rock formations that are over 3,000 million years old, and an aquarium. Walking paths wind through meticulously maintained lawns, making it a popular spot for morning walkers, picnickers, and families. Lal Bagh serves as a green sanctuary within the city, combining beauty, history, and biodiversity.",
      rating: 4.8
    },
    { 
      name: 'BANNERGHATTA NATIONAL PARK', 
      location: 'Bangalore', 
      imgUrl: bannerghatta,
      description: "Spanning over 100 square kilometers, Bannerghatta National Park offers a unique chance to experience the wildlife of India in a protected yet natural environment. The park is home to a variety of wildlife, including tigers, lions, elephants, leopards, and deer. One of the park’s main attractions is the safari, which takes visitors through forested zones where animals roam freely in a setting that resembles their natural habitat. Apart from the safari, the park also includes a zoo with a range of animals, reptiles, and birds, as well as a Butterfly Park – the first of its kind in India – where visitors can see vibrant butterfly species in a beautiful greenhouse. With hiking trails and opportunities for nature photography, Bannerghatta provides a rich, hands-on experience with nature and wildlife just outside the bustling city.",
      rating: 4.3
    },
    { 
      name: 'WONDERLA AMUSEMENT PARK', 
      location: 'Bangalore',  
      imgUrl: wonderla,
      description: "Wonderla Amusement Park is a thrilling escape for locals and tourists alike, offering over 60 exhilarating rides that cater to visitors of all ages. Situated on the outskirts of Bangalore, this expansive park includes both land and water attractions, from high-speed roller coasters to gentle carousel rides for kids. One of the main highlights is the water park section, which features wave pools, lazy rivers, and water slides that are perfect for cooling off in the hot weather. Wonderla also provides state-of-the-art virtual reality experiences and 3D rides, adding a futuristic touch to the adventure. The park’s hygiene standards, safety measures, and food courts make it a convenient and enjoyable outing for families. With exciting rides, live entertainment, and scenic views, Wonderla offers an unforgettable experience for thrill-seekers and relaxation enthusiasts alike.",
      rating: 4.7
    },
  ];

  return (
    <div className="component-container">
      <h2>POPULAR DESTINATIONS</h2>
      {destinations.map((destination, index) => (
        <div key={index} className="destination">
          <img src={destination.imgUrl} alt={destination.name} className="destination-image" />
          <div className="destination-info">
            <div className="destination-header">
              <h3>{destination.name}</h3>
              <FaHeart 
                className="heart-icon" 
                onClick={() => toggleFavorite(index)}
                color={favorites[index] ? 'red' : 'gray'} 
                style={{ cursor: 'pointer' }}
                aria-label={favorites[index] ? 'Remove from favorites' : 'Add to favorites'} // Accessibility
              />
            </div>
            <p className="destination-location">{destination.location}</p> {/* Location moved below name */}
            <p className="destination-description">{destination.description}</p>
            <div className="destination-rating">
              <span>Rating: {destination.rating}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PopularDestinations;

