import type { productType } from "../types/productType";

type CardProps = {
  selectProduct: productType;
};

const Card = ({ selectProduct }: CardProps) => {
  return (
    <div className="card w-100">
      <img
        src={selectProduct.imageUrl}
        className="card-img-top top-img "
        alt={selectProduct.title}
      />
      <div className="card-body">
        <div className="card-title fs-1">{selectProduct.title}</div>
        <p className="card-text">商品描述：{selectProduct.description}</p>
        <p className="card-text">商品內容：{selectProduct.content}</p>
        <p className="card-text">
          原價 ： <s>{selectProduct.origin_price} </s> / 特價 :{" "}
          {selectProduct.price} 元
        </p>
        <div className="card-text">
          <p className="fs-3">更多圖片：</p>
          {selectProduct.imagesUrl.map((img: string, index: number) => {
            return (
              <img
                src={img}
                className="img-thumbnail w-25"
                key={index}
                alt={selectProduct.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
