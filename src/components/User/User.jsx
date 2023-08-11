import { useSelector } from "react-redux";
import { selectUserById } from "../../store/user/selectors";
import { useRef } from "react";

export const User = ({ userId, className }) => {
  const ref = useRef();
  const timeoutRef = useRef();
  const user = useSelector((state) => selectUserById(state, { userId }));

  // useEffect(() => {
  //   console.log(ref);
  //   const customeFunction = () => { };

  //   timeoutRef.current = setTimeout(() => { }, 10000);

  //   if (ref.current) {
  //     ref.current.addEventListner('', customeFunction);

  //     return () => ref.current.removeEventListner('', customeFunction);
  //   }
  // }, []);  

  if (!user) {
    return null;
  }

  return (
    <>
      <button onClick={() => clearTimeout(timeoutRef.current)} />
      <span ref={ref} className={className}>
        {user.name}
      </span>
    </>
  );
};
