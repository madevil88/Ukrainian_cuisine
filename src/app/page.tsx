"use client";

import RecipeCard from "@/components/common/recipe-card";
import { useRecipeStore } from "@/store/recipe.store";
import { Button } from "@heroui/react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const { recipes, isLoading, error } = useRecipeStore();

  return (
    <>
      <div className="flex w-full justify-center items-center mb-4">
        <Link href="/recipes/new">
          <Button variant="primary">Add recipe</Button>
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {isLoading && <p>Loading...</p>}

      <Swiper
        key={recipes.length > 0 ? "ready" : "loading"}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        navigation
        initialSlide={Math.floor(recipes.length / 2)}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="w-[95%] pb-10"
      >
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.id} style={{ width: "280px" }}>
            <RecipeCard recipe={recipe} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
