import { client } from "../../tina/__generated__/client";
import ClientPage from "./ClientPage";

export default async function HomePage() {
  // Ζητάμε τα δεδομένα από το TinaCMS για το αρχείο "home.md"
  const res = await client.queries.page({ relativePath: "home.md" });

  // Στέλνουμε τα δεδομένα στο Client Component για να εμφανιστεί η σελίδα
  return <ClientPage {...res} />;
}