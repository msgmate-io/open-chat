import UserLoader from "@/components/loaders/UserLoader";
import HomePage from "@/components/pages/HomePage";


export { Page };

function Page() {
  return <>
    <UserLoader />
    <HomePage />
  </>;
}
