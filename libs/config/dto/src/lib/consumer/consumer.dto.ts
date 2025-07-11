import { Role, Gender } from "@nextcart/enum";
//import { RoleDTO } from "./role.dto";

export class ConsumerDTO {
  consumerId?: number;
  email!: string;
  passwordHash!: string;
  name!: string;
  surname?: string;
  dateOfBirth!: Date;
  placeOfBirth?: string;
  gender!: Gender;
  address?: string;
  role?: Role;
}

/*export function isUser(user: ConsumerDTO): boolean {
  return user.role?.code === Role.isUser;
}

export function isAdmin(user: ConsumerDTO): boolean {
  return user.role?.code === Role.isAdmin;
}*/