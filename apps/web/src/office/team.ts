export type Seat = "north" | "east" | "south" | "west";
export type Pose = "front" | "back" | "profile";
export type Accessory = "bow" | "glasses" | "headphones" | "stripes";

export type Member = {
  role: "CEO" | "CFO" | "CTO" | "COO";
  name: string;
  seat: Seat;
  pose: Pose;
  coat: string;
  belly: string;
  accent: string;
  ear: string;
  stripe: string;
  task: string;
  screen: string;
  accessory: Accessory;
};

export const team: Member[] = [
  {
    role: "CEO",
    name: "Nori",
    seat: "north",
    pose: "front",
    coat: "#f4efe6",
    belly: "#fffaf4",
    accent: "#c4963c",
    ear: "#f3b7ae",
    stripe: "#e4d8c4",
    task: "Launch plan",
    screen: "#f0d7a2",
    accessory: "bow",
  },
  {
    role: "CFO",
    name: "Miso",
    seat: "west",
    pose: "profile",
    coat: "#e7b07a",
    belly: "#f6d7b4",
    accent: "#2f6b4f",
    ear: "#f0b09f",
    stripe: "#c4844a",
    task: "Runway",
    screen: "#b7e4c7",
    accessory: "glasses",
  },
  {
    role: "CTO",
    name: "Pixel",
    seat: "east",
    pose: "profile",
    coat: "#4e5966",
    belly: "#7d8794",
    accent: "#7eb6d6",
    ear: "#f0b7ae",
    stripe: "#3c4550",
    task: "Ship the build",
    screen: "#b9d7ff",
    accessory: "headphones",
  },
  {
    role: "COO",
    name: "Biscuit",
    seat: "south",
    pose: "back",
    coat: "#e0944f",
    belly: "#f0c48a",
    accent: "#7a3e32",
    ear: "#f0b09f",
    stripe: "#b86b32",
    task: "Today's ops",
    screen: "#f3c7a4",
    accessory: "stripes",
  },
];
