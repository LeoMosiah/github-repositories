export async function client<T>(
  path: RequestInfo,
  customConfig?: RequestInit
): Promise<T> {
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  const config = { ...customConfig, headers: defaultHeaders };
  try {
    const response = await fetch(`https://api.github.com/${path}`, config);
    const data = response.json();
    return response.ok ? data : Promise.reject(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
