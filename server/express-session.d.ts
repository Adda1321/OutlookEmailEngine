import 'express-session';

declare module 'express-session' {
  interface Session {
    user?: any; // Adjust the type according to your user object structure
  }
}
