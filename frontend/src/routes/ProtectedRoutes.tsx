import { Topic } from "@/features/topics";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { useAppStore } from "@/hooks";
import { useUrlHash } from "@/hooks";
import { MainLayout, Sidebar } from "@/components/Layout";
import { TeamMembers as TeamMembersSection } from "@/features/team";
import { Topics as TopicsSection } from "@/features/topics";
import { connectAction } from "@/features/notifications";

export default function ProtectedRoutes() {
  const hash = useUrlHash();
  const { dispatch } = useAppStore();
  useEffect(() => {
    //I got not idea how to fix this lol
    dispatch(connectAction());
  }, [dispatch]);
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
