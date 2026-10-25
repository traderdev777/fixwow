export const serviceCategories = [
  {
    id: "automobile",
    name: "Automobile Care (Bikes & Cars)",
    icon: "Car",
    tagline: "Doorstep Mechanic & Breakdown Rescue",
    color: "#ff6b00",
    bgGradient: "linear-gradient(135deg, rgba(255, 107, 0, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "bikes",
        name: "Bikes & Scooters (Two-Wheelers)",
        description: "Doorstep oil change, brake check, puncture repair & complete servicing for all makes.",
        services: [
          {
            id: "bike-general-service",
            name: "Standard Doorstep Bike Service",
            price: 499,
            originalPrice: 799,
            duration: "60 mins",
            popular: true,
            features: [
              "Engine oil change (labor)",
              "Air filter & spark plug cleaning",
              "Brake pad adjustment & tuning",
              "Drive chain cleaning & lubrication",
              "Full electrical inspection & wash"
            ]
          },
          {
            id: "bike-puncture-tyre",
            name: "Flat Tyre & Puncture Assist (Doorstep/On-Road)",
            price: 249,
            originalPrice: 399,
            duration: "25 mins",
            popular: false,
            features: [
              "Tubeless puncture repair onsite",
              "Tube puncture / replacement assist",
              "Tyre pressure check & nitrogen refill",
              "Quick roadside dispatch in 30 mins"
            ]
          },
          {
            id: "bike-battery",
            name: "Bike Battery Jumpstart & Replacement",
            price: 199,
            originalPrice: 350,
            duration: "20 mins",
            popular: false,
            features: [
              "Instant battery jumpstart",
              "Multimeter voltage & alternator test",
              "Old battery disposal credit",
              "New battery fitting (Amaron/Exide)"
            ]
          },
          {
            id: "bike-engine-tune",
            name: "Engine Trouble & Carburetor / FI Tuning",
            price: 599,
            originalPrice: 950,
            duration: "90 mins",
            popular: true,
            features: [
              "Engine starting trouble diagnosis",
              "Carburetor overhaul & jet tuning",
              "Fuel injector spray check",
              "Clutch cable & plate adjustments"
            ]
          }
        ]
      },
      {
        id: "cars",
        name: "Cars & Four-Wheelers",
        description: "Doorstep periodic maintenance, roadside emergency breakdown & AC cooling repair.",
        services: [
          {
            id: "car-periodic-service",
            name: "Periodic Comprehensive Car Service",
            price: 1499,
            originalPrice: 2299,
            duration: "2.5 hours",
            popular: true,
            features: [
              "Engine oil & oil filter replacement labor",
              "Air filter & cabin AC filter cleaning",
              "Coolant & brake oil top-up check",
              "40-Point safety & suspension audit",
              "Exterior foam wash & interior vacuum"
            ]
          },
          {
            id: "car-breakdown-sos",
            name: "Emergency Breakdown & Roadside Assistance (RSA)",
            price: 799,
            originalPrice: 1299,
            duration: "30 mins ETA",
            popular: true,
            features: [
              "Onsite mechanic arrival across Bengaluru",
              "Battery jumpstart with heavy-duty cables",
              "Tyre puncture / spare wheel swap",
              "Emergency fuel delivery (2-5 Litres)",
              "Flatbed towing referral if needed"
            ]
          },
          {
            id: "car-ac-service",
            name: "Car AC Service & Cooling Gas Refill",
            price: 1199,
            originalPrice: 1899,
            duration: "75 mins",
            popular: true,
            features: [
              "Cooling coil inspection & deep clean",
              "AC refrigerant gas top-up (R134a)",
              "Compressor belt & pressure test",
              "Blower fan antibacterial cleaning"
            ]
          },
          {
            id: "car-brakes-suspension",
            name: "Brake Overhaul & Wheel Alignment Check",
            price: 699,
            originalPrice: 1050,
            duration: "60 mins",
            popular: false,
            features: [
              "Front & rear brake pad cleaning",
              "Disc caliper lubrication",
              "Brake bleeding & hydraulic pressure test",
              "Suspension squeak sound diagnosis"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "appliances",
    name: "Electrical & Home Electronics",
    icon: "Tv",
    tagline: "AC, Fridge, Washing Machine & Smart Tech",
    color: "#0066cc",
    bgGradient: "linear-gradient(135deg, rgba(0, 102, 204, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "cooling-appliances",
        name: "AC & Refrigerators",
        description: "Certified technicians for Inverter, Split, Window ACs and Single/Double door fridges.",
        services: [
          {
            id: "ac-jet-service",
            name: "Power Jet Deep Clean AC Service",
            price: 499,
            originalPrice: 799,
            duration: "45 mins",
            popular: true,
            features: [
              "High-pressure water pump foam cleaning",
              "Indoor cooling coil & blower wash",
              "Outdoor unit dirt flush",
              "Drain pipe unclogging & gas leak check"
            ]
          },
          {
            id: "fridge-repair",
            name: "Refrigerator Cooling & Compressor Repair",
            price: 399,
            originalPrice: 599,
            duration: "60 mins",
            popular: true,
            features: [
              "Freezer ice accumulation / cooling fix",
              "Compressor relay & capacitor diagnosis",
              "Thermostat sensor replacement check",
              "Gas leak detection & copper soldering"
            ]
          }
        ]
      },
      {
        id: "washing-tv",
        name: "Washing Machines & Smart TVs",
        description: "Front load, top load washing machines and LED/OLED 4K Smart TVs.",
        services: [
          {
            id: "washing-machine-fix",
            name: "Washing Machine Repair & Descaling",
            price: 349,
            originalPrice: 550,
            duration: "50 mins",
            popular: true,
            features: [
              "Drum spinning / motor vibration fix",
              "Water inlet valve & drain pump repair",
              "PCB board diagnosis & soldering",
              "Door lock sensor & belt replacement"
            ]
          },
          {
            id: "smart-tv-service",
            name: "Smart LED / OLED TV Display & Sound Fix",
            price: 399,
            originalPrice: 650,
            duration: "45 mins",
            popular: false,
            features: [
              "Backlight LED strip replacement",
              "Motherboard / power circuit repair",
              "No picture / black screen troubleshooting",
              "HDMI port & audio speaker fix"
            ]
          },
          {
            id: "ro-purifier-service",
            name: "RO Water Purifier Service & Filter Change",
            price: 299,
            originalPrice: 499,
            duration: "40 mins",
            popular: false,
            features: [
              "TDS level & membrane pressure audit",
              "Sediment & Pre-carbon filter flush",
              "Booster pump & solenoid valve test",
              "UV chamber & leak tightness check"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "home-wiring",
    name: "House Wiring & Electrical Work",
    icon: "Zap",
    tagline: "Certified Electricians, Short Circuit & Complete Wiring",
    color: "#ffaa00",
    bgGradient: "linear-gradient(135deg, rgba(255, 170, 0, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "wiring-repairs",
        name: "Electrician & Switchboard Services",
        description: "Safe, government-grade licensed electricians for installations and emergency faults.",
        services: [
          {
            id: "complete-house-wiring",
            name: "Complete House Wiring & Conduit Piping",
            price: 45,
            priceUnit: "per point",
            originalPrice: 65,
            duration: "Project Basis",
            popular: true,
            features: [
              "FR (Flame Retardant) heavy copper wiring",
              "Concealed wall conduit cutting & casing",
              "Main DB (Distribution Board) cabling",
              "Copper earth rod earthing installation"
            ]
          },
          {
            id: "mcb-tripping-fix",
            name: "MCB Tripping & Short Circuit Emergency Fix",
            price: 249,
            originalPrice: 399,
            duration: "30 mins",
            popular: true,
            features: [
              "Digital insulation megger test",
              "Faulty neutral / earthing wire isolate",
              "MCB / RCCB load balancing audit",
              "Fire hazard prevention inspection"
            ]
          },
          {
            id: "fan-light-fixtures",
            name: "Fan, Chandelier & Smart Lighting Setup",
            price: 149,
            originalPrice: 249,
            duration: "30 mins",
            popular: false,
            features: [
              "Ceiling fan assemble & hook mounting",
              "Chandelier & profile LED light fitting",
              "Modular switch & socket replacement",
              "Inverter changeover switch configuration"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "plumbing",
    name: "Plumbing & Water Solutions",
    icon: "Droplets",
    tagline: "Leak Repairs, Pipe Blockages & Bathroom Fittings",
    color: "#00b4d8",
    bgGradient: "linear-gradient(135deg, rgba(0, 180, 216, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "plumber-works",
        name: "Plumbing & Sanitary Solutions",
        description: "Fast leak fixes, motor installation, overhead tank cleaning, and sanitary ware.",
        services: [
          {
            id: "leakage-tap-repair",
            name: "Tap, Mixer, Faucet & Shower Leak Repair",
            price: 149,
            originalPrice: 249,
            duration: "30 mins",
            popular: true,
            features: [
              "Washer & spindle cartridge change",
              "Hot/cold mixer valve leak rectifying",
              "Hand shower & health faucet fix",
              "Angle valve replacement"
            ]
          },
          {
            id: "drain-blockage",
            name: "Clogged Drain & Sewer Line Clearance",
            price: 299,
            originalPrice: 499,
            duration: "45 mins",
            popular: true,
            features: [
              "Motorized plumbing snake clearing",
              "Kitchen sink grease trap unclogging",
              "Bathroom floor trap debris removal",
              "Odor neutralizer treatment"
            ]
          },
          {
            id: "tank-sump-clean",
            name: "Overhead Water Tank & Sump Deep Clean",
            price: 799,
            originalPrice: 1299,
            duration: "90 mins",
            popular: false,
            features: [
              "High pressure rotary jet sludge removal",
              "Anti-bacterial vacuum extraction",
              "UV light disinfection treatment",
              "Float valve & overflow pipe audit"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "painting",
    name: "Home Painting & Waterproofing",
    icon: "PaintBucket",
    tagline: "Interior, Exterior, Dampness Fix & Wood Polish",
    color: "#ff3366",
    bgGradient: "linear-gradient(135deg, rgba(255, 51, 102, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "painting-works",
        name: "Interior & Exterior Painting",
        description: "Asian Paints / Berger certified painters with floor masking and machine sanding.",
        services: [
          {
            id: "interior-fresh-paint",
            name: "Complete Home Interior Painting",
            price: 12,
            priceUnit: "per sq.ft",
            originalPrice: 16,
            duration: "Per Project",
            popular: true,
            features: [
              "Full furniture masking & floor sheet cover",
              "2 coats acrylic wall putty & 1 coat primer",
              "2 coats premium washable emulsion paint",
              "Dustless electric machine sanding"
            ]
          },
          {
            id: "waterproofing-dampness",
            name: "Wall Dampness & Terrace Waterproofing",
            price: 25,
            priceUnit: "per sq.ft",
            originalPrice: 35,
            duration: "Per Project",
            popular: true,
            features: [
              "Moisture meter detection scan",
              "Elastomeric polymer waterproof membrane",
              "Crack bridging & chemical injection",
              "5-Year warranty against dampness"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "masonry",
    name: "Masonry, Civil Work & Tile Fitting",
    icon: "Hammer",
    tagline: "Tile Laying, Plastering, Granite & Renovation",
    color: "#8a5cf6",
    bgGradient: "linear-gradient(135deg, rgba(138, 92, 246, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "mason-works",
        name: "Masonry & Civil Repairs",
        description: "Experienced masons for floor tile replacement, wall cracks, kitchen platforms.",
        services: [
          {
            id: "tile-replacement",
            name: "Floor & Wall Tile Laying / Broken Tile Fix",
            price: 35,
            priceUnit: "per sq.ft",
            originalPrice: 50,
            duration: "Day Basis",
            popular: true,
            features: [
              "Laser level alignment check",
              "Polymer-modified tile adhesive bonding",
              "Epoxy grouting for zero seepage",
              "Skirting & edge chamfering finish"
            ]
          },
          {
            id: "civil-repair-day",
            name: "Daily Skilled Mason (Plastering & Brickwork)",
            price: 899,
            priceUnit: "per day",
            originalPrice: 1200,
            duration: "1 Day (8 hrs)",
            popular: false,
            features: [
              "Civil plastering & crack filling",
              "Door & window frame concrete anchoring",
              "Granite kitchen slab modification",
              "Debris removal and site cleanup"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "gardening",
    name: "Gardening & Landscape Care",
    icon: "Sprout",
    tagline: "Lawn Mowing, Balcony Garden Setup & Pruning",
    color: "#10b981",
    bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "garden-care",
        name: "Lawn & Garden Maintenance",
        description: "Professional horticulturists for balcony gardens, villas, and apartment lawns.",
        services: [
          {
            id: "lawn-maintenance",
            name: "Lawn Mowing & Weed Removal Service",
            price: 499,
            originalPrice: 750,
            duration: "60 mins",
            popular: true,
            features: [
              "Motorized lawn trimmer mowing",
              "Manual weeding & root removal",
              "Edging along flowerbeds & walkways",
              "Lawn aeration & organic fertilizer spray"
            ]
          },
          {
            id: "balcony-garden-setup",
            name: "Balcony Garden Setup & Drip Irrigation",
            price: 1299,
            originalPrice: 1899,
            duration: "2 hours",
            popular: false,
            features: [
              "Planter pot arrangement & vertical stands",
              "Automatic timer drip irrigation lines",
              "Coco-peat, vermicompost soil mixing",
              "Indoor air-purifying plant curation"
            ]
          }
        ]
      }
    ]
  },
  {
    id: "cleaning",
    name: "Deep Cleaning & Sanitization",
    icon: "Sparkles",
    tagline: "Home Deep Clean, Kitchen Degreasing & Sofa Wash",
    color: "#06b6d4",
    bgGradient: "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(13, 37, 67, 0.8) 100%)",
    subcategories: [
      {
        id: "cleaning-solutions",
        name: "Professional Cleaning Services",
        description: "Single-disc scrubbing machines, industrial vacuums, and eco-friendly chemicals.",
        services: [
          {
            id: "full-home-deep-clean",
            name: "Full Home Deep Cleaning (2BHK / 3BHK)",
            price: 1999,
            originalPrice: 2899,
            duration: "4 - 5 hours",
            popular: true,
            features: [
              "Floor single-disc scrubbing machine polish",
              "Bathroom tile descaling & mirror shine",
              "Window channel, grill & mesh vacuuming",
              "Balcony, switchboard & fan degreasing"
            ]
          },
          {
            id: "sofa-carpet-wash",
            name: "Sofa & Upholstery Deep Shampooing (5 Seater)",
            price: 699,
            originalPrice: 1100,
            duration: "75 mins",
            popular: true,
            features: [
              "Dry vacuum dust & mite extraction",
              "Foam shampoo scrubbing with German chemical",
              "Moisture wet extraction & stain lift",
              "Quick dry fabric fragrance spray"
            ]
          }
        ]
      }
    ]
  }
];
