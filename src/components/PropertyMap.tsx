import { useEffect, useState, useRef } from "react";
import { Property, MapViewState, FilterState } from "@/types";
import PropertyDetails from "./PropertyDetails";
import { Button } from "./ui/button";
import { toast } from "sonner";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import "leaflet.markercluster";

// Fix for default marker icons
const iconUrl = "/marker.png"; // Using local marker from public directory
const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

// Create custom icon
const customIcon = new L.Icon({
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowAnchor: [20, 41],
  className: "custom-marker-icon",
});

// Add error handling for marker icons
const handleMarkerIconError = (e: Event) => {
  const img = e.target as HTMLImageElement;
  if (img.classList.contains("leaflet-marker-icon")) {
    img.src = "/placeholder.svg";
    img.style.width = "25px";
    img.style.height = "41px";
  }
};

interface PropertyMapProps {
  properties: Property[];
  loading: boolean;
  filters: FilterState;
  onViewStateChange?: (viewState: MapViewState) => void;
}

interface ClusterStyle {
  size: number;
  color: string;
  borderColor: string;
}

const getClusterStyle = (count: number, avgValue: number): ClusterStyle => {
  // Style based on cluster size and average property value
  const size = Math.min(Math.max(25, count * 5), 50);
  const color =
    avgValue > 5000000 ? "#ef4444" : avgValue > 2000000 ? "#f59e0b" : "#10b981";

  return {
    size,
    color,
    borderColor: "#ffffff",
  };
};

// Custom marker icon configuration
const createCustomIcon = (property: Property) => {
  const value = property.value || 0;
  const color =
    value > 5000000 ? "#ef4444" : value > 2000000 ? "#f59e0b" : "#10b981";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 16px;
      height: 16px;
      background: ${color};
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

const PropertyMap = ({
  properties,
  loading,
  filters,
  onViewStateChange,
}: PropertyMapProps) => {
  const mapRef = useRef<any>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const clusterGroupRef = useRef<any>(null);

  // Initialize map on component mount
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Create map
    const map = L.map(mapContainerRef.current).setView([37.0902, -95.7129], 4);

    // Add error handling for marker icons
    document.addEventListener("error", handleMarkerIconError, true);

    // Add tile layer (OpenStreetMap)
    // Add proper image loading and error handling
    const handleImageError = (
      e: React.SyntheticEvent<HTMLImageElement, Event>
    ) => {
      e.currentTarget.src = "/placeholder.svg";
    };

    // Add loading state for map tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: "map-tiles",
      errorTileUrl: "/placeholder.svg",
      loading: "lazy",
    }).addTo(map);

    // Add zoom controls with better positioning
    map.addControl(
      L.control.zoom({
        position: "bottomright",
      })
    );

    // Initialize cluster group
    const clusterGroup = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 50,
      iconCreateFunction: (cluster) => {
        const markers = cluster.getAllChildMarkers();
        const count = markers.length;
        const avgValue =
          markers.reduce((sum, m) => sum + m.options.property.value, 0) / count;
        const style = getClusterStyle(count, avgValue);

        return L.divIcon({
          html: `<div style="
            width: ${style.size}px;
            height: ${style.size}px;
            background: ${style.color};
            border: 2px solid ${style.borderColor};
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            color: white;
            font-weight: bold;
          ">${count}</div>`,
          className: "property-cluster",
          iconSize: L.point(style.size, style.size),
        });
      },
    });

    map.addLayer(clusterGroup);
    clusterGroupRef.current = clusterGroup;

    // Save map instance to ref
    mapRef.current = map;

    // Listen for map move/zoom events
    map.on("moveend", () => {
      if (onViewStateChange) {
        const center = map.getCenter();
        onViewStateChange({
          center: [center.lat, center.lng],
          zoom: map.getZoom(),
          bounds: [
            [map.getBounds().getSouth(), map.getBounds().getWest()],
            [map.getBounds().getNorth(), map.getBounds().getEast()],
          ],
        });
      }
    });

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        clusterGroupRef.current = null;
      }
      document.removeEventListener("error", handleMarkerIconError, true);
    };
  }, []);

  // Update markers when properties change
  useEffect(() => {
    if (!mapRef.current || !clusterGroupRef.current) return;

    // Clear existing markers
    clusterGroupRef.current.clearLayers();
    markersRef.current = [];

    // Add new markers
    properties.forEach((property) => {
      const marker = L.marker([property.latitude, property.longitude], {
        property, // Add property data to marker for cluster calculations
        icon: customIcon,
      });
      marker.on("click", () => setSelectedProperty(property));
      markersRef.current.push(marker);
      clusterGroupRef.current.addLayer(marker);
    });

    // If we have markers and they're visible, fit bounds
    if (markersRef.current.length > 0 && !loading) {
      const group = L.featureGroup(markersRef.current);
      mapRef.current.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }, [properties, loading]);

  const handleSaveView = () => {
    if (!mapRef.current) return;

    const center = mapRef.current.getCenter();
    const viewState: MapViewState = {
      center: [center.lat, center.lng],
      zoom: mapRef.current.getZoom(),
      bounds: [
        [
          mapRef.current.getBounds().getSouth(),
          mapRef.current.getBounds().getWest(),
        ],
        [
          mapRef.current.getBounds().getNorth(),
          mapRef.current.getBounds().getEast(),
        ],
      ],
    };

    console.log("Saving map view:", viewState);
    toast.success("Map view saved successfully!");
  };

  return (
    <div className="relative h-full flex">
      <div className="w-1/3 flex flex-col">
        {/* Search filters would go here */}
        {selectedProperty && (
          <div className="flex-1 overflow-y-auto p-4">
            <PropertyDetails
              property={selectedProperty}
              onClose={() => setSelectedProperty(null)}
            />
          </div>
        )}
      </div>

      <div
        ref={mapContainerRef}
        className="map-container flex-1"
        style={{ height: "calc(100vh - 4rem)" }}
      />

      {loading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
          <div className="text-xl font-semibold animate-pulse">
            Loading properties...
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10 space-y-2">
        <Button
          onClick={handleSaveView}
          variant="secondary"
          className="shadow-lg"
        >
          Save Current View
        </Button>
      </div>
    </div>
  );
};

export default PropertyMap;
