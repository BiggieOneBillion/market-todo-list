import jwt_decode from "jwt-decode";

export async function DecodeToken(token: string): Promise<object> {
  try {
    const decodedToken = jwt_decode.jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.log("token error", error);
    throw new Error("Token Error");
  }
}
