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
        <Card title="پاراگراف شماره یک">
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
        <Card title="پاراگراف شماره دو">
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
      <Card className="support" title="تولید نمونه داده">
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <Text>
            - لطفا قبل از تولید نمونه داده، متن "راهنما" را مطالعه بفرمایید.
            چنانچه متن دو پاراگراف به هردلیلی قابلیت طراحی سوال را نداشت، می
            توانید با زدن دکمه "تولید نمونه جدید"، به سراغ یک زوج پاراگراف جدید
            بروید.
          </Text>
          <Text type="warning">- سوال و جواب را به شکل یک رشته وارد کنید.</Text>
          <Text type="warning">
            - جملاتی که در پیدا کردن جواب مورد نیاز است را انتخاب کنید
          </Text>
          <Card className="input-container">
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
                جملاتی از پاراگراف شماره ۱ که برای پیدا کردن جواب نیاز است را
                انتخاب کنید
              </Text>
              <Select
                mode="multiple"
                allowClear
                placeholder="جملات پشتیبان اول"
                style={{ width: "100%" }}
                onChange={(e) => {
                  //  console.log(e.map(item=>[JSON.parse(item).index, JSON.parse(item).item]));
                  if (e.length != 0)
                    setSupport(
                      e.map((item) => [
                        JSON.parse(item).index,
                        JSON.parse(item).item,
                      ])
                    );
                  else setSupport(undefined);
                }}
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
                جملاتی از پاراگراف شماره دو که برای پیدا کردن جواب نیاز است را
                انتخاب کنید
              </Text>
              <Select
                mode="multiple"
                allowClear
                placeholder="جملات پشتیبان دوم"
                style={{ width: "100%" }}
                onChange={(e) => {
                  if (e.length != 0)
                    setSupport2(
                      e.map((item) => [
                        JSON.parse(item).index,
                        JSON.parse(item).item,
                      ])
                    );
                  else setSupport2(undefined);
                }}
              >
                {text2.map((item, index) => (
                  <Option key={index} value={JSON.stringify({ index, item })}>
                    {item}
                  </Option>
                ))}
              </Select>
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
          </Card>
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
            نخستین کسی که به دوزخ می‌رود شخص غیبت کننده است.
          </Text>
          <Text type="success">
            پاراگراف دوم: [1]کینه یکی از رذائل اخلاقی و حالتی روحی است که فرد در
            آن حالت، دشمنیِ دیگری را در دل پنهان کرده و منتظر فرصت مناسب است تا
            آن را ابراز کند. [2]کینه را از آثار خشم دانسته‌اند. [3]جدال لفظی،
            سرزنش، غیبت، تمسخر، نفرین و فحاشی از عواملی هستند که ممکن است باعث
            شوند طرف مقابل، کینه فرد را به دل بگیرد. [4]کینه موجب گناهان ديگري
            مانند حسادت، غیبت، تهمت، سرزنش، توبيخ و تحقیر دیگران نیز می‌شود.
          </Text>
          <Text type="success">
            طرح سوال: هر نوع رویکردی در طراحی سوال را می توانید داشته باشید و
            مشکلی ندارد. به عنوان نمونه: *) سوال شما می تواند در مورد ویژگی
            مربوط به آن کلمه مشترک باشد. مثال: سوال پیشنهادی: کدام پیامد دنیوی
            غیبت است که فرد در آن حالت، دشمنیِ دیگری را در دل پنهان کرده است؟
            پاسخ پیشنهادی: کینه جملات راهنمای پاراگراف اول: 1,2 جملات راهنمای
            پارگراف دوم: 1,2
          </Text>
          <Text type="success">
            *) سوال شما می تواند در مورد ویژگی مربوط به آن کلمه مشترک باشد.
            مثال: سوال پیشنهادی: پیامد دنیوی غیبت که فرد در آن حالت، دشمنیِ
            دیگری را در دل پنهان کرده است از آثار چیست؟ پاسخ پیشنهادی: خشم جملات
            راهنمای پاراگراف اول: 1,2 جملات راهنمای پاراگراف دوم: 1,2,3
          </Text>
          <Text type="success">
            در اینجا نیز مشاهده می کنید که ابتدا باید با بررسی جمله 1و2 پاراگراف
            اول متوجه شویم که غیبت پیامد های دنیوی و اخروی دارد و پیامد های
            دنیوی آن چیست که یکی از آنها "کینه" است. حال با بررسی جمله 1و2
            پاراگراف دوم متوجه می شویم که "کینه" همان پیامد دنیوی است که ویژگی
            مورد نظر سوال را دارا است. در نهایت با بررسی جمله 3 متوجه می شویم که
            کینه از آثار "خشم" است. در نتیجه به پاسخ سوال دست یافته ایم. همانطور
            که مشاهده می کنید، از "خشم" به عنوان یک ویژگی مربوط به "کینه" به
            عنوان کلمه مشترک دو پاراگراف سوال شده است.
          </Text>
          <Text type="success">
            *) سوال شما می تواند بصورت مقایسه ای بین دو پاراگراف باشد. سوال
            پیشنهادی: آیا غیبت و کینه هرکدام موجب ایجاد یکدیگر هستند؟ پاسخ
            پیشنهادی: بله جملات راهنمای پاراگراف اول: 2 جملات راهنمای پاراگراف
            دوم: 4
          </Text>
          <Text type="success">
            در اینجا بصورت مقایسه ای عمل کرده ایم. شما با بررسی جمله 2 پاراگراف
            اول و جمله 4 پاراگراف دوم متوجه می شوید هم غیبت موجب ایجاد کینه است
            و هم کینه موجب غیبت می شود. بنابراین هرکدام موجب ایجاد دیگری است و
            پاسخ یافت می شود. همانطور که مشاهده می شود، در برخی متون می توان
            سوال مقایسه ای نیز مطرح کرد.
          </Text>
          <Text type="success">*) چند نوع نمونه سوال پیشنهادی دیگر:</Text>
          <Text type="success">
            سوال پیشنهادی: چندمین فرزند امام اول شیعیان در کربلا به شهادت رسیده
            است؟ (پاراگراف اول: در مورد حضرت علی(ع) / پاراگراف دوم: در مورد امام
            حسین(ع))
          </Text>
          <Text type="success">
            سوال پیشنهادی: پسر بزرگ فرزند امام اول شیعیان که در کربلا به شهادت
            رسیده است، چه نام دارد؟ (پاراگراف اول: در مورد حضرت علی(ع) /
            پاراگراف دوم: در مورد امام حسین(ع)){" "}
          </Text>
          <Text type="success">
            سوال پیشنهادی: امام حسن از امام حسین بزرگتر بوده است یا کوچکتر؟
            (پاراگراف اول: در مورد امام حسن(ع) / پاراگراف دوم: در مورد امام
            حسین(ع)){" "}
          </Text>
          <Text type="success">
            سوال پیشنهادی: فرزندان امام اول شیعیان به غیر از امام حسن و امام
            حسین چه کسانی هستند؟ (پاراگراف اول: در مورد حضرت علی(ع) / پاراگراف
            دوم: در مورد فرزندان حضرت علی(ع))
          </Text>
          <Text type="success">
            *) و به طور کلی، در طراحی سوال می توانید از هر اطلاعاتی که برای
            رسیدن به آن نیاز باشد هر دو پاراگراف بررسی شده و سپس پاسخ یافته شود،
            استفاده کنید. که معمولا چنین سوالاتی از نوع چندمرحله‌ای هستند.
          </Text>
        </Space>
      </Card>
    </Space>
  );
}

export default App;
