/*
 * EDIT THIS FILE FIRST. It is the simple, single source of truth for the prototype.
 * Do not add personal customer details, addresses or enquiry photographs here.
 */
window.LEVETT = {
  businessName: 'Levett Carpentry',
  serviceArea: "Bishop's Stortford & London",
  facebookUrl: 'https://www.facebook.com/share/1FHkEVMbPe/?mibextid=wwXIfr',
  tallyFormId: '', // Future phase: no live form on this POC
  prototype: true, // Keep true: forces the simulated form even if a Tally ID is entered.
  tagline: 'Thoughtful carpentry for real homes.',
  makerName: '', // Confirm the carpenter's name before adding it to the website.
  makerBio: '' // Use approved biography only.
};

/* Candidate service types, NOT claims about work Levett has performed. */
window.LEVETT_SERVICES = [
  { id: 'fitted-wardrobes', title: 'Fitted wardrobes', need: 'Bedroom storage built to the dimensions of your room.' },
  { id: 'under-stairs', title: 'Under-stairs storage', need: 'Useful drawers and cupboards in an often-wasted space.' },
  { id: 'alcove-cabinets', title: 'Alcove cabinets', need: 'Shelving and cupboards designed around fireplaces and recesses.' },
  { id: 'media-walls', title: 'Media walls & TV units', need: 'Built-in entertainment storage and discreet cable solutions.' },
  { id: 'home-offices', title: 'Home offices & desks', need: 'Compact workspaces, fitted desks and practical studies.' },
  { id: 'bookcases', title: 'Bookcases & shelving', need: 'Made-to-measure display and everyday storage.' },
  { id: 'kitchens', title: 'Kitchen & utility cabinetry', need: 'Cabinets, larders and functional household storage.' },
  { id: 'window-seats', title: 'Window seats & benches', need: 'Seating that also creates useful hidden storage.' },
  { id: 'awkward-spaces', title: 'Loft & awkward-space storage', need: 'Practical solutions for sloping ceilings, eaves and corners.' },
  { id: 'outdoor-carpentry', title: 'Decking & outdoor carpentry', need: 'Practical garden decking, seating and timber structures.' }
];

/*
 * PROJECT TEMPLATE: use a photo path like assets/photos/wardrobe-before.webp
 * and assets/photos/wardrobe-after.webp. The files must actually exist.
 * Set demo: false ONLY after permission to publish and confirming this is his work.
 * Reorder projects by moving each block in this list.
 */
window.LEVETT_PROJECTS = [
  {
    id: 'example-under-stairs',
    title: 'Under-stairs storage',
    category: 'under-stairs',
    challenge: 'What could this unused corner of a home become?',
    outcome: 'Potential approach: drawers and cabinets designed around the available space.',
    before: '',
    after: '',
    demo: true
  },
  {
    id: 'example-alcove',
    title: 'Alcove shelving',
    category: 'alcove-cabinets',
    challenge: 'How could an empty alcove work harder?',
    outcome: 'Potential approach: fitted shelves and lower cupboards.',
    before: '',
    after: '',
    demo: true
  }
];
