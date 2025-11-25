import React from 'react';
import ArtistCard from '../../components/ArtistCard';
import { artistsData } from '../../artistsData';
import './ArtistGallery.css';

const ArtistGallery = () => {
  const artists = artistsData;

  return (
    <div className="gallery-showcase-horizontal">
      <h2 className="gallery-title-horizontal">Featured Artists</h2>
      <div className="art-scroll-container">
        <div className="art-horizontal-scroll">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              image={artist.image}
              specialty={artist.specialty}
              artworkCount={undefined}
              country={artist.location}
              showFavorite={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistGallery;