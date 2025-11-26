import { ROUTES } from "./Constant";
import { TEXT } from "./Text";

export const navItems = () => [
  { id: 1, link: ROUTES.HOME, label: TEXT.HOME },
  { id: 2, link: "#", label: TEXT.ABOUT },
];

export const userTypeOptions = [
  {
    key: "patient",
    label: TEXT.PATIENT,
    icon: "/patient-icon-active.svg",
    activeIcon: "/patient-icon-active.svg",
  },
  {
    key: "family",
    label: TEXT.FAMILY,
    icon: "/family-icon-active.svg",
    activeIcon: "/family-icon-active.svg",
  },
  {
    key: "doctor",
    label: TEXT.DOCTOR,
    icon: "/doctor-icon-active.svg",
    activeIcon: "/doctor-icon-active.svg",
  },
  {
    key: "caregiver",
    label: TEXT.CAREGIVER,
    icon: "/caregiver-icon-active.svg",
    activeIcon: "/caregiver-icon-active.svg",
  },
];

export const securityQuestionOptions = [
  { value: "birthCity", label: "What city were you born in?" },
  { value: "petName", label: "What was your first pet’s name?" },
  { value: "schoolName", label: "What was the name of your first school?" },
  { value: "favTeacher", label: "Who was your favorite teacher?" },
];

export const relationshipOptions = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "spouse", label: "Spouse" },
  { value: "guardian", label: "Guardian" },
];

export const specializationOptions = [
  { label: "Cardiologist", value: "cardiologist" },
  { label: "Neurologist", value: "neurologist" },
  { label: "Physician", value: "physician" },
  { label: "Dentist", value: "dentist" },
  { label: "Nurse", value: "nurse" },
  { label: "Physiotherapist", value: "physiotherapist" },
];

export const rotaryRoleOptions = [
  { label: "Club President", value: "club_president" },
  { label: "Club Secretary", value: "club_secretary" },
  { label: "Club Treasurer", value: "club_treasurer" },
  { label: "District Governor", value: "district_governor" },
  { label: "Assistant Governor", value: "assistant_governor" },
  { label: "Rotarian", value: "rotarian" },
];

export const genericRoleOptions = [
  { label: "Member", value: "member" },
  { label: "Volunteer", value: "volunteer" },
  { label: "Support Staff", value: "support_staff" },
  { label: "Guest", value: "guest" },
];

export const navItemsForPatient = [
  { id: 1, link: ROUTES.DASHBOARD, label: TEXT.DASHBOARD },
  { id: 2, link: "#", label: TEXT.FAMILY_FRIEND_CHAT },
  { id: 3, link: "#", label: TEXT.SETTINGS },
];

export const navItemsForDoctor = [
  { id: 1, link: ROUTES.DASHBOARD, label: TEXT.DASHBOARD },
  { id: 2, link: "#", label: TEXT.CARE_TEAM },
  { id: 3, link: "#", label: TEXT.SETTINGS },
];

export const notes = [
  {
    id: 1,
    author: "Sarah (You)",
    time: "Today, 9:15 AM",
    message:
      "I've been experiencing some dizziness when I stand up. Is this related to my blood pressure medication?",
  },
  {
    id: 2,
    author: "Dr. Johnson",
    time: "Today, 11:30 AM",
    message:
      "The dizziness could be related to your medication. I’ll review your dosage during my next visit. In the meantime, please stand up slowly and stay hydrated.",
    extraBox:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    replyText: "Responding to your question about dizziness",
    showReplyButton: true,
  },
  {
    id: 3,
    author: "Mom",
    time: "Yesterday, 2:45 PM",
    message:
      "Sarah mentioned she’s been having trouble sleeping. Could this be affecting her recovery?",
  },
];

export const doctors = [
  {
    name: "Dr. Michael Roberts",
    specialty: "Cardiologist",
  },
  {
    name: "Dr. Jennifer Lee",
    specialty: "Endocrinologist",
  },
];

export const patients = [
  {
    id: 1,
    name: "Sarah Johnson",
    room: "Room 101-A",
    admitted: "Jan 13",
    status: "Admitted",
    pending: 1,
    summary:
      "IMPROVING: Active treatment with Endocrinology. Vitals monitored. Labs tracked. Ready for discharge planning consideration.",
    avatar: "/user-image.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    room: "Room102-B",
    admitted: "Jan 14",
    status: "Admitted",
    pending: 0,
    summary:
      "ADMITTED: Initial assessment completed. Internal Medicine evaluation in progress. Treatment plan development underway.",
    avatar: "/user-image.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    room: "Room103-A",
    admitted: "Jan 14",
    status: "Admitted",
    pending: 0,
    summary:
      "ADMITTED: Initial assessment completed. Obstetrics evaluation in progress. Treatment plan development underway.",
    avatar: "/user-image.jpg",
  },
];

export const doctorsList = [
  {
    name: "Dr. Michael Chen",
    role: "Cardiologist - Primary",
    avatar: "/profile.png",
  },
  {
    name: "Dr. Lisa Martinez",
    role: "Emergency Medicine",
    avatar: "/user-image.jpg",
  },
  {
    name: "Dr. James Wilson",
    role: "Internal Medicine",
    avatar: "/user-image.jpg",
  },
];

export const caregiversList = [
  {
    name: "Dr. Johnson",
    role: "Primary Physician",
    status: "online",
    avatar: "/user-image.jpg",
  },
  {
    name: "Jennifer M.",
    role: "Primary Nurse",
    status: "online",
    avatar: "/profile.png",
  },
  {
    name: "Dr. Smith",
    role: "Specialist",
    status: "offline",
    avatar: "/profile.png",
  },
];
