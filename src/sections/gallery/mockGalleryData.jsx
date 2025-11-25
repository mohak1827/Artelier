import { artistsData } from '../../artistsData';

export const allArtists = artistsData.map((artist, index) => ({
  id: `a${index + 1}`,
  name: artist.name,
}));

export const allArtworkTypes = ['Painting', 'Sculpture', 'Photography', 'Digital Art'];

const imagePool = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzjHtJp-RRCv0Co_mVvr0SAF6CGd7hJPZvhg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbwgnjhz5dM-TOdIuH5xU9P56eyxYJDYI8dQ&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScSMXRPIjLr7OApPGQmsw50OjiSWN8tDPCww&s',
  'https://render.fineartamerica.com/images/rendered/medium/print/10/7.5/break/images-medium-5/space-for-reflection-chuck-pinson.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlBowpROf3sgmWKynXUpgdeXi1ggAqysYmWg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDpeOAWGj2SunGh4u-1cyk1drIAvAV82u3g&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM4Gs2yl_rBqthj9b8inRKHaaCPY7z3dKj4A&s',
  'https://images.saatchiart.com/saatchi/1675669/art/12545955/11608145-LJYMDVXM-7.jpg',
  'https://cdn.shopify.com/s/files/1/0595/4361/7588/files/2_b01b2593-6329-4137-bf78-ba28c2519f41.jpg?v=1674181139',
  'https://www.skillshare.com/blog/wp-content/uploads/2021/06/watercolor-trees-1018x1024.webp',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKG0RrnqhIM0W8m59OiwkRsX2kKYSpRCqF5g&s',
  'https://artincontext.org/wp-content/uploads/2022/01/Acrylic-Painting-Ideas-768x512.jpg',
];

const ARTWORKS_PER_ARTIST = 16;

const baseTitlePool = [
  'Abstract Symphony',
  'Urban Echoes',
  'Silent Horizon',
  'Chromatic Drift',
  'Midnight Reverie',
  'Golden Radiance',
  'Fragmented Dream',
  'Celestial Tide',
  'Neon Mirage',
  'Whispering Lines',
  'Ethereal Drift',
  'Prismatic Bloom',
  'Velvet Shadows',
  'Radiant Fragments',
  'Infinite Skyline',
  'Luminous Pathways',
  'Obsidian Tide',
  'Aurora Pulse',
  'Echoes of Light',
  'Spectrum Reverie',
  'Mirrored Dreams',
  'Kinetic Canvas',
];

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];

const titleCounters = {};

const generateArtworksForArtist = (artistKey, artistName, artistIndex, startIndex) => {
  const artworks = [];

  for (let i = 0; i < ARTWORKS_PER_ARTIST; i += 1) {
    const globalIndex = startIndex + i + 1;
    const baseTitle = baseTitlePool[Math.floor(Math.random() * baseTitlePool.length)];

    const currentCount = (titleCounters[baseTitle] || 0) + 1;

    titleCounters[baseTitle] = currentCount;

    const variant = romanNumerals[(currentCount - 1) % romanNumerals.length];

    const type = allArtworkTypes[i % allArtworkTypes.length];
    const image = imagePool[(startIndex + i) % imagePool.length];

    const basePrice = 400 + artistIndex * 120 + i * 130;

    artworks.push({
      id: `w${globalIndex}`,
      title: `${baseTitle} ${variant}`,
      artistId: artistKey,
      artistName,
      price: basePrice,
      type,
      image,
    });
  }

  return artworks;
};

export const allArtworks = (() => {
  const artworks = [];

  allArtists.forEach((artist, artistIndex) => {
    const startIndex = artworks.length;
    const artistArtworks = generateArtworksForArtist(
      artist.id,
      artist.name,
      artistIndex,
      startIndex
    );
    artworks.push(...artistArtworks);
  });

  for (let i = artworks.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [artworks[i], artworks[j]] = [artworks[j], artworks[i]];
  }

  return artworks;
})();