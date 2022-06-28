// import React, { useEffect } from "react";
// import { Col, Toast } from "react-bootstrap";

// import { useToast } from "../hooks/toast";

// const ToastContainer: React.FC<any> = (Props: any) => {
//   //   const { message, style } = Props;
//   //   const { removeToast } = useToast();
//   console.log("passei aqui toastcontainer");
//   //   useEffect(() => {
//   //     const timer = setTimeout(() => {
//   //       removeToast(message.id);
//   //     }, 6000);

//   //     return () => {
//   //       clearTimeout(timer);
//   //     };
//   //   }, [removeToast, message?.id]);

//   return (
//     <ToastContainer className="p-3" position={"top-end"}>
//       <Toast show={true}>
//         <Toast.Header>
//           <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//           <strong className="me-auto"></strong>
//           <small>Agora</small>
//         </Toast.Header>
//         <Toast.Body>{message?.message}</Toast.Body>
//       </Toast>
//     </ToastContainer>
//   );
// };

// export default ToastContainer;
