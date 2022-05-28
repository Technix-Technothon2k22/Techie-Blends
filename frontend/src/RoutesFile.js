import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdvisorForm from "./pages/advisorform";
import Createblog from "./pages/blog/Createblog";
import CreatePod from "./pages/Podcast/Createpod";

import BlogSection from "./components/blog/blogSection";
import Blog from "./pages/blog";
import Home from "./pages/home";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/Signup";
import Chatpage from "./pages/chat/ChatPage";
import ChatProvider from "./Context/ChatProvider";
import Wait from "./pages/Wait";
import ShowPods from "./pages/Podcast/showPods";
import PodSection from "./components/podcasts/podSection";
import Video from "./pages/videocall/video";
import UserForm from "./pages/userform";

const RoutesFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/signin" exact element={<Signin />} />
        <Route path="/professionalonboarding" element={<AdvisorForm />} />
        <Route path="/createblog" exact element={<Createblog />} />
        <Route path="/createpod" exact element={<CreatePod />} />
        <Route path="/blog/:id" exact element={<BlogSection />} />
        <Route
          path="/chat"
          exact
          element={
            <ChatProvider>
              <Chatpage />
            </ChatProvider>
          }
        />{" "}
        <Route path="/podcast/:id" exact element={<PodSection />} />
        <Route path="/wait" exact element={<Wait />} />
        <Route path="/blog" exact element={<Blog />} />
        <Route path="/podcasts" exact element={<ShowPods />} />
        <Route path="/video" exact element={<Video />} />
        <Route path="/details" exact element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesFile;
