import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { ArrowLeft, Clock, MapPin, Star, Check, Loader2, Navigation, IndianRupee, Car, Bike, Zap, Shield, Clock3 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { motion, AnimatePresence } from 'motion/react';

interface RideOption {
  id: string;
  type: 'auto' | 'cab' | 'bike' | 'premium';
  name: string;
  provider: string;
  price: number;
  originalPrice?: number;
  eta: string;
  pickupTime: string;
  rating: number;
  trips: number;
  features: string[];
  vehicleType: string;
  capacity: number;
  badge?: 'Cheapest' | 'Fastest' | 'Popular' | 'Comfort';
  color: string;
}

const MOCK_RIDES: RideOption[] = [
  {
    id: 'auto-1',
    type: 'auto',
    name: 'Auto Rickshaw',
    provider: 'TransitWin Auto',
    price: 23,
    eta: '2 min',
    pickupTime: '2-5 min pickup',
    rating: 4.5,
    trips: 12500,
    features: ['Meter fare', 'No surge pricing', 'Cash/UPI accepted'],
    vehicleType: 'Auto (3-wheeler)',
    capacity: 3,
    badge: 'Cheapest',
    color: '#4a7c59'
  },
  {
    id: 'cab-1',
    type: 'cab',
    name: 'Mini Cab',
    provider: 'Ola / Uber',
    price: 89,
    originalPrice: 105,
    eta: '5 min',
    pickupTime: '5-8 min pickup',
    rating: 4.3,
    trips: 8500,
    features: ['AC ride', 'In-car music', 'Mobile charging', 'Boot space'],
    vehicleType: 'Hatchback (4-seater)',
    capacity: 4,
    badge: 'Popular',
    color: '#1e3a5f'
  },
  {
    id: 'premium-1',
    type: 'premium',
    name: 'Prime Sedan',
    provider: 'Ola Prime / Uber Go',
    price: 149,
    originalPrice: 175,
    eta: '8 min',
    pickupTime: '8-12 min pickup',
    rating: 4.7,
    trips: 6200,
    features: ['Premium AC', 'Leather seats', 'Music control', 'Extra legroom', 'Professional driver'],
    vehicleType: 'Sedan (4-seater)',
    capacity: 4,
    badge: 'Comfort',
    color: '#b8954f'
  },
  {
    id: 'bike-1',
    type: 'bike',
    name: 'Rapido Bike',
    provider: 'Rapido',
    price: 25,
    eta: '1 min',
    pickupTime: '1-3 min pickup',
    rating: 4.2,
    trips: 22000,
    features: ['Beat traffic', 'Helmet provided', 'Perfect for singles', 'Cash/UPI accepted'],
    vehicleType: 'Bike (2-wheeler)',
    capacity: 1,
    badge: 'Fastest',
    color: '#22c55e'
  },
  {
    id: 'cab-2',
    type: 'cab',
    name: 'SUV XL',
    provider: 'Uber XL / Ola SUV',
    price: 199,
    eta: '7 min',
    pickupTime: '7-10 min pickup',
    rating: 4.6,
    trips: 4200,
    features: ['Spacious 6-seater', 'AC ride', 'Large boot space', 'Family friendly'],
    vehicleType: 'SUV (6-seater)',
    capacity: 6,
    color: '#6366f1'
  },
  {
    id: 'auto-2',
    type: 'auto',
    name: 'Share Auto',
    provider: 'TransitWin Share',
    price: 12,
    eta: '3 min',
    pickupTime: '3-6 min pickup',
    rating: 4.1,
    trips: 18000,
    features: ['Shared ride', 'Fixed routes', 'Super cheap', 'Eco-friendly'],
    vehicleType: 'Shared Auto (3-wheeler)',
    capacity: 3,
    color: '#6b6560'
  }
];

const VEHICLE_ICONS: Record<string, string> = {
  auto: '🛺',
  cab: '🚗',
  premium: '🚘',
  bike: '🏍️'
};

export function BookingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRide, setSelectedRide] = useState<string | null>(null);
  const [bookingState, setBookingState] = useState<'selecting' | 'confirming' | 'confirmed'>('selecting');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'upi' | 'card'>('cash');

  // Mock origin and destination - in real app, get from state or URL params
  const origin = location.state?.origin || { name: 'Thane Station', address: 'Thane West, Mumbai' };
  const destination = location.state?.destination || { name: 'BKC', address: 'Bandra Kurla Complex, Mumbai' };
  const distance = location.state?.distance || '12.5 km';
  const duration = location.state?.duration || '35 min';

  const handleBook = async (rideId: string) => {
    setSelectedRide(rideId);
    setBookingState('confirming');
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setBookingState('confirmed');
    
    // Navigate to live tracking after confirmation
    setTimeout(() => {
      const ride = MOCK_RIDES.find(r => r.id === rideId);
      navigate('/live-tracking', {
        state: {
          origin,
          destination,
          ride,
          paymentMethod
        }
      });
    }, 1500);
  };

  const selectedRideData = MOCK_RIDES.find(r => r.id === selectedRide);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-gray-900">Book Your Ride</h1>
            <p className="text-sm text-gray-500">Choose from {MOCK_RIDES.length} available options</p>
          </div>
        </div>

        {/* Route Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#1e3a5f] to-[#4a7c59] rounded-2xl p-5 text-white mb-6 shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-3 h-3 bg-emerald-400 rounded-full" />
              <div className="w-0.5 h-12 bg-white/30" />
              <div className="w-3 h-3 bg-[#b8954f] rounded-full" />
            </div>
            <div className="flex-1">
              <div className="mb-3">
                <p className="text-xs text-white/60 uppercase tracking-wider font-bold">From</p>
                <p className="font-bold text-lg">{origin.name}</p>
                <p className="text-sm text-white/80">{origin.address}</p>
              </div>
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wider font-bold">To</p>
                <p className="font-bold text-lg">{destination.name}</p>
                <p className="text-sm text-white/80">{destination.address}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 rounded-xl px-4 py-2">
                <p className="text-2xl font-black">{distance}</p>
                <p className="text-xs text-white/80">{duration}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Booking Flow */}
        <AnimatePresence mode="wait">
          {bookingState === 'selecting' && (
            <motion.div
              key="selecting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Payment Method Selector */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Payment Method</p>
                <div className="flex gap-2">
                  {[
                    { id: 'cash', label: 'Cash', icon: '💵' },
                    { id: 'upi', label: 'UPI', icon: '📱' },
                    { id: 'card', label: 'Card', icon: '💳' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                        paymentMethod === method.id
                          ? 'bg-[#1e3a5f] text-white shadow-md'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span>{method.icon}</span>
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Ride Options */}
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
                Available Rides
              </p>
              
              {MOCK_RIDES.map((ride, index) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl border-2 p-5 cursor-pointer transition-all hover:shadow-lg ${
                    selectedRide === ride.id
                      ? 'border-[#b8954f] shadow-lg'
                      : 'border-gray-200 hover:border-[#b8954f]/50'
                  }`}
                  onClick={() => setSelectedRide(ride.id)}
                >
                  <div className="flex items-start gap-4">
                    {/* Vehicle Icon */}
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                      style={{ backgroundColor: ride.color + '15' }}
                    >
                      {VEHICLE_ICONS[ride.type]}
                    </div>

                    {/* Ride Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-bold text-gray-900 text-lg">{ride.name}</h3>
                          <p className="text-sm text-gray-500">{ride.provider}</p>
                        </div>
                        {ride.badge && (
                          <span
                            className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full"
                            style={{
                              backgroundColor: ride.color + '15',
                              color: ride.color
                            }}
                          >
                            {ride.badge}
                          </span>
                        )}
                      </div>

                      {/* Rating & ETA */}
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-bold text-gray-700">{ride.rating}</span>
                          <span className="text-xs text-gray-400">({(ride.trips / 1000).toFixed(1)}k trips)</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">{ride.eta}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Navigation className="w-4 h-4" />
                          <span className="text-sm font-medium">{ride.vehicleType}</span>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {ride.features.map((feature, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Price & Book Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-black text-gray-900">₹{ride.price}</span>
                            {ride.originalPrice && (
                              <span className="text-lg text-gray-400 line-through">₹{ride.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{ride.pickupTime}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBook(ride.id);
                          }}
                          className="bg-[#b8954f] hover:bg-[#a88445] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {bookingState === 'confirming' && selectedRideData && (
            <motion.div
              key="confirming"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border-2 border-[#b8954f] p-8 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-[#b8954f]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="w-10 h-10 text-[#b8954f] animate-spin" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Confirming your ride...</h2>
              <p className="text-gray-500 mb-6">
                Connecting you with {selectedRideData.provider} {selectedRideData.name.toLowerCase()}
              </p>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Ride</span>
                  <span className="font-bold">{selectedRideData.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-bold uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-900 font-bold">Total</span>
                  <span className="text-2xl font-black text-[#b8954f]">₹{selectedRideData.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Your ride is insured</span>
              </div>
            </motion.div>
          )}

          {bookingState === 'confirmed' && selectedRideData && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border-2 border-emerald-500 p-8 text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-500 mb-6">
                Your {selectedRideData.name} is on the way
              </p>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-black text-emerald-600">{selectedRideData.eta}</p>
                  <p className="text-xs text-gray-500">Arrival time</p>
                </div>
                <div className="h-12 w-px bg-gray-200" />
                <div className="text-center">
                  <p className="text-3xl font-black text-gray-900">{selectedRideData.pickupTime}</p>
                  <p className="text-xs text-gray-500">Pickup</p>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-4">
                <p className="text-sm text-emerald-800 font-medium">
                  Redirecting to live tracking...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Safety Banner */}
        {bookingState === 'selecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-gradient-to-r from-[#f5f0e8] to-[#e8e4de] rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Shield className="w-6 h-6 text-[#1e3a5f]" />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Safety First</p>
              <p className="text-xs text-gray-600">
                All rides are tracked in real-time. Share your live location with family.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
