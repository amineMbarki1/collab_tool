import { MainLayout, Sidebar } from "@/components/Layout";
import { Topic } from "@/features/topics";
import { useUrlHash } from "@/hooks";
import { Route, Routes } from "react-router-dom";

import { TeamMembers as TeamMembersSection } from "@/features/team";
import { Topics as TopicsSection } from "@/features/topics";

export default function ProtectedRoutes() {
  const hash = useUrlHash();
  return (
    <MainLayout>
      <Sidebar />
      <main style={{ flex: 1, display: "flex" }}>
        {hash === "#team" ? <TeamMembersSection /> : <TopicsSection />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/topics/:id" element={<Topic />} />
        </Routes>
      </main>
    </MainLayout>
  );
}

function HomePage() {
  return <h1>Welcome back Sir </h1>;
}

