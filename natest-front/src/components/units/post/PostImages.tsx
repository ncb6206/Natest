import { PlusOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import Image from "next/image";
import ImagesZoom from "../imagesZoom";
import styled from "styled-components";
import { IMainPost } from "../../../../src/commons/reducers/post";

const ImageDiv = styled.div`
  width: 150px;
  height: 150px;
  display: inline-block;
`;

interface IImages {
  id: number;
  src: string;
}

export default function PostImages({ images }: { images: Array<IImages> }) {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <div style={{ height: 300 }}>
        <Image
          role="presentation"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          layout="fill"
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </div>
    );
  }
  if (images.length === 2) {
    return (
      <div>
        <ImageDiv>
          <Image
            role="presentation"
            width={150}
            height={150}
            src={`http://localhost:3065/${images[0].src}`}
            alt={images[0].src}
            onClick={onZoom}
          />
        </ImageDiv>
        <ImageDiv>
          <Image
            role="presentation"
            width={150}
            height={150}
            src={`http://localhost:3065/${images[1].src}`}
            alt={images[1].src}
            onClick={onZoom}
          />
          {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
        </ImageDiv>
      </div>
    );
  }
  return (
    <>
      <div>
        <Image
          role="presentation"
          width={150}
          layout="fill"
          src={`http://localhost:3065/${images[0].src}`}
          alt={images[0].src}
          onClick={onZoom}
        />
        <div
          role="presentation"
          style={{
            width: "50%",
            display: "inline-block",
            textAlign: "center",
            verticalAlign: "middle",
          }}
          onClick={onZoom}
        >
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
}
