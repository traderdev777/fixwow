import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  PhoneCall,
  Sparkles
} from 'lucide-react';
import { companyInfo } from '../data/companyInfo';

export default function BookingModal({ 
  isOpen, 
  onClose, 
  preselectedData, 
  selectedArea,
  onBookingSuccess 
}) {
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Form states matching user's screenshot exactly
  const [formData, setFormData] = useState({
    city: '',
    pincode: '',
    itemNeeded: '',
    brand: '',
    fullName: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  // Cities matching Screenshot 2
  const cities = [
    "Bangalore",
    "Belagavi/Belgaum",
    "Chennai",
    "Delhi",
    "Hyderabad",
    "Mumbai",
    "Pune",
    "Other City"
  ];

  // Appliances matching Screenshot 3 & user prompt screenshot
  const appliancesList = [
    "Washing Machine",
    "Refrigerator",
    "Microwave Oven",
    "Water Purifier",
    "Dishwasher",
    "Geyser/Water Heater",
    "Chimney",
    "Mixer/Grinder",
    "LED / LCD / OLED TV",
    "Other"
  ];

  // Washing machine brands in India requested by user
  const washingMachineBrands = [
    "LG",
    "Samsung",
    "Whirlpool",
    "IFB",
    "Bosch",
    "Godrej",
    "Haier",
    "Panasonic",
    "Voltas Beko",
    "Lloyd",
    "Siemens",
    "Electrolux",
    "Midea",
    "Onida",
    "BPL",
    "Kelvinator",
    "Videocon",
    "Sansui",
    "Mitashi",
    "Motorola",
    "Other"
  ];

  // Refrigerator brands in India requested by user
  const refrigeratorBrands = [
    "LG",
    "Samsung",
    "Whirlpool",
    "Godrej",
    "Haier",
    "Voltas Beko",
    "Panasonic",
    "Bosch",
    "IFB",
    "Lloyd",
    "Hitachi",
    "Hisense",
    "Toshiba",
    "Electrolux",
    "Siemens",
    "Kelvinator",
    "Onida",
    "Blue Star",
    "Croma",
    "Midea",
    "Carrier",
    "MarQ",
    "BPL",
    "Videocon",
    "Sansui",
    "Other"
  ];

  // Microwave oven brands in India requested by user
  const microwaveOvenBrands = [
    "LG",
    "Samsung",
    "IFB",
    "Godrej",
    "Whirlpool",
    "Panasonic",
    "Haier",
    "Voltas Beko",
    "Bajaj",
    "Morphy Richards",
    "Bosch",
    "Electrolux",
    "Siemens",
    "Sharp",
    "Onida",
    "BPL",
    "Videocon",
    "Croma",
    "Other"
  ];

  // Water purifier brands in India requested by user
  const waterPurifierBrands = [
    "Kent",
    "Aquaguard (Eureka Forbes)",
    "AO Smith",
    "Livpure",
    "Pureit",
    "Blue Star",
    "LG",
    "Havells",
    "Urban Company",
    "Native",
    "DrinkPrime",
    "Tata Swach",
    "V-Guard",
    "Crompton",
    "HUL Pureit",
    "ZeroB",
    "Faber",
    "Panasonic",
    "Other"
  ];

  // Dishwasher brands in India requested by user
  const dishwasherBrands = [
    "Bosch",
    "IFB",
    "LG",
    "Faber",
    "Siemens",
    "Voltas Beko",
    "Samsung",
    "Miele",
    "Electrolux",
    "Haier",
    "Whirlpool",
    "Kaff",
    "Other"
  ];

  // Geyser / water heater brands in India requested by user
  const geyserBrands = [
    "Racold",
    "Bajaj",
    "Havells",
    "AO Smith",
    "V-Guard",
    "Crompton",
    "Venus",
    "Jaquar",
    "Hindware",
    "Orient Electric",
    "Usha",
    "Candes",
    "Activa",
    "Kenstar",
    "Polycab",
    "Hindustan",
    "State",
    "Ariston",
    "Other"
  ];

  // Kitchen chimney brands in India requested by user
  const chimneyBrands = [
    "Faber",
    "Elica",
    "Kaff",
    "Hindware",
    "Glen",
    "Prestige",
    "Sunflame",
    "Crompton",
    "Havells",
    "Bosch",
    "Siemens",
    "Whirlpool",
    "Kutchina",
    "Inalsa",
    "Eurodomo",
    "Gilma",
    "Pigeon",
    "Other"
  ];

  // Mixer / grinder brands in India requested by user
  const mixerGrinderBrands = [
    "Preethi",
    "Philips",
    "Bajaj",
    "Sujata",
    "Butterfly",
    "Prestige",
    "Havells",
    "Bosch",
    "Maharaja Whiteline",
    "Orient Electric",
    "Crompton",
    "Vidiem",
    "Panasonic",
    "Usha",
    "Wonderchef",
    "Pigeon",
    "Morphy Richards",
    "Kenstar",
    "Candes",
    "Inalsa",
    "Other"
  ];

  // AC services matching Screenshot 1
  const acServicesList = [
    "Split AC",
    "Window AC",
    "Cassette AC",
    "Central AC",
    "AC Installation",
    "AC Gas Refill",
    "AC Servicing/AMC",
    "Other"
  ];

  // AC brands in India requested by user
  const acBrandsList = [
    "LG",
    "Samsung",
    "Daikin",
    "Voltas",
    "Blue Star",
    "Carrier",
    "Hitachi",
    "Panasonic",
    "Godrej",
    "Lloyd",
    "Haier",
    "Whirlpool",
    "Mitsubishi Electric",
    "Mitsubishi Heavy Industries",
    "O General",
    "Toshiba",
    "IFB",
    "Bosch",
    "Sharp",
    "Onida",
    "Videocon",
    "Electrolux",
    "Trane",
    "Reconnect",
    "Cruise",
    "Croma",
    "MarQ",
    "Other / Brand not listed"
  ];

  // Electrical services requested by user
  const electricalServicesList = [
    "Electrical repair & troubleshooting",
    "Wiring & rewiring",
    "Switches & sockets",
    "Lights & chandeliers",
    "Ceiling & exhaust fans",
    "MCB / DB / circuit breaker",
    "Earthing & safety inspection",
    "Inverter / UPS / battery",
    "Main supply & meter assistance",
    "EV charger installation",
    "New construction / renovation",
    "Commercial & industrial electrical",
    "Stabilizer & surge protection",
    "Outdoor & security lighting",
    "Other electrical service"
  ];

  // Plumbing services requested by user
  const plumbingServicesList = [
    "Leak repair & troubleshooting",
    "Tap, faucet & mixer repair",
    "Bathroom plumbing",
    "Kitchen plumbing",
    "Toilet & flush system",
    "Drainage & blockage removal",
    "Water pipe repair & replacement",
    "Water tank & float valve",
    "Water pump & pressure problems",
    "Geyser / water heater plumbing",
    "New plumbing installation",
    "Plumbing renovation",
    "Commercial & industrial plumbing",
    "Sewer & septic services",
    "Plumbing inspection & maintenance",
    "Other plumbing service"
  ];

  // Carpentry services requested by user
  const carpentryServicesList = [
    "Door repair & installation",
    "Wardrobe & cupboard repair",
    "Modular kitchen & cabinets",
    "Furniture assembly & repair",
    "Shelves, racks & TV units",
    "Window & frame repair",
    "Flooring & wooden panelling",
    "Custom carpentry & woodwork",
    "Furniture restoration & polishing",
    "Hardware & fittings",
    "Office furniture repair",
    "Other carpentry service"
  ];

  // Painting services requested by user
  const paintingServicesList = [
    "Interior wall painting",
    "Exterior house painting",
    "Wall putty & surface preparation",
    "Dampness treatment & protective coating",
    "Texture & decorative painting",
    "Wood painting & polishing",
    "Metal, gate & grill painting",
    "Ceiling & false ceiling painting",
    "Commercial & industrial painting",
    "Repainting & wall repair",
    "New construction painting",
    "Rental home repainting",
    "Other painting service"
  ];

  const carpentryPaintingServicesList = [
    ...carpentryServicesList,
    ...paintingServicesList
  ];

  // Cleaning services requested by user
  const cleaningServicesList = [
    "Home deep cleaning",
    "Bathroom & toilet cleaning",
    "Kitchen deep cleaning",
    "Sofa & upholstery cleaning",
    "Mattress cleaning",
    "Carpet & rug cleaning",
    "Window & glass cleaning",
    "Floor cleaning & polishing",
    "Move-in / move-out cleaning",
    "Post-construction cleaning",
    "Office & commercial cleaning",
    "Appliance cleaning",
    "Water tank cleaning",
    "Outdoor & pressure washing",
    "Regular housekeeping",
    "Pest control",
    "Other cleaning service"
  ];

  // Car services requested by user
  const carServicesList = [
    "General car service & maintenance",
    "Engine repair & diagnostics",
    "Clutch & gearbox repair",
    "Brake repair",
    "Suspension & steering repair",
    "Wheel alignment & balancing",
    "Tyre repair & replacement",
    "Battery & electrical repair",
    "Car AC repair & servicing",
    "Washing & interior cleaning",
    "Car detailing & polishing",
    "Denting & painting",
    "Windshield & glass repair",
    "Accessories & electronics installation",
    "Fuel system repair",
    "Pre-purchase car inspection",
    "Roadside assistance & jump-start",
    "Puncture repair",
    "Towing & breakdown recovery",
    "Pickup & drop-off service",
    "Fleet maintenance",
    "EV car service",
    "Other car service"
  ];

  // Bike & scooter services requested by user
  const bikeServicesList = [
    "General bike/scooter service",
    "Engine repair & diagnostics",
    "Clutch & gearbox repair",
    "Brake repair",
    "Tyre repair & replacement",
    "Wheel & suspension repair",
    "Battery & electrical repair",
    "Chain cleaning & adjustment",
    "Fuel system repair",
    "Bike washing & detailing",
    "Bodywork & painting",
    "Accessories installation",
    "Electric scooter/bike service",
    "Battery & charging diagnostics",
    "Roadside assistance",
    "Puncture repair",
    "Towing & breakdown recovery",
    "Pickup & drop-off service",
    "Pre-purchase bike inspection",
    "Fleet maintenance",
    "Other bike service"
  ];

  const carBikeServicesList = [
    ...carServicesList,
    ...bikeServicesList
  ];

  // Car brands requested by user
  const carBrandsList = [
    "Maruti Suzuki",
    "Hyundai",
    "Tata Motors",
    "Mahindra",
    "Toyota",
    "Kia",
    "Honda",
    "Renault",
    "Volkswagen",
    "Skoda",
    "MG Motor",
    "Nissan",
    "Citroën",
    "Jeep",
    "BYD",
    "Mercedes-Benz",
    "BMW",
    "Audi",
    "Volvo",
    "Lexus",
    "Jaguar",
    "Land Rover",
    "Porsche",
    "MINI",
    "Rolls-Royce",
    "Bentley",
    "Lamborghini",
    "Ferrari",
    "Maserati",
    "Aston Martin",
    "McLaren",
    "Force Motors",
    "Isuzu",
    "Other / Brand not listed"
  ];

  // Bike & scooter brands requested by user
  const bikeBrandsList = [
    "Hero MotoCorp",
    "Honda",
    "TVS",
    "Bajaj",
    "Royal Enfield",
    "Yamaha",
    "Suzuki",
    "KTM",
    "Kawasaki",
    "Aprilia",
    "Vespa",
    "Triumph",
    "Harley-Davidson",
    "Jawa",
    "Yezdi",
    "BSA",
    "Norton",
    "BMW Motorrad",
    "Ducati",
    "Indian Motorcycle",
    "Moto Guzzi",
    "Benelli",
    "Keeway",
    "QJMotor",
    "Ather",
    "Ola Electric",
    "Hero Vida",
    "Hero Electric",
    "TVS Electric",
    "Bajaj Chetak",
    "Okinawa",
    "Ampere",
    "PURE EV",
    "River",
    "Simple Energy",
    "BGauss",
    "Kinetic Green",
    "Lectrix EV",
    "Revolt Motors",
    "Ultraviolette",
    "Matter",
    "Oben Electric",
    "Tork Motors",
    "Joy e-bike",
    "Other / Brand not listed"
  ];

  // Electronics repair services requested by user
  const electronicsServicesList = [
    "LED / LCD / OLED TV repair",
    "Smart TV repair & installation",
    "TV display & backlight repair",
    "Home theatre & soundbar repair",
    "Speaker, amplifier & music system repair",
    "Mobile phone repair",
    "Tablet / iPad repair",
    "Laptop repair",
    "Desktop computer repair",
    "Monitor repair",
    "Computer motherboard repair",
    "Printer & scanner repair",
    "Router, modem & Wi-Fi device repair",
    "CCTV camera repair & installation",
    "DVR / NVR repair",
    "Projector repair",
    "Gaming console repair",
    "Set-top box repair",
    "Inverter & UPS repair",
    "Voltage stabilizer repair",
    "Electronic circuit board repair",
    "Smart home device repair",
    "Video door phone / intercom repair",
    "Remote control repair",
    "Data backup & device setup",
    "Other electronics repair"
  ];

  // LCD / LED / OLED repair brands requested by user
  const tvBrandsList = [
    "Samsung",
    "LG",
    "Sony",
    "Panasonic",
    "Philips",
    "Toshiba",
    "Hisense",
    "TCL",
    "Haier",
    "Sharp",
    "Xiaomi (Mi)",
    "Redmi",
    "OnePlus",
    "Vu",
    "Acer",
    "Motorola",
    "Realme",
    "iFFALCON",
    "Kodak",
    "Thomson",
    "Onida",
    "BPL",
    "Lloyd",
    "Daiwa",
    "Intex",
    "Micromax",
    "Sansui",
    "Videocon",
    "Lumio",
    "Blaupunkt",
    "JVC",
    "Akai",
    "Kevin",
    "Sanyo",
    "Koryo",
    "Westinghouse",
    "Croma",
    "Amazon Fire TV",
    "Nokia-branded TVs",
    "Other / Brand not listed"
  ];

  // Electronics brands requested by user
  const electronicsBrandsList = [
    "Acer",
    "AOC",
    "Apple",
    "Amaron",
    "APC",
    "ASUS",
    "Axis Communications",
    "BenQ",
    "Blaupunkt",
    "Blue Star",
    "boAt",
    "Bose",
    "Brother",
    "Canon",
    "CP Plus",
    "Creative",
    "CyberPower",
    "Dahua",
    "Dell",
    "Denon",
    "Eaton",
    "Edifier",
    "Epson",
    "Exide",
    "F&D",
    "Frontech",
    "Gigabyte",
    "Godrej Security Solutions",
    "Google Pixel",
    "Haier",
    "Harman Kardon",
    "Hikvision",
    "Hisense",
    "Hitachi",
    "HP",
    "Huawei",
    "Honor",
    "iBall",
    "iFFALCON",
    "Imou",
    "Infinix",
    "Intex",
    "IQOO",
    "itel",
    "JBL",
    "Jio",
    "Kodak",
    "Kyocera",
    "Lava",
    "Lexmark",
    "LG",
    "Lexar",
    "Lenovo",
    "Luminous",
    "Livguard",
    "Logitech",
    "Marshall",
    "MarQ",
    "Micromax",
    "Microtek",
    "Microsoft",
    "MSI",
    "Motorola",
    "Nothing",
    "Nokia",
    "Noise",
    "Numeric",
    "OnePlus",
    "Onida",
    "OPPO",
    "Panasonic",
    "Pantum",
    "Philips",
    "POCO",
    "Portronics",
    "Prama",
    "Realme",
    "Redmi",
    "Reolink",
    "Ricoh",
    "Samsung",
    "Sansui",
    "Sennheiser",
    "Sharp",
    "Sonos",
    "Sony",
    "TCL",
    "Tecno",
    "Thomson",
    "TP-Link",
    "Toshiba",
    "TVS Electronics",
    "ViewSonic",
    "Vivo",
    "Vu",
    "V-Guard",
    "Wipro",
    "Xerox",
    "Xiaomi",
    "Yamaha",
    "Zebronics",
    "Zebra",
    "Other / Brand not listed"
  ];

  const applianceBrandsMap = {
    "Washing Machine": washingMachineBrands,
    "Refrigerator": refrigeratorBrands,
    "Microwave Oven": microwaveOvenBrands,
    "Water Purifier": waterPurifierBrands,
    "Dishwasher": dishwasherBrands,
    "Geyser/Water Heater": geyserBrands,
    "Chimney": chimneyBrands,
    "Mixer/Grinder": mixerGrinderBrands,
    "LED / LCD / OLED TV": tvBrandsList,
    "Television / Smart TV": tvBrandsList,
    "Smart TV": tvBrandsList,
    "Television": tvBrandsList
  };

  const isTVItem = (item) => Boolean(
    item === "LED / LCD / OLED TV" ||
    item === "LED / LCD / OLED TV repair" ||
    item === "Smart TV repair & installation" ||
    item === "TV display & backlight repair" ||
    item?.toLowerCase().includes("tv") ||
    item?.toLowerCase().includes("oled") ||
    item?.toLowerCase().includes("lcd")
  );

  const isTVService = isTVItem(formData.itemNeeded) || 
                      Boolean(preselectedData?.selectedService?.name && isTVItem(preselectedData.selectedService.name));

  const isElectricalCategory = !Boolean(preselectedData?.categoryName?.toLowerCase().includes('electron')) && (
    preselectedData?.categoryName === 'Electrical Services' || 
    Boolean(preselectedData?.categoryName?.toLowerCase().includes('electric')) ||
    electricalServicesList.includes(formData.itemNeeded)
  );

  const isPlumbingCategory = preselectedData?.categoryName === 'Plumbing Services' || 
                             Boolean(preselectedData?.categoryName?.toLowerCase().includes('plumb')) ||
                             plumbingServicesList.includes(formData.itemNeeded);

  const isCarpentryPaintingCategory = preselectedData?.categoryName === 'Carpentry & Painting' || 
                                      Boolean(preselectedData?.categoryName?.toLowerCase().includes('carpent')) ||
                                      Boolean(preselectedData?.categoryName?.toLowerCase().includes('paint')) ||
                                      carpentryPaintingServicesList.includes(formData.itemNeeded);

  const isCleaningCategory = preselectedData?.categoryName === 'Cleaning Services' || 
                             Boolean(preselectedData?.categoryName?.toLowerCase().includes('clean')) ||
                             cleaningServicesList.includes(formData.itemNeeded);

  const isCarBikeCategory = !isCarpentryPaintingCategory && (
    preselectedData?.categoryName === 'Car & Bike Services' || 
    Boolean(preselectedData?.categoryName?.toLowerCase().includes('bike')) ||
    Boolean(preselectedData?.categoryName?.toLowerCase().includes('garage')) ||
    Boolean(preselectedData?.categoryName?.toLowerCase().includes('auto')) ||
    formData.itemNeeded?.startsWith('Car:') ||
    formData.itemNeeded?.startsWith('Bike:')
  );

  const isElectronicsCategory = !isElectricalCategory && (
    preselectedData?.categoryName === 'Electronics Repair' || 
    Boolean(preselectedData?.categoryName?.toLowerCase().includes('electron')) ||
    electronicsServicesList.includes(formData.itemNeeded)
  );

  const hasNoBrandField = isElectricalCategory || isPlumbingCategory || isCarpentryPaintingCategory || isCleaningCategory;

  const isACCategory = !hasNoBrandField && !isCarBikeCategory && !isElectronicsCategory && (
    preselectedData?.categoryName === 'AC Repair & Installation' || 
    Boolean(preselectedData?.categoryName?.toLowerCase().includes('ac')) ||
    acServicesList.includes(formData.itemNeeded)
  );

  const itemsList = isElectricalCategory
    ? electricalServicesList
    : (isPlumbingCategory
        ? plumbingServicesList
        : (isCarpentryPaintingCategory
            ? carpentryPaintingServicesList
            : (isCleaningCategory
                ? cleaningServicesList
                : (isCarBikeCategory
                    ? carBikeServicesList
                    : (isElectronicsCategory
                        ? electronicsServicesList
                        : (isACCategory ? acServicesList : appliancesList))))));

  // Brands list dynamically tailored to selected appliance, AC, vehicle, TV, or electronics
  const brandsList = isTVService
    ? tvBrandsList
    : (isElectronicsCategory
        ? electronicsBrandsList
        : (isCarBikeCategory
            ? (formData.itemNeeded?.startsWith('Bike:')
                ? bikeBrandsList
                : (formData.itemNeeded?.startsWith('Car:')
                    ? carBrandsList
                    : [...carBrandsList, ...bikeBrandsList]))
            : (isACCategory || acServicesList.includes(formData.itemNeeded)
                ? acBrandsList
                : ((formData.itemNeeded && applianceBrandsMap[formData.itemNeeded]) || washingMachineBrands))));

  // Time slots matching Screenshot 5
  const timeSlots = [
    "Immediate Dispatch (Within 30-45 mins)",
    "Morning (9:00 AM – 12:00 PM)",
    "Afternoon (12:00 PM – 3:00 PM)",
    "Evening (3:00 PM – 7:00 PM)"
  ];

  // Reset or initialize context when modal opens
  useEffect(() => {
    if (isOpen) {
      setBookingConfirmed(false);
      setFormData({
        city: '',
        pincode: '',
        itemNeeded: '',
        brand: '',
        customBrand: '',
        customService: '',
        fullName: '',
        phone: '',
        email: '',
        address: '',
        preferredDate: '',
        preferredTime: '',
        notes: ''
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const modalTitle = isElectricalCategory
    ? "Book Electrical Services"
    : (isPlumbingCategory
        ? "Book Plumbing Services"
        : (isCarpentryPaintingCategory
            ? "Book Carpentry & Painting Services"
            : (isCleaningCategory
                ? "Book Cleaning Services"
                : (isCarBikeCategory
                    ? "Book Car & Bike Services"
                    : (isElectronicsCategory
                        ? "Book Electronics Repair"
                        : (isACCategory 
                            ? "Book AC Repair & Installation" 
                            : (preselectedData?.categoryName ? `Book ${preselectedData.categoryName}` : "Book Home Appliance Repair")))))));

  const isOtherCarpentryPainting = formData.itemNeeded === 'Other carpentry service' || 
                                   formData.itemNeeded === 'Other painting service' || 
                                   formData.itemNeeded === 'Other';

  const isOtherCarBike = formData.itemNeeded === 'Car: Other car service' || 
                         formData.itemNeeded === 'Bike: Other bike service' || 
                         (isCarBikeCategory && formData.itemNeeded?.includes('Other'));

  const isOtherElectronics = formData.itemNeeded === 'Other electronics repair' || 
                             formData.itemNeeded === 'Other';

  const isOtherBrand = formData.brand === 'Other' || formData.brand === 'Other / Brand not listed';
  const chosenBrand = (isOtherBrand && formData.customBrand) 
    ? formData.customBrand 
    : (formData.brand || (isACCategory ? 'AC' : (isCarBikeCategory ? 'Vehicle' : (isElectronicsCategory ? 'Device' : 'Appliance'))));

  const displayService = isElectricalCategory
    ? ((formData.itemNeeded === 'Other electrical service' && formData.customService) 
        ? formData.customService 
        : (formData.itemNeeded || 'Electrical Service'))
    : (isPlumbingCategory
        ? ((formData.itemNeeded === 'Other plumbing service' && formData.customService) 
            ? formData.customService 
            : (formData.itemNeeded || 'Plumbing Service'))
        : (isCarpentryPaintingCategory
            ? ((isOtherCarpentryPainting && formData.customService)
                ? formData.customService 
                : (formData.itemNeeded || 'Carpentry & Painting Service'))
            : (isCleaningCategory
                ? ((formData.itemNeeded === 'Other cleaning service' && formData.customService)
                    ? formData.customService
                    : (formData.itemNeeded || 'Cleaning Service'))
                : (isCarBikeCategory
                    ? `${chosenBrand} - ${formData.itemNeeded || 'Vehicle Service'}`
                    : (isElectronicsCategory
                        ? `${chosenBrand} - ${isOtherElectronics && formData.customService ? formData.customService : (formData.itemNeeded || 'Electronics Repair')}`
                        : `${chosenBrand} ${formData.itemNeeded || 'Service'}`)))));

  const servicePrice = isElectricalCategory 
    ? 299 
    : (isPlumbingCategory 
        ? 249 
        : (isCarpentryPaintingCategory 
            ? 599 
            : (isCleaningCategory
                ? 499
                : (isCarBikeCategory
                    ? 449
                    : (isElectronicsCategory
                        ? 349
                        : (isACCategory ? 499 : 399))))));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `FW-BLR-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedBookingId(newId);
    setBookingConfirmed(true);

    if (onBookingSuccess) {
      onBookingSuccess({
        id: newId,
        service: displayService,
        customerName: formData.fullName || 'Valued Customer',
        phone: formData.phone,
        area: `${formData.city} (${formData.pincode})`,
        address: formData.address,
        dateSlot: formData.preferredDate,
        timeSlot: formData.preferredTime,
        price: servicePrice
      });
    }
  };

  const handleCloseModal = () => {
    setBookingConfirmed(false);
    onClose();
  };

  return (
    <div className="neat-modal-backdrop">
      <div className="neat-modal-card">
        {/* Modal Header Matching Screenshot 1 */}
        <div className="neat-modal-header">
          <div>
            <h2 className="neat-modal-title">{modalTitle}</h2>
            <p className="neat-modal-subtitle">
              Fill in your details and we'll get back to you within 30 minutes.
            </p>
          </div>
          <button className="neat-modal-close" onClick={handleCloseModal} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {bookingConfirmed ? (
          <div className="neat-modal-success-wrap">
            <div className="success-icon-badge">
              <CheckCircle2 size={46} className="text-orange" />
            </div>
            <h3 className="success-title">Service Booked Successfully!</h3>
            <p className="success-subtitle">
              Your service request has been confirmed. A FixWow certified technician is being dispatched to your doorstep.
            </p>

            <div className="neat-receipt-card">
              <div className="receipt-line">
                <span>Booking Reference:</span>
                <strong className="text-orange">{generatedBookingId}</strong>
              </div>
              <div className="receipt-line">
                <span>{hasNoBrandField ? "Service Required:" : (isCarBikeCategory ? "Vehicle & Service:" : (isElectronicsCategory ? "Device & Brand:" : "Appliance & Brand:"))}</span>
                <strong>
                  {hasNoBrandField 
                    ? displayService 
                    : (isCarBikeCategory 
                        ? `${chosenBrand} • ${formData.itemNeeded || 'Service'}` 
                        : (isElectronicsCategory
                            ? `${chosenBrand} • ${isOtherElectronics && formData.customService ? formData.customService : (formData.itemNeeded || 'Electronics Repair')}`
                            : `${formData.brand} - ${formData.itemNeeded}`))}
                </strong>
              </div>
              <div className="receipt-line">
                <span>Location:</span>
                <strong>{formData.city} (PIN: {formData.pincode})</strong>
              </div>
              <div className="receipt-line">
                <span>Scheduled Slot:</span>
                <strong>{formData.preferredDate} • {formData.preferredTime}</strong>
              </div>
              <div className="receipt-line receipt-total">
                <span>Estimated Inspection Charge:</span>
                <span className="receipt-price">₹{servicePrice} (Pay after repair)</span>
              </div>
            </div>

            <div className="success-actions-row">
              <button 
                className="btn btn-neat-primary"
                onClick={handleCloseModal}
              >
                <span>Track Live Status</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20FixWow,%20I%20just%20booked%20${generatedBookingId}%20for%20${encodeURIComponent(displayService)}`}
                target="_blank" 
                rel="noreferrer"
                className="btn btn-neat-outline-dark"
              >
                <span>WhatsApp Updates</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="neat-booking-form">
            {/* 1. Service Location Card (Screenshot 1 & 2) */}
            <div className="neat-location-box">
              <div className="neat-box-header">
                <MapPin size={16} className="text-orange" />
                <span>Service Location</span>
              </div>

              <div className="neat-form-row">
                {/* City Dropdown (Screenshot 2) */}
                <div className="neat-form-group flex-1">
                  <label>City *</label>
                  <select 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  >
                    <option value="">Select your city</option>
                    {cities.map((city, idx) => (
                      <option key={idx} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* PIN Code Input */}
                <div className="neat-form-group flex-1">
                  <label>PIN Code *</label>
                  <input 
                    type="text" 
                    placeholder="Enter PIN code"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* 2. What needs service? (Screenshot 1, 3, Electrical, Plumbing, Carpentry & Painting) */}
            <div className="neat-form-group">
              <label>What needs service? *</label>
              <select 
                value={formData.itemNeeded}
                onChange={(e) => {
                  const newItem = e.target.value;
                  const isItemTV = isTVItem(newItem);
                  const allowedBrands = isItemTV
                    ? tvBrandsList
                    : (isElectronicsCategory
                        ? electronicsBrandsList
                        : (isCarBikeCategory
                            ? (newItem?.startsWith('Bike:') ? bikeBrandsList : (newItem?.startsWith('Car:') ? carBrandsList : [...carBrandsList, ...bikeBrandsList]))
                            : (isACCategory || acServicesList.includes(newItem)
                                ? acBrandsList
                                : ((newItem && applianceBrandsMap[newItem]) || washingMachineBrands))));
                  setFormData(prev => ({ 
                    ...prev, 
                    itemNeeded: newItem,
                    brand: allowedBrands.includes(prev.brand) ? prev.brand : ''
                  }));
                }}
                required
              >
                <option value="">
                  {isElectricalCategory 
                    ? "Select electrical service" 
                    : (isPlumbingCategory
                        ? "Select plumbing service"
                        : (isCarpentryPaintingCategory
                            ? "Select carpentry or painting service"
                            : (isCleaningCategory
                                ? "Select cleaning service"
                                : (isCarBikeCategory
                                    ? "Select car or bike service"
                                    : (isElectronicsCategory
                                        ? "Select electronic device/service"
                                        : (isACCategory ? "Select AC service" : "Select item/appliance"))))))}
                </option>
                {isCarpentryPaintingCategory ? (
                  <>
                    <optgroup label="Carpentry Services">
                      {carpentryServicesList.map((item, idx) => (
                        <option key={`c-${idx}`} value={item}>{item}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Painting Services">
                      {paintingServicesList.map((item, idx) => (
                        <option key={`p-${idx}`} value={item}>{item}</option>
                      ))}
                    </optgroup>
                  </>
                ) : isCarBikeCategory ? (
                  <>
                    <optgroup label="Car Services">
                      {carServicesList.map((item, idx) => (
                        <option key={`car-${idx}`} value={`Car: ${item}`}>{item}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Bike & Scooter Services">
                      {bikeServicesList.map((item, idx) => (
                        <option key={`bike-${idx}`} value={`Bike: ${item}`}>{item}</option>
                      ))}
                    </optgroup>
                  </>
                ) : (
                  itemsList.map((item, idx) => (
                    <option key={idx} value={item}>{item}</option>
                  ))
                )}
              </select>

              {isElectricalCategory && (formData.itemNeeded === 'Other electrical service' || formData.itemNeeded === 'Other') && (
                <input 
                  type="text" 
                  placeholder="Specify your electrical service"
                  value={formData.customService || ''}
                  onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                  style={{ marginTop: '8px' }}
                />
              )}

              {isPlumbingCategory && (formData.itemNeeded === 'Other plumbing service' || formData.itemNeeded === 'Other') && (
                <input 
                  type="text" 
                  placeholder="Specify your plumbing service"
                  value={formData.customService || ''}
                  onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                  style={{ marginTop: '8px' }}
                />
              )}

              {isCarpentryPaintingCategory && (
                formData.itemNeeded === 'Other carpentry service' || 
                formData.itemNeeded === 'Other painting service' || 
                formData.itemNeeded === 'Other'
              ) && (
                <input 
                  type="text" 
                  placeholder={
                    formData.itemNeeded === 'Other carpentry service'
                      ? "Specify your carpentry service"
                      : (formData.itemNeeded === 'Other painting service'
                          ? "Specify your painting service"
                          : "Specify your carpentry or painting service")
                  }
                  value={formData.customService || ''}
                  onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                  style={{ marginTop: '8px' }}
                />
              )}

              {isCleaningCategory && (formData.itemNeeded === 'Other cleaning service' || formData.itemNeeded === 'Other') && (
                <input 
                  type="text" 
                  placeholder="Specify your cleaning service"
                  value={formData.customService || ''}
                  onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                  style={{ marginTop: '8px' }}
                />
              )}

              {isCarBikeCategory && (
                formData.itemNeeded === 'Car: Other car service' || 
                formData.itemNeeded === 'Bike: Other bike service' || 
                (isCarBikeCategory && formData.itemNeeded?.includes('Other'))
              ) && (
                <input 
                  type="text" 
                  placeholder={
                    formData.itemNeeded?.includes('Bike')
                      ? "Specify your bike or scooter service"
                      : "Specify your car service"
                  }
                  value={formData.customService || ''}
                  onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                  style={{ marginTop: '8px' }}
                />
              )}

              {isElectronicsCategory && (formData.itemNeeded === 'Other electronics repair' || formData.itemNeeded === 'Other') && (
                <input 
                  type="text" 
                  placeholder="Specify your electronics repair service"
                  value={formData.customService || ''}
                  onChange={(e) => setFormData({ ...formData, customService: e.target.value })}
                  style={{ marginTop: '8px' }}
                />
              )}
            </div>

            {/* 3. Brand - Omitted for Electrical, Plumbing, Carpentry, Painting & Cleaning Services */}
            {!hasNoBrandField && (
              <div className="neat-form-group">
                <label>Brand *</label>
                <select 
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                >
                  <option value="">Select brand</option>
                  {isCarBikeCategory && !formData.itemNeeded ? (
                    <>
                      <optgroup label="Car Brands">
                        {carBrandsList.map((brand, idx) => (
                          <option key={`cb-${idx}`} value={brand}>{brand}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Bike & Scooter Brands">
                        {bikeBrandsList.map((brand, idx) => (
                          <option key={`bb-${idx}`} value={brand}>{brand}</option>
                        ))}
                      </optgroup>
                    </>
                  ) : (isElectronicsCategory && !formData.itemNeeded) ? (
                    <>
                      <optgroup label="LCD / LED / OLED TV Brands">
                        {tvBrandsList.map((brand, idx) => (
                          <option key={`tv-${idx}`} value={brand}>{brand}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Other Electronics & IT Brands">
                        {electronicsBrandsList.map((brand, idx) => (
                          <option key={`el-${idx}`} value={brand}>{brand}</option>
                        ))}
                      </optgroup>
                    </>
                  ) : (
                    brandsList.map((brand, idx) => (
                      <option key={idx} value={brand}>{brand}</option>
                    ))
                  )}
                </select>

                {(formData.brand === 'Other' || formData.brand === 'Other / Brand not listed') && (
                  <input 
                    type="text" 
                    placeholder={
                      isCarBikeCategory 
                        ? "Specify your vehicle brand" 
                        : (isElectronicsCategory 
                            ? "Specify your electronics brand" 
                            : "Specify your brand")
                    }
                    value={formData.customBrand || ''}
                    onChange={(e) => setFormData({ ...formData, customBrand: e.target.value })}
                    style={{ marginTop: '8px' }}
                  />
                )}
              </div>
            )}

            {/* 4. Full Name & Phone Number (Screenshot 1 & 5) */}
            <div className="neat-form-row">
              <div className="neat-form-group flex-1">
                <label>Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Your name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="neat-form-group flex-1">
                <label>Phone Number *</label>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* 5. Email (Optional) */}
            <div className="neat-form-group">
              <label>Email (Optional)</label>
              <input 
                type="email" 
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* 6. Service Address */}
            <div className="neat-form-group">
              <label>Service Address *</label>
              <textarea 
                rows="3"
                placeholder="Enter your complete address (house/flat no, street, landmark)"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            {/* 7. Preferred Date & Time (Screenshot 5) */}
            <div className="neat-form-row">
              <div className="neat-form-group flex-1">
                <label>Preferred Date</label>
                <div className="input-with-icon">
                  <input 
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="neat-form-group flex-1">
                <label>Preferred Time</label>
                <select 
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                >
                  <option value="">Select time</option>
                  {timeSlots.map((slot, idx) => (
                    <option key={idx} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 8. Additional Notes */}
            <div className="neat-form-group">
              <label>Additional Notes</label>
              <textarea 
                rows="2"
                placeholder="Describe the issue or any special requirements..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            {/* 9. Action Buttons Matching Screenshot 5 */}
            <div className="neat-modal-actions">
              <button 
                type="button" 
                className="btn btn-neat-cancel"
                onClick={handleCloseModal}
              >
                Cancel
              </button>

              <button 
                type="submit" 
                className="btn btn-neat-confirm"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
