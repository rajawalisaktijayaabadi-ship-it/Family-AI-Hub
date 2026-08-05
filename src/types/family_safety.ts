import { z } from 'zod';

export type LocationStatus =
  | 'At Home'
  | 'At School'
  | 'At Office'
  | 'On the Move'
  | 'Emergency';

export interface FamilyMemberLocation {
  id: string;
  memberName: string;
  role: string;
  avatarBg: string;
  currentStatus: LocationStatus;
  locationName: string;
  batteryLevel: number;
  lastCheckIn: string;
  gpsSignal: 'Strong' | 'Moderate' | 'Weak';
  latitude: number;
  longitude: number;
  speedKmH?: number;
}

export interface SafeZoneModel {
  id: string;
  name: string;
  address: string;
  radiusMeters: number;
  notifyOnEnter: boolean;
  notifyOnExit: boolean;
  activeMembersCount: number;
  icon: string;
  color: string;
}

export interface FamilyCheckInModel {
  id: string;
  memberName: string;
  locationName: string;
  timestamp: string;
  statusMessage: string;
  photoUrl?: string;
}

export interface SOSAlertModel {
  id: string;
  senderName: string;
  triggerTime: string;
  locationAddress: string;
  latitude: number;
  longitude: number;
  status: 'Active' | 'Resolved' | 'Testing';
  notes?: string;
}

export interface EmergencyPlanModel {
  id: string;
  title: string;
  category: 'Kebakaran' | 'Gempa Bumi' | 'Banjir' | 'Medis' | 'Keamanan';
  meetingPoint: string;
  steps: string[];
  contacts: { role: string; name: string; phone: string }[];
}

export interface IncidentReportModel {
  id: string;
  title: string;
  reporterName: string;
  category: 'Kecelakaan' | 'Pencurian' | 'Lalu Lintas' | 'Mencurigakan' | 'Lainnya';
  location: string;
  dateTime: string;
  description: string;
  severity: 'High' | 'Medium' | 'Low';
}

export interface FamilyTravelModel {
  id: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  safetyNotes: string;
  membersInvolved: string[];
}

export interface AISafetyRecommendation {
  id: string;
  title: string;
  description: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  suggestedAction: string;
}

// Zod Validation Schemas
export const CheckInSchema = z.object({
  memberName: z.string().min(1, 'Nama anggota wajib diisi'),
  locationName: z.string().min(1, 'Nama lokasi wajib diisi'),
  statusMessage: z.string().min(1, 'Pesan status wajib diisi'),
});

export const IncidentReportSchema = z.object({
  title: z.string().min(3, 'Judul laporan minimal 3 karakter'),
  reporterName: z.string().min(1, 'Nama pelapor wajib diisi'),
  category: z.enum(['Kecelakaan', 'Pencurian', 'Lalu Lintas', 'Mencurigakan', 'Lainnya']),
  location: z.string().min(2, 'Lokasi wajib diisi'),
  dateTime: z.string(),
  description: z.string().min(5, 'Deskripsi minimal 5 karakter'),
  severity: z.enum(['High', 'Medium', 'Low']),
});
