export default chatIdLoader;
import { RootState } from "../../../store/reducer";
import { fetchOrLoadMessages } from "../../../store/chats/api";
import { getApiClient } from "../../../pages/api/client";

function chatIdLoader({ params }) {
  return null;
}
