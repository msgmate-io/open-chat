import CenterDiv from "@/components/layout/CenterDiv";
import { navigate } from "vike/client/router";


export { Page };

function Page() {
  return <CenterDiv className="h-screen">
    TODO index /landing page
    <a onClick={() => {
      navigate("/login")
    }}>Login</a>
  </CenterDiv>
}
