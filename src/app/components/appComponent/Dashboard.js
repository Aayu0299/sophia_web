import { images } from "@/app/utils/Images";
import TableLayout from "./commonLayouts/TableLayout";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const userData = [
    {
      image: images.profile,
      firstName: "Denish",
      lastName: "Jhonson",
      email: "themoder@gmail.com",
      phone: "+1 685 686 5862",
      type: "Caregiver",
      status: "Approved",
    },
    {
      image: images.profile,
      firstName: "Matthew",
      lastName: "Short",
      email: "themoder@gmail.com",
      phone: "+1 685 686 5862",
      type: "Patient",
      status: "Pending",
    },
  ];

  const repeatedData = Array.from({ length: 6 }, () => userData).flat();

  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "users";

  const tableConfig = {
    users: {
      title: "User List",
      columns: [
        { key: "image", label: "Image" },
        { key: "firstName", label: "First name" },
        { key: "lastName", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone number" },
        { key: "type", label: "User Type" },
        { key: "status", label: "Status" },
      ],
      data: repeatedData,
    },

    patients: {
      title: "Patient List",
      columns: [
        { key: "image", label: "Image" },
        { key: "firstName", label: "First name" },
        { key: "lastName", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone number" },
      ],
      data: repeatedData,
    },

    family: {
      title: "Family Members List",
      columns: [
        { key: "image", label: "Image" },
        { key: "firstName", label: "First name" },
        { key: "lastName", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone number" },
      ],
      data: repeatedData,
    },

    doctors: {
      title: "Doctor List",
      columns: [
        { key: "image", label: "Image" },
        { key: "firstName", label: "First name" },
        { key: "lastName", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone number" },
      ],
      data: repeatedData,
    },

    caregivers: {
      title: "Caregiver List",
      columns: [
        { key: "image", label: "Image" },
        { key: "firstName", label: "First name" },
        { key: "lastName", label: "Last name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone number" },
      ],
      data: repeatedData,
    },
  };

  // Get correct tab config
  const { title, columns, data } =
    tableConfig[currentTab] || tableConfig["users"];

  return (
    <div className="">
      {/* Top Card */}
      <TableLayout
        title={title}
        columns={columns}
        data={data}
        currentTab={currentTab}
      />
    </div>
  );
}
