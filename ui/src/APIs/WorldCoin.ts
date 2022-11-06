import axios from "axios";

const WORLD_COIN_BASE_URI = "https://developer.worldcoin.org/api/v1";

export const verifyHuman = async (
  merkle_root: string,
  nullifier_hash: string,
  action_id: string,
  signal: string,
  proof: string
) => {
  try {
    const response = await axios.post(`${WORLD_COIN_BASE_URI}/verify`, {
      merkle_root: merkle_root,
      nullifier_hash: nullifier_hash,
      action_id: action_id,
      signal: signal,
      proof: proof,
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
