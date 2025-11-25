import React from 'react';
import { useParams } from 'react-router-dom';
import './ArtistPage.css';

import ArtistHeader from '../../sections/artist/ArtistHeader';
import ArtistStats from '../../sections/artist/ArtistStats';
import ArtistBiography from '../../sections/artist/ArtistBiography';
import ArtistAwards from '../../sections/artist/ArtistAwards';
import ArtistShowcase from '../../sections/artist/ArtistShowcase'; 

import { artistsData } from '../../artistsData';
import { allArtworks } from '../../sections/gallery/mockGalleryData';

const ArtistPage = () => {
  const { id } = useParams();

  const baseArtist = artistsData.find(a => String(a.id) === String(id));

  if (!baseArtist) {
    return (
      <div className="artist-page-container">
        <h1>Artist not found</h1>
        <p>The artist you are looking for does not exist.</p>
      </div>
    );
  }

  const shortName = baseArtist.name.split(' ')[0];

  const artist = {
    id: baseArtist.id,
    name: baseArtist.name,
    specialty: baseArtist.specialty,
    birthDate: baseArtist.birthDate || 'Born',
    origin: baseArtist.location,
    imageUrl: baseArtist.image,
    stats: [],
    biography:
      baseArtist.biography ||
      `${baseArtist.name} is a featured creator on Artelier, recognised for ${baseArtist.specialty.toLowerCase()} from ${baseArtist.location}. Their practice explores contemporary themes through carefully constructed compositions, where colour, texture and rhythm are used to tell layered visual stories. Many of these works are represented in the Artelier gallery, allowing collectors to experience how ${shortName} translates lived experience into shape, light and movement.

From early experiments in small local studios to larger museum-scale presentations, ${shortName} has consistently expanded the boundaries of their chosen medium. Their canvases often begin with quick intuitive sketches and evolve through dozens of deliberate edits, leaving traces of earlier decisions visible beneath the final surface. This approach gives each piece a sense of history, as if the work records the artist’s thought process over time.

Over the past decade ${shortName} has participated in group shows, art fairs and themed exhibitions across different cities. These events have connected them with curators, critics and fellow artists who respond to the honesty and vulnerability in the work. Many collectors describe ${baseArtist.name}'s pieces as "quietly powerful" – works that at first feel subtle, then reveal more detail and emotion with every viewing. 

Today ${shortName} continues to balance studio practice with teaching, workshops and collaborative projects. New series often reference architecture, music or everyday objects, showing how art can emerge from even the smallest observation. This extended biography is meant to give you a deeper sense of their journey so far, the communities that support them, and the ideas that continue to shape each new artwork.`,
    awards:
      baseArtist.awards || [
        {
          name: 'Featured Artist at Artelier',
          issuer: 'Artelier Curation Team',
          year: 2024,
        },
        {
          name: 'Audience Choice Award',
          issuer: 'City Contemporary Art Fair',
          year: 2023,
        },
        {
          name: 'Emerging Talent Recognition',
          issuer: 'International Art Review',
          year: 2022,
        },
      ],
  };

  const artistGalleryId = `a${baseArtist.id}`;
  const galleryArtworks = allArtworks.filter(
    (art) => art.artistId === artistGalleryId
  );

  const showcaseArtworks = galleryArtworks;

  const artworkCount = galleryArtworks.length;
  const followersCount = 1200 + baseArtist.id * 150;
  const exhibitionsCount = 3 + (baseArtist.id % 4);

  const syncedStats = [
    { label: 'Artworks', value: String(artworkCount) },
    { label: 'Followers', value: `${followersCount.toLocaleString()}` },
    { label: 'Exhibitions', value: String(exhibitionsCount) },
  ];

  return (
    <div className="artist-page-container">
      <ArtistHeader artist={artist} />

      <ArtistStats stats={syncedStats} />
      
      <div className="main-content-grid">
        <div className="content-left">
          <ArtistBiography biography={artist.biography} />
        </div>
        <div className="content-right">
          <ArtistAwards awards={artist.awards} />
        </div>
      </div>

      <ArtistShowcase artworks={showcaseArtworks} />
      
    </div>
  );
};

export default ArtistPage;