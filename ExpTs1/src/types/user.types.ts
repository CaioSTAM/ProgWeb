export interface UserInput {
  name: string;
  email: string;
  majorId?: number;
}

export interface UserOutput {
  id: number;
  name: string;
  email: string;
  majorId?: number;
}
