interface AppUser {
  uuid: string;
  name: string;
  user_name: string;
}

class AppUserStore {
  private appUser: AppUser | null = null;

  setAppUser(user: AppUser) {
    this.appUser = user;
  }

  getAppUser(): AppUser | null {
    return this.appUser;
  }

  clearAppUser() {
    this.appUser = null;
  }
}

export const appUserStore = new AppUserStore();
