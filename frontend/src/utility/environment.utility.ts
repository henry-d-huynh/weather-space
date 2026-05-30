export const environment = {
  apiUrl:
    import.meta.env.VITE_API_URL.toString() ?? "http://localhost:3000/api",
  wsUrl: import.meta.env.VITE_WS_URL.toString() ?? "ws://localhost:3000",
};
