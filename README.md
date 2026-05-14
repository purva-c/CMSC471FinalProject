# The Geography of Taste — Michelin Guide Visualization

## Project Description

An interactive data visualization exploring the geographic and socioeconomic patterns in the Michelin Guide's restaurant coverage. Through an interactive map, choropleth visualizations, and a beeswarm chart, this project reveals how the world's most influential restaurant rating system reflects not just culinary excellence, but decades of European-centric expansion decisions.

The visualization examines:
- The spatial distribution of 19,036 Michelin-listed restaurants globally
- Per-capita restaurant coverage revealing stark continental disparities
- The relationship between price tiers and award levels
- Regional variations in how "fine dining" is evaluated
- The vast culinary traditions left unmapped by the guide

**Live Demo:** https://purva-c.github.io/CMSC471FinalProject/

## Team Members

- Sriya Sogal
- Purva Chimurkar
- Sayee Naresh Kumar 

## Work Breakdown

This project was completed collaboratively by all team members. The team worked together on all major components including:
- Brainstoring and data collection (Michelin Guide dataset from Kaggle)
- Interactive map implementation using Leaflet.js with clustering
- Choropleth visualization with Scrollama for scroll-driven storytelling
- Beeswarm chart showing price vs. award tier relationships
- UI/UX design and narrative structure
- Responsive layout and accessibility considerations
All design decisions, code implementation, and visualization choices were made through collaborative discussion and pair programming sessions.

### File Structure
```
project/
├── index.html           # Main HTML file
├── css/
│   └── styles.css      # All styling
├── js/
│   └── script.js       # Main JavaScript (D3, Leaflet, Scrollama)
├── data/
│   ├── michelin_my_maps.csv      # Restaurant dataset
│   ├── michelin_logo.png         # Michelin badge image
│   └── world-110m.json           # TopoJSON world map (if used)
└── README.md           # This file
```

## Data Sources

**Primary Dataset:**
- Michelin Guide Restaurants Dataset (Kaggle)
- Contains 19,036 restaurant listings across 45 countries
- Includes: name, location, cuisine, price tier, award level, coordinates

**Geospatial Data:**
- Natural Earth 1:110m Cultural Vectors for world map boundaries
- OpenStreetMap via Leaflet.js for the interactive map base layer

## Technologies Used

- **D3.js v7** - Data visualization and choropleth rendering
- **Leaflet.js** - Interactive map with marker clustering
- **Scrollama** - Scroll-driven narrative transitions
- **TopoJSON** - Efficient geographic data format
- **Vanilla JavaScript** - Custom interaction logic
- **HTML/CSS** - Structure and styling

## Design Inspirations

This project draws inspiration from:
- The Pudding's long-form visual essays for narrative structure
- Hans Rosling's GapMinder for animated statistical storytelling
- Nathan Yau's FlowingData for effective use of beeswarm plots
- The New York Times' interactive graphics for clean, editorial design

## Acknowledgements

**Data Source:**  
Michelin Guide Restaurants Dataset via Kaggle, compiled from official Michelin Guide publications.

**Development Assistance:**  
This project was developed with assistance from Claude (Anthropic), an AI assistant used for:
- Code debugging and optimization
- D3.js and Leaflet.js implementation guidance
- CSS styling and responsive design solutions
- Data processing and transformation logic

**Design & Typography:**
- Playfair Display (Google Fonts) - Serif headings
- EB Garamond (Google Fonts) - Body text
- Courier Prime (Google Fonts) - Labels and metadata

**Libraries & Frameworks:**
- D3.js © Mike Bostock
- Leaflet.js © Vladimir Agafonkin
- Scrollama © Russell Goldenberg
- Leaflet.markercluster plugin

---

**Course:** CMSC471
**Institution:** University of Maryland 
**Semester:** Spring 2026  
**Instructor:** Dr. Fumeng Yang