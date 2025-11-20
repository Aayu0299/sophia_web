import { ROUTES } from "./Constant";
import { TEXT } from "./Text";

export const navItems = () => [
  { id: 1, link: ROUTES.HOME, label: TEXT.HOME },
  { id: 2, link: "#", label: TEXT.ABOUT },
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

export const sidebarNavItems = [
  { id: 1, link: ROUTES.DASHBOARD, label: TEXT.DASHBOARD },
  { id: 2, link: "#", label: TEXT.FAMILY_FRIEND_CHAT },
  { id: 3, link: "#", label: TEXT.SETTINGS },
];
