interface User extends Express.User {
    id?: string;
    email: string;
    name?: string;
    number?: string;
    createdAt?: string
    accessToken?: string;
    refreshToken?: string;
  }

export default User