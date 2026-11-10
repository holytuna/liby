import z from "zod";
// export interface User {
//   id: string;
//   userName: string;
//   nickName: string;
//   email: string;
//   token: number;
//   password: string;
//   createdAt: Date;
//   updatedAt: Date;
// }
export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

export type CreateUserBody = z.infer<typeof CreateUserSchema>;

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

