export type LoginRequest = {
  uid: string;
  password: string;
};

export type RegisterUserRequest = {
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  uid: string;
  email: string;
  avatar: string;
  short_bio: string;
  birthday: string | null;
  linkedin_url: string;
  facebook_url: string;
  website_url: string;
  youtube_url: string;
};

export type GetUserProfileResponse = {
  user: User;
};

export type UpdateUserProfileRequest = {
  name: string;
};

export type UpdateUserProfileResponse = {
  user: User;
};
