import React from "react";
import { createWorker, PSM } from "tesseract.js";
import "./App.css";
import api from "../services/api";
import { db, collection } from "../services/db";
import ProgressBar from "../components/progress-bar";

const PdfReader: React.FC = () => {
  const [text, setText] = React.useState("");
  const [data, setData] = React.useState<any>([]);
  const [img, setImg] = React.useState<any>(
    "https://logosmarcas.net/wp-content/uploads/2020/09/Google-Logo.png"
  );
  const [now, setNow] = React.useState<any>(0);

  React.useEffect(() => {
    const myHeaders = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        //"Content-Length": content.length.toString(),
        //"X-Custom-Header": "ProcessThisImmediately",
      },
    };
  }, []);
  React.useEffect(() => {
    getUsers();
  }, []);

  const getUsers = React.useCallback(async () => {
    const result = await collection.find();
    setData(result);
  }, [db]);

  // const sendMessage = React.useCallback(async () => {
  //   try {
  //     const result: any = await api().get(`${import.meta.env.VITE_TOKEN}`, {
  //       params: {
  //         cmd: "chat",
  //         to: "5562984844107@c.us",
  //         msg: "noob",
  //         id: Math.floor(Math.random()),
  //       },
  //     });
  //   } catch (err: any) {
  //     alert(`Erro ao enviar msg ${err.message}`);
  //   }
  // }, []);

  const showPdf = React.useCallback(async (event: any) => {
    try {
      const file = event.target.files[0];
      const uri = URL.createObjectURL(file);

      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = (e: any) => {
        setImg(e.target.result);
      };

      const worker = createWorker({
        logger: (m) => {
          if (m.jobId) {
            const progress = parseFloat(m.progress).toFixed(2);
            setNow(100 * Number(progress));
          }
        },
      });

      await worker.load();
      await worker.loadLanguage("por");
      await worker.initialize("por");
      await worker.setParameters({
        // tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
        tessedit_char_whitelist:
          "ABCDEFGHJIKLMNOPQRSTUVXWYZÇabcdefghijklmnopqrstuvxwyzçáéíóúÁÉÍÓÚ,.:;?/$()+-%*&º0123456789 " /*with whitelist char*/,
        user_defined_dpi: "70",
        tessedit_pageseg_mode: PSM.AUTO,
      });

      const {
        data: { text },
      } = await worker.recognize(
        event.target.files[0]
        //   {
        //   rectangle: { top: 200, left: 0, width: 1653, height: 500 },
        // }
      );

      setText(text);
      await worker.terminate();
    } catch (error: any) {
      alert(error.message);
    }
  }, []);

  return (
    <div className="App">
      <main className="App-header">
        <div>
          <ul>
            {data.map((obj: any) => (
              <>
                <li>{obj.nome}</li>
                <li>{obj.cpf}</li>
                <li>{obj.telefone}</li>
                <li>{obj.veiculo}</li>
                <li>{obj.status}</li>
              </>
            ))}
          </ul>
        </div>
        <img
          src={img}
          className="App-image"
          alt="logo"
          height={200}
          width={300}
        />
        <h3>Text</h3>
        {/* <button type="button" onClick={sendMessage}>
          Enviar mensagem
        </button> */}

        <ProgressBar bgcolor="#00695c" completed={now} />

        <input type="file" onChange={showPdf} />
        <div className="text-box">
          <p> {text} </p>
        </div>
      </main>
    </div>
  );
};
export default PdfReader;
