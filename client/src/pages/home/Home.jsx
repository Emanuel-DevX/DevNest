"use client";
import FeatureSection from "./FeatureSection";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-5 h-8 border-2 border-teal-400/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-teal-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
