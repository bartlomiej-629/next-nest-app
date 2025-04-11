import { usersData, User } from "@/mock-data/usersData";

export function getUnassignedUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    const unassignedUsers = usersData.filter((user) => user.isUnassigned);
    setTimeout(() => resolve(unassignedUsers), 500); // Simulate async call with delay
  });
}

export function getUserProfile(userId: number): Promise<User | undefined> {
  return new Promise((resolve) => {
    const user = usersData.find((user) => user.id === userId);
    setTimeout(() => resolve(user), 500); // Simulate async call with delay
  });
}
