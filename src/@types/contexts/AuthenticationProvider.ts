export type createContextType = {
  username: string | null;
  getUsername: () => Promise<void>;
};
