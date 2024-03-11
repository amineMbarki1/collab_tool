import { Topic } from "@/features/topics";
import { Route, Routes } from "react-router-dom";

import { useUrlHash } from "@/hooks";
import { MainLayout, Sidebar } from "@/components/Layout";
import { TeamMembers as TeamMembersSection } from "@/features/team";
import { Topics as TopicsSection } from "@/features/topics";
import { MessagesSection } from "@/features/chat";
import Test from "@/features/notifications/components/Test";

import Chat from "@/features/chat/pages/Chat";

export default function ProtectedRoutes() {
  const hash = useUrlHash();

  return (
    <Test>
      <MainLayout>
        <Sidebar />
        <main style={{ flex: 1, display: "flex" }}>
          {hash === "#team" ? (
            <TeamMembersSection />
          ) : hash === "#messages" ? (
            <MessagesSection />
          ) : (
            <TopicsSection />
          )}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/topics/:id" element={<Topic />} />
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </main>
      </MainLayout>
    </Test>
  );
}

function HomePage() {
  return <h1>Welcome back Sir </h1>;
}
