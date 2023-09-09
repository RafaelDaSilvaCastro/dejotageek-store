import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cards";

function Cards() {
  return (
    <Swiper
      effect={"cards"}
      grabCursor={true}
      modules={[EffectCards]}
      className="mySwiper h-90 w-72 hover:scale-105 duration-150 "
    >
      <SwiperSlide className=" flex  rounded-xl p-5 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <img src="../../../public/assets/camiseta-card.png" alt="" />
        <h2 className="mt-10 mb-1.5 font-semibold">T-shirt Luffy Wanted</h2>
        <p className="mb-5">
          Camiseta manga curta, Oversized, Estampa Luffy, One piece, 97%
          algodão.
        </p>
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ 69,90
        </p>
      </SwiperSlide>
      <SwiperSlide className=" flex  rounded-xl p-5 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <img src="../../../public/assets/camiseta-card.png" alt="" />
        <h2 className="mt-10 mb-1.5 font-semibold">T-shirt Luffy Wanted</h2>
        <p className="mb-5">
          Camiseta manga curta, Oversized, Estampa Luffy, One piece, 97%
          algodão.
        </p>
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ 69,90
        </p>
      </SwiperSlide>
      <SwiperSlide className=" flex  rounded-xl p-5 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <img src="../../../public/assets/camiseta-card.png" alt="" />
        <h2 className="mt-10 mb-1.5 font-semibold">T-shirt Luffy Wanted</h2>
        <p className="mb-5">
          Camiseta manga curta, Oversized, Estampa Luffy, One piece, 97%
          algodão.
        </p>
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ 69,90
        </p>
      </SwiperSlide>
      <SwiperSlide className=" flex  rounded-xl p-5 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <img src="../../../public/assets/camiseta-card.png" alt="" />
        <h2 className="mt-10 mb-1.5 font-semibold">T-shirt Luffy Wanted</h2>
        <p className="mb-5">
          Camiseta manga curta, Oversized, Estampa Luffy, One piece, 97%
          algodão.
        </p>
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ 69,90
        </p>
      </SwiperSlide>
      <SwiperSlide className=" flex  rounded-xl p-5 bg-white flex-col text-left drop-shadow-[0px_3px_7px_rgba(0,0,0,0.25)]">
        <img src="../../../public/assets/camiseta-card.png" alt="" />
        <h2 className="mt-10 mb-1.5 font-semibold">T-shirt Luffy Wanted</h2>
        <p className="mb-5">
          Camiseta manga curta, Oversized, Estampa Luffy, One piece, 97%
          algodão.
        </p>
        <p className="text-vermelho-botao text-2xl flex justify-between">
          R$ 69,90
        </p>
      </SwiperSlide>
    </Swiper>
  );
}

export default Cards;
