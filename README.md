# Wealth Mapper

Wealth Mapper is a powerful corporate platform that enables employees to explore US property ownership and wealth data through an interactive map interface. The platform provides secure access to property information, detailed ownership data, and wealth indicators, all presented in an intuitive and user-friendly interface.

## 🌟 Features

### Interactive Property Map
- Interactive map with property markers and clustering
- Zoom and pan controls for easy navigation
- Property markers color-coded by value
- Dynamic marker clustering for better performance
- Custom marker icons and styling

### Property Information
- Detailed property information display
- Property value indicators
- Ownership details
- Property size and characteristics
- Interactive property cards

### Search & Filtering
- Advanced search functionality
- Filter properties by value and size
- Real-time search results
- Dynamic map updates based on filters

### User Management
- Secure user authentication
- Role-based access control
- Company administration
- Employee onboarding
- User profile management

### Data Security
- Encrypted data storage
- Secure API endpoints
- GDPR/CCPA compliance
- Role-based permissions
- Secure authentication

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Vite for fast development and building
- Leaflet.js for interactive mapping
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Query for data fetching
- Axios for API requests

### Backend
- Node.js with Express.js
- PostgreSQL with PostGIS
- Redis for caching
- Clerk for authentication
- Various free APIs for data enrichment

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- PostgreSQL with PostGIS extension
- Redis (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wealth-mapper
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=your_api_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_MAPBOX_TOKEN=your_mapbox_token
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:staging` - Build for staging
- `npm run build:prod` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📦 Project Structure

```
wealth-mapper/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── types/         # TypeScript types
│   ├── lib/           # Utility functions
│   ├── hooks/         # Custom React hooks
│   └── config/        # Configuration files
├── public/            # Static assets
└── ...
```

## 🔒 Security

- All API endpoints are protected with authentication
- Data is encrypted at rest
- Secure session management
- Role-based access control
- Regular security audits

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- OpenStreetMap for map data
- Various open-source contributors
- The React and TypeScript communities
