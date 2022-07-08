import "./app.scss";
import { Card, Button, Typography, Space, Input, Skeleton, Select } from "antd";
import { useEffect, useState } from "react";
import { hotpotData } from "./data";
import { post, responseValidator } from "../scripts/api";
import { toast } from "react-toastify";
const { Option } = Select;
function App() {
  const { Title, Text } = Typography;
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [support, setSupport] = useState();
  const [support2, setSupport2] = useState();
  const [randomTextNumber, setRandomTextNumber] = useState(0);
  const [text1, setText1] = useState(hotpotData[randomTextNumber].text1);
  const [text2, setText2] = useState(hotpotData[randomTextNumber].text2);
  const [postLoading, setPostLoading] = useState(false);

  function randomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setText1(hotpotData[randomTextNumber].text1);
      setText2(hotpotData[randomTextNumber].text2);
      setLoading(false);
    }, 1000);
  }, [randomTextNumber]);

  function submitHandler() {
    setPostLoading(true);
    const body = {
      question,
      answer,
      supporting_facts: [support, support2],
    };
    post("/example/post", body).then((res) => {
      if (responseValidator(res.status)) {
        toast.success("با موفقیت ثب شد.");
      } else {
        toast.error("خطایی رخ داده است . لطفا مجددا تلاش کنید");
      }
      setTimeout(() => {
        setPostLoading(false);
      }, 1000);
    });
  }
  return (
    <Space
      direction="vertical"
      size="large"
      style={{ display: "flex" }}
      className="hotpot-app"
    >
      <Card className="my-header">
        <Title>Persian Hotpot QA</Title>
      </Card>
      <div className="text-container">
        <Card title="پاراگراف ۱">
          {loading ? (
            <Skeleton active />
          ) : (
            text1.map((item, index) => (
              <Text key={index} type="secondary">
                {" "}
                {item}{" "}
              </Text>
            ))
          )}
        </Card>
        <Card title="پاراگراف ۲">
          {loading ? (
            <Skeleton active />
          ) : (
            text2.map((item, index) => (
              <Text key={index} type="secondary">
                {" "}
                {item}{" "}
              </Text>
            ))
          )}
        </Card>
      </div>
      <div className="btn-container">
        <Button
          onClick={() => {
            setRandomTextNumber(randomNumberInRange(0, hotpotData.length - 1));
          }}
          type="primary"
        >
          تولید نمونه جدید
        </Button>
      </div>
      <Card className="support" title="متن سوال">
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Text>
            - لطفا قبل از تولید نمونه داده، متن "راهنما" را مطالعه بفرمایید.
            چنانچه متن دو پاراگراف به هردلیلی قابلیت طراحی سوال را نداشت، می
            توانید با زدن دکمه "تولید نمونه جدید"، به سراغ یک زوج پاراگراف جدید
            بروید.
          </Text>
          <Text type="warning">- سوال و جواب را به شکل یک رشته وارد کنید.</Text>
          <Text type="warning">
            - شماره جملاتی که در پیدا کردن جواب مورد نیاز است را به شکل زیر وارد
            کنید:(اعداد انگلیسی) 1,2,5
          </Text>
          <Text type="danger">
            - راهنمایی: با مطالعه دو پاراگراف، سوالی را طراحی کنید که برای پاسخ
            به آن نیاز به بررسی هر دو پاراگراف باشد . توجه کنید که پاسخ سوال
            باید داخل متن موجود بوده و نیازی نباشد که کلمه یا کلماتی جدید تولید
            شود. مگر اینکه سوال به صورت مقایسه ای بوده و پاسخ آن بصورت بله/خیر
            یا بیشتر/کمتر و نکاتی از این قبیل باشد. (مانند: آیا امام سوم شیعیان
            برادر امام حسن (ع) است؟ بله)
          </Text>

          <Text type="success">
            - نمونه مثال: پارگراف اول: [1]پیامدهای غیبت به دو بخش دنیوی و اخروی
            تقسیم شده است. [2]ایجاد بی‌اعتمادی نسبت به غیبت کننده و ایجاد کینه و
            دشمنی در جامعه، برخی از پیامدهای دنیوی غیبت است. [3]یکی از پیامدهای
            اخروی غیبت، از میان رفتن حسنات و نیکی‌ها است. [4]بر اساس روایات،
            نخستین کسی که به دوزخ می‌رود شخص غیبت کننده است. پاراگراف دوم:
            [1]کینه یکی از رذائل اخلاقی و حالتی روحی است که فرد در آن حالت،
            دشمنیِ دیگری را در دل پنهان کرده و منتظر فرصت مناسب است تا آن را
            ابراز کند. [2]کینه را از آثار خشم دانسته‌اند. [3]جدال لفظی، سرزنش،
            غیبت، تمسخر، نفرین و فحاشی از عواملی هستند که ممکن است باعث شوند طرف
            مقابل، کینه فرد را به دل بگیرد. [4]کینه موجب گناهان ديگري مانند
            حسادت، غیبت، تهمت، سرزنش، توبيخ و تحقیر دیگران نیز می‌شود.{" "}
          </Text>
          <div className="input-container">
            <div className="input-item">
              <Text type="secondary">متن سوال را وارد کنید</Text>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="متن سوال"
              />
            </div>

            <div className="input-item">
              <Text type="secondary">پاسخ سوال را وارد کنید</Text>
              <Input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="پاسخ سوال"
              />
            </div>

            <div className="input-item">
              <Text type="secondary">
                شماره جملاتی از پاراگراف سمت راست که برای پیدا کردن جواب نیاز
                است را وارد کنید
              </Text>
              <Select
                placeholder="جملات پشتیبان اول"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setSupport([JSON.parse(e).index, JSON.parse(e).item])
                }
              >
                {text1.map((item, index) => (
                  <Option key={index} value={JSON.stringify({ index, item })}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="input-item">
              <Text type="secondary">
                شماره جملاتی از پاراگراف سمت چپ که برای پیدا کردن جواب نیاز است
                را وارد کنید
              </Text>
              <Select
                placeholder="جملات پشتیبان دوم"
                style={{ width: "100%" }}
                onChange={(e) =>
                  setSupport2([JSON.parse(e).index, JSON.parse(e).item])
                }
              >
                {text2.map((item, index) => (
                  <Option key={index} value={JSON.stringify({ index, item })}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="btn-container">
            <Button
              disabled={!(question && answer && support && support2)}
              loading={postLoading}
              onClick={submitHandler}
              type="primary"
            >
              ذخیره نمونه
            </Button>
          </div>
        </Space>
      </Card>
    </Space>
  );
}

export default App;
