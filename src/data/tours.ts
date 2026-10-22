import { TourPackage } from '../types';

export const toursData: TourPackage[] = [
  {
    id: "coorg-escape",
    title: "Coorg Misty Highlands & Coffee Plantation Retreat",
    slug: "coorg-escape",
    tagline: "Experience the Scotland of India with lush valleys, Abbey Falls, and aromatic spice estates",
    heroImage: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    durationNights: 2,
    destination: "Madikeri & Kushalnagar, Coorg",
    state: "Karnataka",
    startingPrice: 14500,
    discountedFrom: 16800,
    category: "Hill Station",
    highlights: [
      "Private Chauffeur-driven Innova or Sedan from Bengaluru",
      "Dubare Elephant Camp river rafting & bathing experience",
      "Abbey Falls & Raja's Seat sunset viewpoint",
      "Authentic Kodava spice and coffee estate guided walk",
      "Namdroling Golden Temple Tibetan Monastery visit"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Coorg via Golden Temple",
        description: "Early morning pickup from your Bengaluru residence. Scenic drive via Mysuru expressway. Stop at Namdroling Monastery (Golden Temple) in Kushalnagar. Check in to your resort/estate by afternoon, followed by sunset at Raja's Seat.",
        activities: ["Expressway Highway Drive", "Tibetan Monastery", "Sunset at Raja's Seat"],
        mealPlan: "Lunch on highway, Dinner at resort"
      },
      {
        day: 2,
        title: "Dubare Elephants, Abbey Falls & Coffee Trail",
        description: "Visit Dubare Elephant camp on the banks of Cauvery River. Later explore the roaring Abbey Falls nestled in coffee groves. Afternoon spice plantation tasting tour and Omkareshwara Temple.",
        activities: ["Elephant Camp interaction", "Abbey Falls Photography", "Spices & Coffee Tour"],
        mealPlan: "Breakfast included"
      },
      {
        day: 3,
        title: "Talacauvery & Return Journey",
        description: "Visit Talacauvery (source of sacred river Cauvery) and Bhagamandala confluence. Post traditional Coorg lunch, begin comfortable return drive back to Bengaluru.",
        activities: ["Talacauvery Scenic Peak", "Local Kodava Honey & Coffee Shopping", "Drop to Bangalore"],
        mealPlan: "Breakfast included"
      }
    ],
    inclusions: [
      "Dedicated Air-Conditioned Vehicle for all 3 days",
      "Chauffeur beta, toll taxes, inter-district permits & fuel",
      "Doorstep pickup & drop in Bengaluru",
      "Sightseeing as per itinerary without rushing",
      "Complimentary packaged drinking water daily"
    ],
    exclusions: [
      "Resort / Hotel accommodation (available on request)",
      "Monument entry tickets and elephant interaction charges",
      "Personal expenses, laundry, and meals not stated"
    ],
    suitableVehicles: ["innova-crysta", "maruti-dzire", "urbania-luxury-10", "tempo-traveller-12"],
    faqs: [
      {
        question: "Can we customize the pickup time from Bengaluru?",
        answer: "Yes, you can choose any pickup time between 5:00 AM and 11:00 AM. We recommend starting by 6:00 AM to beat city traffic."
      },
      {
        question: "Is the driver familiar with hill driving and local Coorg routes?",
        answer: "All our assigned drivers for Western Ghats routes have over 8+ years of ghat road experience and speak Kannada, Hindi, and English."
      }
    ]
  },
  {
    id: "chikmagalur-getaway",
    title: "Chikmagalur Peak Trail & Coffee Estate Heritage",
    slug: "chikmagalur-getaway",
    tagline: "Ascend Karnataka's highest peak Mullayanagiri and unwind in serene coffee estates",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80"
    ],
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    durationNights: 2,
    destination: "Mullayanagiri, Baba Budangiri & Belur",
    state: "Karnataka",
    startingPrice: 15200,
    discountedFrom: 17500,
    category: "Hill Station",
    highlights: [
      "Summit trek / jeep ride to Mullayanagiri peak (1,930m)",
      "Bababudangiri hills & Manikyadhara falls",
      "Centuries-old Hoysala architecture at Belur Chennakeshava Temple",
      "Private homestay or luxury coffee plantation drop",
      "Hebbe Falls jeep safari coordination"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Chikmagalur via Belur",
        description: "Pickup from Bengaluru. Drive via Hassan to Belur to marvel at 12th-century intricate Hoysala stone carvings. Proceed to Chikmagalur estate.",
        activities: ["Hoysala Belur Temple", "Coffee plantation check-in"],
        mealPlan: "Breakfast on route"
      },
      {
        day: 2,
        title: "Mullayanagiri & Baba Budan Hills",
        description: "Early morning drive up the misty twists of Mullayanagiri. Marvel at clouds beneath you. Visit Baba Budangiri shrine and Kalhatti falls.",
        activities: ["Peak Sunrise", "Mountain Vista photography", "Estate bonfire"],
        mealPlan: "Breakfast included"
      },
      {
        day: 3,
        title: "Z Point / Hirekolale Lake & Return",
        description: "Serene morning stroll by Hirekolale Lake reflecting Western Ghats. Pick up freshly roasted Peaberry coffee and spices before heading back.",
        activities: ["Hirekolale Lake", "Coffee bean shopping", "Bengaluru drop"],
        mealPlan: "Breakfast included"
      }
    ],
    inclusions: [
      "Dedicated Chauffeur & Sanitized AC Vehicle",
      "All interstate tolls, parking fees, and driver allowances",
      "Doorstep pickup & drop in Bengaluru",
      "Flexible stopovers for photography and dining"
    ],
    exclusions: [
      "Jeep safari fees for Hebbe Falls (payable directly to forest dept)",
      "Hotel / Homestay room rates",
      "Meals and entry tickets"
    ],
    suitableVehicles: ["toyota-fortuner", "innova-crysta", "urbania-luxury-10"],
    faqs: [
      {
        question: "Is an SUV recommended for Chikmagalur?",
        answer: "Yes, Innova Crysta or Fortuner is highly recommended for higher ground clearance on plantation approach roads and hill roads."
      }
    ]
  },
  {
    id: "mysore-heritage-trip",
    title: "Royal Mysore & Kabini Wilderness Expedition",
    slug: "mysore-heritage-trip",
    tagline: "Gilded palaces, Chamundi Hills, Brindavan musical fountains, and Kabini safari",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010f443a533?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010f443a533?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
    ],
    duration: "2 Days / 1 Night",
    durationDays: 2,
    durationNights: 1,
    destination: "Mysuru, Srirangapatna & Kabini",
    state: "Karnataka",
    startingPrice: 9800,
    discountedFrom: 11500,
    category: "Heritage",
    highlights: [
      "Mysore Palace illumination and royal weapon gallery",
      "Historic Tipu Sultan Summer Palace at Srirangapatna",
      "Chamundeshwari Temple hilltop panoramic view",
      "Brindavan Gardens musical light & water show",
      "Authentic Mysore Pak tasting at legendary sweet shops"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Srirangapatna & Mysore Palace",
        description: "Smooth 2-hour glide along the 10-lane expressway. Explore Srirangapatna island fort. Afternoon check-in at Mysore. Evening tour of the illuminated Amba Vilas Palace and Brindavan Gardens.",
        activities: ["Srirangapatna Ranganathaswamy", "Mysore Palace Grand Tour", "Brindavan Fountains"],
        mealPlan: "Mysore Dosa lunch on expressway"
      },
      {
        day: 2,
        title: "Chamundi Hills, Sandalwood Silk & Return",
        description: "Morning climb to Chamundi Hill Bull temple. Visit Devaraja heritage market and Government Silk Factory. Afternoon return to Bengaluru.",
        activities: ["Chamundi Hill Temple", "Silk & Sandalwood shopping", "Return drop"],
        mealPlan: "Breakfast included"
      }
    ],
    inclusions: [
      "Private AC Car (Sedan or Innova) for full 2-day tour",
      "All tolls on Bengaluru-Mysuru Expressway included",
      "Driver allowance, fuel, and parking charges",
      "Doorstep pickup and return"
    ],
    exclusions: [
      "Palace and garden entrance tickets",
      "Hotel stay (we can book heritage partner hotels)",
      "Meals"
    ],
    suitableVehicles: ["maruti-dzire", "honda-city", "innova-crysta", "tempo-traveller-12"],
    faqs: [
      {
        question: "When is the Mysore Palace illuminated?",
        answer: "The palace is illuminated on Sundays and public holidays from 7:00 PM to 8:00 PM, and daily with a sound & light show."
      }
    ]
  },
  {
    id: "hampi-heritage-tour",
    title: "Hampi UNESCO Golden Age & Tungabhadra Heritage",
    slug: "hampi-heritage-tour",
    tagline: "Walk through the boulder-strewn capital of the majestic 14th-century Vijayanagara Empire",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010f443a533?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010f443a533?auto=format&fit=crop&w=1200&q=80"
    ],
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    durationNights: 2,
    destination: "Hampi, Hosapete & Anegundi",
    state: "Karnataka",
    startingPrice: 18500,
    discountedFrom: 21000,
    category: "Heritage",
    highlights: [
      "Virupaksha Temple & Hampi Bazaar ruins",
      "Iconic Stone Chariot & musical pillars at Vijaya Vittala Temple",
      "Lotus Mahal, Queen's Bath & Elephant Stables",
      "Coracle boat ride across sacred Tungabhadra river",
      "Sunset view atop Matanga Hill or Hemakuta Hill"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru / Hubballi to Hampi",
        description: "Smooth outstation highway transit. Check in to heritage resort. Evening stroll along Tungabhadra riverbanks and Hemakuta sunset.",
        activities: ["Highway Transit", "Hemakuta Sunset", "Virupaksha evening aarti"],
        mealPlan: "Lunch on highway"
      },
      {
        day: 2,
        title: "The Heart of Vijayanagara Empire",
        description: "Full day monument exploration: Vittala Temple stone chariot, Lotus Mahal, Elephant Stables, and Hazara Rama Temple.",
        activities: ["Stone Chariot", "Royal Enclosure", "Coracle River Crossing"],
        mealPlan: "Breakfast included"
      },
      {
        day: 3,
        title: "Anegundi (Kishkindha) & Return Journey",
        description: "Visit Anjanadri Hill (birthplace of Hanuman) and ancient Anegundi village. Post lunch, relax in comfort as your chauffeur drives you back.",
        activities: ["Anjanadri Hill panoramic stairs", "Return journey"],
        mealPlan: "Breakfast included"
      }
    ],
    inclusions: [
      "Dedicated Air-Conditioned Vehicle for entire 3-day itinerary",
      "Highway tolls, state permits, driver bata and parking",
      "Flexible schedule for photography at golden hour"
    ],
    exclusions: [
      "ASI Monument tickets",
      "Hotel accommodations",
      "Licensed guide fees (available on request)"
    ],
    suitableVehicles: ["innova-crysta", "innova-hycross", "urbania-luxury-10"],
    faqs: [
      {
        question: "Can we start this tour from Hubballi instead of Bengaluru?",
        answer: "Yes! Vijaya Travels has hubs in Bengaluru, Hubballi, and Mysuru. We can start from any point."
      }
    ]
  },
  {
    id: "goa-coastal-cruise",
    title: "Goa Coastal Highway & Beach Sunsets",
    slug: "goa-coastal-cruise",
    tagline: "Scenic Western Ghats road trip opening into golden Goan beaches, churches & cruises",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80"
    ],
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    durationNights: 3,
    destination: "North & South Goa via Hubballi / Karwar",
    state: "Goa",
    startingPrice: 24500,
    discountedFrom: 28000,
    category: "Coastal",
    highlights: [
      "Chauffeur-driven luxury travel across Chorla Ghats / Karwar coast",
      "Old Goa Basilica of Bom Jesus & Se Cathedral",
      "Sunset dinner cruise on Mandovi River",
      "Aguada Fort overlooking Arabian sea",
      "No stress of parking or holiday peak-season driving"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Goa Coast",
        description: "Depart early through Hubballi highway into Goa. Arrive by evening at your beachfront resort.",
        activities: ["Scenic Ghat Drive", "Resort Check-in", "Beachside Dinner"],
        mealPlan: "Highway lunch"
      },
      {
        day: 2,
        title: "North Goa Heritage & Beaches",
        description: "Explore Fort Aguada, Chapora Fort, and sunset at Anjuna or Vagator beach.",
        activities: ["Fort Aguada", "Vagator Cliffs", "Candolim"],
        mealPlan: "Breakfast included"
      },
      {
        day: 3,
        title: "South Goa Culture & Cruise",
        description: "Tour Old Goa churches, Mangueshi Temple, Latin Quarter Fontainhas, and Mandovi River cruise.",
        activities: ["Latin Quarter Walk", "Old Goa Churches", "Mandovi Sunset Cruise"],
        mealPlan: "Breakfast included"
      },
      {
        day: 4,
        title: "Scenic Return Journey",
        description: "After breakfast, pack Goan spices and cashews and relax in comfortable reclining seats back home.",
        activities: ["Local shopping", "Safe highway return"],
        mealPlan: "Breakfast included"
      }
    ],
    inclusions: [
      "Exclusive Vehicle with Chauffeur for 4 full days",
      "Goa State Inter-State Permit & Border Taxes included",
      "Toll charges, fuel, and chauffeur allowances included",
      "24/7 Fleet tracking and roadside assistance"
    ],
    exclusions: [
      "Hotel stay and water sports charges",
      "Mandovi cruise tickets",
      "Personal expenses"
    ],
    suitableVehicles: ["innova-crysta", "innova-hycross", "urbania-luxury-10", "tempo-traveller-17"],
    faqs: [
      {
        question: "Are interstate permits for Goa taken care of?",
        answer: "Yes, Vijaya Travels handles all inter-state RTO permits, commercial road taxes, and green cess beforehand with no border stoppage."
      }
    ]
  },
  {
    id: "ooty-wayanad-circuit",
    title: "Ooty Queen of Hills & Wayanad Rainforest Circuit",
    slug: "ooty-wayanad-circuit",
    tagline: "Toy train vistas, Botanical Gardens, Banasura Sagar Dam, and tea valley estates",
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
    ],
    duration: "4 Days / 3 Nights",
    durationDays: 4,
    durationNights: 3,
    destination: "Ooty, Coonoor & Wayanad",
    state: "Tamil Nadu & Kerala",
    startingPrice: 22800,
    discountedFrom: 26500,
    category: "Hill Station",
    highlights: [
      "Bandipur & Mudumalai forest transit with wild elephant spotting",
      "Nilgiri Mountain Railway (Toy Train) ride from Ooty to Coonoor",
      "Doddabetta Peak & Botanical Gardens",
      "Banasura Sagar Dam largest earthen dam in India",
      "Chembra Peak heart-shaped lake view"
    ],
    itinerary: [
      {
        day: 1,
        title: "Bengaluru to Ooty via Bandipur Safari Corridor",
        description: "Drive through Bandipur Tiger Reserve corridor. Tackle the 36 hairpin bends of Kalhatty ghat with our master chauffeur. Check in at Ooty.",
        activities: ["Forest transit", "36 Hairpin bend ascent", "Ooty Lake boating"],
        mealPlan: "Highway lunch"
      },
      {
        day: 2,
        title: "Ooty & Coonoor Tea Gardens",
        description: "Doddabetta peak, Sim's Park Coonoor, Dolphin's Nose view point and tea factory tour.",
        activities: ["Doddabetta Summit", "Coonoor Tea Gardens", "Homemade chocolate shopping"],
        mealPlan: "Breakfast included"
      },
      {
        day: 3,
        title: "Ooty to Wayanad Rainforest",
        description: "Scenic drive from Tamil Nadu hills into Kerala's lush Wayanad. Visit Banasura Sagar dam and Edakkal Caves.",
        activities: ["Ghat crossing", "Banasura Dam speedboating", "Spice plantations"],
        mealPlan: "Breakfast included"
      },
      {
        day: 4,
        title: "Wayanad Viewpoints & Return",
        description: "Lakkidi viewpoint and Pookode lake before embarking on return journey via Gundlupet.",
        activities: ["Lakkidi Viewpoint", "Return to Bengaluru"],
        mealPlan: "Breakfast included"
      }
    ],
    inclusions: [
      "Dedicated AC Vehicle for all 4 days with experienced hill chauffeur",
      "Tamil Nadu & Kerala State Border Taxes & Permits",
      "Tolls, fuel, and driver daily batta included",
      "Pickup and drop at your doorstep"
    ],
    exclusions: [
      "Resort accommodations",
      "Toy Train tickets and boating fees",
      "Meals"
    ],
    suitableVehicles: ["innova-crysta", "innova-hycross", "urbania-luxury-10"],
    faqs: [
      {
        question: "Can children and seniors travel comfortably on the ghat roads?",
        answer: "Yes, our drivers maintain gentle speeds and take regular rest breaks. Our vehicles are equipped with sick-bags and first-aid kits."
      }
    ]
  }
];
