import { UserType } from "@prisma/client";
const generalMenuItems = [
  {
    link: "/",
    label: "Interview Schedule",
  },
  {
    link: "/",
    label: "Chats",
  },
  {
    link: "/",
    label: "Settings",
  },
];
export const menuItemsList = [
  {
    userType: UserType.EMPLOYER,
    items: [
      {
        link: "/",
        label: "Publish A Job",
      },
      {
        link: "/",
        label: "Applications",
      },
      ...generalMenuItems,
    ],
  },
  {
    userType: UserType.EMPLOYEE,
    items: [
      {
        link: "/",
        label: "Find Companies",
      },
      {
        link: "/",
        label: "Applied Companies",
      },
      {
        link: "/",
        label: "Interview Alerts",
      },
      ...generalMenuItems,
    ],
  },
];

export const dropDownMenuList = [
  {
    label: "My Profile",
  },
  {
    label: "Settings",
  },
  {
    label: "Logout",
  },
];
