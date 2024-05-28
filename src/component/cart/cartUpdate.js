import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartItem } from "../../redux/cartSlice";
import { updateCart } from "../../service/cartService";

export default function CartUpdate({ prodId }) {
  const [prod, setProduct] = useState({});
  const itms = useSelector(cartItem);
  const itm = itms.find((i) => i.id === prodId);
  const count = itm?.count ?? 0;
  const dispatch = useDispatch();
  const token = useSelector(authToken);
  //   useEffect(() => {
  //     updateCart({ token, items: itms });
  //   }, [itms]);
  useLayoutEffect(() => {
    const fetchProd = async () => {
      const product = await getProductById(prodId);
      setProduct(product);
    };
    fetchProd();
  }, [prodId]);
}
