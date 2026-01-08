import "bootstrap/dist/css/bootstrap.css";

import type { productType } from "../types/productType";

type TableProps = {
  products: Array<productType>;
  setSelectProduct: (p: productType) => void;
};

const Table = ({ products, setSelectProduct }: TableProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">產品名稱</th>
          <th scope="col">原價</th>
          <th scope="col">售價</th>
          <th scope="col">是否啟用</th>
          <th scope="col">查看細節</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product: productType) => {
          return (
            <tr key={product.id}>
              <th scope="row">{product.title}</th>
              <td>{product.origin_price}</td>
              <td>{product.price}</td>
              <td>{product.is_enabled ? "啟用" : "不啟用"}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setSelectProduct(product);
                  }}
                >
                  查看
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
