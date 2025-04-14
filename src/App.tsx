
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { HabitProvider } from "@/context/HabitContext";

import Index from "./pages/Index";
import HabitDetail from "./pages/HabitDetail";
import AddHabit from "./pages/AddHabit";
import EditHabit from "./pages/EditHabit";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <HabitProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/habit/:id" element={<HabitDetail />} />
              <Route path="/add" element={<AddHabit />} />
              <Route path="/edit/:id" element={<EditHabit />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HabitProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
