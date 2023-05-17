import { useState } from "react";
import Slick from "react-slick";
import * as S from "./styles";

export default function ImagesZoom({ images, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <S.Overlay>
      <S.Global />
      <S.Header>
        <h1>상세 이미지</h1>
        <S.CloseBtn onClick={onClose} />
      </S.Header>
      <S.SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <S.ImgWrapper key={v.src}>
                <img src={`http://localhost:3065/${v.src}`} width={300} alt={v.src} />
              </S.ImgWrapper>
            ))}
          </Slick>
          <S.Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </S.Indicator>
        </div>
      </S.SlickWrapper>
    </S.Overlay>
  );
}
